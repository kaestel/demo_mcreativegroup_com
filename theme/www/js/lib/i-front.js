Util.Objects["frontcarousel"] = new function() {
	this.init = function(list) {
		var i, node;

		list.nodes = u.qsa("li", list);

		// setup index
		if(list.nodes.length > 1) {

			var nav = list.parentNode.appendChild(list.cloneNode(true));
			u.sc(nav, "nav");
			nav.list = list;
			list.nav = nav;

			nav.nodes = u.qsa("li", nav);
			for(i = 0; node = nav.nodes[i]; i++) {
				node.list = list;
				node.i = i;
				u.e.click(node);
				node.clicked = function() {
					this.list.selectImage(this.i);
				}
			}
		}

		// inject logo-box and logo
		list.logo = u.ae(u.ae(list.parentNode, "div", "logo"), "img");


		// set carousel width
		u.as(list, "width", (list.nodes.length*list.nodes[0].offsetWidth) + "px");

		// set up carousel nodes
		for(i = 0; node = list.nodes[i]; i++) {

			// cross-reference list and carousel
			node.list = list;
			node.i = i;
			node.image_id = u.getIJ(node, "id");

			// click navigation
			u.link(node);
//			u.e.click(node);
			node.clicked = function(event) {
				location.href = this.url;

				/*
				var x = event.targetTouches ? event.targetTouches[0].pageX : event.pageX;
				if(x < this.offsetWidth/2) {
					this.list.selectImage(this.list.current_image-1);
				}
				else {
					this.list.selectImage(this.list.current_image+1);
				}
				*/
			}

		}


		list.swipedLeft = function(event) {
			this.selectImage(this.current_image+1);
		}
		list.swipedRight = function(event) {
			this.selectImage(this.current_image-1);
		}

		// image preloader
		list.loadImage = function(image_index) {
			//u.bug("Load image called");

			if(image_index >= 0 && image_index < this.nodes.length) {
//				u.bug("Load image: " + image_index + " of " + this.nodes.length);
				var node = this.nodes[image_index];

				if(node && !node.initialized) {

					node.initialized = true;

					// load image
//					u.i.load(node, "/images/"+node.image_id+"/"+node.list.carousel.node_width+"x.jpg");
//					u.bug("Loading image: " + "/images/"+node.image_id+"/960x.jpg");
					node.loaded = function(event) {
						// set image
//						u.bug("Image was loaded: " + event.target.src);
						u.as(this, "backgroundImage", "url("+event.target.src+")");

						// call back to preload controller
						this.list.imageLoaded(this);
					}
					u.i.load(node, "/images/"+node.image_id+"/960x.jpg");
				}
				else {
					this.imageLoaded(node);
				}
			}
		}

		// image is loaded
		list.imageLoaded = function(node) {
			// if node is currently selected
			if(node.i == this.current_image) {

				if(!this.className.match("ready")) {

					// if more than one image
					if(this.nodes.length > 1) {
						// enable swipe on carousel
						u.e.swipe(this, new Array(this.nodes[0].offsetWidth-this.offsetWidth, 0, this.offsetWidth, this.offsetHeight));
					}

					u.ac(this, "ready");
//					this.ready();
				}

				// preload next and prev
				this.loadImage(this.current_image+1);
				this.loadImage(this.current_image-1);
			}

		}

		// set selected image
		list.selectImage = function(index, hidden) {

			if(index >= 0 && index < this.nodes.length) {


				// fade out logo
				u.a.transition(this.logo, "all 0.3s ease-out");
				u.a.setOpacity(this.logo, 0);
				// get ready to show logo when transition is done
				this.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this.logo, "none");

					this.logo.src = u.qs("img", this.nodes[this.current_image]).src;

					u.a.transition(this.logo, "all 0.3s ease-out");
					u.a.setOpacity(this.logo, 1);
				}


				// remove selected class
				for(i = 0; node = this.nav.nodes[i]; i++) {
					u.rc(node, "selected");
				}

				// set new current image
				var current_node = this.nodes[index];
				u.ac(this.nav.nodes[index], "selected");
				this.current_image = current_node.i;
				// preload
				this.loadImage(this.current_image)

				// move carousel
				// hidden - no transition, just a matter of updating position
				if(hidden) {
					u.a.transition(this, "none");

					// remember logo fade up
					this.transitioned();
				}
				// if selection is based on drag, it can have speed - if so, adjust transition
				else if(this.current_xps) {
					var duration = this.current_xps ? ((960 / Math.abs(this.current_xps)) * 0.7) : 0.7;
					// adjust duration to avoid too slow transition
					duration = duration > 0.7 ? 0.7 : duration;
					u.a.transition(this, "all "+duration+"s ease-out");
				}
				// regular transition
				else {
					u.a.transition(this, "all 0.7s ease-in-out");
				}

				// move carousel
				u.a.translate(this, -(index*current_node.offsetWidth), 0);

				// set timer for next "swipe"
				u.t.resetTimer(this.t_next);
				this.t_next = u.t.setTimer(this, this.nextImage, 5000);

			}
		}

		list.nextImage = function() {
			var index = this.current_image+1
			if(index >= 0 && index < this.nodes.length) {
				this.selectImage(index);
			}
			else {


				// create temp overlay
				this.recom = u.ae(this.parentNode, "div", "recompile");
				var node = this.nodes[this.current_image];

				u.as(this.recom, "backgroundImage", u.gcs(node, "background-image"));


				// fade out logo
				u.a.transition(this.logo, "all 0.3s ease-out");
				u.a.setOpacity(this.logo, 0);


				u.a.transition(this, "none");
				// insert transition helper node (last node inserted before first node)
				this.insertBefore(this.nodes[this.nodes.length-1].cloneNode(true), this.firstChild);
				// place list under temp overlay
				u.a.translate(this, 0, 0);

				// remove temp overlay
				this.recom.parentNode.removeChild(this.recom);

				// start transition
				u.a.transition(this, "all 0.7s ease-in-out");
				u.a.translate(this, -(this.nodes[0].offsetWidth), 0);


				// remove layover
				this.transitioned = function(event) {
					this.transitioned = null;

					// remove transition helper node
					this.removeChild(this.firstChild);
					// reposition list
					this.selectImage(0, true);
				}

			}
		}


		// start loading sequence
		list.current_image = 0;
		list.selectImage(list.current_image);
		
		list.t_next = u.t.setTimer(list, list.nextImage, 5000);


	}
}

Util.Objects["frontblogs"] = new function() {
	this.init = function(list) {

		var i, node;
		var nodes = u.qsa("li", list);

		for(i = 0; node = nodes[i]; i++) {
			u.link(node);
			node.clicked = function() {
				location.href = this.url;
			}
		}

	}
}
