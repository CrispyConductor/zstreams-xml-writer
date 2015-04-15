# zstreams-xml-writer

Simple streaming XML writer intended to be paired with `zstreams-xml-parser` for XML transforms.
It inputs event objects from the XML parser and outputs XML data.

This has the following caveats:

* `processinginstruction`, `sgmldeclaration`, `opennamespace`, and `closenamespace` events are ignored.
* `attribute` events are not used.  Attributes are taken from the `opentag` event.
* No validation is performed; events are expected to be in a valid order.

Example (uppercases all text in the document):

```js
var zstreams = require('zstreams');
var XMLParser = require('zstreams-xml-parser');
var XMLWriter = require('zstreams-xml-writer');

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
```
