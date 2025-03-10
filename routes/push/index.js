const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const axios = require('axios');

const { getPayloadByTemplateType } = require('../../rich_push_payload/data');

// 푸시 메시지 발송 페이지 렌더링
router.get('/', (req, res) => {
    res.render('push/index', {
        title: '50% 할인 이벤트',
        body: '프리미엄 헤드폰 특가 상품을 확인하세요',
        imageUrl: 'https://1801889e95b1f9bf.kinxzone.com/webfile/product/9/9687/dqgh3ajf1vcv.jpg',
        icon: 'https://i.ibb.co/b5f834mq/adobe-2.png',
        clickAction: 'https://www.google.com',
        token: 'fwRxDg4IRX6O-e4TwgBRZs:APA91bHZzwyKafSEmlz0iF3sREtcsdRfsXApURBdYwyOMy2pOpVkjuVSxo490sQ9TIufMiO9eyoV_1zSbBK83SEKO93kFu13VZTmVdRyzOhIQspHt2XF3Kc'
    });
});

// 푸시 메시지 발송
router.post('/sendPush', async (req, res) => {
    try {
        const { title, body, imageUrl, clickAction, pushType, targetType, topic, token } = req.body;
        const icon = 'https://i.ibb.co/b5f834mq/adobe-2.png';
        console.log(`title: ${title}, body: ${body}, imageUrl: ${imageUrl}, clickAction: ${clickAction}, pushType: ${pushType}, targetType: ${targetType}, topic: ${topic}, token: ${token}`);

        if (!title || !body) {
            return res.status(400).json({
                success: false,
                message: '제목과 내용은 필수입니다.'
            });
        }

        // 공통 메시지 구조
        const getMessage = (target) => {
            const message = {
                [target]: targetType === 'token' ? token : topic
            };

            if (pushType === 'notification') {
                message.notification = {
                    title,
                    body,
                };
                message.webpush = {
                    fcm_options: {
                        link: clickAction
                    }
                };
            } else {
                message.data = {
                    title: title.toString(),
                    body: body.toString(),
                    image: imageUrl || '',
                    icon: icon || '',
                    click_action: clickAction || '',
                    push_type: pushType || 'data'
                };
            }

            message.android = {
                priority: 'high',
            };
            
            message.apns = {
                payload: {
                    aps: {
                        'mutable-content': 1,
                        'content-available': 1
                    }
                }
            };

            console.log(`✅ message: ${JSON.stringify(message)}`);

            return message;
        };

        if (targetType === 'all' || targetType === 'topic') {
            const response = await axios.post(
                `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/messages:send`,
                {
                    message: getMessage(targetType === 'all' ? 'topic' : 'topic')
                },
                {
                    headers: {
                        'Authorization': `Bearer ${await getAccessToken()}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('FCM Response:', response.data);
            console.log('Sent message:', getMessage(targetType === 'all' ? 'topic' : 'topic'));
        } else if (targetType === 'token') {
            const response = await axios.post(
                `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/messages:send`,
                {
                    message: getMessage('token')
                },
                {
                    headers: {
                        'Authorization': `Bearer ${await getAccessToken()}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('FCM Response:', response.data);
            console.log('Sent message:', JSON.stringify(getMessage('token')));
        }
        res.status(200).json({
            success: true,
            message: '푸시 메시지가 발송되었습니다.'
        });
    } catch (error) {
        console.error('❌ Push notification error:', error.response.data);
        res.status(500).json({
            success: false,
            message: '푸시 메시지 발송 중 오류가 발생했습니다.',
            error: error.message
        });
    }
});

// Adobe Rich Template 푸시 메시지 발송
router.post('/sendAdobeRichPush', async (req, res) => {
    const richTemplateType = req.body.template_type;
    const token = req.body.token;
    console.log(`✅ richTemplateType: ${richTemplateType}, token: ${token}`);

    if (!richTemplateType || !token) {
        return res.status(400).json({
            success: false,
            message: 'richTemplateType과 token은 필수입니다.'
        });
    }

    const message = getPayloadByTemplateType(richTemplateType, token);
    console.log(`✅ message: ${JSON.stringify(message)}`);
    
    try {
        const response = await admin.messaging().send(message);
        return res.status(200).json({ success: true, response });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
    return res.status(200).json({ success: true, message });
});

// 푸시 메시지 테스트
router.post('/sendPushTest', async (req, res) => {
    const dataPayload = {
        title: '테스트 푸시',
        body: '테스트 푸시 메시지입니다.',
        image: 'https://1801889e95b1f9bf.kinxzone.com/webfile/product/9/9687/dqgh3ajf1vcv.jpg',
        icon: 'https://i.ibb.co/b5f834mq/adobe-2.png',
        action: 'https://www.google.com'
    };
    const token = 'fwRxDg4IRX6O-e4TwgBRZs:APA91bHZzwyKafSEmlz0iF3sREtcsdRfsXApURBdYwyOMy2pOpVkjuVSxo490sQ9TIufMiO9eyoV_1zSbBK83SEKO93kFu13VZTmVdRyzOhIQspHt2XF3Kc';
    // 요청 데이터 유효성 검사
    if (!token || !dataPayload || typeof dataPayload !== 'object') {
        return res.status(400).json({
        success: false,
        message: 'token과 data는 필수이며, data는 객체 형식이어야 합니다.',
        });
    }

    // 푸시 메시지 전송
    const result = await sendPushMessage(token, dataPayload);

    if (result.success) {
        return res.status(200).json({
        success: true,
        message: '푸시 메시지 전송 성공',
        response: result.response, // 메시지 ID 반환
        });
    } else {
        return res.status(500).json({
        success: false,
        message: '푸시 메시지 전송 실패',
        error: result.error,
        });
    }
});

const sendPushMessage = async (token, data) => {
    const message3 = {
        notification: {
            title: 'Sparky says hello!',
            body: 'Sparky says hello!',
        },
        data: {
            title: 'Sparky says hello!',
            body: 'Sparky says hello!',
            image: 'https://1801889e95b1f9bf.kinxzone.com/webfile/product/9/9687/dqgh3ajf1vcv.jpg',
            icon: 'https://i.ibb.co/b5f834mq/adobe-2.png',
            action: 'https://www.google.com'
        },
        token: token,
    }
    const message2 = {
        data: {
            title: 'Sparky says hello!',
            body: 'Sparky says hello!',
            image: 'https://1801889e95b1f9bf.kinxzone.com/webfile/product/9/9687/dqgh3ajf1vcv.jpg',
            icon: 'https://i.ibb.co/b5f834mq/adobe-2.png',
            action: 'https://www.google.com'
        },
        token: token,
    };
    const message = {
        data: data, // 클라이언트에서 받은 데이터 페이로드
        token: token, // 단일 디바이스 토큰
        android: {
            priority: 'high', // 안드로이드 우선순위 설정
        },
        apns: {
            headers: {
                'apns-priority': '10', // iOS 우선순위 설정
            },
        },
        // TTL(Time-to-Live) 설정은 webpush나 기타 옵션에서 가능하나 여기서는 생략
    };

    console.log(`✅ message: ${JSON.stringify(message3)}`);
    
    try {
        const response = await admin.messaging().send(message3);
        return { success: true, response };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

async function getAccessToken() {
    try {
        const accessToken = await admin.credential.applicationDefault().getAccessToken();
        return accessToken.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
}

module.exports = router;