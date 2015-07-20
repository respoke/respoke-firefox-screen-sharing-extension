/*
 * Copyright 2015, Digium, Inc.
 * All rights reserved.
 *
 * This source code is licensed under The MIT License found in the

 *
 * For all details and documentation:  https://www.respoke.io
 */

'use strict';

var pageMod = require('sdk/page-mod');
var data = require('sdk/self').data;
var prefs = require('sdk/preferences/service');

var allowedDomains = [
    '*.ngrok.io',
    '*.ngrok.com',
    'localhost',
    'localhost:3000'
];

var allowedDomainsPref = 'media.getusermedia.screensharing.allowed_domains';
var enableScreensharingPref = 'media.getusermedia.screensharing.enabled';

exports.main = function (options, callbacks) {
    // add the values in `allowedDomains` array to the allowed domains preference,
    // unblocking these domains from obtaining a screen sharing stream with `getUserMedia()`
    prefs.set(enableScreensharingPref, true);
    var domains = prefs.get(allowedDomainsPref).split(',');

    allowedDomains.forEach(function (domain) {
        if (domains.indexOf(domain) === -1) {
            domains.push(domain);
        }
    });

    prefs.set(allowedDomainsPref, domains.join(','));

    // indicate to respoke that the firefox extension is loaded and available on the page.
    pageMod.PageMod({
        include: '*',
        attachTo: ['existing', 'top', 'frame'],
        contentScriptFile: './content.js',
        contentScriptWhen: 'end'
    });
};

exports.onUnload = function(reason){
    if (reason !== 'shutdown') {
        // remove the values in `allowedDomains` array from the allowed domains preference,
        // essentially undo'ing the changes our extension made when it was installed.
        var domains = prefs.get(allowedDomainsPref).split(',');

        domains = domains.filter(function(domain) {
            return allowedDomains.indexOf(domain) === -1;
        });

        prefs.set(allowedDomainsPref, domains.join(','));
    }
};