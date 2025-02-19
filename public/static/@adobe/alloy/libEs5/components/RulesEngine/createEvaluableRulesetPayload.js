"use strict";

exports.default = void 0;
var _aepRulesEngine = require("@adobe/aep-rules-engine");
var _schema = require("../../constants/schema.js");
var _eventType = require("../../constants/eventType.js");
var _utils = require("./utils.js");
var _flattenArray = require("../../utils/flattenArray.js");
var _createConsequenceAdapter = require("./createConsequenceAdapter.js");
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

const isRulesetItem = item => {
  const {
    schema,
    data
  } = item;
  if (schema === _schema.RULESET_ITEM) {
    return true;
  }
  if (schema !== _schema.JSON_CONTENT_ITEM) {
    return false;
  }
  try {
    const content = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
    return content && Object.prototype.hasOwnProperty.call(content, "version") && Object.prototype.hasOwnProperty.call(content, "rules");
  } catch {
    return false;
  }
};
var _default = (payload, eventRegistry, decisionHistory) => {
  const consequenceAdapter = (0, _createConsequenceAdapter.default)();
  const activityId = (0, _utils.getActivityId)(payload);
  const items = [];
  const addItem = item => {
    const {
      data = {},
      schema
    } = item;
    const content = schema === _schema.RULESET_ITEM ? data : data.content;
    if (!content) {
      return;
    }
    items.push((0, _aepRulesEngine.default)(typeof content === "string" ? JSON.parse(content) : content));
  };
  const evaluate = context => {
    const displayEvent = eventRegistry.getEvent(_eventType.DISPLAY, activityId);
    const displayedDate = displayEvent ? displayEvent.firstTimestamp : undefined;
    const qualifyingItems = (0, _flattenArray.default)(items.map(item => item.execute(context))).map(consequenceAdapter).map(item => {
      const {
        firstTimestamp: qualifiedDate
      } = decisionHistory.recordQualified(activityId) || {};
      return {
        ...item,
        data: {
          ...item.data,
          qualifiedDate,
          displayedDate
        }
      };
    });
    return {
      ...payload,
      items: qualifyingItems
    };
  };
  if (Array.isArray(payload.items)) {
    payload.items.filter(isRulesetItem).forEach(addItem);
  }
  return {
    rank: payload?.scopeDetails?.rank || Infinity,
    evaluate,
    isEvaluable: items.length > 0
  };
};
exports.default = _default;