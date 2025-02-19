
var custom = "jasonapp://deeplinking";
var alt = "http://singular-web-app.herokuapp.com";
var g_intent = "intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end";
var timer;
var heartbeat;
var iframe_timer;

function clearTimers() {
    clearTimeout(timer);
    clearTimeout(heartbeat);
    clearTimeout(iframe_timer);
}

function intervalHeartbeat() {
    if (document.webkitHidden || document.hidden) {
        clearTimers();
    }
}

function tryIframeApproach() {
    var iframe = document.createElement("iframe");
    iframe.style.border = "none";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.onload = function () {
        document.location = alt;
    };
    iframe.src = custom;
    document.body.appendChild(iframe);
}

function tryWebkitApproach() {
    document.location = custom;
    timer = setTimeout(function () {
        document.location = alt;
    }, 2500);
}

function useIntent() {
    document.location = g_intent;
}

function launch_app_or_alt_url(el) {
    heartbeat = setInterval(intervalHeartbeat, 200);
    if (navigator.userAgent.match(/Chrome/)) {
        useIntent();
    } else if (navigator.userAgent.match(/Firefox/)) {
        tryWebkitApproach();
        iframe_timer = setTimeout(function () {
            tryIframeApproach();
        }, 1500);
    } else {
        tryIframeApproach();
    }
}

$("#btnCallS2S").click(function (event) {
    launch_app_or_alt_url($(this));
    event.preventDefault();
});

// https://jared.sng.link/Asyhj/b5ao?_dl=jasonapp%3A%2F%2Fdeeplinking&_smtype=3
const callS2S = () => {
    var settings = {
        "url": "/bridge?pcn=jason_test",
        "method": "GET",
        "timeout": 0,
    };
      
    $.ajax(settings).done(function (response) {
        console.log(response);
        launch_app_or_alt_url($(this));
    });
}