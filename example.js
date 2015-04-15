var zstreams = require('zstreams');
var XMLParser = require('zstreams-xml-parser');
var XMLWriter = require('./index');

zstreams
	.fromFile('./example.xml')
	.pipe(new XMLParser())
	.through(function(event) {
		if (event.type === 'text') {
			event.args[0] = event.args[0].toUpperCase();
		}
		return event;
	})
	.pipe(new XMLWriter())
	.pipe(process.stdout);
