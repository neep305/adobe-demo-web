# adobe-web-app

## Build 순서별 정리
1. 의존성 설치
```shell
npm install
```

2. jQuery를 Public 디렉토리로 복사: postinstall 스크립트를 사용하여 node_modules에서 jQuery를 public/javascripts 디렉토리로 복사합니다.
이 단계는 package.json의 postinstall 스크립트 덕분에 npm install 후 자동으로 실행됩니다.

3. JavaScript 번들 빌드
```shell
npm run build
```
- 이 명령어는 public/javascripts에 bundle.js를 생성합니다.
4. 서버 시작
```
npm start 
or
npm run dev
```
5. jQuery 포함 확인
6. 애플리케이션 접속: 웹 브라우저를 열고 애플리케이션에 접속하여 모든 것이 예상대로 작동하는지 확인합니다.

## [Web SDK configure](https://experienceleague.adobe.com/en/docs/experience-platform/web-sdk/commands/configure/overview)
### Configure the Web SDK using the tag extension
1. Log in to experience.adobe.com using your Adobe ID credentials.
2. Navigate to Data Collection > Tags.
3. Select the desired tag property.
4. Navigate to Extensions, then click Configure on the Adobe Experience Platform Web SDK card.
5. Go to the Web SDK tag extension configuration page for detailed information on all the configuration options.

### Configuration the Web SDK using the JavaScript library

> Alloy configure
```javascript
alloy("configure", {
  // 필수: Adobe Experience Platform의 Datastream ID
  datastreamId: "ebebf826-a01f-4458-8cec-ef61de241c93",

  // 필수: Adobe Experience Cloud 조직 ID
  orgId: "ADB3LETTERSANDNUMBERS@AdobeOrg",

  // 필수: Adobe Analytics에서 필요한 컨텍스트 데이터 (웹, 디바이스, 환경 등)
  context: ["web", "device", "environment"],

  // 디버깅 모드 활성화 (테스트 중에만 true 설정)
  debugEnabled: true,

  // 필수: 사용자 동의 상태 (Adobe Analytics는 "in"이어야 데이터가 정상 전송됨)
  defaultConsent: "in",

  // 필수: 클릭 이벤트 자동 수집 활성화 (Adobe Analytics에서 기본적으로 클릭 이벤트 추적)
  clickCollectionEnabled: true,

  // 클릭 이벤트 설정 (내부 링크, 외부 링크, 다운로드 링크 감지)
  clickCollection: {
    internalLinkEnabled: true,  // 내부 링크 클릭 추적
    downloadLinkEnabled: true,  // 다운로드 클릭 추적
    externalLinkEnabled: true,  // 외부 링크 클릭 추적
  },

  // Adobe Analytics에서 다운로드 링크로 인식할 확장자 목록 (Adobe Launch 기본값 유지)
  downloadLinkQualifier: /\.(exe|zip|wav|mp3|mov|mpg|avi|wmv|pdf|doc|docx|xls|xlsx|ppt|pptx)$/,

  // Edge Network의 기본 요청 경로 (AEP Edge Network URL 설정)
  edgeBasePath: "ee",

  // 필수: Adobe Analytics 이벤트가 전송될 때 특정 데이터를 수정하는 함수
  onBeforeEventSend: function(content) {
    // 웹 리퍼러 URL을 제거 (선택 사항)
    if (content.xdm.web?.webReferrer) {
      delete content.xdm.web.webReferrer.URL;
    }
  }
});
```

### Install the Heroku CLI
Download and install the Heroku CLI.

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.
```shell
$ heroku login
```

### Clone the repository
Use Git to clone singular-web-app's source code to your local machine.
```shell
$ heroku git:clone -a adobe-web-app 
$ cd adobe-web-app
```

### Deploy your changes
Make some changes to the code you just cloned and deploy them to Heroku using Git.
```shell
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```