"use strict";

exports.default = void 0;
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
var _default = ({
  options
}) => {
  const sessionValidator = (0, _index.anyOf)([(0, _index.objectOf)({
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
exports.default = _default;