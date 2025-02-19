"use strict";

exports.default = void 0;
var _index = require("../../utils/validation/index.js");
var _index2 = require("../../utils/index.js");
/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/**
 * Verifies user provided event options.
 * @param {*} options The user event options to validate
 * @returns {*} Validated options
 */
var _default = ({
  options
}) => {
  const eventOptionsValidator = (0, _index.objectOf)({
    type: (0, _index.string)(),
    xdm: (0, _index.objectOf)({
      eventType: (0, _index.string)(),
      identityMap: _index2.validateIdentityMap
    }),
    data: (0, _index.objectOf)({}),
    documentUnloading: (0, _index.boolean)(),
    renderDecisions: (0, _index.boolean)(),
    decisionScopes: (0, _index.arrayOf)((0, _index.string)()).uniqueItems(),
    personalization: (0, _index.objectOf)({
      decisionScopes: (0, _index.arrayOf)((0, _index.string)()).uniqueItems(),
      surfaces: (0, _index.arrayOf)((0, _index.string)()).uniqueItems(),
      sendDisplayEvent: (0, _index.boolean)().default(true),
      includeRenderedPropositions: (0, _index.boolean)().default(false),
      defaultPersonalizationEnabled: (0, _index.boolean)(),
      decisionContext: (0, _index.objectOf)({})
    }).default({
      sendDisplayEvent: true
    }),
    datasetId: (0, _index.string)(),
    mergeId: (0, _index.string)(),
    edgeConfigOverrides: _index2.validateConfigOverride,
    initializePersonalization: (0, _index.boolean)()
  }).required().noUnknownFields();
  return eventOptionsValidator(options);
};
exports.default = _default;