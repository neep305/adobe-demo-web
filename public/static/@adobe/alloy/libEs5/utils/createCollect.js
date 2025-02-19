"use strict";

exports.default = void 0;
var _eventType = require("../constants/eventType.js");
var _propositionEventType = require("../constants/propositionEventType.js");
var _index = require("./index.js");
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
var _default = ({
  eventManager,
  mergeDecisionsMeta
}) => {
  // Called when a decision is auto-rendered for the __view__ scope or a SPA view(display and empty display notification)
  return ({
    decisionsMeta = [],
    propositionAction,
    documentMayUnload = false,
    eventType = _eventType.DISPLAY,
    propositionEventTypes = [(0, _propositionEventType.getPropositionEventType)(eventType)],
    viewName
  }) => {
    const event = eventManager.createEvent();
    const data = {
      eventType
    };
    if (viewName) {
      data.web = {
        webPageDetails: {
          viewName
        }
      };
    }
    if ((0, _index.isNonEmptyArray)(decisionsMeta)) {
      mergeDecisionsMeta(event, decisionsMeta, propositionEventTypes, propositionAction);
    }
    event.mergeXdm(data);
    if (documentMayUnload) {
      event.documentMayUnload();
    }
    return eventManager.sendEvent(event);
  };
};
exports.default = _default;