# WebFaas

Minimalist FaaS framework for [node](http://nodejs.org).

[![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

## FaaS Micro Framework

## Features
  * Focus on high performance

### Example
```javascript
import { WebFaaS } from "@webfaas/webfaas";

const faas = new WebFaaS();

(async function(){
    await faas.start();

    var response = await faas.getCore().invokeAsync("@webfaaslabs/mathsum", "0.0.1", "", [2,3], "npm");
    
    console.log("2 + 3 = ", response);
})();
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@webfaas/webfaas.svg
[npm-url]: https://npmjs.org/package/@webfaas/webfaas

[travis-image]: https://img.shields.io/travis/webfaas/webfaas/master.svg?label=linux
[travis-url]: https://travis-ci.org/webfaas/webfaas

[coveralls-image]: https://img.shields.io/coveralls/github/webfaas/webfaas/master.svg
[coveralls-url]: https://coveralls.io/github/webfaas/webfaas?branch=master