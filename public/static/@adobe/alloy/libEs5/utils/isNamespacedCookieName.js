"use strict";

exports.default = void 0;
var _cookieNamePrefix = require("../constants/cookieNamePrefix.js");
var _sanitizeOrgIdForCookieName = require("./sanitizeOrgIdForCookieName.js");
/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/**
 * Determines whether a cookie name is namespaced according to the contract
 * defined by the server.
 * @param {String} orgId The org ID configured for the Alloy instance.
 * @param {String} name The cookie name.
 * @returns {boolean}
 */
var _default = (orgId, name) => name.indexOf(_cookieNamePrefix.default + "_" + (0, _sanitizeOrgIdForCookieName.default)(orgId) + "_") === 0;
exports.default = _default;