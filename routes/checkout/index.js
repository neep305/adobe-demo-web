const express = require('express');
const router = express.Router();

// 주문 상품 데이터
const orderItems = [
    {
        id: 'HDPH-001',
        name: 'Premium Headphones',
        color: 'Black',
        price: 299000,
        quantity: 2,
        imageUrl: 'https://1801889e95b1f9bf.kinxzone.com/webfile/product/9/9687/dqgh3ajf1vcv.jpg'
    },
    {
        id: 'HDPH-002',
        name: 'Wireless Earbuds',
        color: 'Pink',
        price: 199000,
        quantity: 1,
        imageUrl: 'https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/beats-fit-pro/pdp/product-carousel/stone-purple/pc-fit-pro-stone-purple-case-closed-floating.jpg.large.2x.jpg'
    }
];

const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
const shipping = 3000;
const discount = 50000;
const total = subtotal + shipping - discount;

// orderItem과 총주문금액을 모델에 저장
const orderModel = {
    orderItems: orderItems,
    subtotal: subtotal,
    shipping: shipping,
    discount: discount,
    total: total
};

router.get('/', (req, res) => {
    res.render('checkout/index', {
        title: 'Checkout',
        pageName: 'Checkout',
        pageDescription: 'Checkout page',
        edgeConfigId: process.env.EDGE_CONFIG_ID,
        orgId: process.env.ORG_ID,
        orderModel: orderModel
    });
});

router.get('/order_complete', (req, res) => {
    res.render('checkout/completePurchase', {
        title: 'Order Complete',
        pageName: 'Order Complete',
        pageDescription: 'Order Complete page',
        edgeConfigId: process.env.EDGE_CONFIG_ID,
        orgId: process.env.ORG_ID,
    });
});
module.exports = router;