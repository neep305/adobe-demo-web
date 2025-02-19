"use strict";

exports.default = void 0;
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

const getClickedElementProperties = (0, _createGetClickedElementProperties.default)({
  window,
  getLinkName: _getLinkName.default,
  getLinkRegion: _getLinkRegion.default,
  getAbsoluteUrlFromAnchorElement: _getAbsoluteUrlFromAnchorElement.default,
  findClickableElement: _findClickableElement.default,
  determineLinkType: _determineLinkType.default
});
let clickActivityStorage;
const initClickActivityStorage = config => {
  if (!clickActivityStorage) {
    const createNamespacedStorage = (0, _index.injectStorage)(window);
    const nameSpacedStorage = createNamespacedStorage(config.orgId || "");
    // Use transient in-memory if sessionStorage is disabled
    const transientStorage = (0, _createTransientStorage.default)();
    const storage = config.clickCollection.sessionStorageEnabled ? nameSpacedStorage.session : transientStorage;
    clickActivityStorage = (0, _createClickActivityStorage.default)({
      storage
    });
  }
};
const createActivityCollector = ({
  config,
  eventManager,
  handleError,
  logger
}) => {
  (0, _validateClickCollectionConfig.default)(config, logger);
  const clickCollection = config.clickCollection;
  if (!clickActivityStorage) {
    initClickActivityStorage(config);
  }
  const injectClickedElementProperties = (0, _createInjectClickedElementProperties.default)({
    config,
    logger,
    clickActivityStorage,
    getClickedElementProperties
  });
  const recallAndInjectClickedElementProperties = (0, _createRecallAndInjectClickedElementProperties.default)({
    clickActivityStorage
  });
  const storePageViewProperties = (0, _createStorePageViewProperties.default)({
    clickActivityStorage
  });
  return {
    lifecycle: {
      onComponentsRegistered(tools) {
        const {
          lifecycle
        } = tools;
        (0, _attachClickActivityCollector.default)({
          eventManager,
          lifecycle,
          handleError
        });
        // TODO: createScrollActivityCollector ...
      },
      onClick({
        event,
        clickedElement
      }) {
        injectClickedElementProperties({
          event,
          clickedElement
        });
      },
      onBeforeEvent({
        event
      }) {
        if ((0, _hasPageName.default)(event)) {
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
createActivityCollector.configValidators = _configValidators.default;
createActivityCollector.buildOnInstanceConfiguredExtraParams = ({
  config,
  logger
}) => {
  if (!clickActivityStorage) {
    initClickActivityStorage(config);
  }
  return {
    getLinkDetails: targetElement => {
      return getClickedElementProperties({
        clickActivityStorage,
        clickedElement: targetElement,
        config,
        logger
      }).properties;
    }
  };
};
var _default = exports.default = createActivityCollector;