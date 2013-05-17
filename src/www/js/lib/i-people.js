Util.Objects["people"] = new function() {
	this.init = function(e) {
		var i, node;

		e.nodes = u.qsa("li", e);

		for(i = 0; node = e.nodes[i]; i++) {
			node.adr = u.qs("address", node);
			var movie = u.qs(".movie", node);
			var img = u.qs("img", node);

			if(movie) {

				img.node = node;
				movie.node = node;
				node.img = img;
				movie.onmouseover = function() {
					u.a.transition(this.node.img, "all 0.2s ease-out");
					this.node.img.transitioned = function(event) {
						this.transitioned = null;
						u.a.transition(this, "none");

						this.node.player = u.ae(this.node.adr, "div", "player");
					}
					u.as(this.node.img, "width", 0);
					u.as(this.node.img, "margin", "0 94px");
					u.ac(this.node, "movie");
					
				}
				movie.onmouseout = function() {
					if(u.qs(".player", this.node)) {
						this.node.adr.removeChild(this.node.player);
					}

					u.a.transition(this.node.img, "all 0.2s ease-out");
					this.node.img.transitioned = function(event) {
						this.transitioned = null;
						u.a.transition(this, "none");
					}

					u.as(this.node.img, "width", "189px");
					u.as(this.node.img, "margin", 0);
				}


			}
		}
	}
}