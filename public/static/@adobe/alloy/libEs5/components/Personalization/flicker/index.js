"use strict";

exports.showElements = exports.hideElements = exports.createShowContainers = exports.createHideContainers = void 0;
var _index = require("../../../utils/dom/index.js");
var _tagName = require("../../../constants/tagName.js");
var _index2 = require("../dom-actions/dom/index.js");
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

const PREHIDING_ID = "alloy-prehiding";
const HIDING_STYLE_DEFINITION = "{ visibility: hidden }";

// Using global is OK since we have a single DOM
// so storing nodes even for multiple Alloy instances is fine
const styleNodes = {};
const hideElements = prehidingSelector => {
  // if we have different events with the same
  // prehiding selector we don't want to recreate
  // the style tag
  if (styleNodes[prehidingSelector]) {
    return;
  }
  const nonce = (0, _index2.getNonce)();
  const attrs = {
    ...(nonce && {
      nonce
    })
  };
  const props = {
    textContent: prehidingSelector + " " + HIDING_STYLE_DEFINITION
  };
  const node = (0, _index.createNode)(_tagName.STYLE, attrs, props);
  (0, _index.appendNode)(document.head, node);
  styleNodes[prehidingSelector] = node;
};
exports.hideElements = hideElements;
const showElements = prehidingSelector => {
  const node = styleNodes[prehidingSelector];
  if (node) {
    (0, _index.removeNode)(node);
    delete styleNodes[prehidingSelector];
  }
};
exports.showElements = showElements;
const createHideContainers = logger => {
  return prehidingStyle => {
    if (!prehidingStyle) {
      return;
    }

    // If containers prehiding style has been added
    // by customer's prehiding snippet we don't
    // want to add the same node
    const node = (0, _index2.getElementById)(PREHIDING_ID);
    if (node) {
      return;
    }
    const nonce = (0, _index2.getNonce)();
    const attrs = {
      id: PREHIDING_ID,
      ...(nonce && {
        nonce
      })
    };
    const props = {
      textContent: prehidingStyle
    };
    const styleNode = (0, _index.createNode)(_tagName.STYLE, attrs, props);
    logger.logOnContentHiding({
      status: "hide-containers",
      message: "Prehiding style applied to hide containers.",
      logLevel: "info"
    });
    (0, _index.appendNode)(document.head, styleNode);
  };
};
exports.createHideContainers = createHideContainers;
const createShowContainers = logger => {
  return () => {
    // If containers prehiding style exists
    // we will remove it
    const node = (0, _index2.getElementById)(PREHIDING_ID);
    if (!node) {
      return;
    }
    logger.logOnContentHiding({
      status: "show-containers",
      message: "Prehiding style removed to show containers.",
      logLevel: "info"
    });
    (0, _index.removeNode)(node);
  };
};
exports.createShowContainers = createShowContainers;