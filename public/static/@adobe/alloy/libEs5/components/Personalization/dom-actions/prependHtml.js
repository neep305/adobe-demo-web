"use strict";

exports.default = void 0;
var _index = require("../../../utils/dom/index.js");
var _index2 = require("./dom/index.js");
var _images = require("./images.js");
var _addNonceToInlineStyleElements = require("./addNonceToInlineStyleElements.js");
var _scripts = require("./scripts.js");
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
var _default = (container, html, decorateProposition) => {
  const fragment = (0, _index2.createFragment)(html);
  (0, _addNonceToInlineStyleElements.default)(fragment);
  const elements = (0, _index2.getChildNodes)(fragment);
  const scripts = (0, _scripts.getInlineScripts)(fragment);
  const scriptsUrls = (0, _scripts.getRemoteScriptsUrls)(fragment);
  const {
    length
  } = elements;
  let i = length - 1;

  // We have to proactively load images to avoid flicker
  (0, _images.loadImages)(fragment);

  // We are inserting elements in reverse order
  while (i >= 0) {
    const element = elements[i];
    decorateProposition(element);
    const firstChild = (0, _index2.getFirstChild)(container);
    if (firstChild) {
      (0, _index2.insertBefore)(firstChild, element);
    } else {
      (0, _index.appendNode)(container, element);
    }
    i -= 1;
  }
  (0, _scripts.executeInlineScripts)(container, scripts);
  return (0, _scripts.executeRemoteScripts)(scriptsUrls);
};
exports.default = _default;