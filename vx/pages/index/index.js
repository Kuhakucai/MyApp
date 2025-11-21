// pages/index/index.js
const util = require('../../utils/util')
const i18n = require('../../utils/i18n')
const { products } = require('../../data/products')
const { productsTranslations } = require('../../data/products-i18n')

Page({
  data: {
    banners: [
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&h=400&fit=crop'
    ],
    shopInfo: {},
    hotProducts: [],
    cartCount: 0,
    i18n: {}
  },

  onLoad() {
    this.loadI18n()
    this.loadProducts()
    this.setNavigationTitle()
  },

  onShow() {
    this.loadI18n()
    this.loadProducts()
    this.updateCartCount()
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
      title: i18n.t('tabBar.index')
    })
  },

  loadProducts() {
    const currentLang = i18n.getCurrentLanguage()
    const hotProducts = products.filter(item => item.hot).slice(0, 4).map(product => {
      const translation = productsTranslations[product.id]
      if (translation) {
        return {
          ...product,
          name: translation.name[currentLang] || product.name,
          desc: translation.desc[currentLang] || product.desc
        }
      }
      return product
    })
    
    this.setData({ hotProducts })
  },

  updateCartCount() {
    const count = util.getCartCount()
    this.setData({ cartCount: count })
  },

  goToMenu() {
    wx.switchTab({
      url: '/pages/menu/menu'
    })
  },

  goToCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  goToOrder() {
    wx.switchTab({
      url: '/pages/order/order'
    })
  },

  showContact() {
    const phone = i18n.t('shop.phone')
    const content = i18n.t('index.contactContent', { phone: phone })
    
    wx.showModal({
      title: i18n.t('index.contactTitle'),
      content: content,
      showCancel: false,
      confirmText: i18n.t('index.contactConfirm')
    })
  }
})
