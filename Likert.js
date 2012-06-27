var Likert = {

	likert: function(divId, options) {
		var div = null;
		if (typeof divId == "undefined") {
			throw("Invalid container!");
		} else {
			div = document.getElementById(divId);
			if (div == null) {
				throw("Invalid container!");
			}
		}
		options = (typeof options != "undefined") ? options : { name:"likert1", range: [1,5], labels: ['1','2','3','4','5'], text: "Rating", show_labels: true, radio_class: "likertRadio", label_class: "likertLabel", text_class: "likertText" };
		
		//console.log(options);

		// Check mandatory properties
		if (typeof options.name == "undefined") {
			throw("Likert name undefined!");
		}

		if (typeof options.range == "undefined") {
			throw("Likert range undefined!");
		} else {
			if (options.range.length < 2) {
				throw("Invalid range. Please specify as an array! ex: [1,5] for the values 1 to 5. or [0,10,2] for the numbers between 0 and 10 incremented by 2.");
			}
		}

		if (typeof options.show_labels == "undefined") {
			options.show_labels = true;
		}

		if (typeof options.labels == "undefined") {
			if (options.show_labels) {
				options.labels = new Array();
				for (var i = options.range[0]; i <= options.range[1]; i += (typeof options.range[2] == "undefined") ? 1 : options.range[2]) {
					options.labels.push(i.toString());
				}
			}
		}

		var output = ["<table><tr>"];
		// add labels if we're supposed to
		if (options.show_labels) {
			output.push("<th>&nbsp;</th>");
			for (var i = 0; i < options.labels.length; i++) {
				output.push("<th><label for='");
				output.push(options.name);
				output.push("_");
				output.push(i.toString());
				output.push("' ");
				if (typeof options.label_class != "undefined") {
					output.push("class='");
					output.push(options.label_class);
					output.push("' ");
				}
				output.push(">")
				output.push(options.labels[i]);
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
		output.push(options.text);
		output.push("</td>");

		for (var i = options.range[0]; i <= options.range[1]; i += (typeof options.range[2] == "undefined") ? 1 : options.range[2]) {
			output.push("<td><input type='radio' ");
			if (typeof options.radio_class != "undefined") {
				output.push("class='");
				output.push(options.radio_class);
				output.push("' ");
			}

			output.push("name='");
			output.push(options.name);
			output.push("' ");

			output.push("value='");
			output.push(i.toString());
			output.push("' ");

			output.push("id='");
			output.push(options.name);
			output.push("_");
			output.push(i.toString());
			output.push("'></td>");
			j++
		}
		output.push("</tr></table>");
		console.log(output.join(''));
		div.innerHTML = output.join('');

		return this;
	}
}