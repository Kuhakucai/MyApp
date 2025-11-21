// pages/mine/mine.js
const util = require('../../utils/util')
const i18n = require('../../utils/i18n')

Page({
  data: {
    orderStats: {
      pending: 0,
      preparing: 0,
      completed: 0
    },
    couponCount: 3,
    i18n: {},
    currentLanguageName: ''
  },

  onLoad() {
    this.loadI18n()
    this.loadOrderStats()
    this.setNavigationTitle()
  },

  onShow() {
    this.loadI18n()
    this.loadOrderStats()
    this.setNavigationTitle()
  },

  setNavigationTitle() {
    wx.setNavigationBarTitle({
      title: i18n.t('tabBar.mine')
    })
  },

  // 加载国际化
  loadI18n() {
    const currentLang = i18n.getCurrentLanguage()
    const languages = i18n.getAvailableLanguages()
    const currentLangObj = languages.find(lang => lang.code === currentLang)
    
    this.setData({
      i18n: i18n.languages[currentLang],
      currentLanguageName: currentLangObj ? currentLangObj.nativeName : '简体中文'
    })
  },

  // 加载订单统计
  loadOrderStats() {
    const orders = util.getOrders()
    const stats = {
      pending: orders.filter(item => item.status === 'pending').length,
      preparing: orders.filter(item => item.status === 'preparing').length,
      completed: orders.filter(item => item.status === 'completed').length
    }
    this.setData({ orderStats: stats })
  },

  // 查看订单
  goToOrders() {
    wx.switchTab({
      url: '/pages/order/order'
    })
  },

  // 显示优惠券
  showCoupon() {
    wx.showModal({
      title: i18n.t('mine.myCoupon'),
      content: i18n.t('mine.couponTip'),
      showCancel: false
    })
  },

  // 显示收藏
  showAddress() {
    wx.showModal({
      title: i18n.t('mine.myFavorite'),
      content: i18n.t('mine.favoriteTip'),
      showCancel: false
    })
  },

  // 显示门店信息
  showShopInfo() {
    const shopName = i18n.t('shop.name')
    const address = i18n.t('shop.address')
    const openTime = i18n.t('shop.openTime')
    const phone = i18n.t('shop.phone')
    
    wx.showModal({
      title: shopName,
      content: `${address}\n${openTime}\n${phone}`,
      showCancel: false
    })
  },

  // 联系客服
  showContact() {
    const phone = i18n.t('shop.phone')
    const openTime = i18n.t('shop.openTime')
    const content = i18n.t('mine.contactContent', {
      phone: phone,
      time: openTime
    })
    
    wx.showModal({
      title: i18n.t('mine.contact'),
      content: content,
      showCancel: false
    })
  },

  // 关于我们
  showAbout() {
    wx.showModal({
      title: i18n.t('mine.about'),
      content: i18n.t('mine.aboutContent'),
      showCancel: false
    })
  },

  // 去语言设置
  goToLanguage() {
    wx.navigateTo({
      url: '/pages/language/language'
    })
  }
})
