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

var allowedUris = ['http://localhost:9876*', 'https://respoke.github.io/*', 'http://respoke.io/*'];
var allowedDomains = ['respoke.github.io', 'localhost:9876'];

var allowedDomainsPref = 'media.getusermedia.screensharing.allowed_domains';
var enableScreensharingPref = 'media.getusermedia.screensharing.enabled';

exports.main = function (options, callbacks) {

    if (options.loadReason !== 'startup') {
        //add the domains!
        prefs.set(enableScreensharingPref, true);
        var domains = prefs.get(allowedDomainsPref).split(',');

        allowedDomains.forEach(function (domain) {
            if (domains.indexOf(domain) === -1) {
                //add the domain into the allowedDomains
                domains.push(domain);
            }
        });

        prefs.set(allowedDomainsPref, domains.join(','));

    }

    pageMod.PageMod({
        include: allowedUris,
        contentScriptFile: './content.js',
        contentScriptWhen: 'end'
    });

    //need to do the above for tabs already open

};

exports.onUnload = function(reason){
    if (reason !== 'shutdown') {

        //remove the domains we've set
        var domains = prefs.get(allowedDomainsPref).split(',');

        //remove the domains in allowedDomains from domains
        domains = domains.filter(function(domain) {
            return allowedDomains.indexOf(domain) === -1;
        });

        prefs.set(allowedDomainsPref, domains.join(','));

    }
}
