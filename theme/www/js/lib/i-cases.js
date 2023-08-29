Util.Objects["cases"] = new function() {
	this.init = function(list) {
		var i, node;

		var page = u.qs("#page");

		// set up movie
		if(!page.player) {
			page.player = u.videoPlayer();
		}

		page.scrollToTop = function() {
			
			if(u.scrollY() > 3) {
				window.scrollTo(0, u.scrollY() - (u.scrollY()/4));
				this.t_scroll = u.t.setTimer(this, this.scrollToTop, 40);
			}
			else {
				window.scrollTo(0,0);
			}
		}


		// index stage
		list.view = u.qs(".case");
		list.view.page = page;

		list.nodes = u.qsa("li", list);
		for(i = 0; node = list.nodes[i]; i++) {
			node.list = list;


			u.link(node);
			node.clicked = function(event) {
//				u.bug("Click called");

				this.list.view.page.scrollToTop();


				var i, node;

				// view is ready for new injection
				this.list.view.transitioned = function(event) {
//					u.bug("Transitioned called");
					this.transitioned = null;
					u.a.transition(this, "none");

					// inject node content
					this.innerHTML = this.node.innerHTML;

					// set up content

					this.item_id = u.getIJ(this.node, "id");

					// normal video
					this.normal = u.qs(".movie .normal", this);
					this.normal.video_src = this.normal.href;
					this.normal.removeAttribute("href");

					var play = u.ae(this.normal, "a", "play");
					play.view = this;
					u.e.click(play);
					play.clicked = function(event) {
						this.view.page.player.eject();
						// put player into place
						this.view.page.player = this.view.normal.appendChild(this.view.page.player);
						// load and play
						this.view.page.player.loadAndPlay("/videos/" + this.view.item_id + "/640x360.mov");


//						this.view.page.player = this.view.normal.appendChild(this.view.page.player);
//						this.view.page.player.loadAndPlay("/movies/" + this.view.item_id + "/640x.mov");
					}


					// large video
					this.large = u.qs(".movie .large", this);
					if(this.large) {
						this.large.video_src = this.large.href;
						this.large.removeAttribute("href");
					
						this.large.view = this;
					
						u.e.click(this.large);
						this.large.clicked = function(event) {
							this.fullscreen = u.ae(document.body, "div", "fullscreen");
							this.fullscreen.style.height = this.view.page.offsetHeight + "px";
					
							var play = u.ae(this.fullscreen, "a", "play");
							play.view = this.view;
							u.e.click(play);
							play.clicked = function(event) {
								this.view.page.player.eject();

								this.view.page.player = this.view.large.fullscreen.appendChild(this.view.page.player);
								this.view.page.player.loadAndPlay("/videos/" + this.view.item_id + "/960x540.mov");
							}
					
							this.fullscreen.style.backgroundImage = "url(/images/1/960x.jpg)";
					
							var close = u.ae(this.fullscreen, "div", "close");
							u.e.click(close);
							close.clicked = function(event) {
								this.parentNode.parentNode.removeChild(this.parentNode);
							}
						}
					}


					// load image
//					u.bug("Load image: " + "/images/"+this.item_id+"/640x.jpg");
					this.loaded = function(event) {
//						u.bug("Image loaded");
						// set image
						u.as(this.normal, "backgroundImage", "url("+event.target.src+")");

						// fade up when image is loaded
						u.a.transition(this, "all 0.5s ease-in");
						u.a.setOpacity(this, 1);
					}
					u.i.load(this, "/images/1/640x.jpg");

				}


				// remember which node is selected for injection after transition
				this.list.view.node = this;

				// fade view down
				//u.t.setTimer(e, e.w_transitionTo, 200);
				//u.t.setTimer(e, e.w_transitionTo, 200);
				//u.t.setTimer(e, e.transitioned, e.duration);
				
				// IE debug test, Gert
				// var list_view = this.list.view;
				// 				setTimeout(function() {
				// 					u.bug("list_view obj: " + list_view);
				// 					u.a.transition(list_view, "all 0.5s ease-in");
				// 					u.as(list_view, "opacity", 0);
				// 				}, 200);
				u.a.transition(this.list.view, "all 0.5s ease-in");
				u.a.setOpacity(this.list.view, 0);


				// update selected state
				for(i = 0; node = this.list.nodes[i]; i++) {
					u.rc(node, "selected");
				}
				u.ac(this, "selected");
//				u.bug("Nåede til slut");

			}
		}

		// get selection from url
		var selection = location.href.split("/");
		if(selection.length == 5 && selection[4]) {
//			u.bug("Click with number");
			u.ge("id:"+selection[4], list).clicked();
		}
		// default to first item
		else {
			// IE debug test, Gert
			// setTimeout(function() {
			// 				u.bug("Click first item default");
			// 				list.nodes[0].clicked();
			// 			}, 1000);
//			u.bug("Click first item default");
			list.nodes[0].clicked();
		}

	}
}