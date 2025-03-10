const richPushPayload = [
    {
        "template_type": "basic",
        "json_payload": {
            "message": {
                "token": "FCM_TOKEN",
                "android": {
                    "collapse_key": "new message"
                },    
                "data": {
                    "_mId": "msg-1234567890abcdef",
                    "_dId": "dv-1234567890abcdef",
                    "adb_version": "1",
                    "adb_template_type": "basic",
                    "adb_title": "game request",
                    "adb_body": "shall we play a game?",
                    "adb_sound": "bingBong",
                    "adb_small_icon": "ic_knight",
                    "adb_large_icon": "https://i.ibb.co/b5f834mq/adobe-2.png",
                    "adb_n_count": "1",
                    "adb_n_priority": "PRIORITY_LOW",
                    "adb_channel_id": "a3b80ef",
                    "adb_image": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png",
                    "adb_uri": "https://www.google.com",
                    "adb_a_type": "WEBURL",
                    "adb_act": "[{\"label\":\"accept\",\"uri\":\"https://chess.com/games/552\",\"type\":\"DEEPLINK\"{\"label\":\"decline\",\"uri\":\"\",\"type\":\"OPENAPP\"}]",
                    "adb_tag": "24",
                    "adb_sticky": "true",
                    "adb_ticker": "Play a game?",
                    "adb_body_ex": "Bob wants to play a game of chess with you. Click 'accept' to start!",
                    "adb_clr_body": "004C42",
                    "adb_clr_title": "AABBCC",
                    "adb_clr_icon": "123456",
                    "adb_clr_bg": "FFFFFF",
                    "adb_rem_txt": "Remind me",
                    "adb_rem_ts": "1703462400"
                }
            }
        }  
    },
    {
        "template_type": "carousel",
        "json_payload": {
            "message": {
                "token": "FCM_TOKEN",
                "android": {
                "collapse_key": "new message"
                },    
                "data": {
                    "_mId": "msg-1234567890abcdef",
                    "_dId": "dv-1234567890abcdef",
                    "adb_version": "1",
                    "adb_template_type": "car",
                    "adb_title": "Check out the new line of shoes!",
                    "adb_body": "Hot deals on new releases!",
                    "adb_sound": "sneakerSqueaker",
                    "adb_small_icon": "chat_bubble",
                    "adb_large_icon": "https://i.ibb.co/b5f834mq/adobe-2.png",
                    "adb_uri": "https://nike.com",
                    "adb_a_type": "WEBURL",
                    "adb_body_ex": "We have some new inventory we think you'll like.",
                    "adb_clr_body": "E32363",
                    "adb_clr_title": "0F6CC8",
                    "adb_clr_icon": "123456",
                    "adb_clr_bg": "FFFFFF",
                    "adb_car_mode": "auto",
                    "adb_car_layout": "default",
                    "adb_items": "[{\"img\":\"https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png\",\"txt\":\"Shoe 1 by Cool Sneaker Brand\",\"uri\":\"https://www.nike.com/u/custom-nike-dunk-high-by-you-shoes-10001378\"},{\"img\":\"https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/fca5f15c-162b-4737-bc42-21bd0933140a/NIKE+DUNK+HIGH+%28PS%29.png\",\"txt\":\"Shoe 2 by Lame Sneaker Brand\",\"uri\":\"https://www.nike.com/id/t/dunk-high-younger-shoes-hXXfpL\"},{\"img\":\"https://crepdogcrew.com/cdn/shop/products/NIKEDUNKHIGHBLACKWHITE.png?v=1740764699&width=2048\",\"txt\":\"Shoe 3 by Average Sneaker Brand\",\"uri\":\"https://crepdogcrew.com/products/nike-dunk-high-black-white-2021\"}]"
                }
            }
        }
    },
    {
        "template_type": "image",
        "json_payload": {
            "message": {
                "token": "FCM_TOKEN",
                "android": {
                    "collapse_key": "new message"
                },
                "data": {    
                    "_mId": "msg-1234567890abcdef",
                    "_dId": "dv-1234567890abcdef",
                    "adb_version": "1",
                    "adb_title": "Check out the new line of shoes!",
                    "adb_body": "Do you have any favorites?",
                    "adb_sound": "sneakerSqueaker",
                    "adb_image": "https://i.ibb.co/b5f834mq/adobe-2.png",
                    "adb_uri": "https://www.google.com",
                    "adb_icon": "ic_shoe",
                    "adb_a_type": "WEBURL",
                    "adb_template_type": "input",
                    "adb_body_ex": "What brands are you interested in?",
                    "adb_clr_body": "00EE00",
                    "adb_clr_title": "AABBCC",
                    "adb_clr_icon": "123456",
                    "adb_clr_bg": "000000",
                    "adb_input_txt": "Enter your favorite brands",
                    "adb_feedback_txt": "Thanks for helping us provide you with an experience more catered to your tastes!",
                    "adb_feedback_img": "https://i.ibb.co/b5f834mq/adobe-2.png",
                    "adb_input_receiver": "developer intent action name"
                }
            }
        }          
    },
    {
        "template_type": "multi_icon",
        "json_payload": {
            "message": {
                "token": "FCM_TOKEN",
                "android": {
                    "collapse_key": "new message"
                },
                "data": {    
                    "_mId": "msg-1234567890abcdef",
                    "_dId": "dv-1234567890abcdef",
                    "adb_version": "1",
                    "adb_title": "Check out the new line of shoes!",
                    "adb_body": "Do you have any favorites?",
                    "adb_sound": "sneakerSqueaker",
                    "adb_image": "https://sneakerland.com/products/shoe1/shoe1.png",
                    "adb_uri": "https://sneakerland.com/newReleases",
                    "adb_icon": "ic_shoe",
                    "adb_a_type": "WEBURL",
                    "adb_template_type": "input",
                    "adb_body_ex": "What brands are you interested in?",
                    "adb_clr_body": "00EE00",
                    "adb_clr_title": "AABBCC",
                    "adb_clr_icon": "123456",
                    "adb_clr_bg": "000000",
                    "adb_input_txt": "Enter your favorite brands",
                    "adb_feedback_txt": "Thanks for helping us provide you with an experience more catered to your tastes!",
                    "adb_feedback_img": "https://sneakerland.com/img/thanks.png",
                    "adb_input_receiver": "developer intent action name"
                }
            }
        }
    },
    {
        "template_type": "product_catalog",
        "json_payload": {
            "message": {
                "token": "FCM_TOKEN",
                "android": {
                    "collapse_key": "new message"
                },    
                "data": {    
                    "_mId": "msg-1234567890abcdef",
                    "_dId": "dv-1234567890abcdef",
                    "adb_version": "1",
                    "adb_title": "Buy some shoes",
                    "adb_body": "Click a shoe to learn more",
                    "adb_sound": "squeek",
                    "adb_uri": "https://sneakerland.com/products/shoe1",
                    "adb_a_type": "WEBURL",
                    "adb_icon": "ic_shoe",
                    "adb_n_count": "1",
                    "adb_n_priority": "PRIORITY_LOW",
                    "adb_template_type": "cat",
                    "adb_clr_body": "00EE00",
                    "adb_clr_title": "AABBCC",
                    "adb_clr_icon": "123456",
                    "adb_clr_bg": "000000",
                    "adb_display": "vertical",
                    "adb_cta_txt": "Buy Now",
                    "adb_cta_txt_clr": "00EE00",
                    "adb_cta_uri": "https://sneakerland.com/cart&addItem=shoe1",
                    "adb_items": "[{\"title\":\"Cool Shoe\",\"body\":\"Shoe 1 by Cool Sneaker Brand\",\"img\":\"https://sneakerland.com/products/shoe1/shoe1.png\",\"price\":\"49.97\",\"uri\":\"https://sneakerland.com/products/shoe1\"},{\"title\":\"Lame Shoe\",\"body\":\"Shoe 2 by Lame Sneaker Brand\",\"img\":\"https://sneakerland.com/products/shoe2/shoe2.png\",\"price\":\"99.99\",\"uri\":\"https://sneakerland.com/products/shoe2\"}]"
                }
            }
        }          
    },
    {
        "template_type": "rating",
        "json_payload": {
            "message": {
                "token": "FCM_TOKEN",
                "android": {
                    "collapse_key": "new message"
                },
                "data": {     
                    "_mId": "msg-1234567890abcdef",
                    "_dId": "dv-1234567890abcdef",
                    "adb_version": "1",
                    "adb_title": "Thanks for shopping with us!",
                    "adb_body": "Please take a moment to rate your recent purchase.",
                    "adb_sound": "chaChing",
                    "adb_image": "https://sneakerland.com/products/shoe1/shoe.png",
                    "adb_uri": "https://sneakerland.com/products/rating/shoe1",
                    "adb_a_type": "WEBURL",
                    "adb_icon": "ic_shoe",
                    "adb_n_count": "1",
                    "adb_n_priority": "PRIORITY_LOW",
                    "adb_template_type": "rate",
                    "adb_body_ex": "We hope you are enjoying your new shoes. Please click on a rating below to help us cater to your future footware needs!",
                    "adb_clr_body": "00EE00",
                    "adb_clr_title": "AABBCC",
                    "adb_clr_icon": "123456",
                    "adb_clr_bg": "000000",
                    "adb_rate_unselected_icon":"https://cdn-icons-png.freepik.com/256/1077/1077035.png?semt=ais_hybrid",
                    "adb_rate_selected_icon":"https://cdn-icons-png.freepik.com/256/833/833472.png?semt=ais_hybrid",
                    "adb_rate_act": "[{\"uri\":\"https://www.adobe.com\", \"type\":\"WEBURL\"}, {\"uri\":\"https://www.adobe.com\", \"type\":\"OPENAPP\"},{\"uri\":\"https://www.adobe.com\", \"type\":\"DISMISS\"},{\"uri\": \"https://www.adobe.com\", \"type\":\"WEBURL\"},{\"uri\":\"instabiz://opensecond\", \"type\":\"DEEPLINK\"}]"
                }
            }
        } 
    },
    {
        "template_type": "timer",
        "json_payload": {
            "message": {
                "token": "FCM_TOKEN",
                "android": {
                    "collapse_key": "new message"
                },
                "data": {     
                    "_mId": "msg-1234567890abcdef",
                    "_dId": "dv-1234567890abcdef",
                    "adb_version": "1",
                    "adb_title": "Limited time offer!",
                    "adb_title_alt": "You missed out on the sale.",
                    "adb_body": "Don't miss out on your chance for deep discounts.",
                    "adb_body_alt": "Our next flash sale will be sometime next month.",
                    "adb_sound": "chaChing",
                    "adb_icon": "ic_dollar",
                    "adb_n_count": "1",
                    "adb_n_priority": "PRIORITY_LOW",
                    "adb_image": "https://bigboxretailer.com/sale.png",
                    "adb_image_alt": "https://bigboxretailer.com/sale_ended.png",
                    "adb_uri": "https://bigboxretailer.com/sale",
                    "adb_a_type": "WEBURL",
                    "adb_template_type": "timer",
                    "adb_body_ex": "These discounts won't be around for long, click on the notification to go check out the sale.",
                    "adb_body_ex_alt": "Sorry you missed us this time. Check back next month for some deep discounts.",
                    "adb_clr_body": "00EE00",
                    "adb_clr_title": "AABBCC",
                    "adb_clr_icon": "123456",
                    "adb_clr_bg": "000000",
                    "adb_tmr_end": "1703462400",
                    "adb_clr_tmr": "FFFFFF"
                }
            }
        } 
    },
    {
        "template_type": "zero_bezel",
        "json_payload": {
            "message": {
                "token": "FCM_TOKEN",
                "android": {
                    "collapse_key": "new message"
                },
                "data": {     
                    "_mId": "msg-1234567890abcdef",
                    "_dId": "dv-1234567890abcdef",
                    "adb_version": "1",
                    "adb_title": "game request",
                    "adb_body": "shall we play a game?",               
                    "adb_sound": "bingBong",
                    "adb_icon": "ic_knight",
                    "adb_n_count": "1",
                    "adb_n_priority": "PRIORITY_LOW",
                    "adb_image": "https://pictureofchess.com/board.png",
                    "adb_uri": "https://chess.com/games",
                    "adb_a_type": "WEBURL",
                    "adb_template_type": "zb",
                    "adb_body_ex": "Bob wants to play a game of chess with you. Click the notification to accept!",
                    "adb_clr_body": "00EE00",
                    "adb_clr_title": "AABBCC",
                    "adb_clr_icon": "123456",
                    "adb_col_style": "img"
                }
            }
        } 
    }
]

/**
 * template_type에 해당하는 json_payload를 반환합니다.
 * @param {string} templateType - 'basic', 'carousel', 'image', 'multi_icon', 'product_catalog', 'rating', 'timer', 'zero_bezel' 중 하나
 * @returns {object|null} 해당하는 json_payload 또는 찾지 못한 경우 null
 */
function getPayloadByTemplateType(templateType, token) {
    const payload = richPushPayload.find(item => item.template_type === templateType);
    if (!payload) return null;
    
    // 깊은 복사로 원본 데이터 보존
    const message = JSON.parse(JSON.stringify(payload.json_payload.message));
    
    // token 값이 있을 때만 교체, 없으면 기본값 유지
    if (token) {
        message.token = token;
    }
    
    return message;
}

module.exports = {
    richPushPayload,
    getPayloadByTemplateType
};