function ShortAnswer(divId, options) {
	this._div = null;
	this._options = null;
	if (typeof divId == "undefined") {
		throw("Invalid container!");
	}
	this._div = document.getElementById(divId);
	if (this._div === null) {
		throw("Invalid container!");
	}

	this._options = (typeof options != "undefined") ? options: { name: "ShortAnswer1", text: "Sample question...", multiline: false, width: 300, length_limit: 0, show_chars_left: false, text_class: "shortanswer_text", input_class: "shortanswer_input" };
};


ShortAnswer.prototype.shortanswer = function() {
	// Make sure we have the right properties, and assign defaults to missing ones.
	if (typeof this._options.name == "undefined") {
		this._options.name = "ShortAnswer1";
	}

	if (typeof this._options.text == "undefined") {
		this._options.text = "Sample question...";
	}

	if (typeof this._options.multiline == "undefined") {
		this._options.multiline = false;
	}

	if (typeof this._options.width == "undefined") {
		this._options.width = 300;
	}

	if (typeof this._options.length_limit == "undefined") {
		this._options.length_limit = 0;
	}

	// Need the height if it is multiline
	if (this._options.multiline) {
		if (typeof this._options.height == "undefined") {
			this._options.height = 60;
		}
	}

	// Make sure we have the style classes
	if (typeof this._options.text_class == "undefined") {
		this._options.text_class = "shortanswer_text";
	}

	if (typeof this._options.input_class == "undefined") {
		this._options.input_class = "shortanswer_input";
	}

	// Build output
	var output = ["<label for='"];
	output.push(this._options.name);
	output.push("' class='");
	output.push(this._options.text_class);
	output.push("'>");
	output.push(this._options.text);
	output.push("</label><br />");
	if (this._options.multiline) {
		output.push("<textarea name='");
		output.push(this._options.name);
		output.push("' id='");
		output.push(this._options.name);
		output.push("' class='");
		output.push(this._options.input_class);
		output.push("' ");
		if (this._options.length_limit > 0) {
			output.push(this._getMaxLenFunc());
		}
		output.push("></textarea>");
	} else {
		output.push("<input type='text' name=");
		output.push(this._options.name);
		output.push("' id='");
		output.push(this._options.name);
		output.push("' class='");
		output.push(this._options.input_class);
		output.push("' ");
		if (this._options.length_limit > 0) {
			output.push(this._getMaxLenFunc());
		}
		output.push("/>");
	}

	if (this._options.show_chars_left) {
		output.push("<br /><label id='");
		output.push(this._options.name + "_leftcount");
		output.push("'>");
		output.push(this._options.length_limit);
		output.push("</label>");
	}

	this._div.innerHTML = output.join('');

	var ele = document.getElementById(this._options.name);
	ele.style.width = this._options.width;
	if (typeof this._options.height != "undefined") {
		ele.style.height = this._options.height;
	}
	
	return this;
};

ShortAnswer._ismaxlength = function(obj, len, show, labelId){
	if (obj.value.length>len) {
		obj.value=obj.value.substring(0,len);
	}

	if (show) {
		var ele = document.getElementById(labelId);
		if (typeof ele != "undefined" && ele != null) {
			ele.textContent = (len - obj.value.length).toString();
		}
	}
};

ShortAnswer.prototype._getMaxLenFunc = function() {
	var output = ["onkeyup=\"ShortAnswer._ismaxlength(this,", this._options.length_limit, ",", this._options.show_chars_left, ",'", this._options.name,"_leftcount'",");\" "].join('');
	return output;
};

ShortAnswer.prototype.getValue = function() {
	return document.getElementById(this._options.name).value;
};