(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _MATCHERS;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var ConditionType = {
  MATCHER: "matcher",
  GROUP: "group",
  HISTORICAL: "historical"
};
var MatcherType = {
  EQUALS: "eq",
  NOT_EQUALS: "ne",
  EXISTS: "ex",
  NOT_EXISTS: "nx",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "ge",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "le",
  CONTAINS: "co",
  NOT_CONTAINS: "nc",
  STARTS_WITH: "sw",
  ENDS_WITH: "ew"
};
var LogicType = {
  AND: "and",
  OR: "or"
};
var SearchType = {
  ANY: "any",
  ORDERED: "ordered"
};
function isObjectOrUndefined(value) {
  return _typeof(value) === "object" || typeof value === "undefined";
}
function createEquals() {
  return {
    matches: function matches(context, key) {
      var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      if (isObjectOrUndefined(context[key])) {
        return false;
      }
      var contextValue = String(context[key]).toLowerCase();
      for (var i = 0; i < values.length; i += 1) {
        if (!isObjectOrUndefined(values[i]) && contextValue === String(values[i]).toLowerCase()) {
          return true;
        }
      }
      return false;
    }
  };
}
function createNotEquals() {
  return {
    matches: function matches(context, key) {
      var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      if (isObjectOrUndefined(context[key])) {
        return false;
      }
      var contextValue = String(context[key]).toLowerCase();
      for (var i = 0; i < values.length; i += 1) {
        if (!isObjectOrUndefined(values[i]) && contextValue === String(values[i]).toLowerCase()) {
          return false;
        }
      }
      return true;
    }
  };
}
function createExists() {
  return {
    matches: function matches(context, key) {
      return typeof context[key] !== "undefined" && context[key] !== null;
    }
  };
}
function createNotExists() {
  return {
    matches: function matches(context, key) {
      return typeof context[key] === "undefined" || context[key] === null;
    }
  };
}
function isNumber(value) {
  return typeof value === "number";
}
function createGreaterThan() {
  return {
    matches: function matches(context, key) {
      var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var needle = context[key];
      if (!isNumber(needle)) {
        return false;
      }
      for (var i = 0; i < values.length; i += 1) {
        if (isNumber(values[i]) && needle > values[i]) {
          return true;
        }
      }
      return false;
    }
  };
}
function createGreaterThanEquals() {
  return {
    matches: function matches(context, key) {
      var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var needle = context[key];
      if (!isNumber(needle)) {
        return false;
      }
      for (var i = 0; i < values.length; i += 1) {
        if (isNumber(values[i]) && needle >= values[i]) {
          return true;
        }
      }
      return false;
    }
  };
}
function createLessThan() {
  return {
    matches: function matches(context, key) {
      var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var needle = context[key];
      if (!isNumber(needle)) {
        return false;
      }
      for (var i = 0; i < values.length; i += 1) {
        if (isNumber(values[i]) && needle < values[i]) {
          return true;
        }
      }
      return false;
    }
  };
}
function createLessThanEquals() {
  return {
    matches: function matches(context, key) {
      var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var needle = context[key];
      if (!isNumber(needle)) {
        return false;
      }
      for (var i = 0; i < values.length; i += 1) {
        if (isNumber(values[i]) && needle <= values[i]) {
          return true;
        }
      }
      return false;
    }
  };
}
function createContains() {
  return {
    matches: function matches(context, key) {
      var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      if (isObjectOrUndefined(context[key])) {
        return false;
      }
      var contextValue = String(context[key]).toLowerCase();
      for (var i = 0; i < values.length; i += 1) {
        if (!isObjectOrUndefined(values[i]) && contextValue.indexOf(String(values[i]).toLowerCase()) !== -1) {
          return true;
        }
      }
      return false;
    }
  };
}
function createNotContains() {
  return {
    matches: function matches(context, key) {
      var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      if (isObjectOrUndefined(context[key])) {
        return false;
      }
      var contextValue = String(context[key]).toLowerCase();
      for (var i = 0; i < values.length; i += 1) {
        if (!isObjectOrUndefined(values[i]) && contextValue.indexOf(String(values[i]).toLowerCase()) !== -1) {
          return false;
        }
      }
      return true;
    }
  };
}
function createStartsWith() {
  return {
    matches: function matches(context, key) {
      var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      if (isObjectOrUndefined(context[key])) {
        return false;
      }
      var contextValue = String(context[key]).toLowerCase();
      for (var i = 0; i < values.length; i += 1) {
        if (!isObjectOrUndefined(values[i]) && contextValue.startsWith(String(values[i]).toLowerCase())) {
          return true;
        }
      }
      return false;
    }
  };
}
function createEndsWith() {
  return {
    matches: function matches(context, key) {
      var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      if (isObjectOrUndefined(context[key])) {
        return false;
      }
      var contextValue = String(context[key]).toLowerCase();
      for (var i = 0; i < values.length; i += 1) {
        if (!isObjectOrUndefined(values[i]) && contextValue.endsWith(values[i].toLowerCase())) {
          return true;
        }
      }
      return false;
    }
  };
}
var MATCHERS = (_MATCHERS = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_MATCHERS, MatcherType.EQUALS, createEquals()), MatcherType.NOT_EQUALS, createNotEquals()), MatcherType.EXISTS, createExists()), MatcherType.NOT_EXISTS, createNotExists()), MatcherType.GREATER_THAN, createGreaterThan()), MatcherType.GREATER_THAN_OR_EQUAL_TO, createGreaterThanEquals()), MatcherType.LESS_THAN, createLessThan()), MatcherType.LESS_THAN_OR_EQUAL_TO, createLessThanEquals()), MatcherType.CONTAINS, createContains()), MatcherType.NOT_CONTAINS, createNotContains()), _defineProperty(_defineProperty(_MATCHERS, MatcherType.STARTS_WITH, createStartsWith()), MatcherType.ENDS_WITH, createEndsWith()));
function getMatcher(key) {
  return MATCHERS[key];
}
function isUndefined(value) {
  return typeof value === "undefined";
}
var IAM_ID = "iam.id";
var ID = "id";
var IAM_EVENT_TYPE = "iam.eventType";
var EVENT_TYPE = "eventType";
var TYPE = "type";
var VALID_EVENT_TYPES = [IAM_EVENT_TYPE, EVENT_TYPE, TYPE];
var VALID_EVENT_IDS = [IAM_ID, ID];
function checkForHistoricalMatcher(eventCount, matcherKey, value) {
  switch (matcherKey) {
    case MatcherType.GREATER_THAN:
      return eventCount > value;
    case MatcherType.GREATER_THAN_OR_EQUAL_TO:
      return eventCount >= value;
    case MatcherType.LESS_THAN:
      return eventCount < value;
    case MatcherType.LESS_THAN_OR_EQUAL_TO:
      return eventCount <= value;
    case MatcherType.EQUALS:
      return eventCount === value;
    case MatcherType.NOT_EQUALS:
      return eventCount !== value;
    default:
      return false;
  }
}
function oneOf(context, properties) {
  for (var i = 0; i < properties.length; i += 1) {
    if (!isUndefined(context[properties[i]])) {
      return context[properties[i]];
    }
  }
  return undefined;
}
function eventSatisfiesCondition(historicalEventCondition, eventContext) {
  var eventKeys = Object.keys(historicalEventCondition);
  for (var i = 0; i < eventKeys.length; i += 1) {
    var key = eventKeys[i];
    var _eventContext$event = eventContext.event,
      event = _eventContext$event === void 0 ? {} : _eventContext$event;
    if (event[eventKeys[i]] !== historicalEventCondition[key]) {
      return false;
    }
  }
  return true;
}
function queryAndCountAnyEvent(events, context, from, to) {
  return events.reduce(function (countTotal, event) {
    var eventType = oneOf(event, VALID_EVENT_TYPES);
    if (!eventType) {
      return countTotal;
    }
    var eventsOfType = context.events[eventType];
    if (!eventsOfType) {
      return countTotal;
    }
    var eventId = oneOf(event, VALID_EVENT_IDS);
    if (!eventId) {
      return countTotal;
    }
    var contextEvent = eventsOfType[eventId];
    if (!contextEvent) {
      return countTotal;
    }
    if (!eventSatisfiesCondition(event, contextEvent)) {
      return countTotal;
    }
    var _contextEvent$count = contextEvent.count,
      eventCount = _contextEvent$count === void 0 ? 1 : _contextEvent$count;
    if (isUndefined(from) || isUndefined(to) || contextEvent.timestamp >= from && contextEvent.timestamp <= to) {
      return countTotal + eventCount;
    }
    return countTotal;
  }, 0);
}
function queryAndCountOrderedEvent(events, context, from, to) {
  var previousEventTimestamp = from;
  var sameSequence = events.every(function (event) {
    var eventType = oneOf(event, VALID_EVENT_TYPES);
    if (!eventType) {
      return false;
    }
    var eventsOfType = context.events[eventType];
    if (!eventsOfType) {
      return false;
    }
    var eventId = oneOf(event, VALID_EVENT_IDS);
    if (!eventId) {
      return false;
    }
    var contextEvent = eventsOfType[eventId];
    if (!eventSatisfiesCondition(event, contextEvent)) {
      return false;
    }
    if (contextEvent === null || isUndefined(contextEvent) || contextEvent.count === 0) {
      return false;
    }
    var ordered = (isUndefined(previousEventTimestamp) || contextEvent.timestamp >= previousEventTimestamp) && (isUndefined(to) || contextEvent.timestamp <= to);
    previousEventTimestamp = contextEvent.timestamp;
    return ordered;
  });
  return sameSequence ? 1 : 0;
}
function evaluateAnd(context, conditions) {
  var result = true;
  for (var i = 0; i < conditions.length; i += 1) {
    result = result && conditions[i].evaluate(context);
  }
  return result;
}
function evaluateOr(context, conditions) {
  var result = false;
  for (var i = 0; i < conditions.length; i += 1) {
    result = result || conditions[i].evaluate(context);
    if (result) {
      return true;
    }
  }
  return false;
}
function createRules(version, rules) {
  return {
    version: version,
    rules: rules
  };
}
function createRule(condition, consequences) {
  return {
    execute: function execute(context) {
      if (condition.evaluate(context)) {
        return consequences;
      }
      return [];
    },
    toString: function toString() {
      return "Rule{condition=".concat(condition, ", consequences=").concat(consequences, "}");
    }
  };
}
function createCondition(type, definition) {
  return {
    evaluate: function evaluate(context) {
      return definition.evaluate(context);
    },
    toString: function toString() {
      return "Condition{type=".concat(type, ", definition=").concat(definition, "}");
    }
  };
}
function createConsequence(id, type, detail) {
  return {
    id: id,
    type: type,
    detail: detail
  };
}
function createGroupDefinition(logic, conditions) {
  return {
    evaluate: function evaluate(context) {
      if (LogicType.AND === logic) {
        return evaluateAnd(context, conditions);
      }
      if (LogicType.OR === logic) {
        return evaluateOr(context, conditions);
      }
      return false;
    }
  };
}
function createMatcherDefinition(key, matcherKey, values) {
  return {
    evaluate: function evaluate(context) {
      var matcher = getMatcher(matcherKey);
      if (!matcher) {
        return false;
      }
      return matcher.matches(context, key, values);
    }
  };
}
function createHistoricalDefinition(events, matcherKey, value, from, to, searchType) {
  return {
    evaluate: function evaluate(context) {
      var eventCount;
      if (SearchType.ORDERED === searchType) {
        eventCount = queryAndCountOrderedEvent(events, context, from, to);
      } else {
        eventCount = queryAndCountAnyEvent(events, context, from, to);
      }
      return checkForHistoricalMatcher(eventCount, matcherKey, value);
    }
  };
}
function parseMatcherDefinition(definition) {
  var key = definition.key,
    matcher = definition.matcher,
    values = definition.values;
  return createMatcherDefinition(key, matcher, values);
}
function parseGroupDefinition(definition) {
  var logic = definition.logic,
    conditions = definition.conditions;
  return createGroupDefinition(logic, conditions.map(parseCondition));
}
function parseHistoricalDefinition(definition) {
  var events = definition.events,
    from = definition.from,
    to = definition.to,
    matcher = definition.matcher,
    value = definition.value,
    searchType = definition.searchType;
  return createHistoricalDefinition(events, matcher, value, from, to, searchType);
}
function parseCondition(condition) {
  var type = condition.type,
    definition = condition.definition;
  if (ConditionType.MATCHER === type) {
    return createCondition(type, parseMatcherDefinition(definition));
  }
  if (ConditionType.GROUP === type) {
    return createCondition(type, parseGroupDefinition(definition));
  }
  if (ConditionType.HISTORICAL === type) {
    return createCondition(type, parseHistoricalDefinition(definition));
  }
  throw new Error("Can not parse condition");
}
function parseConsequence(consequence) {
  var id = consequence.id,
    type = consequence.type,
    detail = consequence.detail;
  return createConsequence(id, type, detail);
}
function parseRule(rule) {
  var condition = rule.condition,
    consequences = rule.consequences;
  return createRule(parseCondition(condition), consequences.map(parseConsequence));
}
function parseRules(ruleset) {
  var version = ruleset.version,
    rules = ruleset.rules;
  return createRules(version, rules.map(parseRule));
}
function RulesEngine(ruleset) {
  var _parseRules = parseRules(ruleset),
    version = _parseRules.version,
    rules = _parseRules.rules;
  return {
    execute: function execute(context) {
      return rules.map(function (rule) {
        return rule.execute(context);
      }).filter(function (arr) {
        return arr.length > 0;
      });
    },
    getVersion: function getVersion() {
      return version;
    },
    numRules: function numRules() {
      return rules.length;
    }
  };
}
module.exports = RulesEngine;

},{}],2:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var createClickHandler = function createClickHandler(_ref) {
  var eventManager = _ref.eventManager,
    lifecycle = _ref.lifecycle,
    handleError = _ref.handleError;
  return function (clickEvent) {
    // Ignore repropagated clicks from AppMeasurement
    if (clickEvent.s_fe) {
      return Promise.resolve();
    }
    // TODO: Consider safeguarding from the same object being clicked multiple times in rapid succession?
    var clickedElement = clickEvent.target;
    var event = eventManager.createEvent();
    // this is to make sure a exit link personalization metric use send beacon
    event.documentMayUnload();
    return lifecycle.onClick({
      event: event,
      clickedElement: clickedElement
    }).then(function () {
      if (event.isEmpty()) {
        return Promise.resolve();
      }
      return eventManager.sendEvent(event);
    })
    // eventManager.sendEvent() will return a promise resolved to an
    // object and we want to avoid returning any value to the customer
    .then(_index.noop)["catch"](function (error) {
      handleError(error, "click collection");
    });
  };
};
var _default = function _default(_ref2) {
  var eventManager = _ref2.eventManager,
    lifecycle = _ref2.lifecycle,
    handleError = _ref2.handleError;
  var clickHandler = createClickHandler({
    eventManager: eventManager,
    lifecycle: lifecycle,
    handleError: handleError
  });
  document.addEventListener("click", clickHandler, true);
};
exports["default"] = _default;

},{"../../utils/index.js":300}],3:[function(require,module,exports){
"use strict";

exports.downloadLinkQualifier = exports["default"] = exports.DEFAULT_DOWNLOAD_QUALIFIER = void 0;
var _index = require("../../utils/validation/index.js");
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

var DEFAULT_DOWNLOAD_QUALIFIER = exports.DEFAULT_DOWNLOAD_QUALIFIER = "\\.(exe|zip|wav|mp3|mov|mpg|avi|wmv|pdf|doc|docx|xls|xlsx|ppt|pptx)$";
var downloadLinkQualifier = exports.downloadLinkQualifier = (0, _index.string)().regexp()["default"](DEFAULT_DOWNLOAD_QUALIFIER);
var validators = (0, _index.objectOf)({
  clickCollectionEnabled: (0, _index["boolean"])()["default"](true),
  clickCollection: (0, _index.objectOf)({
    internalLinkEnabled: (0, _index["boolean"])()["default"](true),
    externalLinkEnabled: (0, _index["boolean"])()["default"](true),
    downloadLinkEnabled: (0, _index["boolean"])()["default"](true),
    // TODO: Consider moving downloadLinkQualifier here.
    sessionStorageEnabled: (0, _index["boolean"])()["default"](false),
    eventGroupingEnabled: (0, _index["boolean"])()["default"](false),
    filterClickProperties: (0, _index.callback)()
  })["default"]({
    internalLinkEnabled: true,
    externalLinkEnabled: true,
    downloadLinkEnabled: true,
    sessionStorageEnabled: false,
    eventGroupingEnabled: false
  }),
  downloadLinkQualifier: downloadLinkQualifier,
  onBeforeLinkClickSend: (0, _index.callback)().deprecated('The field "onBeforeLinkClickSend" has been deprecated. Use "clickCollection.filterClickDetails" instead.')
});

// Export both the validators and the default qualifier
var _default = exports["default"] = validators;

},{"../../utils/validation/index.js":364}],4:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _sessionDataKeys = require("../../constants/sessionDataKeys.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var storage = _ref.storage;
  return {
    save: function save(data) {
      var jsonData = JSON.stringify(data);
      storage.setItem(_sessionDataKeys.CLICK_ACTIVITY_DATA, jsonData);
    },
    load: function load() {
      var jsonData = null;
      var data = storage.getItem(_sessionDataKeys.CLICK_ACTIVITY_DATA);
      if (data) {
        jsonData = JSON.parse(data);
      }
      return jsonData;
    },
    remove: function remove() {
      storage.removeItem(_sessionDataKeys.CLICK_ACTIVITY_DATA);
    }
  };
};
exports["default"] = _default;

},{"../../constants/sessionDataKeys.js":229}],5:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var buildXdmFromClickedElementProperties = function buildXdmFromClickedElementProperties(props) {
  return {
    eventType: "web.webinteraction.linkClicks",
    web: {
      webInteraction: {
        name: props.linkName,
        region: props.linkRegion,
        type: props.linkType,
        URL: props.linkUrl,
        linkClicks: {
          value: 1
        }
      }
    }
  };
};
var buildDataFromClickedElementProperties = function buildDataFromClickedElementProperties(props) {
  return {
    __adobe: {
      analytics: {
        contextData: {
          a: {
            activitymap: {
              page: props.pageName,
              link: props.linkName,
              region: props.linkRegion,
              pageIDType: props.pageIDType
            }
          }
        }
      }
    }
  };
};
var populateClickedElementPropertiesFromOptions = function populateClickedElementPropertiesFromOptions(options, props) {
  var xdm = options.xdm,
    data = options.data,
    clickedElement = options.clickedElement;
  props.clickedElement = clickedElement;
  if (xdm && xdm.web && xdm.web.webInteraction) {
    var _xdm$web$webInteracti = xdm.web.webInteraction,
      name = _xdm$web$webInteracti.name,
      region = _xdm$web$webInteracti.region,
      type = _xdm$web$webInteracti.type,
      URL = _xdm$web$webInteracti.URL;
    props.linkName = name;
    props.linkRegion = region;
    props.linkType = type;
    props.linkUrl = URL;
  }
  // DATA has priority over XDM
  /* eslint no-underscore-dangle: 0 */
  if (data && data.__adobe && data.__adobe.analytics) {
    var contextData = data.__adobe.analytics.contextData;
    if (contextData && contextData.a && contextData.a.activitymap) {
      // Set the properties if they exists
      var _contextData$a$activi = contextData.a.activitymap,
        page = _contextData$a$activi.page,
        link = _contextData$a$activi.link,
        _region = _contextData$a$activi.region,
        pageIDType = _contextData$a$activi.pageIDType;
      props.pageName = page || props.pageName;
      props.linkName = link || props.linkName;
      props.linkRegion = _region || props.linkRegion;
      if (pageIDType !== undefined) {
        props.pageIDType = pageIDType;
      }
    }
  }
};
var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    properties = _ref.properties,
    logger = _ref.logger;
  var props = properties || {};
  var clickedElementProperties = {
    get pageName() {
      return props.pageName;
    },
    set pageName(value) {
      props.pageName = value;
    },
    get linkName() {
      return props.linkName;
    },
    set linkName(value) {
      props.linkName = value;
    },
    get linkRegion() {
      return props.linkRegion;
    },
    set linkRegion(value) {
      props.linkRegion = value;
    },
    get linkType() {
      return props.linkType;
    },
    set linkType(value) {
      props.linkType = value;
    },
    get linkUrl() {
      return props.linkUrl;
    },
    set linkUrl(value) {
      props.linkUrl = value;
    },
    get pageIDType() {
      return props.pageIDType;
    },
    set pageIDType(value) {
      props.pageIDType = value;
    },
    get clickedElement() {
      return props.clickedElement;
    },
    set clickedElement(value) {
      props.clickedElement = value;
    },
    get properties() {
      return {
        pageName: props.pageName,
        linkName: props.linkName,
        linkRegion: props.linkRegion,
        linkType: props.linkType,
        linkUrl: props.linkUrl,
        pageIDType: props.pageIDType
      };
    },
    isValidLink: function isValidLink() {
      return !!props.linkUrl && !!props.linkType && !!props.linkName && !!props.linkRegion;
    },
    isInternalLink: function isInternalLink() {
      return this.isValidLink() && props.linkType === "other";
    },
    isValidActivityMapData: function isValidActivityMapData() {
      return !!props.pageName && !!props.linkName && !!props.linkRegion && props.pageIDType !== undefined;
    },
    get xdm() {
      if (props.filteredXdm) {
        return props.filteredXdm;
      }
      return buildXdmFromClickedElementProperties(this);
    },
    get data() {
      if (props.filteredData) {
        return props.filteredData;
      }
      return buildDataFromClickedElementProperties(this);
    },
    applyPropertyFilter: function applyPropertyFilter(filter) {
      if (filter && filter(props) === false) {
        if (logger) {
          logger.info("Clicked element properties were rejected by filter function: " + JSON.stringify(this.properties, null, 2));
        }
        props = {};
      }
    },
    applyOptionsFilter: function applyOptionsFilter(filter) {
      var opts = this.options;
      if (opts && opts.clickedElement && (opts.xdm || opts.data)) {
        // Properties are rejected if filter is explicitly false.
        if (filter && filter(opts) === false) {
          if (logger) {
            logger.info("Clicked element properties were rejected by filter function: " + JSON.stringify(this.properties, null, 2));
          }
          this.options = undefined;
          return;
        }
        this.options = opts;
        // This is just to ensure that any fields outside clicked element properties
        // set by the user filter persists.
        props.filteredXdm = opts.xdm;
        props.filteredData = opts.data;
      }
    },
    get options() {
      var opts = {};
      if (this.isValidLink()) {
        opts.xdm = this.xdm;
      }
      if (this.isValidActivityMapData()) {
        opts.data = this.data;
      }
      if (this.clickedElement) {
        opts.clickedElement = this.clickedElement;
      }
      if (!opts.xdm && !opts.data) {
        return undefined;
      }
      return opts;
    },
    set options(value) {
      props = {};
      if (value) {
        populateClickedElementPropertiesFromOptions(value, props);
      }
    }
  };
  return clickedElementProperties;
};
exports["default"] = _default;

},{}],6:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _createClickedElementProperties = require("./createClickedElementProperties.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var window = _ref.window,
    getLinkName = _ref.getLinkName,
    getLinkRegion = _ref.getLinkRegion,
    getAbsoluteUrlFromAnchorElement = _ref.getAbsoluteUrlFromAnchorElement,
    findClickableElement = _ref.findClickableElement,
    determineLinkType = _ref.determineLinkType;
  return function (_ref2) {
    var clickedElement = _ref2.clickedElement,
      config = _ref2.config,
      logger = _ref2.logger,
      clickActivityStorage = _ref2.clickActivityStorage;
    var optionsFilter = config.onBeforeLinkClickSend,
      clickCollection = config.clickCollection;
    var propertyFilter = clickCollection.filterClickDetails;
    var elementProperties = (0, _createClickedElementProperties["default"])({
      logger: logger
    });
    if (clickedElement) {
      var clickableElement = findClickableElement(clickedElement);
      if (clickableElement) {
        elementProperties.clickedElement = clickedElement;
        elementProperties.linkUrl = getAbsoluteUrlFromAnchorElement(window, clickableElement);
        elementProperties.linkType = determineLinkType(window, config, elementProperties.linkUrl, clickableElement);
        elementProperties.linkRegion = getLinkRegion(clickableElement);
        elementProperties.linkName = getLinkName(clickableElement);
        elementProperties.pageIDType = 0;
        elementProperties.pageName = window.location.href;
        // Check if we have a page-name stored from an earlier page view event
        var storedLinkData = clickActivityStorage.load();
        if (storedLinkData && storedLinkData.pageName) {
          elementProperties.pageName = storedLinkData.pageName;
          // Perhaps pageIDType should be established after customer filter is applied
          // Like if pageName starts with "http" then pageIDType = 0
          elementProperties.pageIDType = 1;
        }
        // If defined, run user provided filter function
        if (propertyFilter) {
          // clickCollection.filterClickDetails
          elementProperties.applyPropertyFilter(propertyFilter);
        } else if (optionsFilter) {
          // onBeforeLinkClickSend
          elementProperties.applyOptionsFilter(optionsFilter);
        }
      }
    }
    return elementProperties;
  };
};
exports["default"] = _default;

},{"./createClickedElementProperties.js":5}],7:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _activityMapExtensionEnabled = require("./utils/activityMapExtensionEnabled.js");
var _isDifferentDomains = require("./utils/isDifferentDomains.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var isDissallowedLinkType = function isDissallowedLinkType(clickCollection, linkType) {
  return linkType && (linkType === "download" && !clickCollection.downloadLinkEnabled || linkType === "exit" && !clickCollection.externalLinkEnabled || linkType === "other" && !clickCollection.internalLinkEnabled);
};
var _default = function _default(_ref) {
  var config = _ref.config,
    logger = _ref.logger,
    getClickedElementProperties = _ref.getClickedElementProperties,
    clickActivityStorage = _ref.clickActivityStorage;
  var clickCollectionEnabled = config.clickCollectionEnabled,
    clickCollection = config.clickCollection;
  if (!clickCollectionEnabled) {
    return function () {
      return undefined;
    };
  }
  return function (_ref2) {
    var event = _ref2.event,
      clickedElement = _ref2.clickedElement;
    var elementProperties = getClickedElementProperties({
      clickActivityStorage: clickActivityStorage,
      clickedElement: clickedElement,
      config: config,
      logger: logger
    });
    var linkType = elementProperties.linkType;
    // Avoid clicks to be collected for the ActivityMap interface
    if ((0, _activityMapExtensionEnabled["default"])()) {
      return;
    }
    if (elementProperties.isValidLink() && isDissallowedLinkType(clickCollection, linkType)) {
      logger.info("Cancelling link click event due to clickCollection." + linkType + "LinkEnabled = false.");
    } else if (
    // Determine if element properties should be sent with event now, or be saved
    // and grouped with a future page view event.
    // Event grouping is not supported for the deprecated onBeforeLinkClickSend callback
    // because only click properties is saved and not XDM and DATA (which could have been modified).
    // However, if the filterClickDetails callback is available we group events because it takes
    // priority over onBeforeLinkClickSend and only supports processing click properties.
    elementProperties.isInternalLink() && clickCollection.eventGroupingEnabled && (!config.onBeforeLinkClickSend || clickCollection.filterClickDetails) && !(0, _isDifferentDomains["default"])(window.location.hostname, elementProperties.linkUrl)) {
      clickActivityStorage.save(elementProperties.properties);
    } else if (elementProperties.isValidLink()) {
      // Event will be sent
      event.mergeXdm(elementProperties.xdm);
      event.mergeData(elementProperties.data);
      clickActivityStorage.save({
        pageName: elementProperties.pageName,
        pageIDType: elementProperties.pageIDType
      });
    } else if (elementProperties.isValidActivityMapData()) {
      clickActivityStorage.save(elementProperties.properties);
    }
  };
};
exports["default"] = _default;

},{"./utils/activityMapExtensionEnabled.js":13,"./utils/isDifferentDomains.js":27}],8:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _createClickedElementProperties = require("./createClickedElementProperties.js");
var _activityMapExtensionEnabled = require("./utils/activityMapExtensionEnabled.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var clickActivityStorage = _ref.clickActivityStorage;
  return function (event) {
    // Avoid clicks to be collected for the ActivityMap interface
    if ((0, _activityMapExtensionEnabled["default"])()) {
      return;
    }
    var properties = clickActivityStorage.load();
    var elementProperties = (0, _createClickedElementProperties["default"])({
      properties: properties
    });
    if (elementProperties.isValidLink() || elementProperties.isValidActivityMapData()) {
      if (elementProperties.isValidLink()) {
        var xdm = elementProperties.xdm;
        // Have to delete the eventType not to override the page view
        delete xdm.eventType;
        event.mergeXdm(xdm);
      }
      if (elementProperties.isValidActivityMapData()) {
        event.mergeData(elementProperties.data);
      }
      // NOTE: We can't clear out all the storage here because we might still need to
      // keep a page-name for multiple link-clicks (e.g. downloads) on the same page.
      clickActivityStorage.save({
        pageName: elementProperties.pageName,
        pageIDType: elementProperties.pageIDType
      });
    }
  };
};
exports["default"] = _default;

},{"./createClickedElementProperties.js":5,"./utils/activityMapExtensionEnabled.js":13}],9:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var clickActivityStorage = _ref.clickActivityStorage;
  return function (event) {
    clickActivityStorage.save({
      pageName: event.getContent().xdm.web.webPageDetails.name,
      pageIDType: 1 // 1 = name, 0 = URL
    });
  };
};
exports["default"] = _default;

},{}],10:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _truncateWhiteSpace = require("./utils/truncateWhiteSpace.js");
var _isSupportedTextNode = require("./utils/dom/isSupportedTextNode.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * Orders and returns specified node and its child nodes in arrays of supported
 * and unsupported nodes.
 * @param {*} node The node to extract supported and unsupported nodes from.
 * @returns {{supportedNodes: Array, includesUnsupportedNodes: boolean}} Node support object.
 */
var _extractSupportedNodes = function extractSupportedNodes(node) {
  var supportedNodes = [];
  var includesUnsupportedNodes = false;
  if ((0, _isSupportedTextNode["default"])(node)) {
    supportedNodes.push(node);
    if (node.childNodes) {
      var childNodes = Array.prototype.slice.call(node.childNodes);
      childNodes.forEach(function (childNode) {
        var nodes = _extractSupportedNodes(childNode);
        supportedNodes = supportedNodes.concat(nodes.supportedNodes);
        includesUnsupportedNodes = includesUnsupportedNodes || nodes.includesUnsupportedNodes;
      });
    }
  } else {
    includesUnsupportedNodes = true;
  }
  return {
    supportedNodes: supportedNodes,
    includesUnsupportedNodes: includesUnsupportedNodes
  };
};

/**
 * Returns the value of a node attribute.
 * @param {*} node The node holding the attribute.
 * @param {string} attributeName The name of the attribute.
 * @param {string} nodeName Optional node name constraint.
 * @returns {string} Attribute value or undefined.
 */
var getNodeAttributeValue = function getNodeAttributeValue(node, attributeName, nodeName) {
  var attributeValue;
  if (!nodeName || nodeName === node.nodeName.toUpperCase()) {
    attributeValue = node.getAttribute(attributeName);
  }
  return attributeValue;
};

/**
 * Extracts the children supported nodes attributes map
 * @param {*} nodes The nodes array holding the children nodes.
 * The returned map contains the supported not empty children attributes values.
 * */
var getChildrenAttributes = function getChildrenAttributes(nodes) {
  var attributes = {
    texts: []
  };
  nodes.supportedNodes.forEach(function (supportedNode) {
    if (supportedNode.getAttribute) {
      if (!attributes.alt) {
        attributes.alt = (0, _truncateWhiteSpace["default"])(supportedNode.getAttribute("alt"));
      }
      if (!attributes.title) {
        attributes.title = (0, _truncateWhiteSpace["default"])(supportedNode.getAttribute("title"));
      }
      if (!attributes.inputValue) {
        attributes.inputValue = (0, _truncateWhiteSpace["default"])(getNodeAttributeValue(supportedNode, "value", "INPUT"));
      }
      if (!attributes.imgSrc) {
        attributes.imgSrc = (0, _truncateWhiteSpace["default"])(getNodeAttributeValue(supportedNode, "src", "IMG"));
      }
    }
    if (supportedNode.nodeValue) {
      attributes.texts.push(supportedNode.nodeValue);
    }
  });
  return attributes;
};

/**
 * Extracts a link-name from a given node.
 *
 * The returned link-name is set to one of the following (in order of priority):
 *
 * 1. Clicked node innerText
 * 2. Clicked node textContent
 * 3. Clicked node and its child nodes nodeValue appended together.
 * 4. Clicked node alt attribute or node descendant alt attribute.
 *    Whichever is found first.
 * 5. Clicked node text attribute or node descendant text attribute.
 *    Whichever is found first.
 * 6. Clicked node INPUT descendant value attribute.
 *    Whichever is found first.
 * 7. Clicked node IMG descendant src attribute.
 *    Whichever is found first.
 *
 * @param {*} node The node to find link text for.
 * @returns {string} link-name or an empty string if not link-name is found.
 */
var _default = function _default(node) {
  var nodeText = (0, _truncateWhiteSpace["default"])(node.innerText || node.textContent);
  var nodes = _extractSupportedNodes(node);
  // if contains unsupported nodes we want children node attributes
  if (!nodeText || nodes.includesUnsupportedNodes) {
    var attributesMap = getChildrenAttributes(nodes);
    nodeText = (0, _truncateWhiteSpace["default"])(attributesMap.texts.join(""));
    if (!nodeText) {
      nodeText = attributesMap.alt || attributesMap.title || attributesMap.inputValue || attributesMap.imgSrc;
    }
  }
  return nodeText || "";
};
exports["default"] = _default;

},{"./utils/dom/isSupportedTextNode.js":25,"./utils/truncateWhiteSpace.js":29}],11:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _truncateWhiteSpace = require("./utils/truncateWhiteSpace.js");
var _index = require("../../utils/index.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var semanticElements = /^(HEADER|MAIN|FOOTER|NAV)$/i;
var getAriaRegionLabel = function getAriaRegionLabel(node) {
  var regionLabel;
  if (node.role === "region" && (0, _index.isNonEmptyString)(node["aria-label"])) {
    regionLabel = node["aria-label"];
  }
  return regionLabel;
};
var getSectionNodeName = function getSectionNodeName(node) {
  var nodeName;
  if (node && node.nodeName) {
    if (node.nodeName.match(semanticElements)) {
      nodeName = node.nodeName;
    }
  }
  return nodeName;
};

/**
 * Extracts a node link-region.
 *
 * The link-region is determined by traversing up the DOM
 * looking for a region that is determined in order of priority:
 *
 * 1. element.id
 * 2. Aria region label
 * 3. Semantic element name
 * 4. BODY (if no other link-region is found).
 *
 * @param {*} node The node to find link region for.
 * @returns {string} link-region.
 */
var _default = function _default(node) {
  var linkParentNode = node.parentNode;
  var regionName;
  while (linkParentNode) {
    regionName = (0, _truncateWhiteSpace["default"])(linkParentNode.id || getAriaRegionLabel(linkParentNode) || getSectionNodeName(linkParentNode));
    if (regionName) {
      return regionName;
    }
    linkParentNode = linkParentNode.parentNode;
  }
  return "BODY";
};
exports["default"] = _default;

},{"../../utils/index.js":300,"./utils/truncateWhiteSpace.js":29}],12:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _attachClickActivityCollector = require("./attachClickActivityCollector.js");
var _configValidators = require("./configValidators.js");
var _createInjectClickedElementProperties = require("./createInjectClickedElementProperties.js");
var _createRecallAndInjectClickedElementProperties = require("./createRecallAndInjectClickedElementProperties.js");
var _createGetClickedElementProperties = require("./createGetClickedElementProperties.js");
var _createClickActivityStorage = require("./createClickActivityStorage.js");
var _createStorePageViewProperties = require("./createStorePageViewProperties.js");
var _validateClickCollectionConfig = require("./validateClickCollectionConfig.js");
var _getLinkName = require("./getLinkName.js");
var _getLinkRegion = require("./getLinkRegion.js");
var _getAbsoluteUrlFromAnchorElement = require("./utils/dom/getAbsoluteUrlFromAnchorElement.js");
var _findClickableElement = require("./utils/dom/findClickableElement.js");
var _determineLinkType = require("./utils/determineLinkType.js");
var _hasPageName = require("./utils/hasPageName.js");
var _createTransientStorage = require("./utils/createTransientStorage.js");
var _index = require("../../utils/index.js");
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

var getClickedElementProperties = (0, _createGetClickedElementProperties["default"])({
  window: window,
  getLinkName: _getLinkName["default"],
  getLinkRegion: _getLinkRegion["default"],
  getAbsoluteUrlFromAnchorElement: _getAbsoluteUrlFromAnchorElement["default"],
  findClickableElement: _findClickableElement["default"],
  determineLinkType: _determineLinkType["default"]
});
var clickActivityStorage;
var initClickActivityStorage = function initClickActivityStorage(config) {
  if (!clickActivityStorage) {
    var createNamespacedStorage = (0, _index.injectStorage)(window);
    var nameSpacedStorage = createNamespacedStorage(config.orgId || "");
    // Use transient in-memory if sessionStorage is disabled
    var transientStorage = (0, _createTransientStorage["default"])();
    var storage = config.clickCollection.sessionStorageEnabled ? nameSpacedStorage.session : transientStorage;
    clickActivityStorage = (0, _createClickActivityStorage["default"])({
      storage: storage
    });
  }
};
var createActivityCollector = function createActivityCollector(_ref) {
  var config = _ref.config,
    eventManager = _ref.eventManager,
    handleError = _ref.handleError,
    logger = _ref.logger;
  (0, _validateClickCollectionConfig["default"])(config, logger);
  var clickCollection = config.clickCollection;
  if (!clickActivityStorage) {
    initClickActivityStorage(config);
  }
  var injectClickedElementProperties = (0, _createInjectClickedElementProperties["default"])({
    config: config,
    logger: logger,
    clickActivityStorage: clickActivityStorage,
    getClickedElementProperties: getClickedElementProperties
  });
  var recallAndInjectClickedElementProperties = (0, _createRecallAndInjectClickedElementProperties["default"])({
    clickActivityStorage: clickActivityStorage
  });
  var storePageViewProperties = (0, _createStorePageViewProperties["default"])({
    clickActivityStorage: clickActivityStorage
  });
  return {
    lifecycle: {
      onComponentsRegistered: function onComponentsRegistered(tools) {
        var lifecycle = tools.lifecycle;
        (0, _attachClickActivityCollector["default"])({
          eventManager: eventManager,
          lifecycle: lifecycle,
          handleError: handleError
        });
        // TODO: createScrollActivityCollector ...
      },
      onClick: function onClick(_ref2) {
        var event = _ref2.event,
          clickedElement = _ref2.clickedElement;
        injectClickedElementProperties({
          event: event,
          clickedElement: clickedElement
        });
      },
      onBeforeEvent: function onBeforeEvent(_ref3) {
        var event = _ref3.event;
        if ((0, _hasPageName["default"])(event)) {
          if (clickCollection.eventGroupingEnabled) {
            recallAndInjectClickedElementProperties(event);
          }
          storePageViewProperties(event, logger, clickActivityStorage);
        }
      }
    }
  };
};
createActivityCollector.namespace = "ActivityCollector";
createActivityCollector.configValidators = _configValidators["default"];
createActivityCollector.buildOnInstanceConfiguredExtraParams = function (_ref4) {
  var config = _ref4.config,
    logger = _ref4.logger;
  if (!clickActivityStorage) {
    initClickActivityStorage(config);
  }
  return {
    getLinkDetails: function getLinkDetails(targetElement) {
      return getClickedElementProperties({
        clickActivityStorage: clickActivityStorage,
        clickedElement: targetElement,
        config: config,
        logger: logger
      }).properties;
    }
  };
};
var _default = exports["default"] = createActivityCollector;

},{"../../utils/index.js":300,"./attachClickActivityCollector.js":2,"./configValidators.js":3,"./createClickActivityStorage.js":4,"./createGetClickedElementProperties.js":6,"./createInjectClickedElementProperties.js":7,"./createRecallAndInjectClickedElementProperties.js":8,"./createStorePageViewProperties.js":9,"./getLinkName.js":10,"./getLinkRegion.js":11,"./utils/createTransientStorage.js":14,"./utils/determineLinkType.js":15,"./utils/dom/findClickableElement.js":18,"./utils/dom/getAbsoluteUrlFromAnchorElement.js":19,"./utils/hasPageName.js":26,"./validateClickCollectionConfig.js":31}],13:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var ACTIVITY_MAP_EXTENSION_ID = "cppXYctnr";
var _default = function _default() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  return context.getElementById(ACTIVITY_MAP_EXTENSION_ID) !== null;
};
exports["default"] = _default;

},{}],14:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default() {
  var storage = {};
  return {
    getItem: function getItem(key) {
      return storage[key];
    },
    setItem: function setItem(key, value) {
      storage[key] = value;
    },
    removeItem: function removeItem(key) {
      delete storage[key];
    }
  };
};
exports["default"] = _default;

},{}],15:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isDownloadLink = require("./dom/isDownloadLink.js");
var _isExitLink = require("./dom/isExitLink.js");
var _isNonEmptyString = require("../../../utils/isNonEmptyString.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(window, config, linkUrl, clickedObj) {
  var linkType = "other";
  if ((0, _isNonEmptyString["default"])(linkUrl)) {
    if ((0, _isDownloadLink["default"])(config.downloadLinkQualifier, linkUrl, clickedObj)) {
      linkType = "download";
    } else if ((0, _isExitLink["default"])(window, linkUrl)) {
      linkType = "exit";
    }
  }
  return linkType;
};
exports["default"] = _default;

},{"../../../utils/isNonEmptyString.js":315,"./dom/isDownloadLink.js":21,"./dom/isExitLink.js":22}],16:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(element) {
  return !element ? false : !!element.onclick;
};
exports["default"] = _default;

},{}],17:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(uri) {
  var fullUrl = uri;
  if (!/^https?:\/\//i.test(fullUrl)) {
    fullUrl = window.location.protocol + "//" + uri;
  }
  var url = new URL(fullUrl);
  return url.hostname;
};
exports["default"] = _default;

},{}],18:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isSupportedAnchorElement = require("./isSupportedAnchorElement.js");
var _elementHasClickHandler = require("./elementHasClickHandler.js");
var _isInputSubmitElement = require("./isInputSubmitElement.js");
var _isButtonSubmitElement = require("./isButtonSubmitElement.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(element) {
  var node = element;
  while (node) {
    if ((0, _isSupportedAnchorElement["default"])(node) || (0, _elementHasClickHandler["default"])(node) || (0, _isInputSubmitElement["default"])(node) || (0, _isButtonSubmitElement["default"])(node)) {
      return node;
    }
    node = node.parentNode;
  }
  return null;
};
exports["default"] = _default;

},{"./elementHasClickHandler.js":16,"./isButtonSubmitElement.js":20,"./isInputSubmitElement.js":23,"./isSupportedAnchorElement.js":24}],19:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _urlStartsWithScheme = require("../urlStartsWithScheme.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(window, element) {
  var loc = window.location;
  var href = element.href || "";
  // Some objects (like SVG animations) can contain a href object instead of a string
  if (typeof href !== "string") {
    href = "";
  }
  var protocol = element.protocol,
    host = element.host;
  if (href && !(0, _urlStartsWithScheme["default"])(href)) {
    if (!protocol) {
      protocol = loc.protocol ? loc.protocol : "";
    }
    protocol = protocol ? protocol + "//" : "";
    if (!host) {
      host = loc.host ? loc.host : "";
    }
    var path = "";
    if (href.substring(0, 1) !== "/") {
      var indx = loc.pathname.lastIndexOf("/");
      indx = indx < 0 ? 0 : indx;
      path = loc.pathname.substring(0, indx);
    }
    href = "" + protocol + host + path + "/" + href;
  }
  return href;
};
exports["default"] = _default;

},{"../urlStartsWithScheme.js":30}],20:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(element) {
  return element.tagName === "BUTTON" && element.type === "submit";
};
exports["default"] = _default;

},{}],21:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _trimQueryFromUrl = require("../trimQueryFromUrl.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(downloadLinkQualifier, linkUrl, clickedObj) {
  var result = false;
  if (linkUrl) {
    if (clickedObj && clickedObj.download) {
      result = true;
    } else if (downloadLinkQualifier) {
      var re = new RegExp(downloadLinkQualifier);
      var trimmedLinkUrl = (0, _trimQueryFromUrl["default"])(linkUrl).toLowerCase();
      result = re.test(trimmedLinkUrl);
    }
  }
  return result;
};
exports["default"] = _default;

},{"../trimQueryFromUrl.js":28}],22:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _trimQueryFromUrl = require("../trimQueryFromUrl.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(window, linkUrl) {
  var result = false;
  // window.location.hostname should always be defined, but checking just in case
  if (linkUrl && window.location.hostname) {
    var currentHostname = window.location.hostname.toLowerCase();
    var trimmedLinkUrl = (0, _trimQueryFromUrl["default"])(linkUrl).toLowerCase();
    result = trimmedLinkUrl.indexOf(currentHostname) < 0;
  }
  return result;
};
exports["default"] = _default;

},{"../trimQueryFromUrl.js":28}],23:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(element) {
  if (element.tagName === "INPUT") {
    var type = element.getAttribute("type");
    if (type === "submit") {
      return true;
    }
    // Image type input elements are considered submit elements.
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image
    if (type === "image" && element.src) {
      return true;
    }
  }
  return false;
};
exports["default"] = _default;

},{}],24:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(element) {
  if (element.href && (element.tagName === "A" || element.tagName === "AREA") && (!element.onclick || !element.protocol || element.protocol.toLowerCase().indexOf("javascript") < 0)) {
    return true;
  }
  return false;
};
exports["default"] = _default;

},{}],25:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var unsupportedNodeNames = /^(SCRIPT|STYLE|LINK|CANVAS|NOSCRIPT|#COMMENT)$/i;

/**
 * Determines if a node qualifies as a supported link text node.
 * @param {*} node Node to determine support for.
 * @returns {boolean}
 */
var _default = function _default(node) {
  if (node && node.nodeName) {
    if (node.nodeName.match(unsupportedNodeNames)) {
      return false;
    }
  }
  return true;
};
exports["default"] = _default;

},{}],26:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(event) {
  var content = event.getContent();
  return content.xdm !== undefined &&
  // NOTE: A page view event should "ideally" include the pageViews type
  // && event.xdm.eventType === "web.webpagedetails.pageViews"
  content.xdm.web !== undefined && content.xdm.web.webPageDetails !== undefined && content.xdm.web.webPageDetails.name !== undefined;
};
exports["default"] = _default;

},{}],27:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _extractDomain = require("./dom/extractDomain.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(uri1, uri2) {
  var domain1 = (0, _extractDomain["default"])(uri1);
  var domain2 = (0, _extractDomain["default"])(uri2);
  return domain1 !== domain2;
};
exports["default"] = _default;

},{"./dom/extractDomain.js":17}],28:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(url) {
  var questionMarkIndex = url.indexOf("?");
  var hashIndex = url.indexOf("#");
  if (questionMarkIndex >= 0 && (questionMarkIndex < hashIndex || hashIndex < 0)) {
    return url.substring(0, questionMarkIndex);
  }
  if (hashIndex >= 0) {
    return url.substring(0, hashIndex);
  }
  return url;
};
exports["default"] = _default;

},{}],29:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/**
 * Reduces repeated whitespace within a string. Whitespace surrounding the string
 * is trimmed and any occurrence of whitespace within the string is replaced with
 * a single space.
 * @param {string} str String to be formatted.
 * @returns {string} Formatted string.
 */
var _default = function _default(str) {
  return str && str.replace(/\s+/g, " ").trim();
};
exports["default"] = _default;

},{}],30:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(url) {
  return !url ? false : /^[a-z0-9]+:\/\//i.test(url);
};
exports["default"] = _default;

},{}],31:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _configValidators = require("./configValidators.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
// src/components/ActivityCollector/validateClickCollectionConfig.js
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(config, logger) {
  var clickCollectionEnabled = config.clickCollectionEnabled,
    onBeforeLinkClickSend = config.onBeforeLinkClickSend,
    dlq = config.downloadLinkQualifier;
  if (clickCollectionEnabled === false) {
    if (onBeforeLinkClickSend) {
      logger.warn("The 'onBeforeLinkClickSend' configuration was provided but will be ignored because clickCollectionEnabled is false.");
    }
    if (dlq && dlq !== _configValidators.DEFAULT_DOWNLOAD_QUALIFIER) {
      logger.warn("The 'downloadLinkQualifier' configuration was provided but will be ignored because clickCollectionEnabled is false.");
    }
  }
};
exports["default"] = _default;

},{"./configValidators.js":3}],32:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _injectProcessDestinations = require("./injectProcessDestinations.js");
var _injectProcessResponse = require("./injectProcessResponse.js");
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

var createAudiences = function createAudiences(_ref) {
  var logger = _ref.logger,
    fireReferrerHideableImage = _ref.fireReferrerHideableImage;
  // we override the js-cookie converter to encode the cookie value similar on how it is in DIL (PDCL-10238)
  var cookieJarWithEncoding = _index.cookieJar.withConverter({
    write: function write(value) {
      return encodeURIComponent(value);
    }
  });
  var loggingCookieJar = (0, _index.createLoggingCookieJar)({
    logger: logger,
    cookieJar: cookieJarWithEncoding
  });
  var processDestinations = (0, _injectProcessDestinations["default"])({
    fireReferrerHideableImage: fireReferrerHideableImage,
    logger: logger,
    cookieJar: loggingCookieJar,
    isPageSsl: window.location.protocol === "https:"
  });
  var processResponse = (0, _injectProcessResponse["default"])({
    processDestinations: processDestinations
  });
  return {
    lifecycle: {
      onResponse: processResponse
    },
    commands: {}
  };
};
createAudiences.namespace = "Audiences";
var _default = exports["default"] = createAudiences;

},{"../../utils/index.js":300,"./injectProcessDestinations.js":33,"./injectProcessResponse.js":34}],33:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _index = require("../../utils/index.js");
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

var createResultLogMessage = function createResultLogMessage(urlDestination, success) {
  return "URL destination " + (success ? "succeeded" : "failed") + ": " + urlDestination.spec.url;
};
var _default = function _default(_ref) {
  var fireReferrerHideableImage = _ref.fireReferrerHideableImage,
    logger = _ref.logger,
    cookieJar = _ref.cookieJar,
    isPageSsl = _ref.isPageSsl;
  var extraCookieOptions = isPageSsl ? {
    sameSite: "none",
    secure: true
  } : {};
  var processCookies = function processCookies(destinations) {
    var cookieDestinations = destinations.filter(function (dest) {
      return dest.type === "cookie";
    });
    cookieDestinations.forEach(function (dest) {
      var _dest$spec = dest.spec,
        name = _dest$spec.name,
        value = _dest$spec.value,
        domain = _dest$spec.domain,
        ttlDays = _dest$spec.ttlDays;
      cookieJar.set(name, value || "", _objectSpread({
        domain: domain || "",
        expires: ttlDays || 10
      }, extraCookieOptions));
    });
  };
  var processUrls = function processUrls(destinations) {
    var urlDestinations = destinations.filter(function (dest) {
      return dest.type === "url";
    });
    return Promise.all(urlDestinations.map(function (urlDestination) {
      return fireReferrerHideableImage(urlDestination.spec).then(function () {
        logger.info(createResultLogMessage(urlDestination, true));
      })["catch"](function () {
        // We intentionally do not throw an error if destinations fail. We
        // consider it a non-critical failure and therefore do not want it to
        // reject the promise handed back to the customer.
      });
    })).then(_index.noop);
  };
  return function (destinations) {
    processCookies(destinations);
    return processUrls(destinations);
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300}],34:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var processDestinations = _ref.processDestinations;
  var processPushDestinations = function processPushDestinations(_ref2) {
    var response = _ref2.response;
    var destinations = response.getPayloadsByType("activation:push");
    return processDestinations(destinations);
  };
  var retrievePullDestinations = function retrievePullDestinations(_ref3) {
    var response = _ref3.response;
    return {
      destinations: response.getPayloadsByType("activation:pull")
    };
  };
  return function (_ref4) {
    var response = _ref4.response;
    return processPushDestinations({
      response: response
    }).then(function () {
      return retrievePullDestinations({
        response: response
      });
    });
  };
};
exports["default"] = _default;

},{}],35:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
exports["default"] = void 0;
var _index = require("../../utils/index.js");
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

// serialize an object with a consistent ordering
var _serialize = function serialize(obj) {
  if (Array.isArray(obj)) {
    return obj.map(function (i) {
      return _serialize(i);
    });
  }
  if (_typeof(obj) === "object" && obj !== null) {
    return Object.keys(obj).sort().reduce(function (memo, key) {
      memo[key] = _serialize(obj[key]);
      return memo;
    }, {});
  }
  return obj;
};
var _default = function _default(obj) {
  return (0, _index.crc32)(JSON.stringify(_serialize(obj)));
};
exports["default"] = _default;

},{"../../utils/index.js":300}],36:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _consentStatus = require("../../constants/consentStatus.js");
var _index = require("../../utils/validation/index.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = exports["default"] = (0, _index.objectOf)({
  defaultConsent: (0, _index.enumOf)(_consentStatus.IN, _consentStatus.OUT, _consentStatus.PENDING)["default"](_consentStatus.IN)
});

},{"../../constants/consentStatus.js":202,"../../utils/validation/index.js":364}],37:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _consentPurpose = require("../../constants/consentPurpose.js");
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
var _default = function _default(_ref) {
  var storedConsent = _ref.storedConsent,
    taskQueue = _ref.taskQueue,
    defaultConsent = _ref.defaultConsent,
    consent = _ref.consent,
    sendSetConsentRequest = _ref.sendSetConsentRequest,
    validateSetConsentOptions = _ref.validateSetConsentOptions,
    consentHashStore = _ref.consentHashStore,
    doesIdentityCookieExist = _ref.doesIdentityCookieExist;
  var defaultConsentByPurpose = _defineProperty({}, _consentPurpose.GENERAL, defaultConsent);
  var storedConsentByPurpose = storedConsent.read();
  var identityCookieExists = doesIdentityCookieExist();
  var consentCookieExists = storedConsentByPurpose[_consentPurpose.GENERAL] !== undefined;
  if (!identityCookieExists || !consentCookieExists) {
    consentHashStore.clear();
  }
  // If the identity cookie is gone, remove the consent cookie because the
  // consent info is tied to the identity.
  if (!identityCookieExists) {
    storedConsent.clear();
    storedConsentByPurpose = {};
  }
  consent.initializeConsent(defaultConsentByPurpose, storedConsentByPurpose);
  var readCookieIfQueueEmpty = function readCookieIfQueueEmpty() {
    if (taskQueue.length === 0) {
      var storedConsentObject = storedConsent.read();
      // Only read cookies when there are no outstanding setConsent
      // requests. This helps with race conditions.
      if (storedConsentObject[_consentPurpose.GENERAL] !== undefined) {
        consent.setConsent(storedConsentObject);
      }
    }
  };
  return {
    commands: {
      setConsent: {
        optionsValidator: validateSetConsentOptions,
        run: function run(_ref2) {
          var consentOptions = _ref2.consent,
            identityMap = _ref2.identityMap,
            edgeConfigOverrides = _ref2.edgeConfigOverrides;
          consent.suspend();
          var consentHashes = consentHashStore.lookup(consentOptions);
          return taskQueue.addTask(function () {
            if (consentHashes.isNew()) {
              return sendSetConsentRequest({
                consentOptions: consentOptions,
                identityMap: identityMap,
                edgeConfigOverrides: edgeConfigOverrides
              });
            }
            return Promise.resolve();
          }).then(function () {
            return consentHashes.save();
          })["finally"](readCookieIfQueueEmpty);
        }
      }
    },
    lifecycle: {
      // Read the cookie here too because the consent cookie may change on any request
      onResponse: readCookieIfQueueEmpty,
      // Even when we get a failure HTTP status code, the consent cookie can
      // still get updated. This could happen, for example, if the user is
      // opted out in AudienceManager, but no consent cookie exists on the
      // client. The request will be sent and the server will respond with a
      // 403 Forbidden and a consent cookie.
      onRequestFailure: readCookieIfQueueEmpty
    }
  };
};
exports["default"] = _default;

},{"../../constants/consentPurpose.js":201}],38:[function(require,module,exports){
"use strict";

var _excluded = ["standard", "version"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
exports["default"] = void 0;
var _computeConsentHash = require("./computeConsentHash.js");
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

var getKey = function getKey(_ref) {
  var standard = _ref.standard,
    version = _ref.version;
  return standard + "." + version;
};
var _default = function _default(_ref2) {
  var storage = _ref2.storage;
  return {
    clear: function clear() {
      storage.clear();
    },
    lookup: function lookup(consentObjects) {
      var currentHashes = {};
      var getCurrentHash = function getCurrentHash(consentObject) {
        var key = getKey(consentObject);
        var standard = consentObject.standard,
          version = consentObject.version,
          rest = _objectWithoutProperties(consentObject, _excluded);
        if (!currentHashes[key]) {
          currentHashes[key] = (0, _computeConsentHash["default"])(rest).toString();
        }
        return currentHashes[key];
      };
      return {
        isNew: function isNew() {
          return consentObjects.some(function (consentObject) {
            var key = getKey(consentObject);
            var previousHash = storage.getItem(key);
            return previousHash === null || previousHash !== getCurrentHash(consentObject);
          });
        },
        save: function save() {
          consentObjects.forEach(function (consentObject) {
            var key = getKey(consentObject);
            storage.setItem(key, getCurrentHash(consentObject));
          });
        }
      };
    }
  };
};
exports["default"] = _default;

},{"./computeConsentHash.js":35}],39:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/request/index.js");
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
var _default = function _default(_ref) {
  var payload = _ref.payload,
    datastreamIdOverride = _ref.datastreamIdOverride;
  return (0, _index.createRequest)({
    payload: payload,
    datastreamIdOverride: datastreamIdOverride,
    getAction: function getAction() {
      return "privacy/set-consent";
    },
    getUseSendBeacon: function getUseSendBeacon() {
      return false;
    }
  });
};
exports["default"] = _default;

},{"../../utils/request/index.js":335}],40:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/request/index.js");
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
var _default = function _default() {
  var content = {};
  var payload = (0, _index.createRequestPayload)({
    content: content,
    addIdentity: function addIdentity(namespaceCode, identity) {
      content.identityMap = content.identityMap || {};
      content.identityMap[namespaceCode] = content.identityMap[namespaceCode] || [];
      content.identityMap[namespaceCode].push(identity);
    },
    hasIdentity: function hasIdentity(namespaceCode) {
      return (content.identityMap && content.identityMap[namespaceCode]) !== undefined;
    }
  });
  payload.setConsent = function (consent) {
    content.consent = consent;
  };
  return payload;
};
exports["default"] = _default;

},{"../../utils/request/index.js":335}],41:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _cookieNameKey = require("../../constants/cookieNameKey.js");
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
var _default = function _default(_ref) {
  var parseConsentCookie = _ref.parseConsentCookie,
    orgId = _ref.orgId,
    cookieJar = _ref.cookieJar;
  var consentCookieName = (0, _index.getNamespacedCookieName)(orgId, _cookieNameKey.CONSENT);
  return {
    read: function read() {
      var cookieValue = cookieJar.get(consentCookieName);
      return cookieValue ? parseConsentCookie(cookieValue) : {};
    },
    clear: function clear() {
      cookieJar.remove(consentCookieName);
    }
  };
};
exports["default"] = _default;

},{"../../constants/cookieNameKey.js":204,"../../utils/index.js":300}],42:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _createComponent = require("./createComponent.js");
var _createConsentHashStore = require("./createConsentHashStore.js");
var _createConsentRequestPayload = require("./createConsentRequestPayload.js");
var _createConsentRequest = require("./createConsentRequest.js");
var _createStoredConsent = require("./createStoredConsent.js");
var _injectSendSetConsentRequest = require("./injectSendSetConsentRequest.js");
var _parseConsentCookie = require("./parseConsentCookie.js");
var _validateSetConsentOptions = require("./validateSetConsentOptions.js");
var _configValidators = require("./configValidators.js");
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

var createConsent = function createConsent(_ref) {
  var config = _ref.config,
    consent = _ref.consent,
    sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest,
    createNamespacedStorage = _ref.createNamespacedStorage;
  var orgId = config.orgId,
    defaultConsent = config.defaultConsent;
  var storedConsent = (0, _createStoredConsent["default"])({
    parseConsentCookie: _parseConsentCookie["default"],
    orgId: orgId,
    cookieJar: _index.cookieJar
  });
  var taskQueue = (0, _index.createTaskQueue)();
  var sendSetConsentRequest = (0, _injectSendSetConsentRequest["default"])({
    createConsentRequestPayload: _createConsentRequestPayload["default"],
    createConsentRequest: _createConsentRequest["default"],
    sendEdgeNetworkRequest: sendEdgeNetworkRequest,
    edgeConfigOverrides: config.edgeConfigOverrides
  });
  var storage = createNamespacedStorage((0, _index.sanitizeOrgIdForCookieName)(orgId) + ".consentHashes.");
  var consentHashStore = (0, _createConsentHashStore["default"])({
    storage: storage.persistent
  });
  var doesIdentityCookieExist = (0, _index.injectDoesIdentityCookieExist)({
    orgId: orgId
  });
  return (0, _createComponent["default"])({
    storedConsent: storedConsent,
    taskQueue: taskQueue,
    defaultConsent: defaultConsent,
    consent: consent,
    sendSetConsentRequest: sendSetConsentRequest,
    validateSetConsentOptions: _validateSetConsentOptions["default"],
    consentHashStore: consentHashStore,
    doesIdentityCookieExist: doesIdentityCookieExist
  });
};
createConsent.namespace = "Consent";
createConsent.configValidators = _configValidators["default"];
var _default = exports["default"] = createConsent;

},{"../../utils/index.js":300,"./configValidators.js":36,"./createComponent.js":37,"./createConsentHashStore.js":38,"./createConsentRequest.js":39,"./createConsentRequestPayload.js":40,"./createStoredConsent.js":41,"./injectSendSetConsentRequest.js":43,"./parseConsentCookie.js":44,"./validateSetConsentOptions.js":45}],43:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _index2 = require("../../utils/request/index.js");
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
var _default = function _default(_ref) {
  var createConsentRequestPayload = _ref.createConsentRequestPayload,
    createConsentRequest = _ref.createConsentRequest,
    sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest,
    globalConfigOverrides = _ref.edgeConfigOverrides;
  return function (_ref2) {
    var consentOptions = _ref2.consentOptions,
      identityMap = _ref2.identityMap,
      localConfigOverrides = _ref2.edgeConfigOverrides;
    var requestParams = (0, _index2.createRequestParams)({
      payload: createConsentRequestPayload(),
      globalConfigOverrides: globalConfigOverrides,
      localConfigOverrides: localConfigOverrides
    });
    requestParams.payload.setConsent(consentOptions);
    if ((0, _index.isObject)(identityMap)) {
      Object.keys(identityMap).forEach(function (key) {
        identityMap[key].forEach(function (identity) {
          requestParams.payload.addIdentity(key, identity);
        });
      });
    }
    var request = createConsentRequest(requestParams);
    return sendEdgeNetworkRequest({
      request: request
    }).then(function () {
      // Don't let response data disseminate beyond this
      // point unless necessary.
    });
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300,"../../utils/request/index.js":335}],44:[function(require,module,exports){
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
exports["default"] = void 0;
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
/**
 * Parses a consent cookie.
 * @param {string} cookieValue Must be in the format a=b;c=d
 * @returns {Object} An object where the keys are purpose names and the values
 * are the consent status for the purpose.
 */
var _default = function _default(cookieValue) {
  var categoryPairs = cookieValue.split(";");
  return categoryPairs.reduce(function (consentByPurpose, categoryPair) {
    var _categoryPair$split = categoryPair.split("="),
      _categoryPair$split2 = _slicedToArray(_categoryPair$split, 2),
      name = _categoryPair$split2[0],
      value = _categoryPair$split2[1];
    consentByPurpose[name] = value;
    return consentByPurpose;
  }, {});
};
exports["default"] = _default;

},{}],45:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/validation/index.js");
var _index2 = require("../../utils/index.js");
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
var _default = exports["default"] = (0, _index.objectOf)({
  consent: (0, _index.arrayOf)((0, _index.anything)()).required().nonEmpty(),
  identityMap: _index2.validateIdentityMap,
  edgeConfigOverrides: _index2.validateConfigOverride
}).noUnknownFields().required();

},{"../../utils/index.js":300,"../../utils/validation/index.js":364}],46:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(config, logger, optionalContexts, requiredContexts) {
  var configuredContexts = config.context;
  var contexts = configuredContexts.flatMap(function (context, i) {
    if (optionalContexts[context]) {
      return [optionalContexts[context]];
    }
    logger.warn("Invalid context[" + i + "]: '" + context + "' is not available.");
    return [];
  }).concat(requiredContexts);
  return {
    namespace: "Context",
    lifecycle: {
      onBeforeEvent: function onBeforeEvent(_ref) {
        var event = _ref.event;
        var xdm = {};
        return Promise.all(contexts.map(function (context) {
          return Promise.resolve(context(xdm, logger));
        })).then(function () {
          return event.mergeXdm(xdm);
        });
      }
    }
  };
};
exports["default"] = _default;

},{}],47:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _libraryName = require("../../constants/libraryName.js");
var _libraryVersion = require("../../constants/libraryVersion.js");
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
var _default = function _default(xdm) {
  var implementationDetails = {
    name: _libraryName["default"],
    version: _libraryVersion["default"],
    environment: "browser"
  };
  (0, _index.deepAssign)(xdm, {
    implementationDetails: implementationDetails
  });
};
exports["default"] = _default;

},{"../../constants/libraryName.js":221,"../../constants/libraryVersion.js":222,"../../utils/index.js":300}],48:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _injectWeb = require("./injectWeb.js");
var _injectDevice = require("./injectDevice.js");
var _injectEnvironment = require("./injectEnvironment.js");
var _injectPlaceContext = require("./injectPlaceContext.js");
var _injectTimestamp = require("./injectTimestamp.js");
var _implementationDetails = require("./implementationDetails.js");
var _createComponent = require("./createComponent.js");
var _injectHighEntropyUserAgentHints = require("./injectHighEntropyUserAgentHints.js");
var _index = require("../../utils/validation/index.js");
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

var web = (0, _injectWeb["default"])(window);
var device = (0, _injectDevice["default"])(window);
var environment = (0, _injectEnvironment["default"])(window);
var placeContext = (0, _injectPlaceContext["default"])(function () {
  return new Date();
});
var timestamp = (0, _injectTimestamp["default"])(function () {
  return new Date();
});
var highEntropyUserAgentHints = (0, _injectHighEntropyUserAgentHints["default"])(navigator);
var defaultEnabledContexts = {
  web: web,
  device: device,
  environment: environment,
  placeContext: placeContext
};
var defaultDisabledContexts = {
  highEntropyUserAgentHints: highEntropyUserAgentHints
};
var optionalContexts = _objectSpread(_objectSpread({}, defaultEnabledContexts), defaultDisabledContexts);
var requiredContexts = [timestamp, _implementationDetails["default"]];
var createContext = function createContext(_ref) {
  var config = _ref.config,
    logger = _ref.logger;
  return (0, _createComponent["default"])(config, logger, optionalContexts, requiredContexts);
};
createContext.namespace = "Context";
createContext.configValidators = (0, _index.objectOf)({
  context: (0, _index.arrayOf)((0, _index.string)())["default"](Object.keys(defaultEnabledContexts))
});
var _default = exports["default"] = createContext;

},{"../../utils/validation/index.js":364,"./createComponent.js":46,"./implementationDetails.js":47,"./injectDevice.js":49,"./injectEnvironment.js":50,"./injectHighEntropyUserAgentHints.js":51,"./injectPlaceContext.js":52,"./injectTimestamp.js":53,"./injectWeb.js":54}],49:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
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

var getScreenOrientationViaProperty = function getScreenOrientationViaProperty(window) {
  var orientation = window.screen.orientation;
  if (orientation == null || orientation.type == null) {
    return null;
  }
  var parts = orientation.type.split("-");
  if (parts.length === 0) {
    return null;
  }
  if (parts[0] !== "portrait" && parts[0] !== "landscape") {
    return null;
  }
  return parts[0];
};
var getScreenOrientationViaMediaQuery = function getScreenOrientationViaMediaQuery(window) {
  if ((0, _index.isFunction)(window.matchMedia)) {
    if (window.matchMedia("(orientation: portrait)").matches) {
      return "portrait";
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
      return "landscape";
    }
  }
  return null;
};
var _default = function _default(window) {
  return function (xdm) {
    var _window$screen = window.screen,
      width = _window$screen.width,
      height = _window$screen.height;
    var device = {};
    var screenHeight = (0, _index.toInteger)(height);
    if (screenHeight >= 0) {
      device.screenHeight = screenHeight;
    }
    var screenWidth = (0, _index.toInteger)(width);
    if (screenWidth >= 0) {
      device.screenWidth = screenWidth;
    }
    var orientation = getScreenOrientationViaProperty(window) || getScreenOrientationViaMediaQuery(window);
    if (orientation) {
      device.screenOrientation = orientation;
    }
    if (Object.keys(device).length > 0) {
      (0, _index.deepAssign)(xdm, {
        device: device
      });
    }
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300}],50:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
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
var _default = function _default(window) {
  return function (xdm) {
    var _window$document$docu = window.document.documentElement,
      _window$document$docu2 = _window$document$docu === void 0 ? {} : _window$document$docu,
      clientWidth = _window$document$docu2.clientWidth,
      clientHeight = _window$document$docu2.clientHeight;
    var environment = {
      type: "browser"
    };
    var viewportWidth = (0, _index.toInteger)(clientWidth);
    if (viewportWidth >= 0) {
      environment.browserDetails = {
        viewportWidth: viewportWidth
      };
    }
    var viewportHeight = (0, _index.toInteger)(clientHeight);
    if (viewportHeight >= 0) {
      environment.browserDetails = environment.browserDetails || {};
      environment.browserDetails.viewportHeight = viewportHeight;
    }
    (0, _index.deepAssign)(xdm, {
      environment: environment
    });
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300}],51:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _highEntropyUserAgentClientHints = require("../../constants/highEntropyUserAgentClientHints.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var browserSupportsUserAgentClientHints = function browserSupportsUserAgentClientHints(navigator) {
  return typeof navigator.userAgentData !== "undefined";
};
var _default = function _default(navigator) {
  if (!browserSupportsUserAgentClientHints(navigator)) {
    return _index.noop;
  }
  return function (xdm, logger) {
    try {
      return navigator.userAgentData.getHighEntropyValues(_highEntropyUserAgentClientHints["default"].map(function (hint) {
        return hint[0];
      })).then(function (hints) {
        var userAgentClientHints = {};
        _highEntropyUserAgentClientHints["default"].forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            hintName = _ref2[0],
            hintType = _ref2[1];
          if (Object.prototype.hasOwnProperty.call(hints, hintName) && /* eslint-disable-next-line valid-typeof */
          _typeof(hints[hintName]) === hintType) {
            userAgentClientHints[hintName] = hints[hintName];
          }
        });
        (0, _index.deepAssign)(xdm, {
          environment: {
            browserDetails: {
              userAgentClientHints: userAgentClientHints
            }
          }
        });
      });
    } catch (error) {
      logger.warn("Unable to collect user-agent client hints. " + error.message);
      return _index.noop;
    }
  };
};
exports["default"] = _default;

},{"../../constants/highEntropyUserAgentClientHints.js":216,"../../utils/index.js":300}],52:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
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
var _default = function _default(dateProvider) {
  return function (xdm) {
    var date = dateProvider();
    var placeContext = {};
    var localTimezoneOffset = (0, _index.toInteger)(date.getTimezoneOffset());
    if (localTimezoneOffset !== undefined) {
      placeContext.localTimezoneOffset = localTimezoneOffset;
    }
    // make sure the timezone offset only uses two digits
    if (localTimezoneOffset === undefined || Math.abs(localTimezoneOffset) < 6000) {
      placeContext.localTime = (0, _index.toISOStringLocal)(date);
    }
    (0, _index.deepAssign)(xdm, {
      placeContext: placeContext
    });
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300}],53:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
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
var _default = function _default(dateProvider) {
  return function (xdm) {
    var timestamp = dateProvider().toISOString();
    (0, _index.deepAssign)(xdm, {
      timestamp: timestamp
    });
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300}],54:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
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
var _default = function _default(window) {
  return function (xdm) {
    var web = {
      webPageDetails: {
        URL: window.location.href || window.location
      },
      webReferrer: {
        URL: window.document.referrer
      }
    };
    (0, _index.deepAssign)(xdm, {
      web: web
    });
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300}],55:[function(require,module,exports){
"use strict";

var _excluded = ["xdm", "data", "documentUnloading", "type", "mergeId", "datasetId", "edgeConfigOverrides"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
exports["default"] = void 0;
var _validateUserEventOptions = require("./validateUserEventOptions.js");
var _validateApplyResponse = require("./validateApplyResponse.js");
var _index = require("../../utils/index.js");
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

var createDataCollector = function createDataCollector(_ref) {
  var eventManager = _ref.eventManager,
    logger = _ref.logger;
  return {
    commands: {
      sendEvent: {
        documentationUri: "https://adobe.ly/3GQ3Q7t",
        optionsValidator: function optionsValidator(options) {
          return (0, _validateUserEventOptions["default"])({
            options: options
          });
        },
        run: function run(options) {
          var xdm = options.xdm,
            data = options.data,
            documentUnloading = options.documentUnloading,
            type = options.type,
            mergeId = options.mergeId,
            datasetId = options.datasetId,
            edgeConfigOverrides = options.edgeConfigOverrides,
            eventManagerOptions = _objectWithoutProperties(options, _excluded);
          var event = eventManager.createEvent();
          if (documentUnloading) {
            event.documentMayUnload();
          }
          event.setUserXdm(xdm);
          event.setUserData(data);
          if (type) {
            event.mergeXdm({
              eventType: type
            });
          }
          if (mergeId) {
            event.mergeXdm({
              eventMergeId: mergeId
            });
          }
          if (edgeConfigOverrides) {
            eventManagerOptions.edgeConfigOverrides = edgeConfigOverrides;
          }
          if (datasetId) {
            logger.warn("The 'datasetId' option has been deprecated. Please use 'edgeConfigOverrides.com_adobe_experience_platform.datasets.event.datasetId' instead.");
            eventManagerOptions.edgeConfigOverrides = edgeConfigOverrides || {};
            (0, _index.deepAssign)(eventManagerOptions.edgeConfigOverrides, {
              com_adobe_experience_platform: {
                datasets: {
                  event: {
                    datasetId: datasetId
                  }
                }
              }
            });
          }
          return eventManager.sendEvent(event, eventManagerOptions);
        }
      },
      applyResponse: {
        documentationUri: "",
        optionsValidator: function optionsValidator(options) {
          return (0, _validateApplyResponse["default"])({
            options: options
          });
        },
        run: function run(options) {
          var _options$renderDecisi = options.renderDecisions,
            renderDecisions = _options$renderDecisi === void 0 ? false : _options$renderDecisi,
            _options$decisionCont = options.decisionContext,
            decisionContext = _options$decisionCont === void 0 ? {} : _options$decisionCont,
            _options$responseHead = options.responseHeaders,
            responseHeaders = _options$responseHead === void 0 ? {} : _options$responseHead,
            _options$responseBody = options.responseBody,
            responseBody = _options$responseBody === void 0 ? {
              handle: []
            } : _options$responseBody,
            personalization = options.personalization;
          var event = eventManager.createEvent();
          return eventManager.applyResponse(event, {
            renderDecisions: renderDecisions,
            decisionContext: decisionContext,
            responseHeaders: responseHeaders,
            responseBody: responseBody,
            personalization: personalization
          });
        }
      }
    }
  };
};
createDataCollector.namespace = "DataCollector";
var _default = exports["default"] = createDataCollector;

},{"../../utils/index.js":300,"./validateApplyResponse.js":56,"./validateUserEventOptions.js":57}],56:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/validation/index.js");
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
var _default = function _default(_ref) {
  var options = _ref.options;
  var validator = (0, _index.objectOf)({
    renderDecisions: (0, _index["boolean"])(),
    responseHeaders: (0, _index.mapOfValues)((0, _index.string)().required()),
    responseBody: (0, _index.objectOf)({
      handle: (0, _index.arrayOf)((0, _index.objectOf)({
        type: (0, _index.string)().required(),
        payload: (0, _index.anything)().required()
      })).required()
    }).required(),
    personalization: (0, _index.objectOf)({
      sendDisplayEvent: (0, _index["boolean"])()["default"](true),
      decisionContext: (0, _index.objectOf)({})
    })["default"]({
      sendDisplayEvent: true
    })
  }).noUnknownFields();
  return validator(options);
};
exports["default"] = _default;

},{"../../utils/validation/index.js":364}],57:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var options = _ref.options;
  var eventOptionsValidator = (0, _index.objectOf)({
    type: (0, _index.string)(),
    xdm: (0, _index.objectOf)({
      eventType: (0, _index.string)(),
      identityMap: _index2.validateIdentityMap
    }),
    data: (0, _index.objectOf)({}),
    documentUnloading: (0, _index["boolean"])(),
    renderDecisions: (0, _index["boolean"])(),
    decisionScopes: (0, _index.arrayOf)((0, _index.string)()).uniqueItems(),
    personalization: (0, _index.objectOf)({
      decisionScopes: (0, _index.arrayOf)((0, _index.string)()).uniqueItems(),
      surfaces: (0, _index.arrayOf)((0, _index.string)()).uniqueItems(),
      sendDisplayEvent: (0, _index["boolean"])()["default"](true),
      includeRenderedPropositions: (0, _index["boolean"])()["default"](false),
      defaultPersonalizationEnabled: (0, _index["boolean"])(),
      decisionContext: (0, _index.objectOf)({})
    })["default"]({
      sendDisplayEvent: true
    }),
    datasetId: (0, _index.string)(),
    mergeId: (0, _index.string)(),
    edgeConfigOverrides: _index2.validateConfigOverride,
    initializePersonalization: (0, _index["boolean"])()
  }).required().noUnknownFields();
  return eventOptionsValidator(options);
};
exports["default"] = _default;

},{"../../utils/index.js":300,"../../utils/validation/index.js":364}],58:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var createEventMergeId = _ref.createEventMergeId;
  return {
    commands: {
      createEventMergeId: {
        run: createEventMergeId
      }
    }
  };
};
exports["default"] = _default;

},{}],59:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
/*
Copyright 20219 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default() {
  return {
    eventMergeId: (0, _index.uuid)()
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300}],60:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _createEventMergeId = require("./createEventMergeId.js");
var _createComponent = require("./createComponent.js");
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

var createEventMerge = function createEventMerge() {
  return (0, _createComponent["default"])({
    createEventMergeId: _createEventMergeId["default"]
  });
};
createEventMerge.namespace = "EventMerge";
var _default = exports["default"] = createEventMerge;

},{"./createComponent.js":58,"./createEventMergeId.js":59}],61:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _ecidNamespace = require("../../constants/ecidNamespace.js");
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
var _default = function _default(payload, ecid) {
  payload.addIdentity(_ecidNamespace["default"], {
    id: ecid
  });
};
exports["default"] = _default;

},{"../../constants/ecidNamespace.js":211}],62:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../utils/index.js");
var _index2 = require("../../../utils/validation/index.js");
/*
Copyright 2022 Adobe. All rights reserved.
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
var _default = exports["default"] = (0, _index2.objectOf)({
  url: (0, _index2.string)().required().nonEmpty(),
  edgeConfigOverrides: _index.validateConfigOverride
}).required().noUnknownFields();

},{"../../../utils/index.js":300,"../../../utils/validation/index.js":364}],63:[function(require,module,exports){
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
exports["default"] = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var URL_REGEX = /^([^?#]*)(\??[^#]*)(#?.*)$/;
var getSeparator = function getSeparator(queryString) {
  if (queryString === "") {
    return "?";
  }
  if (queryString === "?") {
    return "";
  }
  return "&";
};
var _default = function _default(_ref) {
  var dateProvider = _ref.dateProvider,
    orgId = _ref.orgId;
  return function (ecid, url) {
    var ts = Math.round(dateProvider().getTime() / 1000);
    var adobemc = encodeURIComponent("TS=" + ts + "|MCMID=" + ecid + "|MCORGID=" + encodeURIComponent(orgId));
    var _url$match = url.match(URL_REGEX),
      _url$match2 = _slicedToArray(_url$match, 4),
      location = _url$match2[1],
      queryString = _url$match2[2],
      fragment = _url$match2[3];
    var separator = getSeparator(queryString);
    return "" + location + queryString + separator + "adobe_mc=" + adobemc + fragment;
  };
};
exports["default"] = _default;

},{}],64:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/validation/index.js");
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

var configValidators = (0, _index.objectOf)({
  thirdPartyCookiesEnabled: (0, _index["boolean"])()["default"](true),
  idMigrationEnabled: (0, _index["boolean"])()["default"](true)
});
var _default = exports["default"] = configValidators;

},{"../../utils/validation/index.js":364}],65:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _appendIdentityToUrlOptionsValidator = require("./appendIdentityToUrl/appendIdentityToUrlOptionsValidator.js");
var _ecidNamespace = require("../../constants/ecidNamespace.js");
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
var _default = function _default(_ref) {
  var addEcidQueryToPayload = _ref.addEcidQueryToPayload,
    addQueryStringIdentityToPayload = _ref.addQueryStringIdentityToPayload,
    ensureSingleIdentity = _ref.ensureSingleIdentity,
    setLegacyEcid = _ref.setLegacyEcid,
    handleResponseForIdSyncs = _ref.handleResponseForIdSyncs,
    getNamespacesFromResponse = _ref.getNamespacesFromResponse,
    getIdentity = _ref.getIdentity,
    consent = _ref.consent,
    appendIdentityToUrl = _ref.appendIdentityToUrl,
    logger = _ref.logger,
    getIdentityOptionsValidator = _ref.getIdentityOptionsValidator;
  var namespaces;
  var edge = {};
  return {
    lifecycle: {
      onBeforeRequest: function onBeforeRequest(_ref2) {
        var request = _ref2.request,
          onResponse = _ref2.onResponse,
          onRequestFailure = _ref2.onRequestFailure;
        // Querying the ECID on every request to be able to set the legacy cookie, and make it
        // available for the `getIdentity` command.
        addEcidQueryToPayload(request.getPayload());
        addQueryStringIdentityToPayload(request.getPayload());
        return ensureSingleIdentity({
          request: request,
          onResponse: onResponse,
          onRequestFailure: onRequestFailure
        });
      },
      onResponse: function onResponse(_ref3) {
        var response = _ref3.response;
        var newNamespaces = getNamespacesFromResponse(response);
        if ((!namespaces || !namespaces[_ecidNamespace["default"]]) && newNamespaces && newNamespaces[_ecidNamespace["default"]]) {
          // Only data collection calls will have an ECID in the response.
          // https://jira.corp.adobe.com/browse/EXEG-1234
          setLegacyEcid(newNamespaces[_ecidNamespace["default"]]);
        }
        namespaces = newNamespaces;
        // For sendBeacon requests, getEdge() will return {}, so we are using assign here
        // so that sendBeacon requests don't override the edge info from before.
        edge = _objectSpread(_objectSpread({}, edge), response.getEdge());
        return handleResponseForIdSyncs(response);
      }
    },
    commands: {
      getIdentity: {
        optionsValidator: getIdentityOptionsValidator,
        run: function run(options) {
          var requestedNamespaces = options.namespaces;
          return consent.awaitConsent().then(function () {
            return namespaces ? undefined : getIdentity(options);
          }).then(function () {
            return {
              identity: requestedNamespaces.reduce(function (acc, namespace) {
                acc[namespace] = namespaces[namespace] || null;
                return acc;
              }, {}),
              edge: edge
            };
          });
        }
      },
      appendIdentityToUrl: {
        optionsValidator: _appendIdentityToUrlOptionsValidator["default"],
        run: function run(options) {
          return consent.withConsent().then(function () {
            return namespaces ? undefined : getIdentity(options);
          }).then(function () {
            return {
              url: appendIdentityToUrl(namespaces[_ecidNamespace["default"]], options.url)
            };
          })["catch"](function (error) {
            logger.warn("Unable to append identity to url. " + error.message);
            return options;
          });
        }
      }
    }
  };
};
exports["default"] = _default;

},{"../../constants/ecidNamespace.js":211,"./appendIdentityToUrl/appendIdentityToUrlOptionsValidator.js":62}],66:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
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
/**
 * Handles migration of ECID to and from Visitor.js.
 */
var _default = function _default(_ref) {
  var config = _ref.config,
    getEcidFromVisitor = _ref.getEcidFromVisitor,
    apexDomain = _ref.apexDomain,
    isPageSsl = _ref.isPageSsl,
    cookieJar = _ref.cookieJar;
  var idMigrationEnabled = config.idMigrationEnabled,
    orgId = config.orgId;
  var amcvCookieName = "AMCV_" + orgId;
  var getEcidFromLegacyCookies = function getEcidFromLegacyCookies() {
    var ecid = null;
    var secidCookieName = "s_ecid";
    var legacyEcidCookieValue = cookieJar.get(secidCookieName) || cookieJar.get(amcvCookieName);
    if (legacyEcidCookieValue) {
      var reg = /(^|\|)MCMID\|(\d+)($|\|)/;
      var matches = legacyEcidCookieValue.match(reg);
      if (matches) {
        // Destructuring arrays breaks in IE
        ecid = matches[2];
      }
    }
    return ecid;
  };
  return {
    getEcid: function getEcid() {
      if (idMigrationEnabled) {
        var ecid = getEcidFromLegacyCookies();
        if (ecid) {
          return Promise.resolve(ecid);
        }
        return getEcidFromVisitor();
      }
      return Promise.resolve();
    },
    setEcid: function setEcid(ecid) {
      if (idMigrationEnabled && getEcidFromLegacyCookies() !== ecid) {
        var extraOptions = isPageSsl ? {
          sameSite: "none",
          secure: true
        } : {};
        cookieJar.set(amcvCookieName, "MCMID|" + ecid, _objectSpread({
          domain: apexDomain,
          // Without `expires` this will be a session cookie.
          expires: 390
        }, extraOptions));
      }
    }
  };
};
exports["default"] = _default;

},{}],67:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../utils/request/index.js");
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
var _default = function _default(_ref) {
  var sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest,
    createIdentityRequestPayload = _ref.createIdentityRequestPayload,
    createIdentityRequest = _ref.createIdentityRequest,
    globalConfigOverrides = _ref.globalConfigOverrides;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      namespaces = _ref2.namespaces,
      localConfigOverrides = _ref2.edgeConfigOverrides;
    var requestParams = (0, _index.createRequestParams)({
      payload: createIdentityRequestPayload(namespaces),
      globalConfigOverrides: globalConfigOverrides,
      localConfigOverrides: localConfigOverrides
    });
    var request = createIdentityRequest(requestParams);
    return sendEdgeNetworkRequest({
      request: request
    });
  };
};
exports["default"] = _default;

},{"../../../utils/request/index.js":335}],68:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../utils/index.js");
var _index2 = require("../../../utils/validation/index.js");
var _ecidNamespace = require("../../../constants/ecidNamespace.js");
var _coreNamespace = require("../../../constants/coreNamespace.js");
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

var validator = (0, _index2.objectOf)({
  namespaces: (0, _index2.arrayOf)((0, _index2.enumOf)(_ecidNamespace["default"], _coreNamespace["default"])).nonEmpty().uniqueItems()["default"]([_ecidNamespace["default"]]),
  edgeConfigOverrides: _index.validateConfigOverride
}).noUnknownFields()["default"]({
  namespaces: [_ecidNamespace["default"]]
});
var _default = function _default(_ref) {
  var thirdPartyCookiesEnabled = _ref.thirdPartyCookiesEnabled;
  return function (options) {
    var validatedOptions = validator(options);
    if (!thirdPartyCookiesEnabled && validatedOptions.namespaces.includes(_coreNamespace["default"])) {
      throw new Error("namespaces: The " + _coreNamespace["default"] + " namespace cannot be requested when third-party cookies are disabled.");
    }
    return validatedOptions;
  };
};
exports["default"] = _default;

},{"../../../constants/coreNamespace.js":207,"../../../constants/ecidNamespace.js":211,"../../../utils/index.js":300,"../../../utils/validation/index.js":364}],69:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../utils/request/index.js");
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
var _default = function _default(_ref) {
  var payload = _ref.payload,
    datastreamIdOverride = _ref.datastreamIdOverride;
  return (0, _index.createRequest)({
    payload: payload,
    datastreamIdOverride: datastreamIdOverride,
    getAction: function getAction() {
      return "identity/acquire";
    },
    getUseSendBeacon: function getUseSendBeacon() {
      return false;
    }
  });
};
exports["default"] = _default;

},{"../../../utils/request/index.js":335}],70:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../utils/request/index.js");
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
var _default = function _default(namespaces) {
  var content = {
    query: {
      identity: {
        fetch: namespaces
      }
    }
  };
  return (0, _index.createRequestPayload)({
    content: content,
    addIdentity: (0, _index.createAddIdentity)(content),
    hasIdentity: (0, _index.createHasIdentity)(content)
  });
};
exports["default"] = _default;

},{"../../../utils/request/index.js":335}],71:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(response) {
  var identityResultPayloads = response.getPayloadsByType("identity:result");
  return identityResultPayloads.reduce(function (acc, payload) {
    if (payload.namespace && payload.namespace.code) {
      acc[payload.namespace.code] = payload.id;
    }
    return acc;
  }, {});
};
exports["default"] = _default;

},{}],72:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _injectProcessIdSyncs = require("./injectProcessIdSyncs.js");
var _configValidators = require("./configValidators.js");
var _createComponent = require("./createComponent.js");
var _createLegacyIdentity = require("./createLegacyIdentity.js");
var _awaitVisitorOptIn = require("./visitorService/awaitVisitorOptIn.js");
var _injectGetEcidFromVisitor = require("./visitorService/injectGetEcidFromVisitor.js");
var _injectHandleResponseForIdSyncs = require("./injectHandleResponseForIdSyncs.js");
var _injectEnsureSingleIdentity = require("./injectEnsureSingleIdentity.js");
var _injectAddEcidQueryToPayload = require("./injectAddEcidQueryToPayload.js");
var _injectSetDomainForInitialIdentityPayload = require("./injectSetDomainForInitialIdentityPayload.js");
var _injectAddLegacyEcidToPayload = require("./injectAddLegacyEcidToPayload.js");
var _injectAddQueryStringIdentityToPayload = require("./injectAddQueryStringIdentityToPayload.js");
var _addEcidToPayload = require("./addEcidToPayload.js");
var _injectAwaitIdentityCookie = require("./injectAwaitIdentityCookie.js");
var _getNamespacesFromResponse = require("./getNamespacesFromResponse.js");
var _createGetIdentity = require("./getIdentity/createGetIdentity.js");
var _createIdentityRequest = require("./getIdentity/createIdentityRequest.js");
var _createIdentityRequestPayload = require("./getIdentity/createIdentityRequestPayload.js");
var _injectAppendIdentityToUrl = require("./appendIdentityToUrl/injectAppendIdentityToUrl.js");
var _createGetIdentityOptionsValidator = require("./getIdentity/createGetIdentityOptionsValidator.js");
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

var createIdentity = function createIdentity(_ref) {
  var config = _ref.config,
    logger = _ref.logger,
    consent = _ref.consent,
    fireReferrerHideableImage = _ref.fireReferrerHideableImage,
    sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest,
    apexDomain = _ref.apexDomain,
    getBrowser = _ref.getBrowser;
  var orgId = config.orgId,
    thirdPartyCookiesEnabled = config.thirdPartyCookiesEnabled,
    globalConfigOverrides = config.edgeConfigOverrides;
  var getEcidFromVisitor = (0, _injectGetEcidFromVisitor["default"])({
    logger: logger,
    orgId: orgId,
    awaitVisitorOptIn: _awaitVisitorOptIn["default"]
  });
  var loggingCookieJar = (0, _index.createLoggingCookieJar)({
    logger: logger,
    cookieJar: _index.cookieJar
  });
  var legacyIdentity = (0, _createLegacyIdentity["default"])({
    config: config,
    getEcidFromVisitor: getEcidFromVisitor,
    apexDomain: apexDomain,
    cookieJar: loggingCookieJar,
    isPageSsl: window.location.protocol === "https:"
  });
  var doesIdentityCookieExist = (0, _index.injectDoesIdentityCookieExist)({
    orgId: orgId
  });
  var getIdentity = (0, _createGetIdentity["default"])({
    sendEdgeNetworkRequest: sendEdgeNetworkRequest,
    createIdentityRequestPayload: _createIdentityRequestPayload["default"],
    createIdentityRequest: _createIdentityRequest["default"],
    globalConfigOverrides: globalConfigOverrides
  });
  var areThirdPartyCookiesSupportedByDefault = (0, _index.injectAreThirdPartyCookiesSupportedByDefault)({
    getBrowser: getBrowser
  });
  var setDomainForInitialIdentityPayload = (0, _injectSetDomainForInitialIdentityPayload["default"])({
    thirdPartyCookiesEnabled: thirdPartyCookiesEnabled,
    areThirdPartyCookiesSupportedByDefault: areThirdPartyCookiesSupportedByDefault
  });
  var addLegacyEcidToPayload = (0, _injectAddLegacyEcidToPayload["default"])({
    getLegacyEcid: legacyIdentity.getEcid,
    addEcidToPayload: _addEcidToPayload["default"]
  });
  var addQueryStringIdentityToPayload = (0, _injectAddQueryStringIdentityToPayload["default"])({
    locationSearch: window.document.location.search,
    dateProvider: function dateProvider() {
      return new Date();
    },
    orgId: orgId,
    logger: logger
  });
  var awaitIdentityCookie = (0, _injectAwaitIdentityCookie["default"])({
    doesIdentityCookieExist: doesIdentityCookieExist,
    orgId: orgId,
    logger: logger
  });
  var ensureSingleIdentity = (0, _injectEnsureSingleIdentity["default"])({
    doesIdentityCookieExist: doesIdentityCookieExist,
    setDomainForInitialIdentityPayload: setDomainForInitialIdentityPayload,
    addLegacyEcidToPayload: addLegacyEcidToPayload,
    awaitIdentityCookie: awaitIdentityCookie,
    logger: logger
  });
  var processIdSyncs = (0, _injectProcessIdSyncs["default"])({
    fireReferrerHideableImage: fireReferrerHideableImage,
    logger: logger
  });
  var handleResponseForIdSyncs = (0, _injectHandleResponseForIdSyncs["default"])({
    processIdSyncs: processIdSyncs
  });
  var appendIdentityToUrl = (0, _injectAppendIdentityToUrl["default"])({
    dateProvider: function dateProvider() {
      return new Date();
    },
    orgId: orgId,
    globalConfigOverrides: globalConfigOverrides
  });
  var getIdentityOptionsValidator = (0, _createGetIdentityOptionsValidator["default"])({
    thirdPartyCookiesEnabled: thirdPartyCookiesEnabled
  });
  var addEcidQueryToPayload = (0, _injectAddEcidQueryToPayload["default"])({
    thirdPartyCookiesEnabled: thirdPartyCookiesEnabled,
    areThirdPartyCookiesSupportedByDefault: areThirdPartyCookiesSupportedByDefault
  });
  return (0, _createComponent["default"])({
    addEcidQueryToPayload: addEcidQueryToPayload,
    addQueryStringIdentityToPayload: addQueryStringIdentityToPayload,
    ensureSingleIdentity: ensureSingleIdentity,
    setLegacyEcid: legacyIdentity.setEcid,
    handleResponseForIdSyncs: handleResponseForIdSyncs,
    getNamespacesFromResponse: _getNamespacesFromResponse["default"],
    getIdentity: getIdentity,
    consent: consent,
    appendIdentityToUrl: appendIdentityToUrl,
    logger: logger,
    config: config,
    getIdentityOptionsValidator: getIdentityOptionsValidator
  });
};
createIdentity.namespace = "Identity";
createIdentity.configValidators = _configValidators["default"];
var _default = exports["default"] = createIdentity;

},{"../../utils/index.js":300,"./addEcidToPayload.js":61,"./appendIdentityToUrl/injectAppendIdentityToUrl.js":63,"./configValidators.js":64,"./createComponent.js":65,"./createLegacyIdentity.js":66,"./getIdentity/createGetIdentity.js":67,"./getIdentity/createGetIdentityOptionsValidator.js":68,"./getIdentity/createIdentityRequest.js":69,"./getIdentity/createIdentityRequestPayload.js":70,"./getNamespacesFromResponse.js":71,"./injectAddEcidQueryToPayload.js":73,"./injectAddLegacyEcidToPayload.js":74,"./injectAddQueryStringIdentityToPayload.js":75,"./injectAwaitIdentityCookie.js":76,"./injectEnsureSingleIdentity.js":77,"./injectHandleResponseForIdSyncs.js":78,"./injectProcessIdSyncs.js":79,"./injectSetDomainForInitialIdentityPayload.js":80,"./visitorService/awaitVisitorOptIn.js":81,"./visitorService/injectGetEcidFromVisitor.js":83}],73:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _ecidNamespace = require("../../constants/ecidNamespace.js");
var _coreNamespace = require("../../constants/coreNamespace.js");
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
var _default = function _default(_ref) {
  var thirdPartyCookiesEnabled = _ref.thirdPartyCookiesEnabled,
    areThirdPartyCookiesSupportedByDefault = _ref.areThirdPartyCookiesSupportedByDefault;
  var query = {
    identity: {
      fetch: [_ecidNamespace["default"]]
    }
  };
  if (thirdPartyCookiesEnabled && areThirdPartyCookiesSupportedByDefault()) {
    query.identity.fetch.push(_coreNamespace["default"]);
  }
  return function (payload) {
    payload.mergeQuery(query);
  };
};
exports["default"] = _default;

},{"../../constants/coreNamespace.js":207,"../../constants/ecidNamespace.js":211}],74:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _ecidNamespace = require("../../constants/ecidNamespace.js");
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
var _default = function _default(_ref) {
  var getLegacyEcid = _ref.getLegacyEcid,
    addEcidToPayload = _ref.addEcidToPayload;
  return function (payload) {
    if (payload.hasIdentity(_ecidNamespace["default"])) {
      // don't get the legacy identity if we already have the query string identity or if
      // the user specified it in the identity map
      return Promise.resolve();
    }
    return getLegacyEcid().then(function (ecidToMigrate) {
      if (ecidToMigrate) {
        addEcidToPayload(payload, ecidToMigrate);
      }
    });
  };
};
exports["default"] = _default;

},{"../../constants/ecidNamespace.js":211}],75:[function(require,module,exports){
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _queryStringIdentityParam = require("../../constants/queryStringIdentityParam.js");
var _ecidNamespace = require("../../constants/ecidNamespace.js");
var _decodeUriComponentSafely = require("../../utils/decodeUriComponentSafely.js");
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
// Example: adobe_mc=TS%3D1641432103%7CMCMID%3D77094828402023918047117570965393734545%7CMCORGID%3DFAF554945B90342F0A495E2C%40AdobeOrg
// Decoded: adobe_mc=TS=1641432103|MCMID=77094828402023918047117570965393734545|MCORGID=FAF554945B90342F0A495E2C@AdobeOrg

var LINK_TTL_SECONDS = 300; // 5 minute link time to live
var _default = function _default(_ref) {
  var locationSearch = _ref.locationSearch,
    dateProvider = _ref.dateProvider,
    orgId = _ref.orgId,
    logger = _ref.logger;
  return function (payload) {
    if (payload.hasIdentity(_ecidNamespace["default"])) {
      // don't overwrite a user provided ecid identity
      return;
    }
    var parsedQueryString = _index.queryString.parse(locationSearch);
    var queryStringValue = parsedQueryString[_queryStringIdentityParam["default"]];
    if (queryStringValue === undefined) {
      return;
    }
    if (Array.isArray(queryStringValue)) {
      logger.warn("Found multiple adobe_mc query string paramters, only using the last one.");
      queryStringValue = queryStringValue[queryStringValue.length - 1];
    }
    var properties = queryStringValue.split("|").reduce(function (memo, keyValue) {
      var _keyValue$split = keyValue.split("="),
        _keyValue$split2 = _slicedToArray(_keyValue$split, 2),
        key = _keyValue$split2[0],
        value = _keyValue$split2[1];
      memo[key] = value;
      return memo;
    }, {});
    // We are using MCMID and MCORGID to be compatible with Visitor.
    var ts = parseInt(properties.TS, 10);
    var mcmid = properties.MCMID;
    var mcorgid = (0, _decodeUriComponentSafely["default"])(properties.MCORGID);
    if (
    // When TS is not specified or not a number, the following inequality returns false.
    // All inequalities with NaN variables are false.
    dateProvider().getTime() / 1000 <= ts + LINK_TTL_SECONDS && mcorgid === orgId && mcmid) {
      logger.info("Found valid ECID identity " + mcmid + " from the adobe_mc query string parameter.");
      payload.addIdentity(_ecidNamespace["default"], {
        id: mcmid
      });
    } else {
      logger.info("Detected invalid or expired adobe_mc query string parameter.");
    }
  };
};
exports["default"] = _default;

},{"../../constants/ecidNamespace.js":211,"../../constants/queryStringIdentityParam.js":227,"../../utils/decodeUriComponentSafely.js":277,"../../utils/index.js":300}],76:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var doesIdentityCookieExist = _ref.doesIdentityCookieExist,
    orgId = _ref.orgId,
    logger = _ref.logger;
  /**
   * Returns a promise that will be resolved once an identity cookie exists.
   * If an identity cookie doesn't already exist, it should always exist after
   * the first response.
   */
  return function (_ref2) {
    var onResponse = _ref2.onResponse,
      onRequestFailure = _ref2.onRequestFailure;
    return new Promise(function (resolve, reject) {
      onResponse(function () {
        if (doesIdentityCookieExist()) {
          resolve();
        } else {
          // This logic assumes that the code setting the cookie is working as expected and that
          // the cookie was missing from the response.
          logger.warn("Identity cookie not found. This could be caused by any of the following issues:\n" + ("\t* The org ID " + orgId + " configured in Alloy doesn't match the org ID specified in the edge configuration.\n") + "\t* Experience edge was not able to set the identity cookie due to domain or cookie restrictions.\n" + "\t* The request was canceled by the browser and not fully processed.");

          // Rejecting the promise will tell queued events to still go out
          // one at a time.
          reject(new Error("Identity cookie not found."));
        }
      });
      onRequestFailure(function () {
        if (doesIdentityCookieExist()) {
          resolve();
        } else {
          // The error from the request failure will be logged separately. Rejecting this here
          // will tell ensureSingleIdentity to send the next request without identity
          reject(new Error("Identity cookie not found."));
        }
      });
    });
  };
};
exports["default"] = _default;

},{}],77:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
// TO-DOCUMENT: We queue subsequent requests until we have an identity cookie.
var _default = function _default(_ref) {
  var doesIdentityCookieExist = _ref.doesIdentityCookieExist,
    setDomainForInitialIdentityPayload = _ref.setDomainForInitialIdentityPayload,
    addLegacyEcidToPayload = _ref.addLegacyEcidToPayload,
    awaitIdentityCookie = _ref.awaitIdentityCookie,
    logger = _ref.logger;
  var obtainedIdentityPromise;
  var allowRequestToGoWithoutIdentity = function allowRequestToGoWithoutIdentity(request) {
    setDomainForInitialIdentityPayload(request);
    return addLegacyEcidToPayload(request.getPayload());
  };

  /**
   * Ensures that if no identity cookie exists, we only let one request at a
   * time without an identity until its response returns. In the meantime,
   * we queue all other requests, otherwise the requests could result in
   * multiple ECIDs being minted for the user. Once we get an identity
   * cookie, we can let the queued requests be sent all at once, since they
   * will have the newly minted ECID.
   *
   * Konductor should make every effort to return an identity, but in
   * certain scenarios it may not. For example, in cases where the
   * request does not match what Konductor is expecting (ie 400s).
   * In cases where Konductor does not set an identity, there should be
   * no events recorded so we don't need to worry about multiple ECIDs
   * being minted for each user.
   *
   * The reason we allow for multiple sequential requests to be sent without
   * an identity is to prevent a single malformed request causing all other
   * requests to never send.
   */
  return function (_ref2) {
    var request = _ref2.request,
      onResponse = _ref2.onResponse,
      onRequestFailure = _ref2.onRequestFailure;
    if (doesIdentityCookieExist()) {
      request.setIsIdentityEstablished();
      return Promise.resolve();
    }
    if (obtainedIdentityPromise) {
      // We don't have an identity cookie, but at least one request has
      // been sent to get it. Konductor may set the identity cookie in the
      // response. We will hold up this request until the previous request
      // returns and awaitIdentityCookie confirms the identity was set.
      logger.info("Delaying request while retrieving ECID from server.");
      var previousObtainedIdentityPromise = obtainedIdentityPromise;

      // This promise resolves when we have an identity cookie. Additional
      // requests are chained together so that only one is sent at a time
      // until we have the identity cookie.
      obtainedIdentityPromise = previousObtainedIdentityPromise["catch"](function () {
        return awaitIdentityCookie({
          onResponse: onResponse,
          onRequestFailure: onRequestFailure
        });
      });

      // When this returned promise resolves, the request will go out.
      return previousObtainedIdentityPromise.then(function () {
        logger.info("Resuming previously delayed request.");
        request.setIsIdentityEstablished();
      })
      // If Konductor did not set the identity cookie on the previous
      // request, then awaitIdentityCookie will reject its promise.
      // Catch the rejection here and allow this request to go out.
      ["catch"](function () {
        return allowRequestToGoWithoutIdentity(request);
      });
    }

    // For Alloy+Konductor communication to be as robust as possible and
    // to ensure we don't mint new ECIDs for requests that would otherwise
    // be sent in parallel, we'll let this request go out to fetch the
    // cookie
    obtainedIdentityPromise = awaitIdentityCookie({
      onResponse: onResponse,
      onRequestFailure: onRequestFailure
    });
    // This prevents an un-caught promise in the console when the identity isn't set.
    obtainedIdentityPromise["catch"](function () {
      return undefined;
    });
    return allowRequestToGoWithoutIdentity(request);
  };
};
exports["default"] = _default;

},{}],78:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var processIdSyncs = _ref.processIdSyncs;
  return function (response) {
    return processIdSyncs(response.getPayloadsByType("identity:exchange"));
  };
};
exports["default"] = _default;

},{}],79:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
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

var createResultLogMessage = function createResultLogMessage(idSync, success) {
  return "ID sync " + (success ? "succeeded" : "failed") + ": " + idSync.spec.url;
};
var _default = function _default(_ref) {
  var fireReferrerHideableImage = _ref.fireReferrerHideableImage,
    logger = _ref.logger;
  return function (idSyncs) {
    var urlIdSyncs = idSyncs.filter(function (idSync) {
      return idSync.type === "url";
    });
    if (!urlIdSyncs.length) {
      return Promise.resolve();
    }
    return Promise.all(urlIdSyncs.map(function (idSync) {
      return fireReferrerHideableImage(idSync.spec).then(function () {
        logger.info(createResultLogMessage(idSync, true));
      })["catch"](function () {
        // We intentionally do not throw an error if id syncs fail. We
        // consider it a non-critical failure and therefore do not want it to
        // reject the promise handed back to the customer.
        logger.error(createResultLogMessage(idSync, false));
      });
    })).then(_index.noop);
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300}],80:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var thirdPartyCookiesEnabled = _ref.thirdPartyCookiesEnabled,
    areThirdPartyCookiesSupportedByDefault = _ref.areThirdPartyCookiesSupportedByDefault;
  return function (request) {
    if (thirdPartyCookiesEnabled && areThirdPartyCookiesSupportedByDefault()) {
      // If third-party cookies are enabled by the customer and
      // supported by the browser, we will send the request to a
      // a third-party identification domain that allows for more accurate
      // identification of the user through use of a third-party cookie.
      // If we have an identity to migrate, we still want to hit the
      // third-party identification domain because the third-party identification
      // domain will use our ECID to set the third-party cookie if the third-party
      // cookie isn't already set, which provides for better cross-domain
      // identification for future requests.
      request.setUseIdThirdPartyDomain();
    }
  };
};
exports["default"] = _default;

},{}],81:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../utils/index.js");
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
var _default = function _default(_ref) {
  var logger = _ref.logger;
  return new Promise(function (resolve, reject) {
    if ((0, _index.isObject)(window.adobe) && (0, _index.isObject)(window.adobe.optIn)) {
      var optInOld = window.adobe.optIn;
      logger.info("Delaying request while waiting for legacy opt-in to let Visitor retrieve ECID from server.");
      optInOld.fetchPermissions(function () {
        if (optInOld.isApproved([optInOld.Categories.ECID])) {
          logger.info("Received legacy opt-in approval to let Visitor retrieve ECID from server.");
          resolve();
        } else {
          reject(new Error("Legacy opt-in was declined."));
        }
      }, true);
    } else {
      resolve();
    }
  });
};
exports["default"] = _default;

},{"../../../utils/index.js":300}],82:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../utils/index.js");
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
var _default = function _default(window) {
  var Visitor = window.Visitor;
  return (0, _index.isFunction)(Visitor) && (0, _index.isFunction)(Visitor.getInstance) && Visitor;
};
exports["default"] = _default;

},{"../../../utils/index.js":300}],83:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _getVisitor = require("./getVisitor.js");
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
var _default = function _default(_ref) {
  var logger = _ref.logger,
    orgId = _ref.orgId,
    awaitVisitorOptIn = _ref.awaitVisitorOptIn;
  return function () {
    var Visitor = (0, _getVisitor["default"])(window);
    if (Visitor) {
      // Need to explicitly wait for optIn because visitor will call callback
      // with invalid values prior to optIn being approved
      return awaitVisitorOptIn({
        logger: logger
      }).then(function () {
        logger.info("Delaying request while using Visitor to retrieve ECID from server.");
        return new Promise(function (resolve) {
          var visitor = Visitor.getInstance(orgId, {});
          visitor.getMarketingCloudVisitorID(function (ecid) {
            logger.info("Resuming previously delayed request that was waiting for ECID from Visitor.");
            resolve(ecid);
          }, true);
        });
      })["catch"](function (error) {
        // If consent was denied, get the ECID from experience edge. OptIn and AEP Web SDK
        // consent should operate independently, but during id migration AEP Web SDK needs
        // to wait for optIn object consent resolution so that only one ECID is generated.
        if (error) {
          logger.info(error.message + ", retrieving ECID from experience edge");
        } else {
          logger.info("An error occurred while obtaining the ECID from Visitor.");
        }
      });
    }
    return Promise.resolve();
  };
};
exports["default"] = _default;

},{"./getVisitor.js":82}],84:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
exports["default"] = void 0;
var _libraryVersion = require("../../constants/libraryVersion.js");
var _coreCommands = require("../../constants/coreCommands.js");
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

var prepareLibraryInfo = function prepareLibraryInfo(_ref) {
  var config = _ref.config,
    componentRegistry = _ref.componentRegistry;
  var allCommands = [].concat(_toConsumableArray(componentRegistry.getCommandNames()), [_coreCommands.CONFIGURE, _coreCommands.SET_DEBUG]).sort();
  var resultConfig = _objectSpread({}, config);
  Object.keys(config).forEach(function (key) {
    var value = config[key];
    if (typeof value !== "function") {
      return;
    }
    resultConfig[key] = value.toString();
  });
  var components = componentRegistry.getComponentNames();
  return {
    version: _libraryVersion["default"],
    configs: resultConfig,
    commands: allCommands,
    components: components
  };
};
var createLibraryInfo = function createLibraryInfo(_ref2) {
  var config = _ref2.config,
    componentRegistry = _ref2.componentRegistry;
  return {
    commands: {
      getLibraryInfo: {
        run: function run() {
          return {
            libraryInfo: prepareLibraryInfo({
              config: config,
              componentRegistry: componentRegistry
            })
          };
        }
      }
    }
  };
};
createLibraryInfo.namespace = "LibraryInfo";
var _default = exports["default"] = createLibraryInfo;

},{"../../constants/coreCommands.js":206,"../../constants/libraryVersion.js":222}],85:[function(require,module,exports){
"use strict";

exports.VIDEO_METADATA_KEYS = exports.STREAM_TYPE = exports.PLAYER_STATE = exports.MEDIA_TYPE = exports.MEDIA_OBJECT_KEYS = exports.MEDIA_EVENTS_INTERNAL = exports.EVENT = exports.AUDIO_METADATA_KEYS = exports.AD_METADATA_KEYS = void 0;
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

var MEDIA_TYPE = exports.MEDIA_TYPE = {
  Video: "video",
  Audio: "audio"
};
var STREAM_TYPE = exports.STREAM_TYPE = {
  VOD: "vod",
  Live: "live",
  Linear: "linear",
  Podcast: "podcast",
  Audiobook: "audiobook",
  AOD: "aod"
};
var PLAYER_STATE = exports.PLAYER_STATE = {
  FullScreen: "fullScreen",
  ClosedCaption: "closedCaptioning",
  Mute: "mute",
  PictureInPicture: "pictureInPicture",
  InFocus: "inFocus"
};
var EVENT = exports.EVENT = {
  /**
   * Constant defining event type for AdBreak start
   */
  AdBreakStart: "adBreakStart",
  /**
   * Constant defining event type for AdBreak complete
   */
  AdBreakComplete: "adBreakComplete",
  /**
   * Constant defining event type for Ad start
   */
  AdStart: "adStart",
  /**
   * Constant defining event type for Ad complete
   */
  AdComplete: "adComplete",
  /**
   * Constant defining event type for Ad skip
   */
  AdSkip: "adSkip",
  /**
   * Constant defining event type for Chapter start
   */
  ChapterStart: "chapterStart",
  /**
   * Constant defining event type for Chapter complete
   */
  ChapterComplete: "chapterComplete",
  /**
   * Constant defining event type for Chapter skip
   */
  ChapterSkip: "chapterSkip",
  /**
   * Constant defining event type for Seek start
   */
  SeekStart: "seekStart",
  /**
   * Constant defining event type for Seek complete
   */
  SeekComplete: "seekComplete",
  /**
   * Constant defining event type for Buffer start
   */
  BufferStart: "bufferStart",
  /**
   * Constant defining event type for Buffer complete
   */
  BufferComplete: "bufferComplete",
  /**
   * Constant defining event type for change in Bitrate
   */
  BitrateChange: "bitrateChange",
  /**
   * Constant defining event type for Custom State Start
   */
  StateStart: "stateStart",
  /**
   * Constant defining event type for Custom State End
   */
  StateEnd: "stateEnd"
};
var MEDIA_EVENTS_INTERNAL = exports.MEDIA_EVENTS_INTERNAL = {
  SessionStart: "sessionStart",
  SessionEnd: "sessionEnd",
  SessionComplete: "sessionComplete",
  Play: "play",
  Pause: "pauseStart",
  Error: "error",
  StateUpdate: "statesUpdate"
};
var MEDIA_OBJECT_KEYS = exports.MEDIA_OBJECT_KEYS = {
  MediaResumed: "media.resumed",
  GranularAdTracking: "media.granularadtracking"
};
var VIDEO_METADATA_KEYS = exports.VIDEO_METADATA_KEYS = {
  Show: "a.media.show",
  Season: "a.media.season",
  Episode: "a.media.episode",
  AssetId: "a.media.asset",
  Genre: "a.media.genre",
  FirstAirDate: "a.media.airDate",
  FirstDigitalDate: "a.media.digitalDate",
  Rating: "a.media.rating",
  Originator: "a.media.originator",
  Network: "a.media.network",
  ShowType: "a.media.type",
  AdLoad: "a.media.adLoad",
  MVPD: "a.media.pass.mvpd",
  Authorized: "a.media.pass.auth",
  DayPart: "a.media.dayPart",
  Feed: "a.media.feed",
  StreamFormat: "a.media.format"
};
var AUDIO_METADATA_KEYS = exports.AUDIO_METADATA_KEYS = {
  Artist: "a.media.artist",
  Album: "a.media.album",
  Label: "a.media.label",
  Author: "a.media.author",
  Station: "a.media.station",
  Publisher: "a.media.publisher"
};
var AD_METADATA_KEYS = exports.AD_METADATA_KEYS = {
  Advertiser: "a.media.ad.advertiser",
  CampaignId: "a.media.ad.campaign",
  CreativeId: "a.media.ad.creative",
  PlacementId: "a.media.ad.placement",
  SiteId: "a.media.ad.site",
  CreativeUrl: "a.media.ad.creativeURL"
};

},{}],86:[function(require,module,exports){
"use strict";

exports.mediaToXdmKeys = exports.adsToXdmKeys = void 0;
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

var mediaToXdmKeys = exports.mediaToXdmKeys = {
  "a.media.show": "show",
  "a.media.season": "season",
  "a.media.episode": "episode",
  "a.media.asset": "assetID",
  "a.media.genre": "genre",
  "a.media.airDate": "firstAirDate",
  "a.media.digitalDate": "firstDigitalDate",
  "a.media.rating": "rating",
  "a.media.originator": "originator",
  "a.media.network": "network",
  "a.media.type": "showType",
  "a.media.adLoad": "adLoad",
  "a.media.pass.mvpd": "mvpd",
  "a.media.pass.auth": "authorized",
  "a.media.dayPart": "dayPart",
  "a.media.feed": "feed",
  "a.media.format": "streamFormat",
  "a.media.artist": "artist",
  "a.media.album": "album",
  "a.media.label": "label",
  "a.media.author": "author",
  "a.media.station": "station",
  "a.media.publisher": "publisher",
  "media.resumed": "hasResume"
};
var adsToXdmKeys = exports.adsToXdmKeys = {
  "a.media.ad.advertiser": "advertiser",
  "a.media.ad.campaign": "campaignID",
  "a.media.ad.creative": "creativeID",
  "a.media.ad.placement": "placementID",
  "a.media.ad.site": "siteID",
  "a.media.ad.creativeURL": "creativeURL"
};

},{}],87:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _constants = require("./constants/constants.js");
var _index = require("../../utils/index.js");
var _mediaKeysToXdmConverter = require("./constants/mediaKeysToXdmConverter.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var logger = _ref.logger,
    trackMediaSession = _ref.trackMediaSession,
    trackMediaEvent = _ref.trackMediaEvent,
    uuid = _ref.uuid;
  var trackerState = null;
  var instantiateTracker = function instantiateTracker() {
    trackerState = {
      qoe: null,
      lastPlayhead: 0,
      playerId: uuid()
    };
  };
  var getEventType = function getEventType(_ref2) {
    var eventType = _ref2.eventType;
    if (eventType === _constants.EVENT.BufferComplete || eventType === _constants.EVENT.SeekComplete) {
      return _constants.MEDIA_EVENTS_INTERNAL.Play;
    }
    if (eventType === _constants.EVENT.StateStart || eventType === _constants.EVENT.StateEnd) {
      return _constants.MEDIA_EVENTS_INTERNAL.StateUpdate;
    }
    if (eventType === _constants.EVENT.SeekStart) {
      return _constants.MEDIA_EVENTS_INTERNAL.Pause;
    }
    return eventType;
  };
  var createXdmObject = function createXdmObject(_ref3) {
    var eventType = _ref3.eventType,
      _ref3$mediaDetails = _ref3.mediaDetails,
      mediaDetails = _ref3$mediaDetails === void 0 ? {} : _ref3$mediaDetails,
      _ref3$contextData = _ref3.contextData,
      contextData = _ref3$contextData === void 0 ? [] : _ref3$contextData;
    var action = getEventType({
      eventType: eventType
    });
    if (eventType === _constants.EVENT.StateStart) {
      var _xdm = {
        eventType: "media." + action,
        mediaCollection: {
          statesStart: [mediaDetails]
        }
      };
      return _xdm;
    }
    if (eventType === _constants.EVENT.StateEnd) {
      var _xdm2 = {
        eventType: "media." + action,
        mediaCollection: {
          statesEnd: [mediaDetails]
        }
      };
      return _xdm2;
    }
    var xdm = {
      eventType: "media." + action,
      mediaCollection: _objectSpread({}, mediaDetails)
    };
    var customMetadata = [];
    Object.keys(contextData).forEach(function (key) {
      if (_mediaKeysToXdmConverter.mediaToXdmKeys[key]) {
        xdm.mediaCollection.sessionDetails[_mediaKeysToXdmConverter.mediaToXdmKeys[key]] = contextData[key];
      } else if (_mediaKeysToXdmConverter.adsToXdmKeys[key]) {
        xdm.mediaCollection.advertisingDetails[_mediaKeysToXdmConverter.adsToXdmKeys[key]] = contextData[key];
      } else {
        customMetadata.push({
          name: key,
          value: contextData[key]
        });
      }
    });
    if ((0, _index.isNonEmptyArray)(customMetadata)) {
      xdm.mediaCollection.customMetadata = customMetadata;
    }
    return xdm;
  };
  return {
    trackSessionStart: function trackSessionStart(mediaObject) {
      var contextData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if ((0, _index.isNil)(mediaObject) || (0, _index.isEmptyObject)(mediaObject)) {
        logger.warn("Invalid media object");
        return {};
      }
      if (trackerState === null) {
        logger.warn("The Media Session was completed. Restarting a new session.");
        instantiateTracker();
      }
      var xdm = createXdmObject({
        eventType: _constants.MEDIA_EVENTS_INTERNAL.SessionStart,
        mediaDetails: mediaObject,
        contextData: contextData
      });
      return trackMediaSession({
        playerId: trackerState.playerId,
        getPlayerDetails: function getPlayerDetails() {
          return {
            playhead: trackerState.lastPlayhead,
            qoeDataDetails: trackerState.qoe
          };
        },
        xdm: xdm
      });
    },
    trackPlay: function trackPlay() {
      if (trackerState === null) {
        logger.warn("The Media Session was completed.");
        return {};
      }
      var xdm = createXdmObject({
        eventType: _constants.MEDIA_EVENTS_INTERNAL.Play
      });
      return trackMediaEvent({
        playerId: trackerState.playerId,
        xdm: xdm
      });
    },
    trackPause: function trackPause() {
      if (trackerState === null) {
        logger.warn("The Media Session was completed.");
        return {};
      }
      var xdm = createXdmObject({
        eventType: _constants.MEDIA_EVENTS_INTERNAL.Pause
      });
      return trackMediaEvent({
        playerId: trackerState.playerId,
        xdm: xdm
      });
    },
    trackSessionEnd: function trackSessionEnd() {
      if (trackerState === null) {
        logger.warn("The Media Session was completed.");
        return {};
      }
      var xdm = createXdmObject({
        eventType: _constants.MEDIA_EVENTS_INTERNAL.SessionEnd
      });
      return trackMediaEvent({
        playerId: trackerState.playerId,
        xdm: xdm
      });
    },
    trackComplete: function trackComplete() {
      if (trackerState === null) {
        logger.warn("The Media Session was completed.");
        return {};
      }
      var xdm = createXdmObject({
        eventType: _constants.MEDIA_EVENTS_INTERNAL.SessionComplete
      });
      return trackMediaEvent({
        playerId: trackerState.playerId,
        xdm: xdm
      });
    },
    trackError: function trackError(errorId) {
      logger.warn("trackError(" + errorId + ")");
      if (trackerState === null) {
        logger.warn("The Media Session was completed.");
        return {};
      }
      var errorDetails = {
        name: errorId,
        source: "player"
      };
      var xdm = createXdmObject({
        eventType: _constants.MEDIA_EVENTS_INTERNAL.Error,
        mediaDetails: {
          errorDetails: errorDetails
        }
      });
      return trackMediaEvent({
        playerId: trackerState.playerId,
        xdm: xdm
      });
    },
    trackEvent: function trackEvent(eventType, info, context) {
      if ((0, _index.isEmptyObject)(info)) {
        logger.warn("Invalid media object.");
        return {};
      }
      if (trackerState === null) {
        logger.warn("The Media Session was completed.");
        return {};
      }
      if (!Object.values(_constants.EVENT).includes(eventType)) {
        logger.warn("Invalid event type");
        return {};
      }
      var xdm = createXdmObject({
        eventType: eventType,
        mediaDetails: info,
        contextData: context
      });
      return trackMediaEvent({
        playerId: trackerState.playerId,
        xdm: xdm
      });
    },
    updatePlayhead: function updatePlayhead(time) {
      if (trackerState === null) {
        logger.warn("The Media Session was completed.");
        return;
      }
      if ((0, _index.isNumber)(time)) {
        trackerState.lastPlayhead = parseInt(time, 10);
      }
    },
    updateQoEObject: function updateQoEObject(qoeObject) {
      if (trackerState === null) {
        logger.warn("The Media Session was completed.");
        return;
      }
      if (!qoeObject) {
        return;
      }
      trackerState.qoe = qoeObject;
    },
    destroy: function destroy() {
      logger.warn("Destroy called, destroying the tracker.");
      trackerState = null;
    }
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300,"./constants/constants.js":85,"./constants/mediaKeysToXdmConverter.js":86}],88:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _constants = require("./constants/constants.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var trackMediaEvent = _ref.trackMediaEvent,
    trackMediaSession = _ref.trackMediaSession,
    mediaResponseHandler = _ref.mediaResponseHandler,
    logger = _ref.logger,
    createMediaHelper = _ref.createMediaHelper,
    createGetInstance = _ref.createGetInstance,
    config = _ref.config;
  return {
    lifecycle: {
      onBeforeEvent: function onBeforeEvent(_ref2) {
        var mediaOptions = _ref2.mediaOptions,
          _ref2$onResponse = _ref2.onResponse,
          onResponse = _ref2$onResponse === void 0 ? _index.noop : _ref2$onResponse;
        if (!mediaOptions) {
          return;
        }
        var legacy = mediaOptions.legacy,
          playerId = mediaOptions.playerId,
          getPlayerDetails = mediaOptions.getPlayerDetails;
        if (!legacy) {
          return;
        }
        onResponse(function (_ref3) {
          var response = _ref3.response;
          return mediaResponseHandler({
            playerId: playerId,
            getPlayerDetails: getPlayerDetails,
            response: response
          });
        });
      }
    },
    commands: {
      getMediaAnalyticsTracker: {
        run: function run() {
          if (!config.streamingMedia) {
            return Promise.reject(new Error("Streaming media is not configured."));
          }
          logger.info("Streaming media is configured in legacy mode.");
          var mediaAnalyticsHelper = createMediaHelper({
            logger: logger
          });
          return Promise.resolve(_objectSpread({
            getInstance: function getInstance() {
              return createGetInstance({
                logger: logger,
                trackMediaEvent: trackMediaEvent,
                trackMediaSession: trackMediaSession,
                uuid: _index.uuid
              });
            },
            Event: _constants.EVENT,
            MediaType: _constants.MEDIA_TYPE,
            PlayerState: _constants.PLAYER_STATE,
            StreamType: _constants.STREAM_TYPE,
            MediaObjectKey: _constants.MEDIA_OBJECT_KEYS,
            VideoMetadataKeys: _constants.VIDEO_METADATA_KEYS,
            AudioMetadataKeys: _constants.AUDIO_METADATA_KEYS,
            AdMetadataKeys: _constants.AD_METADATA_KEYS
          }, mediaAnalyticsHelper));
        }
      }
    }
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300,"./constants/constants.js":85}],89:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/validation/index.js");
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
var _default = function _default(_ref) {
  var logger = _ref.logger;
  var createMediaObject = function createMediaObject(friendlyName, name, length, contentType, streamType) {
    var mediaObject = {
      friendlyName: friendlyName,
      name: name,
      length: length,
      streamType: streamType,
      contentType: contentType
    };
    var validate = (0, _index.objectOf)({
      friendlyName: (0, _index.string)().nonEmpty(),
      name: (0, _index.string)().nonEmpty(),
      length: (0, _index.number)().required(),
      streamType: (0, _index.string)().nonEmpty(),
      contentType: (0, _index.string)().nonEmpty()
    });
    try {
      var result = validate(mediaObject);
      var sessionDetails = {
        name: result.name,
        friendlyName: result.friendlyName,
        length: result.length,
        streamType: result.streamType,
        contentType: result.contentType
      };
      return {
        sessionDetails: sessionDetails
      };
    } catch (error) {
      logger.warn("An error occurred while creating the Media Object.", error);
      return {};
    }
  };
  var createAdBreakObject = function createAdBreakObject(name, position, startTime) {
    var adBreakObject = {
      friendlyName: name,
      offset: position,
      index: startTime
    };
    var validator = (0, _index.objectOf)({
      friendlyName: (0, _index.string)().nonEmpty(),
      offset: (0, _index.number)(),
      index: (0, _index.number)()
    });
    try {
      var result = validator(adBreakObject);
      var advertisingPodDetails = {
        friendlyName: result.friendlyName,
        offset: result.offset,
        index: result.index
      };
      return {
        advertisingPodDetails: advertisingPodDetails
      };
    } catch (error) {
      logger.warn("An error occurred while creating the Ad Break Object.", error);
      return {};
    }
  };
  var createAdObject = function createAdObject(name, id, position, length) {
    var adObject = {
      friendlyName: name,
      name: id,
      podPosition: position,
      length: length
    };
    var validator = (0, _index.objectOf)({
      friendlyName: (0, _index.string)().nonEmpty(),
      name: (0, _index.string)().nonEmpty(),
      podPosition: (0, _index.number)(),
      length: (0, _index.number)()
    });
    try {
      var result = validator(adObject);
      var advertisingDetails = {
        friendlyName: result.friendlyName,
        name: result.name,
        podPosition: result.podPosition,
        length: result.length
      };
      return {
        advertisingDetails: advertisingDetails
      };
    } catch (error) {
      logger.warn("An error occurred while creating the Advertising Object.", error);
      return {};
    }
  };
  var createChapterObject = function createChapterObject(name, position, length, startTime) {
    var chapterDetailsObject = {
      friendlyName: name,
      offset: position,
      length: length,
      index: startTime
    };
    var validator = (0, _index.objectOf)({
      friendlyName: (0, _index.string)().nonEmpty(),
      offset: (0, _index.number)(),
      length: (0, _index.number)(),
      index: (0, _index.number)()
    });
    try {
      var result = validator(chapterDetailsObject);
      var chapterDetails = {
        friendlyName: result.friendlyName,
        offset: result.offset,
        index: result.index,
        length: result.length
      };
      return {
        chapterDetails: chapterDetails
      };
    } catch (error) {
      logger.warn("An error occurred while creating the Chapter Object.", error);
      return {};
    }
  };
  var createStateObject = function createStateObject(stateName) {
    var STATE_NAME_REGEX = /^[a-zA-Z0-9_]{1,64}$/;
    var validator = (0, _index.string)().matches(STATE_NAME_REGEX, "This is not a valid state name.");
    try {
      var result = validator(stateName);
      return {
        name: result
      };
    } catch (error) {
      logger.warn("An error occurred while creating the State Object.", error);
      return {};
    }
  };
  var createQoEObject = function createQoEObject(bitrate, droppedFrames, fps, startupTime) {
    var qoeObject = {
      bitrate: bitrate,
      droppedFrames: droppedFrames,
      fps: fps,
      startupTime: startupTime
    };
    var validator = (0, _index.objectOf)({
      bitrate: (0, _index.number)(),
      droppedFrames: (0, _index.number)(),
      fps: (0, _index.number)(),
      startupTime: (0, _index.number)()
    });
    try {
      var result = validator(qoeObject);
      return {
        bitrate: result.bitrate,
        droppedFrames: result.droppedFrames,
        framesPerSecond: result.fps,
        timeToStart: result.startupTime
      };
    } catch (error) {
      logger.warn("An error occurred while creating the QOE Object.", error);
      return {};
    }
  };
  return {
    createMediaObject: createMediaObject,
    createAdBreakObject: createAdBreakObject,
    createAdObject: createAdObject,
    createChapterObject: createChapterObject,
    createStateObject: createStateObject,
    createQoEObject: createQoEObject
  };
};
exports["default"] = _default;

},{"../../utils/validation/index.js":364}],90:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _createMediaEventManager = require("../StreamingMedia/createMediaEventManager.js");
var _createMediaSessionCacheManager = require("../StreamingMedia/createMediaSessionCacheManager.js");
var _createTrackMediaEvent = require("../StreamingMedia/createTrackMediaEvent.js");
var _createTrackMediaSession = require("../StreamingMedia/createTrackMediaSession.js");
var _createMediaResponseHandler = require("../StreamingMedia/createMediaResponseHandler.js");
var _createMediaAnalyticsBridgeComponent = require("./createMediaAnalyticsBridgeComponent.js");
var _createMediaHelper = require("./createMediaHelper.js");
var _createGetInstance = require("./createGetInstance.js");
var _injectTimestamp = require("../Context/injectTimestamp.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/* eslint-disable import/no-restricted-paths */

var createMediaAnalyticsBridge = function createMediaAnalyticsBridge(_ref) {
  var eventManager = _ref.eventManager,
    sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest,
    config = _ref.config,
    logger = _ref.logger,
    consent = _ref.consent;
  var mediaSessionCacheManager = (0, _createMediaSessionCacheManager["default"])({
    config: config
  });
  var mediaEventManager = (0, _createMediaEventManager["default"])({
    sendEdgeNetworkRequest: sendEdgeNetworkRequest,
    config: config,
    consent: consent,
    eventManager: eventManager,
    setTimestamp: (0, _injectTimestamp["default"])(function () {
      return new Date();
    })
  });
  var trackMediaEvent = (0, _createTrackMediaEvent["default"])({
    mediaSessionCacheManager: mediaSessionCacheManager,
    mediaEventManager: mediaEventManager,
    config: config
  });
  var trackMediaSession = (0, _createTrackMediaSession["default"])({
    config: config,
    mediaEventManager: mediaEventManager,
    mediaSessionCacheManager: mediaSessionCacheManager,
    legacy: true
  });
  var mediaResponseHandler = (0, _createMediaResponseHandler["default"])({
    mediaSessionCacheManager: mediaSessionCacheManager,
    config: config,
    trackMediaEvent: trackMediaEvent
  });
  return (0, _createMediaAnalyticsBridgeComponent["default"])({
    mediaResponseHandler: mediaResponseHandler,
    trackMediaSession: trackMediaSession,
    trackMediaEvent: trackMediaEvent,
    createMediaHelper: _createMediaHelper["default"],
    createGetInstance: _createGetInstance["default"],
    logger: logger,
    config: config
  });
};
createMediaAnalyticsBridge.namespace = "Legacy Media Analytics";
var _default = exports["default"] = createMediaAnalyticsBridge;

},{"../Context/injectTimestamp.js":53,"../StreamingMedia/createMediaEventManager.js":189,"../StreamingMedia/createMediaResponseHandler.js":191,"../StreamingMedia/createMediaSessionCacheManager.js":192,"../StreamingMedia/createTrackMediaEvent.js":194,"../StreamingMedia/createTrackMediaSession.js":195,"./createGetInstance.js":87,"./createMediaAnalyticsBridgeComponent.js":88,"./createMediaHelper.js":89}],91:[function(require,module,exports){
"use strict";

exports.REDIRECT_EXECUTION_ERROR = exports.AUTHORING_ENABLED = void 0;
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
var AUTHORING_ENABLED = exports.AUTHORING_ENABLED = "Rendering is disabled for authoring mode.";
var REDIRECT_EXECUTION_ERROR = exports.REDIRECT_EXECUTION_ERROR = "An error occurred while executing the redirect offer.";

},{}],92:[function(require,module,exports){
"use strict";

exports.VIEW_SCOPE_TYPE = exports.PROPOSITION_SCOPE_TYPE = exports.PAGE_SCOPE_TYPE = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var VIEW_SCOPE_TYPE = exports.VIEW_SCOPE_TYPE = "view";
var PAGE_SCOPE_TYPE = exports.PAGE_SCOPE_TYPE = "page";
var PROPOSITION_SCOPE_TYPE = exports.PROPOSITION_SCOPE_TYPE = "proposition";

},{}],93:[function(require,module,exports){
"use strict";

exports.WEBAPP = exports.WEB = exports.SURFACE_TYPE_DELIMITER = exports.FRAGMENT_DELIMITER = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var WEB = exports.WEB = "web";
var WEBAPP = exports.WEBAPP = "webapp";
var SURFACE_TYPE_DELIMITER = exports.SURFACE_TYPE_DELIMITER = "://";
var FRAGMENT_DELIMITER = exports.FRAGMENT_DELIMITER = "#";

},{}],94:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _schema = require("../../constants/schema.js");
var _pageWideScope = require("../../constants/pageWideScope.js");
var _initDomActionsModules = require("./dom-actions/initDomActionsModules.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var isInteractionTrackingItem = function isInteractionTrackingItem(schema, actionType) {
  return schema === _schema.JSON_CONTENT_ITEM && actionType === _initDomActionsModules.DOM_ACTION_COLLECT_INTERACTIONS;
};
var SUPPORTED_SCHEMAS = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _schema.DOM_ACTION, function () {
  return true;
}), _schema.HTML_CONTENT_ITEM, function () {
  return true;
}), _schema.JSON_CONTENT_ITEM, isInteractionTrackingItem), _schema.MESSAGE_IN_APP, function () {
  return true;
}), _schema.DEFAULT_CONTENT_ITEM, function () {
  return true;
});
var filterItemsPredicate = function filterItemsPredicate(schema, actionType) {
  return typeof SUPPORTED_SCHEMAS[schema] === "function" && SUPPORTED_SCHEMAS[schema](schema, actionType);
};
var _default = function _default(_ref) {
  var processPropositions = _ref.processPropositions,
    createProposition = _ref.createProposition,
    renderedPropositions = _ref.renderedPropositions,
    viewCache = _ref.viewCache;
  var updatePropositionItems = function updatePropositionItems(_ref2) {
    var items = _ref2.items,
      _ref2$metadataForScop = _ref2.metadataForScope,
      metadataForScope = _ref2$metadataForScop === void 0 ? {} : _ref2$metadataForScop;
    var actionType = metadataForScope.actionType,
      selector = metadataForScope.selector;
    return items.filter(function (item) {
      return filterItemsPredicate(item.schema, actionType);
    }).map(function (item) {
      var schema = item.schema;
      if (schema !== _schema.HTML_CONTENT_ITEM && !isInteractionTrackingItem(schema, actionType)) {
        return _objectSpread({}, item);
      }
      if (!(0, _index.isEmptyObject)(metadataForScope)) {
        return _objectSpread(_objectSpread({}, item), {}, {
          schema: isInteractionTrackingItem(schema, actionType) ? _schema.DOM_ACTION : schema,
          data: _objectSpread(_objectSpread({}, item.data), {}, {
            selector: selector,
            type: actionType
          })
        });
      }
      return undefined;
    }).filter(function (item) {
      return item;
    });
  };
  var filterPropositionsPredicate = function filterPropositionsPredicate(proposition) {
    return !(proposition.scope === _pageWideScope["default"] && proposition.renderAttempted);
  };
  var preparePropositions = function preparePropositions(_ref3) {
    var propositions = _ref3.propositions,
      metadata = _ref3.metadata;
    return propositions.filter(filterPropositionsPredicate).map(function (proposition) {
      if ((0, _index.isNonEmptyArray)(proposition.items)) {
        var id = proposition.id,
          scope = proposition.scope,
          scopeDetails = proposition.scopeDetails;
        return {
          id: id,
          scope: scope,
          scopeDetails: scopeDetails,
          items: updatePropositionItems({
            items: proposition.items,
            metadataForScope: metadata[proposition.scope]
          })
        };
      }
      return proposition;
    }).filter(function (proposition) {
      return (0, _index.isNonEmptyArray)(proposition.items);
    });
  };
  return function (_ref4) {
    var _ref4$propositions = _ref4.propositions,
      propositions = _ref4$propositions === void 0 ? [] : _ref4$propositions,
      _ref4$metadata = _ref4.metadata,
      metadata = _ref4$metadata === void 0 ? {} : _ref4$metadata,
      viewName = _ref4.viewName;
    // We need to immediately call concat so that subsequent sendEvent
    // calls will wait for applyPropositions to complete before executing.
    var renderedPropositionsDeferred = (0, _index.defer)();
    renderedPropositions.concat(renderedPropositionsDeferred.promise);
    var propositionsToExecute = preparePropositions({
      propositions: propositions,
      metadata: metadata
    }).map(function (proposition) {
      return createProposition(proposition);
    });
    return Promise.resolve().then(function () {
      if (viewName) {
        return viewCache.getView(viewName);
      }
      return [];
    }).then(function (additionalPropositions) {
      var _processPropositions = processPropositions([].concat(_toConsumableArray(propositionsToExecute), _toConsumableArray(additionalPropositions))),
        render = _processPropositions.render,
        returnedPropositions = _processPropositions.returnedPropositions;
      render().then(renderedPropositionsDeferred.resolve);
      return {
        propositions: returnedPropositions
      };
    });
  };
};
exports["default"] = _default;

},{"../../constants/pageWideScope.js":224,"../../constants/schema.js":228,"../../utils/index.js":300,"./dom-actions/initDomActionsModules.js":137}],95:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
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

var metasToArray = function metasToArray(metas) {
  return Object.keys(metas).map(function (key) {
    return _objectSpread({
      id: key
    }, metas[key]);
  });
};
var _default = function _default() {
  var clickStorage = {};
  var storeClickMeta = function storeClickMeta(_ref) {
    var selector = _ref.selector,
      _ref$meta = _ref.meta,
      id = _ref$meta.id,
      scope = _ref$meta.scope,
      scopeDetails = _ref$meta.scopeDetails,
      trackingLabel = _ref$meta.trackingLabel,
      scopeType = _ref$meta.scopeType;
    if (!clickStorage[selector]) {
      clickStorage[selector] = {};
    }
    clickStorage[selector][id] = {
      scope: scope,
      scopeDetails: scopeDetails,
      trackingLabel: trackingLabel,
      scopeType: scopeType
    };
  };
  var getClickSelectors = function getClickSelectors() {
    return Object.keys(clickStorage);
  };
  var getClickMetas = function getClickMetas(selector) {
    var metas = clickStorage[selector];
    if (!metas) {
      return {};
    }
    return metasToArray(clickStorage[selector]);
  };
  return {
    storeClickMeta: storeClickMeta,
    getClickSelectors: getClickSelectors,
    getClickMetas: getClickMetas
  };
};
exports["default"] = _default;

},{}],96:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _createPersonalizationDetails = require("./createPersonalizationDetails.js");
var _loggerMessage = require("./constants/loggerMessage.js");
var _propositionEventType = require("../../constants/propositionEventType.js");
var _validateApplyPropositionsOptions = require("./validateApplyPropositionsOptions.js");
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
var _default = function _default(_ref) {
  var getPageLocation = _ref.getPageLocation,
    logger = _ref.logger,
    fetchDataHandler = _ref.fetchDataHandler,
    viewChangeHandler = _ref.viewChangeHandler,
    onClickHandler = _ref.onClickHandler,
    isAuthoringModeEnabled = _ref.isAuthoringModeEnabled,
    mergeQuery = _ref.mergeQuery,
    viewCache = _ref.viewCache,
    showContainers = _ref.showContainers,
    applyPropositions = _ref.applyPropositions,
    setTargetMigration = _ref.setTargetMigration,
    mergeDecisionsMeta = _ref.mergeDecisionsMeta,
    renderedPropositions = _ref.renderedPropositions,
    onDecisionHandler = _ref.onDecisionHandler,
    handleConsentFlicker = _ref.handleConsentFlicker;
  return {
    lifecycle: {
      onComponentsRegistered: function onComponentsRegistered() {
        handleConsentFlicker();
      },
      onDecision: onDecisionHandler,
      onBeforeRequest: function onBeforeRequest(_ref2) {
        var request = _ref2.request;
        setTargetMigration(request);
        return Promise.resolve();
      },
      onBeforeEvent: function onBeforeEvent(_ref3) {
        var event = _ref3.event,
          renderDecisions = _ref3.renderDecisions,
          _ref3$decisionScopes = _ref3.decisionScopes,
          decisionScopes = _ref3$decisionScopes === void 0 ? [] : _ref3$decisionScopes,
          _ref3$personalization = _ref3.personalization,
          personalization = _ref3$personalization === void 0 ? {} : _ref3$personalization,
          _ref3$onResponse = _ref3.onResponse,
          onResponse = _ref3$onResponse === void 0 ? _index.noop : _ref3$onResponse,
          _ref3$onRequestFailur = _ref3.onRequestFailure,
          onRequestFailure = _ref3$onRequestFailur === void 0 ? _index.noop : _ref3$onRequestFailur;
        // Include propositions on all responses, overridden with data as needed
        onResponse(function () {
          return {
            propositions: []
          };
        });
        onRequestFailure(function () {
          return showContainers();
        });
        if (isAuthoringModeEnabled()) {
          logger.warn(_loggerMessage.AUTHORING_ENABLED);

          // If we are in authoring mode we disable personalization
          mergeQuery(event, {
            enabled: false
          });
          return Promise.resolve();
        }
        var personalizationDetails = (0, _createPersonalizationDetails["default"])({
          getPageLocation: getPageLocation,
          renderDecisions: renderDecisions,
          decisionScopes: decisionScopes,
          personalization: personalization,
          event: event,
          isCacheInitialized: viewCache.isInitialized(),
          logger: logger
        });
        var decisionsMetaPromises = [];
        if (personalizationDetails.shouldIncludeRenderedPropositions()) {
          decisionsMetaPromises.push(renderedPropositions.clear());
        }
        if (personalizationDetails.shouldFetchData()) {
          var cacheUpdate = viewCache.createCacheUpdate(personalizationDetails.getViewName());
          onRequestFailure(function () {
            return cacheUpdate.cancel();
          });
          fetchDataHandler({
            cacheUpdate: cacheUpdate,
            personalizationDetails: personalizationDetails,
            event: event,
            onResponse: onResponse
          });
        } else if (personalizationDetails.shouldUseCachedData()) {
          decisionsMetaPromises.push(viewChangeHandler({
            personalizationDetails: personalizationDetails,
            event: event,
            onResponse: onResponse,
            onRequestFailure: onRequestFailure
          }));
        }

        // This promise.all waits for both the pending display notifications to be resolved
        // (i.e. the top of page call to finish rendering) and the view change handler to
        // finish rendering anything for this view.
        return Promise.all(decisionsMetaPromises).then(function (decisionsMetas) {
          // We only want to call mergeDecisionsMeta once, but we can get the propositions
          // from two places: the pending display notifications and the view change handler.
          var decisionsMeta = decisionsMetas.flatMap(function (dms) {
            return dms;
          });
          if ((0, _index.isNonEmptyArray)(decisionsMeta)) {
            mergeDecisionsMeta(event, decisionsMeta, [_propositionEventType.PropositionEventType.DISPLAY]);
          }
        });
      },
      onClick: function onClick(_ref4) {
        var event = _ref4.event,
          clickedElement = _ref4.clickedElement;
        onClickHandler({
          event: event,
          clickedElement: clickedElement
        });
      }
    },
    commands: {
      applyPropositions: {
        optionsValidator: function optionsValidator(options) {
          return (0, _validateApplyPropositionsOptions["default"])({
            logger: logger,
            options: options
          });
        },
        run: applyPropositions
      }
    }
  };
};
exports["default"] = _default;

},{"../../constants/propositionEventType.js":225,"../../utils/index.js":300,"./constants/loggerMessage.js":91,"./createPersonalizationDetails.js":104,"./validateApplyPropositionsOptions.js":170}],97:[function(require,module,exports){
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _pageWideScope = require("../../constants/pageWideScope.js");
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

var DECISIONS_HANDLE = "personalization:decisions";
var _default = function _default(_ref) {
  var logger = _ref.logger,
    prehidingStyle = _ref.prehidingStyle,
    showContainers = _ref.showContainers,
    hideContainers = _ref.hideContainers,
    mergeQuery = _ref.mergeQuery,
    processPropositions = _ref.processPropositions,
    createProposition = _ref.createProposition,
    notificationHandler = _ref.notificationHandler,
    consent = _ref.consent;
  return function (_ref2) {
    var cacheUpdate = _ref2.cacheUpdate,
      personalizationDetails = _ref2.personalizationDetails,
      event = _ref2.event,
      onResponse = _ref2.onResponse;
    var _consent$current = consent.current(),
      state = _consent$current.state,
      wasSet = _consent$current.wasSet;
    if (!(state === "out" && wasSet)) {
      if (personalizationDetails.isRenderDecisions()) {
        hideContainers(prehidingStyle);
      } else {
        showContainers();
      }
    }
    mergeQuery(event, personalizationDetails.createQueryDetails());

    // This needs to be called before the response so that future sendEvent calls
    // can know to wait until this request is complete for pending display notifications.
    var handleNotifications = notificationHandler(personalizationDetails.isRenderDecisions(), personalizationDetails.isSendDisplayEvent(), personalizationDetails.getViewName());
    onResponse(function (_ref3) {
      var response = _ref3.response;
      var handles = response.getPayloadsByType(DECISIONS_HANDLE);
      if (!(0, _index.isNonEmptyArray)(handles)) {
        logger.logOnContentRendering({
          status: "no-offers",
          message: "No offers were returned.",
          logLevel: "info",
          detail: {
            query: personalizationDetails.createQueryDetails()
          }
        });
      }
      var propositions = handles.map(function (handle) {
        return createProposition(handle);
      });
      var _ref4 = (0, _index.groupBy)(propositions, function (p) {
          return p.getScopeType();
        }),
        _ref4$page = _ref4.page,
        pagePropositions = _ref4$page === void 0 ? [] : _ref4$page,
        _ref4$view = _ref4.view,
        viewPropositions = _ref4$view === void 0 ? [] : _ref4$view,
        _ref4$proposition = _ref4.proposition,
        nonRenderedPropositions = _ref4$proposition === void 0 ? [] : _ref4$proposition;
      var currentViewPropositions = cacheUpdate.update(viewPropositions);
      var render;
      var returnedPropositions;
      var returnedDecisions;
      if (personalizationDetails.isRenderDecisions()) {
        var _processPropositions = processPropositions([].concat(_toConsumableArray(pagePropositions), _toConsumableArray(currentViewPropositions)), nonRenderedPropositions);
        render = _processPropositions.render;
        returnedPropositions = _processPropositions.returnedPropositions;
        returnedDecisions = _processPropositions.returnedDecisions;
        if ((0, _index.isNonEmptyArray)(pagePropositions)) {
          logger.logOnContentRendering({
            status: "rendering-started",
            message: "Started rendering propositions for page-wide scope.",
            logLevel: "info",
            detail: {
              scope: _pageWideScope["default"],
              propositions: pagePropositions.map(function (proposition) {
                return proposition.toJSON();
              })
            }
          });
        }
        if ((0, _index.isNonEmptyArray)(currentViewPropositions)) {
          logger.logOnContentRendering({
            status: "rendering-started",
            message: "Rendering propositions started for view scope - " + personalizationDetails.getViewName() + ".",
            logLevel: "info",
            detail: {
              scope: personalizationDetails.getViewName(),
              propositions: currentViewPropositions.map(function (proposition) {
                return proposition.toJSON();
              })
            }
          });
        }
        render().then(handleNotifications);

        // Render could take a long time especially if one of the renders
        // is waiting for html to appear on the page. We show the containers
        // immediately, and whatever renders quickly will not have flicker.
        showContainers();
      } else {
        var _processPropositions2 = processPropositions([], [].concat(_toConsumableArray(pagePropositions), _toConsumableArray(currentViewPropositions), _toConsumableArray(nonRenderedPropositions)));
        returnedPropositions = _processPropositions2.returnedPropositions;
        returnedDecisions = _processPropositions2.returnedDecisions;
      }
      return {
        propositions: returnedPropositions,
        decisions: returnedDecisions
      };
    });
  };
};
exports["default"] = _default;

},{"../../constants/pageWideScope.js":224,"../../utils/index.js":300}],98:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var window = _ref.window;
  return function () {
    return window.location;
  };
};
exports["default"] = _default;

},{}],99:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _consentStatus = require("../../constants/consentStatus.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var showContainers = _ref.showContainers,
    consent = _ref.consent;
  return function () {
    var _consent$current = consent.current(),
      state = _consent$current.state,
      wasSet = _consent$current.wasSet;
    if (state === _consentStatus.OUT && wasSet) {
      showContainers();
    } else {
      consent.awaitConsent()["catch"](showContainers);
    }
  };
};
exports["default"] = _default;

},{"../../constants/consentStatus.js":202}],100:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
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
var _default = function _default() {
  var clickMetaStorage = {};
  /*
        clickMetaStorage example.
        `abc' and 'def' are proposition IDs.  1 is an interact id.  The object with an id, scope and scopeDetails
        is the notification.
           {
            1: {
              "abc": { "id": "abc", "scope": "proposition", "scopeDetails": {} },
              "def": { "id": "def", "scope": "proposition", "scopeDetails": {} }
            }
          }
  */

  var clickItemStorage = {};
  /*
        clickItemStorage example.
        `abc' and 'def' are proposition IDs.  1 is an interact id.  The sets contain proposition-item IDs which
        are used in notifications that are sent.
           {
            1: {
              abc: new Set(["itemAAA", "itemCCC"]),
              def: new Set(["itemEEE", "itemFFF"]),
            },
          }
  */

  var storeInteractionMeta = function storeInteractionMeta(propositionId, itemId, scopeType, notification, interactId) {
    interactId = parseInt(interactId, 10);
    if (!clickMetaStorage[interactId]) {
      clickMetaStorage[interactId] = {};
      clickItemStorage[interactId] = {};
    }
    if (!clickItemStorage[interactId][propositionId]) {
      clickItemStorage[interactId][propositionId] = new Set();
    }
    clickItemStorage[interactId][propositionId].add(itemId);
    clickMetaStorage[interactId][propositionId] = _objectSpread(_objectSpread({}, notification), {}, {
      scopeType: scopeType
    });
  };
  var getInteractionMetas = function getInteractionMetas(interactIds) {
    if (!Array.isArray(interactIds) || interactIds.length === 0) {
      return [];
    }
    return Object.values(interactIds.map(function (value) {
      return parseInt(value, 10);
    }).reduce(function (metaMap, interactId) {
      Object.keys(clickMetaStorage[interactId] || {}).forEach(function (propositionId) {
        if (!metaMap[propositionId]) {
          metaMap[propositionId] = {
            proposition: clickMetaStorage[interactId][propositionId],
            items: new Set()
          };
        }
        metaMap[propositionId].items = new Set([].concat(_toConsumableArray(metaMap[propositionId].items), _toConsumableArray(clickItemStorage[interactId][propositionId])));
      });
      return metaMap;
    }, {})).map(function (_ref) {
      var proposition = _ref.proposition,
        items = _ref.items;
      return _objectSpread(_objectSpread({}, proposition), {}, {
        items: Array.from(items).map(function (id) {
          return {
            id: id
          };
        })
      });
    });
  };
  return {
    storeInteractionMeta: storeInteractionMeta,
    getInteractionMetas: getInteractionMetas
  };
};
exports["default"] = _default;

},{}],101:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _eventType = require("../../constants/eventType.js");
var _isNonEmptyArray = require("../../utils/isNonEmptyArray.js");
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
var _default = function _default(collect, renderedPropositions) {
  return function (isRenderDecisions, isSendDisplayEvent, viewName) {
    if (!isRenderDecisions) {
      // If we aren't rendering anything, then we don't need to sendDisplayEvents.
      return function () {
        return undefined;
      };
    }
    if (!isSendDisplayEvent) {
      var renderedPropositionsDeferred = (0, _index.defer)();
      renderedPropositions.concat(renderedPropositionsDeferred.promise);
      return renderedPropositionsDeferred.resolve;
    }
    return function () {
      var decisionsMetaDisplay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var decisionsMetaSuppressed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      if ((0, _isNonEmptyArray["default"])(decisionsMetaDisplay)) {
        collect({
          decisionsMeta: decisionsMetaDisplay,
          viewName: viewName
        });
      }
      if ((0, _isNonEmptyArray["default"])(decisionsMetaSuppressed)) {
        collect({
          decisionsMeta: decisionsMetaSuppressed,
          eventType: _eventType.SUPPRESS,
          propositionAction: {
            reason: "Conflict"
          },
          viewName: viewName
        });
      }
    };
  };
};
exports["default"] = _default;

},{"../../constants/eventType.js":214,"../../utils/index.js":300,"../../utils/isNonEmptyArray.js":314}],102:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _eventType = require("../../constants/eventType.js");
var _propositionEventType = require("../../constants/propositionEventType.js");
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

var createPropositionAction = function createPropositionAction(clickLabel, clickToken) {
  if (!clickToken && !clickLabel) {
    return undefined;
  }
  var propositionAction = {};
  if (clickLabel) {
    propositionAction.label = clickLabel;
  }
  if (clickToken) {
    propositionAction.tokens = [clickToken];
  }
  return propositionAction;
};
var _default = function _default(_ref) {
  var mergeDecisionsMeta = _ref.mergeDecisionsMeta,
    collectInteractions = _ref.collectInteractions,
    collectClicks = _ref.collectClicks,
    getInteractionMetas = _ref.getInteractionMetas,
    getClickMetas = _ref.getClickMetas,
    getClickSelectors = _ref.getClickSelectors,
    autoCollectPropositionInteractions = _ref.autoCollectPropositionInteractions;
  // Called when an element qualifying for conversion within an offer is clicked.
  return function (_ref2) {
    var event = _ref2.event,
      clickedElement = _ref2.clickedElement;
    var decisionsMeta = [];
    var propositionActionLabel;
    var propositionActionToken;
    var viewName;
    [collectInteractions(clickedElement, getInteractionMetas, autoCollectPropositionInteractions), collectClicks(clickedElement, getClickSelectors(), getClickMetas)].forEach(function (_ref3) {
      var curDecisionsMeta = _ref3.decisionsMeta,
        curPropositionActionLabel = _ref3.propositionActionLabel,
        curPropositionActionToken = _ref3.propositionActionToken,
        curViewName = _ref3.viewName;
      Array.prototype.push.apply(decisionsMeta, curDecisionsMeta);
      if (!propositionActionLabel && curPropositionActionLabel) {
        propositionActionLabel = curPropositionActionLabel;
      }
      if (!propositionActionToken && curPropositionActionToken) {
        propositionActionToken = curPropositionActionToken;
      }
      if (!viewName && curViewName) {
        viewName = curViewName;
      }
    });
    if ((0, _index.isNonEmptyArray)(decisionsMeta)) {
      var xdm = {
        eventType: _eventType.INTERACT
      };
      if (viewName) {
        xdm.web = {
          webPageDetails: {
            viewName: viewName
          }
        };
      }
      event.mergeXdm(xdm);
      mergeDecisionsMeta(event, decisionsMeta, [_propositionEventType.PropositionEventType.INTERACT], createPropositionAction(propositionActionLabel, propositionActionToken));
    }
  };
};
exports["default"] = _default;

},{"../../constants/eventType.js":214,"../../constants/propositionEventType.js":225,"../../utils/index.js":300}],103:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _schema = require("../../constants/schema.js");
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

// When multiple In-App messages propositions are returned, we need to show only one
// of them (the one with lowest rank). This function keep track of the number of
// times it was called. It returns false for the first proposition that contains
// In-App messages items, true afterwards.
var createShouldSuppressDisplay = function createShouldSuppressDisplay() {
  var count = 0;
  return function (proposition) {
    var _proposition$items = proposition.items,
      items = _proposition$items === void 0 ? [] : _proposition$items;
    if (!items.some(function (item) {
      return item.schema === _schema.MESSAGE_IN_APP;
    })) {
      return false;
    }
    count += 1;
    return count > 1;
  };
};
var _default = function _default(_ref) {
  var processPropositions = _ref.processPropositions,
    createProposition = _ref.createProposition,
    notificationHandler = _ref.notificationHandler;
  return function (_ref2) {
    var renderDecisions = _ref2.renderDecisions,
      propositions = _ref2.propositions,
      event = _ref2.event,
      _ref2$personalization = _ref2.personalization,
      personalization = _ref2$personalization === void 0 ? {} : _ref2$personalization;
    if (!renderDecisions) {
      return Promise.resolve();
    }
    var _personalization$send = personalization.sendDisplayEvent,
      sendDisplayEvent = _personalization$send === void 0 ? true : _personalization$send;
    var viewName = event ? event.getViewName() : undefined;
    var shouldSuppressDisplay = createShouldSuppressDisplay();
    var propositionsToExecute = propositions.map(function (proposition) {
      return createProposition(proposition, true, shouldSuppressDisplay(proposition));
    });
    var _processPropositions = processPropositions(propositionsToExecute),
      render = _processPropositions.render,
      returnedPropositions = _processPropositions.returnedPropositions;
    var handleNotifications = notificationHandler(renderDecisions, sendDisplayEvent, viewName);
    var propositionsById = propositionsToExecute.reduce(function (tot, proposition) {
      tot[proposition.getId()] = proposition;
      return tot;
    }, {});
    render().then(function (decisionsMeta) {
      var decisionsMetaDisplay = decisionsMeta.filter(function (meta) {
        return !propositionsById[meta.id].shouldSuppressDisplay();
      });
      var decisionsMetaSuppressed = decisionsMeta.filter(function (meta) {
        return propositionsById[meta.id].shouldSuppressDisplay();
      });
      handleNotifications(decisionsMetaDisplay, decisionsMetaSuppressed);
    });
    return Promise.resolve({
      propositions: returnedPropositions
    });
  };
};
exports["default"] = _default;

},{"../../constants/schema.js":228}],104:[function(require,module,exports){
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _surfaceUtils = require("./utils/surfaceUtils.js");
var _pageWideScope = require("../../constants/pageWideScope.js");
var _schema = require("../../constants/schema.js");
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

var addPageWideScope = function addPageWideScope(scopes) {
  if (!scopes.includes(_pageWideScope["default"])) {
    scopes.push(_pageWideScope["default"]);
  }
};
var addPageSurface = function addPageSurface(surfaces, getPageLocation) {
  var pageSurface = (0, _surfaceUtils.buildPageSurface)(getPageLocation);
  if (!surfaces.includes(pageSurface)) {
    surfaces.push(pageSurface);
  }
};
var dedupe = function dedupe(array) {
  return array.filter(function (item, pos) {
    return array.indexOf(item) === pos;
  });
};
var _default = function _default(_ref) {
  var getPageLocation = _ref.getPageLocation,
    renderDecisions = _ref.renderDecisions,
    decisionScopes = _ref.decisionScopes,
    personalization = _ref.personalization,
    event = _ref.event,
    _isCacheInitialized = _ref.isCacheInitialized,
    logger = _ref.logger;
  var viewName = event.getViewName();
  return {
    isRenderDecisions: function isRenderDecisions() {
      return renderDecisions;
    },
    isSendDisplayEvent: function isSendDisplayEvent() {
      return !!personalization.sendDisplayEvent;
    },
    shouldIncludeRenderedPropositions: function shouldIncludeRenderedPropositions() {
      return !!personalization.includeRenderedPropositions;
    },
    getViewName: function getViewName() {
      return viewName;
    },
    hasScopes: function hasScopes() {
      return decisionScopes.length > 0 || (0, _index.isNonEmptyArray)(personalization.decisionScopes);
    },
    hasSurfaces: function hasSurfaces() {
      return (0, _index.isNonEmptyArray)(personalization.surfaces);
    },
    hasViewName: function hasViewName() {
      return (0, _index.isNonEmptyString)(viewName);
    },
    createQueryDetails: function createQueryDetails() {
      var scopes = _toConsumableArray(decisionScopes);
      if ((0, _index.isNonEmptyArray)(personalization.decisionScopes)) {
        scopes.push.apply(scopes, _toConsumableArray(personalization.decisionScopes));
      }
      var eventSurfaces = (0, _surfaceUtils.normalizeSurfaces)(personalization.surfaces, getPageLocation, logger);
      if (this.shouldRequestDefaultPersonalization()) {
        addPageWideScope(scopes);
        addPageSurface(eventSurfaces, getPageLocation);
      }
      var schemas = [_schema.DEFAULT_CONTENT_ITEM, _schema.HTML_CONTENT_ITEM, _schema.JSON_CONTENT_ITEM, _schema.REDIRECT_ITEM, _schema.RULESET_ITEM, _schema.MESSAGE_IN_APP, _schema.MESSAGE_CONTENT_CARD];
      if (scopes.includes(_pageWideScope["default"])) {
        schemas.push(_schema.DOM_ACTION);
      }
      return {
        schemas: schemas,
        decisionScopes: dedupe(scopes),
        surfaces: dedupe(eventSurfaces)
      };
    },
    isCacheInitialized: function isCacheInitialized() {
      return _isCacheInitialized;
    },
    shouldFetchData: function shouldFetchData() {
      return this.hasScopes() || this.hasSurfaces() || this.shouldRequestDefaultPersonalization();
    },
    shouldUseCachedData: function shouldUseCachedData() {
      return this.hasViewName() && !this.shouldFetchData();
    },
    shouldRequestDefaultPersonalization: function shouldRequestDefaultPersonalization() {
      return personalization.defaultPersonalizationEnabled || !this.isCacheInitialized() && personalization.defaultPersonalizationEnabled !== false;
    }
  };
};
exports["default"] = _default;

},{"../../constants/pageWideScope.js":224,"../../constants/schema.js":228,"../../utils/index.js":300,"./utils/surfaceUtils.js":169}],105:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var targetMigrationEnabled = _ref.targetMigrationEnabled;
  if (targetMigrationEnabled) {
    return function (request) {
      request.getPayload().mergeMeta({
        target: {
          migration: true
        }
      });
    };
  }
  return _index.noop;
};
exports["default"] = _default;

},{"../../utils/index.js":300}],106:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _defer = require("../../utils/defer.js");
var _schema = require("../../constants/schema.js");
var _scopeType = require("./constants/scopeType.js");
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
var _default = function _default(_ref) {
  var createProposition = _ref.createProposition;
  var cacheUpdateCreatedAtLeastOnce = false;
  var viewStoragePromise = Promise.resolve({});
  var getViewPropositions = function getViewPropositions(viewStorage, viewName) {
    var viewPropositions = viewStorage[viewName.toLowerCase()];
    if (viewPropositions && viewPropositions.length > 0) {
      return viewPropositions;
    }
    var emptyViewProposition = createProposition({
      scope: viewName,
      scopeDetails: {
        characteristics: {
          scopeType: _scopeType.VIEW_SCOPE_TYPE
        }
      },
      items: [{
        schema: _schema.DEFAULT_CONTENT_ITEM
      }]
    }, false);
    return [emptyViewProposition];
  };

  // This should be called before making the request to experience edge.
  var createCacheUpdate = function createCacheUpdate(viewName) {
    var updateCacheDeferred = (0, _defer["default"])();
    cacheUpdateCreatedAtLeastOnce = true;

    // Additional updates will merge the new view propositions with the old.
    // i.e. if there are new "cart" view propositions they will overwrite the
    // old "cart" view propositions, but if there are no new "cart" view
    // propositions the old "cart" view propositions will remain.
    viewStoragePromise = viewStoragePromise.then(function (oldViewStorage) {
      return updateCacheDeferred.promise.then(function (newViewStorage) {
        return _objectSpread(_objectSpread({}, oldViewStorage), newViewStorage);
      })["catch"](function () {
        return oldViewStorage;
      });
    });
    return {
      update: function update(viewPropositions) {
        var viewPropositionsWithScope = viewPropositions.filter(function (proposition) {
          return proposition.getScope();
        });
        var newViewStorage = (0, _index.groupBy)(viewPropositionsWithScope, function (proposition) {
          return proposition.getScope().toLowerCase();
        });
        updateCacheDeferred.resolve(newViewStorage);
        if (viewName) {
          return getViewPropositions(newViewStorage, viewName);
        }
        return [];
      },
      cancel: function cancel() {
        updateCacheDeferred.reject();
      }
    };
  };
  var getView = function getView(viewName) {
    return viewStoragePromise.then(function (viewStorage) {
      return getViewPropositions(viewStorage, viewName);
    });
  };
  var isInitialized = function isInitialized() {
    return cacheUpdateCreatedAtLeastOnce;
  };
  return {
    createCacheUpdate: createCacheUpdate,
    getView: getView,
    isInitialized: isInitialized
  };
};
exports["default"] = _default;

},{"../../constants/schema.js":228,"../../utils/defer.js":280,"../../utils/index.js":300,"./constants/scopeType.js":92}],107:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var processPropositions = _ref.processPropositions,
    viewCache = _ref.viewCache,
    logger = _ref.logger;
  return function (_ref2) {
    var personalizationDetails = _ref2.personalizationDetails,
      onResponse = _ref2.onResponse;
    var returnedPropositions;
    var returnedDecisions;
    var viewName = personalizationDetails.getViewName();
    onResponse(function () {
      return {
        propositions: returnedPropositions,
        decisions: returnedDecisions
      };
    });
    return viewCache.getView(viewName).then(function (propositions) {
      var render;
      if (personalizationDetails.isRenderDecisions()) {
        var _processPropositions = processPropositions(propositions);
        render = _processPropositions.render;
        returnedPropositions = _processPropositions.returnedPropositions;
        returnedDecisions = _processPropositions.returnedDecisions;
        logger.logOnContentRendering({
          status: "rendering-started",
          message: "Started rendering propositions for view scope - " + viewName + ".",
          logLevel: "info",
          detail: {
            scope: viewName,
            propositions: propositions.map(function (proposition) {
              return proposition.toJSON();
            })
          }
        });
        return render();
      }
      var _processPropositions2 = processPropositions([], propositions);
      returnedPropositions = _processPropositions2.returnedPropositions;
      returnedDecisions = _processPropositions2.returnedDecisions;
      return [];
    });
  };
};
exports["default"] = _default;

},{}],108:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "appendHtml", {
  enumerable: true,
  get: function get() {
    return _appendHtml["default"];
  }
});
exports.createAction = void 0;
Object.defineProperty(exports, "insertHtmlAfter", {
  enumerable: true,
  get: function get() {
    return _insertHtmlAfter["default"];
  }
});
Object.defineProperty(exports, "insertHtmlBefore", {
  enumerable: true,
  get: function get() {
    return _insertHtmlBefore["default"];
  }
});
Object.defineProperty(exports, "prependHtml", {
  enumerable: true,
  get: function get() {
    return _prependHtml["default"];
  }
});
Object.defineProperty(exports, "rearrangeChildren", {
  enumerable: true,
  get: function get() {
    return _rearrangeChildren["default"];
  }
});
Object.defineProperty(exports, "replaceHtml", {
  enumerable: true,
  get: function get() {
    return _replaceHtml["default"];
  }
});
Object.defineProperty(exports, "setAttributes", {
  enumerable: true,
  get: function get() {
    return _setAttributes["default"];
  }
});
Object.defineProperty(exports, "setHtml", {
  enumerable: true,
  get: function get() {
    return _setHtml["default"];
  }
});
Object.defineProperty(exports, "setStyles", {
  enumerable: true,
  get: function get() {
    return _setStyles["default"];
  }
});
Object.defineProperty(exports, "setText", {
  enumerable: true,
  get: function get() {
    return _setText["default"];
  }
});
Object.defineProperty(exports, "swapImage", {
  enumerable: true,
  get: function get() {
    return _swapImage["default"];
  }
});
var _index = require("../../../utils/dom/index.js");
var _index2 = require("../flicker/index.js");
var _index3 = require("./dom/index.js");
var _setText = require("./setText.js");
var _setHtml = require("./setHtml.js");
var _appendHtml = require("./appendHtml.js");
var _prependHtml = require("./prependHtml.js");
var _replaceHtml = require("./replaceHtml.js");
var _insertHtmlBefore = require("./insertHtmlBefore.js");
var _insertHtmlAfter = require("./insertHtmlAfter.js");
var _setStyles = require("./setStyles.js");
var _setAttributes = require("./setAttributes.js");
var _swapImage = require("./swapImage.js");
var _rearrangeChildren = require("./rearrangeChildren.js");
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

var renderContent = function renderContent(elements, content, decorateProposition, renderFunc) {
  var executions = elements.map(function (element) {
    return renderFunc(element, content, decorateProposition);
  });
  return Promise.all(executions);
};
var createAction = function createAction(renderFunc) {
  return function (itemData, decorateProposition) {
    var selector = itemData.selector,
      prehidingSelector = itemData.prehidingSelector,
      content = itemData.content;
    (0, _index2.hideElements)(prehidingSelector);
    return (0, _index.awaitSelector)(selector, _index3.selectNodesWithEq).then(function (elements) {
      return renderContent(elements, content, decorateProposition, renderFunc);
    }).then(function () {
      // if everything is OK, show elements
      (0, _index2.showElements)(prehidingSelector);
    }, function (error) {
      // in case of awaiting timing or error, we need to remove the style tag
      // hence showing the pre-hidden elements
      (0, _index2.showElements)(prehidingSelector);
      throw error;
    });
  };
};
exports.createAction = createAction;

},{"../../../utils/dom/index.js":284,"../flicker/index.js":153,"./appendHtml.js":110,"./dom/index.js":126,"./insertHtmlAfter.js":138,"./insertHtmlBefore.js":139,"./prependHtml.js":141,"./rearrangeChildren.js":142,"./replaceHtml.js":145,"./setAttributes.js":148,"./setHtml.js":149,"./setStyles.js":150,"./setText.js":151,"./swapImage.js":152}],109:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../utils/dom/index.js");
var _tagName = require("../../../constants/tagName.js");
var _elementAttribute = require("../../../constants/elementAttribute.js");
var _index2 = require("./dom/index.js");
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

var is = function is(element, tagName) {
  return element.tagName === tagName;
};
var isInlineStyleElement = function isInlineStyleElement(element) {
  return is(element, _tagName.STYLE) && !(0, _index2.getAttribute)(element, _elementAttribute.SRC);
};
var _default = function _default(fragment) {
  var styleNodes = (0, _index.selectNodes)(_tagName.STYLE, fragment);
  var length = styleNodes.length;
  var nonce = (0, _index2.getNonce)();
  if (!nonce) {
    return;
  }
  /* eslint-disable no-continue */
  for (var i = 0; i < length; i += 1) {
    var element = styleNodes[i];
    if (!isInlineStyleElement(element)) {
      continue;
    }
    element.nonce = nonce;
  }
};
exports["default"] = _default;

},{"../../../constants/elementAttribute.js":213,"../../../constants/tagName.js":231,"../../../utils/dom/index.js":284,"./dom/index.js":126}],110:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(container, html, decorateProposition) {
  var fragment = (0, _index2.createFragment)(html);
  (0, _addNonceToInlineStyleElements["default"])(fragment);
  var elements = (0, _index2.getChildNodes)(fragment);
  var scripts = (0, _scripts.getInlineScripts)(fragment);
  var scriptsUrls = (0, _scripts.getRemoteScriptsUrls)(fragment);
  (0, _images.loadImages)(fragment);
  elements.forEach(function (element) {
    (0, _index.appendNode)(container, element);
  });
  decorateProposition(container);
  (0, _scripts.executeInlineScripts)(container, scripts);
  return (0, _scripts.executeRemoteScripts)(scriptsUrls);
};
exports["default"] = _default;

},{"../../../utils/dom/index.js":284,"./addNonceToInlineStyleElements.js":109,"./dom/index.js":126,"./images.js":135,"./scripts.js":147}],111:[function(require,module,exports){
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
exports["default"] = void 0;
var _matchesSelectorWithEq = require("../dom/matchesSelectorWithEq.js");
var _scopeType = require("../../constants/scopeType.js");
var _metaUtils = require("../../utils/metaUtils.js");
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

var getMetasIfMatches = function getMetasIfMatches(clickedElement, selector, getClickMetas) {
  var _document = document,
    documentElement = _document.documentElement;
  var element = clickedElement;
  var i = 0;
  while (element && element !== documentElement) {
    if ((0, _matchesSelectorWithEq["default"])(selector, element)) {
      var matchedMetas = getClickMetas(selector);
      var returnValue = {
        metas: matchedMetas
      };
      var foundMetaWithLabel = matchedMetas.find(function (meta) {
        return meta.trackingLabel;
      });
      if (foundMetaWithLabel) {
        returnValue.label = foundMetaWithLabel.trackingLabel;
        returnValue.weight = i;
      }
      var foundMetaWithScopeTypeView = matchedMetas.find(function (meta) {
        return meta.scopeType === _scopeType.VIEW_SCOPE_TYPE;
      });
      if (foundMetaWithScopeTypeView) {
        returnValue.viewName = foundMetaWithScopeTypeView.scope;
        returnValue.weight = i;
      }
      return returnValue;
    }
    element = element.parentNode;
    i += 1;
  }
  return {
    metas: null
  };
};
var _default = function _default(clickedElement, selectors, getClickMetas) {
  var result = [];
  var resultLabel = "";
  var resultLabelWeight = Number.MAX_SAFE_INTEGER;
  var resultViewName;
  var resultViewNameWeight = Number.MAX_SAFE_INTEGER;

  /* eslint-disable no-continue */
  for (var i = 0; i < selectors.length; i += 1) {
    var _getMetasIfMatches = getMetasIfMatches(clickedElement, selectors[i], getClickMetas),
      metas = _getMetasIfMatches.metas,
      label = _getMetasIfMatches.label,
      weight = _getMetasIfMatches.weight,
      viewName = _getMetasIfMatches.viewName;
    if (!metas) {
      continue;
    }
    if (label && weight <= resultLabelWeight) {
      resultLabel = label;
      resultLabelWeight = weight;
    }
    if (viewName && weight <= resultViewNameWeight) {
      resultViewName = viewName;
      resultViewNameWeight = weight;
    }
    result.push.apply(result, _toConsumableArray((0, _metaUtils.cleanMetas)(metas)));
  }
  return {
    decisionsMeta: (0, _metaUtils.dedupeMetas)(result),
    propositionActionLabel: resultLabel,
    propositionActionToken: undefined,
    viewName: resultViewName
  };
};
exports["default"] = _default;

},{"../../constants/scopeType.js":92,"../../utils/metaUtils.js":168,"../dom/matchesSelectorWithEq.js":129}],112:[function(require,module,exports){
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
exports["default"] = void 0;
var _scopeType = require("../../constants/scopeType.js");
var _getAttribute = require("../dom/getAttribute.js");
var _createDecorateProposition = require("../../handlers/createDecorateProposition.js");
var _metaUtils = require("../../utils/metaUtils.js");
var _propositionInteractionType = require("../../../../constants/propositionInteractionType.js");
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

var getInteractionDetail = function getInteractionDetail(clickedElement) {
  var _document = document,
    documentElement = _document.documentElement;
  var element = clickedElement;
  var interactIds = new Set();
  var clickLabel;
  var clickToken;
  while (element && element !== documentElement) {
    var interactId = (0, _getAttribute["default"])(element, _createDecorateProposition.INTERACT_ID_DATA_ATTRIBUTE);
    if (interactId) {
      interactIds.add(interactId);
    }
    clickLabel = clickLabel || (0, _getAttribute["default"])(element, _createDecorateProposition.CLICK_LABEL_DATA_ATTRIBUTE);
    clickToken = clickToken || (0, _getAttribute["default"])(element, _createDecorateProposition.CLICK_TOKEN_DATA_ATTRIBUTE);
    element = element.parentNode;
  }
  return {
    interactIds: _toConsumableArray(interactIds),
    clickLabel: clickLabel,
    clickToken: clickToken
  };
};
var extractViewName = function extractViewName(metas) {
  var foundMetaWithScopeTypeView = metas.find(function (meta) {
    return meta.scopeType === _scopeType.VIEW_SCOPE_TYPE;
  });
  return foundMetaWithScopeTypeView ? foundMetaWithScopeTypeView.scope : undefined;
};
var createMetaFilter = function createMetaFilter(autoCollectPropositionInteractions, clickLabel, clickToken) {
  return function (meta) {
    var _meta$scopeDetails = meta.scopeDetails,
      scopeDetails = _meta$scopeDetails === void 0 ? {} : _meta$scopeDetails;
    var decisionProvider = scopeDetails.decisionProvider;
    if (autoCollectPropositionInteractions[decisionProvider] === _propositionInteractionType.ALWAYS) {
      return true;
    }
    return autoCollectPropositionInteractions[decisionProvider] === _propositionInteractionType.DECORATED_ELEMENTS_ONLY && (clickLabel || clickToken);
  };
};
var _default = function _default(clickedElement, getInteractionMetas, autoCollectPropositionInteractions) {
  var _getInteractionDetail = getInteractionDetail(clickedElement),
    interactIds = _getInteractionDetail.interactIds,
    _getInteractionDetail2 = _getInteractionDetail.clickLabel,
    clickLabel = _getInteractionDetail2 === void 0 ? "" : _getInteractionDetail2,
    clickToken = _getInteractionDetail.clickToken;
  var metasMatchingConfigurationOptions = createMetaFilter(autoCollectPropositionInteractions, clickLabel, clickToken);
  if (interactIds.length === 0) {
    return {};
  }
  var metas = getInteractionMetas(interactIds).filter(metasMatchingConfigurationOptions);
  return {
    decisionsMeta: (0, _metaUtils.cleanMetas)(metas),
    propositionActionLabel: clickLabel,
    propositionActionToken: clickToken,
    viewName: extractViewName(metas)
  };
};
exports["default"] = _default;

},{"../../../../constants/propositionInteractionType.js":226,"../../constants/scopeType.js":92,"../../handlers/createDecorateProposition.js":154,"../../utils/metaUtils.js":168,"../dom/getAttribute.js":117}],113:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(container, content, decorateProposition) {
  decorateProposition(container);
};
exports["default"] = _default;

},{}],114:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
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
var _default = function _default(preprocessors) {
  return function (action) {
    if (!action) {
      return action;
    }
    return preprocessors.reduce(function (processed, fn) {
      return _objectSpread(_objectSpread({}, processed), fn(processed));
    }, action);
  };
};
exports["default"] = _default;

},{}],115:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(window) {
  return function (url) {
    var preserveHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (preserveHistory) {
      window.location.href = url;
    } else {
      window.location.replace(url);
    }
    // Return a promise that never resolves because redirects never complete
    // within the current page.
    return new Promise(function () {});
  };
};
exports["default"] = _default;

},{}],116:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../../utils/dom/index.js");
var _tagName = require("../../../../constants/tagName.js");
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
var _default = function _default() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "undefined";
  return (0, _index.createNode)(_tagName.DIV, {}, {
    innerHTML: content
  });
};
exports["default"] = _default;

},{"../../../../constants/tagName.js":231,"../../../../utils/dom/index.js":284}],117:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(element, name) {
  return element.getAttribute(name);
};
exports["default"] = _default;

},{}],118:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../../utils/index.js");
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
var _default = function _default(element) {
  var childNodes = element.childNodes;
  if (childNodes) {
    return (0, _index.toArray)(childNodes);
  }
  return [];
};
exports["default"] = _default;

},{"../../../../utils/index.js":300}],119:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../../utils/index.js");
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
var _default = function _default(element) {
  var children = element.children;
  if (children) {
    return (0, _index.toArray)(children);
  }
  return [];
};
exports["default"] = _default;

},{"../../../../utils/index.js":300}],120:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Returns an array of matched DOM nodes.
 * @param {String} id
 * @param {Node} [context=document] defaults to document
 * @returns {HTMLElement} an element of null
 */
var _default = function _default(id) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return context.getElementById(id);
};
exports["default"] = _default;

},{}],121:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(element) {
  return element.firstElementChild;
};
exports["default"] = _default;

},{}],122:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(element) {
  return element.nextElementSibling;
};
exports["default"] = _default;

},{}],123:[function(require,module,exports){
"use strict";

exports.testResetCachedNonce = exports["default"] = void 0;
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

var nonce;

/**
 * Returns the nonce if available.
 * @param {Node} [context=document] defaults to document
 * @returns {(String|undefined)} the nonce or undefined if not available
 */
var _default = function _default() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  if (nonce === undefined) {
    var n = context.querySelector("[nonce]");
    // NOTE: We're keeping n.getAttribute("nonce") until it is safe to remove:
    //   ref: https://github.com/whatwg/html/issues/2369#issuecomment-280853946
    nonce = n && (n.nonce || n.getAttribute("nonce"));
  }
  return nonce;
}; // This function is only used for testing and removed when library is built (tree-shaking)
exports["default"] = _default;
var testResetCachedNonce = function testResetCachedNonce() {
  nonce = undefined;
};
exports.testResetCachedNonce = testResetCachedNonce;

},{}],124:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(element) {
  return element.parentNode;
};
exports["default"] = _default;

},{}],125:[function(require,module,exports){
"use strict";

exports.splitWithEq = exports.isNotEqSelector = void 0;
var _index = require("../../../../utils/index.js");
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

var EQ_START = ":eq(";
var EQ_PATTERN = /:eq\((\d+)\)/g;
var isNotEqSelector = function isNotEqSelector(str) {
  return str.indexOf(EQ_START) === -1;
};
exports.isNotEqSelector = isNotEqSelector;
var splitWithEq = function splitWithEq(selector) {
  return selector.split(EQ_PATTERN).filter(_index.isNonEmptyString);
};
exports.splitWithEq = splitWithEq;

},{"../../../../utils/index.js":300}],126:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "createFragment", {
  enumerable: true,
  get: function get() {
    return _createFragment["default"];
  }
});
Object.defineProperty(exports, "getAttribute", {
  enumerable: true,
  get: function get() {
    return _getAttribute["default"];
  }
});
Object.defineProperty(exports, "getChildNodes", {
  enumerable: true,
  get: function get() {
    return _getChildNodes["default"];
  }
});
Object.defineProperty(exports, "getChildren", {
  enumerable: true,
  get: function get() {
    return _getChildren["default"];
  }
});
Object.defineProperty(exports, "getElementById", {
  enumerable: true,
  get: function get() {
    return _getElementById["default"];
  }
});
Object.defineProperty(exports, "getFirstChild", {
  enumerable: true,
  get: function get() {
    return _getFirstChild["default"];
  }
});
Object.defineProperty(exports, "getNextSibling", {
  enumerable: true,
  get: function get() {
    return _getNextSibling["default"];
  }
});
Object.defineProperty(exports, "getNonce", {
  enumerable: true,
  get: function get() {
    return _getNonce["default"];
  }
});
Object.defineProperty(exports, "insertAfter", {
  enumerable: true,
  get: function get() {
    return _insertAfter["default"];
  }
});
Object.defineProperty(exports, "insertBefore", {
  enumerable: true,
  get: function get() {
    return _insertBefore["default"];
  }
});
Object.defineProperty(exports, "removeAttribute", {
  enumerable: true,
  get: function get() {
    return _removeAttribute["default"];
  }
});
Object.defineProperty(exports, "selectNodesWithEq", {
  enumerable: true,
  get: function get() {
    return _selectNodesWithEq.selectNodesWithEq;
  }
});
Object.defineProperty(exports, "setAttribute", {
  enumerable: true,
  get: function get() {
    return _setAttribute["default"];
  }
});
Object.defineProperty(exports, "setStyle", {
  enumerable: true,
  get: function get() {
    return _setStyle["default"];
  }
});
var _createFragment = require("./createFragment.js");
var _selectNodesWithEq = require("./selectNodesWithEq.js");
var _getElementById = require("./getElementById.js");
var _setAttribute = require("./setAttribute.js");
var _getAttribute = require("./getAttribute.js");
var _removeAttribute = require("./removeAttribute.js");
var _setStyle = require("./setStyle.js");
var _insertAfter = require("./insertAfter.js");
var _insertBefore = require("./insertBefore.js");
var _getNextSibling = require("./getNextSibling.js");
var _getChildren = require("./getChildren.js");
var _getChildNodes = require("./getChildNodes.js");
var _getFirstChild = require("./getFirstChild.js");
var _getNonce = require("./getNonce.js");

},{"./createFragment.js":116,"./getAttribute.js":117,"./getChildNodes.js":118,"./getChildren.js":119,"./getElementById.js":120,"./getFirstChild.js":121,"./getNextSibling.js":122,"./getNonce.js":123,"./insertAfter.js":127,"./insertBefore.js":128,"./removeAttribute.js":130,"./selectNodesWithEq.js":131,"./setAttribute.js":132,"./setStyle.js":133}],127:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _getParent = require("./getParent.js");
var _getNextSibling = require("./getNextSibling.js");
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
var _default = function _default(container, element) {
  if (!container) {
    return;
  }
  var parent = (0, _getParent["default"])(container);
  if (parent) {
    parent.insertBefore(element, (0, _getNextSibling["default"])(container));
  }
};
exports["default"] = _default;

},{"./getNextSibling.js":122,"./getParent.js":124}],128:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _getParent = require("./getParent.js");
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
var _default = function _default(container, element) {
  if (!container) {
    return;
  }
  var parent = (0, _getParent["default"])(container);
  if (parent) {
    parent.insertBefore(element, container);
  }
};
exports["default"] = _default;

},{"./getParent.js":124}],129:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../../utils/dom/index.js");
var _helperForEq = require("./helperForEq.js");
var _selectNodesWithEq = require("./selectNodesWithEq.js");
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
var _default = function _default(selector, element) {
  if ((0, _helperForEq.isNotEqSelector)(selector)) {
    return (0, _index.matchesSelector)(selector, element);
  }

  // Using node selection vs matches selector, because of :eq()
  // Find all nodes using document as context
  var nodes = (0, _selectNodesWithEq.selectNodesWithEq)(selector);
  var result = false;

  // Iterate through all the identified elements
  // and reference compare with element
  for (var i = 0; i < nodes.length; i += 1) {
    if (nodes[i] === element) {
      result = true;
      break;
    }
  }
  return result;
};
exports["default"] = _default;

},{"../../../../utils/dom/index.js":284,"./helperForEq.js":125,"./selectNodesWithEq.js":131}],130:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(element, name) {
  element.removeAttribute(name);
};
exports["default"] = _default;

},{}],131:[function(require,module,exports){
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
exports.selectNodesWithEq = exports.parseSelector = exports.escapeIdentifiersInSelector = void 0;
var _index = require("../../../../utils/dom/index.js");
var _helperForEq = require("./helperForEq.js");
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

// Trying to match ID or CSS class
var CSS_IDENTIFIER_PATTERN = /(#|\.)(-?\w+)/g;
// Here we use CSS.escape() to make sure we get
// correct values for ID and CSS class
// Please check:  https://www.w3.org/TR/css-syntax-3/#escaping
var replaceIdentifier = function replaceIdentifier(_, $1, $2) {
  return "" + $1 + CSS.escape($2);
};
var escapeIdentifiersInSelector = function escapeIdentifiersInSelector(selector) {
  return selector.replace(CSS_IDENTIFIER_PATTERN, replaceIdentifier);
};
exports.escapeIdentifiersInSelector = escapeIdentifiersInSelector;
var parseSelector = function parseSelector(rawSelector) {
  var result = [];
  var selector = escapeIdentifiersInSelector(rawSelector.trim());
  var parts = (0, _helperForEq.splitWithEq)(selector);
  var length = parts.length;
  var i = 0;
  while (i < length) {
    var sel = parts[i];
    var eq = parts[i + 1];
    if (eq) {
      result.push({
        sel: sel,
        eq: Number(eq)
      });
    } else {
      result.push({
        sel: sel
      });
    }
    i += 2;
  }
  return result;
};

/**
 * Returns an array of matched DOM nodes.
 * @param {String} selector that contains Sizzle "eq(...)" pseudo selector
 * @returns {Array} an array of DOM nodes
 */
exports.parseSelector = parseSelector;
var selectNodesWithEq = function selectNodesWithEq(selector) {
  var doc = document;
  if ((0, _helperForEq.isNotEqSelector)(selector)) {
    return (0, _index.selectNodes)(selector, doc);
  }
  var parts = parseSelector(selector);
  var length = parts.length;
  var result = [];
  var context = doc;
  var i = 0;
  while (i < length) {
    var _parts$i = parts[i],
      sel = _parts$i.sel,
      eq = _parts$i.eq;
    var nodes = (0, _index.selectNodes)(sel, context);
    var nodesCount = nodes.length;
    if (nodesCount === 0) {
      break;
    }
    if (eq != null && eq > nodesCount - 1) {
      break;
    }
    if (i < length - 1) {
      if (eq == null) {
        var _nodes = _slicedToArray(nodes, 1);
        context = _nodes[0];
      } else {
        context = nodes[eq];
      }
    }
    if (i === length - 1) {
      if (eq == null) {
        result = nodes;
      } else {
        result = [nodes[eq]];
      }
    }
    i += 1;
  }
  return result;
};
exports.selectNodesWithEq = selectNodesWithEq;

},{"../../../../utils/dom/index.js":284,"./helperForEq.js":125}],132:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(element, name, value) {
  element.setAttribute(name, value);
};
exports["default"] = _default;

},{}],133:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(element, name, value, priority) {
  var css;
  if (priority) {
    css = name + ":" + value + " !" + priority + ";";
  } else {
    css = name + ":" + value + ";";
  }
  element.style.cssText += ";" + css;
};
exports["default"] = _default;

},{}],134:[function(require,module,exports){
"use strict";

exports.addPxIfMissing = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var addPxIfMissing = function addPxIfMissing(value) {
  var hasPx = ("" + value).endsWith("px");
  return hasPx ? value : value + "px";
};
exports.addPxIfMissing = addPxIfMissing;

},{}],135:[function(require,module,exports){
"use strict";

exports.loadImages = exports.loadImage = exports.isImage = void 0;
var _index = require("../../../utils/dom/index.js");
var _tagName = require("../../../constants/tagName.js");
var _elementAttribute = require("../../../constants/elementAttribute.js");
var _index2 = require("./dom/index.js");
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

var isImage = function isImage(element) {
  return element.tagName === _tagName.IMG;
};
exports.isImage = isImage;
var loadImage = function loadImage(url) {
  return (0, _index.createNode)(_tagName.IMG, {
    src: url
  });
};
exports.loadImage = loadImage;
var loadImages = function loadImages(fragment) {
  var images = (0, _index.selectNodes)(_tagName.IMG, fragment);
  images.forEach(function (image) {
    var url = (0, _index2.getAttribute)(image, _elementAttribute.SRC);
    if (url) {
      loadImage(url);
    }
  });
};
exports.loadImages = loadImages;

},{"../../../constants/elementAttribute.js":213,"../../../constants/tagName.js":231,"../../../utils/dom/index.js":284,"./dom/index.js":126}],136:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "initDomActionsModules", {
  enumerable: true,
  get: function get() {
    return _initDomActionsModules["default"];
  }
});
var _initDomActionsModules = require("./initDomActionsModules.js");

},{"./initDomActionsModules.js":137}],137:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = exports.DOM_ACTION_SET_TEXT = exports.DOM_ACTION_SET_STYLE = exports.DOM_ACTION_SET_IMAGE_SOURCE = exports.DOM_ACTION_SET_HTML = exports.DOM_ACTION_SET_ATTRIBUTE = exports.DOM_ACTION_RESIZE = exports.DOM_ACTION_REPLACE_HTML = exports.DOM_ACTION_REMOVE = exports.DOM_ACTION_REARRANGE = exports.DOM_ACTION_PREPEND_HTML = exports.DOM_ACTION_MOVE = exports.DOM_ACTION_INSERT_BEFORE = exports.DOM_ACTION_INSERT_AFTER = exports.DOM_ACTION_CUSTOM_CODE = exports.DOM_ACTION_COLLECT_INTERACTIONS = exports.DOM_ACTION_CLICK = exports.DOM_ACTION_APPEND_HTML = void 0;
var _index = require("../../../utils/dom/index.js");
var _setHtml = require("./setHtml.js");
var _prependHtml = require("./prependHtml.js");
var _action = require("./action.js");
var _setText = require("./setText.js");
var _setAttributes = require("./setAttributes.js");
var _swapImage = require("./swapImage.js");
var _setStyles = require("./setStyles.js");
var _move = require("./move.js");
var _rearrangeChildren = require("./rearrangeChildren.js");
var _insertHtmlAfter = require("./insertHtmlAfter.js");
var _insertHtmlBefore = require("./insertHtmlBefore.js");
var _replaceHtml = require("./replaceHtml.js");
var _appendHtml = require("./appendHtml.js");
var _collectInteractions = require("./collectInteractions.js");
var _resize = require("./resize.js");
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

var DOM_ACTION_SET_HTML = exports.DOM_ACTION_SET_HTML = "setHtml";
var DOM_ACTION_CUSTOM_CODE = exports.DOM_ACTION_CUSTOM_CODE = "customCode";
var DOM_ACTION_SET_TEXT = exports.DOM_ACTION_SET_TEXT = "setText";
var DOM_ACTION_SET_ATTRIBUTE = exports.DOM_ACTION_SET_ATTRIBUTE = "setAttribute";
var DOM_ACTION_SET_IMAGE_SOURCE = exports.DOM_ACTION_SET_IMAGE_SOURCE = "setImageSource";
var DOM_ACTION_SET_STYLE = exports.DOM_ACTION_SET_STYLE = "setStyle";
var DOM_ACTION_MOVE = exports.DOM_ACTION_MOVE = "move";
var DOM_ACTION_RESIZE = exports.DOM_ACTION_RESIZE = "resize";
var DOM_ACTION_REARRANGE = exports.DOM_ACTION_REARRANGE = "rearrange";
var DOM_ACTION_REMOVE = exports.DOM_ACTION_REMOVE = "remove";
var DOM_ACTION_INSERT_AFTER = exports.DOM_ACTION_INSERT_AFTER = "insertAfter";
var DOM_ACTION_INSERT_BEFORE = exports.DOM_ACTION_INSERT_BEFORE = "insertBefore";
var DOM_ACTION_REPLACE_HTML = exports.DOM_ACTION_REPLACE_HTML = "replaceHtml";
var DOM_ACTION_PREPEND_HTML = exports.DOM_ACTION_PREPEND_HTML = "prependHtml";
var DOM_ACTION_APPEND_HTML = exports.DOM_ACTION_APPEND_HTML = "appendHtml";
var DOM_ACTION_CLICK = exports.DOM_ACTION_CLICK = "click";
var DOM_ACTION_COLLECT_INTERACTIONS = exports.DOM_ACTION_COLLECT_INTERACTIONS = "collectInteractions";
var _default = function _default() {
  var _ref;
  return _ref = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, DOM_ACTION_SET_HTML, (0, _action.createAction)(_setHtml["default"])), DOM_ACTION_CUSTOM_CODE, (0, _action.createAction)(_prependHtml["default"])), DOM_ACTION_SET_TEXT, (0, _action.createAction)(_setText["default"])), DOM_ACTION_SET_ATTRIBUTE, (0, _action.createAction)(_setAttributes["default"])), DOM_ACTION_SET_IMAGE_SOURCE, (0, _action.createAction)(_swapImage["default"])), DOM_ACTION_SET_STYLE, (0, _action.createAction)(_setStyles["default"])), DOM_ACTION_MOVE, (0, _action.createAction)(_move["default"])), DOM_ACTION_RESIZE, (0, _action.createAction)(_resize["default"])), DOM_ACTION_REARRANGE, (0, _action.createAction)(_rearrangeChildren["default"])), DOM_ACTION_REMOVE, (0, _action.createAction)(_index.removeNode)), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref, DOM_ACTION_INSERT_AFTER, (0, _action.createAction)(_insertHtmlAfter["default"])), DOM_ACTION_INSERT_BEFORE, (0, _action.createAction)(_insertHtmlBefore["default"])), DOM_ACTION_REPLACE_HTML, (0, _action.createAction)(_replaceHtml["default"])), DOM_ACTION_PREPEND_HTML, (0, _action.createAction)(_prependHtml["default"])), DOM_ACTION_APPEND_HTML, (0, _action.createAction)(_appendHtml["default"])), DOM_ACTION_COLLECT_INTERACTIONS, (0, _action.createAction)(_collectInteractions["default"]));
};
exports["default"] = _default;

},{"../../../utils/dom/index.js":284,"./action.js":108,"./appendHtml.js":110,"./collectInteractions.js":113,"./insertHtmlAfter.js":138,"./insertHtmlBefore.js":139,"./move.js":140,"./prependHtml.js":141,"./rearrangeChildren.js":142,"./replaceHtml.js":145,"./resize.js":146,"./setAttributes.js":148,"./setHtml.js":149,"./setStyles.js":150,"./setText.js":151,"./swapImage.js":152}],138:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("./dom/index.js");
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
var _default = function _default(container, html, decorateProposition) {
  var fragment = (0, _index.createFragment)(html);
  (0, _addNonceToInlineStyleElements["default"])(fragment);
  var elements = (0, _index.getChildNodes)(fragment);
  var scripts = (0, _scripts.getInlineScripts)(fragment);
  var scriptsUrls = (0, _scripts.getRemoteScriptsUrls)(fragment);
  (0, _images.loadImages)(fragment);
  var insertionPoint = container;
  elements.forEach(function (element) {
    decorateProposition(element);
    (0, _index.insertAfter)(insertionPoint, element);
    insertionPoint = element;
  });
  (0, _scripts.executeInlineScripts)(container, scripts);
  return (0, _scripts.executeRemoteScripts)(scriptsUrls);
};
exports["default"] = _default;

},{"./addNonceToInlineStyleElements.js":109,"./dom/index.js":126,"./images.js":135,"./scripts.js":147}],139:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("./dom/index.js");
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
var _default = function _default(container, html, decorateProposition) {
  var fragment = (0, _index.createFragment)(html);
  (0, _addNonceToInlineStyleElements["default"])(fragment);
  var elements = (0, _index.getChildNodes)(fragment);
  var scripts = (0, _scripts.getInlineScripts)(fragment);
  var scriptsUrls = (0, _scripts.getRemoteScriptsUrls)(fragment);
  (0, _images.loadImages)(fragment);
  elements.forEach(function (element) {
    decorateProposition(element);
    (0, _index.insertBefore)(container, element);
  });
  (0, _scripts.executeInlineScripts)(container, scripts);
  return (0, _scripts.executeRemoteScripts)(scriptsUrls);
};
exports["default"] = _default;

},{"./addNonceToInlineStyleElements.js":109,"./dom/index.js":126,"./images.js":135,"./scripts.js":147}],140:[function(require,module,exports){
"use strict";

var _excluded = ["priority"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
exports["default"] = void 0;
var _index = require("./dom/index.js");
var _util = require("./dom/util.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(container, styles, decorateProposition) {
  var priority = styles.priority,
    style = _objectWithoutProperties(styles, _excluded);
  Object.keys(style).forEach(function (key) {
    var value = style[key];
    if (key === "left" || key === "top") {
      value = (0, _util.addPxIfMissing)(value);
    }
    (0, _index.setStyle)(container, key, value, priority);
  });
  decorateProposition(container);
};
exports["default"] = _default;

},{"./dom/index.js":126,"./dom/util.js":134}],141:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(container, html, decorateProposition) {
  var fragment = (0, _index2.createFragment)(html);
  (0, _addNonceToInlineStyleElements["default"])(fragment);
  var elements = (0, _index2.getChildNodes)(fragment);
  var scripts = (0, _scripts.getInlineScripts)(fragment);
  var scriptsUrls = (0, _scripts.getRemoteScriptsUrls)(fragment);
  var length = elements.length;
  var i = length - 1;

  // We have to proactively load images to avoid flicker
  (0, _images.loadImages)(fragment);

  // We are inserting elements in reverse order
  while (i >= 0) {
    var element = elements[i];
    decorateProposition(element);
    var firstChild = (0, _index2.getFirstChild)(container);
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
exports["default"] = _default;

},{"../../../utils/dom/index.js":284,"./addNonceToInlineStyleElements.js":109,"./dom/index.js":126,"./images.js":135,"./scripts.js":147}],142:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("./dom/index.js");
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
var _default = function _default(container, _ref, decorateProposition) {
  var from = _ref.from,
    to = _ref.to;
  var children = (0, _index.getChildren)(container);
  var elementFrom = children[from];
  var elementTo = children[to];
  if (!elementFrom || !elementTo) {
    // TODO: We will need to add logging
    // to ease troubleshooting
    return;
  }
  if (from < to) {
    (0, _index.insertAfter)(elementTo, elementFrom);
  } else {
    (0, _index.insertBefore)(elementTo, elementFrom);
  }
  decorateProposition(elementTo);
  decorateProposition(elementFrom);
};
exports["default"] = _default;

},{"./dom/index.js":126}],143:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _initDomActionsModules = require("./initDomActionsModules.js");
/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/*
 * Preprocess customCode actions before rendering, so that offer selectors are remapped appropriately for
 * target offers, to align with the way it works in at.js.
 */

var TARGET_BODY_SELECTOR = "BODY > *:eq(0)";
var _default = function _default(action) {
  var selector = action.selector,
    type = action.type;
  if (type !== _initDomActionsModules.DOM_ACTION_CUSTOM_CODE) {
    return action;
  }
  if (selector !== TARGET_BODY_SELECTOR) {
    return action;
  }
  return _objectSpread(_objectSpread({}, action), {
    selector: "BODY"
  });
};
exports["default"] = _default;

},{"./initDomActionsModules.js":137}],144:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _index = require("../../../utils/dom/index.js");
var _scripts = require("./scripts.js");
var _index2 = require("./dom/index.js");
var _isBlankString = require("../../../utils/isBlankString.js");
var _tagName = require("../../../constants/tagName.js");
var _initDomActionsModules = require("./initDomActionsModules.js");
/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/*
 * Preprocess actions before rendering, so that offers are remapped to appendHtml when these are
 * to be applied to page HEAD, to align with the way it works in at.js.
 * Offer content should also be filtered, so that only tags allowed in HEAD are preserved.
 */

var HEAD_TAGS_SELECTOR = "SCRIPT,LINK,STYLE";
var filterHeadContent = function filterHeadContent(content) {
  var container = (0, _index2.createFragment)(content);
  var headNodes = (0, _index.selectNodes)(HEAD_TAGS_SELECTOR, container);
  return headNodes.map(function (node) {
    return node.outerHTML;
  }).join("");
};
var _default = function _default(action) {
  var result = _objectSpread({}, action);
  var content = result.content,
    selector = result.selector;
  if ((0, _isBlankString["default"])(content)) {
    return result;
  }
  if (selector == null) {
    return result;
  }
  var container = (0, _index2.selectNodesWithEq)(selector);
  if (!(0, _scripts.is)(container[0], _tagName.HEAD)) {
    return result;
  }
  result.type = _initDomActionsModules.DOM_ACTION_APPEND_HTML;
  result.content = filterHeadContent(content);
  return result;
};
exports["default"] = _default;

},{"../../../constants/tagName.js":231,"../../../utils/dom/index.js":284,"../../../utils/isBlankString.js":307,"./dom/index.js":126,"./initDomActionsModules.js":137,"./scripts.js":147}],145:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../utils/dom/index.js");
var _insertHtmlBefore = require("./insertHtmlBefore.js");
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
var _default = function _default(container, html, decorateProposition) {
  return (0, _insertHtmlBefore["default"])(container, html, decorateProposition).then(function () {
    (0, _index.removeNode)(container);
  });
};
exports["default"] = _default;

},{"../../../utils/dom/index.js":284,"./insertHtmlBefore.js":139}],146:[function(require,module,exports){
"use strict";

var _excluded = ["priority"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
exports["default"] = void 0;
var _index = require("./dom/index.js");
var _util = require("./dom/util.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(container, styles, decorateProposition) {
  var priority = styles.priority,
    style = _objectWithoutProperties(styles, _excluded);
  Object.keys(style).forEach(function (key) {
    var value = style[key];
    if (key === "width" || key === "height") {
      value = (0, _util.addPxIfMissing)(value);
    }
    (0, _index.setStyle)(container, key, value, priority);
  });
  decorateProposition(container);
};
exports["default"] = _default;

},{"./dom/index.js":126,"./dom/util.js":134}],147:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports.is = exports.getRemoteScriptsUrls = exports.getInlineScripts = exports.executeRemoteScripts = exports.executeInlineScripts = void 0;
var _index = require("../../../utils/dom/index.js");
var _tagName = require("../../../constants/tagName.js");
var _elementAttribute = require("../../../constants/elementAttribute.js");
var _index2 = require("./dom/index.js");
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

var getPromise = function getPromise(url, script) {
  return new Promise(function (resolve, reject) {
    script.onload = function () {
      resolve(script);
    };
    script.onerror = function () {
      reject(new Error("Failed to load script: " + url));
    };
  });
};
var loadScript = function loadScript(url) {
  var script = document.createElement("script");
  script.src = url;
  script.async = true;
  var promise = getPromise(url, script);
  document.head.appendChild(script);
  return promise;
};
var is = function is(element, tagName) {
  return !!element && element.tagName === tagName;
};
exports.is = is;
var isInlineScript = function isInlineScript(element) {
  return is(element, _tagName.SCRIPT) && !(0, _index2.getAttribute)(element, _elementAttribute.SRC);
};
var isRemoteScript = function isRemoteScript(element) {
  return is(element, _tagName.SCRIPT) && (0, _index2.getAttribute)(element, _elementAttribute.SRC);
};
var getInlineScripts = function getInlineScripts(fragment) {
  var scripts = (0, _index.selectNodes)(_tagName.SCRIPT, fragment);
  var result = [];
  var length = scripts.length;
  var nonce = (0, _index2.getNonce)();
  var attributes = _objectSpread({}, nonce && {
    nonce: nonce
  });

  /* eslint-disable no-continue */
  for (var i = 0; i < length; i += 1) {
    var element = scripts[i];
    if (!isInlineScript(element)) {
      continue;
    }
    var textContent = element.textContent;
    if (!textContent) {
      continue;
    }
    result.push((0, _index.createNode)(_tagName.SCRIPT, attributes, {
      textContent: textContent
    }));
  }
  /* eslint-enable no-continue */

  return result;
};
exports.getInlineScripts = getInlineScripts;
var getRemoteScriptsUrls = function getRemoteScriptsUrls(fragment) {
  var scripts = (0, _index.selectNodes)(_tagName.SCRIPT, fragment);
  var result = [];
  var length = scripts.length;

  /* eslint-disable no-continue */
  for (var i = 0; i < length; i += 1) {
    var element = scripts[i];
    if (!isRemoteScript(element)) {
      continue;
    }
    var url = (0, _index2.getAttribute)(element, _elementAttribute.SRC);
    if (!url) {
      continue;
    }
    result.push(url);
  }
  /* eslint-enable no-continue */

  return result;
};
exports.getRemoteScriptsUrls = getRemoteScriptsUrls;
var executeInlineScripts = function executeInlineScripts(parent, scripts) {
  scripts.forEach(function (script) {
    parent.appendChild(script);
    parent.removeChild(script);
  });
};
exports.executeInlineScripts = executeInlineScripts;
var executeRemoteScripts = function executeRemoteScripts(urls) {
  return Promise.all(urls.map(loadScript));
};
exports.executeRemoteScripts = executeRemoteScripts;

},{"../../../constants/elementAttribute.js":213,"../../../constants/tagName.js":231,"../../../utils/dom/index.js":284,"./dom/index.js":126}],148:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("./dom/index.js");
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
var _default = function _default(container, attributes, decorateProposition) {
  Object.keys(attributes).forEach(function (key) {
    (0, _index.setAttribute)(container, key, attributes[key]);
  });
  decorateProposition(container);
};
exports["default"] = _default;

},{"./dom/index.js":126}],149:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../../utils/dom/index.js");
var _index2 = require("./dom/index.js");
var _appendHtml = require("./appendHtml.js");
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

var clear = function clear(container) {
  // We want to remove ALL nodes, text, comments etc
  var childNodes = (0, _index2.getChildNodes)(container);
  childNodes.forEach(_index.removeNode);
};
var _default = function _default(container, html, decorateProposition) {
  clear(container);
  return (0, _appendHtml["default"])(container, html, decorateProposition);
};
exports["default"] = _default;

},{"../../../utils/dom/index.js":284,"./appendHtml.js":110,"./dom/index.js":126}],150:[function(require,module,exports){
"use strict";

var _excluded = ["priority"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
exports["default"] = void 0;
var _index = require("./dom/index.js");
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
var _default = function _default(container, styles, decorateProposition) {
  var priority = styles.priority,
    style = _objectWithoutProperties(styles, _excluded);
  Object.keys(style).forEach(function (key) {
    (0, _index.setStyle)(container, key, style[key], priority);
  });
  decorateProposition(container);
};
exports["default"] = _default;

},{"./dom/index.js":126}],151:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(container, text, decorateProposition) {
  decorateProposition(container);
  container.textContent = text;
};
exports["default"] = _default;

},{}],152:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _elementAttribute = require("../../../constants/elementAttribute.js");
var _index = require("./dom/index.js");
var _images = require("./images.js");
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
var _default = function _default(container, url, decorateProposition) {
  if (!(0, _images.isImage)(container)) {
    return;
  }

  // Start downloading the image
  (0, _images.loadImage)(url);
  decorateProposition(container);

  // Remove "src" so there is no flicker
  (0, _index.removeAttribute)(container, _elementAttribute.SRC);

  // Replace the image "src"
  (0, _index.setAttribute)(container, _elementAttribute.SRC, url);
};
exports["default"] = _default;

},{"../../../constants/elementAttribute.js":213,"./dom/index.js":126,"./images.js":135}],153:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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

var PREHIDING_ID = "alloy-prehiding";
var HIDING_STYLE_DEFINITION = "{ visibility: hidden }";

// Using global is OK since we have a single DOM
// so storing nodes even for multiple Alloy instances is fine
var styleNodes = {};
var hideElements = function hideElements(prehidingSelector) {
  // if we have different events with the same
  // prehiding selector we don't want to recreate
  // the style tag
  if (styleNodes[prehidingSelector]) {
    return;
  }
  var nonce = (0, _index2.getNonce)();
  var attrs = _objectSpread({}, nonce && {
    nonce: nonce
  });
  var props = {
    textContent: prehidingSelector + " " + HIDING_STYLE_DEFINITION
  };
  var node = (0, _index.createNode)(_tagName.STYLE, attrs, props);
  (0, _index.appendNode)(document.head, node);
  styleNodes[prehidingSelector] = node;
};
exports.hideElements = hideElements;
var showElements = function showElements(prehidingSelector) {
  var node = styleNodes[prehidingSelector];
  if (node) {
    (0, _index.removeNode)(node);
    delete styleNodes[prehidingSelector];
  }
};
exports.showElements = showElements;
var createHideContainers = function createHideContainers(logger) {
  return function (prehidingStyle) {
    if (!prehidingStyle) {
      return;
    }

    // If containers prehiding style has been added
    // by customer's prehiding snippet we don't
    // want to add the same node
    var node = (0, _index2.getElementById)(PREHIDING_ID);
    if (node) {
      return;
    }
    var nonce = (0, _index2.getNonce)();
    var attrs = _objectSpread({
      id: PREHIDING_ID
    }, nonce && {
      nonce: nonce
    });
    var props = {
      textContent: prehidingStyle
    };
    var styleNode = (0, _index.createNode)(_tagName.STYLE, attrs, props);
    logger.logOnContentHiding({
      status: "hide-containers",
      message: "Prehiding style applied to hide containers.",
      logLevel: "info"
    });
    (0, _index.appendNode)(document.head, styleNode);
  };
};
exports.createHideContainers = createHideContainers;
var createShowContainers = function createShowContainers(logger) {
  return function () {
    // If containers prehiding style exists
    // we will remove it
    var node = (0, _index2.getElementById)(PREHIDING_ID);
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

},{"../../../constants/tagName.js":231,"../../../utils/dom/index.js":284,"../dom-actions/dom/index.js":126}],154:[function(require,module,exports){
"use strict";

exports["default"] = exports.INTERACT_ID_DATA_ATTRIBUTE = exports.CLICK_TOKEN_DATA_ATTRIBUTE = exports.CLICK_LABEL_DATA_ATTRIBUTE = void 0;
var _index = require("../dom-actions/dom/index.js");
var _index2 = require("../../../utils/index.js");
var _initDomActionsModules = require("../dom-actions/initDomActionsModules.js");
var _propositionInteractionType = require("../../../constants/propositionInteractionType.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var INTERACT_ID_DATA_ATTRIBUTE = exports.INTERACT_ID_DATA_ATTRIBUTE = "data-aep-interact-id";
var CLICK_LABEL_DATA_ATTRIBUTE = exports.CLICK_LABEL_DATA_ATTRIBUTE = "data-aep-click-label";
var CLICK_TOKEN_DATA_ATTRIBUTE = exports.CLICK_TOKEN_DATA_ATTRIBUTE = "data-aep-click-token";
var lastInteractId = 0;
var getInteractId = function getInteractId(propositionId, existingInteractId) {
  if (existingInteractId) {
    return parseInt(existingInteractId, 10);
  }

  // eslint-disable-next-line no-plusplus
  return ++lastInteractId;
};
var interactionTrackingSupported = function interactionTrackingSupported(autoCollectPropositionInteractions, decisionProvider) {
  if (!autoCollectPropositionInteractions) {
    return false;
  }
  if (!autoCollectPropositionInteractions[decisionProvider]) {
    return false;
  }
  return [_propositionInteractionType.ALWAYS, _propositionInteractionType.DECORATED_ELEMENTS_ONLY].includes(autoCollectPropositionInteractions[decisionProvider]);
};
var createDecorateProposition = function createDecorateProposition(autoCollectPropositionInteractions, type, propositionId, itemId, trackingLabel, scopeType, notification, storeInteractionMeta) {
  var _notification$scopeDe = notification.scopeDetails,
    scopeDetails = _notification$scopeDe === void 0 ? {} : _notification$scopeDe;
  var decisionProvider = scopeDetails.decisionProvider;
  if (!interactionTrackingSupported(autoCollectPropositionInteractions, decisionProvider) && type !== _initDomActionsModules.DOM_ACTION_CLICK) {
    return _index2.noop;
  }
  return function (element) {
    if (!element.tagName) {
      return;
    }
    var interactId = getInteractId(propositionId, (0, _index.getAttribute)(element, INTERACT_ID_DATA_ATTRIBUTE));
    storeInteractionMeta(propositionId, itemId, scopeType, notification, interactId);
    (0, _index.setAttribute)(element, INTERACT_ID_DATA_ATTRIBUTE, interactId);
    if (trackingLabel && !(0, _index.getAttribute)(element, CLICK_LABEL_DATA_ATTRIBUTE)) {
      (0, _index.setAttribute)(element, CLICK_LABEL_DATA_ATTRIBUTE, trackingLabel);
    }
  };
};
var _default = exports["default"] = createDecorateProposition;

},{"../../../constants/propositionInteractionType.js":226,"../../../utils/index.js":300,"../dom-actions/dom/index.js":126,"../dom-actions/initDomActionsModules.js":137}],155:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _createDecorateProposition = require("./createDecorateProposition.js");
var _initDomActionsModules = require("../dom-actions/initDomActionsModules.js");
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
var _default = function _default(_ref) {
  var modules = _ref.modules,
    logger = _ref.logger,
    storeInteractionMeta = _ref.storeInteractionMeta,
    storeClickMeta = _ref.storeClickMeta,
    autoCollectPropositionInteractions = _ref.autoCollectPropositionInteractions;
  return function (item) {
    var _ref2 = item.getData() || {},
      type = _ref2.type,
      selector = _ref2.selector;
    if (!type) {
      logger.warn("Invalid DOM action data: missing type.", item.getData());
      return {
        setRenderAttempted: false,
        includeInNotification: false
      };
    }
    if (type === _initDomActionsModules.DOM_ACTION_CLICK) {
      if (!selector) {
        logger.warn("Invalid DOM action data: missing selector.", item.getData());
        return {
          setRenderAttempted: false,
          includeInNotification: false
        };
      }
      storeClickMeta({
        selector: selector,
        meta: _objectSpread(_objectSpread({}, item.getProposition().getNotification()), {}, {
          trackingLabel: item.getTrackingLabel(),
          scopeType: item.getProposition().getScopeType()
        })
      });
      return {
        setRenderAttempted: true,
        includeInNotification: false
      };
    }
    if (!modules[type]) {
      logger.warn("Invalid DOM action data: unknown type.", item.getData());
      return {
        setRenderAttempted: false,
        includeInNotification: false
      };
    }
    var decorateProposition = (0, _createDecorateProposition["default"])(autoCollectPropositionInteractions, type, item.getProposition().getId(), item.getId(), item.getTrackingLabel(), item.getProposition().getScopeType(), item.getProposition().getNotification(), storeInteractionMeta);
    return {
      render: function render() {
        return modules[type](item.getData(), decorateProposition);
      },
      setRenderAttempted: true,
      includeInNotification: true
    };
  };
};
exports["default"] = _default;

},{"../dom-actions/initDomActionsModules.js":137,"./createDecorateProposition.js":154}],156:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _createDecorateProposition = require("./createDecorateProposition.js");
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
var _default = function _default(_ref) {
  var modules = _ref.modules,
    logger = _ref.logger,
    storeInteractionMeta = _ref.storeInteractionMeta,
    autoCollectPropositionInteractions = _ref.autoCollectPropositionInteractions;
  return function (item) {
    var _ref2 = item.getData() || {},
      type = _ref2.type,
      selector = _ref2.selector;
    if (!selector || !type) {
      return {
        setRenderAttempted: false,
        includeInNotification: false
      };
    }
    if (!modules[type]) {
      logger.warn("Invalid HTML content data", item.getData());
      return {
        setRenderAttempted: false,
        includeInNotification: false
      };
    }
    var decorateProposition = (0, _createDecorateProposition["default"])(autoCollectPropositionInteractions, type, item.getProposition().getId(), item.getId(), item.getTrackingLabel(), item.getProposition().getScopeType(), item.getProposition().getNotification(), storeInteractionMeta);
    return {
      render: function render() {
        return modules[type](item.getData(), decorateProposition);
      },
      setRenderAttempted: true,
      includeInNotification: true
    };
  };
};
exports["default"] = _default;

},{"./createDecorateProposition.js":154}],157:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _contentType = require("../../../constants/contentType.js");
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

var DEFAULT_CONTENT = "defaultContent";
var expectedProps = ["content", "contentType"];
var expectedContentProps = ["mobileParameters", "webParameters", "html"];
var isValidInAppMessage = function isValidInAppMessage(data, logger) {
  for (var i = 0; i < expectedProps.length; i += 1) {
    var prop = expectedProps[i];
    if (!Object.prototype.hasOwnProperty.call(data, prop)) {
      logger.warn("Invalid in-app message data: missing property '" + prop + "'.", data);
      return false;
    }
  }
  var content = data.content,
    contentType = data.contentType;
  if (contentType === _contentType.APPLICATION_JSON) {
    for (var _i = 0; _i < expectedContentProps.length; _i += 1) {
      var _prop = expectedContentProps[_i];
      if (!Object.prototype.hasOwnProperty.call(content, _prop)) {
        logger.warn("Invalid in-app message data.content: missing property '" + _prop + "'.", data);
        return false;
      }
    }
  }
  return true;
};
var _default = function _default(_ref) {
  var modules = _ref.modules,
    logger = _ref.logger;
  return function (item) {
    var data = item.getData();
    var proposition = item.getProposition();
    var meta = _objectSpread({}, proposition.getNotification());
    var shouldSuppressDisplay = proposition.shouldSuppressDisplay();
    if (!data) {
      logger.warn("Invalid in-app message data: undefined.", data);
      return {};
    }
    var _data$type = data.type,
      type = _data$type === void 0 ? DEFAULT_CONTENT : _data$type;
    if (!modules[type]) {
      logger.warn("Invalid in-app message data: unknown type.", data);
      return {};
    }
    if (!isValidInAppMessage(data, logger)) {
      return {};
    }
    if (!meta) {
      logger.warn("Invalid in-app message meta: undefined.", meta);
      return {};
    }
    return {
      render: function render() {
        return shouldSuppressDisplay ? null : modules[type](_objectSpread(_objectSpread({}, data), {}, {
          meta: meta
        }));
      },
      setRenderAttempted: true,
      includeInNotification: true
    };
  };
};
exports["default"] = _default;

},{"../../../constants/contentType.js":203}],158:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
exports["default"] = void 0;
var _index = require("../../../utils/index.js");
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
var _default = function _default(_ref) {
  var schemaProcessors = _ref.schemaProcessors,
    logger = _ref.logger;
  var wrapRenderWithLogging = function wrapRenderWithLogging(render, item) {
    return function () {
      return Promise.resolve().then(render).then(function () {
        if (logger.enabled) {
          logger.info("Action " + item.toString() + " executed.");
        }
        return item.toJSON();
      })["catch"](function (error) {
        var message = error.message,
          stack = error.stack;
        var warning = "Failed to execute action " + item.toString() + ". " + message + " " + stack;
        logger.logOnContentRendering({
          status: "rendering-failed",
          detail: {
            propositionDetails: item.getProposition().getNotification(),
            item: item.toJSON()
          },
          error: error,
          message: warning,
          logLevel: "warn"
        });
        return undefined;
      });
    };
  };
  var renderItems = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(renderers, meta) {
      var results, successes;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.allSettled(renderers.map(function (renderer) {
              return renderer();
            }));
          case 2:
            results = _context.sent;
            successes = results.filter(function (result) {
              return result.status === "fulfilled";
            }).map(function (result) {
              return result.value;
            }); // as long as at least one renderer succeeds, we want to add the notification
            // to the display notifications
            if (!(meta && (0, _index.isNonEmptyArray)(successes))) {
              _context.next = 6;
              break;
            }
            return _context.abrupt("return", _objectSpread(_objectSpread({}, meta), {}, {
              items: successes
            }));
          case 6:
            return _context.abrupt("return", undefined);
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function renderItems(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var processItem = function processItem(item) {
    var processor = schemaProcessors[item.getSchema()];
    if (!processor) {
      return {};
    }
    return processor(item);
  };
  var processItems = function processItems(_ref3) {
    var existingRenderers = _ref3.renderers,
      existingReturnedPropositions = _ref3.returnedPropositions,
      existingReturnedDecisions = _ref3.returnedDecisions,
      items = _ref3.items,
      proposition = _ref3.proposition;
    var renderers = _toConsumableArray(existingRenderers);
    var returnedPropositions = _toConsumableArray(existingReturnedPropositions);
    var returnedDecisions = _toConsumableArray(existingReturnedDecisions);
    var renderedItems = [];
    var nonRenderedItems = [];
    var itemRenderers = [];
    var atLeastOneWithNotification = false;
    var render;
    var setRenderAttempted;
    var includeInNotification;
    var onlyRenderThis = false;
    var i = 0;
    var item;
    while (items.length > i) {
      item = items[i];
      var _processItem = processItem(item);
      render = _processItem.render;
      setRenderAttempted = _processItem.setRenderAttempted;
      includeInNotification = _processItem.includeInNotification;
      onlyRenderThis = _processItem.onlyRenderThis;
      if (onlyRenderThis) {
        returnedPropositions = [];
        returnedDecisions = [];
        if (setRenderAttempted) {
          renderedItems = [item];
          nonRenderedItems = [];
        } else {
          renderedItems = [];
          nonRenderedItems = [item];
        }
        renderers = [];
        itemRenderers = [render];
        atLeastOneWithNotification = includeInNotification;
        break;
      }
      if (render) {
        itemRenderers.push(wrapRenderWithLogging(render, item));
      }
      if (includeInNotification) {
        atLeastOneWithNotification = true;
      }
      if (setRenderAttempted) {
        renderedItems.push(item);
      } else {
        nonRenderedItems.push(item);
      }
      i += 1;
    }
    if (itemRenderers.length > 0) {
      var meta = atLeastOneWithNotification ? proposition.getNotification() : undefined;
      renderers.push(function () {
        return renderItems(itemRenderers, meta);
      });
    } else if (atLeastOneWithNotification) {
      renderers.push(function () {
        return Promise.resolve(proposition.getNotification());
      });
    }
    if (renderedItems.length > 0) {
      proposition.addToReturnValues(returnedPropositions, returnedDecisions, renderedItems, true);
    }
    if (nonRenderedItems.length > 0) {
      proposition.addToReturnValues(returnedPropositions, returnedDecisions, nonRenderedItems, false);
    }
    return {
      renderers: renderers,
      returnedPropositions: returnedPropositions,
      returnedDecisions: returnedDecisions,
      onlyRenderThis: onlyRenderThis
    };
  };
  return function (renderPropositions) {
    var nonRenderPropositions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var renderers = [];
    var returnedPropositions = [];
    var returnedDecisions = [];
    var onlyRenderThis;
    var i = 0;
    var proposition;
    var items;
    while (renderPropositions.length > i) {
      proposition = renderPropositions[i];
      items = proposition.getItems();
      var _processItems = processItems({
        renderers: renderers,
        returnedPropositions: returnedPropositions,
        returnedDecisions: returnedDecisions,
        items: items,
        proposition: proposition
      });
      renderers = _processItems.renderers;
      returnedPropositions = _processItems.returnedPropositions;
      returnedDecisions = _processItems.returnedDecisions;
      onlyRenderThis = _processItems.onlyRenderThis;
      if (onlyRenderThis) {
        break;
      }
      i += 1;
    }
    if (onlyRenderThis) {
      // if onlyRenderThis is true, that means returnedPropositions and returnedDecisions
      // only contains the proposition that triggered only rendering this. We need to
      // add the other propositions to the returnedPropositions and returnedDecisions.
      renderPropositions.forEach(function (p, index) {
        if (index !== i) {
          p.addToReturnValues(returnedPropositions, returnedDecisions, p.getItems(), false);
        }
      });
    }
    nonRenderPropositions.forEach(function (p) {
      p.addToReturnValues(returnedPropositions, returnedDecisions, p.getItems(), false);
    });
    var render = function render() {
      return Promise.all(renderers.map(function (renderer) {
        return renderer();
      })).then(function (metas) {
        var propositions = metas.filter(function (meta) {
          return meta;
        });
        var renderedPropositions = propositions.map(function (prop) {
          var id = prop.id,
            scope = prop.scope,
            scopeDetails = prop.scopeDetails;
          return {
            id: id,
            scope: scope,
            scopeDetails: scopeDetails
          };
        });
        if ((0, _index.isNonEmptyArray)(propositions)) {
          var propsByScope = (0, _index.groupBy)(propositions, function (p) {
            return p.scope;
          });
          logger.logOnContentRendering({
            status: "rendering-succeeded",
            detail: _objectSpread({}, propsByScope),
            message: "Scopes: " + JSON.stringify(propsByScope) + " successfully executed.",
            logLevel: "info"
          });
        }
        return renderedPropositions;
      });
    };
    return {
      returnedPropositions: returnedPropositions,
      returnedDecisions: returnedDecisions,
      render: render
    };
  };
};
exports["default"] = _default;

},{"../../../utils/index.js":300}],159:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var logger = _ref.logger,
    executeRedirect = _ref.executeRedirect,
    collect = _ref.collect;
  return function (item) {
    var _ref2 = item.getData() || {},
      content = _ref2.content;
    if (!content) {
      logger.warn("Invalid Redirect data", item.getData());
      return {};
    }
    var render = function render() {
      return collect({
        decisionsMeta: [item.getProposition().getNotification()],
        documentMayUnload: true
      }).then(function () {
        logger.logOnContentRendering({
          status: "rendering-redirect",
          detail: {
            propositionDetails: item.getProposition().getNotification(),
            redirect: content
          },
          message: "Redirect action " + item.toString() + " executed.",
          logLevel: "info"
        });
        return executeRedirect(content);
        // Execute redirect will never resolve. If there are bottom of page events that are waiting
        // for display notifications from this request, they will never run because this promise will
        // not resolve. This is intentional because we don't want to run bottom of page events if
        // there is a redirect.
      });
    };
    return {
      render: render,
      setRenderAttempted: true,
      onlyRenderThis: true
    };
  };
};
exports["default"] = _default;

},{}],160:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _pageWideScope = require("../../../constants/pageWideScope.js");
var _scopeType = require("../constants/scopeType.js");
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
var _default = function _default(_ref) {
  var preprocess = _ref.preprocess,
    isPageWideSurface = _ref.isPageWideSurface;
  var createItem = function createItem(item, proposition) {
    var id = item.id,
      schema = item.schema,
      data = item.data,
      _item$characteristics = item.characteristics,
      _item$characteristics2 = _item$characteristics === void 0 ? {} : _item$characteristics,
      trackingLabel = _item$characteristics2.trackingLabel;
    var schemaType = data ? data.type : undefined;
    var processedData = preprocess(data);
    return {
      getId: function getId() {
        return id;
      },
      getSchema: function getSchema() {
        return schema;
      },
      getSchemaType: function getSchemaType() {
        return schemaType;
      },
      getData: function getData() {
        return processedData;
      },
      getProposition: function getProposition() {
        return proposition;
      },
      getTrackingLabel: function getTrackingLabel() {
        return trackingLabel;
      },
      getOriginalItem: function getOriginalItem() {
        return item;
      },
      toString: function toString() {
        return JSON.stringify(item);
      },
      toJSON: function toJSON() {
        return item;
      }
    };
  };
  return function (payload) {
    var visibleInReturnedItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var _shouldSuppressDisplay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var id = payload.id,
      scope = payload.scope,
      scopeDetails = payload.scopeDetails,
      _payload$items = payload.items,
      items = _payload$items === void 0 ? [] : _payload$items;
    var _ref2 = scopeDetails || {},
      _ref2$characteristics = _ref2.characteristics,
      _ref2$characteristics2 = _ref2$characteristics === void 0 ? {} : _ref2$characteristics,
      scopeType = _ref2$characteristics2.scopeType;
    return {
      getScope: function getScope() {
        return scope;
      },
      getScopeType: function getScopeType() {
        if (scope === _pageWideScope["default"] || isPageWideSurface(scope)) {
          return _scopeType.PAGE_SCOPE_TYPE;
        }
        if (scopeType === _scopeType.VIEW_SCOPE_TYPE) {
          return _scopeType.VIEW_SCOPE_TYPE;
        }
        return _scopeType.PROPOSITION_SCOPE_TYPE;
      },
      getItems: function getItems() {
        var _this = this;
        return items.map(function (item) {
          return createItem(item, _this);
        });
      },
      getNotification: function getNotification() {
        return {
          id: id,
          scope: scope,
          scopeDetails: scopeDetails
        };
      },
      getId: function getId() {
        return id;
      },
      toJSON: function toJSON() {
        return payload;
      },
      shouldSuppressDisplay: function shouldSuppressDisplay() {
        return _shouldSuppressDisplay;
      },
      addToReturnValues: function addToReturnValues(propositions, decisions, includedItems, renderAttempted) {
        if (visibleInReturnedItems) {
          propositions.push(_objectSpread(_objectSpread({}, payload), {}, {
            items: includedItems.map(function (i) {
              return i.getOriginalItem();
            }),
            renderAttempted: renderAttempted
          }));
          if (!renderAttempted) {
            decisions.push(_objectSpread(_objectSpread({}, payload), {}, {
              items: includedItems.map(function (i) {
                return i.getOriginalItem();
              })
            }));
          }
        }
      }
    };
  };
};
exports["default"] = _default;

},{"../../../constants/pageWideScope.js":224,"../constants/scopeType.js":92}],161:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _noop = require("../../../utils/noop.js");
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
var _default = function _default() {
  return {
    render: _noop["default"],
    setRenderAttempted: true,
    includeInNotification: true
  };
};
exports["default"] = _default;

},{"../../../utils/noop.js":323}],162:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports.mobileOverlay = exports.displayHTMLContentInIframe = exports["default"] = exports.createIframeClickHandler = exports.createIframe = exports.buildStyleFromMobileParameters = void 0;
var _index = require("../../dom-actions/dom/index.js");
var _utils = require("../utils.js");
var _contentType = require("../../../../constants/contentType.js");
var _index2 = require("../../../../utils/index.js");
var _index3 = require("../../../../utils/dom/index.js");
var _index4 = require("../../../../utils/validation/index.js");
var _propositionEventType = require("../../../../constants/propositionEventType.js");
var _eventType = require("../../../../constants/eventType.js");
var _createRedirect = require("../../dom-actions/createRedirect.js");
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

var MESSAGING_CONTAINER_ID = "alloy-messaging-container";
var OVERLAY_CONTAINER_ID = "alloy-overlay-container";
var IFRAME_ID = "alloy-content-iframe";
var dismissMessage = function dismissMessage() {
  return [MESSAGING_CONTAINER_ID, OVERLAY_CONTAINER_ID].forEach(_utils.removeElementById);
};
var createIframeClickHandler = function createIframeClickHandler(interact) {
  var navigateToUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _createRedirect["default"])(window);
  return function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    var target = event.target;
    var anchor = target.tagName.toLowerCase() === "a" ? target : target.closest("a");
    if (!anchor) {
      return;
    }
    var _ref = (0, _utils.parseAnchor)(anchor),
      action = _ref.action,
      interaction = _ref.interaction,
      link = _ref.link,
      label = _ref.label,
      uuid = _ref.uuid;
    interact(action, {
      label: label,
      id: interaction,
      uuid: uuid,
      link: link
    });
    if (action === "dismiss") {
      dismissMessage();
    }
    if ((0, _index2.isNonEmptyString)(link) && link.length > 0) {
      navigateToUrl(link, true);
    }
  };
};
exports.createIframeClickHandler = createIframeClickHandler;
var createIframe = function createIframe(htmlContent, clickHandler) {
  var parser = new DOMParser();
  var htmlDocument = parser.parseFromString(htmlContent, _contentType.TEXT_HTML);
  var scriptTag = htmlDocument.querySelector("script");
  if (scriptTag) {
    scriptTag.setAttribute("nonce", (0, _index.getNonce)());
  }
  var element = (0, _index3.createNode)("iframe", {
    src: URL.createObjectURL(new Blob([htmlDocument.documentElement.outerHTML], {
      type: "text/html"
    })),
    id: IFRAME_ID
  });
  element.addEventListener("load", function () {
    var _ref2 = element.contentDocument || element.contentWindow.document,
      addEventListener = _ref2.addEventListener;
    addEventListener("click", clickHandler);
  });
  return element;
};
exports.createIframe = createIframe;
var renderMessage = function renderMessage(iframe, webParameters, container, overlay) {
  [{
    id: OVERLAY_CONTAINER_ID,
    element: overlay
  }, {
    id: MESSAGING_CONTAINER_ID,
    element: container
  }, {
    id: IFRAME_ID,
    element: iframe
  }].forEach(function (_ref3) {
    var id = _ref3.id,
      element = _ref3.element;
    var _webParameters$id = webParameters[id],
      _webParameters$id$sty = _webParameters$id.style,
      style = _webParameters$id$sty === void 0 ? {} : _webParameters$id$sty,
      _webParameters$id$par = _webParameters$id.params,
      params = _webParameters$id$par === void 0 ? {} : _webParameters$id$par;
    element.style = _objectSpread(_objectSpread({}, element.style), style);
    var _params$parentElement = params.parentElement,
      parentElement = _params$parentElement === void 0 ? "body" : _params$parentElement,
      _params$insertionMeth = params.insertionMethod,
      insertionMethod = _params$insertionMeth === void 0 ? "appendChild" : _params$insertionMeth,
      _params$enabled = params.enabled,
      enabled = _params$enabled === void 0 ? true : _params$enabled;
    var parent = document.querySelector(parentElement);
    if (enabled && parent && typeof parent[insertionMethod] === "function") {
      parent[insertionMethod](element);
    }
  });
};
var buildStyleFromMobileParameters = function buildStyleFromMobileParameters(mobileParameters) {
  var verticalAlign = mobileParameters.verticalAlign,
    width = mobileParameters.width,
    horizontalAlign = mobileParameters.horizontalAlign,
    backdropColor = mobileParameters.backdropColor,
    height = mobileParameters.height,
    cornerRadius = mobileParameters.cornerRadius,
    horizontalInset = mobileParameters.horizontalInset,
    verticalInset = mobileParameters.verticalInset,
    _mobileParameters$uiT = mobileParameters.uiTakeover,
    uiTakeover = _mobileParameters$uiT === void 0 ? false : _mobileParameters$uiT;
  var style = {
    width: width ? width + "%" : "100%",
    backgroundColor: backdropColor || "rgba(0, 0, 0, 0.5)",
    borderRadius: cornerRadius ? cornerRadius + "px" : "0px",
    border: "none",
    position: uiTakeover ? "fixed" : "relative",
    overflow: "hidden"
  };
  if (horizontalAlign === "left") {
    style.left = horizontalInset ? horizontalInset + "%" : "0";
  } else if (horizontalAlign === "right") {
    style.right = horizontalInset ? horizontalInset + "%" : "0";
  } else if (horizontalAlign === "center") {
    style.left = "50%";
    style.transform = "translateX(-50%)";
  }
  if (verticalAlign === "top") {
    style.top = verticalInset ? verticalInset + "%" : "0";
  } else if (verticalAlign === "bottom") {
    style.position = "fixed";
    style.bottom = verticalInset ? verticalInset + "%" : "0";
  } else if (verticalAlign === "center") {
    style.top = "50%";
    style.transform = (horizontalAlign === "center" ? style.transform + " " : "") + "translateY(-50%)";
    style.display = "flex";
    style.alignItems = "center";
    style.justifyContent = "center";
  }
  if (height) {
    style.height = height + "vh";
  } else {
    style.height = "100%";
  }
  return style;
};
exports.buildStyleFromMobileParameters = buildStyleFromMobileParameters;
var mobileOverlay = function mobileOverlay(mobileParameters) {
  var backdropOpacity = mobileParameters.backdropOpacity,
    backdropColor = mobileParameters.backdropColor;
  var opacity = backdropOpacity || 0.5;
  var color = backdropColor || "#FFFFFF";
  var style = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "transparent",
    opacity: opacity,
    backgroundColor: color
  };
  return style;
};
exports.mobileOverlay = mobileOverlay;
var REQUIRED_PARAMS = ["enabled", "parentElement", "insertionMethod"];
var isValidWebParameters = function isValidWebParameters(webParameters) {
  if (!webParameters) {
    return false;
  }
  var ids = Object.keys(webParameters);
  if (!ids.includes(MESSAGING_CONTAINER_ID)) {
    return false;
  }
  if (!ids.includes(OVERLAY_CONTAINER_ID)) {
    return false;
  }
  var valuesArray = Object.values(webParameters);
  for (var i = 0; i < valuesArray.length; i += 1) {
    if (!(0, _index4.objectOf)(valuesArray[i], "style")) {
      return false;
    }
    if (!(0, _index4.objectOf)(valuesArray[i], "params")) {
      return false;
    }
    for (var j = 0; j < REQUIRED_PARAMS.length; j += 1) {
      if (!(0, _index4.objectOf)(valuesArray[i].params, REQUIRED_PARAMS[j])) {
        return false;
      }
    }
  }
  return true;
};
var generateWebParameters = function generateWebParameters(mobileParameters) {
  if (!mobileParameters) {
    return undefined;
  }
  var _mobileParameters$uiT2 = mobileParameters.uiTakeover,
    uiTakeover = _mobileParameters$uiT2 === void 0 ? false : _mobileParameters$uiT2;
  return _defineProperty(_defineProperty(_defineProperty({}, IFRAME_ID, {
    style: {
      border: "none",
      width: "100%",
      height: "100%"
    },
    params: {
      enabled: true,
      parentElement: "#alloy-messaging-container",
      insertionMethod: "appendChild"
    }
  }), MESSAGING_CONTAINER_ID, {
    style: buildStyleFromMobileParameters(mobileParameters),
    params: {
      enabled: true,
      parentElement: "body",
      insertionMethod: "appendChild"
    }
  }), OVERLAY_CONTAINER_ID, {
    style: mobileOverlay(mobileParameters),
    params: {
      enabled: uiTakeover === true,
      parentElement: "body",
      insertionMethod: "appendChild"
    }
  });
};

// eslint-disable-next-line default-param-last
var displayHTMLContentInIframe = function displayHTMLContentInIframe() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var interact = arguments.length > 1 ? arguments[1] : undefined;
  dismissMessage();
  var content = settings.content,
    contentType = settings.contentType,
    mobileParameters = settings.mobileParameters;
  var webParameters = settings.webParameters;
  if (contentType !== _contentType.TEXT_HTML) {
    return;
  }
  var container = (0, _index3.createNode)("div", {
    id: MESSAGING_CONTAINER_ID
  });
  var iframe = createIframe(content, createIframeClickHandler(interact));
  var overlay = (0, _index3.createNode)("div", {
    id: OVERLAY_CONTAINER_ID
  });
  if (!isValidWebParameters(webParameters)) {
    webParameters = generateWebParameters(mobileParameters);
  }
  if (!webParameters) {
    return;
  }
  renderMessage(iframe, webParameters, container, overlay);
};
exports.displayHTMLContentInIframe = displayHTMLContentInIframe;
var _default = function _default(settings, collect) {
  return new Promise(function (resolve) {
    var meta = settings.meta;
    displayHTMLContentInIframe(settings, function (action, propositionAction) {
      var propositionEventTypes = {};
      propositionEventTypes[_propositionEventType.PropositionEventType.INTERACT] = _eventType.EVENT_TYPE_TRUE;
      if (Object.values(_propositionEventType.PropositionEventType).indexOf(action) !== -1) {
        propositionEventTypes[action] = _eventType.EVENT_TYPE_TRUE;
      }
      collect({
        decisionsMeta: [meta],
        propositionAction: propositionAction,
        eventType: _eventType.INTERACT,
        propositionEventTypes: Object.keys(propositionEventTypes)
      });
    });
    resolve({
      meta: meta
    });
  });
};
exports["default"] = _default;

},{"../../../../constants/contentType.js":203,"../../../../constants/eventType.js":214,"../../../../constants/propositionEventType.js":225,"../../../../utils/dom/index.js":284,"../../../../utils/index.js":300,"../../../../utils/validation/index.js":364,"../../dom-actions/createRedirect.js":115,"../../dom-actions/dom/index.js":126,"../utils.js":164}],163:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _displayIframeContent = require("./actions/displayIframeContent.js");
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
var _default = function _default(collect) {
  return {
    defaultContent: function defaultContent(settings) {
      return (0, _displayIframeContent["default"])(settings, collect);
    }
  };
};
exports["default"] = _default;

},{"./actions/displayIframeContent.js":162}],164:[function(require,module,exports){
"use strict";

exports.removeElementById = exports.parseAnchor = void 0;
var _index = require("../../../utils/index.js");
var _index2 = require("../../../utils/dom/index.js");
var _decodeUriComponentSafely = require("../../../utils/decodeUriComponentSafely.js");
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

var removeElementById = function removeElementById(id) {
  var element = (0, _index2.selectNodes)("#" + id, document);
  if (element && element.length > 0) {
    (0, _index2.removeNode)(element[0]);
  }
};
exports.removeElementById = removeElementById;
var parseAnchor = function parseAnchor(anchor) {
  var nothing = {};
  if (!anchor || anchor.tagName.toLowerCase() !== "a") {
    return nothing;
  }
  var href = anchor.href;
  if (!href || !href.startsWith("adbinapp://")) {
    return nothing;
  }
  var hrefParts = href.split("?");
  var action = hrefParts[0].split("://")[1];
  var label = anchor.innerText;
  var uuid = anchor.getAttribute("data-uuid") || "";
  var interaction;
  var link;
  if ((0, _index.isNonEmptyArray)(hrefParts)) {
    var queryParams = _index.queryString.parse(hrefParts[1]);
    interaction = queryParams.interaction || "";
    link = (0, _decodeUriComponentSafely["default"])(queryParams.link || "");
  }
  return {
    action: action,
    interaction: interaction,
    link: link,
    label: label,
    uuid: uuid
  };
};
exports.parseAnchor = parseAnchor;

},{"../../../utils/decodeUriComponentSafely.js":277,"../../../utils/dom/index.js":284,"../../../utils/index.js":300}],165:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _index = require("../../utils/validation/index.js");
var _createComponent = require("./createComponent.js");
var _index2 = require("./dom-actions/index.js");
var _createCollect = require("../../utils/createCollect.js");
var _index3 = require("./flicker/index.js");
var _createFetchDataHandler = require("./createFetchDataHandler.js");
var _collectClicks = require("./dom-actions/clicks/collectClicks.js");
var _isAuthoringModeEnabled = require("./utils/isAuthoringModeEnabled.js");
var _event = require("../../utils/event.js");
var _createOnClickHandler = require("./createOnClickHandler.js");
var _createViewCacheManager = require("./createViewCacheManager.js");
var _createViewChangeHandler = require("./createViewChangeHandler.js");
var _createClickStorage = require("./createClickStorage.js");
var _createInteractionStorage = require("./createInteractionStorage.js");
var _createApplyPropositions = require("./createApplyPropositions.js");
var _createGetPageLocation = require("./createGetPageLocation.js");
var _createSetTargetMigration = require("./createSetTargetMigration.js");
var _remapCustomCodeOffers = require("./dom-actions/remapCustomCodeOffers.js");
var _remapHeadOffers = require("./dom-actions/remapHeadOffers.js");
var _createPreprocess = require("./dom-actions/createPreprocess.js");
var _injectCreateProposition = require("./handlers/injectCreateProposition.js");
var _createAsyncArray = require("./utils/createAsyncArray.js");
var schema = require("../../constants/schema.js");
var _processDefaultContent = require("./handlers/processDefaultContent.js");
var _surfaceUtils = require("./utils/surfaceUtils.js");
var _createProcessDomAction = require("./handlers/createProcessDomAction.js");
var _createProcessHtmlContent = require("./handlers/createProcessHtmlContent.js");
var _createProcessRedirect = require("./handlers/createProcessRedirect.js");
var _createProcessPropositions = require("./handlers/createProcessPropositions.js");
var _createOnDecisionHandler = require("./createOnDecisionHandler.js");
var _createProcessInAppMessage = require("./handlers/createProcessInAppMessage.js");
var _initInAppMessageActionsModules = require("./in-app-message-actions/initInAppMessageActionsModules.js");
var _createRedirect = require("./dom-actions/createRedirect.js");
var _createNotificationHandler = require("./createNotificationHandler.js");
var _createHandleConsentFlicker = require("./createHandleConsentFlicker.js");
var _collectInteractions = require("./dom-actions/clicks/collectInteractions.js");
var _propositionInteractionType = require("../../constants/propositionInteractionType.js");
var _decisionProvider = require("../../constants/decisionProvider.js");
/*
Copyright 2019 Adobe. Ackll rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var createPersonalization = function createPersonalization(_ref) {
  var config = _ref.config,
    logger = _ref.logger,
    eventManager = _ref.eventManager,
    consent = _ref.consent;
  var targetMigrationEnabled = config.targetMigrationEnabled,
    prehidingStyle = config.prehidingStyle,
    autoCollectPropositionInteractions = config.autoCollectPropositionInteractions;
  var collect = (0, _createCollect["default"])({
    eventManager: eventManager,
    mergeDecisionsMeta: _event.mergeDecisionsMeta
  });
  var showContainers = (0, _index3.createShowContainers)(logger);
  var hideContainers = (0, _index3.createHideContainers)(logger);
  var _ref2 = (0, _createInteractionStorage["default"])(),
    storeInteractionMeta = _ref2.storeInteractionMeta,
    getInteractionMetas = _ref2.getInteractionMetas;
  var _ref3 = (0, _createClickStorage["default"])(),
    storeClickMeta = _ref3.storeClickMeta,
    getClickSelectors = _ref3.getClickSelectors,
    getClickMetas = _ref3.getClickMetas;
  var getPageLocation = (0, _createGetPageLocation["default"])({
    window: window
  });
  var domActionsModules = (0, _index2.initDomActionsModules)();
  var preprocess = (0, _createPreprocess["default"])([_remapHeadOffers["default"], _remapCustomCodeOffers["default"]]);
  var createProposition = (0, _injectCreateProposition["default"])({
    preprocess: preprocess,
    isPageWideSurface: _surfaceUtils.isPageWideSurface
  });
  var viewCache = (0, _createViewCacheManager["default"])({
    createProposition: createProposition
  });
  var executeRedirect = (0, _createRedirect["default"])(window);
  var schemaProcessors = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, schema.DEFAULT_CONTENT_ITEM, _processDefaultContent["default"]), schema.DOM_ACTION, (0, _createProcessDomAction["default"])({
    modules: domActionsModules,
    logger: logger,
    storeInteractionMeta: storeInteractionMeta,
    storeClickMeta: storeClickMeta,
    autoCollectPropositionInteractions: autoCollectPropositionInteractions
  })), schema.HTML_CONTENT_ITEM, (0, _createProcessHtmlContent["default"])({
    modules: domActionsModules,
    logger: logger,
    storeInteractionMeta: storeInteractionMeta,
    autoCollectPropositionInteractions: autoCollectPropositionInteractions
  })), schema.REDIRECT_ITEM, (0, _createProcessRedirect["default"])({
    logger: logger,
    executeRedirect: executeRedirect,
    collect: collect
  })), schema.MESSAGE_IN_APP, (0, _createProcessInAppMessage["default"])({
    modules: (0, _initInAppMessageActionsModules["default"])(collect),
    logger: logger
  }));
  var processPropositions = (0, _createProcessPropositions["default"])({
    schemaProcessors: schemaProcessors,
    logger: logger
  });
  var renderedPropositions = (0, _createAsyncArray["default"])();
  var notificationHandler = (0, _createNotificationHandler["default"])(collect, renderedPropositions);
  var fetchDataHandler = (0, _createFetchDataHandler["default"])({
    prehidingStyle: prehidingStyle,
    showContainers: showContainers,
    hideContainers: hideContainers,
    mergeQuery: _event.mergeQuery,
    processPropositions: processPropositions,
    createProposition: createProposition,
    notificationHandler: notificationHandler,
    consent: consent,
    logger: logger
  });
  var onClickHandler = (0, _createOnClickHandler["default"])({
    mergeDecisionsMeta: _event.mergeDecisionsMeta,
    collectInteractions: _collectInteractions["default"],
    collectClicks: _collectClicks["default"],
    getInteractionMetas: getInteractionMetas,
    getClickMetas: getClickMetas,
    getClickSelectors: getClickSelectors,
    autoCollectPropositionInteractions: autoCollectPropositionInteractions
  });
  var viewChangeHandler = (0, _createViewChangeHandler["default"])({
    processPropositions: processPropositions,
    viewCache: viewCache,
    logger: logger
  });
  var applyPropositions = (0, _createApplyPropositions["default"])({
    processPropositions: processPropositions,
    createProposition: createProposition,
    renderedPropositions: renderedPropositions,
    viewCache: viewCache
  });
  var setTargetMigration = (0, _createSetTargetMigration["default"])({
    targetMigrationEnabled: targetMigrationEnabled
  });
  var onDecisionHandler = (0, _createOnDecisionHandler["default"])({
    processPropositions: processPropositions,
    createProposition: createProposition,
    notificationHandler: notificationHandler
  });
  var handleConsentFlicker = (0, _createHandleConsentFlicker["default"])({
    showContainers: showContainers,
    consent: consent
  });
  return (0, _createComponent["default"])({
    getPageLocation: getPageLocation,
    logger: logger,
    fetchDataHandler: fetchDataHandler,
    viewChangeHandler: viewChangeHandler,
    onClickHandler: onClickHandler,
    isAuthoringModeEnabled: _isAuthoringModeEnabled["default"],
    mergeQuery: _event.mergeQuery,
    viewCache: viewCache,
    showContainers: showContainers,
    applyPropositions: applyPropositions,
    setTargetMigration: setTargetMigration,
    mergeDecisionsMeta: _event.mergeDecisionsMeta,
    renderedPropositions: renderedPropositions,
    onDecisionHandler: onDecisionHandler,
    handleConsentFlicker: handleConsentFlicker
  });
};
createPersonalization.namespace = "Personalization";
var interactionConfigOptions = _propositionInteractionType.PROPOSITION_INTERACTION_TYPES.map(function (propositionInteractionType) {
  return (0, _index.literal)(propositionInteractionType);
});
createPersonalization.configValidators = (0, _index.objectOf)({
  prehidingStyle: (0, _index.string)().nonEmpty(),
  targetMigrationEnabled: (0, _index["boolean"])()["default"](false),
  autoCollectPropositionInteractions: (0, _index.objectOf)(_defineProperty(_defineProperty({}, _decisionProvider.ADOBE_JOURNEY_OPTIMIZER, (0, _index.anyOf)(interactionConfigOptions)["default"](_propositionInteractionType.ALWAYS)), _decisionProvider.ADOBE_TARGET, (0, _index.anyOf)(interactionConfigOptions)["default"](_propositionInteractionType.NEVER)))["default"](_defineProperty(_defineProperty({}, _decisionProvider.ADOBE_JOURNEY_OPTIMIZER, _propositionInteractionType.ALWAYS), _decisionProvider.ADOBE_TARGET, _propositionInteractionType.NEVER)).noUnknownFields()
});
var _default = exports["default"] = createPersonalization;

},{"../../constants/decisionProvider.js":209,"../../constants/propositionInteractionType.js":226,"../../constants/schema.js":228,"../../utils/createCollect.js":272,"../../utils/event.js":291,"../../utils/validation/index.js":364,"./createApplyPropositions.js":94,"./createClickStorage.js":95,"./createComponent.js":96,"./createFetchDataHandler.js":97,"./createGetPageLocation.js":98,"./createHandleConsentFlicker.js":99,"./createInteractionStorage.js":100,"./createNotificationHandler.js":101,"./createOnClickHandler.js":102,"./createOnDecisionHandler.js":103,"./createSetTargetMigration.js":105,"./createViewCacheManager.js":106,"./createViewChangeHandler.js":107,"./dom-actions/clicks/collectClicks.js":111,"./dom-actions/clicks/collectInteractions.js":112,"./dom-actions/createPreprocess.js":114,"./dom-actions/createRedirect.js":115,"./dom-actions/index.js":136,"./dom-actions/remapCustomCodeOffers.js":143,"./dom-actions/remapHeadOffers.js":144,"./flicker/index.js":153,"./handlers/createProcessDomAction.js":155,"./handlers/createProcessHtmlContent.js":156,"./handlers/createProcessInAppMessage.js":157,"./handlers/createProcessPropositions.js":158,"./handlers/createProcessRedirect.js":159,"./handlers/injectCreateProposition.js":160,"./handlers/processDefaultContent.js":161,"./in-app-message-actions/initInAppMessageActionsModules.js":163,"./utils/createAsyncArray.js":166,"./utils/isAuthoringModeEnabled.js":167,"./utils/surfaceUtils.js":169}],166:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default() {
  var latest = Promise.resolve([]);
  return {
    concat: function concat(promise) {
      latest = latest.then(function (existingPropositions) {
        return promise.then(function (newPropositions) {
          return existingPropositions.concat(newPropositions);
        })["catch"](function () {
          return existingPropositions;
        });
      });
    },
    /**
     * Clears the saved propositions, waiting until the next propositions are resolved and available.
     *
     * @returns {Promise<Array>} A promise that resolves to the latest propositions.
     */
    clear: function clear() {
      var oldLatest = latest;
      latest = Promise.resolve([]);
      return oldLatest;
    }
  };
};
exports["default"] = _default;

},{}],167:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default() {
  var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  return doc.location.href.indexOf("adobe_authoring_enabled") !== -1;
};
exports["default"] = _default;

},{}],168:[function(require,module,exports){
"use strict";

var _excluded = ["trackingLabel", "scopeType"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
exports.dedupeMetas = exports.cleanMetas = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var cleanMetas = function cleanMetas(metas) {
  return metas.map(function (meta) {
    var trackingLabel = meta.trackingLabel,
      scopeType = meta.scopeType,
      rest = _objectWithoutProperties(meta, _excluded);
    return rest;
  });
};
exports.cleanMetas = cleanMetas;
var dedupeMetas = function dedupeMetas(metas) {
  return metas.filter(function (meta, index) {
    var stringifiedMeta = JSON.stringify(meta);
    return index === metas.findIndex(function (innerMeta) {
      return JSON.stringify(innerMeta) === stringifiedMeta;
    });
  });
};
exports.dedupeMetas = dedupeMetas;

},{}],169:[function(require,module,exports){
"use strict";

exports.normalizeSurfaces = exports.isPageWideSurface = exports.buildPageSurface = void 0;
var _surface = require("../constants/surface.js");
var _index = require("../../../utils/index.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var SURFACE_REGEX = /^(\w+):\/\/([^/#]+)(\/[^#]*)?(#.*)?$/;
var AUTHORITY_REGEX = /^(?:.*@)?(?:[a-z\d\u00a1-\uffff.-]+|\[[a-f\d:]+])(?::\d+)?$/;
var PATH_REGEX = /^\/(?:[/\w\u00a1-\uffff-.~]|%[a-fA-F\d]{2})*$/;
var FRAGMENT_REGEX = /^#(?:[/\w\u00a1-\uffff-.~]|%[a-fA-F\d]{2})+$/;
var normalizePath = function normalizePath() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";
  var end = path.length;
  while (end > 0 && "/".indexOf(path.charAt(end - 1)) !== -1) {
    end -= 1;
  }
  return path.substring(0, end) || "/";
};
var getSurfaceType = function getSurfaceType(surfaceTypeMatch) {
  return (0, _index.isNonEmptyString)(surfaceTypeMatch) ? surfaceTypeMatch.toLowerCase() : "";
};
var getAuthority = function getAuthority(authorityMatch) {
  return (0, _index.isNonEmptyString)(authorityMatch) ? authorityMatch.toLowerCase() : "";
};
var getPath = function getPath(pathMatch) {
  return (0, _index.isNonEmptyString)(pathMatch) ? normalizePath(pathMatch) : "/";
};
var parseSurface = function parseSurface(surfaceString) {
  var matched = surfaceString.match(SURFACE_REGEX);
  return matched ? {
    surfaceType: getSurfaceType(matched[1]),
    authority: getAuthority(matched[2]),
    path: getPath(matched[3]),
    fragment: matched[4]
  } : null;
};
var stringifySurface = function stringifySurface(surface) {
  return "" + surface.surfaceType + _surface.SURFACE_TYPE_DELIMITER + surface.authority + (surface.path || "") + (surface.fragment || "");
};
var buildPageSurface = function buildPageSurface(getPageLocation) {
  var location = getPageLocation();
  var host = location.host.toLowerCase();
  var path = location.pathname;
  return _surface.WEB + _surface.SURFACE_TYPE_DELIMITER + host + normalizePath(path);
};
exports.buildPageSurface = buildPageSurface;
var expandFragmentSurface = function expandFragmentSurface(surface, getPageLocation) {
  return surface.startsWith(_surface.FRAGMENT_DELIMITER) ? buildPageSurface(getPageLocation) + surface : surface;
};
var validateSurface = function validateSurface(surface, getPageLocation, logger) {
  var invalidateSurface = function invalidateSurface(validationError) {
    logger.warn(validationError);
    return null;
  };
  if (!(0, _index.isNonEmptyString)(surface)) {
    return invalidateSurface("Invalid surface: " + surface);
  }
  var expanded = expandFragmentSurface(surface, getPageLocation);
  var parsed = parseSurface(expanded);
  if (parsed === null) {
    return invalidateSurface("Invalid surface: " + surface);
  }
  if (![_surface.WEB, _surface.WEBAPP].includes(parsed.surfaceType)) {
    return invalidateSurface("Unsupported surface type " + parsed.surfaceType + " in surface: " + surface);
  }
  if (!parsed.authority || !AUTHORITY_REGEX.test(parsed.authority)) {
    return invalidateSurface("Invalid authority " + parsed.authority + " in surface: " + surface);
  }
  if (parsed.path && !PATH_REGEX.test(parsed.path)) {
    return invalidateSurface("Invalid path " + parsed.path + " in surface: " + surface);
  }
  if (parsed.fragment && !FRAGMENT_REGEX.test(parsed.fragment)) {
    return invalidateSurface("Invalid fragment " + parsed.fragment + " in surface: " + surface);
  }
  return parsed;
};
var isPageWideSurface = function isPageWideSurface(scope) {
  return !!scope && scope.indexOf(_surface.WEB + _surface.SURFACE_TYPE_DELIMITER) === 0 && scope.indexOf(_surface.FRAGMENT_DELIMITER) === -1;
};

// eslint-disable-next-line default-param-last
exports.isPageWideSurface = isPageWideSurface;
var normalizeSurfaces = function normalizeSurfaces() {
  var surfaces = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var getPageLocation = arguments.length > 1 ? arguments[1] : undefined;
  var logger = arguments.length > 2 ? arguments[2] : undefined;
  return surfaces.map(function (surface) {
    return validateSurface(surface, getPageLocation, logger);
  }).filter(function (surface) {
    return !(0, _index.isNil)(surface);
  }).map(stringifySurface);
};
exports.normalizeSurfaces = normalizeSurfaces;

},{"../../../utils/index.js":300,"../constants/surface.js":93}],170:[function(require,module,exports){
"use strict";

exports["default"] = exports.EMPTY_PROPOSITIONS = void 0;
var _index = require("../../utils/validation/index.js");
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

var EMPTY_PROPOSITIONS = exports.EMPTY_PROPOSITIONS = {
  propositions: []
};
var _default = function _default(_ref) {
  var logger = _ref.logger,
    options = _ref.options;
  var applyPropositionsOptionsValidator = (0, _index.objectOf)({
    propositions: (0, _index.arrayOf)((0, _index.objectOf)({
      id: (0, _index.string)().required(),
      scope: (0, _index.string)().required(),
      scopeDetails: (0, _index.objectOf)({
        decisionProvider: (0, _index.string)().required()
      }).required(),
      items: (0, _index.arrayOf)((0, _index.objectOf)({
        id: (0, _index.string)().required(),
        schema: (0, _index.string)().required(),
        data: (0, _index.objectOf)((0, _index.anything)())
      })).nonEmpty().required()
    }).required()).nonEmpty().required(),
    metadata: (0, _index.objectOf)((0, _index.anything)()),
    viewName: (0, _index.string)()
  }).required();
  try {
    return applyPropositionsOptionsValidator(options);
  } catch (e) {
    logger.warn("Invalid options for applyPropositions. No propositions will be applied.", e);
    return EMPTY_PROPOSITIONS;
  }
};
exports["default"] = _default;

},{"../../utils/validation/index.js":364}],171:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _schema = require("../../../constants/schema.js");
var _contentType = require("../../../constants/contentType.js");
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
var _default = function _default(id, type, detail) {
  var html = detail.html,
    mobileParameters = detail.mobileParameters;
  var webParameters = {};
  return {
    schema: _schema.MESSAGE_IN_APP,
    data: {
      mobileParameters: mobileParameters,
      webParameters: webParameters,
      content: html,
      contentType: _contentType.TEXT_HTML
    },
    id: id
  };
};
exports["default"] = _default;

},{"../../../constants/contentType.js":203,"../../../constants/schema.js":228}],172:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(id, type, detail) {
  var schema = detail.schema,
    data = detail.data,
    detailId = detail.id;
  return {
    schema: schema,
    data: data,
    id: detailId || id
  };
};
exports["default"] = _default;

},{}],173:[function(require,module,exports){
"use strict";

exports.CONTEXT_KEY = exports.CONTEXT_EVENT_TYPE = exports.CONTEXT_EVENT_SOURCE = void 0;
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
var CONTEXT_KEY = exports.CONTEXT_KEY = {
  TYPE: "~type",
  SOURCE: "~source"
};
var CONTEXT_EVENT_TYPE = exports.CONTEXT_EVENT_TYPE = {
  LIFECYCLE: "com.adobe.eventType.lifecycle",
  TRACK: "com.adobe.eventType.generic.track",
  EDGE: "com.adobe.eventType.edge",
  RULES_ENGINE: "com.adobe.eventType.rulesEngine"
};
var CONTEXT_EVENT_SOURCE = exports.CONTEXT_EVENT_SOURCE = {
  LAUNCH: "com.adobe.eventSource.applicationLaunch",
  REQUEST: "com.adobe.eventSource.requestContent"
};

},{}],174:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(lifecycle) {
  return function (_ref) {
    var _ref$renderDecisions = _ref.renderDecisions,
      renderDecisions = _ref$renderDecisions === void 0 ? false : _ref$renderDecisions,
      _ref$propositions = _ref.propositions,
      propositions = _ref$propositions === void 0 ? [] : _ref$propositions,
      event = _ref.event,
      personalization = _ref.personalization;
    if (lifecycle) {
      lifecycle.onDecision({
        renderDecisions: renderDecisions,
        propositions: propositions,
        event: event,
        personalization: personalization
      });
    }
    return {
      propositions: propositions
    };
  };
};
exports["default"] = _default;

},{}],175:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _inAppMessageConsequenceAdapter = require("./consequenceAdapters/inAppMessageConsequenceAdapter.js");
var _schemaTypeConsequenceAdapter = require("./consequenceAdapters/schemaTypeConsequenceAdapter.js");
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

var CJM_IN_APP_MESSAGE_TYPE = "cjmiam";
var SCHEMA = "schema";
var adapters = _defineProperty(_defineProperty({}, CJM_IN_APP_MESSAGE_TYPE, _inAppMessageConsequenceAdapter["default"]), SCHEMA, _schemaTypeConsequenceAdapter["default"]);
var _default = function _default() {
  return function (consequence) {
    var id = consequence.id,
      type = consequence.type,
      detail = consequence.detail;
    return typeof adapters[type] === "function" ? adapters[type](id, type, detail) : detail;
  };
};
exports["default"] = _default;

},{"./consequenceAdapters/inAppMessageConsequenceAdapter.js":171,"./consequenceAdapters/schemaTypeConsequenceAdapter.js":172}],176:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var eventRegistry = _ref.eventRegistry,
    window = _ref.window,
    getBrowser = _ref.getBrowser;
  var pageLoadTimestamp = new Date().getTime();
  var getBrowserContext = function getBrowserContext() {
    return {
      name: getBrowser()
    };
  };
  var getPageContext = function getPageContext() {
    return _objectSpread({
      title: window.title,
      url: window.url
    }, (0, _parseUrl["default"])(window.url));
  };
  var getReferrerContext = function getReferrerContext() {
    return _objectSpread({
      url: window.referrer
    }, (0, _parseUrl["default"])(window.referrer));
  };
  var getTimeContext = function getTimeContext() {
    var now = new Date();
    var currentTimestamp = now.getTime();
    return {
      pageLoadTimestamp: pageLoadTimestamp,
      currentTimestamp: currentTimestamp,
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
  var getWindowContext = function getWindowContext() {
    var height = window.height;
    var width = window.width;
    var scrollY = window.scrollY;
    var scrollX = window.scrollX;
    return {
      height: height,
      width: width,
      scrollY: scrollY,
      scrollX: scrollX
    };
  };
  var coreGlobalContext = {
    browser: getBrowserContext(),
    page: getPageContext(),
    referringPage: getReferrerContext()
  };
  var getGlobalContext = function getGlobalContext() {
    return _objectSpread(_objectSpread(_objectSpread({}, coreGlobalContext), getTimeContext()), {}, {
      window: getWindowContext(),
      "~sdkver": _libraryVersion["default"]
    });
  };
  var getContext = function getContext() {
    var addedContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var context = _objectSpread(_objectSpread({}, getGlobalContext()), addedContext);
    return _objectSpread(_objectSpread({}, (0, _flattenObject["default"])(context)), {}, {
      events: eventRegistry.toJSON()
    });
  };
  return {
    getContext: getContext
  };
};
exports["default"] = _default;

},{"../../constants/libraryVersion.js":222,"../../utils/flattenObject.js":295,"../../utils/parseUrl.js":324}],177:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _propositionEventType = require("../../constants/propositionEventType.js");
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
var _default = function _default(_ref) {
  var eventRegistry = _ref.eventRegistry;
  var recordQualified = function recordQualified(id) {
    if (!id) {
      return undefined;
    }
    return eventRegistry.addEvent({}, _propositionEventType.PropositionEventType.TRIGGER, id);
  };
  return {
    recordQualified: recordQualified
  };
};
exports["default"] = _default;

},{"../../constants/propositionEventType.js":225}],178:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _createEvaluableRulesetPayload = require("./createEvaluableRulesetPayload.js");
var _createDecisionHistory = require("./createDecisionHistory.js");
var _utils = require("./utils.js");
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
var _default = function _default(_ref) {
  var eventRegistry = _ref.eventRegistry;
  var payloadsBasedOnActivityId = {};
  var decisionHistory = (0, _createDecisionHistory["default"])({
    eventRegistry: eventRegistry
  });
  var addPayload = function addPayload(payload) {
    var activityId = (0, _utils.getActivityId)(payload);
    if (!activityId) {
      return;
    }
    var evaluableRulesetPayload = (0, _createEvaluableRulesetPayload["default"])(payload, eventRegistry, decisionHistory);
    if (evaluableRulesetPayload.isEvaluable) {
      payloadsBasedOnActivityId[activityId] = evaluableRulesetPayload;
    }
  };
  var evaluate = function evaluate() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var sortedPayloadsBasedOnActivityId = Object.values(payloadsBasedOnActivityId).sort(function (_ref2, _ref3) {
      var rankA = _ref2.rank;
      var rankB = _ref3.rank;
      return rankA - rankB;
    });
    return sortedPayloadsBasedOnActivityId.map(function (payload) {
      return payload.evaluate(context);
    }).filter(function (payload) {
      return payload.items.length > 0;
    });
  };
  var addPayloads = function addPayloads(personalizationPayloads) {
    personalizationPayloads.forEach(addPayload);
  };
  return {
    addPayload: addPayload,
    addPayloads: addPayloads,
    evaluate: evaluate
  };
};
exports["default"] = _default;

},{"./createDecisionHistory.js":177,"./createEvaluableRulesetPayload.js":179,"./utils.js":185}],179:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
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

var isRulesetItem = function isRulesetItem(item) {
  var schema = item.schema,
    data = item.data;
  if (schema === _schema.RULESET_ITEM) {
    return true;
  }
  if (schema !== _schema.JSON_CONTENT_ITEM) {
    return false;
  }
  try {
    var content = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
    return content && Object.prototype.hasOwnProperty.call(content, "version") && Object.prototype.hasOwnProperty.call(content, "rules");
  } catch (_unused) {
    return false;
  }
};
var _default = function _default(payload, eventRegistry, decisionHistory) {
  var _payload$scopeDetails;
  var consequenceAdapter = (0, _createConsequenceAdapter["default"])();
  var activityId = (0, _utils.getActivityId)(payload);
  var items = [];
  var addItem = function addItem(item) {
    var _item$data = item.data,
      data = _item$data === void 0 ? {} : _item$data,
      schema = item.schema;
    var content = schema === _schema.RULESET_ITEM ? data : data.content;
    if (!content) {
      return;
    }
    items.push((0, _aepRulesEngine["default"])(typeof content === "string" ? JSON.parse(content) : content));
  };
  var evaluate = function evaluate(context) {
    var displayEvent = eventRegistry.getEvent(_eventType.DISPLAY, activityId);
    var displayedDate = displayEvent ? displayEvent.firstTimestamp : undefined;
    var qualifyingItems = (0, _flattenArray["default"])(items.map(function (item) {
      return item.execute(context);
    })).map(consequenceAdapter).map(function (item) {
      var _ref = decisionHistory.recordQualified(activityId) || {},
        qualifiedDate = _ref.firstTimestamp;
      return _objectSpread(_objectSpread({}, item), {}, {
        data: _objectSpread(_objectSpread({}, item.data), {}, {
          qualifiedDate: qualifiedDate,
          displayedDate: displayedDate
        })
      });
    });
    return _objectSpread(_objectSpread({}, payload), {}, {
      items: qualifyingItems
    });
  };
  if (Array.isArray(payload.items)) {
    payload.items.filter(isRulesetItem).forEach(addItem);
  }
  return {
    rank: (payload === null || payload === void 0 || (_payload$scopeDetails = payload.scopeDetails) === null || _payload$scopeDetails === void 0 ? void 0 : _payload$scopeDetails.rank) || Infinity,
    evaluate: evaluate,
    isEvaluable: items.length > 0
  };
};
exports["default"] = _default;

},{"../../constants/eventType.js":214,"../../constants/schema.js":228,"../../utils/flattenArray.js":294,"./createConsequenceAdapter.js":175,"./utils.js":185,"@adobe/aep-rules-engine":1}],180:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/validation/index.js");
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

var validateOptions = function validateOptions(_ref) {
  var options = _ref.options;
  var validator = (0, _index.objectOf)({
    renderDecisions: (0, _index["boolean"])(),
    personalization: (0, _index.objectOf)({
      decisionContext: (0, _index.objectOf)({})
    })
  }).noUnknownFields();
  return validator(options);
};
var _default = function _default(_ref2) {
  var contextProvider = _ref2.contextProvider,
    decisionProvider = _ref2.decisionProvider;
  var run = function run(_ref3) {
    var renderDecisions = _ref3.renderDecisions,
      decisionContext = _ref3.decisionContext,
      applyResponse = _ref3.applyResponse;
    return applyResponse({
      renderDecisions: renderDecisions,
      propositions: decisionProvider.evaluate(contextProvider.getContext(decisionContext))
    });
  };
  var optionsValidator = function optionsValidator(options) {
    return validateOptions({
      options: options
    });
  };
  return {
    optionsValidator: optionsValidator,
    run: run
  };
};
exports["default"] = _default;

},{"../../utils/validation/index.js":364}],181:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = exports.createEventPruner = void 0;
var _utils = require("./utils.js");
var _eventType = require("../../constants/eventType.js");
var _decisionProvider = require("../../constants/decisionProvider.js");
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

var STORAGE_KEY = "events";
var MAX_EVENT_RECORDS = 1000;
var RETENTION_PERIOD = 30;
var prefixed = function prefixed(key) {
  return "iam." + key;
};
var createEventPruner = function createEventPruner() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MAX_EVENT_RECORDS;
  var retentionPeriod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : RETENTION_PERIOD;
  return function (events) {
    var pruned = {};
    Object.keys(events).forEach(function (eventType) {
      pruned[eventType] = {};
      Object.values(events[eventType]).filter(function (entry) {
        return new Date(entry.firstTimestamp) >= (0, _utils.getExpirationDate)(retentionPeriod);
      }).sort(function (a, b) {
        return a.firstTimestamp - b.firstTimestamp;
      }).slice(-1 * limit).forEach(function (entry) {
        pruned[eventType][entry.event[prefixed("id")]] = entry;
      });
    });
    return pruned;
  };
};
exports.createEventPruner = createEventPruner;
var _default = function _default(_ref) {
  var storage = _ref.storage;
  var currentStorage = storage;
  var restore;
  var save;
  var events;
  var setStorage = function setStorage(newStorage) {
    currentStorage = newStorage;
    restore = (0, _utils.createRestoreStorage)(currentStorage, STORAGE_KEY);
    save = (0, _utils.createSaveStorage)(currentStorage, STORAGE_KEY, createEventPruner(MAX_EVENT_RECORDS, RETENTION_PERIOD));
    events = restore({});
  };
  setStorage(storage);
  var addEvent = function addEvent(event, eventType, eventId, action) {
    if (!eventType || !eventId) {
      return undefined;
    }
    if (!events[eventType]) {
      events[eventType] = {};
    }
    var existingEvent = events[eventType][eventId];
    var count = existingEvent ? existingEvent.count : 0;
    var timestamp = new Date().getTime();
    var firstTimestamp = existingEvent ? existingEvent.firstTimestamp || existingEvent.timestamp : timestamp;
    events[eventType][eventId] = {
      event: _objectSpread(_objectSpread({}, event), {}, _defineProperty(_defineProperty(_defineProperty({}, prefixed("id"), eventId), prefixed("eventType"), eventType), prefixed("action"), action)),
      firstTimestamp: firstTimestamp,
      timestamp: timestamp,
      count: count + 1
    };
    save(events);
    return events[eventType][eventId];
  };
  var addExperienceEdgeEvent = function addExperienceEdgeEvent(event) {
    var _event$getContent = event.getContent(),
      _event$getContent$xdm = _event$getContent.xdm,
      xdm = _event$getContent$xdm === void 0 ? {} : _event$getContent$xdm;
    var _experience = xdm._experience;
    if (!(0, _utils.hasExperienceData)(xdm)) {
      return;
    }
    var _experience$decisioni = _experience.decisioning,
      decisioning = _experience$decisioni === void 0 ? {} : _experience$decisioni;
    var _decisioning$proposit = decisioning.propositionEventType,
      propositionEventTypeObj = _decisioning$proposit === void 0 ? {} : _decisioning$proposit,
      _decisioning$proposit2 = decisioning.propositionAction,
      propositionAction = _decisioning$proposit2 === void 0 ? {} : _decisioning$proposit2,
      _decisioning$proposit3 = decisioning.propositions,
      propositions = _decisioning$proposit3 === void 0 ? [] : _decisioning$proposit3;
    var propositionEventTypesList = Object.keys(propositionEventTypeObj);

    // https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=CJM&title=Proposition+Event+Types
    if (propositionEventTypesList.length === 0) {
      return;
    }
    var validPropositionEventType = function validPropositionEventType(propositionEventType) {
      return propositionEventTypeObj[propositionEventType] === _eventType.EVENT_TYPE_TRUE;
    };
    var action = propositionAction.id;
    propositionEventTypesList.filter(validPropositionEventType).forEach(function (propositionEventType) {
      propositions.forEach(function (proposition) {
        if ((0, _utils.getDecisionProvider)(proposition) !== _decisionProvider.ADOBE_JOURNEY_OPTIMIZER) {
          return;
        }
        addEvent({}, propositionEventType, (0, _utils.getActivityId)(proposition), action);
      });
    });
  };
  var getEvent = function getEvent(eventType, eventId) {
    if (!events[eventType]) {
      return undefined;
    }
    return events[eventType][eventId];
  };
  return {
    addExperienceEdgeEvent: addExperienceEdgeEvent,
    addEvent: addEvent,
    getEvent: getEvent,
    toJSON: function toJSON() {
      return events;
    },
    setStorage: setStorage
  };
};
exports["default"] = _default;

},{"../../constants/decisionProvider.js":209,"../../constants/eventType.js":214,"./utils.js":185}],182:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _handle = require("../../constants/handle.js");
var _flattenObject = require("../../utils/flattenObject.js");
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
var _default = function _default(_ref) {
  var renderDecisions = _ref.renderDecisions,
    decisionProvider = _ref.decisionProvider,
    applyResponse = _ref.applyResponse,
    event = _ref.event,
    personalization = _ref.personalization,
    decisionContext = _ref.decisionContext;
  var context = _objectSpread(_objectSpread({}, (0, _flattenObject["default"])(event.getContent())), decisionContext);
  return function (_ref2) {
    var response = _ref2.response;
    decisionProvider.addPayloads(response.getPayloadsByType(_handle.PERSONALIZATION_DECISIONS_HANDLE));

    // only evaluate events that include a personalization query
    if (!event.hasQuery()) {
      return {
        propositions: []
      };
    }
    var propositions = decisionProvider.evaluate(context);
    return applyResponse({
      renderDecisions: renderDecisions,
      propositions: propositions,
      event: event,
      personalization: personalization
    });
  };
};
exports["default"] = _default;

},{"../../constants/handle.js":215,"../../utils/flattenObject.js":295}],183:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _index = require("../../utils/validation/index.js");
var _createSubscription = require("../../utils/createSubscription.js");
var _propositionEventType = require("../../constants/propositionEventType.js");
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

var validateOptions = function validateOptions(_ref) {
  var options = _ref.options;
  var validator = (0, _index.objectOf)({
    surfaces: (0, _index.arrayOf)((0, _index.string)()).uniqueItems(),
    schemas: (0, _index.arrayOf)((0, _index.string)()).uniqueItems(),
    callback: (0, _index.callback)().required()
  }).noUnknownFields();
  return validator(options);
};
var getAnalyticsDetail = function getAnalyticsDetail(proposition) {
  var id = proposition.id,
    scope = proposition.scope,
    scopeDetails = proposition.scopeDetails;
  return {
    id: id,
    scope: scope,
    scopeDetails: scopeDetails
  };
};
var _default = function _default(_ref2) {
  var collect = _ref2.collect;
  var emitPropositions = function emitPropositions() {
    return undefined;
  };
  var collectedEventsThisSession = new Set();
  var shouldAlwaysCollect = function shouldAlwaysCollect(propositionEventType) {
    return [_propositionEventType.PropositionEventType.INTERACT, _propositionEventType.PropositionEventType.DISMISS].includes(propositionEventType);
  };
  var shouldCollect = function shouldCollect(propositionEventType, analyticsMetaId, collectedEventsThisRequest) {
    var eventId = [propositionEventType, analyticsMetaId].join("-");
    var result = !collectedEventsThisRequest.has(eventId) && (shouldAlwaysCollect(propositionEventType) || !collectedEventsThisSession.has(eventId));
    collectedEventsThisRequest.add(eventId);
    collectedEventsThisSession.add(eventId);
    return result;
  };
  var collectEvent = function collectEvent(propositionEventType) {
    var propositions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (!(propositions instanceof Array)) {
      return Promise.resolve();
    }
    if (!Object.values(_propositionEventType.PropositionEventType).includes(propositionEventType)) {
      return Promise.resolve();
    }
    var decisionsMeta = [];
    var collectedEventsThisRequest = new Set();
    propositions.forEach(function (proposition) {
      var analyticsMeta = getAnalyticsDetail(proposition);
      if (!shouldCollect(propositionEventType, analyticsMeta.id, collectedEventsThisRequest)) {
        return;
      }
      decisionsMeta.push(analyticsMeta);
    });
    return decisionsMeta.length > 0 ? collect({
      decisionsMeta: decisionsMeta,
      eventType: (0, _propositionEventType.getEventType)(propositionEventType),
      documentMayUnload: true
    }) : Promise.resolve();
  };
  var subscriptions = (0, _createSubscription["default"])();
  var emissionPreprocessor = function emissionPreprocessor(params, propositions) {
    var surfacesFilter = params.surfacesFilter,
      schemasFilter = params.schemasFilter;
    var result = {
      propositions: propositions.filter(function (payload) {
        return surfacesFilter ? surfacesFilter.includes(payload.scope) : true;
      }).map(function (payload) {
        var _payload$items = payload.items,
          items = _payload$items === void 0 ? [] : _payload$items;
        return _objectSpread(_objectSpread({}, payload), {}, {
          items: items.filter(function (item) {
            return schemasFilter ? schemasFilter.includes(item.schema) : true;
          })
        });
      }).filter(function (payload) {
        return payload.items.length > 0;
      })
    };
    return [result, collectEvent];
  };
  subscriptions.setEmissionPreprocessor(emissionPreprocessor);
  var run = function run(_ref3) {
    var surfaces = _ref3.surfaces,
      schemas = _ref3.schemas,
      callback = _ref3.callback;
    var _subscriptions$add = subscriptions.add(callback, {
        surfacesFilter: surfaces instanceof Array ? surfaces : undefined,
        schemasFilter: schemas instanceof Array ? schemas : undefined
      }),
      id = _subscriptions$add.id,
      unsubscribe = _subscriptions$add.unsubscribe;
    emitPropositions(id);
    return Promise.resolve({
      unsubscribe: unsubscribe
    });
  };
  var optionsValidator = function optionsValidator(options) {
    return validateOptions({
      options: options
    });
  };
  var refresh = function refresh(propositions) {
    emitPropositions = function emitPropositions(subscriptionId) {
      if (subscriptionId) {
        subscriptions.emitOne(subscriptionId, propositions);
        return;
      }
      subscriptions.emit(propositions);
    };
    emitPropositions();
  };
  return {
    refresh: refresh,
    command: {
      optionsValidator: optionsValidator,
      run: run
    }
  };
};
exports["default"] = _default;

},{"../../constants/propositionEventType.js":225,"../../utils/createSubscription.js":275,"../../utils/validation/index.js":364}],184:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _createOnResponseHandler = require("./createOnResponseHandler.js");
var _createDecisionProvider = require("./createDecisionProvider.js");
var _createApplyResponse = require("./createApplyResponse.js");
var _createEventRegistry = require("./createEventRegistry.js");
var _createContextProvider = require("./createContextProvider.js");
var _createSubscribeRulesetItems = require("./createSubscribeRulesetItems.js");
var _constants = require("./constants.js");
var _createEvaluateRulesetsCommand = require("./createEvaluateRulesetsCommand.js");
var _utils = require("./utils.js");
var _index2 = require("../../utils/validation/index.js");
var _createCollect = require("../../utils/createCollect.js");
var _event = require("../../utils/event.js");
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

var createRulesEngine = function createRulesEngine(_ref) {
  var config = _ref.config,
    eventManager = _ref.eventManager,
    createNamespacedStorage = _ref.createNamespacedStorage,
    consent = _ref.consent,
    getBrowser = _ref.getBrowser;
  var orgId = config.orgId,
    personalizationStorageEnabled = config.personalizationStorageEnabled;
  var collect = (0, _createCollect["default"])({
    eventManager: eventManager,
    mergeDecisionsMeta: _event.mergeDecisionsMeta
  });
  var storage = createNamespacedStorage((0, _index.sanitizeOrgIdForCookieName)(orgId) + ".decisioning.");
  if (!personalizationStorageEnabled) {
    (0, _utils.clearLocalStorage)(storage.persistent);
  }
  var eventRegistry = (0, _createEventRegistry["default"])({
    storage: (0, _utils.createInMemoryStorage)()
  });
  var decisionProvider = (0, _createDecisionProvider["default"])({
    eventRegistry: eventRegistry
  });
  var contextProvider = (0, _createContextProvider["default"])({
    eventRegistry: eventRegistry,
    window: window,
    getBrowser: getBrowser
  });
  var evaluateRulesetsCommand = (0, _createEvaluateRulesetsCommand["default"])({
    contextProvider: contextProvider,
    decisionProvider: decisionProvider
  });
  var subscribeRulesetItems = (0, _createSubscribeRulesetItems["default"])({
    collect: collect
  });
  var applyResponse;
  return {
    lifecycle: {
      onDecision: function onDecision(_ref2) {
        var propositions = _ref2.propositions;
        subscribeRulesetItems.refresh(propositions);
      },
      onComponentsRegistered: function onComponentsRegistered(tools) {
        applyResponse = (0, _createApplyResponse["default"])(tools.lifecycle);
        if (personalizationStorageEnabled) {
          consent.awaitConsent().then(function () {
            eventRegistry.setStorage(storage.persistent);
          })["catch"](function () {
            if (storage) {
              (0, _utils.clearLocalStorage)(storage.persistent);
            }
          });
        }
      },
      onBeforeEvent: function onBeforeEvent(_ref3) {
        var event = _ref3.event,
          renderDecisions = _ref3.renderDecisions,
          _ref3$personalization = _ref3.personalization,
          personalization = _ref3$personalization === void 0 ? {} : _ref3$personalization,
          _ref3$onResponse = _ref3.onResponse,
          onResponse = _ref3$onResponse === void 0 ? _index.noop : _ref3$onResponse;
        var _personalization$deci = personalization.decisionContext,
          decisionContext = _personalization$deci === void 0 ? {} : _personalization$deci;
        onResponse((0, _createOnResponseHandler["default"])({
          renderDecisions: renderDecisions,
          decisionProvider: decisionProvider,
          applyResponse: applyResponse,
          event: event,
          personalization: personalization,
          decisionContext: contextProvider.getContext(_objectSpread(_defineProperty(_defineProperty({}, _constants.CONTEXT_KEY.TYPE, _constants.CONTEXT_EVENT_TYPE.EDGE), _constants.CONTEXT_KEY.SOURCE, _constants.CONTEXT_EVENT_SOURCE.REQUEST), decisionContext))
        }));
      },
      onBeforeRequest: function onBeforeRequest(_ref4) {
        var request = _ref4.request;
        var payload = request.getPayload().toJSON();
        var _payload$events = payload.events,
          events = _payload$events === void 0 ? [] : _payload$events;
        if (events.length === 0) {
          return;
        }
        events.forEach(function (event) {
          return eventRegistry.addExperienceEdgeEvent(event);
        });
      }
    },
    commands: {
      evaluateRulesets: {
        run: function run(_ref5) {
          var renderDecisions = _ref5.renderDecisions,
            _ref5$personalization = _ref5.personalization,
            personalization = _ref5$personalization === void 0 ? {} : _ref5$personalization;
          var _personalization$deci2 = personalization.decisionContext,
            decisionContext = _personalization$deci2 === void 0 ? {} : _personalization$deci2;
          return evaluateRulesetsCommand.run({
            renderDecisions: renderDecisions,
            decisionContext: _objectSpread(_defineProperty(_defineProperty({}, _constants.CONTEXT_KEY.TYPE, _constants.CONTEXT_EVENT_TYPE.RULES_ENGINE), _constants.CONTEXT_KEY.SOURCE, _constants.CONTEXT_EVENT_SOURCE.REQUEST), decisionContext),
            applyResponse: applyResponse
          });
        },
        optionsValidator: evaluateRulesetsCommand.optionsValidator
      },
      subscribeRulesetItems: subscribeRulesetItems.command
    }
  };
};
createRulesEngine.namespace = "RulesEngine";
createRulesEngine.configValidators = (0, _index2.objectOf)({
  personalizationStorageEnabled: (0, _index2["boolean"])()["default"](false)
});
var _default = exports["default"] = createRulesEngine;

},{"../../utils/createCollect.js":272,"../../utils/event.js":291,"../../utils/index.js":300,"../../utils/validation/index.js":364,"./constants.js":173,"./createApplyResponse.js":174,"./createContextProvider.js":176,"./createDecisionProvider.js":178,"./createEvaluateRulesetsCommand.js":180,"./createEventRegistry.js":181,"./createOnResponseHandler.js":182,"./createSubscribeRulesetItems.js":183,"./utils.js":185}],185:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
exports.hasExperienceData = exports.getExpirationDate = exports.getDecisionProvider = exports.getActivityId = exports.createSaveStorage = exports.createRestoreStorage = exports.createInMemoryStorage = exports.clearLocalStorage = void 0;
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

var createRestoreStorage = function createRestoreStorage(storage, storageKey) {
  return function (defaultValue) {
    var stored = storage.getItem(storageKey);
    if (!stored) {
      return defaultValue;
    }
    try {
      return JSON.parse(stored);
    } catch (_unused) {
      return defaultValue;
    }
  };
};
exports.createRestoreStorage = createRestoreStorage;
var createSaveStorage = function createSaveStorage(storage, storageKey) {
  var prepareFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (value) {
    return value;
  };
  return function (value) {
    storage.setItem(storageKey, JSON.stringify(prepareFn(value)));
  };
};
exports.createSaveStorage = createSaveStorage;
var getExpirationDate = function getExpirationDate(retentionPeriod) {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() - retentionPeriod);
  return expirationDate;
};
exports.getExpirationDate = getExpirationDate;
var getActivityId = function getActivityId(proposition) {
  var _proposition$scopeDet = proposition.scopeDetails,
    scopeDetails = _proposition$scopeDet === void 0 ? {} : _proposition$scopeDet;
  var _scopeDetails$activit = scopeDetails.activity,
    activity = _scopeDetails$activit === void 0 ? {} : _scopeDetails$activit;
  var id = activity.id;
  return id;
};
exports.getActivityId = getActivityId;
var createInMemoryStorage = function createInMemoryStorage() {
  var inMemoryStorage = {};
  return {
    getItem: function getItem(key) {
      return key in inMemoryStorage ? inMemoryStorage[key] : null;
    },
    setItem: function setItem(key, value) {
      inMemoryStorage[key] = value;
    }
  };
};
exports.createInMemoryStorage = createInMemoryStorage;
var clearLocalStorage = function clearLocalStorage(storage) {
  storage.clear();
};
exports.clearLocalStorage = clearLocalStorage;
var hasExperienceData = function hasExperienceData() {
  var xdm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _experience = xdm._experience;
  return !(!_experience || _typeof(_experience) !== "object");
};
exports.hasExperienceData = hasExperienceData;
var getDecisionProvider = function getDecisionProvider(proposition) {
  var _proposition$scopeDet2 = proposition.scopeDetails,
    scopeDetails = _proposition$scopeDet2 === void 0 ? {} : _proposition$scopeDet2;
  var decisionProvider = scopeDetails.decisionProvider;
  return decisionProvider;
};
exports.getDecisionProvider = getDecisionProvider;

},{}],186:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/validation/index.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = exports["default"] = (0, _index.objectOf)({
  streamingMedia: (0, _index.objectOf)({
    channel: (0, _index.string)().nonEmpty().required(),
    playerName: (0, _index.string)().nonEmpty().required(),
    appVersion: (0, _index.string)(),
    mainPingInterval: (0, _index.number)().minimum(10).maximum(50)["default"](10),
    adPingInterval: (0, _index.number)().minimum(1).maximum(10)["default"](10)
  }).noUnknownFields()
});

},{"../../utils/validation/index.js":364}],187:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = exports["default"] = {
  PAUSE: "media.pauseStart",
  PLAY: "media.play",
  BUFFER_START: "media.bufferStart",
  AD_START: "media.adStart",
  Ad_BREAK_START: "media.adBreakStart",
  SESSION_END: "media.sessionEnd",
  SESSION_START: "media.sessionStart",
  SESSION_COMPLETE: "media.sessionComplete",
  PING: "media.ping",
  AD_BREAK_COMPLETE: "media.adBreakComplete",
  AD_COMPLETE: "media.adComplete",
  AD_SKIP: "media.adSkip",
  BITRATE_CHANGE: "media.bitrateChange",
  CHAPTER_COMPLETE: "media.chapterComplete",
  CHAPTER_SKIP: "media.chapterSkip",
  CHAPTER_START: "media.chapterStart",
  ERROR: "media.error",
  STATES_UPDATE: "media.statesUpdate"
};

},{}],188:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = exports["default"] = {
  MAIN: "main",
  AD: "ad",
  COMPLETED: "completed"
};

},{}],189:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _eventTypes = require("./constants/eventTypes.js");
var _createMediaRequest = require("./createMediaRequest.js");
var _index = require("../../utils/index.js");
var _index2 = require("../../utils/request/index.js");
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
var _default = function _default(_ref) {
  var config = _ref.config,
    eventManager = _ref.eventManager,
    consent = _ref.consent,
    sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest,
    setTimestamp = _ref.setTimestamp;
  return {
    createMediaEvent: function createMediaEvent(_ref2) {
      var options = _ref2.options;
      var event = eventManager.createEvent();
      var xdm = options.xdm;
      setTimestamp(xdm);
      event.setUserXdm(xdm);
      if (xdm.eventType === _eventTypes["default"].AD_START) {
        var advertisingDetails = options.xdm.mediaCollection.advertisingDetails;
        event.mergeXdm({
          mediaCollection: {
            advertisingDetails: {
              playerName: advertisingDetails.playerName || config.streamingMedia.playerName
            }
          }
        });
      }
      return event;
    },
    createMediaSession: function createMediaSession(options) {
      var _config$streamingMedi = config.streamingMedia,
        playerName = _config$streamingMedi.playerName,
        channel = _config$streamingMedi.channel,
        appVersion = _config$streamingMedi.appVersion;
      var event = eventManager.createEvent();
      var sessionDetails = options.xdm.mediaCollection.sessionDetails;
      event.setUserXdm(options.xdm);
      event.mergeXdm({
        eventType: _eventTypes["default"].SESSION_START,
        mediaCollection: {
          sessionDetails: {
            playerName: sessionDetails.playerName || playerName,
            channel: sessionDetails.channel || channel,
            appVersion: sessionDetails.appVersion || appVersion
          }
        }
      });
      return event;
    },
    augmentMediaEvent: function augmentMediaEvent(_ref3) {
      var event = _ref3.event,
        playerId = _ref3.playerId,
        getPlayerDetails = _ref3.getPlayerDetails,
        sessionID = _ref3.sessionID;
      if (!playerId || !getPlayerDetails) {
        return event;
      }
      var _getPlayerDetails = getPlayerDetails({
          playerId: playerId
        }),
        playhead = _getPlayerDetails.playhead,
        qoeDataDetails = _getPlayerDetails.qoeDataDetails;
      event.mergeXdm({
        mediaCollection: {
          playhead: (0, _index.toInteger)(playhead),
          qoeDataDetails: qoeDataDetails,
          sessionID: sessionID
        }
      });
      return event;
    },
    trackMediaSession: function trackMediaSession(_ref4) {
      var event = _ref4.event,
        mediaOptions = _ref4.mediaOptions,
        edgeConfigOverrides = _ref4.edgeConfigOverrides;
      var sendEventOptions = {
        mediaOptions: mediaOptions,
        edgeConfigOverrides: edgeConfigOverrides
      };
      return eventManager.sendEvent(event, sendEventOptions);
    },
    trackMediaEvent: function trackMediaEvent(_ref5) {
      var event = _ref5.event,
        action = _ref5.action;
      var mediaRequestPayload = (0, _index2.createDataCollectionRequestPayload)();
      var request = (0, _createMediaRequest["default"])({
        mediaRequestPayload: mediaRequestPayload,
        action: action
      });
      mediaRequestPayload.addEvent(event);
      event.finalize();
      return consent.awaitConsent().then(function () {
        return sendEdgeNetworkRequest({
          request: request
        }).then(function () {
          return {};
        });
      });
    }
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300,"../../utils/request/index.js":335,"./constants/eventTypes.js":187,"./createMediaRequest.js":190}],190:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/request/index.js");
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
var _default = function _default(_ref) {
  var mediaRequestPayload = _ref.mediaRequestPayload,
    action = _ref.action;
  return (0, _index.createRequest)({
    payload: mediaRequestPayload,
    edgeSubPath: "/va",
    getAction: function getAction() {
      return action;
    },
    getUseSendBeacon: function getUseSendBeacon() {
      return false;
    }
  });
};
exports["default"] = _default;

},{"../../utils/request/index.js":335}],191:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isBlankString = require("../../utils/isBlankString.js");
var _eventTypes = require("./constants/eventTypes.js");
var _index = require("../../utils/index.js");
var _playbackState = require("./constants/playbackState.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var mediaSessionCacheManager = _ref.mediaSessionCacheManager,
    config = _ref.config,
    trackMediaEvent = _ref.trackMediaEvent;
  return function (_ref2) {
    var response = _ref2.response,
      playerId = _ref2.playerId,
      getPlayerDetails = _ref2.getPlayerDetails;
    var mediaPayload = response.getPayloadsByType("media-analytics:new-session");
    if ((0, _index.isNonEmptyArray)(mediaPayload)) {
      var sessionId = mediaPayload[0].sessionId;
      if ((0, _isBlankString["default"])(sessionId)) {
        return {};
      }
      if (!playerId || !getPlayerDetails) {
        return {
          sessionId: sessionId
        };
      }
      var pingId = setTimeout(function () {
        trackMediaEvent({
          playerId: playerId,
          xdm: {
            eventType: _eventTypes["default"].PING
          }
        });
      }, config.streamingMedia.mainPingInterval * 1000);
      mediaSessionCacheManager.savePing({
        playerId: playerId,
        pingId: pingId,
        playbackState: _playbackState["default"].MAIN
      });
      return {
        sessionId: sessionId
      };
    }
    return {};
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300,"../../utils/isBlankString.js":307,"./constants/eventTypes.js":187,"./constants/playbackState.js":188}],192:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _playbackState = require("./constants/playbackState.js");
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
var _default = function _default() {
  var mediaSessionCache;
  var getSession = function getSession(playerId) {
    return mediaSessionCache[playerId] || {};
  };
  var savePing = function savePing(_ref) {
    var playerId = _ref.playerId,
      pingId = _ref.pingId,
      playbackState = _ref.playbackState;
    if (!mediaSessionCache[playerId]) {
      return;
    }
    if (mediaSessionCache[playerId].pingId) {
      clearTimeout(mediaSessionCache[playerId].pingId);
    }
    mediaSessionCache[playerId].pingId = pingId;
    mediaSessionCache[playerId].playbackState = playbackState;
  };
  var stopPing = function stopPing(_ref2) {
    var playerId = _ref2.playerId;
    var sessionDetails = mediaSessionCache[playerId];
    if (!sessionDetails) {
      return;
    }
    clearTimeout(sessionDetails.pingId);
    sessionDetails.pingId = null;
    sessionDetails.playbackState = _playbackState["default"].COMPLETED;
  };
  var storeSession = function storeSession(_ref3) {
    var playerId = _ref3.playerId,
      sessionDetails = _ref3.sessionDetails;
    if (mediaSessionCache === undefined) {
      mediaSessionCache = {};
    }
    mediaSessionCache[playerId] = sessionDetails;
  };
  return {
    getSession: getSession,
    storeSession: storeSession,
    stopPing: stopPing,
    savePing: savePing
  };
};
exports["default"] = _default;

},{"./constants/playbackState.js":188}],193:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _validateMediaSessionOptions = require("./validateMediaSessionOptions.js");
var _validateMediaEventOptions = require("./validateMediaEventOptions.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var config = _ref.config,
    trackMediaEvent = _ref.trackMediaEvent,
    trackMediaSession = _ref.trackMediaSession,
    mediaResponseHandler = _ref.mediaResponseHandler;
  return {
    lifecycle: {
      onBeforeEvent: function onBeforeEvent(_ref2) {
        var mediaOptions = _ref2.mediaOptions,
          _ref2$onResponse = _ref2.onResponse,
          onResponse = _ref2$onResponse === void 0 ? _index.noop : _ref2$onResponse;
        if (!mediaOptions) {
          return;
        }
        var legacy = mediaOptions.legacy,
          playerId = mediaOptions.playerId,
          getPlayerDetails = mediaOptions.getPlayerDetails;
        if (legacy) {
          return;
        }
        onResponse(function (_ref3) {
          var response = _ref3.response;
          return mediaResponseHandler({
            playerId: playerId,
            getPlayerDetails: getPlayerDetails,
            response: response
          });
        });
      }
    },
    commands: {
      createMediaSession: {
        optionsValidator: function optionsValidator(options) {
          return (0, _validateMediaSessionOptions["default"])({
            options: options
          });
        },
        run: trackMediaSession
      },
      sendMediaEvent: {
        optionsValidator: function optionsValidator(options) {
          return (0, _validateMediaEventOptions["default"])({
            options: options
          });
        },
        run: function run(options) {
          if (!config.streamingMedia) {
            return Promise.reject(new Error("Streaming media is not configured."));
          }
          return trackMediaEvent(options);
        }
      }
    }
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300,"./validateMediaEventOptions.js":197,"./validateMediaSessionOptions.js":198}],194:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _eventTypes = require("./constants/eventTypes.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var getContentState = function getContentState(eventType, sessionContentState) {
  if (eventType === _eventTypes["default"].AD_START || eventType === _eventTypes["default"].Ad_BREAK_START || eventType === _eventTypes["default"].AD_SKIP || eventType === _eventTypes["default"].AD_COMPLETE) {
    return "ad";
  }
  if (eventType === _eventTypes["default"].AD_BREAK_COMPLETE || eventType === _eventTypes["default"].CHAPTER_COMPLETE || eventType === _eventTypes["default"].CHAPTER_START || eventType === _eventTypes["default"].CHAPTER_SKIP || eventType === _eventTypes["default"].SESSION_START) {
    return "main";
  }
  if (eventType === _eventTypes["default"].SESSION_END || eventType === _eventTypes["default"].SESSION_COMPLETE) {
    return "completed";
  }
  return sessionContentState;
};
var _default = function _default(_ref) {
  var mediaEventManager = _ref.mediaEventManager,
    mediaSessionCacheManager = _ref.mediaSessionCacheManager,
    config = _ref.config;
  var _sendMediaEvent = function sendMediaEvent(options) {
    var event = mediaEventManager.createMediaEvent({
      options: options
    });
    var playerId = options.playerId,
      xdm = options.xdm;
    var eventType = xdm.eventType;
    var action = eventType.split(".")[1];
    var _mediaSessionCacheMan = mediaSessionCacheManager.getSession(playerId),
      getPlayerDetails = _mediaSessionCacheMan.getPlayerDetails,
      sessionPromise = _mediaSessionCacheMan.sessionPromise,
      playbackState = _mediaSessionCacheMan.playbackState;
    return sessionPromise.then(function (result) {
      if (!result.sessionId) {
        return Promise.reject(new Error("Failed to trigger media event: " + eventType + ". Session ID is not available for playerId: " + playerId + "."));
      }
      mediaEventManager.augmentMediaEvent({
        event: event,
        eventType: eventType,
        playerId: playerId,
        getPlayerDetails: getPlayerDetails,
        sessionID: result.sessionId
      });
      return mediaEventManager.trackMediaEvent({
        event: event,
        action: action
      }).then(function () {
        if (playerId) {
          if (eventType === _eventTypes["default"].SESSION_COMPLETE || eventType === _eventTypes["default"].SESSION_END) {
            mediaSessionCacheManager.stopPing({
              playerId: playerId
            });
          } else {
            var sessionPlaybackState = getContentState(eventType, playbackState);
            if (sessionPlaybackState === "completed") {
              return;
            }
            var interval = sessionPlaybackState === "ad" ? config.streamingMedia.adPingInterval : config.streamingMedia.mainPingInterval;
            var pingId = setTimeout(function () {
              var pingOptions = {
                playerId: playerId,
                xdm: {
                  eventType: _eventTypes["default"].PING
                }
              };
              _sendMediaEvent(pingOptions);
            }, interval * 1000);
            mediaSessionCacheManager.savePing({
              playerId: playerId,
              pingId: pingId,
              playbackState: sessionPlaybackState
            });
          }
        }
      });
    });
  };
  return function (options) {
    return _sendMediaEvent(options);
  };
};
exports["default"] = _default;

},{"./constants/eventTypes.js":187}],195:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _playbackState = require("./constants/playbackState.js");
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var config = _ref.config,
    mediaEventManager = _ref.mediaEventManager,
    mediaSessionCacheManager = _ref.mediaSessionCacheManager,
    _ref$legacy = _ref.legacy,
    legacy = _ref$legacy === void 0 ? false : _ref$legacy;
  return function (options) {
    if (!config.streamingMedia) {
      return Promise.reject(new Error("Streaming media is not configured."));
    }
    var playerId = options.playerId,
      getPlayerDetails = options.getPlayerDetails,
      edgeConfigOverrides = options.edgeConfigOverrides;
    var event = mediaEventManager.createMediaSession(options);
    mediaEventManager.augmentMediaEvent({
      event: event,
      playerId: playerId,
      getPlayerDetails: getPlayerDetails
    });
    var sessionPromise = mediaEventManager.trackMediaSession({
      event: event,
      mediaOptions: {
        playerId: playerId,
        getPlayerDetails: getPlayerDetails,
        legacy: legacy
      },
      edgeConfigOverrides: edgeConfigOverrides
    });
    mediaSessionCacheManager.storeSession({
      playerId: playerId,
      sessionDetails: {
        sessionPromise: sessionPromise,
        getPlayerDetails: getPlayerDetails,
        playbackState: _playbackState["default"].MAIN
      }
    });
    return sessionPromise;
  };
};
exports["default"] = _default;

},{"./constants/playbackState.js":188}],196:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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

var createStreamingMedia = function createStreamingMedia(_ref) {
  var config = _ref.config,
    logger = _ref.logger,
    eventManager = _ref.eventManager,
    sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest,
    consent = _ref.consent;
  var mediaSessionCacheManager = (0, _createMediaSessionCacheManager["default"])({
    config: config
  });
  var mediaEventManager = (0, _createMediaEventManager["default"])({
    config: config,
    eventManager: eventManager,
    logger: logger,
    consent: consent,
    sendEdgeNetworkRequest: sendEdgeNetworkRequest,
    setTimestamp: (0, _injectTimestamp["default"])(function () {
      return new Date();
    })
  });
  var trackMediaEvent = (0, _createTrackMediaEvent["default"])({
    mediaSessionCacheManager: mediaSessionCacheManager,
    mediaEventManager: mediaEventManager,
    config: config
  });
  var trackMediaSession = (0, _createTrackMediaSession["default"])({
    config: config,
    mediaEventManager: mediaEventManager,
    mediaSessionCacheManager: mediaSessionCacheManager
  });
  var mediaResponseHandler = (0, _createMediaResponseHandler["default"])({
    mediaSessionCacheManager: mediaSessionCacheManager,
    config: config,
    trackMediaEvent: trackMediaEvent
  });
  return (0, _createStreamingMediaComponent["default"])({
    config: config,
    trackMediaEvent: trackMediaEvent,
    mediaEventManager: mediaEventManager,
    mediaResponseHandler: mediaResponseHandler,
    trackMediaSession: trackMediaSession
  });
};
createStreamingMedia.namespace = "Streaming media";
createStreamingMedia.configValidators = _configValidators["default"];
var _default = exports["default"] = createStreamingMedia;

},{"../Context/injectTimestamp.js":53,"./configValidators.js":186,"./createMediaEventManager.js":189,"./createMediaResponseHandler.js":191,"./createMediaSessionCacheManager.js":192,"./createStreamingMediaComponent.js":193,"./createTrackMediaEvent.js":194,"./createTrackMediaSession.js":195}],197:[function(require,module,exports){
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
exports["default"] = void 0;
var _index = require("../../utils/validation/index.js");
var _eventTypes = require("./constants/eventTypes.js");
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
var _default = function _default(_ref) {
  var options = _ref.options;
  var validator = (0, _index.anyOf)([(0, _index.objectOf)({
    playerId: (0, _index.string)().required(),
    xdm: (0, _index.objectOf)({
      eventType: (0, _index.enumOf).apply(void 0, _toConsumableArray(Object.values(_eventTypes["default"]))).required(),
      mediaCollection: (0, _index.objectOf)((0, _index.anything)())
    }).required()
  }).required(), (0, _index.objectOf)({
    xdm: (0, _index.objectOf)({
      eventType: (0, _index.enumOf).apply(void 0, _toConsumableArray(Object.values(_eventTypes["default"]))).required(),
      mediaCollection: (0, _index.objectOf)({
        playhead: (0, _index.number)().integer().required(),
        sessionID: (0, _index.string)().required()
      }).required()
    }).required()
  }).required()], "Error validating the sendMediaEvent command options.");
  return validator(options);
};
exports["default"] = _default;

},{"../../utils/validation/index.js":364,"./constants/eventTypes.js":187}],198:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/validation/index.js");
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
var _default = function _default(_ref) {
  var options = _ref.options;
  var sessionValidator = (0, _index.anyOf)([(0, _index.objectOf)({
    playerId: (0, _index.string)().required(),
    getPlayerDetails: (0, _index.callback)().required(),
    xdm: (0, _index.objectOf)({
      mediaCollection: (0, _index.objectOf)({
        sessionDetails: (0, _index.objectOf)((0, _index.anything)()).required()
      })
    }),
    edgeConfigOverrides: (0, _index.objectOf)({})
  }).required(), (0, _index.objectOf)({
    xdm: (0, _index.objectOf)({
      mediaCollection: (0, _index.objectOf)({
        playhead: (0, _index.number)().required(),
        sessionDetails: (0, _index.objectOf)((0, _index.anything)()).required()
      })
    }),
    edgeConfigOverrides: (0, _index.objectOf)({})
  }).required()], "Error validating the createMediaSession command options.");
  return sessionValidator(options);
};
exports["default"] = _default;

},{"../../utils/validation/index.js":364}],199:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = exports["default"] = "v1";

},{}],200:[function(require,module,exports){
"use strict";

exports.UNKNOWN = exports.SAFARI = exports.IE = exports.FIREFOX = exports.EDGE_CHROMIUM = exports.EDGE = exports.CHROME = void 0;
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

var CHROME = exports.CHROME = "Chrome";
var EDGE = exports.EDGE = "Edge";
var EDGE_CHROMIUM = exports.EDGE_CHROMIUM = "EdgeChromium";
var FIREFOX = exports.FIREFOX = "Firefox";
var IE = exports.IE = "IE";
var SAFARI = exports.SAFARI = "Safari";
var UNKNOWN = exports.UNKNOWN = "Unknown";

},{}],201:[function(require,module,exports){
"use strict";

exports.GENERAL = void 0;
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

var GENERAL = exports.GENERAL = "general";

},{}],202:[function(require,module,exports){
"use strict";

exports.PENDING = exports.OUT = exports.IN = void 0;
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

var IN = exports.IN = "in";
var OUT = exports.OUT = "out";
var PENDING = exports.PENDING = "pending";

},{}],203:[function(require,module,exports){
"use strict";

exports.TEXT_HTML = exports.APPLICATION_JSON = void 0;
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
var TEXT_HTML = exports.TEXT_HTML = "text/html";
var APPLICATION_JSON = exports.APPLICATION_JSON = "application/json";

},{}],204:[function(require,module,exports){
"use strict";

exports.IDENTITY = exports.CONSENT = exports.CLUSTER = void 0;
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

var IDENTITY = exports.IDENTITY = "identity";
var CONSENT = exports.CONSENT = "consent";
var CLUSTER = exports.CLUSTER = "cluster";

},{}],205:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
// Remember to also incorporate the org ID wherever cookies are read or written.
var _default = exports["default"] = "kndctr";

},{}],206:[function(require,module,exports){
"use strict";

exports.SET_DEBUG = exports.CONFIGURE = void 0;
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

var CONFIGURE = exports.CONFIGURE = "configure";
var SET_DEBUG = exports.SET_DEBUG = "setDebug";

},{}],207:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = exports["default"] = "CORE";

},{}],208:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = exports["default"] = "alloy_debug";

},{}],209:[function(require,module,exports){
"use strict";

exports.PERSONALIZATION_DECISIONS_HANDLE = exports.ADOBE_TARGET = exports.ADOBE_JOURNEY_OPTIMIZER = void 0;
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
var PERSONALIZATION_DECISIONS_HANDLE = exports.PERSONALIZATION_DECISIONS_HANDLE = "personalization:decisions";
var ADOBE_JOURNEY_OPTIMIZER = exports.ADOBE_JOURNEY_OPTIMIZER = "AJO";
var ADOBE_TARGET = exports.ADOBE_TARGET = "TGT";

},{}],210:[function(require,module,exports){
"use strict";

exports.ID_THIRD_PARTY = exports.EDGE = void 0;
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

var EDGE = exports.EDGE = "edge.adobedc.net";
var ID_THIRD_PARTY = exports.ID_THIRD_PARTY = "adobedc.demdex.net";

},{}],211:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = exports["default"] = "ECID";

},{}],212:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = exports["default"] = "ee";

},{}],213:[function(require,module,exports){
"use strict";

exports.SRC = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var SRC = exports.SRC = "src";

},{}],214:[function(require,module,exports){
"use strict";

exports.TRIGGER = exports.SUPPRESS = exports.INTERACT = exports.EVENT_TYPE_TRUE = exports.DISPLAY = exports.DISMISS = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var DISPLAY = exports.DISPLAY = "decisioning.propositionDisplay";
var INTERACT = exports.INTERACT = "decisioning.propositionInteract";
var TRIGGER = exports.TRIGGER = "decisioning.propositionTrigger";
var DISMISS = exports.DISMISS = "decisioning.propositionDismiss";
var SUPPRESS = exports.SUPPRESS = "decisioning.propositionSuppressDisplay";
var EVENT_TYPE_TRUE = exports.EVENT_TYPE_TRUE = 1;

},{}],215:[function(require,module,exports){
"use strict";

exports.PERSONALIZATION_DECISIONS_HANDLE = void 0;
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
var PERSONALIZATION_DECISIONS_HANDLE = exports.PERSONALIZATION_DECISIONS_HANDLE = "personalization:decisions";

},{}],216:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = exports["default"] = [["architecture", "string"], ["bitness", "string"], ["model", "string"], ["platformVersion", "string"], ["wow64", "boolean"]];

},{}],217:[function(require,module,exports){
"use strict";

exports.RETRY_AFTER = exports.ADOBE_EDGE = void 0;
/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var RETRY_AFTER = exports.RETRY_AFTER = "Retry-After";
var ADOBE_EDGE = exports.ADOBE_EDGE = "x-adobe-edge";

},{}],218:[function(require,module,exports){
"use strict";

exports.TOO_MANY_REQUESTS = exports.SERVICE_UNAVAILABLE = exports.NO_CONTENT = exports.GATEWAY_TIMEOUT = exports.BAD_GATEWAY = void 0;
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

var NO_CONTENT = exports.NO_CONTENT = 204;
var TOO_MANY_REQUESTS = exports.TOO_MANY_REQUESTS = 429;
var BAD_GATEWAY = exports.BAD_GATEWAY = 502;
var SERVICE_UNAVAILABLE = exports.SERVICE_UNAVAILABLE = 503;
var GATEWAY_TIMEOUT = exports.GATEWAY_TIMEOUT = 504;

},{}],219:[function(require,module,exports){
"use strict";

exports.LOGGED_OUT = exports.AUTHENTICATED = exports.AMBIGUOUS = void 0;
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
var AMBIGUOUS = exports.AMBIGUOUS = "ambiguous";
var AUTHENTICATED = exports.AUTHENTICATED = "authenticated";
var LOGGED_OUT = exports.LOGGED_OUT = "loggedOut";

},{}],220:[function(require,module,exports){
"use strict";

exports.MBOX_EDGE_CLUSTER = exports.MBOX = exports.AT_QA_MODE = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var MBOX_EDGE_CLUSTER = exports.MBOX_EDGE_CLUSTER = "mboxEdgeCluster";
var AT_QA_MODE = exports.AT_QA_MODE = "at_qa_mode";
var MBOX = exports.MBOX = "mbox";

},{}],221:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = exports["default"] = "https://ns.adobe.com/experience/alloy";

},{}],222:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
// The __VERSION__ keyword will be replace at alloy build time with the package.json version.
// see babel-plugin-version
var _default = exports["default"] = "2.25.0";

},{}],223:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = exports["default"] = "com.adobe.alloy.";

},{}],224:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = exports["default"] = "__view__";

},{}],225:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports.getPropositionEventType = exports.getEventType = exports.PropositionEventType = void 0;
var _eventType = require("./eventType.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var PropositionEventType = exports.PropositionEventType = {
  DISPLAY: "display",
  INTERACT: "interact",
  TRIGGER: "trigger",
  DISMISS: "dismiss",
  SUPPRESS: "suppressDisplay"
};
var eventTypeToPropositionEventTypeMapping = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _eventType.DISPLAY, PropositionEventType.DISPLAY), _eventType.INTERACT, PropositionEventType.INTERACT), _eventType.TRIGGER, PropositionEventType.TRIGGER), _eventType.DISMISS, PropositionEventType.DISMISS), _eventType.SUPPRESS, PropositionEventType.SUPPRESS);
var propositionEventTypeToEventTypeMapping = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, PropositionEventType.DISPLAY, _eventType.DISPLAY), PropositionEventType.INTERACT, _eventType.INTERACT), PropositionEventType.TRIGGER, _eventType.TRIGGER), PropositionEventType.DISMISS, _eventType.DISMISS), PropositionEventType.SUPPRESS, _eventType.SUPPRESS);
var getPropositionEventType = function getPropositionEventType(eventType) {
  return eventTypeToPropositionEventTypeMapping[eventType];
};
exports.getPropositionEventType = getPropositionEventType;
var getEventType = function getEventType(propositionEventType) {
  return propositionEventTypeToEventTypeMapping[propositionEventType];
};
exports.getEventType = getEventType;

},{"./eventType.js":214}],226:[function(require,module,exports){
"use strict";

exports.PROPOSITION_INTERACTION_TYPES = exports.NEVER = exports.DECORATED_ELEMENTS_ONLY = exports.ALWAYS = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var ALWAYS = exports.ALWAYS = "always";
var NEVER = exports.NEVER = "never";
var DECORATED_ELEMENTS_ONLY = exports.DECORATED_ELEMENTS_ONLY = "decoratedElementsOnly";
var PROPOSITION_INTERACTION_TYPES = exports.PROPOSITION_INTERACTION_TYPES = [ALWAYS, NEVER, DECORATED_ELEMENTS_ONLY];

},{}],227:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = exports["default"] = "adobe_mc";

},{}],228:[function(require,module,exports){
"use strict";

exports.RULESET_ITEM = exports.REDIRECT_ITEM = exports.MESSAGE_NATIVE_ALERT = exports.MESSAGE_IN_APP = exports.MESSAGE_CONTENT_CARD = exports.MEASUREMENT_SCHEMA = exports.JSON_CONTENT_ITEM = exports.HTML_CONTENT_ITEM = exports.DOM_ACTION = exports.DEFAULT_CONTENT_ITEM = void 0;
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

var DEFAULT_CONTENT_ITEM = exports.DEFAULT_CONTENT_ITEM = "https://ns.adobe.com/personalization/default-content-item";
var DOM_ACTION = exports.DOM_ACTION = "https://ns.adobe.com/personalization/dom-action";
var HTML_CONTENT_ITEM = exports.HTML_CONTENT_ITEM = "https://ns.adobe.com/personalization/html-content-item";
var JSON_CONTENT_ITEM = exports.JSON_CONTENT_ITEM = "https://ns.adobe.com/personalization/json-content-item";
var RULESET_ITEM = exports.RULESET_ITEM = "https://ns.adobe.com/personalization/ruleset-item";
var REDIRECT_ITEM = exports.REDIRECT_ITEM = "https://ns.adobe.com/personalization/redirect-item";
var MESSAGE_IN_APP = exports.MESSAGE_IN_APP = "https://ns.adobe.com/personalization/message/in-app";
var MESSAGE_CONTENT_CARD = exports.MESSAGE_CONTENT_CARD = "https://ns.adobe.com/personalization/message/content-card";
var MESSAGE_NATIVE_ALERT = exports.MESSAGE_NATIVE_ALERT = "https://ns.adobe.com/personalization/message/native-alert";
var MEASUREMENT_SCHEMA = exports.MEASUREMENT_SCHEMA = "https://ns.adobe.com/personalization/measurement";

},{}],229:[function(require,module,exports){
"use strict";

exports.CLICK_ACTIVITY_DATA = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var CLICK_ACTIVITY_DATA = exports.CLICK_ACTIVITY_DATA = "clickData";

},{}],230:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = exports["default"] = ":shadow";

},{}],231:[function(require,module,exports){
"use strict";

exports.STYLE = exports.SCRIPT = exports.IMG = exports.IFRAME = exports.HEAD = exports.DIV = exports.BODY = void 0;
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

var BODY = exports.BODY = "BODY";
var IFRAME = exports.IFRAME = "IFRAME";
var IMG = exports.IMG = "IMG";
var DIV = exports.DIV = "DIV";
var STYLE = exports.STYLE = "STYLE";
var SCRIPT = exports.SCRIPT = "SCRIPT";
var HEAD = exports.HEAD = "HEAD";

},{}],232:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
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

var CONFIG_DOC_URI = "https://adobe.ly/3sHh553";
var transformOptions = function transformOptions(_ref) {
  var combinedConfigValidator = _ref.combinedConfigValidator,
    options = _ref.options,
    logger = _ref.logger;
  try {
    var validator = combinedConfigValidator.noUnknownFields().required();
    return validator.call({
      logger: logger
    }, options);
  } catch (e) {
    throw new Error("Resolve these configuration problems:\n\t - " + e.message.split("\n").join("\n\t - ") + "\nFor configuration documentation see: " + CONFIG_DOC_URI);
  }
};
var buildAllOnInstanceConfiguredExtraParams = function buildAllOnInstanceConfiguredExtraParams(config, logger, componentCreators) {
  return componentCreators.reduce(function (memo, _ref2) {
    var buildOnInstanceConfiguredExtraParams = _ref2.buildOnInstanceConfiguredExtraParams;
    if (buildOnInstanceConfiguredExtraParams) {
      memo = _objectSpread(_objectSpread({}, memo), buildOnInstanceConfiguredExtraParams({
        config: config,
        logger: logger
      }));
    }
    return memo;
  }, {});
};
var wrapLoggerInQueue = function wrapLoggerInQueue(logger) {
  var queue = [];
  var queuedLogger = {
    get enabled() {
      return logger.enabled;
    },
    flush: function flush() {
      queue.forEach(function (_ref3) {
        var method = _ref3.method,
          args = _ref3.args;
        return logger[method].apply(logger, _toConsumableArray(args));
      });
    }
  };
  Object.keys(logger).filter(function (key) {
    return typeof logger[key] === "function";
  }).forEach(function (method) {
    queuedLogger[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      queue.push({
        method: method,
        args: args
      });
    };
  });
  return queuedLogger;
};
var _default = function _default(_ref4) {
  var options = _ref4.options,
    componentCreators = _ref4.componentCreators,
    coreConfigValidators = _ref4.coreConfigValidators,
    createConfig = _ref4.createConfig,
    logger = _ref4.logger,
    setDebugEnabled = _ref4.setDebugEnabled;
  // We wrap the logger in a queue in case debugEnabled is set in the config
  // but we need to log something before the config is created.
  var queuedLogger = wrapLoggerInQueue(logger);
  var combinedConfigValidator = componentCreators.map(function (_ref5) {
    var configValidators = _ref5.configValidators;
    return configValidators;
  }).filter(function (configValidators) {
    return configValidators;
  }).reduce(function (validator, configValidators) {
    return validator.concat(configValidators);
  }, coreConfigValidators);
  var config = createConfig(transformOptions({
    combinedConfigValidator: combinedConfigValidator,
    options: options,
    logger: queuedLogger
  }));
  setDebugEnabled(config.debugEnabled, {
    fromConfig: true
  });
  queuedLogger.flush();
  var extraParams = buildAllOnInstanceConfiguredExtraParams(config, logger, componentCreators);
  logger.logOnInstanceConfigured(_objectSpread(_objectSpread({}, extraParams), {}, {
    config: config
  }));
  return config;
};
exports["default"] = _default;

},{}],233:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "activityCollector", {
  enumerable: true,
  get: function get() {
    return _index["default"];
  }
});
Object.defineProperty(exports, "audiences", {
  enumerable: true,
  get: function get() {
    return _index2["default"];
  }
});
Object.defineProperty(exports, "consent", {
  enumerable: true,
  get: function get() {
    return _index8["default"];
  }
});
Object.defineProperty(exports, "context", {
  enumerable: true,
  get: function get() {
    return _index3["default"];
  }
});
Object.defineProperty(exports, "eventMerge", {
  enumerable: true,
  get: function get() {
    return _index5["default"];
  }
});
Object.defineProperty(exports, "mediaAnalyticsBridge", {
  enumerable: true,
  get: function get() {
    return _index6["default"];
  }
});
Object.defineProperty(exports, "personalization", {
  enumerable: true,
  get: function get() {
    return _index7["default"];
  }
});
Object.defineProperty(exports, "rulesEngine", {
  enumerable: true,
  get: function get() {
    return _index4["default"];
  }
});
Object.defineProperty(exports, "streamingMedia", {
  enumerable: true,
  get: function get() {
    return _index9["default"];
  }
});
var _index = require("../components/ActivityCollector/index.js");
var _index2 = require("../components/Audiences/index.js");
var _index3 = require("../components/Context/index.js");
var _index4 = require("../components/RulesEngine/index.js");
var _index5 = require("../components/EventMerge/index.js");
var _index6 = require("../components/MediaAnalyticsBridge/index.js");
var _index7 = require("../components/Personalization/index.js");
var _index8 = require("../components/Consent/index.js");
var _index9 = require("../components/StreamingMedia/index.js");

},{"../components/ActivityCollector/index.js":12,"../components/Audiences/index.js":32,"../components/Consent/index.js":42,"../components/Context/index.js":48,"../components/EventMerge/index.js":60,"../components/MediaAnalyticsBridge/index.js":90,"../components/Personalization/index.js":165,"../components/RulesEngine/index.js":184,"../components/StreamingMedia/index.js":196}],234:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
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

var createConfig = function createConfig(options) {
  return _objectSpread({}, options);
};
var _default = exports["default"] = createConfig;

},{}],235:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/validation/index.js");
var _index2 = require("../../utils/index.js");
var _domain = require("../../constants/domain.js");
var _edgeBasePath = require("../../constants/edgeBasePath.js");
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
var _default = function _default() {
  return (0, _index.objectOf)({
    debugEnabled: (0, _index["boolean"])()["default"](false),
    datastreamId: (0, _index.string)().unique().required(),
    edgeDomain: (0, _index.string)().domain()["default"](_domain.EDGE),
    edgeBasePath: (0, _index.string)().nonEmpty()["default"](_edgeBasePath["default"]),
    orgId: (0, _index.string)().unique().required(),
    onBeforeEventSend: (0, _index.callback)()["default"](_index2.noop),
    edgeConfigOverrides: _index2.validateConfigOverride
  }).renamed("edgeConfigId", (0, _index.string)().unique(), "datastreamId");
};
exports["default"] = _default;

},{"../../constants/domain.js":210,"../../constants/edgeBasePath.js":212,"../../utils/index.js":300,"../../utils/validation/index.js":364}],236:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _consentStatus = require("../../constants/consentStatus.js");
var _consentPurpose = require("../../constants/consentPurpose.js");
var _createConsentStateMachine = require("./createConsentStateMachine.js");
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
var _default = function _default(_ref) {
  var generalConsentState = _ref.generalConsentState,
    logger = _ref.logger;
  var _setConsent = function setConsent(consentByPurpose, source) {
    switch (consentByPurpose[_consentPurpose.GENERAL]) {
      case _consentStatus.IN:
        generalConsentState["in"](source);
        break;
      case _consentStatus.OUT:
        generalConsentState.out(source);
        break;
      case _consentStatus.PENDING:
        generalConsentState.pending(source);
        break;
      default:
        logger.warn("Unknown consent value: " + consentByPurpose[_consentPurpose.GENERAL]);
        break;
    }
  };
  return {
    initializeConsent: function initializeConsent(defaultConsentByPurpose, storedConsentByPurpose) {
      if (storedConsentByPurpose[_consentPurpose.GENERAL]) {
        _setConsent(storedConsentByPurpose, _createConsentStateMachine.CONSENT_SOURCE_INITIAL);
      } else {
        _setConsent(defaultConsentByPurpose, _createConsentStateMachine.CONSENT_SOURCE_DEFAULT);
      }
    },
    setConsent: function setConsent(consentByPurpose) {
      _setConsent(consentByPurpose, _createConsentStateMachine.CONSENT_SOURCE_NEW);
    },
    suspend: function suspend() {
      generalConsentState.pending();
    },
    awaitConsent: function awaitConsent() {
      return generalConsentState.awaitConsent();
    },
    withConsent: function withConsent() {
      return generalConsentState.withConsent();
    },
    current: function current() {
      return generalConsentState.current();
    }
  };
};
exports["default"] = _default;

},{"../../constants/consentPurpose.js":201,"../../constants/consentStatus.js":202,"./createConsentStateMachine.js":237}],237:[function(require,module,exports){
"use strict";

exports["default"] = exports.DECLINED_CONSENT_ERROR_CODE = exports.DECLINED_CONSENT = exports.CONSENT_SOURCE_NEW = exports.CONSENT_SOURCE_INITIAL = exports.CONSENT_SOURCE_DEFAULT = void 0;
var _index = require("../../utils/index.js");
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

var DECLINED_CONSENT = exports.DECLINED_CONSENT = "The user declined consent.";
var DECLINED_CONSENT_ERROR_CODE = exports.DECLINED_CONSENT_ERROR_CODE = "declinedConsent";
var CONSENT_SOURCE_DEFAULT = exports.CONSENT_SOURCE_DEFAULT = "default";
var CONSENT_SOURCE_INITIAL = exports.CONSENT_SOURCE_INITIAL = "initial";
var CONSENT_SOURCE_NEW = exports.CONSENT_SOURCE_NEW = "new";
var createDeclinedConsentError = function createDeclinedConsentError(errorMessage) {
  var error = new Error(errorMessage);
  error.code = DECLINED_CONSENT_ERROR_CODE;
  error.message = errorMessage;
  return error;
};
var _default = function _default(_ref) {
  var logger = _ref.logger;
  var deferreds = [];
  var runAll = function runAll() {
    while (deferreds.length) {
      deferreds.shift().resolve();
    }
  };
  var discardAll = function discardAll() {
    while (deferreds.length) {
      deferreds.shift().reject(createDeclinedConsentError("The user declined consent."));
    }
  };
  var awaitInitial = function awaitInitial() {
    return Promise.resolve();
  };
  var awaitInDefault = function awaitInDefault() {
    return Promise.resolve();
  };
  var awaitIn = function awaitIn() {
    return Promise.resolve();
  };
  var awaitOutDefault = function awaitOutDefault() {
    return Promise.reject(createDeclinedConsentError("No consent preferences have been set."));
  };
  var awaitOut = function awaitOut() {
    return Promise.reject(createDeclinedConsentError("The user declined consent."));
  };
  var awaitPending = function awaitPending(returnImmediately) {
    if (returnImmediately) {
      return Promise.reject(new Error("Consent is pending."));
    }
    var deferred = (0, _index.defer)();
    deferreds.push(deferred);
    return deferred.promise;
  };
  return {
    "in": function _in(source) {
      if (source === CONSENT_SOURCE_DEFAULT) {
        this.awaitConsent = awaitInDefault;
      } else {
        if (source === CONSENT_SOURCE_INITIAL) {
          logger.info("Loaded user consent preferences. The user previously consented.");
        } else if (source === CONSENT_SOURCE_NEW && this.awaitConsent !== awaitIn) {
          logger.info("User consented.");
        }
        runAll();
        this.awaitConsent = awaitIn;
      }
    },
    out: function out(source) {
      if (source === CONSENT_SOURCE_DEFAULT) {
        logger.warn("User consent preferences not found. Default consent of out will be used.");
        this.awaitConsent = awaitOutDefault;
      } else {
        if (source === CONSENT_SOURCE_INITIAL) {
          logger.warn("Loaded user consent preferences. The user previously declined consent.");
        } else if (source === CONSENT_SOURCE_NEW && this.awaitConsent !== awaitOut) {
          logger.warn("User declined consent.");
        }
        discardAll();
        this.awaitConsent = awaitOut;
      }
    },
    pending: function pending(source) {
      if (source === CONSENT_SOURCE_DEFAULT) {
        logger.info("User consent preferences not found. Default consent of pending will be used. Some commands may be delayed.");
      }
      this.awaitConsent = awaitPending;
    },
    awaitConsent: awaitInitial,
    withConsent: function withConsent() {
      return this.awaitConsent(true);
    },
    current: function current() {
      switch (this.awaitConsent) {
        case awaitInDefault:
          return {
            state: "in",
            wasSet: false
          };
        case awaitIn:
          return {
            state: "in",
            wasSet: true
          };
        case awaitOutDefault:
          return {
            state: "out",
            wasSet: false
          };
        case awaitOut:
          return {
            state: "out",
            wasSet: true
          };
        case awaitPending:
          return {
            state: "pending",
            wasSet: false
          };
        default:
          return {
            state: "in",
            wasSet: false
          };
      }
    }
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300}],238:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../utils/index.js");
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

var wrapForErrorHandling = function wrapForErrorHandling(fn, stackMessage) {
  return function () {
    var result;
    try {
      result = fn.apply(void 0, arguments);
    } catch (error) {
      throw (0, _index.stackError)({
        error: error,
        message: stackMessage
      });
    }
    if (result instanceof Promise) {
      result = result["catch"](function (error) {
        throw (0, _index.stackError)({
          error: error,
          message: stackMessage
        });
      });
    }
    return result;
  };
};

// TO-DOCUMENT: All public commands and their signatures.
var _default = function _default() {
  var componentsByNamespace = {};
  var commandsByName = {};
  var lifecycleCallbacksByName = {};
  var registerComponentCommands = function registerComponentCommands(namespace) {
    var componentCommandsByName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var conflictingCommandNames = (0, _index.intersection)(Object.keys(commandsByName), Object.keys(componentCommandsByName));
    if (conflictingCommandNames.length) {
      throw new Error("[ComponentRegistry] Could not register " + namespace + " " + ("because it has existing command(s): " + conflictingCommandNames.join(",")));
    }
    Object.keys(componentCommandsByName).forEach(function (commandName) {
      var command = componentCommandsByName[commandName];
      command.commandName = commandName;
      command.run = wrapForErrorHandling(command.run, "[" + namespace + "] An error occurred while executing the " + commandName + " command.");
      commandsByName[commandName] = command;
    });
  };
  var registerLifecycleCallbacks = function registerLifecycleCallbacks(namespace) {
    var componentLifecycleCallbacksByName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Object.keys(componentLifecycleCallbacksByName).forEach(function (hookName) {
      lifecycleCallbacksByName[hookName] = lifecycleCallbacksByName[hookName] || [];
      lifecycleCallbacksByName[hookName].push(wrapForErrorHandling(componentLifecycleCallbacksByName[hookName], "[" + namespace + "] An error occurred while executing the " + hookName + " lifecycle hook."));
    });
  };
  return {
    register: function register(namespace, component) {
      var commands = component.commands,
        lifecycle = component.lifecycle;
      registerComponentCommands(namespace, commands);
      registerLifecycleCallbacks(namespace, lifecycle);
      componentsByNamespace[namespace] = component;
    },
    getCommand: function getCommand(commandName) {
      return commandsByName[commandName];
    },
    getCommandNames: function getCommandNames() {
      return Object.keys(commandsByName);
    },
    getLifecycleCallbacks: function getLifecycleCallbacks(hookName) {
      return lifecycleCallbacksByName[hookName] || [];
    },
    getComponentNames: function getComponentNames() {
      return Object.keys(componentsByNamespace);
    }
  };
};
exports["default"] = _default;

},{"../utils/index.js":300}],239:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var STATE_STORE_HANDLE_TYPE = "state:store";
var _default = function _default(_ref) {
  var cookieJar = _ref.cookieJar,
    shouldTransferCookie = _ref.shouldTransferCookie,
    apexDomain = _ref.apexDomain,
    dateProvider = _ref.dateProvider;
  return {
    /**
     * When sending to a third-party endpoint, the endpoint won't be able to
     * access first-party cookies, therefore we transfer cookies into
     * the request body so they can be read by the server.
     */
    cookiesToPayload: function cookiesToPayload(payload, endpointDomain) {
      // localhost is a special case where the apexDomain is ""
      // We want to treat localhost as a third-party domain.
      var isEndpointFirstParty = apexDomain !== "" && endpointDomain.endsWith(apexDomain);
      var state = {
        domain: apexDomain,
        cookiesEnabled: true
      };

      // If the endpoint is first-party, there's no need to transfer cookies
      // to the payload since they'll be automatically passed through cookie
      // headers.
      if (!isEndpointFirstParty) {
        var cookies = cookieJar.get();
        var entries = Object.keys(cookies).filter(shouldTransferCookie).map(function (qualifyingCookieName) {
          return {
            key: qualifyingCookieName,
            value: cookies[qualifyingCookieName]
          };
        });
        if (entries.length) {
          state.entries = entries;
        }
      }
      payload.mergeState(state);
    },
    /**
     * When receiving from a third-party endpoint, the endpoint won't be able to
     * write first-party cookies, therefore we write first-party cookies
     * as directed in the response body.
     */
    responseToCookies: function responseToCookies(response) {
      response.getPayloadsByType(STATE_STORE_HANDLE_TYPE).forEach(function (stateItem) {
        var options = {
          domain: apexDomain
        };
        var sameSite = stateItem.attrs && stateItem.attrs.SameSite && stateItem.attrs.SameSite.toLowerCase();
        if (stateItem.maxAge !== undefined) {
          // cookieJar expects "expires" as a date object
          options.expires = new Date(dateProvider().getTime() + stateItem.maxAge * 1000);
        }
        if (sameSite !== undefined) {
          options.sameSite = sameSite;
        }
        // When sameSite is set to none, the secure flag must be set.
        // Experience edge will not set the secure flag in these cases.
        if (sameSite === "none") {
          options.secure = true;
        }
        cookieJar.set(stateItem.key, stateItem.value, options);
      });
    }
  };
};
exports["default"] = _default;

},{}],240:[function(require,module,exports){
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
exports["default"] = void 0;
var _index = require("../utils/index.js");
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

var getXdmPropositions = function getXdmPropositions(xdm) {
  return xdm &&
  // eslint-disable-next-line no-underscore-dangle
  xdm._experience &&
  // eslint-disable-next-line no-underscore-dangle
  xdm._experience.decisioning &&
  // eslint-disable-next-line no-underscore-dangle
  (0, _index.isNonEmptyArray)(xdm._experience.decisioning.propositions) ?
  // eslint-disable-next-line no-underscore-dangle
  xdm._experience.decisioning.propositions : [];
};
var _default = function _default() {
  var content = {};
  var userXdm;
  var userData;
  var _documentMayUnload = false;
  var isFinalized = false;
  var shouldSendEvent = true;
  var throwIfEventFinalized = function throwIfEventFinalized(methodName) {
    if (isFinalized) {
      throw new Error(methodName + " cannot be called after event is finalized.");
    }
  };
  var event = {
    hasQuery: function hasQuery() {
      return Object.prototype.hasOwnProperty.call(this.getContent(), "query");
    },
    getContent: function getContent() {
      var currentContent = JSON.parse(JSON.stringify(content));
      if (userXdm) {
        (0, _index.deepAssign)(currentContent, {
          xdm: userXdm
        });
      }
      if (userData) {
        (0, _index.deepAssign)(currentContent, {
          data: userData
        });
      }
      return currentContent;
    },
    setUserXdm: function setUserXdm(value) {
      throwIfEventFinalized("setUserXdm");
      userXdm = value;
    },
    setUserData: function setUserData(value) {
      throwIfEventFinalized("setUserData");
      userData = value;
    },
    mergeXdm: function mergeXdm(xdm) {
      throwIfEventFinalized("mergeXdm");
      if (xdm) {
        (0, _index.deepAssign)(content, {
          xdm: xdm
        });
      }
    },
    mergeData: function mergeData(data) {
      throwIfEventFinalized("mergeData");
      if (data) {
        (0, _index.deepAssign)(content, {
          data: data
        });
      }
    },
    mergeMeta: function mergeMeta(meta) {
      throwIfEventFinalized("mergeMeta");
      if (meta) {
        (0, _index.deepAssign)(content, {
          meta: meta
        });
      }
    },
    mergeQuery: function mergeQuery(query) {
      throwIfEventFinalized("mergeQuery");
      if (query) {
        (0, _index.deepAssign)(content, {
          query: query
        });
      }
    },
    documentMayUnload: function documentMayUnload() {
      _documentMayUnload = true;
    },
    finalize: function finalize(onBeforeEventSend) {
      if (isFinalized) {
        return;
      }
      var newPropositions = (0, _index.deduplicateArray)([].concat(_toConsumableArray(getXdmPropositions(userXdm)), _toConsumableArray(getXdmPropositions(content.xdm))), function (a, b) {
        return a === b || a.id && b.id && a.id === b.id && a.scope && b.scope && a.scope === b.scope;
      });
      if (userXdm) {
        this.mergeXdm(userXdm);
      }
      if (newPropositions.length > 0) {
        // eslint-disable-next-line no-underscore-dangle
        content.xdm._experience.decisioning.propositions = newPropositions;
      }
      if (userData) {
        event.mergeData(userData);
      }

      // the event should already be considered finalized in case onBeforeEventSend throws an error
      isFinalized = true;
      if (onBeforeEventSend) {
        // assume that the onBeforeEventSend callback will fail (in-case of an error)
        shouldSendEvent = false;

        // this allows the user to replace the xdm and data properties
        // on the object passed to the callback
        var tempContent = {
          xdm: content.xdm || {},
          data: content.data || {}
        };
        var result = onBeforeEventSend(tempContent);
        shouldSendEvent = result !== false;
        content.xdm = tempContent.xdm || {};
        content.data = tempContent.data || {};
        if ((0, _index.isEmptyObject)(content.xdm)) {
          delete content.xdm;
        }
        if ((0, _index.isEmptyObject)(content.data)) {
          delete content.data;
        }
      }
    },
    getDocumentMayUnload: function getDocumentMayUnload() {
      return _documentMayUnload;
    },
    isEmpty: function isEmpty() {
      return (0, _index.isEmptyObject)(content) && (!userXdm || (0, _index.isEmptyObject)(userXdm)) && (!userData || (0, _index.isEmptyObject)(userData));
    },
    shouldSend: function shouldSend() {
      return shouldSendEvent;
    },
    getViewName: function getViewName() {
      if (!userXdm || !userXdm.web || !userXdm.web.webPageDetails) {
        return undefined;
      }
      return userXdm.web.webPageDetails.viewName;
    },
    toJSON: function toJSON() {
      if (!isFinalized) {
        throw new Error("toJSON called before finalize");
      }
      return content;
    }
  };
  return event;
};
exports["default"] = _default;

},{"../utils/index.js":300}],241:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["edgeConfigOverrides"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
exports["default"] = void 0;
var _pageWideScope = require("../constants/pageWideScope.js");
var _index = require("../utils/index.js");
var _index2 = require("../utils/request/index.js");
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

var EVENT_CANCELLATION_MESSAGE = "Event was canceled because the onBeforeEventSend callback returned false.";
var _default = function _default(_ref) {
  var config = _ref.config,
    logger = _ref.logger,
    lifecycle = _ref.lifecycle,
    consent = _ref.consent,
    createEvent = _ref.createEvent,
    createDataCollectionRequestPayload = _ref.createDataCollectionRequestPayload,
    createDataCollectionRequest = _ref.createDataCollectionRequest,
    sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest,
    _applyResponse = _ref.applyResponse;
  var onBeforeEventSend = config.onBeforeEventSend,
    globalConfigOverrides = config.edgeConfigOverrides;
  return {
    createEvent: createEvent,
    /**
     * Sends an event. This includes running the event and payload through the
     * appropriate lifecycle hooks, sending the request to the server, and
     * handling the response.
     * @param {Object} event This will be JSON stringified and used inside the
     * request payload.
     * @param {Object} [options] Options to pass on to the onBeforeEvent
     * lifecycle method
     * @param {Object} [options.edgeConfigOverrides] Settings that take
     * precedence over the global datastream configuration, including which
     * datastream to use.
     * @returns {*}
     */
    sendEvent: function sendEvent(event) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var localConfigOverrides = options.edgeConfigOverrides,
        otherOptions = _objectWithoutProperties(options, _excluded);
      var requestParams = (0, _index2.createRequestParams)({
        payload: createDataCollectionRequestPayload(),
        localConfigOverrides: localConfigOverrides,
        globalConfigOverrides: globalConfigOverrides
      });
      var request = createDataCollectionRequest(requestParams);
      var onResponseCallbackAggregator = (0, _index.createCallbackAggregator)();
      var onRequestFailureCallbackAggregator = (0, _index.createCallbackAggregator)();
      return lifecycle.onBeforeEvent(_objectSpread(_objectSpread({}, otherOptions), {}, {
        event: event,
        onResponse: onResponseCallbackAggregator.add,
        onRequestFailure: onRequestFailureCallbackAggregator.add
      })).then(function () {
        requestParams.payload.addEvent(event);
        return consent.awaitConsent();
      }).then(function () {
        try {
          // NOTE: this calls onBeforeEventSend callback (if configured)
          event.finalize(onBeforeEventSend);
        } catch (error) {
          var throwError = function throwError() {
            throw error;
          };
          onRequestFailureCallbackAggregator.add(lifecycle.onRequestFailure);
          return onRequestFailureCallbackAggregator.call({
            error: error
          }).then(throwError, throwError);
        }

        // if the callback returns false, the event should not be sent
        if (!event.shouldSend()) {
          onRequestFailureCallbackAggregator.add(lifecycle.onRequestFailure);
          logger.info(EVENT_CANCELLATION_MESSAGE);
          var error = new Error(EVENT_CANCELLATION_MESSAGE);
          return onRequestFailureCallbackAggregator.call({
            error: error
          }).then(function () {
            // Ensure the promise gets resolved with undefined instead
            // of an array of return values from the callbacks.
          });
        }
        return sendEdgeNetworkRequest({
          request: request,
          runOnResponseCallbacks: onResponseCallbackAggregator.call,
          runOnRequestFailureCallbacks: onRequestFailureCallbackAggregator.call
        });
      });
    },
    applyResponse: function applyResponse(event) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$renderDecisi = options.renderDecisions,
        renderDecisions = _options$renderDecisi === void 0 ? false : _options$renderDecisi,
        _options$decisionCont = options.decisionContext,
        decisionContext = _options$decisionCont === void 0 ? {} : _options$decisionCont,
        _options$responseHead = options.responseHeaders,
        responseHeaders = _options$responseHead === void 0 ? {} : _options$responseHead,
        _options$responseBody = options.responseBody,
        responseBody = _options$responseBody === void 0 ? {
          handle: []
        } : _options$responseBody,
        personalization = options.personalization;
      var payload = createDataCollectionRequestPayload();
      var request = createDataCollectionRequest({
        payload: payload
      });
      var onResponseCallbackAggregator = (0, _index.createCallbackAggregator)();
      return lifecycle.onBeforeEvent({
        event: event,
        renderDecisions: renderDecisions,
        decisionContext: decisionContext,
        decisionScopes: [_pageWideScope["default"]],
        personalization: personalization,
        onResponse: onResponseCallbackAggregator.add,
        onRequestFailure: _index.noop
      }).then(function () {
        payload.addEvent(event);
        return _applyResponse({
          request: request,
          responseHeaders: responseHeaders,
          responseBody: responseBody,
          runOnResponseCallbacks: onResponseCallbackAggregator.call
        });
      });
    }
  };
};
exports["default"] = _default;

},{"../constants/pageWideScope.js":224,"../utils/index.js":300,"../utils/request/index.js":335}],242:[function(require,module,exports){
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
exports["default"] = void 0;
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
var _default = function _default(executeCommand) {
  return function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
      resolve = _ref2[0],
      reject = _ref2[1],
      _ref2$ = _slicedToArray(_ref2[2], 2),
      commandName = _ref2$[0],
      options = _ref2$[1];
    executeCommand(commandName, options).then(resolve, reject);
  };
};
exports["default"] = _default;

},{}],243:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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

// TO-DOCUMENT: Lifecycle hooks and their params.
var hookNames = [
// Called after all components have been registered.
"onComponentsRegistered",
// Called before an event is sent on a data collection request
"onBeforeEvent",
// Called before each request is made to the edge.
"onBeforeRequest",
// Called after each response is returned from the edge with a successful
// status code
"onResponse",
// Called after a network request to the edge fails. Either the request
// didn't make it to the edge, didn't make it to Konductor, or Konductor
// failed to return a regularly-structured response. (In this case { error }
// is passed as the parameter)
// Also called when the respone returns a 400 or 500 error. (In this case
// { response } is passed as the parameter)
"onRequestFailure",
// A user clicked on an element.
"onClick",
// Called by RulesEngine when a ruleset is satisfied with a list of
// propositions
"onDecision"];
var createHook = function createHook(componentRegistry, hookName) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return Promise.all(componentRegistry.getLifecycleCallbacks(hookName).map(function (callback) {
      return new Promise(function (resolve) {
        resolve(callback.apply(void 0, args));
      });
    }));
  };
};

/**
 * This ensures that if a component's lifecycle method X
 * attempts to execute lifecycle method Y, that all X methods on all components
 * will have been called before any of their Y methods are called. It does
 * this by kicking the call to the Y method to the next JavaScript tick.
 * @returns {function}
 */
var guardHook = function guardHook(fn) {
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return Promise.resolve().then(function () {
      return fn.apply(void 0, args);
    });
  };
};
var _default = function _default(componentRegistry) {
  return hookNames.reduce(function (memo, hookName) {
    memo[hookName] = guardHook(createHook(componentRegistry, hookName));
    return memo;
  }, {});
};
exports["default"] = _default;

},{}],244:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var console = _ref.console,
    locationSearch = _ref.locationSearch,
    createLogger = _ref.createLogger,
    instanceName = _ref.instanceName,
    createNamespacedStorage = _ref.createNamespacedStorage,
    getMonitors = _ref.getMonitors;
  var parsedQueryString = _index.queryString.parse(locationSearch);
  var storage = createNamespacedStorage("instance." + instanceName + ".");
  var debugSessionValue = storage.session.getItem("debug");
  var debugEnabled = debugSessionValue === "true";
  var debugEnabledWritableFromConfig = debugSessionValue === null;
  var getDebugEnabled = function getDebugEnabled() {
    return debugEnabled;
  };
  var setDebugEnabled = function setDebugEnabled(value, _ref2) {
    var fromConfig = _ref2.fromConfig;
    if (!fromConfig || debugEnabledWritableFromConfig) {
      debugEnabled = value;
    }
    if (!fromConfig) {
      // Web storage only allows strings, so we explicitly convert to string.
      storage.session.setItem("debug", value.toString());
      debugEnabledWritableFromConfig = false;
    }
  };
  if (parsedQueryString[_debugQueryParam["default"]] !== undefined) {
    setDebugEnabled((0, _index.stringToBoolean)(parsedQueryString[_debugQueryParam["default"]]), {
      fromConfig: false
    });
  }
  return {
    setDebugEnabled: setDebugEnabled,
    logger: createLogger({
      getDebugEnabled: getDebugEnabled,
      context: {
        instanceName: instanceName
      },
      getMonitors: getMonitors,
      console: console
    }),
    createComponentLogger: function createComponentLogger(componentName) {
      return createLogger({
        getDebugEnabled: getDebugEnabled,
        context: {
          instanceName: instanceName,
          componentName: componentName
        },
        getMonitors: getMonitors,
        console: console
      });
    }
  };
};
exports["default"] = _default;

},{"../constants/debugQueryParam.js":208,"../utils/index.js":300}],245:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var getDebugEnabled = _ref.getDebugEnabled,
    console = _ref.console,
    getMonitors = _ref.getMonitors,
    context = _ref.context;
  var prefix = "[" + context.instanceName + "]";
  if (context.componentName) {
    prefix += " [" + context.componentName + "]";
  }
  var notifyMonitors = function notifyMonitors(method, data) {
    var monitors = getMonitors();
    if (monitors.length > 0) {
      var dataWithContext = _objectSpread(_objectSpread({}, context), data);
      monitors.forEach(function (monitor) {
        if (monitor[method]) {
          monitor[method](dataWithContext);
        }
      });
    }
  };
  var log = function log(level) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    notifyMonitors("onBeforeLog", {
      level: level,
      arguments: rest
    });
    if (getDebugEnabled()) {
      console[level].apply(console, [prefix].concat(rest));
    }
  };
  return {
    get enabled() {
      return getMonitors().length > 0 || getDebugEnabled();
    },
    logOnInstanceCreated: function logOnInstanceCreated(data) {
      notifyMonitors("onInstanceCreated", data);
      log("info", "Instance initialized.");
    },
    logOnInstanceConfigured: function logOnInstanceConfigured(data) {
      notifyMonitors("onInstanceConfigured", data);
      log("info", "Instance configured. Computed configuration:", data.config);
    },
    logOnBeforeCommand: function logOnBeforeCommand(data) {
      notifyMonitors("onBeforeCommand", data);
      log("info", "Executing " + data.commandName + " command. Options:", data.options);
    },
    logOnCommandResolved: function logOnCommandResolved(data) {
      notifyMonitors("onCommandResolved", data);
      log("info", data.commandName + " command resolved. Result:", data.result);
    },
    logOnCommandRejected: function logOnCommandRejected(data) {
      notifyMonitors("onCommandRejected", data);
      log("error", data.commandName + " command was rejected. Error:", data.error);
    },
    logOnBeforeNetworkRequest: function logOnBeforeNetworkRequest(data) {
      notifyMonitors("onBeforeNetworkRequest", data);
      log("info", "Request " + data.requestId + ": Sending request.", data.payload);
    },
    logOnNetworkResponse: function logOnNetworkResponse(data) {
      notifyMonitors("onNetworkResponse", data);
      var messagesSuffix = data.parsedBody || data.body ? "response body:" : "no response body.";
      log("info", "Request " + data.requestId + ": Received response with status code " + data.statusCode + " and " + messagesSuffix, data.parsedBody || data.body);
    },
    logOnNetworkError: function logOnNetworkError(data) {
      notifyMonitors("onNetworkError", data);
      log("error", "Request " + data.requestId + ": Network request failed.", data.error);
    },
    logOnContentHiding: function logOnContentHiding(data) {
      notifyMonitors("onContentHiding", {
        status: data.status
      });
      log(data.logLevel, data.message);
    },
    logOnContentRendering: function logOnContentRendering(data) {
      notifyMonitors("onContentRendering", {
        status: data.status,
        payload: data.detail
      });
      log(data.logLevel, data.message);
    },
    /**
     * Outputs informational message to the web console. In some
     * browsers a small "i" icon is displayed next to these items
     * in the web console's log.
     * @param {...*} arg Any argument to be logged.
     */
    info: log.bind(null, "info"),
    /**
     * Outputs a warning message to the web console.
     * @param {...*} arg Any argument to be logged.
     */
    warn: log.bind(null, "warn"),
    /**
     * Outputs an error message to the web console.
     * @param {...*} arg Any argument to be logged.
     */
    error: log.bind(null, "error")
  };
};
exports["default"] = _default;

},{}],246:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(onRequestFailureCallbackAggregator) {
  return function (error) {
    // Regardless of whether the network call failed, an unexpected status
    // code was returned, or the response body was malformed, we want to call
    // the onRequestFailure callbacks, but still throw the exception.
    var throwError = function throwError() {
      throw error;
    };
    return onRequestFailureCallbackAggregator.call({
      error: error
    }).then(throwError, throwError);
  };
};
exports["default"] = _default;

},{}],247:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _mergeLifecycleResponses = require("./mergeLifecycleResponses.js");
var _handleRequestFailure = require("./handleRequestFailure.js");
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

var HTTP_STATUS_OK = 200;
var _default = function _default(_ref) {
  var cookieTransfer = _ref.cookieTransfer,
    lifecycle = _ref.lifecycle,
    createResponse = _ref.createResponse,
    processWarningsAndErrors = _ref.processWarningsAndErrors;
  return function (_ref2) {
    var request = _ref2.request,
      responseHeaders = _ref2.responseHeaders,
      responseBody = _ref2.responseBody,
      _ref2$runOnResponseCa = _ref2.runOnResponseCallbacks,
      runOnResponseCallbacks = _ref2$runOnResponseCa === void 0 ? _index.noop : _ref2$runOnResponseCa,
      _ref2$runOnRequestFai = _ref2.runOnRequestFailureCallbacks,
      runOnRequestFailureCallbacks = _ref2$runOnRequestFai === void 0 ? _index.noop : _ref2$runOnRequestFai;
    var onResponseCallbackAggregator = (0, _index.createCallbackAggregator)();
    onResponseCallbackAggregator.add(lifecycle.onResponse);
    onResponseCallbackAggregator.add(runOnResponseCallbacks);
    var onRequestFailureCallbackAggregator = (0, _index.createCallbackAggregator)();
    onRequestFailureCallbackAggregator.add(lifecycle.onRequestFailure);
    onRequestFailureCallbackAggregator.add(runOnRequestFailureCallbacks);
    var getHeader = function getHeader(key) {
      return responseHeaders[key];
    };
    return lifecycle.onBeforeRequest({
      request: request,
      onResponse: onResponseCallbackAggregator.add,
      onRequestFailure: onRequestFailureCallbackAggregator.add
    }).then(function () {
      return processWarningsAndErrors({
        statusCode: HTTP_STATUS_OK,
        getHeader: getHeader,
        body: JSON.stringify(responseBody),
        parsedBody: responseBody
      });
    })["catch"]((0, _handleRequestFailure["default"])(onRequestFailureCallbackAggregator)).then(function () {
      var response = createResponse({
        content: responseBody,
        getHeader: getHeader
      });

      // This will clobber any cookies set via HTTP from the server.  So care should be given to remove any state:store handles if that is not desirable
      cookieTransfer.responseToCookies(response);
      return onResponseCallbackAggregator.call({
        response: response
      }).then(_mergeLifecycleResponses["default"]);
    });
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300,"./handleRequestFailure.js":246,"./mergeLifecycleResponses.js":252}],248:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var logger = _ref.logger;
  return function (adobeEdgeHeader) {
    if (adobeEdgeHeader) {
      var headerParts = adobeEdgeHeader.split(";");
      if (headerParts.length >= 2 && headerParts[1].length > 0) {
        try {
          var regionId = parseInt(headerParts[1], 10);
          if (!Number.isNaN(regionId)) {
            return {
              regionId: regionId
            };
          }
        } catch (_unused) {
          // No need to do anything. The log statement below will log an error
        }
      }
      logger.warn("Invalid adobe edge: \"" + adobeEdgeHeader + "\"");
    }
    return {};
  };
};
exports["default"] = _default;

},{}],249:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../../utils/index.js");
var _cookieNameKey = require("../../constants/cookieNameKey.js");
var _legacyCookies = require("../../constants/legacyCookies.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var orgId = _ref.orgId,
    cookieJar = _ref.cookieJar;
  var clusterCookieName = (0, _index.getNamespacedCookieName)(orgId, _cookieNameKey.CLUSTER);
  var fromClusterCookie = function fromClusterCookie() {
    return cookieJar.get(clusterCookieName);
  };
  var fromTarget = function fromTarget() {
    var mboxEdgeCluster = cookieJar.get(_legacyCookies.MBOX_EDGE_CLUSTER);
    if (mboxEdgeCluster) {
      return "t" + mboxEdgeCluster;
    }
    return undefined;
  };
  return function () {
    return fromClusterCookie() || fromTarget();
  };
};
exports["default"] = _default;

},{"../../constants/cookieNameKey.js":204,"../../constants/legacyCookies.js":220,"../../utils/index.js":300}],250:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _httpStatusCode = require("../../constants/httpStatusCode.js");
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

var MESSAGE_PREFIX = "The server responded with a";
var _default = function _default(_ref) {
  var logger = _ref.logger;
  return function (networkResponse) {
    var statusCode = networkResponse.statusCode,
      body = networkResponse.body,
      parsedBody = networkResponse.parsedBody;
    if (statusCode < 200 || statusCode >= 300 || !parsedBody && statusCode !== _httpStatusCode.NO_CONTENT || parsedBody && !Array.isArray(parsedBody.handle)) {
      var bodyToLog = parsedBody ? JSON.stringify(parsedBody, null, 2) : body;
      var messageSuffix = bodyToLog ? "response body:\n" + bodyToLog : "no response body.";
      throw new Error(MESSAGE_PREFIX + " status code " + statusCode + " and " + messageSuffix);
    }
    if (parsedBody) {
      var _parsedBody$warnings = parsedBody.warnings,
        warnings = _parsedBody$warnings === void 0 ? [] : _parsedBody$warnings,
        _parsedBody$errors = parsedBody.errors,
        errors = _parsedBody$errors === void 0 ? [] : _parsedBody$errors;
      warnings.forEach(function (warning) {
        logger.warn(MESSAGE_PREFIX + " warning:", warning);
      });
      errors.forEach(function (error) {
        logger.error(MESSAGE_PREFIX + " non-fatal error:", error);
      });
    }
  };
};
exports["default"] = _default;

},{"../../constants/httpStatusCode.js":218}],251:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _domain = require("../../constants/domain.js");
var _apiVersion = require("../../constants/apiVersion.js");
var _index = require("../../utils/index.js");
var _networkErrors = require("../../utils/networkErrors.js");
var _mergeLifecycleResponses = require("./mergeLifecycleResponses.js");
var _handleRequestFailure = require("./handleRequestFailure.js");
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

var isDemdexBlockedError = function isDemdexBlockedError(error, request) {
  return request.getUseIdThirdPartyDomain() && (0, _networkErrors.isNetworkError)(error);
};
var _default = function _default(_ref) {
  var config = _ref.config,
    lifecycle = _ref.lifecycle,
    cookieTransfer = _ref.cookieTransfer,
    sendNetworkRequest = _ref.sendNetworkRequest,
    createResponse = _ref.createResponse,
    processWarningsAndErrors = _ref.processWarningsAndErrors,
    getLocationHint = _ref.getLocationHint,
    getAssuranceValidationTokenParams = _ref.getAssuranceValidationTokenParams;
  var edgeDomain = config.edgeDomain,
    edgeBasePath = config.edgeBasePath,
    datastreamId = config.datastreamId;
  var hasDemdexFailed = false;
  var buildEndpointUrl = function buildEndpointUrl(endpointDomain, request) {
    var locationHint = getLocationHint();
    var edgeBasePathWithLocationHint = locationHint ? edgeBasePath + "/" + locationHint + request.getEdgeSubPath() : "" + edgeBasePath + request.getEdgeSubPath();
    var configId = request.getDatastreamIdOverride() || datastreamId;
    if (configId !== datastreamId) {
      request.getPayload().mergeMeta({
        sdkConfig: {
          datastream: {
            original: datastreamId
          }
        }
      });
    }
    return "https://" + endpointDomain + "/" + edgeBasePathWithLocationHint + "/" + _apiVersion["default"] + "/" + request.getAction() + "?configId=" + configId + "&requestId=" + request.getId() + getAssuranceValidationTokenParams();
  };

  /**
   * Sends a network request that is aware of payload interfaces,
   * lifecycle methods, configured edge domains, response structures, etc.
   */
  return function (_ref2) {
    var request = _ref2.request,
      _ref2$runOnResponseCa = _ref2.runOnResponseCallbacks,
      runOnResponseCallbacks = _ref2$runOnResponseCa === void 0 ? _index.noop : _ref2$runOnResponseCa,
      _ref2$runOnRequestFai = _ref2.runOnRequestFailureCallbacks,
      runOnRequestFailureCallbacks = _ref2$runOnRequestFai === void 0 ? _index.noop : _ref2$runOnRequestFai;
    var onResponseCallbackAggregator = (0, _index.createCallbackAggregator)();
    onResponseCallbackAggregator.add(lifecycle.onResponse);
    onResponseCallbackAggregator.add(runOnResponseCallbacks);
    var onRequestFailureCallbackAggregator = (0, _index.createCallbackAggregator)();
    onRequestFailureCallbackAggregator.add(lifecycle.onRequestFailure);
    onRequestFailureCallbackAggregator.add(runOnRequestFailureCallbacks);
    return lifecycle.onBeforeRequest({
      request: request,
      onResponse: onResponseCallbackAggregator.add,
      onRequestFailure: onRequestFailureCallbackAggregator.add
    }).then(function () {
      var endpointDomain = hasDemdexFailed || !request.getUseIdThirdPartyDomain() ? edgeDomain : _domain.ID_THIRD_PARTY;
      var url = buildEndpointUrl(endpointDomain, request);
      var payload = request.getPayload();
      cookieTransfer.cookiesToPayload(payload, endpointDomain);
      return sendNetworkRequest({
        requestId: request.getId(),
        url: url,
        payload: payload,
        useSendBeacon: request.getUseSendBeacon()
      });
    }).then(function (networkResponse) {
      processWarningsAndErrors(networkResponse);
      return networkResponse;
    })["catch"](function (error) {
      if (isDemdexBlockedError(error, request)) {
        hasDemdexFailed = true;
        request.setUseIdThirdPartyDomain(false);
        var url = buildEndpointUrl(edgeDomain, request);
        var payload = request.getPayload();
        cookieTransfer.cookiesToPayload(payload, edgeDomain);
        return sendNetworkRequest({
          requestId: request.getId(),
          url: url,
          payload: payload,
          useSendBeacon: request.getUseSendBeacon()
        });
      }
      return (0, _handleRequestFailure["default"])(onRequestFailureCallbackAggregator)(error);
    }).then(function (_ref3) {
      var parsedBody = _ref3.parsedBody,
        getHeader = _ref3.getHeader;
      // Note that networkResponse.parsedBody may be undefined if it was a
      // 204 No Content response. That's fine.
      var response = createResponse({
        content: parsedBody,
        getHeader: getHeader
      });
      cookieTransfer.responseToCookies(response);

      // Notice we're calling the onResponse lifecycle method even if there are errors
      // inside the response body. This is because the full request didn't actually fail--
      // only portions of it that are considered non-fatal (a specific, non-critical
      // Konductor plugin, for example).
      return onResponseCallbackAggregator.call({
        response: response
      }).then(_mergeLifecycleResponses["default"]);
    });
  };
};
exports["default"] = _default;

},{"../../constants/apiVersion.js":199,"../../constants/domain.js":210,"../../utils/index.js":300,"../../utils/networkErrors.js":322,"./handleRequestFailure.js":246,"./mergeLifecycleResponses.js":252}],252:[function(require,module,exports){
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
exports["default"] = void 0;
var _index = require("../../utils/index.js");
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
var _default = function _default(returnValues) {
  // Merges all returned objects from all `onResponse` callbacks into
  // a single object that can later be returned to the customer.
  var lifecycleOnResponseReturnValues = returnValues.shift() || [];
  var consumerOnResponseReturnValues = returnValues.shift() || [];
  var lifecycleOnBeforeRequestReturnValues = returnValues;
  return (0, _index.assignConcatArrayValues).apply(void 0, [{}].concat(_toConsumableArray(lifecycleOnResponseReturnValues), _toConsumableArray(consumerOnResponseReturnValues), _toConsumableArray(lifecycleOnBeforeRequestReturnValues)));
};
exports["default"] = _default;

},{"../../utils/index.js":300}],253:[function(require,module,exports){
"use strict";

exports["default"] = exports.createExecuteCommand = void 0;
var _createInstanceFunction = require("./createInstanceFunction.js");
var _index = require("../utils/index.js");
var _createLogController = require("./createLogController.js");
var _createLifecycle = require("./createLifecycle.js");
var _createComponentRegistry = require("./createComponentRegistry.js");
var _injectSendNetworkRequest = require("./network/injectSendNetworkRequest.js");
var _injectExtractEdgeInfo = require("./edgeNetwork/injectExtractEdgeInfo.js");
var _createConsent = require("./consent/createConsent.js");
var _createConsentStateMachine = require("./consent/createConsentStateMachine.js");
var _createEvent = require("./createEvent.js");
var _injectCreateResponse = require("./injectCreateResponse.js");
var _injectExecuteCommand = require("./injectExecuteCommand.js");
var _validateCommandOptions = require("./validateCommandOptions.js");
var _buildAndValidateConfig = require("./buildAndValidateConfig.js");
var _initializeComponents = require("./initializeComponents.js");
var _createConfig = require("./config/createConfig.js");
var _createCoreConfigs = require("./config/createCoreConfigs.js");
var _injectHandleError = require("./injectHandleError.js");
var _injectSendFetchRequest = require("./network/requestMethods/injectSendFetchRequest.js");
var _injectSendBeaconRequest = require("./network/requestMethods/injectSendBeaconRequest.js");
var _createLogger = require("./createLogger.js");
var _createEventManager = require("./createEventManager.js");
var _createCookieTransfer = require("./createCookieTransfer.js");
var _injectShouldTransferCookie = require("./injectShouldTransferCookie.js");
var _index2 = require("../utils/request/index.js");
var _injectSendEdgeNetworkRequest = require("./edgeNetwork/injectSendEdgeNetworkRequest.js");
var _injectProcessWarningsAndErrors = require("./edgeNetwork/injectProcessWarningsAndErrors.js");
var _injectGetLocationHint = require("./edgeNetwork/injectGetLocationHint.js");
var _isRequestRetryable = require("./network/isRequestRetryable.js");
var _getRequestRetryDelay = require("./network/getRequestRetryDelay.js");
var _injectApplyResponse = require("./edgeNetwork/injectApplyResponse.js");
var requiredComponents = require("./requiredComponentCreators.js");
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

var createNamespacedStorage = (0, _index.injectStorage)(window);
var _window = window,
  console = _window.console,
  fetch = _window.fetch,
  navigator = _window.navigator;

// set this up as a function so that monitors can be added at anytime
// eslint-disable-next-line no-underscore-dangle
var getMonitors = function getMonitors() {
  return window.__alloyMonitors || [];
};
var coreConfigValidators = (0, _createCoreConfigs["default"])();
var apexDomain = (0, _index.getApexDomain)(window, _index.cookieJar);
var sendFetchRequest = (0, _injectSendFetchRequest["default"])({
  fetch: fetch
});
var fireReferrerHideableImage = (0, _index.injectFireReferrerHideableImage)();
var getAssuranceValidationTokenParams = (0, _index2.createGetAssuranceValidationTokenParams)({
  window: window,
  createNamespacedStorage: createNamespacedStorage
});
var getBrowser = (0, _index.injectGetBrowser)({
  userAgent: window.navigator.userAgent
});
var createExecuteCommand = function createExecuteCommand(_ref) {
  var instanceName = _ref.instanceName,
    _ref$logController = _ref.logController,
    setDebugEnabled = _ref$logController.setDebugEnabled,
    logger = _ref$logController.logger,
    createComponentLogger = _ref$logController.createComponentLogger,
    components = _ref.components;
  var componentRegistry = (0, _createComponentRegistry["default"])();
  var lifecycle = (0, _createLifecycle["default"])(componentRegistry);
  var componentCreators = components.concat(Object.values(requiredComponents));
  var setDebugCommand = function setDebugCommand(options) {
    setDebugEnabled(options.enabled, {
      fromConfig: false
    });
  };
  var loggingCookieJar = (0, _index.createLoggingCookieJar)({
    logger: logger,
    cookieJar: _index.cookieJar
  });
  var configureCommand = function configureCommand(options) {
    var config = (0, _buildAndValidateConfig["default"])({
      options: options,
      componentCreators: componentCreators,
      coreConfigValidators: coreConfigValidators,
      createConfig: _createConfig["default"],
      logger: logger,
      setDebugEnabled: setDebugEnabled
    });
    var orgId = config.orgId,
      targetMigrationEnabled = config.targetMigrationEnabled;
    var shouldTransferCookie = (0, _injectShouldTransferCookie["default"])({
      orgId: orgId,
      targetMigrationEnabled: targetMigrationEnabled
    });
    var cookieTransfer = (0, _createCookieTransfer["default"])({
      cookieJar: loggingCookieJar,
      shouldTransferCookie: shouldTransferCookie,
      apexDomain: apexDomain,
      dateProvider: function dateProvider() {
        return new Date();
      }
    });
    var sendBeaconRequest = (0, _index.isFunction)(navigator.sendBeacon) ? (0, _injectSendBeaconRequest["default"])({
      // Without the bind(), the browser will complain about an
      // illegal invocation.
      sendBeacon: navigator.sendBeacon.bind(navigator),
      sendFetchRequest: sendFetchRequest,
      logger: logger
    }) : sendFetchRequest;
    var sendNetworkRequest = (0, _injectSendNetworkRequest["default"])({
      logger: logger,
      sendFetchRequest: sendFetchRequest,
      sendBeaconRequest: sendBeaconRequest,
      isRequestRetryable: _isRequestRetryable["default"],
      getRequestRetryDelay: _getRequestRetryDelay["default"]
    });
    var processWarningsAndErrors = (0, _injectProcessWarningsAndErrors["default"])({
      logger: logger
    });
    var extractEdgeInfo = (0, _injectExtractEdgeInfo["default"])({
      logger: logger
    });
    var createResponse = (0, _injectCreateResponse["default"])({
      extractEdgeInfo: extractEdgeInfo
    });
    var getLocationHint = (0, _injectGetLocationHint["default"])({
      orgId: orgId,
      cookieJar: _index.cookieJar
    });
    var sendEdgeNetworkRequest = (0, _injectSendEdgeNetworkRequest["default"])({
      config: config,
      lifecycle: lifecycle,
      cookieTransfer: cookieTransfer,
      sendNetworkRequest: sendNetworkRequest,
      createResponse: createResponse,
      processWarningsAndErrors: processWarningsAndErrors,
      getLocationHint: getLocationHint,
      getAssuranceValidationTokenParams: getAssuranceValidationTokenParams
    });
    var applyResponse = (0, _injectApplyResponse["default"])({
      lifecycle: lifecycle,
      cookieTransfer: cookieTransfer,
      createResponse: createResponse,
      processWarningsAndErrors: processWarningsAndErrors
    });
    var generalConsentState = (0, _createConsentStateMachine["default"])({
      logger: logger
    });
    var consent = (0, _createConsent["default"])({
      generalConsentState: generalConsentState,
      logger: logger
    });
    var eventManager = (0, _createEventManager["default"])({
      config: config,
      logger: logger,
      lifecycle: lifecycle,
      consent: consent,
      createEvent: _createEvent["default"],
      createDataCollectionRequestPayload: _index2.createDataCollectionRequestPayload,
      createDataCollectionRequest: _index2.createDataCollectionRequest,
      sendEdgeNetworkRequest: sendEdgeNetworkRequest,
      applyResponse: applyResponse
    });
    return (0, _initializeComponents["default"])({
      componentCreators: componentCreators,
      lifecycle: lifecycle,
      componentRegistry: componentRegistry,
      getImmediatelyAvailableTools: function getImmediatelyAvailableTools(componentName) {
        var componentLogger = createComponentLogger(componentName);
        return {
          config: config,
          componentRegistry: componentRegistry,
          consent: consent,
          eventManager: eventManager,
          fireReferrerHideableImage: fireReferrerHideableImage,
          logger: componentLogger,
          lifecycle: lifecycle,
          sendEdgeNetworkRequest: sendEdgeNetworkRequest,
          handleError: (0, _injectHandleError["default"])({
            errorPrefix: "[" + instanceName + "] [" + componentName + "]",
            logger: componentLogger
          }),
          createNamespacedStorage: createNamespacedStorage,
          apexDomain: apexDomain,
          getBrowser: getBrowser
        };
      }
    });
  };
  var handleError = (0, _injectHandleError["default"])({
    errorPrefix: "[" + instanceName + "]",
    logger: logger
  });
  var executeCommand = (0, _injectExecuteCommand["default"])({
    logger: logger,
    configureCommand: configureCommand,
    setDebugCommand: setDebugCommand,
    handleError: handleError,
    validateCommandOptions: _validateCommandOptions["default"]
  });
  return executeCommand;
};
exports.createExecuteCommand = createExecuteCommand;
var _default = function _default(_ref2) {
  var components = _ref2.components;
  // eslint-disable-next-line no-underscore-dangle
  var instanceNames = window.__alloyNS;
  if (instanceNames) {
    instanceNames.forEach(function (instanceName) {
      var logController = (0, _createLogController["default"])({
        console: console,
        locationSearch: window.location.search,
        createLogger: _createLogger["default"],
        instanceName: instanceName,
        createNamespacedStorage: createNamespacedStorage,
        getMonitors: getMonitors
      });
      var executeCommand = createExecuteCommand({
        instanceName: instanceName,
        logController: logController,
        components: components
      });
      var instance = (0, _createInstanceFunction["default"])(executeCommand);
      var queue = window[instanceName].q;
      queue.push = instance;
      logController.logger.logOnInstanceCreated({
        instance: instance
      });
      queue.forEach(instance);
    });
  }
};
exports["default"] = _default;

},{"../utils/index.js":300,"../utils/request/index.js":335,"./buildAndValidateConfig.js":232,"./config/createConfig.js":234,"./config/createCoreConfigs.js":235,"./consent/createConsent.js":236,"./consent/createConsentStateMachine.js":237,"./createComponentRegistry.js":238,"./createCookieTransfer.js":239,"./createEvent.js":240,"./createEventManager.js":241,"./createInstanceFunction.js":242,"./createLifecycle.js":243,"./createLogController.js":244,"./createLogger.js":245,"./edgeNetwork/injectApplyResponse.js":247,"./edgeNetwork/injectExtractEdgeInfo.js":248,"./edgeNetwork/injectGetLocationHint.js":249,"./edgeNetwork/injectProcessWarningsAndErrors.js":250,"./edgeNetwork/injectSendEdgeNetworkRequest.js":251,"./initializeComponents.js":254,"./injectCreateResponse.js":255,"./injectExecuteCommand.js":256,"./injectHandleError.js":257,"./injectShouldTransferCookie.js":258,"./network/getRequestRetryDelay.js":259,"./network/injectSendNetworkRequest.js":260,"./network/isRequestRetryable.js":261,"./network/requestMethods/injectSendBeaconRequest.js":262,"./network/requestMethods/injectSendFetchRequest.js":263,"./requiredComponentCreators.js":264,"./validateCommandOptions.js":265}],254:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../utils/index.js");
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
var _default = function _default(_ref) {
  var componentCreators = _ref.componentCreators,
    lifecycle = _ref.lifecycle,
    componentRegistry = _ref.componentRegistry,
    getImmediatelyAvailableTools = _ref.getImmediatelyAvailableTools;
  componentCreators.forEach(function (createComponent) {
    var namespace = createComponent.namespace;
    // TO-DOCUMENT: Helpers that we inject into factories.
    var tools = getImmediatelyAvailableTools(namespace);
    var component;
    try {
      component = createComponent(tools);
    } catch (error) {
      throw (0, _index.stackError)({
        error: error,
        message: "[" + namespace + "] An error occurred during component creation."
      });
    }
    componentRegistry.register(namespace, component);
  });
  return lifecycle.onComponentsRegistered({
    lifecycle: lifecycle
  }).then(function () {
    return componentRegistry;
  });
};
exports["default"] = _default;

},{"../utils/index.js":300}],255:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _httpHeaderNames = require("../constants/httpHeaderNames.js");
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
/**
 * Creates a representation of a gateway response with the addition of
 * helper methods.
 * @returns Response
 */
var _default = function _default(_ref) {
  var extractEdgeInfo = _ref.extractEdgeInfo;
  return function (_ref2) {
    var _ref2$content = _ref2.content,
      content = _ref2$content === void 0 ? {} : _ref2$content,
      getHeader = _ref2.getHeader;
    var _content$handle = content.handle,
      handle = _content$handle === void 0 ? [] : _content$handle,
      _content$errors = content.errors,
      errors = _content$errors === void 0 ? [] : _content$errors,
      _content$warnings = content.warnings,
      warnings = _content$warnings === void 0 ? [] : _content$warnings;

    /**
     * Response object.
     * @typedef {Object} Response
     */
    return {
      /**
       * Returns matching fragments of the response by type.
       * @param {String} type A string with the current format: <namespace:action>
       *
       * @example
       * getPayloadsByType("identity:persist")
       */
      getPayloadsByType: function getPayloadsByType(type) {
        return handle.filter(function (fragment) {
          return fragment.type === type;
        }).flatMap(function (fragment) {
          return fragment.payload;
        });
      },
      /**
       * Returns all errors.
       */
      getErrors: function getErrors() {
        return errors;
      },
      /**
       * Returns all warnings.
       */
      getWarnings: function getWarnings() {
        return warnings;
      },
      /**
       * Returns an object containing the regionId from the x-adobe-edge header
       */
      getEdge: function getEdge() {
        return extractEdgeInfo(getHeader(_httpHeaderNames.ADOBE_EDGE));
      },
      toJSON: function toJSON() {
        return content;
      }
    };
  };
};
exports["default"] = _default;

},{"../constants/httpHeaderNames.js":217}],256:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../utils/index.js");
var _coreCommands = require("../constants/coreCommands.js");
var _index2 = require("../utils/validation/index.js");
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
var _default = function _default(_ref) {
  var logger = _ref.logger,
    configureCommand = _ref.configureCommand,
    setDebugCommand = _ref.setDebugCommand,
    handleError = _ref.handleError,
    validateCommandOptions = _ref.validateCommandOptions;
  var configurePromise;
  var getExecutor = function getExecutor(commandName, options) {
    var executor;
    if (commandName === _coreCommands.CONFIGURE) {
      if (configurePromise) {
        throw new Error("The library has already been configured and may only be configured once.");
      }
      executor = function executor() {
        configurePromise = configureCommand(options);
        return configurePromise.then(function () {
          // Don't expose internals to the user.
        });
      };
    } else {
      if (!configurePromise) {
        throw new Error("The library must be configured first. Please do so by executing the configure command.");
      }
      if (commandName === _coreCommands.SET_DEBUG) {
        executor = function executor() {
          var optionsValidator = (0, _index2.objectOf)({
            enabled: (0, _index2["boolean"])().required()
          }).noUnknownFields();
          var validatedOptions = validateCommandOptions({
            command: {
              commandName: _coreCommands.SET_DEBUG,
              optionsValidator: optionsValidator
            },
            options: options
          });
          setDebugCommand(validatedOptions);
        };
      } else {
        executor = function executor() {
          return configurePromise.then(function (componentRegistry) {
            var command = componentRegistry.getCommand(commandName);
            if (!command || !(0, _index.isFunction)(command.run)) {
              var commandNames = [_coreCommands.CONFIGURE, _coreCommands.SET_DEBUG].concat(componentRegistry.getCommandNames()).join(", ");
              throw new Error("The " + commandName + " command does not exist. List of available commands: " + commandNames + ".");
            }
            var validatedOptions = validateCommandOptions({
              command: command,
              options: options
            });
            return command.run(validatedOptions);
          }, function () {
            logger.warn("An error during configuration is preventing the " + commandName + " command from executing.");
            // If configuration failed, we prevent the configuration
            // error from bubbling here because we don't want the
            // configuration error to be reported in the console every
            // time any command is executed. Only having it bubble
            // once when the configure command runs is sufficient.
            // Instead, for this command, we'll just return a promise
            // that never gets resolved.
            return new Promise(function () {});
          });
        };
      }
    }
    return executor;
  };
  return function (commandName) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve) {
      // We have to wrap the getExecutor() call in the promise so the promise
      // will be rejected if getExecutor() throws errors.
      var executor = getExecutor(commandName, options);
      logger.logOnBeforeCommand({
        commandName: commandName,
        options: options
      });
      resolve(executor());
    })["catch"](function (error) {
      return handleError(error, commandName + " command");
    })["catch"](function (error) {
      logger.logOnCommandRejected({
        commandName: commandName,
        options: options,
        error: error
      });
      throw error;
    }).then(function (rawResult) {
      // We should always be returning an object from every command.
      var result = (0, _index.isObject)(rawResult) ? rawResult : {};
      logger.logOnCommandResolved({
        commandName: commandName,
        options: options,
        result: result
      });
      return result;
    });
  };
};
exports["default"] = _default;

},{"../constants/coreCommands.js":206,"../utils/index.js":300,"../utils/validation/index.js":364}],257:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../utils/index.js");
var _createConsentStateMachine = require("./consent/createConsentStateMachine.js");
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
var _default = function _default(_ref) {
  var errorPrefix = _ref.errorPrefix,
    logger = _ref.logger;
  return function (error, operation) {
    var err = (0, _index.toError)(error);

    // In the case of declined consent, we've opted to not reject the promise
    // returned to the customer, but instead resolve the promise with an
    // empty result object.
    if (err.code === _createConsentStateMachine.DECLINED_CONSENT_ERROR_CODE) {
      logger.warn("The " + operation + " could not fully complete. " + err.message);
      return {};
    }
    (0, _index.updateErrorMessage)({
      error: err,
      message: errorPrefix + " " + err.message
    });
    throw err;
  };
};
exports["default"] = _default;

},{"../utils/index.js":300,"./consent/createConsentStateMachine.js":237}],258:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../utils/index.js");
var _legacyCookies = require("../constants/legacyCookies.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var orgId = _ref.orgId,
    targetMigrationEnabled = _ref.targetMigrationEnabled;
  return function (name) {
    // We have a contract with the server that we will pass
    // all cookies whose names are namespaced according to the
    // logic in isNamespacedCookieName as well as any legacy
    // cookie names (so that the server can handle migrating
    // identities on websites previously using Visitor.js)
    return (0, _index.isNamespacedCookieName)(orgId, name) || name === _legacyCookies.AT_QA_MODE || targetMigrationEnabled && name === _legacyCookies.MBOX;
  };
};
exports["default"] = _default;

},{"../constants/legacyCookies.js":220,"../utils/index.js":300}],259:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _httpHeaderNames = require("../../constants/httpHeaderNames.js");
var _index = require("../../utils/index.js");
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

// The retry gets incrementally (but not exponentially) longer for each retry.
var FIRST_DELAY_MILLIS = 1000;
var INCREMENTAL_DELAY_MILLIS = 1000;

// When the target delay is randomized, make it within the range of this percentage above or below the target delay.
var MAX_RANDOM_VARIANCE_PERCENTAGE = 0.3;
var calculateRetryDelay = function calculateRetryDelay(retriesAttempted) {
  var targetDelay = FIRST_DELAY_MILLIS + retriesAttempted * INCREMENTAL_DELAY_MILLIS;
  var maxVariance = targetDelay * MAX_RANDOM_VARIANCE_PERCENTAGE;
  var minDelay = targetDelay - maxVariance;
  var maxDelay = targetDelay + maxVariance;
  var randomizedDelayWithinRange = Math.round(minDelay + Math.random() * (maxDelay - minDelay));
  return randomizedDelayWithinRange;
};
var getDelayFromHeader = function getDelayFromHeader(response) {
  // According to the HTTP spec, if the header is defined, its value will be a string that
  // represents either:
  //  * An integer indicating the number of seconds to delay.
  //  * A date after which a retry may occur. The date would be in HTTP-date
  //    format (https://tools.ietf.org/html/rfc7231#section-7.1.1.1). When debugging, it can
  //    be helpful to know that this is the same format that a JavaScript date's
  //    toGMTString() returns.
  var headerValue = response.getHeader(_httpHeaderNames.RETRY_AFTER);
  var delayInMillis;
  if (headerValue) {
    var headerValueInt = parseInt(headerValue, 10);
    if ((0, _index.isInteger)(headerValueInt)) {
      delayInMillis = headerValueInt * 1000;
    } else {
      delayInMillis = Math.max(0, new Date(headerValue).getTime() - new Date().getTime());
    }
  }
  return delayInMillis;
};

// These rules are in accordance with
// https://git.corp.adobe.com/pages/experience-edge/konductor/#/apis/errors?id=handling-4xx-and-5xx-responses
// For retry delays that don't come from a Retry-After response header, we try to stick with the following best
// practices outlined in https://docs.microsoft.com/en-us/azure/architecture/best-practices/transient-faults:
//  * Incremental retry
//  * Random interval
var _default = function _default(_ref) {
  var response = _ref.response,
    retriesAttempted = _ref.retriesAttempted;
  // Technically, only 429 or 503 responses should have a Retry-After header, but we'll respect the
  // header if we find it on any response.
  var delayInMillis = getDelayFromHeader(response);

  // Note that the value of delay may be 0 at this point, which would be a valid delay we want to use
  // and not override, which is why we don't do:
  // if (!delay) { ... }
  if (delayInMillis === undefined) {
    delayInMillis = calculateRetryDelay(retriesAttempted);
  }
  return delayInMillis;
};
exports["default"] = _default;

},{"../../constants/httpHeaderNames.js":217,"../../utils/index.js":300}],260:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _index = require("../../utils/index.js");
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
var _default = function _default(_ref) {
  var logger = _ref.logger,
    sendFetchRequest = _ref.sendFetchRequest,
    sendBeaconRequest = _ref.sendBeaconRequest,
    isRequestRetryable = _ref.isRequestRetryable,
    getRequestRetryDelay = _ref.getRequestRetryDelay;
  /**
   * Send a network request and returns details about the response.
   */
  return function (_ref2) {
    var requestId = _ref2.requestId,
      url = _ref2.url,
      payload = _ref2.payload,
      useSendBeacon = _ref2.useSendBeacon;
    // We want to log raw payload and event data rather than
    // our fancy wrapper objects. Calling payload.toJSON() is
    // insufficient to get all the nested raw data, because it's
    // not recursive (it doesn't call toJSON() on the event objects).
    // Parsing the result of JSON.stringify(), however, gives the
    // fully recursive raw data.
    var stringifiedPayload = JSON.stringify(payload);
    var parsedPayload = JSON.parse(stringifiedPayload);
    logger.logOnBeforeNetworkRequest({
      url: url,
      requestId: requestId,
      payload: parsedPayload
    });
    var _executeRequest = function executeRequest() {
      var retriesAttempted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var requestMethod = useSendBeacon ? sendBeaconRequest : sendFetchRequest;
      return requestMethod(url, stringifiedPayload).then(function (response) {
        var requestIsRetryable = isRequestRetryable({
          response: response,
          retriesAttempted: retriesAttempted
        });
        if (requestIsRetryable) {
          var requestRetryDelay = getRequestRetryDelay({
            response: response,
            retriesAttempted: retriesAttempted
          });
          return new Promise(function (resolve) {
            setTimeout(function () {
              resolve(_executeRequest(retriesAttempted + 1));
            }, requestRetryDelay);
          });
        }
        var parsedBody;
        try {
          parsedBody = JSON.parse(response.body);
        } catch (_unused) {
          // Non-JSON. Something went wrong.
        }
        logger.logOnNetworkResponse(_objectSpread(_objectSpread({
          requestId: requestId,
          url: url,
          payload: parsedPayload
        }, response), {}, {
          parsedBody: parsedBody,
          retriesAttempted: retriesAttempted
        }));
        return {
          statusCode: response.statusCode,
          body: response.body,
          parsedBody: parsedBody,
          getHeader: response.getHeader
        };
      });
    };
    return _executeRequest()["catch"](function (error) {
      logger.logOnNetworkError({
        requestId: requestId,
        url: url,
        payload: parsedPayload,
        error: error
      });
      throw (0, _index.stackError)({
        error: error,
        message: "Network request failed."
      });
    });
  };
};
exports["default"] = _default;

},{"../../utils/index.js":300}],261:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _httpStatusCode = require("../../constants/httpStatusCode.js");
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

var MAX_RETRIES = 3;
var RETRYABLE_STATUS_CODES = [_httpStatusCode.TOO_MANY_REQUESTS, _httpStatusCode.SERVICE_UNAVAILABLE, _httpStatusCode.BAD_GATEWAY, _httpStatusCode.GATEWAY_TIMEOUT];

// These rules are in accordance with
// https://git.corp.adobe.com/pages/experience-edge/konductor/#/apis/errors?id=handling-4xx-and-5xx-responses
var _default = function _default(_ref) {
  var response = _ref.response,
    retriesAttempted = _ref.retriesAttempted;
  return retriesAttempted < MAX_RETRIES && RETRYABLE_STATUS_CODES.includes(response.statusCode);
};
exports["default"] = _default;

},{"../../constants/httpStatusCode.js":218}],262:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var sendBeacon = _ref.sendBeacon,
    sendFetchRequest = _ref.sendFetchRequest,
    logger = _ref.logger;
  return function (url, body) {
    var blob = new Blob([body], {
      type: "text/plain; charset=UTF-8"
    });
    if (!sendBeacon(url, blob)) {
      logger.info("Unable to use `sendBeacon`; falling back to `fetch`.");
      return sendFetchRequest(url, body);
    }

    // Using sendBeacon, we technically don't get a response back from
    // the server, but we'll resolve the promise with an object to maintain
    // consistency with other network strategies.
    return Promise.resolve({
      statusCode: 204,
      getHeader: function getHeader() {
        return null;
      },
      body: ""
    });
  };
};
exports["default"] = _default;

},{}],263:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var fetch = _ref.fetch;
  return function (url, body) {
    return fetch(url, {
      method: "POST",
      cache: "no-cache",
      credentials: "include",
      // To set the cookie header in the request.
      headers: {
        "Content-Type": "text/plain; charset=UTF-8"
      },
      referrerPolicy: "no-referrer-when-downgrade",
      body: body
    }).then(function (response) {
      return response.text().then(function (responseBody) {
        return {
          statusCode: response.status,
          // We expose headers through a function instead of creating an object
          // with all the headers up front largely because the native
          // request.getResponseHeader method is case-insensitive.
          getHeader: function getHeader(name) {
            return response.headers.get(name);
          },
          body: responseBody
        };
      });
    });
  };
};
exports["default"] = _default;

},{}],264:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "dataCollector", {
  enumerable: true,
  get: function get() {
    return _index["default"];
  }
});
Object.defineProperty(exports, "identity", {
  enumerable: true,
  get: function get() {
    return _index2["default"];
  }
});
Object.defineProperty(exports, "libraryInfo", {
  enumerable: true,
  get: function get() {
    return _index3["default"];
  }
});
var _index = require("../components/DataCollector/index.js");
var _index2 = require("../components/Identity/index.js");
var _index3 = require("../components/LibraryInfo/index.js");

},{"../components/DataCollector/index.js":55,"../components/Identity/index.js":72,"../components/LibraryInfo/index.js":84}],265:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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

var COMMAND_DOC_URI = "https://adobe.ly/3sHgQHb";
var _default = function _default(_ref) {
  var command = _ref.command,
    options = _ref.options;
  var commandName = command.commandName,
    _command$documentatio = command.documentationUri,
    documentationUri = _command$documentatio === void 0 ? COMMAND_DOC_URI : _command$documentatio,
    optionsValidator = command.optionsValidator;
  var validatedOptions = options;
  if (optionsValidator) {
    try {
      validatedOptions = optionsValidator(options);
    } catch (validationError) {
      var invalidOptionsMessage = "Invalid " + commandName + " command options:\n\t - " + validationError + " For command documentation see: " + documentationUri;
      throw new Error(invalidOptionsMessage);
    }
  }
  return validatedOptions;
};
exports["default"] = _default;

},{}],266:[function(require,module,exports){
"use strict";

exports.createInstance = exports.createCustomInstance = exports.components = void 0;
var _index = require("./core/index.js");
var _createLogger = require("./core/createLogger.js");
var _createLogController = require("./core/createLogController.js");
var _index2 = require("./utils/index.js");
var _index3 = require("./utils/validation/index.js");
var optionalComponents = require("./core/componentCreators.js");
exports.components = optionalComponents;
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

// This file is used to rollup the code into an ES module version to be used by other npm projects
// like the launch extension. Everything that is exported here can be used independently by other
// npm projects.

var _window = window,
  console = _window.console;
var createNamespacedStorage = (0, _index2.injectStorage)(window);
var createCustomInstance = function createCustomInstance() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var eventOptionsValidator = (0, _index3.objectOf)({
    name: (0, _index3.string)()["default"]("alloy"),
    monitors: (0, _index3.arrayOf)((0, _index3.objectOf)({}))["default"]([]),
    components: (0, _index3.arrayOf)((0, _index3.callback)())
  }).noUnknownFields();
  var _eventOptionsValidato = eventOptionsValidator(options),
    name = _eventOptionsValidato.name,
    monitors = _eventOptionsValidato.monitors,
    components = _eventOptionsValidato.components;

  // this is a function so that window.__alloyMonitors can be set or added to at any time
  // eslint-disable-next-line no-underscore-dangle
  var getMonitors = function getMonitors() {
    return (window.__alloyMonitors || []).concat(monitors);
  };
  var logController = (0, _createLogController["default"])({
    console: console,
    locationSearch: window.location.search,
    createLogger: _createLogger["default"],
    instanceName: name,
    createNamespacedStorage: createNamespacedStorage,
    getMonitors: getMonitors
  });
  var instance = (0, _index.createExecuteCommand)({
    instanceName: name,
    logController: logController,
    components: components
  });
  logController.logger.logOnInstanceCreated({
    instance: instance
  });
  return instance;
};
exports.createCustomInstance = createCustomInstance;
var createInstance = function createInstance() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var eventOptionsValidator = (0, _index3.objectOf)({
    name: (0, _index3.string)()["default"]("alloy"),
    monitors: (0, _index3.arrayOf)((0, _index3.objectOf)({}))["default"]([])
  }).noUnknownFields();
  var _eventOptionsValidato2 = eventOptionsValidator(options),
    name = _eventOptionsValidato2.name,
    monitors = _eventOptionsValidato2.monitors;
  return createCustomInstance({
    name: name,
    monitors: monitors,
    components: Object.values(optionalComponents)
  });
};
exports.createInstance = createInstance;

},{"./core/componentCreators.js":233,"./core/createLogController.js":244,"./core/createLogger.js":245,"./core/index.js":253,"./utils/index.js":300,"./utils/validation/index.js":364}],267:[function(require,module,exports){
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
exports["default"] = void 0;
var _isObject = require("./isObject.js");
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
var _default = function _default() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  if (values.length < 2) {
    // if the number of args is 0 or 1, just use the default behavior from Object.assign
    return Object.assign.apply(Object, values);
  }
  return values.reduce(function (accumulator, currentValue) {
    if ((0, _isObject["default"])(currentValue)) {
      Object.keys(currentValue).forEach(function (key) {
        if (Array.isArray(currentValue[key])) {
          if (Array.isArray(accumulator[key])) {
            var _accumulator$key;
            (_accumulator$key = accumulator[key]).push.apply(_accumulator$key, _toConsumableArray(currentValue[key]));
          } else {
            // clone the array so the original isn't modified.
            accumulator[key] = _toConsumableArray(currentValue[key]);
          }
        } else {
          accumulator[key] = currentValue[key];
        }
      });
    }
    return accumulator;
  }); // no default value to pass into reduce because we want to skip the first value
};
exports["default"] = _default;

},{"./isObject.js":317}],268:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Clones a value by serializing then deserializing the value.
 * @param {*} value
 * @returns {any}
 */
var _default = function _default(value) {
  return JSON.parse(JSON.stringify(value));
};
exports["default"] = _default;

},{}],269:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _jsCookie = require("js-cookie");
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
var _default = exports["default"] = {
  get: _jsCookie["default"].get.bind(_jsCookie["default"]),
  set: _jsCookie["default"].set.bind(_jsCookie["default"]),
  remove: _jsCookie["default"].remove.bind(_jsCookie["default"]),
  withConverter: _jsCookie["default"].withConverter.bind(_jsCookie["default"])
};

},{"js-cookie":394}],270:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/* eslint-disable */

/*
crc32 · JavaScript Function to Calculate CRC32 of a String
Description
  Below is a JavaScript function to calculate CRC32 of a string. 
  The string can be either ASCII or Unicode. 
  Unicode strings will be encoded in UTF-8. 
  The polynomial used in calculation is 0xedb88320. 
  This polynomial is used in Ethernet, Gzip, PNG, SATA and many other technologies.
*/
var crc32 = function () {
  var table = [];
  for (var i = 0; i < 256; i++) {
    var c = i;
    for (var j = 0; j < 8; j++) {
      c = c & 1 ? 0xedb88320 ^ c >>> 1 : c >>> 1;
    }
    table.push(c);
  }
  return function (str, crc) {
    str = unescape(encodeURIComponent(str));
    if (!crc) crc = 0;
    crc = crc ^ -1;
    for (var _i = 0; _i < str.length; _i++) {
      var y = (crc ^ str.charCodeAt(_i)) & 0xff;
      crc = crc >>> 8 ^ table[y];
    }
    crc = crc ^ -1;
    return crc >>> 0;
  };
}();
var _default = exports["default"] = crc32;

},{}],271:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
 * Allows callbacks to be registered and then later called. When the
 * callbacks are called, their responses are combined into a single promise.
 */
var _default = function _default() {
  var callbacks = [];
  return {
    add: function add(callback) {
      callbacks.push(callback);
    },
    call: function call() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      // While this utility doesn't necessarily need to be doing the
      // Promise.all, it's currently useful everywhere this is used and
      // reduces repetitive code. We can factor it out later if we want
      // to make this utility more "pure".
      return Promise.all(callbacks.map(function (callback) {
        return callback.apply(void 0, args);
      }));
    }
  };
};
exports["default"] = _default;

},{}],272:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var eventManager = _ref.eventManager,
    mergeDecisionsMeta = _ref.mergeDecisionsMeta;
  // Called when a decision is auto-rendered for the __view__ scope or a SPA view(display and empty display notification)
  return function (_ref2) {
    var _ref2$decisionsMeta = _ref2.decisionsMeta,
      decisionsMeta = _ref2$decisionsMeta === void 0 ? [] : _ref2$decisionsMeta,
      propositionAction = _ref2.propositionAction,
      _ref2$documentMayUnlo = _ref2.documentMayUnload,
      documentMayUnload = _ref2$documentMayUnlo === void 0 ? false : _ref2$documentMayUnlo,
      _ref2$eventType = _ref2.eventType,
      eventType = _ref2$eventType === void 0 ? _eventType.DISPLAY : _ref2$eventType,
      _ref2$propositionEven = _ref2.propositionEventTypes,
      propositionEventTypes = _ref2$propositionEven === void 0 ? [(0, _propositionEventType.getPropositionEventType)(eventType)] : _ref2$propositionEven,
      viewName = _ref2.viewName;
    var event = eventManager.createEvent();
    var data = {
      eventType: eventType
    };
    if (viewName) {
      data.web = {
        webPageDetails: {
          viewName: viewName
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
exports["default"] = _default;

},{"../constants/eventType.js":214,"../constants/propositionEventType.js":225,"./index.js":300}],273:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(_ref) {
  var logger = _ref.logger,
    cookieJar = _ref.cookieJar;
  return _objectSpread(_objectSpread({}, cookieJar), {}, {
    set: function set(key, value, options) {
      logger.info("Setting cookie", _objectSpread({
        name: key,
        value: value
      }, options));
      cookieJar.set(key, value, options);
    }
  });
};
exports["default"] = _default;

},{}],274:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _deepAssign = require("./deepAssign.js");
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
/**
 * Creates a function that, when passed an object of updates, will merge
 * the updates onto the current value of a payload property.
 * @param {Object} content The base object to modify
 * @param {String } key The property to merge updates into. This
 * can be a dot-notation property path.
 * @returns {Function}
 */
var _default = function _default(content, key) {
  return function (updates) {
    var propertyPath = key.split(".");
    var hostObjectForUpdates = propertyPath.reduce(function (obj, propertyName) {
      obj[propertyName] = obj[propertyName] || {};
      return obj[propertyName];
    }, content);
    (0, _deepAssign["default"])(hostObjectForUpdates, updates);
  };
};
exports["default"] = _default;

},{"./deepAssign.js":279}],275:[function(require,module,exports){
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
exports["default"] = void 0;
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

var defaultPreprocessor = function defaultPreprocessor(params) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return args;
};

// eslint-disable-next-line no-unused-vars
var defaultEmissionCondition = function defaultEmissionCondition(params) {
  return true;
};
var createSubscription = function createSubscription() {
  var preprocessor = defaultPreprocessor;
  var emissionCondition = defaultEmissionCondition;
  var counter = 0;
  var subscriptions = {};
  var createUnsubscribe = function createUnsubscribe(id) {
    return function () {
      delete subscriptions[id];
    };
  };
  var add = function add(callback) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    if (typeof callback !== "function") {
      return function () {
        return undefined;
      };
    }
    counter += 1;
    subscriptions[counter] = {
      callback: callback,
      params: params
    };
    return {
      id: counter,
      unsubscribe: createUnsubscribe(counter)
    };
  };
  var setEmissionPreprocessor = function setEmissionPreprocessor(value) {
    if (typeof value === "function") {
      preprocessor = value;
    }
  };
  var setEmissionCondition = function setEmissionCondition(value) {
    if (typeof value === "function") {
      emissionCondition = value;
    }
  };
  var emit = function emit() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    Object.values(subscriptions).forEach(function (_ref) {
      var callback = _ref.callback,
        params = _ref.params;
      var result = preprocessor.apply(void 0, [params].concat(args));
      if (emissionCondition.apply(void 0, [params].concat(_toConsumableArray(result)))) {
        callback.apply(void 0, _toConsumableArray(result));
      }
    });
  };
  var emitOne = function emitOne(subscriptionId) {
    if (!subscriptionId || !subscriptions[subscriptionId]) {
      return;
    }
    var _subscriptions$subscr = subscriptions[subscriptionId],
      callback = _subscriptions$subscr.callback,
      params = _subscriptions$subscr.params;
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    var result = preprocessor.apply(void 0, [params].concat(args));
    if (emissionCondition.apply(void 0, [params].concat(_toConsumableArray(result)))) {
      callback.apply(void 0, _toConsumableArray(result));
    }
  };
  var hasSubscriptions = function hasSubscriptions() {
    return Object.keys(subscriptions).length > 0;
  };
  return {
    add: add,
    emit: emit,
    emitOne: emitOne,
    hasSubscriptions: hasSubscriptions,
    setEmissionPreprocessor: setEmissionPreprocessor,
    setEmissionCondition: setEmissionCondition
  };
};
var _default = exports["default"] = createSubscription;

},{}],276:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
 * Sequences tasks.
 */
var _default = function _default() {
  var queueLength = 0;
  var lastPromiseInQueue = Promise.resolve();
  return {
    /**
     * Add a task to the queue. If no task is currenty running,
     * the task will begin immediately.
     * @param {Function} task A function that will be called when
     * the task should be run. If the task it asynchronous, it should
     * return a promise.
     * @returns {Promise} A promise that will be resolved or rejected
     * with whatever value the task resolved or rejects its promise.
     */
    addTask: function addTask(task) {
      queueLength += 1;
      var lastPromiseFulfilledHandler = function lastPromiseFulfilledHandler() {
        return task()["finally"](function () {
          queueLength -= 1;
        });
      };
      lastPromiseInQueue = lastPromiseInQueue.then(lastPromiseFulfilledHandler, lastPromiseFulfilledHandler);
      return lastPromiseInQueue;
    },
    /**
     * How many tasks are in the queue. This includes the task
     * that's currently running.
     * @returns {number}
     */
    get length() {
      return queueLength;
    }
  };
};
exports["default"] = _default;

},{}],277:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(v) {
  try {
    return decodeURIComponent(v);
  } catch (_unused) {
    return "";
  }
};
exports["default"] = _default;

},{}],278:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var REFERENCE_EQUALITY = function REFERENCE_EQUALITY(a, b) {
  return a === b;
};
var findIndex = function findIndex(array, item, isEqual) {
  for (var i = 0; i < array.length; i += 1) {
    if (isEqual(array[i], item)) {
      return i;
    }
  }
  return -1;
};
var _default = function _default(array) {
  var isEqual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : REFERENCE_EQUALITY;
  return array.filter(function (item, index) {
    return findIndex(array, item, isEqual) === index;
  });
};
exports["default"] = _default;

},{}],279:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isNil = require("./isNil.js");
var _isObject = require("./isObject.js");
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

var _deepAssignObject = function deepAssignObject(target, source) {
  Object.keys(source).forEach(function (key) {
    if ((0, _isObject["default"])(target[key]) && (0, _isObject["default"])(source[key])) {
      _deepAssignObject(target[key], source[key]);
      return;
    }
    target[key] = source[key];
  });
};

/**
 * Recursively copy the values of all enumerable own properties from a source item to a target item if the both items are objects
 * @param {Object} target - a target object
 * @param {...Object} source - an array of source objects
 * @example
 * deepAssign({ a: 'a', b: 'b' }, { b: 'B', c: 'c' });
 * // { a: 'a', b: 'B', c: 'c' }
 */
var _default = function _default(target) {
  if ((0, _isNil["default"])(target)) {
    throw new TypeError('deepAssign "target" cannot be null or undefined');
  }
  var result = Object(target);
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }
  sources.forEach(function (source) {
    return _deepAssignObject(result, Object(source));
  });
  return result;
};
exports["default"] = _default;

},{"./isNil.js":313,"./isObject.js":317}],280:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * A simple utility for managing a promise's state outside of
 * the promise's "executor" (the function passed into the constructor).
 */
var _default = function _default() {
  var deferred = {};
  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};
exports["default"] = _default;

},{}],281:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(parent, node) {
  return parent.appendChild(node);
};
exports["default"] = _default;

},{}],282:[function(require,module,exports){
"use strict";

exports["default"] = exports.canUseRequestAnimationFrame = exports.canUseMutationObserver = exports.awaitUsingTimer = exports.awaitUsingRequestAnimation = exports.awaitUsingMutationObserver = void 0;
var _isFunction = require("../isFunction.js");
var _isNonEmptyArray = require("../isNonEmptyArray.js");
var _selectNodes = require("./selectNodes.js");
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

var MUTATION_OBSERVER = "MutationObserver";
var RAF = "requestAnimationFrame";
var MUTATION_OBSERVER_CONFIG = {
  childList: true,
  subtree: true
};
var VISIBILITY_STATE = "visibilityState";
var VISIBLE = "visible";
var DELAY = 100;
var MAX_POLLING_TIMEOUT = 5000;
var createError = function createError(selector) {
  return new Error("Could not find: " + selector);
};
var createPromise = function createPromise(executor) {
  return new Promise(executor);
};
var canUseMutationObserver = function canUseMutationObserver(win) {
  return (0, _isFunction["default"])(win[MUTATION_OBSERVER]);
};
exports.canUseMutationObserver = canUseMutationObserver;
var awaitUsingMutationObserver = function awaitUsingMutationObserver(win, doc, selector, timeout, selectFunc) {
  return createPromise(function (resolve, reject) {
    var timer;
    var mutationObserver = new win[MUTATION_OBSERVER](function () {
      var nodes = selectFunc(selector);
      if ((0, _isNonEmptyArray["default"])(nodes)) {
        mutationObserver.disconnect();
        if (timer) {
          clearTimeout(timer);
        }
        resolve(nodes);
      }
    });
    timer = setTimeout(function () {
      mutationObserver.disconnect();
      reject(createError(selector));
    }, timeout);
    mutationObserver.observe(doc, MUTATION_OBSERVER_CONFIG);
  });
};
exports.awaitUsingMutationObserver = awaitUsingMutationObserver;
var canUseRequestAnimationFrame = function canUseRequestAnimationFrame(doc) {
  return doc[VISIBILITY_STATE] === VISIBLE;
};
exports.canUseRequestAnimationFrame = canUseRequestAnimationFrame;
var awaitUsingRequestAnimation = function awaitUsingRequestAnimation(win, selector, timeout, selectFunc) {
  return createPromise(function (resolve, reject) {
    var _execute = function execute() {
      var nodes = selectFunc(selector);
      if ((0, _isNonEmptyArray["default"])(nodes)) {
        resolve(nodes);
        return;
      }
      win[RAF](_execute);
    };
    _execute();
    setTimeout(function () {
      reject(createError(selector));
    }, timeout);
  });
};
exports.awaitUsingRequestAnimation = awaitUsingRequestAnimation;
var awaitUsingTimer = function awaitUsingTimer(selector, timeout, selectFunc) {
  return createPromise(function (resolve, reject) {
    var _execute2 = function execute() {
      var nodes = selectFunc(selector);
      if ((0, _isNonEmptyArray["default"])(nodes)) {
        resolve(nodes);
        return;
      }
      setTimeout(_execute2, DELAY);
    };
    _execute2();
    setTimeout(function () {
      reject(createError(selector));
    }, timeout);
  });
};
exports.awaitUsingTimer = awaitUsingTimer;
var _default = function _default(selector) {
  var selectFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _selectNodes["default"];
  var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : MAX_POLLING_TIMEOUT;
  var win = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window;
  var doc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : document;
  var nodes = selectFunc(selector);
  if ((0, _isNonEmptyArray["default"])(nodes)) {
    return Promise.resolve(nodes);
  }
  if (canUseMutationObserver(win)) {
    return awaitUsingMutationObserver(win, doc, selector, timeout, selectFunc);
  }
  if (canUseRequestAnimationFrame(doc)) {
    return awaitUsingRequestAnimation(win, selector, timeout, selectFunc);
  }
  return awaitUsingTimer(selector, timeout, selectFunc);
};
exports["default"] = _default;

},{"../isFunction.js":310,"../isNonEmptyArray.js":314,"./selectNodes.js":289}],283:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _appendNode = require("./appendNode.js");
var _isObject = require("../isObject.js");
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

var populateElementProperties = function populateElementProperties(element, props) {
  Object.keys(props).forEach(function (key) {
    // The following is to support setting style properties to avoid CSP errors.
    if (key === "style" && (0, _isObject["default"])(props[key])) {
      var styleProps = props[key];
      Object.keys(styleProps).forEach(function (styleKey) {
        element.style[styleKey] = styleProps[styleKey];
      });
    } else {
      element[key] = props[key];
    }
  });
};
var _default = function _default(tag) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var doc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : document;
  var result = doc.createElement(tag);
  Object.keys(attrs).forEach(function (key) {
    // TODO: To highlight CSP problems consider throwing a descriptive error
    //       if nonce is available and key is style.
    result.setAttribute(key, attrs[key]);
  });
  populateElementProperties(result, props);
  children.forEach(function (child) {
    return (0, _appendNode["default"])(result, child);
  });
  return result;
};
exports["default"] = _default;

},{"../isObject.js":317,"./appendNode.js":281}],284:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "appendNode", {
  enumerable: true,
  get: function get() {
    return _appendNode["default"];
  }
});
Object.defineProperty(exports, "awaitSelector", {
  enumerable: true,
  get: function get() {
    return _awaitSelector["default"];
  }
});
Object.defineProperty(exports, "createNode", {
  enumerable: true,
  get: function get() {
    return _createNode["default"];
  }
});
Object.defineProperty(exports, "matchesSelector", {
  enumerable: true,
  get: function get() {
    return _matchesSelector["default"];
  }
});
Object.defineProperty(exports, "querySelectorAll", {
  enumerable: true,
  get: function get() {
    return _querySelectorAll["default"];
  }
});
Object.defineProperty(exports, "removeNode", {
  enumerable: true,
  get: function get() {
    return _removeNode["default"];
  }
});
Object.defineProperty(exports, "selectNodes", {
  enumerable: true,
  get: function get() {
    return _selectNodes["default"];
  }
});
Object.defineProperty(exports, "selectNodesWithShadow", {
  enumerable: true,
  get: function get() {
    return _selectNodesWithShadow["default"];
  }
});
var _awaitSelector = require("./awaitSelector.js");
var _appendNode = require("./appendNode.js");
var _createNode = require("./createNode.js");
var _matchesSelector = require("./matchesSelector.js");
var _querySelectorAll = require("./querySelectorAll.js");
var _removeNode = require("./removeNode.js");
var _selectNodes = require("./selectNodes.js");
var _selectNodesWithShadow = require("./selectNodesWithShadow.js");

},{"./appendNode.js":281,"./awaitSelector.js":282,"./createNode.js":283,"./matchesSelector.js":286,"./querySelectorAll.js":287,"./removeNode.js":288,"./selectNodes.js":289,"./selectNodesWithShadow.js":290}],285:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _shadowSeparator = require("../../constants/shadowSeparator.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(str) {
  return str.indexOf(_shadowSeparator["default"]) !== -1;
};
exports["default"] = _default;

},{"../../constants/shadowSeparator.js":230}],286:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Returns true if element matches the selector.
 * @param {String} selector
 * @param {Node} [element]
 * @returns {Boolean}
 */
var _default = function _default(selector, element) {
  if (element.matches) {
    return element.matches(selector);
  }

  // Making IE 11 happy
  return element.msMatchesSelector(selector);
};
exports["default"] = _default;

},{}],287:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _toArray = require("../toArray.js");
/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var SIBLING_PATTERN = /^\s*>/;
var _default = function _default(context, selector) {
  if (!SIBLING_PATTERN.test(selector)) {
    return (0, _toArray["default"])(context.querySelectorAll(selector));
  }
  return (0, _toArray["default"])(context.querySelectorAll(":scope " + selector));
};
exports["default"] = _default;

},{"../toArray.js":339}],288:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(node) {
  var parent = node.parentNode;
  if (parent) {
    return parent.removeChild(node);
  }
  return null;
};
exports["default"] = _default;

},{}],289:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _querySelectorAll = require("./querySelectorAll.js");
var _selectNodesWithShadow = require("./selectNodesWithShadow.js");
var _isShadowSelector = require("./isShadowSelector.js");
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
/**
 * Returns an array of matched DOM nodes.
 * @param {String} selector
 * @param {Node} [context=document] defaults to document
 * @returns {Array} an array of DOM nodes
 */
var _default = function _default(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  if (!(0, _isShadowSelector["default"])(selector)) {
    return (0, _querySelectorAll["default"])(context, selector);
  }
  return (0, _selectNodesWithShadow["default"])(context, selector);
};
exports["default"] = _default;

},{"./isShadowSelector.js":285,"./querySelectorAll.js":287,"./selectNodesWithShadow.js":290}],290:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _querySelectorAll = require("./querySelectorAll.js");
var _shadowSeparator = require("../../constants/shadowSeparator.js");
/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var splitWithShadow = function splitWithShadow(selector) {
  return selector.split(_shadowSeparator["default"]);
};
var transformPrefix = function transformPrefix(parent, selector) {
  var result = selector;
  var hasChildCombinatorPrefix = result.startsWith(">");
  if (!hasChildCombinatorPrefix) {
    return result;
  }
  var prefix = parent instanceof Element || parent instanceof Document ? ":scope" : ":host"; // see https://bugs.webkit.org/show_bug.cgi?id=233380

  return prefix + " " + result;
};
var _default = function _default(context, selector) {
  var parts = splitWithShadow(selector);
  if (parts.length < 2) {
    return (0, _querySelectorAll["default"])(context, selector);
  }

  // split the selector into parts separated by :shadow pseudo-selectors
  // find each subselector element based on the previously selected node's shadowRoot
  var parent = context;
  for (var i = 0; i < parts.length; i += 1) {
    var part = parts[i].trim();
    // if part is empty, it means there's a chained :eq:shadow selector
    if (part === "" && parent.shadowRoot) {
      parent = parent.shadowRoot;
      // eslint-disable-next-line no-continue
      continue;
    }
    var prefixed = transformPrefix(parent, part);
    var partNode = (0, _querySelectorAll["default"])(parent, prefixed);
    if (partNode.length === 0 || !partNode[0] || !partNode[0].shadowRoot) {
      return partNode;
    }
    parent = partNode[0].shadowRoot;
  }
  return undefined;
};
exports["default"] = _default;

},{"../../constants/shadowSeparator.js":230,"./querySelectorAll.js":287}],291:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports.mergeQuery = exports.mergeDecisionsMeta = void 0;
var _eventType = require("../constants/eventType.js");
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

/* eslint-disable no-underscore-dangle */
var mergeDecisionsMeta = function mergeDecisionsMeta(event, decisionsMeta, propositionEventTypes, propositionAction) {
  // Do not send a display notification with no decisions. Even empty view changes
  // should include a proposition.
  if (decisionsMeta.length === 0) {
    return;
  }
  var propositionEventType = {};
  propositionEventTypes.forEach(function (type) {
    propositionEventType[type] = _eventType.EVENT_TYPE_TRUE;
  });
  var xdm = {
    _experience: {
      decisioning: {
        propositions: decisionsMeta,
        propositionEventType: propositionEventType
      }
    }
  };
  if (propositionAction) {
    xdm._experience.decisioning.propositionAction = propositionAction;
  }
  event.mergeXdm(xdm);
};
exports.mergeDecisionsMeta = mergeDecisionsMeta;
var mergeQuery = function mergeQuery(event, details) {
  event.mergeQuery({
    personalization: _objectSpread({}, details)
  });
};
exports.mergeQuery = mergeQuery;

},{"../constants/eventType.js":214}],292:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _isEmptyObject = require("./isEmptyObject.js");
var _isNil = require("./isNil.js");
var _isObject = require("./isObject.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * Given an object and a function that takes a value and returns a predicate, filter out
 * all non-object deeply nested values that do not pass the predicate.
 *
 * Example: filterObject({ a: 2, b: { c: 6 } }, (val) => val > 5) returns { b { c: 6 } }
 *
 * @param {*} obj
 * @param {* => boolean} predicate a function that takes a value and return a boolean,
 * representing if it should be included in the result object or not.
 * @returns A copy of the original object with the values that fail the predicate, filtered out.
 */
var _filterObject = function filterObject(obj, predicate) {
  if ((0, _isNil["default"])(obj) || !(0, _isObject["default"])(obj)) {
    return obj;
  }
  return Object.keys(obj).reduce(function (result, key) {
    var value = obj[key];
    if ((0, _isObject["default"])(value)) {
      // value is object, go deeper
      var filteredValue = _filterObject(value, predicate);
      if ((0, _isEmptyObject["default"])(filteredValue)) {
        return result;
      }
      return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, key, filteredValue));
    }
    // value is not an object, test predicate
    if (predicate(value)) {
      return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, key, value));
    }
    return result;
  }, {});
};
var _default = exports["default"] = _filterObject;

},{"./isEmptyObject.js":309,"./isNil.js":313,"./isObject.js":317}],293:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _createNode = require("./dom/createNode.js");
var _tagName = require("../constants/tagName.js");
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
/**
 * Fires an image pixel from the current document's window.
 * @param {object} currentDocument
 * @param {string} src
 * @returns {Promise}
 */
var _default = function _default(_ref) {
  var src = _ref.src,
    _ref$currentDocument = _ref.currentDocument,
    currentDocument = _ref$currentDocument === void 0 ? document : _ref$currentDocument;
  return new Promise(function (resolve, reject) {
    var attrs = {
      src: src
    };
    var props = {
      onload: resolve,
      onerror: reject,
      onabort: reject
    };
    (0, _createNode["default"])(_tagName.IMG, attrs, props, [], currentDocument);
  });
};
exports["default"] = _default;

},{"../constants/tagName.js":231,"./dom/createNode.js":283}],294:[function(require,module,exports){
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
exports["default"] = void 0;
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
var _flattenArray = function flattenArray() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var flat = [];
  if (!Array.isArray(items)) {
    return items;
  }
  items.forEach(function (item) {
    if (Array.isArray(item)) {
      flat.push.apply(flat, _toConsumableArray(_flattenArray(item)));
    } else {
      flat.push(item);
    }
  });
  return flat;
};
var _default = exports["default"] = _flattenArray;

},{}],295:[function(require,module,exports){
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
exports["default"] = void 0;
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
var isPlainObject = function isPlainObject(obj) {
  return obj !== null && _typeof(obj) === "object" && Object.getPrototypeOf(obj) === Object.prototype;
};
var _flattenObject = function flattenObject(obj) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  Object.keys(obj).forEach(function (key) {
    if (isPlainObject(obj[key]) || Array.isArray(obj[key])) {
      _flattenObject(obj[key], result, [].concat(_toConsumableArray(keys), [key]));
    } else {
      result[[].concat(_toConsumableArray(keys), [key]).join(".")] = obj[key];
    }
  });
  return result;
};
var _default = function _default(obj) {
  if (!isPlainObject(obj)) {
    return obj;
  }
  return _flattenObject(obj);
};
exports["default"] = _default;

},{}],296:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _namespace = require("../constants/namespace.js");
var _getLastArrayItems = require("./getLastArrayItems.js");
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

var cookieName = _namespace["default"] + "getTld";

/**
 * Of the current web page's hostname, this is the top-most domain that is
 * not a "public suffix" as outlined in https://publicsuffix.org/. In other
 * words, this is top-most domain that is able to accept cookies.
 * @param {Object} window
 * @param {Object} cookieJar
 * @returns {string}
 */
var _default = function _default(window, cookieJar) {
  var topLevelCookieDomain = "";

  // If hostParts.length === 1, we may be on localhost.
  var hostParts = window.location.hostname.toLowerCase().split(".");
  var i = 1;
  while (i < hostParts.length && !cookieJar.get(cookieName)) {
    i += 1;
    topLevelCookieDomain = (0, _getLastArrayItems["default"])(hostParts, i).join(".");
    cookieJar.set(cookieName, cookieName, {
      domain: topLevelCookieDomain
    });
  }
  cookieJar.remove(cookieName, {
    domain: topLevelCookieDomain
  });
  return topLevelCookieDomain;
};
exports["default"] = _default;

},{"../constants/namespace.js":223,"./getLastArrayItems.js":297}],297:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Returns the last N number of items from an array.
 * @param {Array} arr
 * @param {number} itemCount
 * @returns {Array}
 */
var _default = function _default(arr, itemCount) {
  return arr.slice(-itemCount);
};
exports["default"] = _default;

},{}],298:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _cookieNamePrefix = require("../constants/cookieNamePrefix.js");
var _sanitizeOrgIdForCookieName = require("./sanitizeOrgIdForCookieName.js");
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
var _default = function _default(orgId, key) {
  return _cookieNamePrefix["default"] + "_" + (0, _sanitizeOrgIdForCookieName["default"])(orgId) + "_" + key;
};
exports["default"] = _default;

},{"../constants/cookieNamePrefix.js":205,"./sanitizeOrgIdForCookieName.js":336}],299:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Group an array by a key getter provided
 * @param {Array} arr Array to iterate over.
 * @param {Function} keyGetter The key getter by which to group.
 * @returns {Object}
 */
var _default = function _default(arr, keyGetter) {
  var result = {};
  arr.forEach(function (item) {
    var key = keyGetter(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  });
  return result;
};
exports["default"] = _default;

},{}],300:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "assignConcatArrayValues", {
  enumerable: true,
  get: function get() {
    return _assignConcatArrayValues["default"];
  }
});
Object.defineProperty(exports, "clone", {
  enumerable: true,
  get: function get() {
    return _clone["default"];
  }
});
Object.defineProperty(exports, "cookieJar", {
  enumerable: true,
  get: function get() {
    return _cookieJar["default"];
  }
});
Object.defineProperty(exports, "crc32", {
  enumerable: true,
  get: function get() {
    return _crc["default"];
  }
});
Object.defineProperty(exports, "createCallbackAggregator", {
  enumerable: true,
  get: function get() {
    return _createCallbackAggregator["default"];
  }
});
Object.defineProperty(exports, "createLoggingCookieJar", {
  enumerable: true,
  get: function get() {
    return _createLoggingCookieJar["default"];
  }
});
Object.defineProperty(exports, "createMerger", {
  enumerable: true,
  get: function get() {
    return _createMerger["default"];
  }
});
Object.defineProperty(exports, "createTaskQueue", {
  enumerable: true,
  get: function get() {
    return _createTaskQueue["default"];
  }
});
Object.defineProperty(exports, "deduplicateArray", {
  enumerable: true,
  get: function get() {
    return _deduplicateArray["default"];
  }
});
Object.defineProperty(exports, "deepAssign", {
  enumerable: true,
  get: function get() {
    return _deepAssign["default"];
  }
});
Object.defineProperty(exports, "defer", {
  enumerable: true,
  get: function get() {
    return _defer["default"];
  }
});
Object.defineProperty(exports, "filterObject", {
  enumerable: true,
  get: function get() {
    return _filterObject["default"];
  }
});
Object.defineProperty(exports, "fireImage", {
  enumerable: true,
  get: function get() {
    return _fireImage["default"];
  }
});
Object.defineProperty(exports, "getApexDomain", {
  enumerable: true,
  get: function get() {
    return _getApexDomain["default"];
  }
});
Object.defineProperty(exports, "getLastArrayItems", {
  enumerable: true,
  get: function get() {
    return _getLastArrayItems["default"];
  }
});
Object.defineProperty(exports, "getNamespacedCookieName", {
  enumerable: true,
  get: function get() {
    return _getNamespacedCookieName["default"];
  }
});
Object.defineProperty(exports, "groupBy", {
  enumerable: true,
  get: function get() {
    return _groupBy["default"];
  }
});
Object.defineProperty(exports, "injectAreThirdPartyCookiesSupportedByDefault", {
  enumerable: true,
  get: function get() {
    return _injectAreThirdPartyCookiesSupportedByDefault["default"];
  }
});
Object.defineProperty(exports, "injectDoesIdentityCookieExist", {
  enumerable: true,
  get: function get() {
    return _injectDoesIdentityCookieExist["default"];
  }
});
Object.defineProperty(exports, "injectFireReferrerHideableImage", {
  enumerable: true,
  get: function get() {
    return _injectFireReferrerHideableImage["default"];
  }
});
Object.defineProperty(exports, "injectGetBrowser", {
  enumerable: true,
  get: function get() {
    return _injectGetBrowser["default"];
  }
});
Object.defineProperty(exports, "injectStorage", {
  enumerable: true,
  get: function get() {
    return _injectStorage["default"];
  }
});
Object.defineProperty(exports, "intersection", {
  enumerable: true,
  get: function get() {
    return _intersection["default"];
  }
});
Object.defineProperty(exports, "isBoolean", {
  enumerable: true,
  get: function get() {
    return _isBoolean["default"];
  }
});
Object.defineProperty(exports, "isEmptyObject", {
  enumerable: true,
  get: function get() {
    return _isEmptyObject["default"];
  }
});
Object.defineProperty(exports, "isFunction", {
  enumerable: true,
  get: function get() {
    return _isFunction["default"];
  }
});
Object.defineProperty(exports, "isInteger", {
  enumerable: true,
  get: function get() {
    return _isInteger["default"];
  }
});
Object.defineProperty(exports, "isNamespacedCookieName", {
  enumerable: true,
  get: function get() {
    return _isNamespacedCookieName["default"];
  }
});
Object.defineProperty(exports, "isNil", {
  enumerable: true,
  get: function get() {
    return _isNil["default"];
  }
});
Object.defineProperty(exports, "isNonEmptyArray", {
  enumerable: true,
  get: function get() {
    return _isNonEmptyArray["default"];
  }
});
Object.defineProperty(exports, "isNonEmptyString", {
  enumerable: true,
  get: function get() {
    return _isNonEmptyString["default"];
  }
});
Object.defineProperty(exports, "isNumber", {
  enumerable: true,
  get: function get() {
    return _isNumber["default"];
  }
});
Object.defineProperty(exports, "isObject", {
  enumerable: true,
  get: function get() {
    return _isObject["default"];
  }
});
Object.defineProperty(exports, "isString", {
  enumerable: true,
  get: function get() {
    return _isString["default"];
  }
});
Object.defineProperty(exports, "noop", {
  enumerable: true,
  get: function get() {
    return _noop["default"];
  }
});
Object.defineProperty(exports, "parseUrl", {
  enumerable: true,
  get: function get() {
    return _parseUrl["default"];
  }
});
Object.defineProperty(exports, "prepareConfigOverridesForEdge", {
  enumerable: true,
  get: function get() {
    return _prepareConfigOverridesForEdge["default"];
  }
});
Object.defineProperty(exports, "queryString", {
  enumerable: true,
  get: function get() {
    return _querystring["default"];
  }
});
Object.defineProperty(exports, "sanitizeOrgIdForCookieName", {
  enumerable: true,
  get: function get() {
    return _sanitizeOrgIdForCookieName["default"];
  }
});
Object.defineProperty(exports, "stackError", {
  enumerable: true,
  get: function get() {
    return _stackError["default"];
  }
});
Object.defineProperty(exports, "stringToBoolean", {
  enumerable: true,
  get: function get() {
    return _stringToBoolean["default"];
  }
});
Object.defineProperty(exports, "toArray", {
  enumerable: true,
  get: function get() {
    return _toArray["default"];
  }
});
Object.defineProperty(exports, "toError", {
  enumerable: true,
  get: function get() {
    return _toError["default"];
  }
});
Object.defineProperty(exports, "toISOStringLocal", {
  enumerable: true,
  get: function get() {
    return _toISOStringLocal["default"];
  }
});
Object.defineProperty(exports, "toInteger", {
  enumerable: true,
  get: function get() {
    return _toInteger["default"];
  }
});
Object.defineProperty(exports, "updateErrorMessage", {
  enumerable: true,
  get: function get() {
    return _updateErrorMessage["default"];
  }
});
Object.defineProperty(exports, "uuid", {
  enumerable: true,
  get: function get() {
    return _uuid["default"];
  }
});
Object.defineProperty(exports, "validateConfigOverride", {
  enumerable: true,
  get: function get() {
    return _validateConfigOverride["default"];
  }
});
Object.defineProperty(exports, "validateIdentityMap", {
  enumerable: true,
  get: function get() {
    return _validateIdentityMap["default"];
  }
});
var _assignConcatArrayValues = require("./assignConcatArrayValues.js");
var _clone = require("./clone.js");
var _cookieJar = require("./cookieJar.js");
var _createMerger = require("./createMerger.js");
var _createCallbackAggregator = require("./createCallbackAggregator.js");
var _createLoggingCookieJar = require("./createLoggingCookieJar.js");
var _createTaskQueue = require("./createTaskQueue.js");
var _crc = require("./crc32.js");
var _defer = require("./defer.js");
var _deduplicateArray = require("./deduplicateArray.js");
var _deepAssign = require("./deepAssign.js");
var _fireImage = require("./fireImage.js");
var _injectFireReferrerHideableImage = require("./injectFireReferrerHideableImage.js");
var _filterObject = require("./filterObject.js");
var _getApexDomain = require("./getApexDomain.js");
var _getLastArrayItems = require("./getLastArrayItems.js");
var _getNamespacedCookieName = require("./getNamespacedCookieName.js");
var _groupBy = require("./groupBy.js");
var _injectAreThirdPartyCookiesSupportedByDefault = require("./injectAreThirdPartyCookiesSupportedByDefault.js");
var _injectDoesIdentityCookieExist = require("./injectDoesIdentityCookieExist.js");
var _injectGetBrowser = require("./injectGetBrowser.js");
var _injectStorage = require("./injectStorage.js");
var _intersection = require("./intersection.js");
var _isBoolean = require("./isBoolean.js");
var _isEmptyObject = require("./isEmptyObject.js");
var _isFunction = require("./isFunction.js");
var _isInteger = require("./isInteger.js");
var _isNamespacedCookieName = require("./isNamespacedCookieName.js");
var _isNonEmptyArray = require("./isNonEmptyArray.js");
var _isNonEmptyString = require("./isNonEmptyString.js");
var _isNil = require("./isNil.js");
var _isNumber = require("./isNumber.js");
var _isObject = require("./isObject.js");
var _isString = require("./isString.js");
var _noop = require("./noop.js");
var _parseUrl = require("./parseUrl.js");
var _prepareConfigOverridesForEdge = require("./prepareConfigOverridesForEdge.js");
var _querystring = require("./querystring.js");
var _sanitizeOrgIdForCookieName = require("./sanitizeOrgIdForCookieName.js");
var _stackError = require("./stackError.js");
var _stringToBoolean = require("./stringToBoolean.js");
var _toArray = require("./toArray.js");
var _toError = require("./toError.js");
var _toInteger = require("./toInteger.js");
var _toISOStringLocal = require("./toISOStringLocal.js");
var _uuid = require("./uuid.js");
var _updateErrorMessage = require("./updateErrorMessage.js");
var _validateIdentityMap = require("./validateIdentityMap.js");
var _validateConfigOverride = require("./validateConfigOverride.js");

},{"./assignConcatArrayValues.js":267,"./clone.js":268,"./cookieJar.js":269,"./crc32.js":270,"./createCallbackAggregator.js":271,"./createLoggingCookieJar.js":273,"./createMerger.js":274,"./createTaskQueue.js":276,"./deduplicateArray.js":278,"./deepAssign.js":279,"./defer.js":280,"./filterObject.js":292,"./fireImage.js":293,"./getApexDomain.js":296,"./getLastArrayItems.js":297,"./getNamespacedCookieName.js":298,"./groupBy.js":299,"./injectAreThirdPartyCookiesSupportedByDefault.js":301,"./injectDoesIdentityCookieExist.js":302,"./injectFireReferrerHideableImage.js":303,"./injectGetBrowser.js":304,"./injectStorage.js":305,"./intersection.js":306,"./isBoolean.js":308,"./isEmptyObject.js":309,"./isFunction.js":310,"./isInteger.js":311,"./isNamespacedCookieName.js":312,"./isNil.js":313,"./isNonEmptyArray.js":314,"./isNonEmptyString.js":315,"./isNumber.js":316,"./isObject.js":317,"./isString.js":318,"./noop.js":323,"./parseUrl.js":324,"./prepareConfigOverridesForEdge.js":325,"./querystring.js":326,"./sanitizeOrgIdForCookieName.js":336,"./stackError.js":337,"./stringToBoolean.js":338,"./toArray.js":339,"./toError.js":340,"./toISOStringLocal.js":341,"./toInteger.js":342,"./updateErrorMessage.js":343,"./uuid.js":344,"./validateConfigOverride.js":345,"./validateIdentityMap.js":346}],301:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _browser = require("../constants/browser.js");
var _lazy = require("./lazy.js");
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

// Users could have also disabled third-party cookies within these browsers, but
// we don't know. We also assume "unknown" browsers support third-party cookies,
// though we don't really know that either. We're making best guesses.
var browsersSupportingThirdPartyCookie = [_browser.CHROME, _browser.EDGE, _browser.EDGE_CHROMIUM, _browser.IE, _browser.UNKNOWN];
var _default = function _default(_ref) {
  var getBrowser = _ref.getBrowser;
  return (0, _lazy["default"])(function () {
    return browsersSupportingThirdPartyCookie.includes(getBrowser());
  });
};
exports["default"] = _default;

},{"../constants/browser.js":200,"./lazy.js":321}],302:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _cookieJar = require("./cookieJar.js");
var _getNamespacedCookieName = require("./getNamespacedCookieName.js");
var _cookieNameKey = require("../constants/cookieNameKey.js");
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
var _default = function _default(_ref) {
  var orgId = _ref.orgId;
  var identityCookieName = (0, _getNamespacedCookieName["default"])(orgId, _cookieNameKey.IDENTITY);
  /**
   * Returns whether the identity cookie exists.
   */
  return function () {
    return Boolean(_cookieJar["default"].get(identityCookieName));
  };
};
exports["default"] = _default;

},{"../constants/cookieNameKey.js":204,"./cookieJar.js":269,"./getNamespacedCookieName.js":298}],303:[function(require,module,exports){
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
exports["default"] = void 0;
var _fireImage = require("./fireImage.js");
var _index = require("./dom/index.js");
var _tagName = require("../constants/tagName.js");
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

var IFRAME_ATTRS = {
  name: "Adobe Alloy"
};
var IFRAME_PROPS = {
  style: {
    display: "none",
    width: 0,
    height: 0
  }
};
var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$appendNode = _ref.appendNode,
    appendNode = _ref$appendNode === void 0 ? _index.appendNode : _ref$appendNode,
    _ref$awaitSelector = _ref.awaitSelector,
    awaitSelector = _ref$awaitSelector === void 0 ? _index.awaitSelector : _ref$awaitSelector,
    _ref$createNode = _ref.createNode,
    createNode = _ref$createNode === void 0 ? _index.createNode : _ref$createNode,
    _ref$fireImage = _ref.fireImage,
    fireImage = _ref$fireImage === void 0 ? _fireImage["default"] : _ref$fireImage;
  var fireOnPage = fireImage;
  var hiddenIframe;
  var createIframe = function createIframe() {
    return awaitSelector(_tagName.BODY).then(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
        body = _ref3[0];
      if (hiddenIframe) {
        return hiddenIframe;
      }
      hiddenIframe = createNode(_tagName.IFRAME, IFRAME_ATTRS, IFRAME_PROPS);
      return appendNode(body, hiddenIframe);
    });
  };
  var fireInIframe = function fireInIframe(_ref4) {
    var src = _ref4.src;
    return createIframe().then(function (iframe) {
      var currentDocument = iframe.contentWindow.document;
      return fireImage({
        src: src,
        currentDocument: currentDocument
      });
    });
  };
  return function (request) {
    var hideReferrer = request.hideReferrer,
      url = request.url;
    return hideReferrer ? fireInIframe({
      src: url
    }) : fireOnPage({
      src: url
    });
  };
};
exports["default"] = _default;

},{"../constants/tagName.js":231,"./dom/index.js":284,"./fireImage.js":293}],304:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _lazy = require("./lazy.js");
var _browser = require("../constants/browser.js");
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

var matchUserAgent = function matchUserAgent(regexs, userAgent) {
  var keys = Object.keys(regexs);
  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];
    var regex = regexs[key];
    if (regex.test(userAgent)) {
      return key;
    }
  }
  return _browser.UNKNOWN;
};
var _default = function _default(_ref) {
  var userAgent = _ref.userAgent;
  return (0, _lazy["default"])(function () {
    return matchUserAgent(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _browser.EDGE, /Edge\/([0-9\._]+)/), _browser.EDGE_CHROMIUM, /Edg\/([0-9\.]+)/), _browser.CHROME, /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/), _browser.FIREFOX, /Firefox\/([0-9\.]+)(?:\s|$)/), _browser.IE, /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/), _browser.SAFARI, /Version\/([0-9\._]+).*Safari/), userAgent);
  });
};
exports["default"] = _default;

},{"../constants/browser.js":200,"./lazy.js":321}],305:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _namespace = require("../constants/namespace.js");
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

var getStorageByType = function getStorageByType(context, storageType, namespace) {
  // When storage is disabled on Safari, the mere act of referencing
  // window.localStorage or window.sessionStorage throws an error.
  // For this reason, we wrap in a try-catch.
  return {
    /**
     * Reads a value from storage.
     * @param {string} name The name of the item to be read.
     * @returns {string}
     */
    getItem: function getItem(name) {
      try {
        return context[storageType].getItem(namespace + name);
      } catch (_unused) {
        return null;
      }
    },
    /**
     * Saves a value to storage.
     * @param {string} name The name of the item to be saved.
     * @param {string} value The value of the item to be saved.
     * @returns {boolean} Whether the item was successfully saved to storage.
     */
    setItem: function setItem(name, value) {
      try {
        context[storageType].setItem(namespace + name, value);
        return true;
      } catch (_unused2) {
        return false;
      }
    },
    /**
     * Clear all values in storage that match the namespace.
     */
    clear: function clear() {
      try {
        Object.keys(context[storageType]).forEach(function (key) {
          if (key.startsWith(namespace)) {
            context[storageType].removeItem(key);
          }
        });
        return true;
      } catch (_unused3) {
        return false;
      }
    }
  };
};
var _default = function _default(context) {
  return function (additionalNamespace) {
    var finalNamespace = _namespace["default"] + additionalNamespace;
    return {
      session: getStorageByType(context, "sessionStorage", finalNamespace),
      persistent: getStorageByType(context, "localStorage", finalNamespace)
    };
  };
};
exports["default"] = _default;

},{"../constants/namespace.js":223}],306:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Returns items that are found within both arrays.
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 */
var _default = function _default(a, b) {
  return a.filter(function (x) {
    return b.includes(x);
  });
};
exports["default"] = _default;

},{}],307:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isString = require("./isString.js");
/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/**
 * Returns whether a string value is blank. Also returns true if the value is not a string.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  return (0, _isString["default"])(value) ? !value.trim() : true;
};
exports["default"] = _default;

},{"./isString.js":318}],308:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Returns whether the value is a boolean.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  return typeof value === "boolean";
};
exports["default"] = _default;

},{}],309:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isObject = require("./isObject.js");
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
/**
 * Returns whether the value is an empty object.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  return (0, _isObject["default"])(value) && Object.keys(value).length === 0;
};
exports["default"] = _default;

},{"./isObject.js":317}],310:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Returns whether the value is a function.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  return typeof value === "function";
};
exports["default"] = _default;

},{}],311:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isNumber = require("./isNumber.js");
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
/**
 * Returns whether the value is an integer.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  var parsed = parseInt(value, 10);
  return (0, _isNumber["default"])(parsed) && value === parsed;
};
exports["default"] = _default;

},{"./isNumber.js":316}],312:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _cookieNamePrefix = require("../constants/cookieNamePrefix.js");
var _sanitizeOrgIdForCookieName = require("./sanitizeOrgIdForCookieName.js");
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
/**
 * Determines whether a cookie name is namespaced according to the contract
 * defined by the server.
 * @param {String} orgId The org ID configured for the Alloy instance.
 * @param {String} name The cookie name.
 * @returns {boolean}
 */
var _default = function _default(orgId, name) {
  return name.indexOf(_cookieNamePrefix["default"] + "_" + (0, _sanitizeOrgIdForCookieName["default"])(orgId) + "_") === 0;
};
exports["default"] = _default;

},{"../constants/cookieNamePrefix.js":205,"./sanitizeOrgIdForCookieName.js":336}],313:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Returns true when the value is null.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  return value == null;
};
exports["default"] = _default;

},{}],314:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Returns whether the value is a non-empty array.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  return Array.isArray(value) && value.length > 0;
};
exports["default"] = _default;

},{}],315:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isString = require("./isString.js");
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
/**
 * Returns whether the value is a populated string.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  return (0, _isString["default"])(value) && value.length > 0;
};
exports["default"] = _default;

},{"./isString.js":318}],316:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Returns whether the value is a number.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  return typeof value === "number" && !Number.isNaN(value);
};
exports["default"] = _default;

},{}],317:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
exports["default"] = void 0;
var _isNil = require("./isNil.js");
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
/**
 * Returns whether the value is an object.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  return !(0, _isNil["default"])(value) && !Array.isArray(value) && _typeof(value) === "object";
};
exports["default"] = _default;

},{"./isNil.js":313}],318:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Returns whether the value is a string.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  return typeof value === "string";
};
exports["default"] = _default;

},{}],319:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/**
 * Returns whether an array contains unique values.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(values) {
  var storedVals = Object.create(null);
  for (var i = 0; i < values.length; i += 1) {
    var item = values[i];
    if (item in storedVals) {
      return false;
    }
    storedVals[item] = true;
  }
  return true;
};
exports["default"] = _default;

},{}],320:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Determines whether the value is a valid regular expression.
 * @param {*} value
 * @returns {boolean}
 */
var _default = function _default(value) {
  try {
    return RegExp(value) !== null;
  } catch (_unused) {
    return false;
  }
};
exports["default"] = _default;

},{}],321:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(fn) {
  var called = false;
  var result;
  return function () {
    if (!called) {
      called = true;
      result = fn();
    }
    return result;
  };
};
exports["default"] = _default;

},{}],322:[function(require,module,exports){
"use strict";

exports.isNetworkError = exports.TYPE_ERROR = exports.NETWORK_ERROR = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var TYPE_ERROR = exports.TYPE_ERROR = "TypeError";
var NETWORK_ERROR = exports.NETWORK_ERROR = "NetworkError";

/**
 * Checks if the error is a network-related error
 * @param {Error} error The error to check
 * @returns {boolean} True if the error is network-related
 */
var isNetworkError = function isNetworkError(error) {
  return error.name === TYPE_ERROR || error.name === NETWORK_ERROR || error.status === 0;
};
exports.isNetworkError = isNetworkError;

},{}],323:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * A function that performs no operations.
 */
var _default = function _default() {};
exports["default"] = _default;

},{}],324:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _parseUri = require("parse-uri");
var _isString = require("./isString.js");
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

var parseDomainBasic = function parseDomainBasic(host) {
  var result = {};
  var domainParts = host.split(".");
  switch (domainParts.length) {
    case 1:
      result.subdomain = "";
      result.domain = host;
      result.topLevelDomain = "";
      break;
    case 2:
      result.subdomain = "";
      result.domain = host;
      result.topLevelDomain = domainParts[1];
      break;
    case 3:
      result.subdomain = domainParts[0] === "www" ? "" : domainParts[0];
      result.domain = host;
      result.topLevelDomain = domainParts[2];
      break;
    case 4:
      result.subdomain = domainParts[0] === "www" ? "" : domainParts[0];
      result.domain = host;
      result.topLevelDomain = domainParts[2] + "." + domainParts[3];
      break;
    default:
      break;
  }
  return result;
};
var parseUrl = function parseUrl(url) {
  var parseDomain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : parseDomainBasic;
  if (!(0, _isString["default"])(url)) {
    url = "";
  }
  var parsed = (0, _parseUri["default"])(url) || {};
  var _parsed$host = parsed.host,
    host = _parsed$host === void 0 ? "" : _parsed$host,
    _parsed$path = parsed.path,
    path = _parsed$path === void 0 ? "" : _parsed$path,
    _parsed$query = parsed.query,
    query = _parsed$query === void 0 ? "" : _parsed$query,
    _parsed$anchor = parsed.anchor,
    anchor = _parsed$anchor === void 0 ? "" : _parsed$anchor;
  return _objectSpread({
    path: path,
    query: query,
    fragment: anchor
  }, parseDomain(host));
};
var _default = exports["default"] = parseUrl;

},{"./isString.js":318,"parse-uri":395}],325:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
exports["default"] = void 0;
var _isNil = require("./isNil.js");
var _filterObject = require("./filterObject.js");
var _isEmptyObject = require("./isEmptyObject.js");
var _isNonEmptyArray = require("./isNonEmptyArray.js");
var _isNonEmptyString = require("./isNonEmptyString.js");
var _isNumber = require("./isNumber.js");
var _isBoolean = require("./isBoolean.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
// We want to avoid mapping between specific keys because we want Konductor
// to be able to add overrides in the future without us needing to make
// any changes to the Web SDK
var _default = function _default(configuration) {
  if ((0, _isNil["default"])(configuration) || _typeof(configuration) !== "object") {
    return null;
  }
  // remove entries that are empty strings or arrays
  var configOverrides = (0, _filterObject["default"])(configuration, function (value) {
    if ((0, _isNil["default"])(value)) {
      return false;
    }
    if ((0, _isBoolean["default"])(value)) {
      return true;
    }
    if ((0, _isNumber["default"])(value)) {
      return true;
    }
    if ((0, _isNonEmptyString["default"])(value)) {
      return true;
    }
    if ((0, _isNonEmptyArray["default"])(value)) {
      return true;
    }
    return false;
  });
  if ((0, _isEmptyObject["default"])(configOverrides)) {
    return null;
  }
  return configOverrides;
};
exports["default"] = _default;

},{"./filterObject.js":292,"./isBoolean.js":308,"./isEmptyObject.js":309,"./isNil.js":313,"./isNonEmptyArray.js":314,"./isNonEmptyString.js":315,"./isNumber.js":316}],326:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _reactorQueryString = require("@adobe/reactor-query-string");
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
var _default = exports["default"] = _reactorQueryString["default"];

},{"@adobe/reactor-query-string":393}],327:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(content) {
  return function (namespaceCode, identity) {
    content.xdm = content.xdm || {};
    content.xdm.identityMap = content.xdm.identityMap || {};
    content.xdm.identityMap[namespaceCode] = content.xdm.identityMap[namespaceCode] || [];
    content.xdm.identityMap[namespaceCode].push(identity);
  };
};
exports["default"] = _default;

},{}],328:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _createRequest = require("./createRequest.js");
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
var _default = function _default(_ref) {
  var dataCollectionRequestPayload = _ref.payload,
    datastreamIdOverride = _ref.datastreamIdOverride;
  var getUseSendBeacon = function getUseSendBeacon(_ref2) {
    var isIdentityEstablished = _ref2.isIdentityEstablished;
    // When the document may be unloading, we still hit the interact endpoint
    // using fetch if an identity has not been established. If we were instead
    // to hit the collect endpoint using sendBeacon in this case, one of three
    // things would occur:
    //
    // 1. The document ultimately isn't unloaded and Alloy receives an empty
    // response back from the collect endpoint, resulting in an error being
    // thrown by Alloy because we weren't able to establish an identity.
    // This is bad.
    // 2. The document is unloaded, but Alloy receives the empty
    // response back from the collect endpoint before navigation is completed,
    // resulting in an error being thrown by Alloy because we weren't able to
    // establish an identity. This is bad.
    // 3. The document is unloaded and Alloy does not receive the empty response
    // back from the collect endpoint before navigation is completed. No error
    // will be thrown, but no identity was established either. This is okay,
    // though no identity was established.
    //
    // By hitting the interact endpoint using fetch, one of the three things
    // would occur:
    //
    // 1. The document ultimately isn't unloaded and Alloy receives a
    // response with an identity back from the interact endpoint. No
    // error will be thrown and an identity is established. This is good.
    // 2. The document is unloaded and Alloy receives a response with an
    // identity back from the interact endpoint before navigation is completed.
    // No error will be thrown and an identity is established. This is good.
    // 3. The document is unloaded and Alloy does not receive the empty response
    // back from the collect endpoint before navigation is completed. In this
    // case, no error is thrown, but no identity was established and it's
    // more likely that the request never makes it to the server because we're
    // using fetch instead of sendBeacon.
    //
    // The second approach seemed preferable.
    return dataCollectionRequestPayload.getDocumentMayUnload() && isIdentityEstablished;
  };
  return (0, _createRequest["default"])({
    payload: dataCollectionRequestPayload,
    getAction: function getAction(_ref3) {
      var isIdentityEstablished = _ref3.isIdentityEstablished;
      return getUseSendBeacon({
        isIdentityEstablished: isIdentityEstablished
      }) ? "collect" : "interact";
    },
    getUseSendBeacon: getUseSendBeacon,
    datastreamIdOverride: datastreamIdOverride
  });
};
exports["default"] = _default;

},{"./createRequest.js":332}],329:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _createRequestPayload = require("./createRequestPayload.js");
var _createAddIdentity = require("./createAddIdentity.js");
var _createHasIdentity = require("./createHasIdentity.js");
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
var _default = function _default() {
  var content = {};
  var payload = (0, _createRequestPayload["default"])({
    content: content,
    addIdentity: (0, _createAddIdentity["default"])(content),
    hasIdentity: (0, _createHasIdentity["default"])(content)
  });
  payload.addEvent = function (event) {
    content.events = content.events || [];
    content.events.push(event);
  };
  payload.getDocumentMayUnload = function () {
    return (content.events || []).some(function (event) {
      return event.getDocumentMayUnload();
    });
  };
  return payload;
};
exports["default"] = _default;

},{"./createAddIdentity.js":327,"./createHasIdentity.js":331,"./createRequestPayload.js":334}],330:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../index.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var ASSURANCE_VALIDATION_SESSION_URL_PARAM = "adb_validation_sessionid";
var ASSURANCE_VALIDATION_NAMESPACE = "validation.";
var CLIENT_ID = "clientId";
var getOrCreateAssuranceClientId = function getOrCreateAssuranceClientId(storage) {
  var clientId = storage.persistent.getItem(CLIENT_ID);
  if (!clientId) {
    clientId = (0, _index.uuid)();
    storage.persistent.setItem(CLIENT_ID, clientId);
  }
  return clientId;
};
var _default = function _default(_ref) {
  var window = _ref.window,
    createNamespacedStorage = _ref.createNamespacedStorage;
  var storage = createNamespacedStorage(ASSURANCE_VALIDATION_NAMESPACE);
  return function () {
    var parsedQuery = _index.queryString.parse(window.location.search);
    var validationSessionId = parsedQuery[ASSURANCE_VALIDATION_SESSION_URL_PARAM];
    if (!validationSessionId) {
      return "";
    }
    var clientId = getOrCreateAssuranceClientId(storage);
    var validationToken = validationSessionId + "|" + clientId;
    return "&" + _index.queryString.stringify({
      adobeAepValidationToken: validationToken
    });
  };
};
exports["default"] = _default;

},{"../index.js":300}],331:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default(content) {
  return function (namespaceCode) {
    return (content.xdm && content.xdm.identityMap && content.xdm.identityMap[namespaceCode]) !== undefined;
  };
};
exports["default"] = _default;

},{}],332:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("../index.js");
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
// This provides the base functionality that all types of requests share.
var _default = function _default(options) {
  var payload = options.payload,
    _getAction = options.getAction,
    _getUseSendBeacon = options.getUseSendBeacon,
    datastreamIdOverride = options.datastreamIdOverride,
    edgeSubPath = options.edgeSubPath;
  var id = (0, _index.uuid)();
  var shouldUseThirdPartyDomain = false;
  var isIdentityEstablished = false;
  return {
    getId: function getId() {
      return id;
    },
    getPayload: function getPayload() {
      return payload;
    },
    getAction: function getAction() {
      return _getAction({
        isIdentityEstablished: isIdentityEstablished
      });
    },
    getDatastreamIdOverride: function getDatastreamIdOverride() {
      return datastreamIdOverride;
    },
    getUseSendBeacon: function getUseSendBeacon() {
      return _getUseSendBeacon({
        isIdentityEstablished: isIdentityEstablished
      });
    },
    getEdgeSubPath: function getEdgeSubPath() {
      if (edgeSubPath) {
        return edgeSubPath;
      }
      return "";
    },
    getUseIdThirdPartyDomain: function getUseIdThirdPartyDomain() {
      return shouldUseThirdPartyDomain;
    },
    setUseIdThirdPartyDomain: function setUseIdThirdPartyDomain() {
      shouldUseThirdPartyDomain = true;
    },
    setIsIdentityEstablished: function setIsIdentityEstablished() {
      isIdentityEstablished = true;
    }
  };
};
exports["default"] = _default;

},{"../index.js":300}],333:[function(require,module,exports){
"use strict";

var _excluded = ["datastreamId"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var localConfigOverrides = _ref.localConfigOverrides,
    globalConfigOverrides = _ref.globalConfigOverrides,
    payload = _ref.payload;
  var requestParams = {
    payload: payload
  };
  var _ref2 = localConfigOverrides || {},
    datastreamId = _ref2.datastreamId,
    localConfigOverridesWithoutDatastreamId = _objectWithoutProperties(_ref2, _excluded);
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
exports["default"] = _default;

},{"../index.js":300}],334:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(options) {
  var content = options.content,
    addIdentity = options.addIdentity,
    hasIdentity = options.hasIdentity;
  var _mergeConfigOverride = (0, _index.createMerger)(content, "meta.configOverrides");
  return {
    mergeMeta: (0, _index.createMerger)(content, "meta"),
    mergeState: (0, _index.createMerger)(content, "meta.state"),
    mergeQuery: (0, _index.createMerger)(content, "query"),
    mergeConfigOverride: function mergeConfigOverride(updates) {
      return _mergeConfigOverride((0, _index.prepareConfigOverridesForEdge)(updates));
    },
    addIdentity: addIdentity,
    hasIdentity: hasIdentity,
    toJSON: function toJSON() {
      return content;
    }
  };
};
exports["default"] = _default;

},{"../index.js":300}],335:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "createAddIdentity", {
  enumerable: true,
  get: function get() {
    return _createAddIdentity["default"];
  }
});
Object.defineProperty(exports, "createDataCollectionRequest", {
  enumerable: true,
  get: function get() {
    return _createDataCollectionRequest["default"];
  }
});
Object.defineProperty(exports, "createDataCollectionRequestPayload", {
  enumerable: true,
  get: function get() {
    return _createDataCollectionRequestPayload["default"];
  }
});
Object.defineProperty(exports, "createGetAssuranceValidationTokenParams", {
  enumerable: true,
  get: function get() {
    return _createGetAssuranceValidationTokenParams["default"];
  }
});
Object.defineProperty(exports, "createHasIdentity", {
  enumerable: true,
  get: function get() {
    return _createHasIdentity["default"];
  }
});
Object.defineProperty(exports, "createRequest", {
  enumerable: true,
  get: function get() {
    return _createRequest["default"];
  }
});
Object.defineProperty(exports, "createRequestParams", {
  enumerable: true,
  get: function get() {
    return _createRequestParams["default"];
  }
});
Object.defineProperty(exports, "createRequestPayload", {
  enumerable: true,
  get: function get() {
    return _createRequestPayload["default"];
  }
});
var _createAddIdentity = require("./createAddIdentity.js");
var _createDataCollectionRequest = require("./createDataCollectionRequest.js");
var _createDataCollectionRequestPayload = require("./createDataCollectionRequestPayload.js");
var _createHasIdentity = require("./createHasIdentity.js");
var _createRequest = require("./createRequest.js");
var _createRequestParams = require("./createRequestParams.js");
var _createRequestPayload = require("./createRequestPayload.js");
var _createGetAssuranceValidationTokenParams = require("./createGetAssuranceValidationTokenParams.js");

},{"./createAddIdentity.js":327,"./createDataCollectionRequest.js":328,"./createDataCollectionRequestPayload.js":329,"./createGetAssuranceValidationTokenParams.js":330,"./createHasIdentity.js":331,"./createRequest.js":332,"./createRequestParams.js":333,"./createRequestPayload.js":334}],336:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(orgId) {
  return orgId.replace("@", "_");
};
exports["default"] = _default;

},{}],337:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _toError = require("./toError.js");
var _updateErrorMessage = require("./updateErrorMessage.js");
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
/**
 * Augments an error's message with additional context as it bubbles up the call stack.
 * @param {String} message The message to be added to the error.
 * @param {*} error Optimally, this is an instance of Error. If it is not,
 * this is used as the basis for the message of a newly created Error instance.
 * @returns {*}
 */
var _default = function _default(_ref) {
  var error = _ref.error,
    message = _ref.message;
  var errorToStack = (0, _toError["default"])(error);
  var newMessage = message + "\nCaused by: " + errorToStack.message;
  (0, _updateErrorMessage["default"])({
    error: errorToStack,
    message: newMessage
  });
  return errorToStack;
};
exports["default"] = _default;

},{"./toError.js":340,"./updateErrorMessage.js":343}],338:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isString = require("./isString.js");
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
var _default = function _default(str) {
  return (0, _isString["default"])(str) && str.toLowerCase() === "true";
};
exports["default"] = _default;

},{"./isString.js":318}],339:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value == null) {
    return [];
  }
  return [].slice.call(value);
};
exports["default"] = _default;

},{}],340:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
/**
 * Creates and returns a new error using the provided value as a message.
 * If the provided value is already an Error, it will be returned unmodified.
 * @param {*} value
 * @returns {Error}
 */
var _default = function _default(value) {
  return value instanceof Error ? value : new Error(value);
};
exports["default"] = _default;

},{}],341:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _toInteger = require("./toInteger.js");
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

/**
 * Add padString to the start of the string until it reaches the target length
 *
 * Different from String.prototype.padStart because this function coerces the
 * input to a string before padding.
 * @param {any} string
 * @param {number} targetLength
 * @param {string} padString
 * @returns {string}
 */
var padStart = function padStart(string, targetLength, padString) {
  return ("" + string).padStart(targetLength, padString);
};

/**
 * Formats the date into an ISO date-time string in the local timezone
 * @param {Date} date
 * @returns {string}
 */
var _default = function _default(date) {
  var YYYY = date.getFullYear();
  var MM = padStart(date.getMonth() + 1, 2, "0");
  var DD = padStart(date.getDate(), 2, "0");
  var hh = padStart(date.getHours(), 2, "0");
  var mm = padStart(date.getMinutes(), 2, "0");
  var ss = padStart(date.getSeconds(), 2, "0");
  var mmm = padStart(date.getMilliseconds(), 3, "0");

  // The time-zone offset is the difference, in minutes, from local time to UTC. Note that this
  // means that the offset is positive if the local timezone is behind UTC and negative if it is
  // ahead. For example, for time zone UTC+10:00, -600 will be returned.
  var timezoneOffset = (0, _toInteger["default"])(date.getTimezoneOffset(), 0);
  var ts = timezoneOffset > 0 ? "-" : "+";
  var th = padStart(Math.floor(Math.abs(timezoneOffset) / 60), 2, "0");
  var tm = padStart(Math.abs(timezoneOffset) % 60, 2, "0");
  return YYYY + "-" + MM + "-" + DD + "T" + hh + ":" + mm + ":" + ss + "." + mmm + ts + th + ":" + tm;
};
exports["default"] = _default;

},{"./toInteger.js":342}],342:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isNumber = require("./isNumber.js");
var _isString = require("./isString.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/*
 * coerce `value` to a number or return `defaultValue` if it cannot be.
 *
 * The coersion is attempted if value is a number or string.
 */
var _default = function _default(value, defaultValue) {
  if ((0, _isNumber["default"])(value) || (0, _isString["default"])(value)) {
    var n = Math.round(Number(value));
    if (!Number.isNaN(n)) {
      return n;
    }
  }
  return defaultValue;
};
exports["default"] = _default;

},{"./isNumber.js":316,"./isString.js":318}],343:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(_ref) {
  var error = _ref.error,
    message = _ref.message;
  try {
    error.message = message;
  } catch (_unused) {
    // We'll set a new message when we can, but some errors, like DOMException,
    // have a read-only message property, which limits our options.
  }
};
exports["default"] = _default;

},{}],344:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _uuid = require("uuid");
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
var _default = exports["default"] = _uuid.v4;

},{"uuid":372}],345:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("./validation/index.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = exports["default"] = (0, _index.objectOf)({});

},{"./validation/index.js":364}],346:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _index = require("./validation/index.js");
var _identityMapAuthenticatedState = require("../constants/identityMapAuthenticatedState.js");
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
var _default = exports["default"] = (0, _index.mapOfValues)((0, _index.arrayOf)((0, _index.objectOf)({
  authenticatedState: (0, _index.enumOf)(_identityMapAuthenticatedState.AMBIGUOUS, _identityMapAuthenticatedState.AUTHENTICATED, _identityMapAuthenticatedState.LOGGED_OUT),
  id: (0, _index.string)(),
  namespace: (0, _index.objectOf)({
    code: (0, _index.string)()
  }).noUnknownFields(),
  primary: (0, _index["boolean"])(),
  xid: (0, _index.string)()
}).noUnknownFields()).required());

},{"../constants/identityMapAuthenticatedState.js":219,"./validation/index.js":364}],347:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isBoolean = require("../isBoolean.js");
var _utils = require("./utils.js");
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
var _default = function _default(value, path) {
  (0, _utils.assertValid)((0, _isBoolean["default"])(value), value, path, "true or false");
  return value;
};
exports["default"] = _default;

},{"../isBoolean.js":308,"./utils.js":371}],348:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isFunction = require("../isFunction.js");
var _utils = require("./utils.js");
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
var _default = function _default(value, path) {
  (0, _utils.assertValid)((0, _isFunction["default"])(value), value, path, "a function");
  return value;
};
exports["default"] = _default;

},{"../isFunction.js":310,"./utils.js":371}],349:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _utils = require("./utils.js");
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
var _default = function _default(validators, message) {
  return function anyOf(value, path) {
    var _this = this;
    var newValue;
    var valid = validators.find(function (validator) {
      try {
        newValue = validator.call(_this, value, path);
        return true;
      } catch (_unused) {
        return false;
      }
    });
    (0, _utils.assertValid)(valid, value, path, message);
    return newValue;
  };
};
exports["default"] = _default;

},{"./utils.js":371}],350:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _utils = require("./utils.js");
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
var _default = function _default(elementValidator) {
  return function arrayOf(value, path) {
    var _this = this;
    (0, _utils.assertValid)(Array.isArray(value), value, path, "an array");
    var errors = [];
    var validatedArray = value.map(function (subValue, i) {
      try {
        return elementValidator.call(_this, subValue, path + "[" + i + "]", value);
      } catch (e) {
        errors.push(e.message);
        return undefined;
      }
    });
    if (errors.length) {
      throw new Error(errors.join("\n"));
    }
    return validatedArray;
  };
};
exports["default"] = _default;

},{"./utils.js":371}],351:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(defaultValue) {
  return function (value) {
    if (value == null) {
      return defaultValue;
    }
    return value;
  };
};
exports["default"] = _default;

},{}],352:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default() {
  var warning = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "This field has been deprecated";
  return function deprecated(value, path) {
    var message = warning;
    if (value !== undefined) {
      if (path) {
        message = "'" + path + "': " + message;
      }
      if (this && this.logger) {
        this.logger.warn(message);
      }
    }
    return value;
  };
};
exports["default"] = _default;

},{}],353:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _utils = require("./utils.js");
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
var _default = function _default(literalValue) {
  return function (value, path) {
    (0, _utils.assertValid)(value === literalValue, value, path, "" + literalValue);
    return value;
  };
};
exports["default"] = _default;

},{"./utils.js":371}],354:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isObject = require("../isObject.js");
var _utils = require("./utils.js");
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
var _default = function _default(valueValidator) {
  return function mapOfValues(value, path) {
    var _this = this;
    (0, _utils.assertValid)((0, _isObject["default"])(value), value, path, "an object");
    var errors = [];
    var validatedObject = {};
    Object.keys(value).forEach(function (subKey) {
      var subValue = value[subKey];
      var subPath = path ? path + "." + subKey : subKey;
      try {
        var validatedValue = valueValidator.call(_this, subValue, subPath);
        if (validatedValue !== undefined) {
          validatedObject[subKey] = validatedValue;
        }
      } catch (e) {
        errors.push(e.message);
      }
    });
    if (errors.length) {
      throw new Error(errors.join("\n"));
    }
    return validatedObject;
  };
};
exports["default"] = _default;

},{"../isObject.js":317,"./utils.js":371}],355:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _utils = require("./utils.js");
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
var _default = function _default(typeName, maximum) {
  return function (value, path) {
    (0, _utils.assertValid)(value <= maximum, value, path, typeName + " less than or equal to " + maximum);
    return value;
  };
};
exports["default"] = _default;

},{"./utils.js":371}],356:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _utils = require("./utils.js");
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
var _default = function _default(typeName, minimum) {
  return function (value, path) {
    (0, _utils.assertValid)(value >= minimum, value, path, typeName + " greater than or equal to " + minimum);
    return value;
  };
};
exports["default"] = _default;

},{"./utils.js":371}],357:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(schema) {
  return function (value, path) {
    var errors = [];
    Object.keys(value).forEach(function (subKey) {
      if (!schema[subKey]) {
        var subPath = path ? path + "." + subKey : subKey;
        errors.push("'" + subPath + "': Unknown field.");
      }
    });
    if (errors.length) {
      throw new Error(errors.join("\n"));
    }
    return value;
  };
};
exports["default"] = _default;

},{}],358:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _utils = require("./utils.js");
var _isObject = require("../isObject.js");
var _isEmptyObject = require("../isEmptyObject.js");
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
var _default = function _default(message) {
  return function (value, path) {
    if ((0, _isObject["default"])(value)) {
      (0, _utils.assertValid)(!(0, _isEmptyObject["default"])(value), value, path, message);
    } else {
      (0, _utils.assertValid)(value.length > 0, value, path, message);
    }
    return value;
  };
};
exports["default"] = _default;

},{"../isEmptyObject.js":309,"../isObject.js":317,"./utils.js":371}],359:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isObject = require("../isObject.js");
var _utils = require("./utils.js");
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
var _default = function _default(schema) {
  return function objectOf(value, path) {
    var _this = this;
    (0, _utils.assertValid)((0, _isObject["default"])(value), value, path, "an object");
    var errors = [];
    var validatedObject = {};
    Object.keys(schema).forEach(function (subKey) {
      var subValue = value[subKey];
      var subSchema = schema[subKey];
      var subPath = path ? path + "." + subKey : subKey;
      try {
        var validatedValue = subSchema.call(_this, subValue, subPath);
        if (validatedValue !== undefined) {
          validatedObject[subKey] = validatedValue;
        }
      } catch (e) {
        errors.push(e.message);
      }
    });

    // copy over unknown properties
    Object.keys(value).forEach(function (subKey) {
      if (!Object.prototype.hasOwnProperty.call(validatedObject, subKey)) {
        validatedObject[subKey] = value[subKey];
      }
    });
    if (errors.length) {
      throw new Error(errors.join("\n"));
    }
    return validatedObject;
  };
};
exports["default"] = _default;

},{"../isObject.js":317,"./utils.js":371}],360:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports["default"] = void 0;
var _isObject = require("../isObject.js");
var _utils = require("./utils.js");
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
var _default = function _default(oldField, oldSchema, newField) {
  return function deprecated(value, path) {
    (0, _utils.assertValid)((0, _isObject["default"])(value), value, path, "an object");
    var oldValue = value[oldField],
      newValue = value[newField],
      otherValues = _objectWithoutProperties(value, [oldField, newField].map(_toPropertyKey));
    var validatedOldValue = oldSchema(oldValue, path);
    if (validatedOldValue !== undefined) {
      var message = "The field '" + oldField + "' is deprecated. Use '" + newField + "' instead.";
      if (path) {
        message = "'" + path + "': " + message;
      }
      if (newValue !== undefined && newValue !== validatedOldValue) {
        throw new Error(message);
      } else if (this && this.logger) {
        this.logger.warn(message);
      }
    }
    return _objectSpread(_defineProperty({}, newField, newValue || validatedOldValue), otherValues);
  };
};
exports["default"] = _default;

},{"../isObject.js":317,"./utils.js":371}],361:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _utils = require("./utils.js");
var _isUnique = require("../isUnique.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var _default = function _default() {
  return function (value, path) {
    (0, _utils.assertValid)((0, _isUnique["default"])(value), value, path, "array values to be unique");
    return value;
  };
};
exports["default"] = _default;

},{"../isUnique.js":319,"./utils.js":371}],362:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _utils = require("./utils.js");
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
var _default = function _default() {
  var values = [];
  return function (value, path) {
    (0, _utils.assertValid)(values.indexOf(value) === -1, value, path, "a unique value across instances");
    values.push(value);
    return value;
  };
};
exports["default"] = _default;

},{"./utils.js":371}],363:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _utils = require("./utils.js");
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

var DOMAIN_REGEX = /^[a-z0-9.-]{1,}$/i;
var _default = function _default(value, path) {
  (0, _utils.assertValid)(DOMAIN_REGEX.test(value), value, path, "a valid domain");
  return value;
};
exports["default"] = _default;

},{"./utils.js":371}],364:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports.string = exports.objectOf = exports.number = exports.mapOfValues = exports.literal = exports.enumOf = exports.callback = exports["boolean"] = exports.arrayOf = exports.anything = exports.anyOf = void 0;
var _utils = require("./utils.js");
var _booleanValidator = require("./booleanValidator.js");
var _callbackValidator = require("./callbackValidator.js");
var _createAnyOfValidator = require("./createAnyOfValidator.js");
var _createArrayOfValidator = require("./createArrayOfValidator.js");
var _createDefaultValidator = require("./createDefaultValidator.js");
var _createDeprecatedValidator = require("./createDeprecatedValidator.js");
var _createLiteralValidator = require("./createLiteralValidator.js");
var _createMapOfValuesValidator = require("./createMapOfValuesValidator.js");
var _createMinimumValidator = require("./createMinimumValidator.js");
var _createMaximumValidator = require("./createMaximumValidator.js");
var _createNoUnknownFieldsValidator = require("./createNoUnknownFieldsValidator.js");
var _createNonEmptyValidator = require("./createNonEmptyValidator.js");
var _createObjectOfValidator = require("./createObjectOfValidator.js");
var _createRenamedValidator = require("./createRenamedValidator.js");
var _createUniqueValidator = require("./createUniqueValidator.js");
var _createUniqueItemsValidator = require("./createUniqueItemsValidator.js");
var _domainValidator = require("./domainValidator.js");
var _integerValidator = require("./integerValidator.js");
var _numberValidator = require("./numberValidator.js");
var _regexpValidator = require("./regexpValidator.js");
var _requiredValidator = require("./requiredValidator.js");
var _stringValidator = require("./stringValidator.js");
var _matchesRegexpValidator = require("./matchesRegexpValidator.js");
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
 * Validators are functions of two parameters (value and path) that return the
 * computed value if the input is valid, or throw an exception if the input is
 * invalid. In most cases the returned value is the same as the input value;
 * however, reference createDefaultValidator.js to see an example where the
 * computed value is different from the input. Additionally, if we ever wanted
 * to coerce types (i.e. parse string values into integers) as part of the
 * validation process we could use the computed value to accomplish that.
 *
 * The path parameter is used to generate informative error messages. It is
 * created by the objectOf, and arrayOf validators so that any error message can
 * describe which key within the object or array is invalid.
 *
 * The validators also have methods to chain additional validation logic. For
 * example, when you call `string()` to start a validator chain, it returns a
 * validator function but it also has methods like `required` and `nonEmpty`.
 * Here you can see that these methods are actually calling `chain`.
 * Specifically in this function, the leftValidator is called first and then the
 * return value of that is sent to the rightValidator. For example, when calling
 * `string().nonEmpty().required()` the following chain is built up:
 * ```
 *              *
 *            /   \
 *          *     required
 *        /   \
 *      *     nonEmpty
 *    /   \
 * base   string
 * ```
 * Where every * is a call to chain where the two are combined. The individual
 * validators are called from left to right in the above tree. The base
 * validator is simply the identity function `value => value`, representing an
 * optional value.
 *
 * After combining the validators, the new validator function is then augmented
 * with the methods from the leftValidator and from the additionalMethods
 * parameter. For example, when the string() function is called it chains to the
 * base validator, but also adds additional methods like (`regexp`, `domain`,
 * `nonEmpty`, and `unique`). When `nonEmpty` is called, which calls chain
 * again, the additional methods are carried forward because they are already
 * defined on the leftValidator.
 *
 * The base validator also contains the two methods `required` and `default`, so
 * these can be used anywhere after any of the exposed validator functions are
 * called.
 *
 * For most validators, we want the validation to be optional (i.e. allow null
 * or undefined values). To accomplish this, the validator needs to have a check
 * at the begining of the function, short circuiting the validation logic and
 * returning value if value is null or undefined. `default` and `required` do
 * not want this null check though. Indeed, `default` should return the default
 * value if value is null, and `required` should throw an error if value is
 * null.
 *
 * So to keep from having to have a null check in front of most validators,
 * nullSafeChain allows you to chain a validator in a null-safe way.
 */

// The base validator does no validation and just returns the value unchanged
var base = function base(value) {
  return value;
};

// The 'default', 'required', and 'deprecated' methods are available after any
// data-type method. Don't use the nullSafeChain on 'default' or 'required'
// because they need to handle the null or undefined case
base["default"] = function _default(defaultValue) {
  return (0, _utils.chain)(this, (0, _createDefaultValidator["default"])(defaultValue));
};
base.required = function required() {
  return (0, _utils.chain)(this, _requiredValidator["default"]);
};
base.deprecated = function deprecated(message) {
  return (0, _utils.chain)(this, (0, _createDeprecatedValidator["default"])(message));
};

// helper validators
var domain = function domain() {
  return (0, _utils.nullSafeChain)(this, _domainValidator["default"]);
};
var minimumInteger = function minimumInteger(minValue) {
  return (0, _utils.nullSafeChain)(this, (0, _createMinimumValidator["default"])("an integer", minValue));
};
var minimumNumber = function minimumNumber(minValue) {
  return (0, _utils.nullSafeChain)(this, (0, _createMinimumValidator["default"])("a number", minValue));
};
var maximumNumber = function maximumNumber(maxValue) {
  return (0, _utils.nullSafeChain)(this, (0, _createMaximumValidator["default"])("a number", maxValue));
};
var integer = function integer() {
  return (0, _utils.nullSafeChain)(this, _integerValidator["default"], {
    minimum: minimumInteger
  });
};
var nonEmptyString = function nonEmptyString() {
  return (0, _utils.nullSafeChain)(this, (0, _createNonEmptyValidator["default"])("a non-empty string"));
};
var nonEmptyArray = function nonEmptyArray() {
  return (0, _utils.nullSafeChain)(this, (0, _createNonEmptyValidator["default"])("a non-empty array"));
};
var nonEmptyObject = function nonEmptyObject() {
  return (0, _utils.nullSafeChain)(this, (0, _createNonEmptyValidator["default"])("a non-empty object"));
};
var regexp = function regexp() {
  return (0, _utils.nullSafeChain)(this, _regexpValidator["default"]);
};
var matches = function matches(regexpPattern) {
  return (0, _utils.nullSafeChain)(this, (0, _matchesRegexpValidator["default"])(regexpPattern));
};
var unique = function createUnique() {
  return (0, _utils.nullSafeChain)(this, (0, _createUniqueValidator["default"])());
};
var uniqueItems = function createUniqueItems() {
  return (0, _utils.nullSafeChain)(this, (0, _createUniqueItemsValidator["default"])());
};

// top-level validators.  These are the first functions that are called to create a validator.
var anyOf = function anyOf(validators, message) {
  // use chain here because we don't want to accept null or undefined unless at least
  // one of the validators accept null or undefined.
  return (0, _utils.chain)(this, (0, _createAnyOfValidator["default"])(validators, message));
};
var anything = function anything() {
  return this;
};
var arrayOf = function arrayOf(elementValidator) {
  return (0, _utils.nullSafeChain)(this, (0, _createArrayOfValidator["default"])(elementValidator), {
    nonEmpty: nonEmptyArray,
    uniqueItems: uniqueItems
  });
};
var _boolean = function _boolean2() {
  return (0, _utils.nullSafeChain)(this, _booleanValidator["default"]);
};
var callback = function callback() {
  return (0, _utils.nullSafeChain)(this, _callbackValidator["default"]);
};
var literal = function literal(literalValue) {
  return (0, _utils.nullSafeChain)(this, (0, _createLiteralValidator["default"])(literalValue));
};
var number = function number() {
  return (0, _utils.nullSafeChain)(this, _numberValidator["default"], {
    minimum: minimumNumber,
    maximum: maximumNumber,
    integer: integer,
    unique: unique
  });
};
var mapOfValues = function mapOfValues(valuesValidator) {
  return (0, _utils.nullSafeChain)(this, (0, _createMapOfValuesValidator["default"])(valuesValidator), {
    nonEmpty: nonEmptyObject
  });
};
var _createObjectOfAdditionalProperties = function createObjectOfAdditionalProperties(schema) {
  return {
    noUnknownFields: function noUnknownFields() {
      return (0, _utils.nullSafeChain)(this, (0, _createNoUnknownFieldsValidator["default"])(schema));
    },
    nonEmpty: nonEmptyObject,
    concat: function concat(otherObjectOfValidator) {
      // combine the schema so that noUnknownFields, and concat have the combined schema
      var newSchema = _objectSpread(_objectSpread({}, schema), otherObjectOfValidator.schema);
      return (0, _utils.nullSafeChain)(this, otherObjectOfValidator, _createObjectOfAdditionalProperties(newSchema));
    },
    renamed: function renamed(oldField, oldSchema, newField) {
      // Run the deprecated validator first so that the deprecated field is removed
      // before the objectOf validator runs.
      return (0, _utils.reverseNullSafeChainJoinErrors)(this, (0, _createRenamedValidator["default"])(oldField, oldSchema, newField));
    },
    schema: schema
  };
};
var objectOf = function objectOf(schema) {
  return (0, _utils.nullSafeChain)(this, (0, _createObjectOfValidator["default"])(schema), _createObjectOfAdditionalProperties(schema));
};
var string = function string() {
  return (0, _utils.nullSafeChain)(this, _stringValidator["default"], {
    regexp: regexp,
    domain: domain,
    nonEmpty: nonEmptyString,
    unique: unique,
    matches: matches
  });
};
var boundAnyOf = exports.anyOf = anyOf.bind(base);
var boundAnything = exports.anything = anything.bind(base);
var boundArrayOf = exports.arrayOf = arrayOf.bind(base);
var boundBoolean = exports["boolean"] = _boolean.bind(base);
var boundCallback = exports.callback = callback.bind(base);
var boundLiteral = exports.literal = literal.bind(base);
var boundNumber = exports.number = number.bind(base);
var boundMapOfValues = exports.mapOfValues = mapOfValues.bind(base);
var boundObjectOf = exports.objectOf = objectOf.bind(base);
var boundString = exports.string = string.bind(base);

// compound validators
var boundEnumOf = exports.enumOf = function boundEnumOf() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  return boundAnyOf(values.map(boundLiteral), "one of these values: " + JSON.stringify(values));
};

},{"./booleanValidator.js":347,"./callbackValidator.js":348,"./createAnyOfValidator.js":349,"./createArrayOfValidator.js":350,"./createDefaultValidator.js":351,"./createDeprecatedValidator.js":352,"./createLiteralValidator.js":353,"./createMapOfValuesValidator.js":354,"./createMaximumValidator.js":355,"./createMinimumValidator.js":356,"./createNoUnknownFieldsValidator.js":357,"./createNonEmptyValidator.js":358,"./createObjectOfValidator.js":359,"./createRenamedValidator.js":360,"./createUniqueItemsValidator.js":361,"./createUniqueValidator.js":362,"./domainValidator.js":363,"./integerValidator.js":365,"./matchesRegexpValidator.js":366,"./numberValidator.js":367,"./regexpValidator.js":368,"./requiredValidator.js":369,"./stringValidator.js":370,"./utils.js":371}],365:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isInteger = require("../isInteger.js");
var _utils = require("./utils.js");
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
var _default = function _default(value, path) {
  (0, _utils.assertValid)((0, _isInteger["default"])(value), value, path, "an integer");
  return value;
};
exports["default"] = _default;

},{"../isInteger.js":311,"./utils.js":371}],366:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _utils = require("./utils.js");
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
var _default = function _default(regexp) {
  return function (value, path) {
    (0, _utils.assertValid)(regexp.test(value), value, path, "does not match the " + regexp.toString());
    return value;
  };
};
exports["default"] = _default;

},{"./utils.js":371}],367:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isNumber = require("../isNumber.js");
var _utils = require("./utils.js");
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
var _default = function _default(value, path) {
  (0, _utils.assertValid)((0, _isNumber["default"])(value), value, path, "a number");
  return value;
};
exports["default"] = _default;

},{"../isNumber.js":316,"./utils.js":371}],368:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _utils = require("./utils.js");
var _isValidRegExp = require("../isValidRegExp.js");
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
var _default = function _default(value, path) {
  (0, _utils.assertValid)((0, _isValidRegExp["default"])(value), value, path, "a regular expression");
  return value;
};
exports["default"] = _default;

},{"../isValidRegExp.js":320,"./utils.js":371}],369:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
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
var _default = function _default(value, path) {
  if (value == null) {
    throw new Error("'" + path + "' is a required option");
  }
  return value;
};
exports["default"] = _default;

},{}],370:[function(require,module,exports){
"use strict";

exports["default"] = void 0;
var _isString = require("../isString.js");
var _utils = require("./utils.js");
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
var _default = function _default(value, path) {
  (0, _utils.assertValid)((0, _isString["default"])(value), value, path, "a string");
  return value;
};
exports["default"] = _default;

},{"../isString.js":318,"./utils.js":371}],371:[function(require,module,exports){
"use strict";

exports.reverseNullSafeChainJoinErrors = exports.nullSafeChain = exports.chain = exports.assertValid = void 0;
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
 * Wraps a validator returning the value if it is null or undefined, otherwise
 * it will call the original validator and return the result.
 *
 * @param {function} validator - the validator to call if the value is not null
 */
var skipIfNull = function skipIfNull(validator) {
  return function skipIfNullValidator(value, path) {
    return value == null ? value : validator.call(this, value, path);
  };
};

/**
 * Returns a new validator that calls the first validator and then calls the second
 * validator with the result of the first validator. The result of the second validator
 * is returned.
 *
 * @param {function} firstValidator - validator to call first
 * @param {function} secondValidator - validator to call second
 * @returns {function} - a new validator that calls the first and second validators
 */
var callSequentially = function callSequentially(firstValidator, secondValidator) {
  return function callSequentiallyValidator(value, path) {
    return secondValidator.call(this, firstValidator.call(this, value, path), path);
  };
};

/**
 * Just like callSequentially, but if either validator throws an error, the errors
 * are collected and thrown at the end.
 *
 * @param {function} firstValidator
 * @param {function} secondValidator
 * @returns {function}
 */
var callSequentiallyJoinErrors = function callSequentiallyJoinErrors(firstValidator, secondValidator) {
  return function callSequentiallyJoinErrorsValidator(value, path) {
    var _this = this;
    var errors = [];
    var newValue = [firstValidator, secondValidator].reduce(function (memo, validator) {
      try {
        return validator.call(_this, memo, path);
      } catch (e) {
        errors.push(e);
        return memo;
      }
    }, value);
    if (errors.length) {
      throw new Error(errors.join("\n"));
    }
    return newValue;
  };
};

/**
 * Chains two validators together. In addition to calling the validators in
 * sequence, this will also copy over methods from the base validator to the
 * resulting validator and include any additional methods.
 *
 * @param {function} baseValidator - This validator will be called first, and its
 * methods will be copied over to the returned validator.
 * @param {function} newValidator - This validator will be called second.
 * @param {object} additionalMethods - Additional methods to include on the returned
 * validator.
 * @returns {function}
 */
var chain = function chain(baseValidator, newValidator, additionalMethods) {
  return Object.assign(callSequentially(baseValidator, newValidator), baseValidator, additionalMethods);
};

/**
 * Chains two validators together, but skips the second validator if the value
 * is null. In addition to calling the validators in sequence, this will also
 * copy over methods from the base validator to the resulting validator and
 * include any additional methods.
 *
 * @param {function} baseValidator - This validator will be called first, and its
 * methods will be copied over to the returned validator.
 * @param {function} newValidator - This validator will be called second. If the value
 * is null after the first validator is called, this validator will not be
 * called.
 * @param {object} additionalMethods - Additional methods to include on the returned
 * validator.
 * @returns {function}
 */
exports.chain = chain;
var nullSafeChain = function nullSafeChain(baseValidator, newValidator, additionalMethods) {
  return Object.assign(callSequentially(baseValidator, skipIfNull(newValidator)), baseValidator, additionalMethods);
};

/**
 * Same as nullSafeChain, but calls the new validator first.
 *
 * @param {function} baseValidator - This validator will be called second, and its
 * methods will be copied over to the returned validator.
 * @param {function} newValidator - This validator will be called first. If the value
 * is null, this validator will not be called.
 * @param {function} additionalMethods - Additional methods to include on the returned
 * validator.
 * @returns {function}
 */
exports.nullSafeChain = nullSafeChain;
var reverseNullSafeChainJoinErrors = function reverseNullSafeChainJoinErrors(baseValidator, newValidator, additionalMethods) {
  return Object.assign(callSequentiallyJoinErrors(skipIfNull(newValidator), baseValidator), baseValidator, additionalMethods);
};

/**
 * Throws an error if the value is not valid.
 *
 * @param {boolean} isValid - Whether or not the value is valid.
 * @param {*} value - The value to validate.
 * @param {string} path - The path to the value.
 * @param {string} message - The expected part of the error message.
 * @throws {Error} - Throws an error if the value is not valid.
 * @returns {void}
 */
exports.reverseNullSafeChainJoinErrors = reverseNullSafeChainJoinErrors;
var assertValid = function assertValid(isValid, value, path, message) {
  if (!isValid) {
    throw new Error("'" + path + "': Expected " + message + ", but got " + JSON.stringify(value) + ".");
  }
};
exports.assertValid = assertValid;

},{}],372:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = exports.validate = exports.v7 = exports.v6ToV1 = exports.v6 = exports.v5 = exports.v4 = exports.v3 = exports.v1ToV6 = exports.v1 = exports.stringify = exports.parse = exports.NIL = exports.MAX = void 0;
var max_js_1 = require("./max.js");
Object.defineProperty(exports, "MAX", {
  enumerable: true,
  get: function get() {
    return max_js_1["default"];
  }
});
var nil_js_1 = require("./nil.js");
Object.defineProperty(exports, "NIL", {
  enumerable: true,
  get: function get() {
    return nil_js_1["default"];
  }
});
var parse_js_1 = require("./parse.js");
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function get() {
    return parse_js_1["default"];
  }
});
var stringify_js_1 = require("./stringify.js");
Object.defineProperty(exports, "stringify", {
  enumerable: true,
  get: function get() {
    return stringify_js_1["default"];
  }
});
var v1_js_1 = require("./v1.js");
Object.defineProperty(exports, "v1", {
  enumerable: true,
  get: function get() {
    return v1_js_1["default"];
  }
});
var v1ToV6_js_1 = require("./v1ToV6.js");
Object.defineProperty(exports, "v1ToV6", {
  enumerable: true,
  get: function get() {
    return v1ToV6_js_1["default"];
  }
});
var v3_js_1 = require("./v3.js");
Object.defineProperty(exports, "v3", {
  enumerable: true,
  get: function get() {
    return v3_js_1["default"];
  }
});
var v4_js_1 = require("./v4.js");
Object.defineProperty(exports, "v4", {
  enumerable: true,
  get: function get() {
    return v4_js_1["default"];
  }
});
var v5_js_1 = require("./v5.js");
Object.defineProperty(exports, "v5", {
  enumerable: true,
  get: function get() {
    return v5_js_1["default"];
  }
});
var v6_js_1 = require("./v6.js");
Object.defineProperty(exports, "v6", {
  enumerable: true,
  get: function get() {
    return v6_js_1["default"];
  }
});
var v6ToV1_js_1 = require("./v6ToV1.js");
Object.defineProperty(exports, "v6ToV1", {
  enumerable: true,
  get: function get() {
    return v6ToV1_js_1["default"];
  }
});
var v7_js_1 = require("./v7.js");
Object.defineProperty(exports, "v7", {
  enumerable: true,
  get: function get() {
    return v7_js_1["default"];
  }
});
var validate_js_1 = require("./validate.js");
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function get() {
    return validate_js_1["default"];
  }
});
var version_js_1 = require("./version.js");
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function get() {
    return version_js_1["default"];
  }
});

},{"./max.js":373,"./nil.js":376,"./parse.js":377,"./stringify.js":381,"./v1.js":382,"./v1ToV6.js":383,"./v3.js":384,"./v4.js":386,"./v5.js":387,"./v6.js":388,"./v6ToV1.js":389,"./v7.js":390,"./validate.js":391,"./version.js":392}],373:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = 'ffffffff-ffff-ffff-ffff-ffffffffffff';

},{}],374:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function md5(bytes) {
  var words = uint8ToUint32(bytes);
  var md5Bytes = wordsToMd5(words, bytes.length * 8);
  return uint32ToUint8(md5Bytes);
}
function uint32ToUint8(input) {
  var bytes = new Uint8Array(input.length * 4);
  for (var i = 0; i < input.length * 4; i++) {
    bytes[i] = input[i >> 2] >>> i % 4 * 8 & 0xff;
  }
  return bytes;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  var xpad = new Uint32Array(getOutputLength(len)).fill(0);
  xpad.set(x);
  xpad[len >> 5] |= 0x80 << len % 32;
  xpad[xpad.length - 1] = len;
  x = xpad;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return Uint32Array.of(a, b, c, d);
}
function uint8ToUint32(input) {
  if (input.length === 0) {
    return new Uint32Array();
  }
  var output = new Uint32Array(getOutputLength(input.length * 8)).fill(0);
  for (var i = 0; i < input.length; i++) {
    output[i >> 2] |= (input[i] & 0xff) << i % 4 * 8;
  }
  return output;
}
function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
exports["default"] = md5;

},{}],375:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
exports["default"] = {
  randomUUID: randomUUID
};

},{}],376:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = '00000000-0000-0000-0000-000000000000';

},{}],377:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validate_js_1 = require("./validate.js");
function parse(uuid) {
  if (!(0, validate_js_1["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }
  var v;
  return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, v >>> 16 & 0xff, v >>> 8 & 0xff, v & 0xff, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff, v / 0x100000000 & 0xff, v >>> 24 & 0xff, v >>> 16 & 0xff, v >>> 8 & 0xff, v & 0xff);
}
exports["default"] = parse;

},{"./validate.js":391}],378:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

},{}],379:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
    getRandomValues = crypto.getRandomValues.bind(crypto);
  }
  return getRandomValues(rnds8);
}
exports["default"] = rng;

},{}],380:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
  var newBytes = new Uint8Array(bytes.length + 1);
  newBytes.set(bytes);
  newBytes[bytes.length] = 0x80;
  bytes = newBytes;
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);
  for (var i = 0; i < N; ++i) {
    var arr = new Uint32Array(16);
    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }
    M[i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
  for (var _i = 0; _i < N; ++_i) {
    var W = new Uint32Array(80);
    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i][t];
    }
    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }
    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];
    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return Uint8Array.of(H[0] >> 24, H[0] >> 16, H[0] >> 8, H[0], H[1] >> 24, H[1] >> 16, H[1] >> 8, H[1], H[2] >> 24, H[2] >> 16, H[2] >> 8, H[2], H[3] >> 24, H[3] >> 16, H[3] >> 8, H[3], H[4] >> 24, H[4] >> 16, H[4] >> 8, H[4]);
}
exports["default"] = sha1;

},{}],381:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeStringify = void 0;
var validate_js_1 = require("./validate.js");
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
exports.unsafeStringify = unsafeStringify;
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var uuid = unsafeStringify(arr, offset);
  if (!(0, validate_js_1["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }
  return uuid;
}
exports["default"] = stringify;

},{"./validate.js":391}],382:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateV1State = void 0;
var rng_js_1 = require("./rng.js");
var stringify_js_1 = require("./stringify.js");
var _state = {};
function v1(options, buf, offset) {
  var _options$_v, _options;
  var bytes;
  var isV6 = (_options$_v = (_options = options) === null || _options === void 0 ? void 0 : _options._v6) !== null && _options$_v !== void 0 ? _options$_v : false;
  if (options) {
    var optionsKeys = Object.keys(options);
    if (optionsKeys.length === 1 && optionsKeys[0] === '_v6') {
      options = undefined;
    }
  }
  if (options) {
    var _ref, _options$random, _options$rng, _options2;
    bytes = v1Bytes((_ref = (_options$random = options.random) !== null && _options$random !== void 0 ? _options$random : (_options$rng = (_options2 = options).rng) === null || _options$rng === void 0 ? void 0 : _options$rng.call(_options2)) !== null && _ref !== void 0 ? _ref : (0, rng_js_1["default"])(), options.msecs, options.nsecs, options.clockseq, options.node, buf, offset);
  } else {
    var now = Date.now();
    var rnds = (0, rng_js_1["default"])();
    updateV1State(_state, now, rnds);
    bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, isV6 ? undefined : _state.clockseq, isV6 ? undefined : _state.node, buf, offset);
  }
  return buf ? bytes : (0, stringify_js_1.unsafeStringify)(bytes);
}
function updateV1State(state, now, rnds) {
  var _state$msecs, _state$nsecs;
  (_state$msecs = state.msecs) !== null && _state$msecs !== void 0 ? _state$msecs : state.msecs = -Infinity;
  (_state$nsecs = state.nsecs) !== null && _state$nsecs !== void 0 ? _state$nsecs : state.nsecs = 0;
  if (now === state.msecs) {
    state.nsecs++;
    if (state.nsecs >= 10000) {
      state.node = undefined;
      state.nsecs = 0;
    }
  } else if (now > state.msecs) {
    state.nsecs = 0;
  } else if (now < state.msecs) {
    state.node = undefined;
  }
  if (!state.node) {
    state.node = rnds.slice(10, 16);
    state.node[0] |= 0x01;
    state.clockseq = (rnds[8] << 8 | rnds[9]) & 0x3fff;
  }
  state.msecs = now;
  return state;
}
exports.updateV1State = updateV1State;
function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf) {
  var offset = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  if (rnds.length < 16) {
    throw new Error('Random bytes length must be >= 16');
  }
  if (!buf) {
    buf = new Uint8Array(16);
    offset = 0;
  } else {
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError("UUID byte range ".concat(offset, ":").concat(offset + 15, " is out of buffer bounds"));
    }
  }
  msecs !== null && msecs !== void 0 ? msecs : msecs = Date.now();
  nsecs !== null && nsecs !== void 0 ? nsecs : nsecs = 0;
  clockseq !== null && clockseq !== void 0 ? clockseq : clockseq = (rnds[8] << 8 | rnds[9]) & 0x3fff;
  node !== null && node !== void 0 ? node : node = rnds.slice(10, 16);
  msecs += 12219292800000;
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  buf[offset++] = tl >>> 24 & 0xff;
  buf[offset++] = tl >>> 16 & 0xff;
  buf[offset++] = tl >>> 8 & 0xff;
  buf[offset++] = tl & 0xff;
  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  buf[offset++] = tmh >>> 8 & 0xff;
  buf[offset++] = tmh & 0xff;
  buf[offset++] = tmh >>> 24 & 0xf | 0x10;
  buf[offset++] = tmh >>> 16 & 0xff;
  buf[offset++] = clockseq >>> 8 | 0x80;
  buf[offset++] = clockseq & 0xff;
  for (var n = 0; n < 6; ++n) {
    buf[offset++] = node[n];
  }
  return buf;
}
exports["default"] = v1;

},{"./rng.js":379,"./stringify.js":381}],383:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parse_js_1 = require("./parse.js");
var stringify_js_1 = require("./stringify.js");
function v1ToV6(uuid) {
  var v1Bytes = typeof uuid === 'string' ? (0, parse_js_1["default"])(uuid) : uuid;
  var v6Bytes = _v1ToV6(v1Bytes);
  return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v6Bytes) : v6Bytes;
}
exports["default"] = v1ToV6;
function _v1ToV6(v1Bytes) {
  return Uint8Array.of((v1Bytes[6] & 0x0f) << 4 | v1Bytes[7] >> 4 & 0x0f, (v1Bytes[7] & 0x0f) << 4 | (v1Bytes[4] & 0xf0) >> 4, (v1Bytes[4] & 0x0f) << 4 | (v1Bytes[5] & 0xf0) >> 4, (v1Bytes[5] & 0x0f) << 4 | (v1Bytes[0] & 0xf0) >> 4, (v1Bytes[0] & 0x0f) << 4 | (v1Bytes[1] & 0xf0) >> 4, (v1Bytes[1] & 0x0f) << 4 | (v1Bytes[2] & 0xf0) >> 4, 0x60 | v1Bytes[2] & 0x0f, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
}

},{"./parse.js":377,"./stringify.js":381}],384:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URL = exports.DNS = void 0;
var md5_js_1 = require("./md5.js");
var v35_js_1 = require("./v35.js");
var v35_js_2 = require("./v35.js");
Object.defineProperty(exports, "DNS", {
  enumerable: true,
  get: function get() {
    return v35_js_2.DNS;
  }
});
Object.defineProperty(exports, "URL", {
  enumerable: true,
  get: function get() {
    return v35_js_2.URL;
  }
});
function v3(value, namespace, buf, offset) {
  return (0, v35_js_1["default"])(0x30, md5_js_1["default"], value, namespace, buf, offset);
}
v3.DNS = v35_js_1.DNS;
v3.URL = v35_js_1.URL;
exports["default"] = v3;

},{"./md5.js":374,"./v35.js":385}],385:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URL = exports.DNS = exports.stringToBytes = void 0;
var parse_js_1 = require("./parse.js");
var stringify_js_1 = require("./stringify.js");
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  var bytes = new Uint8Array(str.length);
  for (var i = 0; i < str.length; ++i) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}
exports.stringToBytes = stringToBytes;
exports.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(version, hash, value, namespace, buf, offset) {
  var _namespace;
  var valueBytes = typeof value === 'string' ? stringToBytes(value) : value;
  var namespaceBytes = typeof namespace === 'string' ? (0, parse_js_1["default"])(namespace) : namespace;
  if (typeof namespace === 'string') {
    namespace = (0, parse_js_1["default"])(namespace);
  }
  if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
    throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
  }
  var bytes = new Uint8Array(16 + valueBytes.length);
  bytes.set(namespaceBytes);
  bytes.set(valueBytes, namespaceBytes.length);
  bytes = hash(bytes);
  bytes[6] = bytes[6] & 0x0f | version;
  bytes[8] = bytes[8] & 0x3f | 0x80;
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = bytes[i];
    }
    return buf;
  }
  return (0, stringify_js_1.unsafeStringify)(bytes);
}
exports["default"] = v35;

},{"./parse.js":377,"./stringify.js":381}],386:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var native_js_1 = require("./native.js");
var rng_js_1 = require("./rng.js");
var stringify_js_1 = require("./stringify.js");
function v4(options, buf, offset) {
  var _ref, _options$random, _options$rng, _options;
  if (native_js_1["default"].randomUUID && !buf && !options) {
    return native_js_1["default"].randomUUID();
  }
  options = options || {};
  var rnds = (_ref = (_options$random = options.random) !== null && _options$random !== void 0 ? _options$random : (_options$rng = (_options = options).rng) === null || _options$rng === void 0 ? void 0 : _options$rng.call(_options)) !== null && _ref !== void 0 ? _ref : (0, rng_js_1["default"])();
  if (rnds.length < 16) {
    throw new Error('Random bytes length must be >= 16');
  }
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;
  if (buf) {
    offset = offset || 0;
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError("UUID byte range ".concat(offset, ":").concat(offset + 15, " is out of buffer bounds"));
    }
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return (0, stringify_js_1.unsafeStringify)(rnds);
}
exports["default"] = v4;

},{"./native.js":375,"./rng.js":379,"./stringify.js":381}],387:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URL = exports.DNS = void 0;
var sha1_js_1 = require("./sha1.js");
var v35_js_1 = require("./v35.js");
var v35_js_2 = require("./v35.js");
Object.defineProperty(exports, "DNS", {
  enumerable: true,
  get: function get() {
    return v35_js_2.DNS;
  }
});
Object.defineProperty(exports, "URL", {
  enumerable: true,
  get: function get() {
    return v35_js_2.URL;
  }
});
function v5(value, namespace, buf, offset) {
  return (0, v35_js_1["default"])(0x50, sha1_js_1["default"], value, namespace, buf, offset);
}
v5.DNS = v35_js_1.DNS;
v5.URL = v35_js_1.URL;
exports["default"] = v5;

},{"./sha1.js":380,"./v35.js":385}],388:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var stringify_js_1 = require("./stringify.js");
var v1_js_1 = require("./v1.js");
var v1ToV6_js_1 = require("./v1ToV6.js");
function v6(options, buf, offset) {
  options !== null && options !== void 0 ? options : options = {};
  offset !== null && offset !== void 0 ? offset : offset = 0;
  var bytes = (0, v1_js_1["default"])(_objectSpread(_objectSpread({}, options), {}, {
    _v6: true
  }), new Uint8Array(16));
  bytes = (0, v1ToV6_js_1["default"])(bytes);
  if (buf) {
    for (var i = 0; i < 16; i++) {
      buf[offset + i] = bytes[i];
    }
    return buf;
  }
  return (0, stringify_js_1.unsafeStringify)(bytes);
}
exports["default"] = v6;

},{"./stringify.js":381,"./v1.js":382,"./v1ToV6.js":383}],389:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parse_js_1 = require("./parse.js");
var stringify_js_1 = require("./stringify.js");
function v6ToV1(uuid) {
  var v6Bytes = typeof uuid === 'string' ? (0, parse_js_1["default"])(uuid) : uuid;
  var v1Bytes = _v6ToV1(v6Bytes);
  return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v1Bytes) : v1Bytes;
}
exports["default"] = v6ToV1;
function _v6ToV1(v6Bytes) {
  return Uint8Array.of((v6Bytes[3] & 0x0f) << 4 | v6Bytes[4] >> 4 & 0x0f, (v6Bytes[4] & 0x0f) << 4 | (v6Bytes[5] & 0xf0) >> 4, (v6Bytes[5] & 0x0f) << 4 | v6Bytes[6] & 0x0f, v6Bytes[7], (v6Bytes[1] & 0x0f) << 4 | (v6Bytes[2] & 0xf0) >> 4, (v6Bytes[2] & 0x0f) << 4 | (v6Bytes[3] & 0xf0) >> 4, 0x10 | (v6Bytes[0] & 0xf0) >> 4, (v6Bytes[0] & 0x0f) << 4 | (v6Bytes[1] & 0xf0) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
}

},{"./parse.js":377,"./stringify.js":381}],390:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateV7State = void 0;
var rng_js_1 = require("./rng.js");
var stringify_js_1 = require("./stringify.js");
var _state = {};
function v7(options, buf, offset) {
  var bytes;
  if (options) {
    var _ref, _options$random, _options$rng;
    bytes = v7Bytes((_ref = (_options$random = options.random) !== null && _options$random !== void 0 ? _options$random : (_options$rng = options.rng) === null || _options$rng === void 0 ? void 0 : _options$rng.call(options)) !== null && _ref !== void 0 ? _ref : (0, rng_js_1["default"])(), options.msecs, options.seq, buf, offset);
  } else {
    var now = Date.now();
    var rnds = (0, rng_js_1["default"])();
    updateV7State(_state, now, rnds);
    bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
  }
  return buf ? bytes : (0, stringify_js_1.unsafeStringify)(bytes);
}
function updateV7State(state, now, rnds) {
  var _state$msecs, _state$seq;
  (_state$msecs = state.msecs) !== null && _state$msecs !== void 0 ? _state$msecs : state.msecs = -Infinity;
  (_state$seq = state.seq) !== null && _state$seq !== void 0 ? _state$seq : state.seq = 0;
  if (now > state.msecs) {
    state.seq = rnds[6] << 23 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
    state.msecs = now;
  } else {
    state.seq = state.seq + 1 | 0;
    if (state.seq === 0) {
      state.msecs++;
    }
  }
  return state;
}
exports.updateV7State = updateV7State;
function v7Bytes(rnds, msecs, seq, buf) {
  var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  if (rnds.length < 16) {
    throw new Error('Random bytes length must be >= 16');
  }
  if (!buf) {
    buf = new Uint8Array(16);
    offset = 0;
  } else {
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError("UUID byte range ".concat(offset, ":").concat(offset + 15, " is out of buffer bounds"));
    }
  }
  msecs !== null && msecs !== void 0 ? msecs : msecs = Date.now();
  seq !== null && seq !== void 0 ? seq : seq = rnds[6] * 0x7f << 24 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
  buf[offset++] = msecs / 0x10000000000 & 0xff;
  buf[offset++] = msecs / 0x100000000 & 0xff;
  buf[offset++] = msecs / 0x1000000 & 0xff;
  buf[offset++] = msecs / 0x10000 & 0xff;
  buf[offset++] = msecs / 0x100 & 0xff;
  buf[offset++] = msecs & 0xff;
  buf[offset++] = 0x70 | seq >>> 28 & 0x0f;
  buf[offset++] = seq >>> 20 & 0xff;
  buf[offset++] = 0x80 | seq >>> 14 & 0x3f;
  buf[offset++] = seq >>> 6 & 0xff;
  buf[offset++] = seq << 2 & 0xff | rnds[10] & 0x03;
  buf[offset++] = rnds[11];
  buf[offset++] = rnds[12];
  buf[offset++] = rnds[13];
  buf[offset++] = rnds[14];
  buf[offset++] = rnds[15];
  return buf;
}
exports["default"] = v7;

},{"./rng.js":379,"./stringify.js":381}],391:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var regex_js_1 = require("./regex.js");
function validate(uuid) {
  return typeof uuid === 'string' && regex_js_1["default"].test(uuid);
}
exports["default"] = validate;

},{"./regex.js":378}],392:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validate_js_1 = require("./validate.js");
function version(uuid) {
  if (!(0, validate_js_1["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }
  return parseInt(uuid.slice(14, 15), 16);
}
exports["default"] = version;

},{"./validate.js":391}],393:[function(require,module,exports){
/***************************************************************************************
 * (c) 2017 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 ****************************************************************************************/
'use strict';

/**
 * Parse a query string into an object. Leading `?` or `#` are ignored, so you
 * can pass `location.search` or `location.hash` directly.
 *
 * URL components are decoded with decode-uri-component.
 *
 * Parse arrays with elements using duplicate keys, e.g. ?a=1&a=2 becomes
 * {a: ['1', '2']}.
 *
 * Query keys are sorted alphabetically.
 *
 * Numbers and booleans are NOT parsed; they are left as strings.
 * @param {string} query the query part of a url
 * @returns {{ [key: string]: string | string[] | undefined }} the parsed query string
 */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var parseQueryString = function parseQueryString(query) {
  /** @type {{[key: string]: string | string[] | undefined }} */
  var result = {};
  if (!query || typeof query !== 'string') {
    return result;
  }
  var cleanQuery = query.trim().replace(/^[?#&]/, '');
  var params = new URLSearchParams(cleanQuery);
  var iter = params.keys();
  do {
    var v = iter.next();
    var key = v.value;
    if (key) {
      var values = params.getAll(key);
      if (values.length === 1) {
        result[key] = values[0];
      } else {
        result[key] = values;
      }
    }
  } while (v.done === false);
  return result;
};

/**
 * Transform an object into a query string.
 *
 * Keys having object values are ignored.
 *
 * @param {object} the object to transform into a query string
 * @returns {string} the parsed query string
 */

var stringifyObject = function stringifyObject(object) {
  var spaceToken = '{{space}}';
  var params = new URLSearchParams();
  Object.keys(object).forEach(function (key) {
    var value = object[key];
    if (typeof object[key] === 'string') {
      value = value.replace(/ /g, spaceToken);
    } else if (['object', 'undefined'].includes(_typeof(value)) && !Array.isArray(value)) {
      value = '';
    }
    if (Array.isArray(value)) {
      value.forEach(function (arrayValue) {
        params.append(key, arrayValue);
      });
    } else {
      params.append(key, value);
    }
  });
  return params.toString().replace(new RegExp(encodeURIComponent(spaceToken), 'g'), '%20');
};

// We proxy the underlying querystring module so we can limit the API we expose.
// This allows us to more easily make changes to the underlying implementation later without
// having to worry about breaking extensions. If extensions demand additional functionality, we
// can make adjustments as needed.
module.exports = {
  parse: function parse(string) {
    return parseQueryString(string);
  },
  stringify: function stringify(object) {
    return stringifyObject(object);
  }
};

},{}],394:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*! js-cookie v3.0.5 | MIT */
;
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, function () {
    var current = global.Cookies;
    var exports = global.Cookies = factory();
    exports.noConflict = function () {
      global.Cookies = current;
      return exports;
    };
  }());
})(void 0, function () {
  'use strict';

  /* eslint-disable no-var */
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  /* eslint-enable no-var */

  /* eslint-disable no-var */
  var defaultConverter = {
    read: function read(value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function write(value) {
      return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
    }
  };
  /* eslint-enable no-var */

  /* eslint-disable no-var */

  function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === 'undefined') {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += '; ' + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }
      return document.cookie = name + '=' + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === 'undefined' || arguments.length && !name) {
        return;
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e) {}
      }
      return name ? jar[name] : jar;
    }
    return Object.create({
      set: set,
      get: get,
      remove: function remove(name, attributes) {
        set(name, '', assign({}, attributes, {
          expires: -1
        }));
      },
      withAttributes: function withAttributes(attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function withConverter(converter) {
        return init(assign({}, this.converter, converter), this.attributes);
      }
    }, {
      attributes: {
        value: Object.freeze(defaultAttributes)
      },
      converter: {
        value: Object.freeze(converter)
      }
    });
  }
  var api = init(defaultConverter, {
    path: '/'
  });
  /* eslint-enable no-var */

  return api;
});

},{}],395:[function(require,module,exports){
'use strict';

module.exports = function (str) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!str) return undefined;
  var o = {
    key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
    q: {
      name: 'queryKey',
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\d*))?))?((((?:[^?#/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose: /^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#/]*\.[^?#/.]+(?:[?#]|$)))*\/?)?([^?#/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };
  var m = o.parser[opts.strictMode ? 'strict' : 'loose'].exec(str);
  var uri = {};
  var i = 14;
  while (i--) uri[o.key[i]] = m[i] || '';
  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });
  return uri;
};

},{}],396:[function(require,module,exports){
"use strict";

var alloyLibrary = require('@adobe/alloy');
var alloy = alloyLibrary.createInstance({
  name: "alloy"
});

// 기본 설정
alloy("config", {
  datastreamId: "1234567890",
  orgId: "1234567890",
  clickCollectionEnabled: true,
  clickCollection: {}
});

// 페이지뷰 이벤트를 보내는 함수
function sendPageView(pageName) {
  alloy("sendEvent", {
    xdm: {
      eventType: "pageView",
      web: {
        webPageDetails: {
          name: pageName
        }
      }
    }
  });
}

// 다른 이벤트를 보내는 함수
function sendCustomEvent(eventData) {
  alloy("sendEvent", eventData);
}

// 함수들을 내보내기
module.exports = {
  sendPageView: sendPageView,
  sendCustomEvent: sendCustomEvent
};

},{"@adobe/alloy":266}]},{},[396]);
