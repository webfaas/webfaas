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
import { IMessage, IMessageHeaders } from "@webfaas/webfaas-core";

const faas = new WebFaaS();
faas.scanAndLoadPlugins();

(async function(){
    await faas.start();

    let msgSum = {} as IMessage;
    msgSum.header = {} as IMessageHeaders;
    msgSum.header.messageID = "1";
    msgSum.header.name = "@webfaaslabs/math";
    msgSum.header.method = "sum";
    msgSum.header.version = "0.0.1";
    msgSum.payload = {x:2,y:3};

    let responseSum = await faas.getCore().sendMessage(msgSum);
    console.log("2 + 3 = ", responseSum);

    await faas.stop();
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