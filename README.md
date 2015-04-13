# Screen Sharing in Firefox

Firefox doesn't need an extension to give WebRTC developers access to the GUI which allows users to access screens /
tabs / extensions; unlike Google Chrome. However, you do need to enable the domain you want to screenshare on. These
extenions enable the domain, as well as tell the `respoke.js` library that the domain is enabled.

There are two extensions within this repo, both built using the "Mozilla Addon SDK", but both use a different build
mechanism. One uses the `cfx` build tool, and the other uses `jpm`. The `cfx` build tool is deprecated, however
extensions built with `jpm` need Firefox 38 and above, which is not currently "stable".

Each extension has it's own README with instructions on how to build your extension.

## Where can I screen share?

Currently Firefox only allows domains using the `https` protocol. Unlike Google Chrome, they do not currently support
development using `http://localhost[:port]` - we recommend using a service such as [ngrok](https://ngrok.com/) which
allow you to access your local environment with the https protocol.

## License

Respoke Screen Sharing Firefox extensions are licensed under the [MIT license](LICENSE).
