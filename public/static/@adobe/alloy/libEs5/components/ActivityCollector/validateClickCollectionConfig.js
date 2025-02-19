"use strict";

exports.default = void 0;
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
var _default = (config, logger) => {
  const {
    clickCollectionEnabled,
    onBeforeLinkClickSend,
    downloadLinkQualifier: dlq
  } = config;
  if (clickCollectionEnabled === false) {
    if (onBeforeLinkClickSend) {
      logger.warn("The 'onBeforeLinkClickSend' configuration was provided but will be ignored because clickCollectionEnabled is false.");
    }
    if (dlq && dlq !== _configValidators.DEFAULT_DOWNLOAD_QUALIFIER) {
      logger.warn("The 'downloadLinkQualifier' configuration was provided but will be ignored because clickCollectionEnabled is false.");
    }
  }
};
exports.default = _default;