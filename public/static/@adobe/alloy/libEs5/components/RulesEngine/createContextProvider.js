"use strict";

exports.default = void 0;
var _parseUrl = require("../../utils/parseUrl.js");
var _flattenObject = require("../../utils/flattenObject.js");
var _libraryVersion = require("../../constants/libraryVersion.js");
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
var _default = ({
  eventRegistry,
  window,
  getBrowser
}) => {
  const pageLoadTimestamp = new Date().getTime();
  const getBrowserContext = () => {
    return {
      name: getBrowser()
    };
  };
  const getPageContext = () => {
    return {
      title: window.title,
      url: window.url,
      ...(0, _parseUrl.default)(window.url)
    };
  };
  const getReferrerContext = () => {
    return {
      url: window.referrer,
      ...(0, _parseUrl.default)(window.referrer)
    };
  };
  const getTimeContext = () => {
    const now = new Date();
    const currentTimestamp = now.getTime();
    return {
      pageLoadTimestamp,
      currentTimestamp,
      currentDate: now.getDate(),
      // Day of the week starts on Monday as is practiced in ISO 8601, but we want it to start on Sunday to match the authoring UI rule
      "~state.com.adobe.module.lifecycle/lifecyclecontextdata.dayofweek": now.getDay() + 1,
      "~state.com.adobe.module.lifecycle/lifecyclecontextdata.hourofday": now.getHours(),
      currentMinute: now.getMinutes(),
      currentMonth: now.getMonth(),
      currentYear: now.getFullYear(),
      pageVisitDuration: currentTimestamp - pageLoadTimestamp,
      "~timestampu": currentTimestamp / 1000,
      "~timestampz": now.toISOString()
    };
  };
  const getWindowContext = () => {
    const height = window.height;
    const width = window.width;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    return {
      height,
      width,
      scrollY,
      scrollX
    };
  };
  const coreGlobalContext = {
    browser: getBrowserContext(),
    page: getPageContext(),
    referringPage: getReferrerContext()
  };
  const getGlobalContext = () => {
    return {
      ...coreGlobalContext,
      ...getTimeContext(),
      window: getWindowContext(),
      "~sdkver": _libraryVersion.default
    };
  };
  const getContext = (addedContext = {}) => {
    const context = {
      ...getGlobalContext(),
      ...addedContext
    };
    return {
      ...(0, _flattenObject.default)(context),
      events: eventRegistry.toJSON()
    };
  };
  return {
    getContext
  };
};
exports.default = _default;