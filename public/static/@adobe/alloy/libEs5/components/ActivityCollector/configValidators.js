"use strict";

exports.downloadLinkQualifier = exports.default = exports.DEFAULT_DOWNLOAD_QUALIFIER = void 0;
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

const DEFAULT_DOWNLOAD_QUALIFIER = exports.DEFAULT_DOWNLOAD_QUALIFIER = "\\.(exe|zip|wav|mp3|mov|mpg|avi|wmv|pdf|doc|docx|xls|xlsx|ppt|pptx)$";
const downloadLinkQualifier = exports.downloadLinkQualifier = (0, _index.string)().regexp().default(DEFAULT_DOWNLOAD_QUALIFIER);
const validators = (0, _index.objectOf)({
  clickCollectionEnabled: (0, _index.boolean)().default(true),
  clickCollection: (0, _index.objectOf)({
    internalLinkEnabled: (0, _index.boolean)().default(true),
    externalLinkEnabled: (0, _index.boolean)().default(true),
    downloadLinkEnabled: (0, _index.boolean)().default(true),
    // TODO: Consider moving downloadLinkQualifier here.
    sessionStorageEnabled: (0, _index.boolean)().default(false),
    eventGroupingEnabled: (0, _index.boolean)().default(false),
    filterClickProperties: (0, _index.callback)()
  }).default({
    internalLinkEnabled: true,
    externalLinkEnabled: true,
    downloadLinkEnabled: true,
    sessionStorageEnabled: false,
    eventGroupingEnabled: false
  }),
  downloadLinkQualifier,
  onBeforeLinkClickSend: (0, _index.callback)().deprecated('The field "onBeforeLinkClickSend" has been deprecated. Use "clickCollection.filterClickDetails" instead.')
});

// Export both the validators and the default qualifier
var _default = exports.default = validators;