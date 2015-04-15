var zstreams = require('zstreams');
var Transform = zstreams.Transform;
var inherits = require('util').inherits;
var xmlescape = require('xml-escape');

function XMLEventWriter() {
	Transform.call(this, { readableObjectMode: false, writableObjectMode: true });
}
inherits(XMLEventWriter, Transform);

XMLEventWriter.prototype._transform = function(event, _encoding, cb) {
	var type = event.type;
	var args = event.args;
	var key;
	switch(type) {
		case 'text':
			this.push(xmlescape(args[0]));
			break;
		case 'doctype':
			this.push('<!DOCTYPE ' + args[0] + '>');
			break;
		case 'opentag':
			this.thisTagAttributes = {};
			this.push('<' + args[0].name);
			if (args[0].attributes) {
				for (key in args[0].attributes) {
					if (!this.thisTagAttributes[key]) {
						this.push(' ' + key + '="' + xmlescape(args[0].attributes[key]) + '"');
						this.thisTagAttributes[key] = args[0].attributes[key];
					}
				}
			}
			this.push('>');
			break;
		case 'closetag':
			this.push('</' + args[0] + '>');
			break;
		case 'comment':
			this.push('<!--' + xmlescape(args[0]) + '-->');
			break;
		case 'opencdata':
			this.push('<![CDATA[');
			break;
		case 'cdata':
			this.push(args[0]);
			break;
		case 'closecdata':
			this.push(']]>');
			break;
	}
	cb();
};

module.exports = XMLEventWriter;
