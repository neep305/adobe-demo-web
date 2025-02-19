"use strict";

exports.default = void 0;
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
var _default = ({
  generalConsentState,
  logger
}) => {
  const setConsent = (consentByPurpose, source) => {
    switch (consentByPurpose[_consentPurpose.GENERAL]) {
      case _consentStatus.IN:
        generalConsentState.in(source);
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
    initializeConsent(defaultConsentByPurpose, storedConsentByPurpose) {
      if (storedConsentByPurpose[_consentPurpose.GENERAL]) {
        setConsent(storedConsentByPurpose, _createConsentStateMachine.CONSENT_SOURCE_INITIAL);
      } else {
        setConsent(defaultConsentByPurpose, _createConsentStateMachine.CONSENT_SOURCE_DEFAULT);
      }
    },
    setConsent(consentByPurpose) {
      setConsent(consentByPurpose, _createConsentStateMachine.CONSENT_SOURCE_NEW);
    },
    suspend() {
      generalConsentState.pending();
    },
    awaitConsent() {
      return generalConsentState.awaitConsent();
    },
    withConsent() {
      return generalConsentState.withConsent();
    },
    current() {
      return generalConsentState.current();
    }
  };
};
exports.default = _default;