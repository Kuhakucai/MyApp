// pages/cart/cart.js
const util = require('../../utils/util')
const i18n = require('../../utils/i18n')

Page({
  data: {
    cartItems: [],
    subtotal: 0,
    discount: 0,
    total: 0,
    totalQuantity: 0,
    i18n: {}
  },

  onLoad() {
    this.loadI18n()
    this.setNavigationTitle()
  },

  onShow() {
    this.loadI18n()
    this.loadCart()
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
      title: i18n.t('tabBar.cart')
    })
  },

  // 加载购物车
  loadCart() {
    const cart = util.getCart()
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    // 计算优惠（示例：满50减5，满100减15）
    let discount = 0
    if (subtotal >= 100) {
      discount = 15
    } else if (subtotal >= 50) {
      discount = 5
    }
    
    const total = subtotal - discount
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
    
    this.setData({
      cartItems: cart,
      subtotal,
      discount,
      total,
      totalQuantity
    })
  },

  // 减少数量
  decreaseQuantity(e) {
    const id = e.currentTarget.dataset.id
    const item = this.data.cartItems.find(item => item.id === id)
    
    if (item.quantity > 1) {
      util.updateCartQuantity(id, item.quantity - 1)
      this.loadCart()
    } else {
      // 删除服务
      wx.showModal({
        title: '提示',
        content: '确定要删除这项服务吗？',
        success: (res) => {
          if (res.confirm) {
            util.updateCartQuantity(id, 0)
            this.loadCart()
            util.showToast('已删除', 'success')
          }
        }
      })
    }
  },

  // 增加数量
  increaseQuantity(e) {
    const id = e.currentTarget.dataset.id
    const item = this.data.cartItems.find(item => item.id === id)
    util.updateCartQuantity(id, item.quantity + 1)
    this.loadCart()
  },

  // 结算
  checkout() {
    if (this.data.cartItems.length === 0) {
      util.showToast('还未选择服务')
      return
    }

    // 生成订单
    const order = {
      orderNo: util.generateOrderNo(),
      items: this.data.cartItems,
      subtotal: this.data.subtotal,
      discount: this.data.discount,
      total: this.data.total,
      status: 'pending', // pending: 待处理, preparing: 服务中, completed: 已完成, cancelled: 已取消
      statusText: '待处理',
      createTime: util.formatTime(new Date())
    }

    // 保存订单
    util.saveOrder(order)
    
    // 清空购物车
    util.clearCart()
    
    // 显示成功提示
    wx.showToast({
      title: '预约成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          // 跳转到预约详情
          wx.redirectTo({
            url: `/pages/orderDetail/orderDetail?orderNo=${order.orderNo}`
          })
        }, 2000)
      }
    })
  },

  // 去选款
  goToMenu() {
    wx.switchTab({
      url: '/pages/menu/menu'
    })
  }
})
