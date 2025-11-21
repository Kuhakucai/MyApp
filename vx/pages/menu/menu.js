// pages/menu/menu.js
const util = require('../../utils/util')
const i18n = require('../../utils/i18n')
const { categories, products } = require('../../data/products')
const { categoriesTranslations, productsTranslations } = require('../../data/products-i18n')

Page({
  data: {
    categories: [],
    products: [],
    activeCategory: 1,
    scrollIntoView: '',
    cartCount: 0,
    cartTotal: 0,
    showModal: false,
    selectedProduct: {},
    i18n: {}
  },

  onLoad() {
    this.loadI18n()
    this.loadCategories()
    this.loadProducts()
    this.updateCartInfo()
    this.setNavigationTitle()
  },

  onShow() {
    this.loadI18n()
    this.loadCategories()
    this.loadProducts()
    this.updateCartInfo()
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
      title: i18n.t('tabBar.menu')
    })
  },

  loadCategories() {
    const currentLang = i18n.getCurrentLanguage()
    const translatedCategories = categories.map(category => {
      const translation = categoriesTranslations[category.id]
      if (translation) {
        return {
          ...category,
          name: translation.name[currentLang] || category.name
        }
      }
      return category
    })
    
    this.setData({ categories: translatedCategories })
  },

  loadProducts() {
    const currentLang = i18n.getCurrentLanguage()
    const translatedProducts = products.map(product => {
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
    
    this.setData({ products: translatedProducts })
  },

  // 获取分类下的商品
  getCategoryProducts(categoryId) {
    return this.data.products.filter(item => item.category === categoryId)
  },

  // 选择分类
  selectCategory(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      activeCategory: id,
      scrollIntoView: `category-${id}`
    })
  },

  // 显示商品详情
  showProductDetail(e) {
    const product = e.currentTarget.dataset.product
    this.setData({
      selectedProduct: product,
      showModal: true
    })
  },

  // 隐藏详情弹窗
  hideModal() {
    this.setData({
      showModal: false
    })
  },

  // 阻止冒泡
  stopPropagation() {},

  // 添加到购物车
  addToCart(e) {
    const product = e.currentTarget.dataset.product
    util.addToCart(product)
    this.updateCartInfo()
  },

  // 从详情弹窗添加到购物车
  addToCartFromModal() {
    util.addToCart(this.data.selectedProduct)
    this.updateCartInfo()
    this.hideModal()
  },

  // 更新购物车信息
  updateCartInfo() {
    const count = util.getCartCount()
    const total = util.getCartTotal()
    this.setData({
      cartCount: count,
      cartTotal: total
    })
  },

  // 去购物车
  goToCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  }
})
