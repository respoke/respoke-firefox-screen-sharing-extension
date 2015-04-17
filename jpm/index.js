/*
 * Copyright 2015, Digium, Inc.
 * All rights reserved.
 *
 * This source code is licensed under The MIT License found in the
 * LICENSE file in the root directory of this source tree.
 *
 * For all details and documentation:  https://www.respoke.io
 */

'use strict';

var pageMod = require('sdk/page-mod');
var prefs = require("sdk/preferences/service");

var allowedUris = [
    'https://respoke.github.io/*',
    '*.ngrok.com'
];

var allowedDomains = [
    'respoke.github.io',
    '*.ngrok.com'
];

var allowedDomainsPref = 'media.getusermedia.screensharing.allowed_domains';
var enableScreensharingPref = 'media.getusermedia.screensharing.enabled';

exports.main = function (options) {

    if (options.loadReason !== 'startup') {
        /*
         * add the values in `allowedDomains` array to the allowed domains preference,
         * unblocking these domains from obtaining a screen sharing stream with `getUserMedia()`
         */
        prefs.set(enableScreensharingPref, true);
        var domains = prefs.get(allowedDomainsPref).split(',');

        allowedDomains.forEach(function (domain) {
            if (domains.indexOf(domain) === -1) {
                domains.push(domain);
            }
        });

        prefs.set(allowedDomainsPref, domains.join(','));
    }

    /*
     * include our content script on any page that matches a value from the `allowedUris` array,
     * which indicates to respoke that the firefox extension is loaded and available on the page.
     */
    pageMod.PageMod({
        include: allowedUris,
        attachTo: ['existing', 'top', 'frame'],
        contentScriptFile: './content.js',
        contentScriptWhen: 'end'
    });
};

exports.onUnload = function(reason){
    if (reason !== 'shutdown') {
        /*
         * remove the values in `allowedDomains` array from the allowed domains preference,
         * essentially undo'ing the changes our extension made when it was installed.
         */
        var domains = prefs.get(allowedDomainsPref).split(',');

        domains = domains.filter(function(domain) {
            return allowedDomains.indexOf(domain) === -1;
        });

        prefs.set(allowedDomainsPref, domains.join(','));
    }
};
