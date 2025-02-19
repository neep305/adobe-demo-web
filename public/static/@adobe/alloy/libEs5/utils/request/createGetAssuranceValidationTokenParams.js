"use strict";

exports.default = void 0;
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

const ASSURANCE_VALIDATION_SESSION_URL_PARAM = "adb_validation_sessionid";
const ASSURANCE_VALIDATION_NAMESPACE = "validation.";
const CLIENT_ID = "clientId";
const getOrCreateAssuranceClientId = storage => {
  let clientId = storage.persistent.getItem(CLIENT_ID);
  if (!clientId) {
    clientId = (0, _index.uuid)();
    storage.persistent.setItem(CLIENT_ID, clientId);
  }
  return clientId;
};
var _default = ({
  window,
  createNamespacedStorage
}) => {
  const storage = createNamespacedStorage(ASSURANCE_VALIDATION_NAMESPACE);
  return () => {
    const parsedQuery = _index.queryString.parse(window.location.search);
    const validationSessionId = parsedQuery[ASSURANCE_VALIDATION_SESSION_URL_PARAM];
    if (!validationSessionId) {
      return "";
    }
    const clientId = getOrCreateAssuranceClientId(storage);
    const validationToken = validationSessionId + "|" + clientId;
    return "&" + _index.queryString.stringify({
      adobeAepValidationToken: validationToken
    });
  };
};
exports.default = _default;