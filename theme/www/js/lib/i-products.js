Util.Objects["products"] = new function() {
	this.init = function(e) {


		var lis = u.qsa("li", e);
		for(i = 0; li = lis[i]; i++) {

			li.style.backgroundImage = "url(http://w.hhd/images/"+u.getIJ(li, "id")+"/100x.jpg)";
			// set click for element
			li.onclick = function() {
				location.href = u.qs("a", this).href;
			}

		}


	}
}