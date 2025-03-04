// alloy.js
import { createInstance } from '@adobe/alloy';

const alloy = createInstance({ name: "alloy" });
/**
 * Alloy 기본 설정을 적용하는 함수
 * @param {string} edgeConfigId - Adobe Edge Config ID
 * @param {string} orgId - Adobe Org ID
 */
function configureAlloy(edgeConfigId, orgId) {
    console.log("Alloy:", alloy);

    return alloy("configure", {
        // Edge Configurations have been rebranded to Datastreams. A datastream ID is the same as a configuration ID.
        edgeConfigId: edgeConfigId,
        orgId: orgId,
        context: ["web", "device", "environment", "placeContext"],
        debugEnabled: true,
        defaultConsent: "in",
        onBeforeEventSend: function (content) {
            console.log("onBeforeEventSend xdm: ", content.xdm);
            // 필요한 경우 여기서 tel: 또는 mailto: 링크 처리
            if (content.xdm?.web?.webInteraction?.URL?.includes("tel:")) {
                content.xdm.web.webInteraction.name = "Phone number";
                content.xdm.web.webInteraction.URL = "Phone number";
            }
            if (content.xdm?.web?.webInteraction?.URL?.includes("mailto:")) {
                content.xdm.web.webInteraction.name = "Email address";
                content.xdm.web.webInteraction.URL = "Email address";
            }
        }
    });
}

/**
 * 페이지뷰 이벤트를 전송하는 함수
 * @param {string} pageName - 페이지 이름
 */
function sendPageView(pageName) {
    return alloy("sendEvent", {
        "xdm": {
            "eventType": "web.webpagedetails.pageView",
            "web": {
                "webPageDetails": {
                    "name": pageName,
                    "URL": window.location.href,
                    "isHomePage": true
                }
            }
        }
    });
}

/**
 * 커스텀 이벤트를 전송하는 함수
 * @param {object} eventData - 이벤트 데이터
 */
function sendCustomEvent(eventType, pageName) {
    alloy("sendEvent", {
        "xdm": {
            "eventType": eventType,
            "web": {
                "webPageDetails": {
                    "name": pageName
                }
            }
        }
    }).then(() => {
        console.log(`[sendEvent] ${eventType} sent to Adobe`);
    });
}

function alloyTest() {
    console.log("alloyTest");
}

window.__alloyCall = {
    configureAlloy: function(datastreamId, orgId) {
        configureAlloy(datastreamId, orgId);
    },
    sendCustomEvent: function(eventType, pageName) {
        sendCustomEvent(eventType, pageName);
    },
    sendPageView: function(pageName) {
        sendPageView(pageName);
    },
    alloyTest: function() {
        alloyTest();
    }
}