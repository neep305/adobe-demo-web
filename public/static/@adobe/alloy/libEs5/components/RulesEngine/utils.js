"use strict";

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

const createRestoreStorage = (storage, storageKey) => {
  return defaultValue => {
    const stored = storage.getItem(storageKey);
    if (!stored) {
      return defaultValue;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return defaultValue;
    }
  };
};
exports.createRestoreStorage = createRestoreStorage;
const createSaveStorage = (storage, storageKey, prepareFn = value => value) => {
  return value => {
    storage.setItem(storageKey, JSON.stringify(prepareFn(value)));
  };
};
exports.createSaveStorage = createSaveStorage;
const getExpirationDate = retentionPeriod => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() - retentionPeriod);
  return expirationDate;
};
exports.getExpirationDate = getExpirationDate;
const getActivityId = proposition => {
  const {
    scopeDetails = {}
  } = proposition;
  const {
    activity = {}
  } = scopeDetails;
  const {
    id
  } = activity;
  return id;
};
exports.getActivityId = getActivityId;
const createInMemoryStorage = () => {
  const inMemoryStorage = {};
  return {
    getItem: key => {
      return key in inMemoryStorage ? inMemoryStorage[key] : null;
    },
    setItem: (key, value) => {
      inMemoryStorage[key] = value;
    }
  };
};
exports.createInMemoryStorage = createInMemoryStorage;
const clearLocalStorage = storage => {
  storage.clear();
};
exports.clearLocalStorage = clearLocalStorage;
const hasExperienceData = (xdm = {}) => {
  const {
    _experience
  } = xdm;
  return !(!_experience || typeof _experience !== "object");
};
exports.hasExperienceData = hasExperienceData;
const getDecisionProvider = proposition => {
  const {
    scopeDetails = {}
  } = proposition;
  const {
    decisionProvider
  } = scopeDetails;
  return decisionProvider;
};
exports.getDecisionProvider = getDecisionProvider;