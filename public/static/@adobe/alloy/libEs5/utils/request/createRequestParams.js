"use strict";

exports.default = void 0;
var _index = require("../index.js");
/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/**
 * @typedef {{ datastreamId: string, [k: string]: Object }} Override
 * @typedef {Object} RequestPayload
 * @property {function(Override): void} mergeConfigOverride
 * @param {Object} params
 * @param {Override} params.localConfigOverrides
 * @param {Override} params.globalConfigOverrides
 * @param {RequestPayload} params.payload
 * @returns {{ payload: RequestPayload, datastreamIdOverride: string }}
 */
var _default = ({
  localConfigOverrides,
  globalConfigOverrides,
  payload
}) => {
  const requestParams = {
    payload
  };
  const {
    datastreamId,
    ...localConfigOverridesWithoutDatastreamId
  } = localConfigOverrides || {};
  if (datastreamId) {
    requestParams.datastreamIdOverride = datastreamId;
  }
  if (globalConfigOverrides && !(0, _index.isEmptyObject)(globalConfigOverrides)) {
    payload.mergeConfigOverride(globalConfigOverrides);
  }
  if (localConfigOverridesWithoutDatastreamId && !(0, _index.isEmptyObject)(localConfigOverridesWithoutDatastreamId)) {
    payload.mergeConfigOverride(localConfigOverridesWithoutDatastreamId);
  }
  return requestParams;
};
exports.default = _default;