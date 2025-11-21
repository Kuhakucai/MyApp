// pages/orderDetail/orderDetail.js
const util = require('../../utils/util')

Page({
  data: {
    order: {}
  },

  onLoad(options) {
    const orderNo = options.orderNo
    if (orderNo) {
      this.loadOrder(orderNo)
    }
  },

  // 加载预约详情
  loadOrder(orderNo) {
    const orders = util.getOrders()
    const order = orders.find(item => item.orderNo === orderNo)
    
    if (order) {
      this.setData({ order })
    } else {
      util.showToast('预约不存在')
      setTimeout(() => {
        wx.navigateBack()
      }, 2000)
    }
  },

  // 取消预约
  cancelOrder() {
    wx.showModal({
      title: '确认取消',
      content: '确定要取消这个预约吗？',
      success: (res) => {
        if (res.confirm) {
          // 更新订单状态
          const orders = util.getOrders()
          const index = orders.findIndex(item => item.orderNo === this.data.order.orderNo)
          
          if (index > -1) {
            orders[index].status = 'cancelled'
            orders[index].statusText = '已取消'
            wx.setStorageSync('orders', orders)
            
            this.setData({
              'order.status': 'cancelled',
              'order.statusText': '已取消'
            })
            
            util.showToast('预约已取消', 'success')
          }
        }
      }
    })
  }
})
