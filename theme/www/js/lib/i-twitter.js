Util.Objects["twitter"] = new function() {
	this.init = function(e) {


		e.Response = function(response) {
			var i, object, node;

			if(response.length) {
				// create list
				var list = this.insertBefore(document.createElement("ul"), u.qs(".follow", this));

				// loop through response
				for(i = 0; object = response[i]; i++) {
					node = u.ae(u.ae(list, "li"), "div", {"class": "tweet"});

					//u.bug("date:" + response[i].created_at)
					// set date
					//u.ae(node, "span", ({"class":"published"})).innerHTML = u.date("F j", response[i].created_at, new Array("Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"));
//					u.ae(node, "span", ({"class":"published"})).innerHTML = u.date("j. F", "Wed Dec 07 09:02:12 2011", new Array("Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"));



				 	var url_pattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
					// set text, replace links
					node.innerHTML += response[i].text.replace(url_pattern, '<a href="$&" target="_blank">$&</a>');
					//<a href="#" target="_blank">bit.ly/tovCVY</a>
//					u.bug(response[i].text);

				}
				
			}
		}
		
		var twitter_id = u.qs(".follow", e).href.replace("http://twitter.com/", "");
		//u.bug(twitter_id);
		u.Request(e, "https://api.twitter.com/1/statuses/user_timeline.json?screen_name="+twitter_id+"&include_entities=true&include_rts=true&trim_user=true&count=4&", false, "SCRIPT");

	
	}
}