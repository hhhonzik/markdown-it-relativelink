# markdown-it-ins

__v1.+ requires `markdown-it` v4.+, see changelog.__

`[[relative link]]` => `<a href="http://myprefix/relative-link">relative link</ins>`



## Install

node.js, browser:

```bash
npm install markdown-it-relativelink --save
bower install markdown-it-relativelink --save
```

## Use

```js
var md = require('markdown-it')()
            .use(require('markdown-it-relativelink')({
                prefix: 'http://example.com/'
            }));

md.render('[[link]]') // => '<p><a href="http://example.com/link">link</a></p>'
```
