Fork of [i18n-react](https://github.com/alexdrel/i18n-react)
===



i18react
===
* React (JS) text internationalization and externalizing.
* Markdown-ish syntax with variables support (including of react element type).
* Adding some new markdown code 

### Quick example

```js
var React = require('react');
var T = require('i18react');

T.setTexts({
  greeting: "### Hello, World!\n My name is **{myName}**! \n {{howAreYou}}",
  howAreYou:  "_How do you do?_"
});

React.render(
  <T.span text={{ key: "greeting", myName: "i18n-react" }}/>,
  document.getElementById('content')
);
```

Unsurprisingly renders:
********
### Hello, World!
My name is **i18n-react**!


## Usage
Npm compatible packager (browserify/webpack) is recommended, but ```Dist``` folder also contains UMD versions
(regular and minified) that can be used w/o commonJS packager.

```js
/* ES6 & TS */
import T from 'i18react';
/* commonJS */
var T = require('i18n-react').default;
/* when using UMD version w/o modules */
var T = window['i18n-react'].default;
```


Initialize once - probably in an application entry point js:
```js
T.setTexts({
  greeting: "Hello, World! My name is *{myName}*! \n {{howAreYou}}",
  howAreYou:  "_How do you do?_"
}, { MDFlavor: 0 });
/* or if there is yaml/json loader */
T.setTexts(require('../texts/texts-en.yml'));
```

Use it anywhere:
```xml
 <T.a text="path.to.string" href="a's href"/>
 <T.text tag='h1' text="path.to.string" context: "context-if-any"/>
 <T.p text={{ key: "path.to.string", var1: "string", var2: 2}} anyValidHtmlAttribute="p.will.have.it"/>
 <T.span text={{ key: "path.to.string", context: "context-if-any", var1: "string", var2: 2, var3: <span className="c">X</span>}}/>
 <h1>{T.translate("path.to.string", { context: "context", val: 1})}</h1>
```

### Creating new MDText object
In case you want to control lifecycle of the dictionary object (instead of default singleton)
it can be created with MDText constructor.
```js
import { MDText } from 'i18react';
let T = new MDText({...});
let x = T.translate("path.to.string");
<T.span text="path.to.string" />
```

### Difference between Keys and Context
Text attribute is a key that should point to string or JSON object, it has to be present in the language resource.
Then if needed the context is used to disambiguate betwen multiple texts according to the following rules:
1. Exact match for the context value.
1. For numeric context values - key with range, e.g. 2..4 that matches context value.
1. Explicit default - '_' key.
1. First key.

### Missing translations
By default if translation for the specified key is not present the key itself is returned
to help you find the missing translation.
This behaviour can be augmented by passing custom ``notFound`` value to setText options or MDText contructor.

This value can be either a string, or a function returning a string.
If it is a string, then it will be returned as is any time a key is missing.
If you provide a function, then the function will be run with the missing key
and context as arguments.

```js
// "Not Found!" will replace all missing translations
T.setTexts(translations, {
  notFound: 'Not Found!'
})

// "SomeKey <-- this guy" will appear instead
T.setTexts(translations, {
  notFound: key => `${key} <-- this guy`
})

// you can combine this solution with markdown!
T.setTexts(translations, {
  notFound: key => `**${key}**` // will render <strong>SomeKey</strong>
})
```

### Function in translation
Translation dictionaries can be extended with functions (as in notFound).

```js
T.setTexts({
    a: 'A',
    n: (_key, ctx) => ctx ? `Number ${ctx}` : '',
  });
T.translate('a')) // 'A'
T.translate('n', { context: 9 })) // 'Number 9'
```

## Markdown syntax

 + ``*italic*`` *italic*  - ``<em>``
 + ``_italic_`` _italic_  - ``<i>``
 + ``**bold**`` **bold** ``<strong>``
 + ``__bold__`` __bold__ ``<b>``
 + ``~underlined~`` <u>underlined</u> ``<u>``
 + ``~~strike~~`` ~~strike~~  ``<strike>``
 + ``\n`` New Line ``<br>``
 + ``[Paragraph 1][Paragraph 2]`` Multiple paragraphs ``<p>``
 + ``#``-``####`` Headers ``<h1>-<h4>``
 + \`\` \*as\*\_[IS]\_ \`\`

## Development
#### Commands
* Watch commonJS build:  ```$ npm start```
* Build commonJS/UMD version:  ```$ npm run build```
* Start dev server for examples: ```$ npm run examples``` (http://localhost:1818/webpack-dev-server/examples/)
* Build examples: ```$ npm run build:examples```
* Run tests (Firefox): ```$ npm test```
* Watch tests (Chrome): ```$ npm run test:watch```

