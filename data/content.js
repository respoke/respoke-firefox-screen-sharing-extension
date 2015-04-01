/*
 * Copyright 2015, Digium, Inc.
 * All rights reserved.
 *
 * This source code is licensed under The MIT License found in the
 * LICENSE file in the root directory of this source tree.
 *
 * For all details and documentation:  https://www.respoke.io
 */

/*
 * Let the Respoke Library know the extension has loaded and so the domains are valid now
 */


document.dispatchEvent((function () {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('respoke-firefox-screensharing-available', true, true, 'available');
    return evt;
})());
