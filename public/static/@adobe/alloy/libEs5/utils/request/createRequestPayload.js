"use strict";

exports.default = void 0;
var _index = require("../index.js");
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
// This provides the base functionality that all types of
// request payloads share.
var _default = options => {
  const {
    content,
    addIdentity,
    hasIdentity
  } = options;
  const mergeConfigOverride = (0, _index.createMerger)(content, "meta.configOverrides");
  return {
    mergeMeta: (0, _index.createMerger)(content, "meta"),
    mergeState: (0, _index.createMerger)(content, "meta.state"),
    mergeQuery: (0, _index.createMerger)(content, "query"),
    mergeConfigOverride: updates => mergeConfigOverride((0, _index.prepareConfigOverridesForEdge)(updates)),
    addIdentity,
    hasIdentity,
    toJSON() {
      return content;
    }
  };
};
exports.default = _default;