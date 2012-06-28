function Likert(divId, options) {
	this._div = null;
	this._options = null;
	if (typeof divId == "undefined") {
			throw("Invalid container!");
		} else {
			this._div = document.getElementById(divId);
			if (this._div === null) {
				throw("Invalid container!");
			}
		}
		this._options = (typeof options != "undefined") ? options : { name:"likert1", range: [1,5], labels: ['1','2','3','4','5'], text: "Rating", show_labels: true, radio_class: "likertRadio", label_class: "likertLabel", text_class: "likertText" };
}

Likert.prototype.likert = function() {
	

	// Check mandatory properties and assign defaults if missing
	if (typeof this._options.name == "undefined") {
		this._options.name = "likert1";
	}

	if (typeof this._options.range == "undefined") {
		this._options.rang = [1,5];
	} else {
		if (this._options.range.length < 2) {
			throw("Invalid range. Please specify as an array! ex: [1,5] for the values 1 to 5. or [0,10,2] for the numbers between 0 and 10 incremented by 2.");
		}
	}

	if (typeof this._options.show_labels == "undefined") {
		this._options.show_labels = true;
	}

	if (typeof this._options.labels == "undefined") {
		if (this._options.show_labels) {
			this._options.labels = [];
			for (var i = this._options.range[0]; i <= this._options.range[1]; i += (typeof this._options.range[2] == "undefined") ? 1 : this._options.range[2]) {
				this._options.labels.push(i.toString());
			}
		}
	}

	// Check for passed css classes and assign defaults if missing
	if (typeof this._options.radio_class == "undefined") {
		this._options.radio_class = "likertRadio";
	}

	if (typeof this._options.label_class == "undefined") {
		this._options.label_class = "likertLabel";
	}

	if (typeof this._options.text_class == "undefined") {
		this._options.text_class = "likertText";
	}
	// Build output

	var output = ["<table><tr>"];

	// add labels if we're supposed to
	if (this._options.show_labels) {
		output.push("<th>&nbsp;</th>");
		for (var i = 0; i < this._options.labels.length; i++) {
			output.push("<th><label for='");
			output.push(this._options.name);
			output.push("_");
			output.push(i.toString());
			output.push("' ");
			if (typeof this._options.label_class != "undefined") {
				output.push("class='");
				output.push(this._options.label_class);
				output.push("' ");
			}
			output.push(">");
			output.push(this._options.labels[i]);
			output.push("</label>");
			output.push("</th>");
		}
		output.push("</tr><tr>");
	}
	var j = 0;
	output.push("<td");
	if (typeof output.text_class != "undefined") {
		output.push("class='");
		output.push(output.text_class);
		output.push("'");
	}

	output.push(">");
	output.push(this._options.text);
	output.push("</td>");

	for (var i = this._options.range[0]; i <= this._options.range[1]; i += (typeof this._options.range[2] == "undefined") ? 1 : this._options.range[2]) {
		output.push("<td><input type='radio' ");
		if (typeof this._options.radio_class != "undefined") {
			output.push("class='");
			output.push(this._options.radio_class);
			output.push("' ");
		}

		output.push("name='");
		output.push(this._options.name);
		output.push("' ");

		output.push("value='");
		output.push(i.toString());
		output.push("' ");

		output.push("id='");
		output.push(this._options.name);
		output.push("_");
		output.push(i.toString());
		output.push("' /></td>");
		j++;
	}
	output.push("</tr></table>");
	//console.log(output.join(''));
	this._div.innerHTML = output.join('');

	return this;
};

Likert.prototype.getValue = function() {
	var ele = document.getElementsByName(this._options.name);
	if (ele.length < 1) {
		throw("No such element!");
	}
	for (var i = 0; i < ele.length; i++) {
		if (ele[i].checked === true) {
			return ele[i].value;
		}
	}
	return null;
};