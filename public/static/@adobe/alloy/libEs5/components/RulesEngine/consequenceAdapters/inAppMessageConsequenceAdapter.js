"use strict";

exports.default = void 0;
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
var _default = (id, type, detail) => {
  const {
    html,
    mobileParameters
  } = detail;
  const webParameters = {};
  return {
    schema: _schema.MESSAGE_IN_APP,
    data: {
      mobileParameters,
      webParameters,
      content: html,
      contentType: _contentType.TEXT_HTML
    },
    id
  };
};
exports.default = _default;