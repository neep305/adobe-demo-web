"use strict";

exports.default = void 0;
var _index = require("../utils/index.js");
var _debugQueryParam = require("../constants/debugQueryParam.js");
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
var _default = ({
  console,
  locationSearch,
  createLogger,
  instanceName,
  createNamespacedStorage,
  getMonitors
}) => {
  const parsedQueryString = _index.queryString.parse(locationSearch);
  const storage = createNamespacedStorage("instance." + instanceName + ".");
  const debugSessionValue = storage.session.getItem("debug");
  let debugEnabled = debugSessionValue === "true";
  let debugEnabledWritableFromConfig = debugSessionValue === null;
  const getDebugEnabled = () => debugEnabled;
  const setDebugEnabled = (value, {
    fromConfig
  }) => {
    if (!fromConfig || debugEnabledWritableFromConfig) {
      debugEnabled = value;
    }
    if (!fromConfig) {
      // Web storage only allows strings, so we explicitly convert to string.
      storage.session.setItem("debug", value.toString());
      debugEnabledWritableFromConfig = false;
    }
  };
  if (parsedQueryString[_debugQueryParam.default] !== undefined) {
    setDebugEnabled((0, _index.stringToBoolean)(parsedQueryString[_debugQueryParam.default]), {
      fromConfig: false
    });
  }
  return {
    setDebugEnabled,
    logger: createLogger({
      getDebugEnabled,
      context: {
        instanceName
      },
      getMonitors,
      console
    }),
    createComponentLogger(componentName) {
      return createLogger({
        getDebugEnabled,
        context: {
          instanceName,
          componentName
        },
        getMonitors,
        console
      });
    }
  };
};
exports.default = _default;