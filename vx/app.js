// app.js
App({
  onLaunch() {
    // 初始化购物车数据
    if (!wx.getStorageSync('cart')) {
      wx.setStorageSync('cart', [])
    }
    // 初始化订单数据
    if (!wx.getStorageSync('orders')) {
      wx.setStorageSync('orders', [])
    }
    console.log('小程序启动')
  },

  globalData: {
    userInfo: null,
    shopInfo: {
      name: '小玉艺术美甲店',
      address: '深圳市龙岗区南联',
      phone: '400-888-6688',
      openTime: '10:00-22:00'
    }
  }
})
