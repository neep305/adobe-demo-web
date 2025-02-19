"use strict";

exports.default = void 0;
var _createRequestPayload = require("./createRequestPayload.js");
var _createAddIdentity = require("./createAddIdentity.js");
var _createHasIdentity = require("./createHasIdentity.js");
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
var _default = () => {
  const content = {};
  const payload = (0, _createRequestPayload.default)({
    content,
    addIdentity: (0, _createAddIdentity.default)(content),
    hasIdentity: (0, _createHasIdentity.default)(content)
  });
  payload.addEvent = event => {
    content.events = content.events || [];
    content.events.push(event);
  };
  payload.getDocumentMayUnload = () => {
    return (content.events || []).some(event => event.getDocumentMayUnload());
  };
  return payload;
};
exports.default = _default;