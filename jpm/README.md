# Respoke Firefox Screen Sharing extension using the jpm build tool

## Support

Firefox versions 38 and above

## jpm

The `jpm` build tool utilises the Mozilla Add-on SDK. All new add-on development is recommended to be done using `jpm`.

To build this addon, simply

```bash
npm install -g jpm
```

then run

```bash
jpm xpi
```

in the root of this folder (where the `package.json` is).


For full details on how to use the `jpm` command line tool, check out the Mozilla
[documentation](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm)

## Local Development

Currently, Firefox only allows URIs using the `https` protocol. Unlike Google Chrome, they do not currently support
development using `http://localhost[:port]` - we recommend using a service such as [ngrok](https://ngrok.com/) which
allows you to access your local environment with the https protocol.

## Changes required

To get this extension working for you and your domains, you'll need to fork it and change a few variables in
`./index.js`:

```js
var allowedUris = [
  'https://respoke.github.io/*',
  '*.ngrok.com'
];

var allowedDomains = [
  'respoke.github.io',
  '*.ngrok.com'
];
```

### allowedUris

These are the URIs that Firefox will inject the extension into on page load. See the [Firefox documentation of the
match-pattern library](https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/util_match-pattern) for details
on what patterns are acceptable. This is an array of URI.

### allowedDomains

These are the domains that the extension will "enable" for screen-sharing. Firefox requires you to enable specific
domains for screen-sharing use. These can only have 1 '`*`' character in them. This is an array of domain names.

### package.json changes

You will also want to change the `title`, `name`, `description`, `id`, and `author` of the package in `package.json`
to values that make sense for you. These values will determine what the name and description look like for your package,
and the `id` should be unique to your package.

## License

Respoke Screen Sharing Firefox extensions are licensed under the [MIT license](LICENSE).
