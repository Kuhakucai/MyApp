// 工具函数

/**
 * 格式化时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 生成订单号
 */
const generateOrderNo = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = formatNumber(now.getMonth() + 1)
  const day = formatNumber(now.getDate())
  const hour = formatNumber(now.getHours())
  const minute = formatNumber(now.getMinutes())
  const second = formatNumber(now.getSeconds())
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  
  return `${year}${month}${day}${hour}${minute}${second}${random}`
}

/**
 * 显示Toast提示
 */
const showToast = (title, icon = 'none') => {
  wx.showToast({
    title,
    icon,
    duration: 2000
  })
}

/**
 * 显示Loading
 */
const showLoading = (title = '加载中...') => {
  wx.showLoading({
    title,
    mask: true
  })
}

/**
 * 隐藏Loading
 */
const hideLoading = () => {
  wx.hideLoading()
}

/**
 * 获取购物车数据
 */
const getCart = () => {
  return wx.getStorageSync('cart') || []
}

/**
 * 保存购物车数据
 */
const saveCart = (cart) => {
  wx.setStorageSync('cart', cart)
}

/**
 * 添加商品到购物车
 */
const addToCart = (product) => {
  let cart = getCart()
  const existIndex = cart.findIndex(item => item.id === product.id)
  
  if (existIndex > -1) {
    cart[existIndex].quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1
    })
  }
  
  saveCart(cart)
  showToast('已添加到购物车', 'success')
  
  return cart
}

/**
 * 更新购物车商品数量
 */
const updateCartQuantity = (productId, quantity) => {
  let cart = getCart()
  const index = cart.findIndex(item => item.id === productId)
  
  if (index > -1) {
    if (quantity <= 0) {
      cart.splice(index, 1)
    } else {
      cart[index].quantity = quantity
    }
    saveCart(cart)
  }
  
  return cart
}

/**
 * 清空购物车
 */
const clearCart = () => {
  saveCart([])
}

/**
 * 计算购物车总价
 */
const getCartTotal = () => {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

/**
 * 获取购物车商品总数
 */
const getCartCount = () => {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}

/**
 * 获取订单列表
 */
const getOrders = () => {
  return wx.getStorageSync('orders') || []
}

/**
 * 保存订单
 */
const saveOrder = (order) => {
  let orders = getOrders()
  orders.unshift(order)
  wx.setStorageSync('orders', orders)
  return order
}

module.exports = {
  formatTime,
  formatNumber,
  generateOrderNo,
  showToast,
  showLoading,
  hideLoading,
  getCart,
  saveCart,
  addToCart,
  updateCartQuantity,
  clearCart,
  getCartTotal,
  getCartCount,
  getOrders,
  saveOrder
}
