# Respoke Firefox Screen Sharing extension using cfx

## Support

Firefox versions 37 and below

## cfx

The `cfx` build tool utilises the Mozilla Add-on SDK. All new add-on development is recommended to be done using `jpm`; but any users still using a Firefox version before 38 will require your extension to be built with `cfx`

To get started with `cfx`, check out the Mozilla [documentation](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/cfx)

## Local Development

Currently, Firefox only allows URIs using the `https` protocol. Unlike Google Chrome, they do not currently support development using `http://localhost[:port]` - we recommend using a service such as [ngrok](https://ngrok.com/) which allow you to access your local environment with the https protocol.

## Changes required for your domain(s) 

To get this extension working for you and your domains, you'll need to fork it and change a few variables. In `./lib/main.js` you'll need to change 3 variables.

```js
var allowedUris = ['https://respoke.github.io/*', 'https://1660a8b4.ngrok.com/*'];
var allowedDomains = ['respoke.github.io', '*.ngrok.com'];
var allowedSpecificUris = ['https://1660a8b4.ngrok.com/', 'https://respoke.github.io'];
```

### allowedUris

These are the URIs that Firefox will inject the extension into on page load. These URIs can only have 1 `*` character in them to depect a wildcard, this is defferent to Google Chrome's implementation. This is an array of URI.

### allowedDomains

These are the domains that the extension will "enable" for screen-sharing. Firefox requires you to enable specific domains for screen-sharing use. These again can only have 1 `*` character in them. This is an array of domain names.

### allowedSpecificUris

These are specific URIs for use when the extension is installed and injects it's content into already loaded tabs. At this time, these need to be specific URIs - however this can be changed where the extension injects into already loaded tabs in `./lib/main.js` on line `56`; currently no wildcard characters are allowed in the URIs. This is an array of specific URI.

## License

Respoke Screen Sharing Firefox extensions are licensed under the [MIT license](LICENSE).
