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

const NO_CONTENT = exports.NO_CONTENT = 204;
const TOO_MANY_REQUESTS = exports.TOO_MANY_REQUESTS = 429;
const BAD_GATEWAY = exports.BAD_GATEWAY = 502;
const SERVICE_UNAVAILABLE = exports.SERVICE_UNAVAILABLE = 503;
const GATEWAY_TIMEOUT = exports.GATEWAY_TIMEOUT = 504;