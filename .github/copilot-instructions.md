# Project Guidelines

## Code Style
- **Language**: 한글 주석 및 문서 사용 (Korean comments and documentation)
- **Backend**: Express.js with modular route structure (see [routes/](routes/) directory)
- **Views**: Pug templates (see [views/layout_default.pug](views/layout_default.pug))
- **Frontend**: jQuery + Bootstrap + Font Awesome (managed via `frontend-dependencies`)
- **Adobe SDK**: Import from `@adobe/alloy` and configure via [public/javascripts/adobe-alloy.js](public/javascripts/adobe-alloy.js)

## Architecture
- **Framework**: Node.js/Express.js server-side rendered app
- **Adobe Integration**: Web SDK (Alloy) for Experience Platform tracking
  - Configuration: `configureAlloy()` with `edgeConfigId` and `orgId` from env vars
  - Event tracking: `sendPageView()`, `sendEvent()`, `getIdentity()` functions
- **Firebase**: Firebase Admin SDK initialized in [app.js](app.js) for push notifications
- **Route Structure**: Domain-based modules (`/checkout`, `/product`, `/push`, `/mixpanel`, etc.)
- **Build Pipeline**: Webpack bundles [public/javascripts/adobe-alloy.js](public/javascripts/adobe-alloy.js) → `public/dist/bundle.js`

## Build and Test
```bash
# Install dependencies and copy frontend libraries
npm install

# Build JavaScript bundle
npm run build

# Start production server
npm start

# Start development server (with nodemon)
npm run dev
```

## Project Conventions
- **Environment Variables**: Required in `.env` file:
  - `EDGE_CONFIG_ID` - Adobe Edge Configuration ID (Datastream ID)
  - `ORG_ID` - Adobe Experience Cloud 조직 ID
  - `FIREBASE_SERVICE_ACCOUNT` - (선택사항) Heroku/프로덕션 환경용 Firebase 서비스 계정 키 JSON 문자열
- **Firebase Initialization**: Fallback logic in [app.js](app.js)
  - Heroku: Uses `FIREBASE_SERVICE_ACCOUNT` environment variable
  - Local: Uses `./config/adobe-demo-app-service-key.json` file
  - No crash if Firebase is not configured (logs warning only)
- **Template Variables**: Pass config to views via res.render (see [routes/index.js](routes/index.js))
- **Adobe Event Tracking**: Use `onBeforeEventSend` callback to sanitize URLs (tel:, mailto:)
- **Frontend Dependencies**: Managed via `frontendDependencies` in [package.json](package.json), auto-copied to `public/static/` after install

## Integration Points
- **Adobe Experience Platform**: Web SDK configured with datastream and org ID
- **Firebase Cloud Messaging**: Admin SDK for server-side push notifications
- **Frontend Libraries**: jQuery 3.1.0, Bootstrap 4.3.1, Font-Awesome 4.7.0

## Security
- **Firebase Service Key**: Stored in `config/adobe-demo-app-service-key.json` (not in repo)
- **Environment Variables**: Sensitive Adobe credentials in `.env` (not in repo)
- **Client Headers**: `Accept-CH` and `Permissions-Policy` headers configured for client hints
