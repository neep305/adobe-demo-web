const express = require('express');
const router = express.Router();

// 상품 정보 데이터
const productData = {
    id: 'HDPH-001',
    name: 'Premium Headphones',
    price: 299000,
    description: '고품질 사운드와 노이즈 캔슬링 기능을 갖춘 프리미엄 헤드폰입니다.',
    imageUrl: 'https://1801889e95b1f9bf.kinxzone.com/webfile/product/9/9687/dqgh3ajf1vcv.jpg',
    options: {
        colors: [
            { value: 'black', label: 'Black' },
            { value: 'white', label: 'White' },
            { value: 'blue', label: 'Blue' }
        ]
    }
};

router.get('/', function(req, res, next) {
    res.render('product/index', {
        title: 'Product Detail',
        product: productData,
        edgeConfigId: process.env.EDGE_CONFIG_ID,
        orgId: process.env.ORG_ID
    });
});

module.exports = router; 