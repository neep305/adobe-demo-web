require('dotenv').config();
var alloyLibrary = require('@adobe/alloy');
var alloy = alloyLibrary.createInstance({ name: "alloy"});

// 기본 설정
alloy("config", {
    datastreamId: process.env.DATASTREAM_ID,
    orgId: process.env.ORG_ID,
    clickCollectionEnabled: true,
    clickCollection: {
        
    }
});

// 페이지뷰 이벤트를 보내는 함수
function sendPageView(pageName) {
    alloy("sendEvent", {
        xdm: {
            eventType: "pageView",
            web: {
                webPageDetails: {
                    name: pageName
                }
            }
        }
    });
}

// 다른 이벤트를 보내는 함수
function sendCustomEvent(eventData) {
    alloy("sendEvent", eventData);
}

// 함수들을 내보내기
module.exports = {
    sendPageView,
    sendCustomEvent
};