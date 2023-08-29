Util.Objects["page"] = new function() {
	this.init = function(e) {
		var i;


		// MAIN ELEMENTS
		// header element
		e.hN = u.qs("#header", e);
		e.hN.page = e;
		// content element
		e.cN = u.qs("#content", e);
		e.cN.page = e;

		// navigation element
		e.nN = u.qs("#navigation", e);
		if(e.nN) {
			// move navigation in front of content node in the DOM
			e.nN = e.insertBefore(e.nN, e.cN);
			e.nN.page = e;

			// move frontpage node from servicenavigation to navigation
			e.nN.ul = u.qs("ul", e.nN);
			e.nN.ul.insertBefore(u.qs(".servicenavigation .front",  e.hN), e.nN.ul.firstChild);
		}
		// footer element
		e.fN = u.qs("#footer", e);
		e.fN.page = e;


		// LOGO LINK
		e.logo = u.ie(e.nN, "div", ({"class":"logo"}));
		e.logo.url = u.qs(".front a", e.nN).href;
		e.logo.clicked = function(event) {
			location.href = this.url;
		}
		u.e.click(e.logo);


		// service navigation
		// move nodes from footer to header servicenavigation
		e.hN.service_nav = u.qs(".servicenavigation", e.hN)
		e.hN.service_nav.appendChild(u.qs(".servicenavigation .contact", e.fN));
		e.hN.service_nav.appendChild(u.qs(".servicenavigation .jobs", e.fN));
		//e.hN.service_nav.appendChild(u.qs(".servicenavigation .login", e.fN));


		// reveal page
		u.addClass(e, "ready");
	}
}
