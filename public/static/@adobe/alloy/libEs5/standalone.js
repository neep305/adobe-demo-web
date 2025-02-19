"use strict";

var _index = require("./core/index.js");
var components = require("./core/componentCreators.js");
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

// This file is used by rollup to create the browser version that is uploaded to cdn

// If you change this line, check if the custom build script is still working.
// You might need to change the babel plugin in scripts/helpers/entryPointGeneratorBabelPlugin.js.
(0, _index.default)({
  components: Object.values(components)
});