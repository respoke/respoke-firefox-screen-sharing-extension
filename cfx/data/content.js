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

document.dispatchEvent(new CustomEvent('respoke-firefox-screen-sharing-available', {
    detail: 'available',
    bubbles: true,
    cancelable: false
}));