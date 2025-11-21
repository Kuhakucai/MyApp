// pages/order/order.js
const util = require('../../utils/util')
const i18n = require('../../utils/i18n')

Page({
  data: {
    orders: [],
    i18n: {}
  },

  onLoad() {
    this.loadI18n()
    this.setNavigationTitle()
  },

  onShow() {
    this.loadI18n()
    this.loadOrders()
    this.setNavigationTitle()
  },

  loadI18n() {
    const currentLang = i18n.getCurrentLanguage()
    this.setData({
      i18n: i18n.languages[currentLang]
    })
  },

  setNavigationTitle() {
    wx.setNavigationBarTitle({
      title: i18n.t('tabBar.order')
    })
  },

  // 加载订单列表
  loadOrders() {
    const orders = util.getOrders()
    this.setData({ orders })
  },

  // 查看订单详情
  goToDetail(e) {
    const orderNo = e.currentTarget.dataset.orderno
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?orderNo=${orderNo}`
    })
  },

  // 去点餐
  goToMenu() {
    wx.switchTab({
      url: '/pages/menu/menu'
    })
  }
})
