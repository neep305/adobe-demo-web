"use strict";

exports.default = void 0;
var _createMediaSessionCacheManager = require("./createMediaSessionCacheManager.js");
var _createMediaEventManager = require("./createMediaEventManager.js");
var _createTrackMediaEvent = require("./createTrackMediaEvent.js");
var _configValidators = require("./configValidators.js");
var _createStreamingMediaComponent = require("./createStreamingMediaComponent.js");
var _createTrackMediaSession = require("./createTrackMediaSession.js");
var _createMediaResponseHandler = require("./createMediaResponseHandler.js");
var _injectTimestamp = require("../Context/injectTimestamp.js");
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
/* eslint-disable import/no-restricted-paths */

const createStreamingMedia = ({
  config,
  logger,
  eventManager,
  sendEdgeNetworkRequest,
  consent
}) => {
  const mediaSessionCacheManager = (0, _createMediaSessionCacheManager.default)({
    config
  });
  const mediaEventManager = (0, _createMediaEventManager.default)({
    config,
    eventManager,
    logger,
    consent,
    sendEdgeNetworkRequest,
    setTimestamp: (0, _injectTimestamp.default)(() => new Date())
  });
  const trackMediaEvent = (0, _createTrackMediaEvent.default)({
    mediaSessionCacheManager,
    mediaEventManager,
    config
  });
  const trackMediaSession = (0, _createTrackMediaSession.default)({
    config,
    mediaEventManager,
    mediaSessionCacheManager
  });
  const mediaResponseHandler = (0, _createMediaResponseHandler.default)({
    mediaSessionCacheManager,
    config,
    trackMediaEvent
  });
  return (0, _createStreamingMediaComponent.default)({
    config,
    trackMediaEvent,
    mediaEventManager,
    mediaResponseHandler,
    trackMediaSession
  });
};
createStreamingMedia.namespace = "Streaming media";
createStreamingMedia.configValidators = _configValidators.default;
var _default = exports.default = createStreamingMedia;