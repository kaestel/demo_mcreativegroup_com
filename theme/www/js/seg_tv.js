
var u, Util = u = new function() {}
u.version = "current";
u.bug = function() {}
Util.testURL = function(url) {
	return document.domain.match(/.local$|http\:\/\/w\./);
}
Util.debug = function(output) {
	if(Util.testURL()) {
		var element, br;
		if(Util.debugWindow && Util.debugWindow.document) {
			element = Util.debugWindow.document.createTextNode(output);
			br = Util.debugWindow.document.createElement('br');
			Util.debugWindow.document.body.appendChild(element);
			Util.debugWindow.document.body.appendChild(br);
			Util.debugWindow.scrollBy(0,1000);
		}
		else {
			Util.openDebugger();
			if(!Util.debugWindow) {
				alert("Disable popup blocker!");
			}
			else {
				Util.debug(output);
			}
		}
	}
}
Util.debugWindow = false;
Util.openDebugger = function() {
	Util.debugWindow = window.open("", "debugWindow", "width=600, height=400, scrollbars=yes, resizable=yes");
	Util.debugWindow.document.body.style.fontFamily = "Courier";
	var element = Util.debugWindow.document.createTextNode("--- new session ---");
	var br = Util.debugWindow.document.createElement('br');
	Util.debugWindow.document.body.appendChild(br);
	Util.debugWindow.document.body.appendChild(element);
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
}
Util.tracePointer = function(e) {
	if(Util.testURL()) {
		var position = document.createElement("div");
		document.body.appendChild(position);
		position.id = "debug_pointer";
		position.style.position = "absolute";
		position.style.backgroundColor = "#ffffff";
		position.style.color = "#000000";
		this.trackMouse = function(event) {
			u.ge("debug_pointer").innerHTML = event.pageX+"x"+event.pageY;
			u.ge("debug_pointer").style.left = 7+event.pageX+"px";
			u.ge("debug_pointer").style.top = 7+event.pageY+"px";
		}
		u.e.addEvent(e, "mousemove", this.trackMouse);
	}
}
Util.bug = function(target, message, color) {
	if(Util.testURL()) {
		var option, options = new Array(new Array(0, "auto", "auto", 0), new Array(0, 0, "auto", "auto"), new Array("auto", 0, 0, "auto"), new Array("auto", "auto", 0, 0));
		if((!color && !message) || (!color && isNaN(target))) {
			color = message;
			message = target;
			target = 0;
		}
		if(!color) {
			color = "black";
		}
		if(!u.ge("debug_"+target)) {
			for(var i = 0; option = options[i]; i++) {
				if(!u.ge("debug_id_"+i)) {
					var d_target = document.createElement("div");
					document.body.appendChild(d_target);
					d_target.style.position = "absolute";
					d_target.style.zIndex = 100;
					d_target.style.top = option[0];
					d_target.style.right = option[1];
					d_target.style.bottom = option[2];
					d_target.style.left = option[3];
					d_target.style.backgroundColor = "#ffffff";
					d_target.style.color = "#000000";
					d_target.style.textAlign = "left";
					d_target.style.padding = "3px";
					d_target.id = "debug_id_"+i;
					d_target.className = "debug_"+target;
					break;
				}
			}
		}
		u.ae(u.ge("debug_"+target), "div", ({"style":"color: " + color})).innerHTML = message;
	}
}
Util.htmlToText = function(string) {
	return string.replace(/>/g, "&gt;").replace(/</g, "&lt;");
}
Util.listObjectContent = function(object) {
	var x, s = "-s-<br>";
	for(x in object) {
		if(object[x] && typeof(object[x]) == "object" && typeof(object[x].nodeName) == "string") {
			s += x + "=" + object[x]+" -> " + u.nodeId(object[x]) + "<br>";
		}
		else {
			s += x + "=" + object[x]+"<br>";
		}
	}
	s += "-e-"
	return s;
}
Util.nodeId = function(node) {
	return node.id ? node.id : (node.className ? node.className : (node.name ? node.name : node.nodeName));
}
Util.Animation = u.a = new function() {
	this.support = function() {
		var node = document.createElement("div");
		if(node.style[this.variant() + "Transition"] !== undefined) {
			return true;
		}
		return false;
	}
	this.variant = function(e) {
		if(this.implementation == undefined) {
			if(document.body.style.webkitTransition != undefined) {
				this.implementation = "webkit";
			}
			else if(document.body.style.MozTransition != undefined) {
				this.implementation = "Moz";
			}
			else if(document.body.style.oTransition != undefined) {
				this.implementation = "o";
			}
			else {
				this.implementation = "";
			}
		}
		return this.implementation;
	}
	this.translate = function(e, x, y) {
		e.style[this.variant() + "Transform"] = "translate("+x+"px, "+y+"px)";
		e.element_x = x;
		e.element_y = y;
		e._x = x;
		e._y = y;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.rotate = function(e, deg) {
		e.style[this.variant() + "Transform"] = "rotate("+deg+"deg)";
		e._rotation = deg;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.scale = function(e, scale) {
		e.style[this.variant() + "Transform"] = "scale("+scale+")";
		e.scale = scale;
		e._scale = scale;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.setOpacity = function(e, opacity) {
		e.style.opacity = opacity;
		e._opacity = opacity;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.setWidth = function(e, width) {
		var width_px = (width == "auto" ? width : width+"px");
		e.style.width = width_px;
		e._width = width;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.setHeight = function(e, height) {
		var height_px = (height == "auto" ? height : height+"px");
		e.style.height = height_px;
		e._height = height;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.rotateTranslate = function(e, deg, x, y) {
		e.style[this.variant() + "Transform"] = "rotate("+deg+"deg) translate("+x+"px, "+y+"px)";
		e.rotation = deg;
		e.element_x = x;
		e.element_y = y;
		e._rotation = deg;
		e._x = x;
		e._y = y;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.translateRotate = function(e, x, y, deg) {
		e.style[this.variant() + "Transform"] = "translate("+x+"px, "+y+"px) rotate("+deg+"deg)";
		e.element_x = x;
		e.element_y = y;
		e.rotation = deg;
		e._x = x;
		e._y = y;
		e._rotation = deg;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.transition = function(e, transition) {
		try {
			e.style[this.variant() + "Transition"] = transition;
			u.e.addEvent(e, this.variant() + "TransitionEnd", this._transitioned);
			u.e.addEvent(e, "transitionend", this._transitioned);
			var duration = transition.match(/[0-9.]+[ms]+/g);
			if(duration) {
				var d = duration[0];
				e.duration = d.match("ms") ? parseFloat(d) : (parseFloat(d) * 1000);
			}
			else {
				e.duration = false;
			}
			e.offsetHeight;
		}
		catch(exception) {
			u.bug("Exception ("+exception+") in u.a.transition, called from: "+arguments.callee.caller);
		}
	}
	this._transitioned = function(event) {
		if(event.target == this && typeof(this.transitioned) == "function") {
			this.transitioned(event);
		}
	}
	this.fadeIn = function(e, duration) {
		duration = duration == undefined ? "0.5s" : duration;
		u.as(e, "opacity", 0);
		if(u.gcs(e, "display") == "none") {
			u.as(e, "display", "block");
		}
		u.a.transition(e, "all "+duration+" ease-in");
		u.as(e, "opacity", 1);
	}
}

Util.getElement = u.ge = function(identifier, target) {
	var e, i, regexp, t;
	t = target ? target : document;
	if(document.getElementById(identifier)) {
		return document.getElementById(identifier);
	}
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			return e;
		}
	}
	return t.getElementsByTagName(identifier).length ? t.getElementsByTagName(identifier)[0] : false;
}
Util.getElements = u.ges = function(identifier, target) {
	var e, i, regexp, t;
	var elements = new Array();
	t = target ? target : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			elements.push(e);
		}
	}
	return elements.length ? elements : t.getElementsByTagName(identifier);
}
Util.querySelector = u.qs = function(query, target) {
	t = target ? target : document;
	return t.querySelector(query);
}
Util.querySelectorAll = u.qsa = function(query, target) {
	t = target ? target : document;
	return t.querySelectorAll(query);
}
Util.getSibling = u.gs = function(e, direction) {
	try {
		var node_type = e.nodeType;
		var ready = false;
		var prev_node = false;
		for(var i = 0; node = e.parentNode.childNodes[i]; i++) {
			if(node.nodeType == node_type) {
				if(ready) {
					return node;
				}
				if(node == e) {
					if(direction == "next") {
						ready = true;
					}
					else {
						return prev_node;
					}
				}
				else {
					prev_node = node;
				}
			}
		}
		return false;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.gs, called from: "+arguments.callee.caller);
	}
}
Util.previousSibling = u.ps = function(e, exclude) {
	var node = e.previousSibling;
	if(exclude) {
		while(node && (node.nodeType == 3 || node.nodeType == 8 || node.className.match("(^|\\s)" + exclude + "(\\s|$)") || node.nodeName.match(exclude.toUpperCase()))) {
			node = node.previousSibling;
		}
	}
	else {
		while(node && (node.nodeType == 3 || node.nodeType == 8)) {
			node = node.previousSibling;
		}
	}
	return node;
}
Util.nextSibling = u.ns = function(e, exclude) {
	var node = e.nextSibling;
	if(exclude) {
		while(node && (node.nodeType == 3 || node.nodeType == 8 || node.className.match("(^|\\s)" + exclude + "(\\s|$)") || node.nodeName.match(exclude.toUpperCase()))) {
			node = node.nextSibling;
		}
	}
	else {
		while(node && (node.nodeType == 3 || node.nodeType == 8)) {
			node = node.nextSibling;
		}
	}
	return node;
}
Util.appendElement = u.ae = function(e, node_type, attributes) {
	try {
		var node = e.appendChild(document.createElement(node_type));
		if(attributes) {
			if(typeof(attributes) == "object") {
				for(attribute in attributes) {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
			else {
				u.addClass(node, attributes)
			}
		}
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.ae, called from: "+arguments.callee.caller.name);
		u.bug("e="+e + ":nodename="+e.nodeName + ":id="+e.id + ":classname="+e.classname + ":attributes=" + attribute);
	}
}
Util.insertElement = u.ie = function(e, node_type, attributes) {
	try {
		var node = e.insertBefore(document.createElement(node_type), e.firstChild);
		if(attributes) {
			if(typeof(attributes) == "object") {
				for(attribute in attributes) {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
			else {
				u.addClass(node, attributes)
			}
		}
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.getIJ, called from: "+arguments.callee.caller);
	}
}
Util.getIJ = function(e, id) {
	try {
		var regexp = new RegExp(id + ":[?=\\w/\\#~:.?+=?&%@!\\-]*");
		if(e.className.match(regexp)) {
			return e.className.match(regexp)[0].replace(id + ":", "");
		}
		return false;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.getIJ, called from: "+arguments.callee.caller);
	}
}
Util.setClass = u.sc = function(e, classname) {
	try {
		e.className = classname;
		e.offsetTop;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.setClass, called from: "+arguments.callee.caller);
	}
}
Util.addClass = u.ac = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
			if(!regexp.test(e.className)) {
				e.className += e.className ? " " + classname : classname;
				e.offsetTop;
			}
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.addClass, called from: "+arguments.callee.caller);
	}
}
Util.removeClass = u.rc = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp(classname + " | " + classname + "|" + classname);
			e.className = e.className.replace(regexp, "");
			e.offsetTop;
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
}
Util.toggleClass = u.tc = function(e, classname, second_classname) {
	try {
		var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
		if(regexp.test(e.className)) {
			Util.removeClass(e, classname);
			if(second_classname) {
				Util.addClass(e, second_classname);
			}
			return second_classname;
		}
		else {
			Util.addClass(e, classname);
			if(second_classname) {
				Util.removeClass(e, second_classname);
			}
			return classname;
		}
		e.offsetTop;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.toggleClass, called from: "+arguments.callee.caller);
	}
}
Util.hasClass = u.hc = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
			if(regexp.test(e.className)) {
				return true;
			}
			else {
				return false;
			}
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.hasClass, called from: "+arguments.callee.caller);
	}
	return false;
}
Util.applyStyle = u.as = function(e, style, value) {
	try {
		e.style[style] = value;
		e.offsetHeight;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.applyStyle("+u.nodeId(e)+", "+style+", "+value+") called from: "+arguments.callee.caller);
	}
}
Util.getComputedStyle = u.gcs = function(e, attribute) {
	e.offsetHeight;
	if(document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(e, null).getPropertyValue(attribute);
	}
	return false;
}
Util.wrapElement = u.we = function(e, wrap) {
	wrap = e.parentNode.insertBefore(document.createElement(wrap), e);
	wrap.appendChild(e);
	return wrap;
}

Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" ? "mouse" : "touch";
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.stopPropagation()
		}
	}
	this.addEvent = function(e, type, action) {
		try {
			e.addEventListener(type, action, false);
		}
		catch(exception) {
			u.bug("exception in addEvent:" + e + "," + type + ":" + exception);
		}
	}
	this.removeEvent = function(e, type, action) {
		try {
			e.removeEventListener(type, action, false);
		}
		catch(exception) {
			u.bug("exception in removeEvent:" + e + "," + type + ":" + exception);
		}
	}
	this.addStartEvent = this.addDownEvent = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.removeStartEvent = this.removeDownEvent = function(e, action) {
		u.e.removeEvent(e, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.addMoveEvent = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.removeMoveEvent = function(e, action) {
		u.e.removeEvent(e, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.addEndEvent = this.addUpEvent = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(e.snapback && u.e.event_pref == "mouse") {
			u.e.addEvent(e, "mouseout", this._snapback);
		}
	}
	this.removeEndEvent = this.removeUpEvent = function(e, action) {
		u.e.removeEvent(e, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(e.snapback && u.e.event_pref == "mouse") {
			u.e.removeEvent(e, "mouseout", this._snapback);
		}
	}
	this.overlap = function(element, target, strict) {
		if(target.constructor.toString().match("Array")) {
			var target_start_x = Number(target[0]);
			var target_start_y = Number(target[1]);
			var target_end_x = Number(target[2]);
			var target_end_y = Number(target[3]);
		}
		else {
			var target_start_x = target.element_x ? target.element_x : 0;
			var target_start_y = target.element_y ? target.element_y : 0;
			var target_end_x = Number(target_start_x + target.offsetWidth);
			var target_end_y = Number(target_start_y + target.offsetHeight);
		}
		var element_start_x = Number(element.element_x);
		var element_start_y = Number(element.element_y);
		var element_end_x = Number(element_start_x + element.offsetWidth);
		var element_end_y = Number(element_start_y + element.offsetHeight);
		if(strict && element_start_x >= target_start_x && element_start_y >= target_start_y && element_end_x <= target_end_x && element_end_y <= target_end_y) {
			return true;
		}
		else if(strict) {
			return false;
		}
		else if(element_end_x < target_start_x || element_start_x > target_end_x || element_end_y < target_start_y || element_start_y > target_end_y) {
			return false;
		}
		return true;
	}
	this.resetClickEvents = function(e) {
		u.t.resetTimer(e.t_held);
		u.t.resetTimer(e.t_clicked);
		this.removeEvent(e, "mouseup", this._dblclicked);
		this.removeEvent(e, "touchend", this._dblclicked);
		this.removeEvent(e, "mousemove", this._clickCancel);
		this.removeEvent(e, "touchmove", this._clickCancel);
		this.removeEvent(e, "mousemove", this._move);
		this.removeEvent(e, "touchmove", this._move);
	}
	this.resetDragEvents = function(e) {
		this.removeEvent(e, "mousemove", this._pick);
		this.removeEvent(e, "touchmove", this._pick);
		this.removeEvent(e, "mousemove", this._drag);
		this.removeEvent(e, "touchmove", this._drag);
		this.removeEvent(e, "mouseup", this._drop);
		this.removeEvent(e, "touchend", this._drop);
		this.removeEvent(e, "mouseout", this._snapback);
		this.removeEvent(e, "mouseout", this._drop);
	}
	this.resetEvents = function(e) {
		this.resetClickEvents(e);
		this.resetDragEvents(e);
	}
	this.resetNestedEvents = function(e) {
		while(e && e.nodeName != "HTML") {
			this.resetEvents(e);
			e = e.parentNode;
		}
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = new Date().getTime();
		this.start_event_x = u.eventX(event);
		this.start_event_y = u.eventY(event);
		this.current_xps = 0;
		this.current_yps = 0;
		this.swiped = false;
		if(this.e_click || this.e_dblclick || this.e_hold) {
			var node = this;
			while(node) {
				if(node.e_drag || node.e_swipe) {
					u.e.addMoveEvent(this, u.e._clickCancel);
					break;
				}
				else {
					node = node.parentNode;
				}
			}
			u.e.addMoveEvent(this, u.e._move);
			u.e.addEndEvent(this, u.e._dblclicked);
		}
		if(this.e_hold) {
			this.t_held = u.t.setTimer(this, u.e._held, 750);
		}
		if(this.e_drag || this.e_swipe) {
			u.e.addMoveEvent(this, u.e._pick);
			u.e.addEndEvent(this, u.e._drop);
		}
		if(typeof(this.inputStarted) == "function") {
			this.inputStarted(event);
		}
	}
	this._cancelClick = function(event) {
		u.e.resetClickEvents(this);
		if(typeof(this.clickCancelled) == "function") {
			this.clickCancelled(event);
		}
	}
	this._move = function(event) {
		if(typeof(this.moved) == "function") {
			this.moved(event);
		}
	}
	this.hold = function(e) {
		e.e_hold = true;
		u.e.addStartEvent(e, this._inputStart);
	}
	this._held = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.held) == "function") {
			this.held(event);
		}
	}
	this.click = this.tap = function(e) {
		e.e_click = true;
		u.e.addStartEvent(e, this._inputStart);
	}
	this._clicked = function(event) {
		u.e.resetNestedEvents(this);
		if(typeof(this.clicked) == "function") {
			this.clicked(event);
		}
	}
	this.dblclick = this.doubletap = function(e) {
		e.e_dblclick = true;
		u.e.addStartEvent(e, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			u.e.resetNestedEvents(this);
			if(typeof(this.dblclicked) == "function") {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(!event) {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetNestedEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
	this.drag = function(e, target, strict, snapback) {
		e.e_drag = true;
		e.strict = strict ? true : false;
		e.allowed_offset = e.strict ? 0 : 250;
		e.elastica = 2;
		e.snapback = snapback ? true : false;
		if(target.constructor.toString().match("Array")) {
			e.start_drag_x = Number(target[0]);
			e.start_drag_y = Number(target[1]);
			e.end_drag_x = Number(target[2]);
			e.end_drag_y = Number(target[3]);
		}
		else {
			e.start_drag_x = target.element_x ? target.element_x : 0;
			e.start_drag_y = target.element_y ? target.element_y : 0;
			e.end_drag_x = Number(e.start_drag_x + target.offsetWidth);
			e.end_drag_y = Number(e.start_drag_y + target.offsetHeight);
		}
		e.element_x = e.element_x ? e.element_x : 0;
		e.element_y = e.element_y ? e.element_y : 0;
		e.locked = ((e.end_drag_x - e.start_drag_x == e.offsetWidth) && (e.end_drag_y - e.start_drag_y == e.offsetHeight));
		e.vertical = (!e.locked && e.end_drag_x - e.start_drag_x == e.offsetWidth);
		e.horisontal = (!e.locked && e.end_drag_y - e.start_drag_y == e.offsetHeight);
		u.e.addStartEvent(e, this._inputStart);
	}
	this._pick = function(event) {
		var init_speed_x = Math.abs(this.start_event_x - u.eventX(event));
		var init_speed_y = Math.abs(this.start_event_y - u.eventY(event));
		u.e.resetNestedEvents(this);
		if(init_speed_x > init_speed_y && this.horisontal || init_speed_x < init_speed_y && this.vertical || !this.vertical && !this.horisontal) {
		    u.e.kill(event);
			this.move_timestamp = new Date().getTime();
			this.current_xps = 0;
			this.current_yps = 0;
			this.start_input_x = u.eventX(event) - this.element_x; // - u.absLeft(this);//(event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
			this.start_input_y = u.eventY(event) - this.element_y; // - u.absTop(this);//.targetTouches ? event.targetTouches[0].pageY : event.pageY);
			u.a.transition(this, "none");
			if(typeof(this.picked) == "function") {
				this.picked(event);
			}
			u.e.addMoveEvent(this, u.e._drag);
			u.e.addEndEvent(this, u.e._drop);
		}
	}
	this._drag = function(event) {
			this.new_move_timestamp = new Date().getTime();
				var offset = false;
				this.current_x = u.eventX(event) - this.start_input_x;
				this.current_y = u.eventY(event) - this.start_input_y;
					this.current_xps = Math.round(((this.current_x - this.element_x) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
					this.current_yps = Math.round(((this.current_y - this.element_y) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
				this.move_timestamp = this.new_move_timestamp;
				if(this.vertical) {
					this.element_y = this.current_y;
				}
				else if(this.horisontal) {
					this.element_x = this.current_x;
				}
				else if(!this.locked) {
					this.element_x = this.current_x;
					this.element_y = this.current_y;
				}
				if(!this.locked) {
					if(u.e.overlap(this, new Array(this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y), true)) {
						if(this.current_xps && (Math.abs(this.current_xps) > Math.abs(this.current_yps) || this.horisontal)) {
							if(this.current_xps < 0) {
								this.swiped = "left";
							}
							else {
								this.swiped = "right";
							}
						}
						else if(this.current_yps && (Math.abs(this.current_xps) < Math.abs(this.current_yps) || this.vertical)) {
							if(this.current_yps < 0) {
								this.swiped = "up";
							}
							else {
								this.swiped = "down";
							}
						}
						u.a.translate(this, this.element_x, this.element_y);
					}
					else {
						this.swiped = false;
						this.current_xps = 0;
						this.current_yps = 0;
						if(this.element_x < this.start_drag_x && !this.vertical) {
							offset = this.element_x < this.start_drag_x - this.allowed_offset ? - this.allowed_offset : this.element_x - this.start_drag_x;
							this.element_x = this.start_drag_x;
							this.current_x = this.element_x + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else if(this.element_x + this.offsetWidth > this.end_drag_x && !this.vertical) {
							offset = this.element_x + this.offsetWidth > this.end_drag_x + this.allowed_offset ? this.allowed_offset : this.element_x + this.offsetWidth - this.end_drag_x;
							this.element_x = this.end_drag_x - this.offsetWidth;
							this.current_x = this.element_x + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else {
							this.current_x = this.element_x;
						}
						if(this.element_y < this.start_drag_y && !this.horisontal) {
							offset = this.element_y < this.start_drag_y - this.allowed_offset ? - this.allowed_offset : this.element_y - this.start_drag_y;
							this.element_y = this.start_drag_y;
							this.current_y = this.element_y + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else if(this.element_y + this.offsetHeight > this.end_drag_y && !this.horisontal) {
							offset = (this.element_y + this.offsetHeight > this.end_drag_y + this.allowed_offset) ? this.allowed_offset : (this.element_y + this.offsetHeight - this.end_drag_y);
							this.element_y = this.end_drag_y - this.offsetHeight;
							this.current_y = this.element_y + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else {
							this.current_y = this.element_y;
						}
						if(offset) {
							u.a.translate(this, this.current_x, this.current_y);
						}
					}
				}
			if(typeof(this.moved) == "function") {
				this.moved(event);
			}
	}
	this._drop = function(event) {
		u.e.resetEvents(this);
		if(this.e_swipe && this.swiped) {
			if(this.swiped == "left") {
				if(typeof(this.swipedLeft) == "function") {
					this.swipedLeft(event);
				}
			}
			else if(this.swiped == "right") {
				if(typeof(this.swipedRight) == "function") {
					this.swipedRight(event);
				}
			}
			else if(this.swiped == "down") {
				if(typeof(this.swipedDown) == "function") {
					this.swipedDown(event);
				}
			}
			else if(this.swiped == "up") {
				if(typeof(this.swipedUp) == "function") {
					this.swipedUp(event);
				}
			}
		}
		else if(!this.locked && this.start_input_x && this.start_input_y) {
			this.start_input_x = false;
			this.start_input_y = false;
			this.current_x = this.element_x + (this.current_xps/2);
			this.current_y = this.element_y + (this.current_yps/2);
			if(this.current_x < this.start_drag_x) {
				this.current_x = this.start_drag_x;
			}
			else if(this.current_x + this.offsetWidth > this.end_drag_x) {
				this.current_x = this.end_drag_x - this.offsetWidth;
			}
			if(this.current_y < this.start_drag_y) {
				this.current_y = this.start_drag_y;
			}
			else if(this.current_y + this.offsetHeight > this.end_drag_y) {
				this.current_y = this.end_drag_y - this.offsetHeight;
			}
			if(!this.strict && (this.current_xps || this.current_yps)) {
				u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
			}
			else {
				u.a.transition(this, "all 0.1s cubic-bezier(0,0,0.25,1)");
			}
			u.a.translate(this, this.current_x, this.current_y);
		}
		if(typeof(this.dropped) == "function") {
			this.dropped(event);
		}
	}
	this.swipe = function(e, target, strict) {
		e.e_swipe = true;
		u.e.drag(e, target, strict);
	}
	this._swipe = function(event) {
	}
	this._snapback = function(event) {
	    u.e.kill(event);
		u.bug(2, "snap")
		if(this.start_input_x && this.start_input_y) {
			input_x = event.targetTouches ? event.targetTouches[0].pageX : event.pageX;
			input_y = event.targetTouches ? event.targetTouches[0].pageY : event.pageY;
			offset_x = 0;
			offset_y = 0;
			if(this.vertical) {
				offset_y = input_y - this.current_y;
			}
			else if(this.horisontal) {
				offset_x = input_x - this.current_x;
			}
			else {
				offset_x = input_x - this.current_x;
				offset_y = input_y - this.current_y;
			}
			u.a.translate(this, (this.element_x+offset_x), (this.element_y+offset_y));
		}
	}
}

Util.Form = u.f = new function() {
	this.init = function(form) {
		var i, o;
		form.onsubmit = function(event) {
			alert("bad submit!")
			return false;
		}
		form.setAttribute("novalidate", "novalidate");
		form._submit = this._submit;
		form.fields = new Object();
		form.actions = new Object();
		var fields = u.qsa(".field", form);
		for(i = 0; field = fields[i]; i++) {
			var abbr = u.qs("abbr", field);
			if(abbr) {
				abbr.parentNode.removeChild(abbr);
			}
			field.lN = u.qs("label", field);
			field._form = form;
			field._required = field.className.match(/required/);
			if(u.hasClass(field, "string|email|tel")) {
				field.iN = u.qs("input", field);
				field.iN.field = field;
				field.iN.val = function(value) {if(value) {this.value = value;} else {return this.value;}}
				form.fields[field.iN.name] = field.iN;
				this.activate(field.iN);
				this.validate(field.iN);
				u.e.addEvent(field.iN, "keyup", this._update);
				u.e.addEvent(field.iN, "change", this._changed);
				this.submitOnEnter(field.iN);
			}
			if(field.className.match(/numeric/)) {
				field.iN = u.qs("input", field);
				field.iN.field = field;
				field.iN.val = function(value) {if(value) {this.value = value;} else {return this.value;}}
				form.fields[field.iN.name] = field.iN;
				this.activate(field.iN);
				this.validate(field.iN);
				u.e.addEvent(field.iN, "keyup", this._update);
				u.e.addEvent(field.iN, "change", this._changed);
				this.submitOnEnter(field.iN);
			}
			if(field.className.match(/text/)) {
				field.iN = u.qs("textarea", field);
				field.iN.field = field;
				field.iN.val = function(value) {if(value) {this.value = value;} else {return this.value;}}
				form.fields[field.iN.name] = field.iN;
				this.activate(field.iN);
				this.validate(field.iN);
				u.e.addEvent(field.iN, "keyup", this._update);
				u.e.addEvent(field.iN, "change", this._changed);
				u.as(field.iN, "height", field.iN.scrollHeight+"px");
				field.iN.offset = 0;
				if(parseInt(u.gcs(field.iN, "height")) != field.iN.scrollHeight) {
					field.iN.offset = field.iN.scrollHeight - parseInt(u.gcs(field.iN, "height"));
				}
				u.as(field.iN, "height", (field.iN.scrollHeight - field.iN.offset) +"px");
				field.iN.setHeight = function() {
					var height = parseInt(u.gcs(this, "height")) + this.offset;
					if(this.value && this.scrollHeight > height) {
						u.as(this, "height", (this.scrollHeight - this.offset) +"px");
					}
				}
				u.e.addEvent(field.iN, "keyup", field.iN.setHeight);
			}
			if(field.className.match(/select/)) {
				field.iN = u.qs("select", field);
				field.iN.field = field;
				field.iN.val = function(value) {
					if(value) {
						var i, option;
						for(i = 0; option = this.options[i]; i++) {
							if(option.value == value) {
								this.selectedIndex = i;
								return i;
							}
						}
						return false;
					}
					else {
						return this.options[this.selectedIndex].value;
					}
				}
				form.fields[field.iN.name] = field.iN;
				this.activate(field.iN);
				this.validate(field.iN);
				u.e.addEvent(field.iN, "change", this._update);
				u.e.addEvent(field.iN, "change", this._changed);
			}
			if(field.className.match(/checkbox|boolean/)) {
				field.iN = u.qs("input[type=checkbox]", field);
				field.iN.field = field;
				field.iN.val = function(value) {
					if(value) {
						this.checked = true
					}
					else {
						if(this.checked) {
							return this.value;
						}
					}
					return false;
				}
				form.fields[field.iN.name] = field.iN;
				this.activate(field.iN);
				this.validate(field.iN);
				u.e.addEvent(field.iN, "change", this._update);
				u.e.addEvent(field.iN, "change", this._changed);
			}
			if(field.className.match(/radio/)) {
				field.iNs = u.qsa("input", field);
				var j, radio;
				for(j = 0; radio = field.iNs[j]; j++) {
					radio.field = field;
					radio.val = function(value) {
						if(value) {
							for(i = 0; option = this.field._form[this.name][i]; i++) {
								if(option.value == value) {
									option.checked = true;
								}
							}
						}
						else {
							var i, option;
							for(i = 0; option = this.field._form[this.name][i]; i++) {
								if(option.checked) {
									return option.value;
								}
							}
						}
						return false;
					}
					form.fields[radio.name] = radio;
					this.activate(radio);
					this.validate(radio);
					u.e.addEvent(radio, "change", this._update);
					u.e.addEvent(radio, "change", this._changed);
				}
			}
			if(field.className.match(/date/)) {
				if(typeof(this.customInit) == "object" && typeof(this.customInit["date"]) == "function") {
					this.customInit["date"](field);
				}
				else {
					field.iNs = u.qsa("select,input", field);
					var date = field.iNs[0];
					this.submitOnEnter(date);
					date.field = field;
					var month = field.iNs[1];
					this.submitOnEnter(month);
					month.field = field;
					var year = field.iNs[2];
					this.submitOnEnter(year);
					year.field = field;
					this.activate(date);
					this.activate(month);
					this.activate(year);
					u.e.addEvent(date, "change", this._validateInput);
					u.e.addEvent(month, "change", this._validateInput);
					u.e.addEvent(year, "change", this._validateInput);
					this.validate(date)
					this.validate(month)
					this.validate(year)
				}
			}
		}
		var hidden_fields = u.qsa("input[type=hidden]", form);
		for(i = 0; hidden_field = hidden_fields[i]; i++) {
			if(!form.fields[hidden_field.name]) {
				form.fields[hidden_field.name] = hidden_field;
			}
		}
		var actions = u.qsa(".actions li", form);
		for(i = 0; action = actions[i]; i++) {
			action.iN = u.qs("input,a", action);
			if(typeof(action.iN) == "object" && action.iN.type == "submit") {
				action.iN.onclick = function(event) {u.e.kill(event ? event : window.event);}
				u.e.click(action.iN);
				action.iN.clicked = function(event) {
					u.e.kill(event);
					if(!u.hasClass(this, "disabled")) {
						this.form.submitButton = this;
						this.form.submitInput = false;
						this.form._submit(event);
					}
				}
			}
			if(typeof(action.iN) == "object" && action.iN.name) {
				form.actions[action.iN.name] = action;
			}
		}
	}
	this._changed = function(event) {
		if(typeof(this.changed) == "function") {
			this.changed(this);
		}
		if(typeof(this.field._form.changed) == "function") {
			this.field._form.changed(this);
		}
	}
	this._update = function(event) {
		if(event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 16 && event.keyCode != 17 && event.keyCode != 18) {
			u.f.validate(this);
			if(typeof(this.updated) == "function") {
				this.updated(this);
			}
			if(typeof(this.field._form.updated) == "function") {
				this.field._form.updated(this);
			}
		}
	}
	this._submit = function(event, iN) {
		for(name in this.fields) {
			if(this.fields[name].field) {
				this.fields[name].used = true;
				u.f.validate(this.fields[name]);
			}
		}
		if(u.qs(".field.error", this)) {
			if(typeof(this.validationFailed) == "function") {
				this.validationFailed();
			}
		}
		else {
			if(typeof(this.submitted) == "function") {
				this.submitted(iN);
			}
			else {
				this.submit();
			}
		}
	}
	this._validate = function() {
		u.f.validate(this);
	}
	this.submitOnEnter = function(iN) {
		iN.onkeydown = function(event) {
			if(event.keyCode == 13) {
				u.e.kill(event);
				this.field._form.submitInput = this;
				this.field._form.submitButton = false;
				this.field._form._submit(event);
			}
		}
	}
	this.activate = function(iN) {
		this._focus = function(event) {
			this.field.focused = true;
			u.ac(this.field, "focus");
			u.ac(this, "focus");
			this.used = true;
		}
		this._blur = function(event) {
			this.field.focused = false;
			u.rc(this.field, "focus");
			u.rc(this, "focus");
		}
		u.e.addEvent(iN, "focus", this._focus);
		u.e.addEvent(iN, "blur", this._blur);
		u.e.addEvent(iN, "blur", this._validate);
	}
	this.isDefault = function(iN) {
		if(iN.field.default_value && iN.val() == iN.field.default_value) {
			return true;
		}
		return false;
	}
	this.fieldError = function(iN) {
		u.rc(iN, "correct");
		u.rc(iN.field, "correct");
		if(iN.used || !this.isDefault(iN) && iN.val()) {
			u.ac(iN, "error");
			u.ac(iN.field, "error");
			if(typeof(iN.validationFailed) == "function") {
				iN.validationFailed();
			}
		}
	}
	this.fieldCorrect = function(iN) {
		if(!this.isDefault(iN) && iN.val()) {
			u.ac(iN, "correct");
			u.ac(iN.field, "correct");
			u.rc(iN, "error");
			u.rc(iN.field, "error");
		}
		else {
			u.rc(iN, "correct");
			u.rc(iN.field, "correct");
			u.rc(iN, "error");
			u.rc(iN.field, "error");
		}
	}
	this.validate = function(iN) {
		if(u.hc(iN.field, "string")) {
			if((iN.value.length > 1 && !this.isDefault(iN)) || !iN.field._required) {
				this.fieldCorrect(iN);
			}
			else {
				this.fieldError(iN);
			}
		}
		if(u.hc(iN.field, "numeric")) {
			if((iN.value && !isNaN(iN.value) && !this.isDefault(iN)) || (!iN.field._required && !iN.value)) {
				this.fieldCorrect(iN);
			}
			else {
				this.fieldError(iN);
			}
		}
		if(u.hc(iN.field, "tel")) {
			if((iN.value.match(/^([\+0-9\-\.\s]){5,14}$/) && !this.isDefault(iN)) || (!iN.field._required && !iN.value)) {
				this.fieldCorrect(iN);
			}
			else {
				this.fieldError(iN);
			}
		}
		if(u.hc(iN.field, "email")) {
			if((iN.value.match(/^([^<>\\\/%$])+\@([^<>\\\/%$])+\.([^<>\\\/%$]{2,20})$/) && !this.isDefault(iN)) || (!iN.field._required && !iN.value)) {
				this.fieldCorrect(iN);
			}
			else {
				this.fieldError(iN);
			}
		}
		if(u.hc(iN.field, "text")) {
			if((iN.value.length > 2 && !this.isDefault(iN)) || !iN.field._required) {
				this.fieldCorrect(iN);
			}
			else {
				this.fieldError(iN);
			}
		}
		if(u.hc(iN.field, "select")) {
			if(iN.options[iN.selectedIndex].value != "" || !iN.field._required) {
				this.fieldCorrect(iN);
			}
			else {
				this.fieldError(iN);
			}
		}
		if(u.hc(iN.field, "checkbox|radio|boolean")) {
			if(iN.val() != "" || !iN.field._required) {
				this.fieldCorrect(iN);
			}
			else {
				this.fieldError(iN);
			}
		}
		if(u.hc(iN.field, "date")) {
			if(typeof(u.f.customValidate) == "object" && typeof(u.f.customValidate["date"]) == "function") {
				u.f.customValidate["date"](iN);
			}
			else {
			}
		}
	}
	this.getParams = function(form) {
		var type = "parameters";
		var ignore = false;
		if(arguments.length > 1 && typeof(arguments[1]) == "object") {
			for(argument in arguments[1]) {
				switch(argument) {
					case "type": type = arguments[1][argument]; break;
					case "ignore" : ignore = new RegExp("(^|\\s)" + arguments[1][argument] + "(\\s|$)"); break;
				}
			}
		}
		var i, input, select, textarea, param;
		params = new Array();
		if(form.submitButton && form.submitButton.name) {
			params[form.submitButton.name] = form.submitButton.value;
		}
		var inputs = u.qsa("input", form);
		var selects = u.qsa("select", form)
		var textareas = u.qsa("textarea", form)
		for(i = 0; input = inputs[i]; i++) {
			if(!input.className.match(/ignoreinput/i) && (!ignore || !input.className.match(ignore))) {
				if((input.type == "checkbox" || input.type == "radio") && input.checked) {
					params[input.name] = input.value;
				}
				else if(!input.type.match(/button|submit|checkbox|radio/i)) {
					params[input.name] = input.value;
				}
			}
		}
		for(i = 0; select = selects[i]; i++) {
			if(!select.className.match(/ignoreinput/i) && (!ignore || !select.className.match(ignore))) {
				params[select.name] = select.options[select.selectedIndex].value;
			}
		}
		for(i = 0; textarea = textareas[i]; i++) {
			if(!textarea.className.match(/ignoreinput/i) && (!ignore || !textarea.className.match(ignore))) {
				params[textarea.name] = textarea.value;
			}
		}
		if(type == "parameters") {
			var string = "";
			for(param in params) {
				string += param + "=" + encodeURIComponent(params[param]) + "&";
			}
			return string;
		}
		else if(type == "json") {
			object = u.f.convertNamesToJsonObject(params);
			return JSON.stringify(object);
		}
		else if(type == "object") {
			return params;
		}
		else {
			if(typeof(this.customSend) == "object" && typeof(this.customSend[type]) == "function") {
				return this.customSend[type](params);
			}
		}
	}
}
u.f.convertNamesToJsonObject = function(params) {
 	var indexes, root, indexes_exsists;
	var object = new Object();
	for(param in params) {
	 	indexes_exsists = param.match(/\[/);
		if(indexes_exsists) {
			root = param.split("[")[0];
			indexes = param.replace(root, "");
			if(typeof(object[root]) == "undefined") {
				object[root] = new Array();
			}
			object[root] = this.recurseName(object[root], indexes, params[param]);
		}
		else {
			object[param] = params[param];
		}
	}
	return object;
}
u.f.recurseName = function(object, indexes, value) {
	var index = indexes.match(/\[([a-zA-Z0-9\-\_]+)\]/);
	var current_index = index[1];
	indexes = indexes.replace(index[0], "");
 	if(indexes.match(/\[/)) {
		if(object.length !== undefined) {
			var i;
			var added = false;
			for(i = 0; i < object.length; i++) {
				for(exsiting_index in object[i]) {
					if(exsiting_index == current_index) {
						object[i][exsiting_index] = this.recurseName(object[i][exsiting_index], indexes, value);
						added = true;
					}
				}
			}
			if(!added) {
				temp = new Object();
				temp[current_index] = new Object();
				temp[current_index] = this.recurseName(temp[current_index], indexes, value);
				object.push(temp);
			}
		}
		else if(typeof(object[current_index]) != "undefined") {
			object[current_index] = this.recurseName(object[current_index], indexes, value);
		}
		else {
			object[current_index] = new Object();
			object[current_index] = this.recurseName(object[current_index], indexes, value);
		}
	}
	else {
		object[current_index] = value;
	}
	return object;
}
Util.Hash = u.h = new function() {
	this.catchEvent = function(callback, node) {
		this.node = node;
		this.node.callback = callback;
		hashChanged = function(event) {
			u.h.node.callback();
		}
		if("onhashchange" in window && !u.explorer(7, "<=")) {
			window.onhashchange = hashChanged;
		}
		else {
			u.current_hash = window.location.hash;
			window.onhashchange = hashChanged;
			setInterval(
				function() {
					if(window.location.hash !== u.current_hash) {
						u.current_hash = window.location.hash;
						window.onhashchange();
					}
				}, 200
			);
		}
	}
	this.cleanHash = function(string, levels) {
		if(!levels) {
			return string.replace(location.protocol+"//"+document.domain, "");
		}
		else {
			var i, return_string = "";
			var hash = string.replace(location.protocol+"//"+document.domain, "").split("/");
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.getCleanUrl = function(string, levels) {
		string = string.split("#")[0].replace(location.protocol+"//"+document.domain, "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.getCleanHash = function(string, levels) {
		string = string.replace("#", "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
}

Util.Image = u.i = new function() {
	this.load = function(e, src) {
		var image = new Image();
		image.e = e;
		u.addClass(e, "loading");
	    u.e.addEvent(image, 'load', u.i._loaded);
		image.src = src;
	}
	this._loaded = function(event) {
		u.removeClass(this.e, "loading");
		if(typeof(this.e.loaded) == "function") {
			this.e.loaded(event);
		}
	}
	this._progress = function(event) {
		u.bug("progress")
		if(typeof(this.e.progress) == "function") {
			this.e.progress(event);
		}
	}
	this._debug = function(event) {
		u.bug("event:" + event.type);
	}
}

Util.link = function(e) {
	var a = u.qs("a", e);
	u.addClass(e, "link");
	e.url = a.href;
	a.removeAttribute("href");
	u.e.click(e);
}

Util.absoluteX = u.absX = function(e) {
	if(e.offsetParent) {
		return e.offsetLeft + u.absX(e.offsetParent);
	}
	return e.offsetLeft;
}
Util.absoluteY = u.absY = function(e) {
	if(e.offsetParent) {
		return e.offsetTop + u.absY(e.offsetParent);
	}
	return e.offsetTop;
}
Util.relativeX = u.relX = function(e) {
	if(u.gcs(e, "position").match(/absolute/) == null && e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absolute/) == null) {
		return e.offsetLeft + u.relX(e.offsetParent);
	}
	return e.offsetLeft;
}
Util.relativeY = u.relY = function(e) {
	if(u.gcs(e, "position").match(/relative|absolute/) == null && e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absolute/) == null) {
		return e.offsetTop + u.relY(e.offsetParent);
	}
	return e.offsetTop;
}
Util.relativeOffsetX = u.relOffsetX = function(e) {
	if(e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absoute/) != null) {
		return u.absX(e.offsetParent); // - e.offsetLeft u.relOffsetX(e.offsetParent);
	}
	return 0; //u.absX(e) - e.offsetLeft;
}
Util.relativeOffsetY = u.relOffsetY = function(e) {
	if(e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absoute/) != null) {
		return u.absY(e.offsetParent);
	}
	return 0; // u.absY(e) - e.offsetTop;
}
Util.actualWidth = function(e) {
	return parseInt(u.gcs(e, "width"));
}
Util.actualHeight = function(e) {
	return parseInt(u.gcs(e, "height"));
}
Util.eventX = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.documentElement.offsetWidth;
}
Util.htmlHeight = u.htmlH = function() {
	return document.documentElement.offsetHeight;
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}

Util.createRequestObject = function(type) {
	var request_object = false;
		try {
			request_object = new XMLHttpRequest();
		}
		catch(e){
			request_object = new ActiveXObject("Microsoft.XMLHTTP");
		}
	if(request_object) {
		return request_object;
	}
	u.bug("Could not create HTTP Object");
	return false;
}
Util.Request = function(node, url, parameters, method, async) {
	if(typeof(node) != "object") {
		var node = new Object();
	}
	node.url = url;
	node.parameters = parameters ? parameters : "";
	node.method = method ? method : "GET";
	node.async = async ? async : false;
	if(node.method.match(/GET|POST/i)) {
		node.HTTPRequest = this.createRequestObject();
		node.HTTPRequest.node = node;
		if(node.async) {
			node.HTTPRequest.onreadystatechange = function() {
				if(node.HTTPRequest.readyState == 4) {
					u.validateResponse(this);
				}
			}
		}
		try {
			if(node.method.match(/GET/i)) {
				node.url += (!node.url.match(/\?/g) ? "?" : "&") + node.parameters;
				node.HTTPRequest.open(node.method, node.url, node.async);
				node.HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				node.HTTPRequest.send();
			}
			else if(node.method.toLowerCase() == "post") {
				node.HTTPRequest.open(node.method, node.url, node.async);
				node.HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				node.HTTPRequest.send(node.parameters);
			}
		}
		catch(e) {
			u.bug("request exception:" + e);
			u.validateResponse(node.HTTPRequest);
			return;
		}
		if(!async) {
			u.validateResponse(node.HTTPRequest);
		}
	}
	else if(node.method.match(/SCRIPT/i)) {
		node.url = url;
		var key = u.randomString();
		document[key] = new Object();
		document[key].node = node;
		document[key].responder = function(response) {
			var response_object = new Object();
			response_object.node = this.node;
			response_object.responseText = response;
			u.validateResponse(response_object);
		}
		u.ae(u.qs("head"), "script", ({"type":"text/javascript", "src":node.url + "?" + parameters + "&callback=document."+key+".responder"}));
	}
}
Util.requestParameters = function() {
	u.bug("params:" + arguments.length)
}
Util.testResponseForJSON = function(responseText) {
	if(responseText.trim().substr(0, 1).match(/[\{\[]/i) && responseText.trim().substr(-1, 1).match(/[\}\]]/i)) {
		try {
			var test = eval("("+responseText+")");
			if(typeof(test) == "object") {
				test.isJSON = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.testResponseForHTML = function(responseText) {
	if(responseText.trim().substr(0, 1).match(/[\<]/i) && responseText.trim().substr(-1, 1).match(/[\>]/i)) {
		try {
			var test = document.createElement("div");
			test.innerHTML = responseText;
			if(test.childNodes.length) {
				var body_class = responseText.match(/<body class="([a-z0-9A-Z_ ]+)"/);
				test.body_class = body_class ? body_class[1] : "";
				var head_title = responseText.match(/<title>([^$]+)<\/title>/);
				test.head_title = head_title ? head_title[1] : "";
				test.isHTML = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.evaluateResponse = function(responseText) {
	var object;
	if(typeof(responseText) == "object") {
		return responseText;
	}
	else {
		if(responseText.trim().substr(0, 1).match(/[\"\']/i) && responseText.trim().substr(-1, 1).match(/[\"\']/i)) {
				response_string = responseText.trim();
				var json = u.testResponseForJSON(response_string.substr(1, response_string.length-2));
				if(json) {
					return json;
				}
				var html = u.testResponseForHTML(response_string.substr(1, response_string.length-2));
				if(html) {
					return html;
				}
				return responseText;
		}
		var json = u.testResponseForJSON(responseText);
		if(json) {
			return json;
		}
		var html = u.testResponseForHTML(responseText);
		if(html) {
			return html;
		}
		return responseText;
	}
}
Util.validateResponse = function(response){
	var object;
	if(response) {
		try {
			if(response.status) {
				if(!response.status.toString().match(/403|404|500/)) {
					object = u.evaluateResponse(response.responseText);
				}
			}
			else {
				if(response.responseText) {
					object = u.evaluateResponse(response.responseText);
				}
			}
		}
		catch(exception) {
			u.bug("HTTPRequest exection:" + e);
		}
	}
	if(typeof(response.node.Response) == "function") {
		response.node.Response(object);
	}
}

Util.cutString = function(string, length) {
	var length_compensation, matches, i;
	length_compensation = 0;
	matches = string.match(/\&[\w\d]+\;/g);
	if(matches) {
		for(i = 0; match = matches[i]; i++){
			if(string.indexOf(match) < length){
				length += match.length-1;
			}
		}
	}
	return string.substring(0, length) + (string.length > length ? "..." : "");
}
Util.random = function(min, max) {
	return Math.round((Math.random() * (max - min)) + min);
}
Util.randomKey = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "1234567890abcdefghijklmnopqrstuvwxyz";
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.randomString = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.uuid = function() {
	var chars = '0123456789abcdef'.split('');
	var uuid = [], rnd = Math.random, r, i;
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';
	for(i = 0; i < 36; i++) {
		if(!uuid[i]) {
			r = 0 | rnd()*16;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
		}
 	}
	return uuid.join('');
}

Util.explorer = function(version, scope) {
	if(document.all) {
		var undefined;
		var current_version = navigator.userAgent.match(/(MSIE )(\d+.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.safari = function(version, scope) {
	if(navigator.userAgent.indexOf("Safari") >= 0) {
		var undefined;
		var current_version = navigator.userAgent.match(/(Safari\/)(\d+)(.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.webkit = function(version, scope) {
	if(navigator.userAgent.indexOf("AppleWebKit") >= 0) {
		var undefined;
		var current_version = navigator.userAgent.match(/(AppleWebKit\/)(\d+.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.firefox = function(version, scope) {
	var browser = navigator.userAgent.match(/(Firefox\/)(\d+\.\d+)/i);
	if(browser) {
		var current_version = browser[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.opera = function() {
	return (navigator.userAgent.indexOf("Opera") >= 0) ? true : false;
}
Util.windows = function() {
	return (navigator.userAgent.indexOf("Windows") >= 0) ? true : false;
}
Util.osx = function() {
	return (navigator.userAgent.indexOf("OS X") >= 0) ? true : false;
}

Util.Timer = u.t = new function() {
	this.actions = new Array();
	this.objects = new Array();
	this.timers = new Array();
	this.setTimer = function(object, action, timeout) {
		var id = this.actions.length;
		this.actions[id] = action;
		this.objects[id] = object;
		this.timers[id] = setTimeout("u.t.execute("+id+")", timeout);
		return id;
	}
	this.resetTimer = function(id) {
		clearTimeout(this.timers[id]);
		this.objects[id] = false;
	}
	this.execute = function(id) {
		this.objects[id].exe = this.actions[id];
		this.objects[id].exe();
		this.objects[id].exe = null;
		this.actions[id] = null;
		this.objects[id] = false;
		this.timers[id] = null;
	}
	this.valid = function(id) {
		return this.objects[id] ? true : false;
	}
}

Util.Objects = u.o = new Array();
Util.init = function(scope) {
	var i, e, elements, ij_value;
	elements = u.ges("i\:([_a-zA-Z0-9])+", scope);
	for(i = 0; e = elements[i]; i++) {
		while((ij_value = u.getIJ(e, "i"))) {
			u.removeClass(e, "i:"+ij_value);
			if(ij_value && typeof(u.o[ij_value]) == "object") {
				u.o[ij_value].init(e);
			}
		}
	}
}

Util.videoPlayer = function() {
	var player = document.createElement("div");
	u.ac(player, "player");
	player.video = u.ae(player, "video");
	player.video.player = player;
	if(typeof(player.video.play) == "function" && !u.explorer()) {
		player.load = function(src) {
			this.setup();
			if(this.className.match("/playing/")) {
				this.stop();
			}
			if(src) {
				this.video.src = this.correctSource(src);
				this.video.load();
				this.video.controls = false;
			}
		}
		player.play = function(position) {
			position = position == undefined ? false : position;
			if(this.video.currentTime && position !== false) {
				this.video.currentTime = position;
			}
			if(this.video.src) {
				this.video.play();
			}
		}
		player.loadAndPlay = function(src, position) {
			this.load(src);
			this.play(position);
		}
		player.pause = function() {
			this.video.pause();
		}
		player.stop = function() {
			this.video.pause();
			if(this.video.currentTime) {
				this.video.currentTime = 0;
			}
		}
		player.togglePlay = function() {
			if(this.className.match(/playing/g)) {
				this.pause();
			}
			else {
				this.play();
			}
		}
		player.setup = function() {
			if(u.qs("video", this)) {
				this.removeChild(this.video);
			}
			this.video = u.ie(this, "video");
			this.video.player = this;
			this._loadstart = function(event) {
				u.ac(this.player, "loading");
			}
			u.e.addEvent(this.video, "loadstart", this._loadstart);
			this._canplaythrough = function(event) {
				u.rc(this.player, "loading");
			}
			u.e.addEvent(this.video, "canplaythrough", this._canplaythrough);
			this._playing = function(event) {
				u.rc(this.player, "loading");
				u.ac(this.player, "playing");
			}
			u.e.addEvent(this.video, "playing", this._playing);
			this._paused = function(event) {
				u.rc(this.player, "playing");
			}
			u.e.addEvent(this.video, "pause", this._paused);
			this._stalled = function(event) {
				u.rc(this.player, "playing");
				u.ac(this.player, "loading");
			}
			u.e.addEvent(this.video, "stalled", this._paused);
			this._ended = function(event) {
				u.rc(this.player, "playing");
			}
			u.e.addEvent(this.video, "ended", this._ended);
		}
		player.eject = function() {
			if(this.parentNode) {
				if(u.qs("video", this)) {
					this.removeChild(this.video);
				}
				this.parentNode.removeChild(this);
			}
		}
	}
	else if(document.all || (navigator.plugins && navigator.mimeTypes["application/x-shockwave-flash"])) {
		player.removeChild(player.video);
		if(!player.id) {
			var id = u.randomString();
			player.id = id;
		}
		player.flash = true;
		player.load = function(src) {
			if(!this.ready) {
				this.setup();
			}
			if(this.ready) {
				if(this.className.match("/playing/")) {
					this.stop();
				}
				if(src) {
					this.video.loadVideo(this.correctSource(src));
				}
			}
			else {
				this.queue(this.load, src);
			}
		}
		player.play = function(position) {
			if(this.ready) {
				this.video.playVideo();
			}
			else {
				this.queue(this.play, position);
			}
		}
		player.loadAndPlay = function(src) {
				this.load(src);
				this.play(0);
		}
		player.pause = function() {
			if(this.ready) {
				this.video.pauseVideo();
			}
			else {
				this.queue(this.pause);
			}
		}
		player.stop = function() {
			if(this.ready) {
			}
			else {
				this.queue(this.stop);
			}
		}
		player.togglePlay = function() {
			if(this.ready) {
				if(this.className.match(/playing/g)) {
					this.pause();
				}
				else {
					this.play();
				}
			}
			else {
				this.queue(this.togglePlay);
			}
		}
		player.setup = function() {
			if(u.qs("object", this)) {
				this.removeChild(this.video);
			}
			this.ready = false;
			this.video = u.flash(this, "/media/flash/videoplayer.swf?id="+this.id, false, "100%", "100%");
		}
		player.queue = function(action) {
			if(!this.actionsQueue) {
				this.actionsQueue = new Array();
				this.paramsQueue = new Array();
			}
			this.actionsQueue[this.actionsQueue.length] = action;
			var params = false;
			if(arguments.length > 1) {
				params = arguments[1];
			}
			this.paramsQueue[this.paramsQueue.length] = params;
			this.hasQueue = true;
		}
		player.eject = function() {
			this.ready = false;
			if(this.parentNode) {
				this.parentNode.removeChild(this);
			}
		}
		u.flashVideoPlayer = new Object();
		u.flashVideoPlayer.ready = function(id, check) {
			var player = document.getElementById(id);
			player.ready = true;
			if(player.hasQueue) {
				player.hasQueue = false;
				var i, action;
				for(i = 0; action = player.actionsQueue[i]; i++) {
					player._action = action;
					if(player.paramsQueue[0]) {
						player._action(player.paramsQueue[0]);
					}
					else {
						player._action();
					}
				}
				player.actionsQueue = null;
			}
		}
		u.flashVideoPlayer.ended = function(id) {
			u.rc(document.getElementById(id), "playing");
		}
		u.flashVideoPlayer.paused = function(id) {
			u.rc(document.getElementById(id), "playing");
		}
		u.flashVideoPlayer.loadstart = function(id) {
			u.ac(document.getElementById(id), "loading");
		}
		u.flashVideoPlayer.playing = function(id) {
			u.rc(document.getElementById(id), "loading");
			u.ac(document.getElementById(id), "playing");
		}
		u.flashVideoPlayer.canplaythrough = function(id) {
			u.rc(document.getElementById(id), "loading");
		}
	}
	else {
		player.innerHTML = "<p>no HTML5 or flash</p>";
	}
	player.correctSource = function(src) {
		src = src.replace(/\.m4v|\.mp4|\.webm|\.ogv|\.3gp|\.mov/, "");
		if(this.flash) {
			return src+".mp4";
		}
		else if(this.video.canPlayType("video/mp4")) {
			return src+".mp4";
		}
		else if(this.video.canPlayType("video/ogg")) {
			return src+".ogv";
		}
		else if(this.video.canPlayType("video/3gpp")) {
			return src+".3gp";
		}
		else {
			return src+".mov";
		}
	}
	player.controls = u.ae(player, "div", "controls");
	var playpause = u.ae(player.controls, "a", "playpause");
	playpause.player = player;
	player.controls.playpause = playpause;
	u.e.click(playpause);
	playpause.clicked = function(event) {
		this.player.togglePlay();
	}
	player.hideControls = function() {
		this.t_controls = u.t.resetTimer(this.t_controls);
		u.a.transition(this.controls, "all 0.3s ease-out");
		u.a.setOpacity(this.controls, 0);
	}
	player.showControls = function() {
		if(this.t_controls) {
			this.t_controls = u.t.resetTimer(this.t_controls);
		}
		else {
			u.a.transition(this.controls, "all 0.5s ease-out");
			u.a.setOpacity(this.controls, 1);
		}
		this.t_controls = u.t.setTimer(this, this.hideControls, 1500);
	}
	u.e.addEvent(player, "mousemove", player.showControls);
	return player;
}
Util.Objects["page"] = new function() {
	this.init = function(page, event) {
		if(!page.initialized) {
			var i, node, nav_node;
			u.rc(page, "i:page");
			page.initialized = true;
			page.first_run = true;
			page.hN = u.qs("#header", page);
			page.hN.page = page;
			page.cN = u.qs("#content", page);
			page.cN.page = page;
			u.a.setOpacity(page.cN, 0);
			page.nN = u.qs("#navigation", page);
			if(page.nN) {
				page.nN = page.insertBefore(page.nN, page.cN);
				page.nN.page = page;
				page.nN.nav_nodes = u.qsa("li", page.nN);
				for(i = 0; nav_node = page.nN.nav_nodes[i]; i++) {
					u.link(nav_node);
					nav_node.clicked = function(event) {
						if(u.h.getCleanUrl(this.url).match(/http:\/\//)) {
							location.href = this.url;
						}
						else {
							location.hash = u.h.cleanHash(this.url);
						}
					}
				}
			}
			page.fN = u.qs("#footer", page);
			page.fN.page = page;
			page.ready = function() {
				u.h.catchEvent(this.cN.navigate, this.cN);
				u.e.addEvent(window, "resize", this.resized);
				this.transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
					u.addClass(this, "ready");
					this.cN.ready();
				}
				if(u.gcs(this, "opacity") == 1) {
					this.transitioned();
				}
				else {
					u.a.transition(this, "all 1.5s ease-in");
					u.a.setOpacity(this, 1);
				}
			}
			page.resized = function(event) {
				if(u.browserW() > 960) {
					var page = u.qs("#page");
					u.a.setWidth(page.cN.scene.mask, u.browserW());
					u.as(page.cN.scene, "marginRight", (u.browserW() - page.cN.scene.offsetWidth) / 2 + "px");
					u.as(page.cN.scene, "marginLeft", (u.browserW() - page.cN.scene.offsetWidth) / 2 + "px");
					if(typeof(page.cN.scene.resized) == "function") {
						page.cN.scene.resized();
					}
				}
			}
			page.cN.ready = function() {
				if(this.page.className.match(/ready/) && this.className.match(/ready/) && this.scene) {
					this.page.nN.setSelected();
					u.a.setHeight(this, this.scene.mask.offsetHeight);
					u.a.setHeight(this.scene.mask, this.scene.mask.offsetHeight);
					u.as(this.scene.mask, "position", "absolute");
					u.as(this.scene.mask, "left", "auto");
					u.as(this.scene.mask, "right", "0");
					u.as(this.scene.mask, "overflow", "hidden");
					u.a.setWidth(this.scene.mask, 0);
					u.a.setHeight(this.scene, this.scene.offsetHeight);
					u.as(this.scene, "position", "absolute");
					u.as(this.scene, "left", "auto");
					u.as(this.scene, "right", "0");
					u.as(this.scene, "marginRight", (u.browserW() - this.scene.offsetWidth) / 2 + "px");
					u.as(this.scene, "marginLeft", (u.browserW() - this.scene.offsetWidth) / 2 + "px");
					if(this.page.first_run) {
						this.page.first_run = false;
						u.as(this.scene.mask, "left", "0");
						u.as(this.scene.mask, "right", "auto");
						u.as(this.scene, "left", "0");
						u.as(this.scene, "right", "auto");
					}
					u.a.transition(this, "none");
					u.a.setOpacity(this, 1);
					this.scene.mask.transitioned = function(event) {
						this.transitioned = null;
						u.a.transition(this, "none");
						u.as(this, "overflow", "visible");
						if(typeof(this.page.cN.scene.go) == "function") {
							this.page.cN.scene.go();
						}
					}
					u.a.transition(this.scene.mask, "all 500ms cubic-bezier(.15,.03,.8,.14)");
					u.a.setWidth(this.scene.mask, u.browserW());
				}
			}
			page.nN.setSelected = function() {
				var i, nav_node;
				for(i = 0; nav_node = page.nN.nav_nodes[i]; i++) {
					var hash = u.h.getCleanHash(location.hash, 1);
					var url = u.h.getCleanUrl(nav_node.url, 1);
					if(hash == url) {
						u.ac(nav_node, "selected");
					}
					else {
						u.rc(nav_node, "selected");
					}
				}
			}
			page.cN.loadContent = function() {
				this.current_base_url = u.h.getCleanHash(location.hash, 1);
				u.Request(this, u.h.getCleanHash(location.hash));
			}
			page.cN.navigate = function() {
				if(this.current_base_url != u.h.getCleanHash(location.hash, 1) || u.h.getCleanHash(location.hash, 1) == u.h.getCleanHash(location.hash)) {
					if(this.scene && this.scene.bn_prev && this.scene.bn_prev.parentNode) {
						this.scene.bn_prev.transitioned = function() {
							this.transitioned = null;
							u.a.transition(this, "none");
							this.parentNode.removeChild(this);
						}
						this.scene.bn_next.transitioned = function() {
							this.transitioned = null;
							u.a.transition(this, "none");
							this.parentNode.removeChild(this);
						}
						u.a.transition(this.scene.bn_prev, "all 0.2s linear");
						u.a.transition(this.scene.bn_next, "all 0.2s linear");
						u.a.setOpacity(this.scene.bn_prev, 0);
						u.a.setOpacity(this.scene.bn_next, 0);
					}
					u.rc(this, "ready");
					this.Response = function(response) {
						var content = u.qs("#content", response);
						u.setClass(this, content.className);
						this.innerHTML = content.innerHTML;
						document.title = response.head_title;
						u.init(this);
					}
					if(!this.scene || u.gcs(this.scene.mask, "width") == 0) {
						this.loadContent();
					}
					else {
						this.scene.mask.transitioned = function(event) {
							this.transitioned = null;
							u.a.transition(this, "none");
							u.a.setOpacity(this.page.cN, 0);
							u.t.setTimer(this.page.cN, this.page.cN.loadContent, 100);
						}
						u.a.transition(this.scene.mask, "none");
						u.as(this.scene.mask, "left", "auto");
						u.as(this.scene.mask, "right", "0");
						u.as(this.scene.mask, "overflow", "hidden");
						u.a.transition(this.scene, "none");
						u.as(this.scene, "left", "auto");
						u.as(this.scene, "right", "0");
						u.a.transition(this.scene.mask, "all 500ms ease-in-out");
						u.a.setWidth(this.scene.mask, 0);
					}
				}
				else {
					if(typeof(this.scene.navigate) == "function") {
						this.scene.navigate();
					}
				}
			}
			if(location.hash.length < 2) {
				location.hash = u.h.getCleanUrl(location.href);
				u.init(page.cN);
			}
			else if(u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href)) {
				page.cN.navigate();
			}
			else {
				u.init(page.cN);
			}
			u.t.setTimer(page, page.ready, 50);
		}
	}
}
u.e.addEvent(window, "load", function(event) {u.o.page.init(u.qs("#page"), event);})

Util.Objects["content"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.mask = u.ae(scene.page.cN, "div", "mask");
		scene.mask.appendChild(scene);
		scene.mask.page = scene.page;
		scene.ready = function() {
				u.ac(this.page.cN, "ready");
				this.page.cN.ready();
		}
		scene.ready();
	}
}

Util.Objects["front"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.mask = u.ae(scene.page.cN, "div", "mask");
		scene.mask.appendChild(scene);
		scene.mask.page = scene.page;
		var i, node;
		scene.ready = function() {
			if(!this.page.cN.className.match(/ready/)) {
				u.ac(this.page.cN, "ready");
				this.page.cN.ready();
			}
		}
		scene.go = function() {
			if(this.stories.nodes.length > 1) {
				scene.bn_prev = u.ae(scene, "div", "prev");
				scene.bn_prev.span = u.ae(scene.bn_prev, "span");
				scene.bn_prev.scene = scene;
				u.as(scene.bn_prev, "left", -(u.absX(scene) + scene.bn_prev.span.offsetWidth)+"px");
				scene.bn_next = u.ae(scene, "div", "next");
				scene.bn_next.span = u.ae(scene.bn_next, "span");
				scene.bn_next.scene = scene;
				u.as(scene.bn_next, "right", -(u.absX(scene) + scene.bn_prev.span.offsetWidth)+"px");
				u.e.click(scene.bn_prev);
				scene.bn_prev.clicked = function(event) {
					u.e.kill(event);
					this.scene.stories.selectNode(this.scene.stories.selected_index-1);
				}
				u.e.click(scene.bn_next);
				scene.bn_next.clicked = function(event) {
					u.e.kill(event);
					this.scene.stories.selectNode(this.scene.stories.selected_index+1);
				}
				scene.bn_prev.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
				}
				u.a.transition(scene.bn_prev, "all 0.2s linear");
				u.a.setOpacity(scene.bn_prev, 1);
				scene.bn_next.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
				}
				u.a.transition(scene.bn_next, "all 0.2s linear");
				u.a.setOpacity(scene.bn_next, 1);
				if(u.e.event_pref == "mouse") {
					scene.prev_next_hide = function() {
						u.a.transition(this, "all 200ms ease-in");
						u.a.translate(this, 0, 0);
					}
					scene.prev_next_out = function() {
						this.t_hide = u.t.setTimer(this, this.scene.prev_next_hide, 200);
					}
					scene.prev_next_wait = function() {
						u.t.resetTimer(this.t_hide);
					}
					scene.prev_show = function() {
						u.t.resetTimer(this.t_hide);
						u.a.transition(this, "all 200ms ease-in");
						u.a.translate(this, this.span.offsetWidth, 0);
					}
					scene.next_show = function() {
						u.t.resetTimer(this.t_hide);
						u.a.transition(this, "all 200ms ease-in");
						u.a.translate(this, -this.span.offsetWidth, 0);
					}
					scene.bn_prev.onmouseover = scene.prev_show;
					scene.bn_next.onmouseover = scene.next_show;
					scene.bn_next.span.onmouseover = scene.prev_next_wait;
					scene.bn_prev.span.onmouseover = scene.prev_next_wait;
					scene.bn_prev.onmouseout = scene.prev_next_out;
					scene.bn_next.onmouseout = scene.prev_next_out;
				}
				this.stories.updateButtons(this.stories.selected_node.i);
			}
		}
		scene.resized = function() {
			if(this.bn_prev && this.bn_prev.parentNode) {
				u.a.transition(this.bn_prev, "none");
				u.a.transition(this.bn_next, "none");
				u.as(this.bn_prev, "left", -(u.absX(this) + this.bn_prev.span.offsetWidth)+"px");
				u.as(this.bn_next, "right", -(u.absX(this) + this.bn_next.span.offsetWidth)+"px");
			}
		}
		scene.beer = u.ae(scene, "div", "beer");
		scene.beer.scene = scene;
		scene.stories = u.qs(".stories", scene);
		scene.stories.nodes = u.qsa("li", scene.stories);
		scene.stories.scene = scene;
		if(scene.stories.nodes.length > 1) {
			scene.stories.bullets = u.ae(scene, "ul", "bullets");
			for(i = 0; node = scene.stories.nodes[i]; i++) {
				var bullet = u.ae(scene.stories.bullets, "li");
				bullet.i = i;
				bullet.scene = scene;
				u.e.click(bullet);
				bullet.clicked = function(event) {
					this.scene.stories.selectNode(this.i);
				}
			}
		}
		scene.stories.updateButtons = function(index) {
			var next = index+1 >= this.nodes.length ? 0 : index+1;
			var prev = index-1 < 0 ? this.nodes.length-1 : index-1;
			if(this.scene.bn_prev) {
				this.scene.bn_prev.span._node = this.nodes[prev];
				this.scene.bn_next.span._node = this.nodes[next];
				this.scene.bn_prev.span.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.innerHTML = u.cutString(this._node.nodeTitle, 14);
					u.a.transition(this, "all 0.3s ease-in-out");
					u.a.translate(this, 0, 0);
				}
				u.a.transition(this.scene.bn_prev.span, "all 0.3s ease-in-out");
				u.a.translate(this.scene.bn_prev.span, -this.scene.bn_prev.span.offsetWidth, 0);
				this.scene.bn_next.span.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.innerHTML = u.cutString(this._node.nodeTitle, 14);
					u.a.transition(this, "all 0.3s ease-in-out");
					u.a.translate(this, 0, 0);
				}
				u.a.transition(this.scene.bn_next.span, "all 0.3s ease-in-out");
				u.a.translate(this.scene.bn_next.span, this.scene.bn_next.span.offsetWidth, 0);
			}
		}
		scene.stories.nodeLoad = function() {
			this.selected_node.loaded = function(event) {
				u.as(this.main, "backgroundImage", "url("+event.target.src+")");
				this.loaded = function(event) {
					u.as(this.reflection, "backgroundImage", "url("+event.target.src+")");
					this.loaded = function(event) {
						u.as(this.scene.beer, "backgroundImage", "url("+event.target.src+")");
						u.ac(this, "ready");
						this.scene.stories.nodeEnter();
					}
					if(this.bottle_id) {
						u.i.load(this, Tuborg.beers_image_path + "/" + this.bottle_id + "/bottle_frontend." + this.bottle_format);
					}
					else {
						u.as(this.scene.beer, "backgroundImage", "none");
						u.ac(this, "ready");
						this.scene.stories.nodeEnter();
					}
				}
				u.i.load(this, Tuborg.front_slides_image_path + "/" + this.slide_id + "/reflection_frontend." + this.reflection_format);
			}
			u.i.load(this.selected_node, Tuborg.front_slides_image_path + "/" + this.selected_node.slide_id + "/slide_frontend." + this.selected_node.slide_format);
		}
		scene.stories.nodeEnter = function() {
			if(!this.scene.page.cN.className.match("ready")) {
				u.a.transition(this.selected_node, "all 500ms cubic-bezier(.11, .68, .47, .96)");
				u.a.translate(this.selected_node, 0, 0);
				u.a.transition(this.scene.beer, "all 600ms cubic-bezier(.47,.47,.22,.79)");
				u.a.translate(this.scene.beer, 0, 0);
				u.ac(this.scene, "ready");
				this.scene.ready();
			}
			else if(this.selected_node.className.match("ready")) {
				this.selected_node.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
				}
				this.scene.beer.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					u.ac(this.scene, "ready");
					this.scene.ready();
				}
				u.a.transition(this.selected_node, "all 500ms cubic-bezier(.11, .68, .47, .96)");
				u.a.translate(this.selected_node, 0, 0);
				u.a.transition(this.scene.beer, "all 600ms cubic-bezier(.47, .47, .47, .96)");
				u.a.translate(this.scene.beer, 0, 0);
			}
		}
		scene.stories.selectNode = function(index) {
			if(!this.selected_node) {
				this.selected_node = this.nodes[index];
				this.selected_index = this.selected_node.i;
				this.selected_node.initialized = true;
				u.a.transition(this.selected_node, "none");
				u.a.translate(this.selected_node, 0, 0);
				u.a.setOpacity(this.selected_node, 1);
				this.nodeLoad();
			}
			else {
				u.rc(this.scene, "ready");
				var org_node = this.selected_node;
				this.scene.direction = index - org_node.i;
				if(index < 0) {
					index = this.nodes.length-1;
				}
				else if(index >= this.nodes.length) {
					index = 0;
				}
				this.selected_node = this.nodes[index];
				this.selected_index = this.selected_node.i;
				org_node.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					u.a.setOpacity(this, 0);
				}
				this.scene.beer.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					u.a.translate(this, (u.browserW()*this.scene.direction), 0);
					u.a.transition(this.scene.stories.selected_node, "none");
					u.a.translate(this.scene.stories.selected_node, u.browserW()*this.scene.direction, 0);
					u.a.setOpacity(this.scene.stories.selected_node, 1);
					this.scene.stories.nodeLoad();
				}
				u.a.transition(org_node, "all 600ms cubic-bezier(1, .03, .96, .78)");
				u.a.translate(org_node, -(u.browserW()*this.scene.direction), 0);
				u.a.transition(this.scene.beer, "all 650ms cubic-bezier(1, .03, .96, .78)");
				u.a.translate(this.scene.beer, -(u.browserW()*this.scene.direction), 0);
			}
			for(i = 0; node = this.scene.stories.bullets.childNodes[i]; i++) {
				u.rc(node, "selected");
			}
			u.ac(this.scene.stories.bullets.childNodes[this.selected_node.i], "selected");
			this.updateButtons(this.selected_node.i);
		}
		for(i = 0; node = scene.stories.nodes[i]; i++) {
			node.scene = scene;
			node.i = i;
			node.nodeTitle = u.qs("a", node).innerHTML;
			node.slide_id = u.getIJ(node, "slide_id");
			node.slide_format = u.getIJ(node, "slide_format");
			node.reflection_format = u.getIJ(node, "reflection_format");
			node.bottle_id = u.getIJ(node, "bottle_id");
			node.bottle_format = u.getIJ(node, "bottle_format");
			node.reflection = u.ae(node, "div", "reflection");
			node.main = u.qs("h3", node);
			u.a.transition(node, "none");
			u.a.setOpacity(node, 0);
			u.a.translate(node, u.browserW(), 0);
			u.link(node.main);
			node.main.clicked = function(event) {
				if(u.h.getCleanUrl(this.url).match(/http:\/\//)) {
					location.href = this.url;
				}
				else {
					location.hash = u.h.getCleanUrl(this.url);
				}
			}
			if(u.e.event_pref == "touch") {
				node.main.moved = function(event) {
					u.e.kill(event);
					u.e.resetClickEvents(this);
				}
			}
		}
		scene.stories.selectNode(0);
		var beers = u.qs(".beers", scene);
		u.link(beers);
		beers.clicked = function(event) {
			location.hash = u.h.getCleanUrl(this.url);
		}
	}
}

Util.Objects["beers"] = new function() {
	this.init = function(scene) {
		var i, beer;
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.mask = u.ae(scene.page.cN, "div", "mask");
		scene.mask.appendChild(scene);
		scene.mask.page = scene.page;
		scene.beer = u.qs(".beer", scene);
		scene.beer.scene = scene;
		scene.ready = function() {
			if(this.beer.className.match(/ready/) && this.className.match(/ready/)) {
				if(this.page.cN.className.match(/ready/)) {
					this.beer.transitioned = function() {
						this.transitioned = null;
						u.a.transition(this, "none");
						u.as(this, "overflow", "visible");
						this.go();
					}
					u.a.transition(this.beer, "none");
					u.a.setOpacity(this.beer, 1);
					u.a.transition(this.beer, "all 500ms ease-in-out");
					u.a.setWidth(this.beer, this.offsetWidth);
				}
				else {
					u.ac(this.page.cN, "ready");
					this.page.cN.ready();
				}
			}
		}
		scene.go = function() {
			this.beer_navigation.clicked();
			if(this.beers.length > 0 && (!this.bn_prev || !this.bn_prev.parentNode)) {
				this.bn_prev = u.ae(this, "div", "prev");
				this.bn_prev.span = u.ae(this.bn_prev, "span");
				this.bn_prev.scene = this;
				u.as(this.bn_prev, "left", -(u.absX(this) + this.bn_prev.span.offsetWidth)+"px");
				this.bn_next = u.ae(this, "div", "next");
				this.bn_next.span = u.ae(this.bn_next, "span");
				this.bn_next.scene = this;
				u.as(this.bn_next, "right", -(u.absX(this) + this.bn_prev.span.offsetWidth)+"px");
				u.e.click(this.bn_prev);
				this.bn_prev.clicked = function(event) {
					u.e.kill(event);
					this.scene.selectBeer(this.scene.selected_node.i-1);
				}
				u.e.click(this.bn_next);
				this.bn_next.clicked = function(event) {
					u.e.kill(event);
					this.scene.selectBeer(this.scene.selected_node.i+1);
				}
				this.bn_prev.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
				}
				u.a.transition(this.bn_prev, "all 0.2s linear");
				u.a.setOpacity(this.bn_prev, 1);
				this.bn_next.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
				}
				u.a.transition(this.bn_next, "all 0.2s linear");
				u.a.setOpacity(this.bn_next, 1);
				if(u.e.event_pref == "mouse") {
					this.prev_next_hide = function() {
						u.a.transition(this, "all 200ms ease-in");
						u.a.translate(this, 0, 0);
					}
					this.prev_next_out = function() {
						this.t_hide = u.t.setTimer(this, this.scene.prev_next_hide, 200);
					}
					this.prev_next_wait = function() {
						u.t.resetTimer(this.t_hide);
					}
					this.prev_show = function() {
						u.t.resetTimer(this.t_hide);
						u.a.transition(this, "all 200ms ease-in");
						u.a.translate(this, this.span.offsetWidth, 0);
					}
					this.next_show = function() {
						u.t.resetTimer(this.t_hide);
						u.a.transition(this, "all 200ms ease-in");
						u.a.translate(this, -this.span.offsetWidth, 0);
					}
					this.bn_prev.onmouseover = this.prev_show;
					this.bn_next.onmouseover = this.next_show;
					this.bn_next.span.onmouseover = this.prev_next_wait;
					this.bn_prev.span.onmouseover = this.prev_next_wait;
					this.bn_prev.onmouseout = this.prev_next_out;
					this.bn_next.onmouseout = this.prev_next_out;
				}
				this.updateButtons(this.selected_node.i);
				if(typeof(this.beer.go) == "function") {
					this.beer.go();
				}
			}
		}
		scene.resized = function() {
			u.a.transition(this.beer_navigation, "none");
			u.as(this.beer_navigation, "left", -(this.offsetLeft)+"px");
			u.a.setWidth(this.beer_navigation, u.browserW());
			if(this.bn_prev && this.bn_prev.parentNode) {
				u.a.transition(this.bn_prev, "none");
				u.a.transition(this.bn_next, "none");
				u.as(this.bn_prev, "left", -(u.absX(this) + this.bn_prev.span.offsetWidth)+"px");
				u.as(this.bn_next, "right", -(u.absX(this) + this.bn_next.span.offsetWidth)+"px");
			}
		}
		scene.updateButtons = function(index) {
			var next = index+1 >= this.beers.length ? 0 : index+1;
			var prev = index-1 < 0 ? this.beers.length-1 : index-1;
			if(this.bn_prev) {
				this.bn_prev.span._node = this.beers[prev];
				this.bn_next.span._node = this.beers[next];
				this.bn_prev.span.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.innerHTML = u.cutString(this._node.nodeTitle, 14);
					u.a.transition(this, "all 0.3s ease-in-out");
					u.a.translate(this, 0, 0);
				}
				u.a.transition(this.bn_prev.span, "all 0.3s ease-in-out");
				u.a.translate(this.bn_prev.span, -this.bn_prev.span.offsetWidth, 0);
				this.bn_next.span.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.innerHTML = u.cutString(this._node.nodeTitle, 14);
					u.a.transition(this, "all 0.3s ease-in-out");
					u.a.translate(this, 0, 0);
				}
				u.a.transition(this.bn_next.span, "all 0.3s ease-in-out");
				u.a.translate(this.bn_next.span, this.bn_next.span.offsetWidth+10, 0);
			}
		}
		scene.selectBeer = function(index) {
			if(index < 0) {
				index = this.beers.length-1;
			}
			else if(index >= this.beers.length) {
				index = 0;
			}
			var i, node;
			for(i = 0; node = this.beers[i]; i++) {
				u.rc(node, "selected");
			}
			location.hash = u.h.getCleanUrl(this.beers[index].url);
			this.selected_node = this.beers[index];
			u.ac(this.beers[index], "selected");
			this.updateButtons(this.selected_node.i);
		}
		scene.Response = function(response) {
			var beer = u.qs("#content .beer", response);
			u.setClass(this.beer, beer.className);
			this.beer.innerHTML = beer.innerHTML;
			document.title = response.head_title;
			u.init();
		}
		scene.loadContent = function() {
			this.current_scene_url = u.h.getCleanHash(location.hash, 2);
			u.Request(this, u.h.getCleanHash(location.hash));
		}
		scene.navigate = function() {
			if(this.current_scene_url != u.h.getCleanHash(location.hash, 2)) {
				u.rc(this.beer, "ready");
				if(u.gcs(this.beer, "width") == 0) {
					this.loadContent();
				}
				else {
					this.beer.transitioned = function(event) {
						this.transitioned = null;
						u.a.transition(this, "none");
						u.a.setOpacity(this, 0);
						u.t.setTimer(this.scene, this.scene.loadContent, 100);
					}
					u.a.transition(this.beer, "none");
					u.as(this.beer, "left", "auto");
					u.as(this.beer, "right", "0");
					u.as(this.beer, "overflow", "hidden");
					u.a.transition(this.beer, "all 500ms ease-in-out");
					u.a.setWidth(this.beer, 0);
				}
			}
		}
		scene.beer_navigation = u.qs(".beers", scene);
		scene.beer_navigation.scene = scene;
		scene.beer_navigation.ul = u.qs("ul", scene.beer_navigation);
		scene.beer_navigation.ul.scene = scene;
		u.as(scene.beer_navigation, "left", -(scene.offsetLeft)+"px");
		u.a.setWidth(scene.beer_navigation, u.browserW());
		scene.beer_navigation.clicked = function(event) {
			var state = u.tc(this, "show");
			u.a.transition(this, "all 0.4s ease-in-out");
			if(state == "show") {
				u.a.setHeight(this, 128);
				this.t_hide = u.t.setTimer(this, this.clicked, 2000);
			}
			else {
				u.a.setHeight(this, 5);
			}
		}
		if(u.e.event_pref == "mouse") {
			scene.beer_navigation.onmouseover = function(event) {
				u.t.resetTimer(this.t_hide);
				u.a.transition(this, "all 300ms ease-in");
				u.a.setHeight(this, 128);
			}
			scene.beer_navigation.hide = function() {
				u.a.transition(this, "all 300ms ease-in-out");
				u.a.setHeight(this, 5);
			}
			scene.beer_navigation.onmouseout = function(event) {
				this.t_hide = u.t.setTimer(this, this.hide, 200);
			}
		}
		scene.beers = u.qsa("li", scene.beer_navigation);
		for(i = 0; beer = scene.beers[i]; i++) {
			beer.scene = scene;
			beer.i = i;
			beer.nodeTitle = u.qs("a", beer).innerHTML;
			u.link(beer);
			beer.clicked = function(event) {
				u.e.kill(event);
				this.scene.selectBeer(this.i);
			}
			if(u.h.getCleanUrl(beer.url) == u.h.getCleanHash(location.hash, 2)) {
				scene.selected_node = beer
				u.ac(beer, "selected");
			}
		}
		if(!scene.selected_node) {
			scene.selected_node = scene.beers[0];
			u.ac(scene.beers[0], "selected");
		}
		scene.loaded = function(event) {
			this.loaded = function(event) {
				u.ac(this, "ready");
				this.ready();
			}
			u.i.load(scene, "/img/bg_beers_small.png");
		}
		u.i.load(scene, "/img/sponsorships/bg_sponsorships.png");
	}
}
Util.Objects["beer"] = new function() {
	this.init = function(beer) {
		var i, node;
		beer.ready = function() {
			u.ac(this, "ready");
			this.scene.ready();
		}
		beer.go = function() {
		}
		beer.selected_node = false;
		beer.nodes = u.qsa("li.main,li.sponsorship", beer);
		beer.bottle = u.ae(beer, "div", "bottle");
		beer.bottle.beer = beer;
		beer.bottle_id = u.getIJ(beer, "bottle_id");
		beer.bottle_format = u.getIJ(beer, "bottle_format");
		beer.sponsorships = u.ae(beer, "ul", "sponsorships");
		beer.sponsorships.nodes = u.qsa("li.sponsorship", beer);
		if(beer.sponsorships.nodes.length > 0) {
			for(i = 0; node = beer.sponsorships.nodes[i]; i++) {
				var sponsorship = u.ae(beer.sponsorships, "li");
				u.ac(sponsorship, node.className);
				sponsorship.i = i+1;
				sponsorship.beer = beer;
				node._label = sponsorship;
				u.e.click(sponsorship);
				sponsorship.clicked = function(event) {
					if(u.hc(this, "selected")) {
						this.beer.selectNode(0);
					}
					else {
						this.beer.selectNode(this.i);
					}
				}
			}
		}
		beer.nodeLoad = function() {
			if(this.selected_node.className.match(/sponsorship/)) {
				this.selected_node.loaded = function(event) {
					u.as(this, "backgroundImage", "url("+event.target.src+")");
					u.ac(this, "ready");
					this.beer.nodeEnter();
				}
				u.i.load(this.selected_node, "/img/sponsorships/bg_" + this.selected_node.sponsorship + ".png");
			}
			else {
				this.selected_node.loaded = function(event) {
					u.as(this.beer.bottle, "backgroundImage", "url("+event.target.src+")");
					u.ac(this, "ready");
					this.beer.nodeEnter();
				}
				u.i.load(this.selected_node, Tuborg.beers_image_path + "/" + this.bottle_id + "/bottle_frontend." + this.bottle_format);
			}
		}
		beer.nodeEnter = function() {
			if(!this.className.match("ready")) {
				u.a.transition(this.selected_node, "all 500ms cubic-bezier(.11, .68, .47, .96)");
				u.a.translate(this.selected_node, 0, 0);
				this.ready();
			}
			else {
				this.selected_node.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.beer.ready();
				}
				u.a.transition(this.selected_node, "all 500ms cubic-bezier(.11, .68, .47, .96)");
				u.a.translate(this.selected_node, 0, 0);
			}
		}
		beer.selectNode = function(index) {
			if(!this.selected_node) {
				this.selected_node = this.nodes[index];
				this.selected_index = this.selected_node.i;
				this.selected_node.initialized = true;
				u.a.transition(this.selected_node, "none");
				u.a.translate(this.selected_node, 0, 0);
				u.a.setOpacity(this.selected_node, 1);
				this.nodeLoad();
			}
			else {
				var i, node;
				u.rc(this, "ready");
				var org_node = this.selected_node;
				this.direction = index - org_node.i;
				if(index < 0) {
					index = this.nodes.length-1;
				}
				else if(index >= this.nodes.length) {
					index = 0;
				}
				this.selected_node = this.nodes[index];
				this.selected_index = this.selected_node.i;
				org_node.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					u.a.setOpacity(this, 0);
					u.a.transition(this.beer.selected_node, "none");
					u.a.translate(this.beer.selected_node, u.browserW()*this.beer.direction, 0);
					u.a.setOpacity(this.beer.selected_node, 1);
					u.ac(this.beer, "ready");
					this.beer.nodeLoad();
				}
				u.a.transition(org_node, "all 600ms cubic-bezier(1, .03, .96, .78)");
				u.a.translate(org_node, -(u.browserW()*this.direction), 0);
			}
			for(i = 1; node = this.nodes[i]; i++) {
				if(node._label) {
					u.rc(node._label, "selected");
				}
			}
			if(this.selected_node.i > 0) {
				u.a.transition(this.nodes[this.selected_node.i]._label, "all 0.3s ease-in");
				u.ac(this.nodes[this.selected_node.i]._label, "selected");
			}
		}
		for(i = 0; node = beer.nodes[i]; i++) {
			node.beer = beer;
			node.i = i;
			node.item_id = u.getIJ(node, "id");
			if(node.className.match(/main/)) {
				node._description = u.qs(".description", node);
				node._description_height = node._description.offsetHeight;
				u.a.setHeight(node._description, 0);
				u.a.transition(node._description, "all 0.3s ease-in");
				node._info = node.insertBefore(u.ae(node, "div", "info"), u.qs(".facebook", node));
				node._info.node = node;
				u.e.click(node._info);
				node._info.clicked = function(event) {
					if(this.node._description.className.match(/show/)) {
						u.rc(this.node._description, "show");
						u.a.setHeight(this.node._description, 0);
					}
					else {
						u.ac(this.node._description, "show");
						u.a.setHeight(this.node._description, this.node._description_height);
					}
				}
			}
			else {
				node.sponsorship = node.className.replace(/\s|sponsorship/g, "");
			}
			u.a.setOpacity(node, 0);
			u.a.translate(node, u.browserW(), 0);
		}
		beer.selectNode(0);
	}
}
Util.Objects["stories"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.mask = u.ae(scene.page.cN, "div", "mask");
		scene.mask.appendChild(scene);
		scene.mask.page = scene.page;
		scene.ready = function() {
			if(!this.page.cN.className.match(/ready/)) {
				u.ac(this.page.cN, "ready");
				this.page.cN.ready();
			}
		}
		scene.go = function() {
			if(this.stories.nodes.length > 1) {
				scene.bn_prev = u.ae(scene, "div", "prev");
				scene.bn_prev.span = u.ae(scene.bn_prev, "span");
				scene.bn_prev.scene = scene;
				u.as(scene.bn_prev, "left", -(u.absX(scene) + scene.bn_prev.span.offsetWidth)+"px");
				scene.bn_next = u.ae(scene, "div", "next");
				scene.bn_next.span = u.ae(scene.bn_next, "span");
				scene.bn_next.scene = scene;
				u.as(scene.bn_next, "right", -(u.absX(scene) + scene.bn_prev.span.offsetWidth)+"px");
				u.e.click(scene.bn_prev);
				scene.bn_prev.clicked = function(event) {
					u.e.kill(event);
					this.scene.stories.selectNode(this.scene.stories.selected_index-1);
				}
				u.e.click(scene.bn_next);
				scene.bn_next.clicked = function(event) {
					u.e.kill(event);
					this.scene.stories.selectNode(this.scene.stories.selected_index+1);
				}
				scene.bn_prev.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
				}
				u.a.transition(scene.bn_prev, "all 0.2s linear");
				u.a.setOpacity(scene.bn_prev, 1);
				scene.bn_next.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
				}
				u.a.transition(scene.bn_next, "all 0.2s linear");
				u.a.setOpacity(scene.bn_next, 1);
				if(u.e.event_pref == "mouse") {
					scene.prev_next_hide = function() {
						u.a.transition(this, "all 200ms ease-in");
						u.a.translate(this, 0, 0);
					}
					scene.prev_next_out = function() {
						this.t_hide = u.t.setTimer(this, this.scene.prev_next_hide, 200);
					}
					scene.prev_next_wait = function() {
						u.t.resetTimer(this.t_hide);
					}
					scene.prev_show = function() {
						u.t.resetTimer(this.t_hide);
						u.a.transition(this, "all 200ms ease-in");
						u.a.translate(this, this.span.offsetWidth, 0);
					}
					scene.next_show = function() {
						u.t.resetTimer(this.t_hide);
						u.a.transition(this, "all 200ms ease-in");
						u.a.translate(this, -this.span.offsetWidth, 0);
					}
					scene.bn_prev.onmouseover = scene.prev_show;
					scene.bn_next.onmouseover = scene.next_show;
					scene.bn_next.span.onmouseover = scene.prev_next_wait;
					scene.bn_prev.span.onmouseover = scene.prev_next_wait;
					scene.bn_prev.onmouseout = scene.prev_next_out;
					scene.bn_next.onmouseout = scene.prev_next_out;
				}
				this.stories.updateButtons(this.stories.selected_node.i);
			}
		}
		scene.resized = function() {
			if(this.bn_prev && this.bn_prev.parentNode) {
				u.a.transition(this.bn_prev, "none");
				u.a.transition(this.bn_next, "none");
				u.as(this.bn_prev, "left", -(u.absX(this) + this.bn_prev.span.offsetWidth)+"px");
				u.as(this.bn_next, "right", -(u.absX(this) + this.bn_next.span.offsetWidth)+"px");
			}
		}
		scene.stories = u.qs(".stories", scene);
		scene.stories.nodes = u.qsa("li", scene.stories);
		scene.stories.scene = scene;
		if(scene.stories.nodes.length > 1) {
			scene.stories.bullets = u.ae(scene, "ul", "bullets");
			for(i = 0; node = scene.stories.nodes[i]; i++) {
				var bullet = u.ae(scene.stories.bullets, "li");
				bullet.i = i;
				bullet.scene = scene;
				u.e.click(bullet);
				bullet.clicked = function(event) {
					this.scene.stories.selectNode(this.i);
				}
			}
		}
		scene.stories.updateButtons = function(index) {
			var next = index+1 >= this.nodes.length ? 0 : index+1;
			var prev = index-1 < 0 ? this.nodes.length-1 : index-1;
			if(this.scene.bn_prev) {
				this.scene.bn_prev.span._node = this.nodes[prev];
				this.scene.bn_next.span._node = this.nodes[next];
				this.scene.bn_prev.span.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.innerHTML = u.cutString(this._node.nodeTitle, 14);
					u.a.transition(this, "all 0.3s ease-in-out");
					u.a.translate(this, 0, 0);
				}
				u.a.transition(this.scene.bn_prev.span, "all 0.3s ease-in-out");
				u.a.translate(this.scene.bn_prev.span, -this.scene.bn_prev.span.offsetWidth, 0);
				this.scene.bn_next.span.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.innerHTML = u.cutString(this._node.nodeTitle, 14);
					u.a.transition(this, "all 0.3s ease-in-out");
					u.a.translate(this, 0, 0);
				}
				u.a.transition(this.scene.bn_next.span, "all 0.3s ease-in-out");
				u.a.translate(this.scene.bn_next.span, this.scene.bn_next.span.offsetWidth+10, 0);
			}
		}
		scene.stories.nodeLoad = function() {
			if(!this.selected_node.initialized) {
				this.selected_node.initialized = true;
				this.selected_node.Response = function(response) {
					var scene = u.qs("#content .scene", response);
					this.innerHTML = scene.innerHTML;
					var story = u.qs(".story", this);
					this.item_id = u.getIJ(story, "id");
					this.image_format = u.getIJ(story, "image_format");
					this.loaded = function(event) {
						u.as(this, "backgroundImage", "url("+event.target.src+")");
						u.ac(this, "ready");
						this.scene.stories.nodeEnter();
					}
					u.i.load(this, Tuborg.stories_image_path + "/" + this.item_id + "/story_frontend." + this.image_format);
				}
				u.Request(this.selected_node, this.selected_node.url);
			}
			else {
				this.nodeEnter();
			}
		}
		scene.stories.nodeEnter = function() {
			if(!this.scene.page.cN.className.match("ready")) {
				u.a.transition(this.selected_node, "all 500ms cubic-bezier(.11, .68, .47, .96)");
				u.a.translate(this.selected_node, 0, 0);
				u.ac(this.scene, "ready");
				this.scene.ready();
			}
			else if(this.selected_node.className.match("ready")) {
				this.selected_node.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					u.ac(this.scene, "ready");
					this.scene.ready();
				}
				u.a.transition(this.selected_node, "all 500ms cubic-bezier(.11, .68, .47, .96)");
				u.a.translate(this.selected_node, 0, 0);
			}
		}
		scene.stories.selectNode = function(index) {
			if(!this.selected_node) {
				this.selected_node = this.nodes[index];
				this.selected_index = this.selected_node.i;
				u.a.transition(this.selected_node, "none");
				u.a.translate(this.selected_node, 0, 0);
				u.a.setOpacity(this.selected_node, 1);
				this.nodeLoad();
			}
			else {
				u.rc(this.scene, "ready");
				var org_node = this.selected_node;
				this.scene.direction = index - org_node.i;
				if(index < 0) {
					index = this.nodes.length-1;
				}
				else if(index >= this.nodes.length) {
					index = 0;
				}
				this.selected_node = this.nodes[index];
				this.selected_index = this.selected_node.i;
				org_node.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					u.a.setOpacity(this, 0);
					u.a.transition(this.scene.stories.selected_node, "none");
					u.a.translate(this.scene.stories.selected_node, u.browserW()*this.scene.direction, 0);
					u.a.setOpacity(this.scene.stories.selected_node, 1);
					this.scene.stories.nodeLoad();
				}
				u.a.transition(org_node, "all 600ms cubic-bezier(1, .03, .96, .78)");
				u.a.translate(org_node, -(u.browserW()*this.scene.direction), 0);
			}
			for(i = 0; node = this.scene.stories.bullets.childNodes[i]; i++) {
				u.rc(node, "selected");
			}
			u.ac(this.scene.stories.bullets.childNodes[this.selected_node.i], "selected");
			this.updateButtons(this.selected_node.i);
		}
		for(i = 0; node = scene.stories.nodes[i]; i++) {
			node.scene = scene;
			node.i = i;
			node.nodeTitle = u.qs("a", node).innerHTML;
			u.link(node);
			u.a.transition(node, "none");
			u.a.setOpacity(node, 0);
			u.a.translate(node, u.browserW(), 0);
		}
		scene.stories.selectNode(0);
		scene.ready();
	}
}
Util.Objects["story"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.mask = u.ae(scene.page.cN, "div", "mask");
		scene.mask.appendChild(scene);
		scene.mask.page = scene.page;
		scene.ready = function() {
			if(!this.page.cN.className.match(/ready/)) {
				u.ac(this.page.cN, "ready");
				this.page.cN.ready();
			}
		}
		var story = u.qs(".story", scene);
		scene.item_id = u.getIJ(story, "id");
		scene.image_format = u.getIJ(story, "image_format");
		scene.loaded = function(event) {
			u.as(this, "backgroundImage", "url("+event.target.src+")");
			u.ac(this, "ready");
			this.ready();
		}
		u.i.load(scene, Tuborg.stories_image_path + "/" + scene.item_id + "/story_frontend." + scene.image_format);
	}
}

Util.Objects["ads"] = new function() {
	this.init = function(scene) {
		var i, node;
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.mask = u.ae(scene.page.cN, "div", "mask");
		scene.mask.appendChild(scene);
		scene.mask.page = scene.page;
		scene.ready = function() {
			if(!this.page.cN.className.match(/ready/)) {
				u.ac(this.page.cN, "ready");
				this.page.cN.ready();
			}
		}
		scene.video = u.qs(".video", scene);
		scene.video.scene = scene;
		scene.player = u.videoPlayer();
		scene.videos = u.qsa(".videos li", scene);
		scene.video.playVideo = function(node) {
			u.as(this, "backgroundImage", "none");
			this.scene.selected_video = node;
			this.scene.player.eject();
			this.scene.player = this.scene.video.appendChild(this.scene.player);
			this.scene.player.loadAndPlay(Tuborg.ads_video_path + "/" + node.item_id + "/" + "video_960x540.mov");
			this.scene.setSelectedVideo();
		}
		scene.setSelectedVideo = function() {
			var i, node;
			for(i = 0; node = this.videos[i]; i++) {
				u.rc(node, "selected");
			}
			u.ac(this.selected_video, "selected");
		}
		scene.video.bn_play = u.qs(".play", scene.video);
		scene.video.bn_play.scene = scene;
		u.e.click(scene.video.bn_play);
		scene.video.bn_play.clicked = function(event) {
			this.scene.video.playVideo(this.scene.selected_video);
		}
		for(i = 0; node = scene.videos[i]; i++) {
			node.scene = scene;
			node.i = i;
			node.item_id = u.getIJ(node, "id");
			node.preview_format = u.getIJ(node, "preview_format");
			u.as(node, "backgroundImage", "url(" + Tuborg.ads_video_path + "/" + node.item_id + "/preview_frontend_thumbnail." + node.preview_format + ")")
			u.link(node);
			node.clicked = function(event) {
				this.scene.video.playVideo(this);
			}
		}
		scene.selected_video = u.qs(".videos li.selected", scene);
		if(!scene.selected_video) {
			scene.selected_video = scene.videos[0];
			scene.setSelectedVideo();
		}
		scene.video.loaded = function(event) {
			u.as(this, "backgroundImage", "url(" + event.target.src + ")");
			this.scene.ready();
		}
		u.i.load(scene.video, Tuborg.ads_video_path + "/" + scene.selected_video.item_id + "/preview_frontend." + scene.selected_video.preview_format);
	}
}

Util.Objects["about"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.mask = u.ae(scene.page.cN, "div", "mask");
		scene.mask.appendChild(scene);
		scene.mask.page = scene.page;
		scene.ready = function() {
			if(!this.page.cN.className.match(/ready/)) {
				u.ac(this.page.cN, "ready");
				this.page.cN.ready();
			}
		}
		scene.loaded = function(event) {
			this.loaded = function(event) {
				this.ready();
			}
			u.i.load(scene, "/img/bg_about_fondet.png");
		}
		u.i.load(scene, "/img/bg_about.png");
	}
}

Util.Objects["tubklub"] = new function() {
	this.init = function(scene) {
		scene.page = u.qs("#page");
		scene.page.cN.scene = scene;
		scene.mask = u.ae(scene.page.cN, "div", "mask");
		scene.mask.appendChild(scene);
		scene.mask.page = scene.page;
		scene.ready = function() {
			if(!this.page.cN.className.match(/ready/)) {
				u.ac(this.page.cN, "ready");
				this.page.cN.ready();
			}
		}
		scene._form = u.qs("form", scene);
		scene._form.scene = scene;
		u.f.init(scene._form);
		scene._form.submitted = function() {
			this.Response = function(response) {
				var content = u.qs("#content", response);
				if(content) {
					u.qs(".signup", this.scene).innerHTML = content.innerHTML;
				}
				else {
					u.qs(".signup", this.scene).innerHTML = "<p>Unknown error</p>";
				}
			}
			u.Request(this, this.action, u.f.getParams(this), this.method);
		}
		scene.loaded = function(event) {
			this.loaded = function(event) {
				this.ready();
			}
			u.i.load(scene, "/img/bg_tubklub_fb.png");
		}
		u.i.load(scene, "/img/bg_tubklub.png");
	}
}
Util.Objects["form"] = new function() {
	this.init = function(form) {
	}
}
