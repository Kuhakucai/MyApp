// 国际化语言配置
const languages = {
  // 中文
  'zh-CN': {
    code: 'zh-CN',
    name: '简体中文',
    nativeName: '简体中文',
    
    // 通用
    common: {
      confirm: '确定',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      back: '返回',
      loading: '加载中...',
      success: '成功',
      failed: '失败',
      tip: '提示'
    },
    
    // 底部导航
    tabBar: {
      home: '首页',
      menu: '选款',
      cart: '已选',
      order: '预约',
      mine: '我的'
    },
    
    // 首页
    index: {
      title: '小玉艺术美甲',
      shopInfo: '门店信息',
      hotProducts: '热门款式',
      viewMore: '查看更多',
      sales: '销量',
      openStatus: '营业中',
      quickNav: {
        menu: '选款',
        order: '预约',
        cart: '购物车',
        contact: '客服'
      },
      activity: {
        title: '优惠活动',
        discount: '满减',
        sale: '折扣',
        gift: '赠品',
        discount1: '满50减10，满100减25',
        discount2: '新用户首单9折优惠',
        discount3: '消费满80送饮料一杯'
      },
      contactTitle: '联系客服',
      contactContent: '客服电话：{phone}',
      contactConfirm: '我知道了'
    },
    
    // 选款页
    menu: {
      title: '选款',
      addCart: '加购',
      addToCart: '加入购物车',
      checkout: '去预约',
      hot: '热门',
      duration: '服务时长'
    },
    
    // 购物车/已选服务
    cart: {
      title: '已选服务',
      empty: '还未选择服务',
      goShopping: '去选款',
      subtotal: '服务小计',
      discount: '优惠减免',
      total: '合计',
      submit: '提交预约',
      deleteConfirm: '确定要删除这项服务吗？',
      items: '项'
    },
    
    // 订单/预约
    order: {
      title: '我的预约',
      orderNo: '预约单号',
      empty: '暂无预约',
      goShopping: '去选款',
      status: {
        pending: '待处理',
        preparing: '服务中',
        completed: '已完成',
        cancelled: '已取消'
      },
      detail: {
        title: '预约详情',
        info: '预约信息',
        time: '预约时间',
        services: '服务清单',
        cost: '费用明细',
        paid: '实付金额',
        cancel: '取消预约',
        cancelConfirm: '确定要取消这个预约吗？',
        statusDesc: {
          pending: '预约已提交，请稍候',
          preparing: '美甲师正在为您服务',
          completed: '服务已完成，期待再次光临',
          cancelled: '预约已取消'
        }
      }
    },
    
    // 个人中心
    mine: {
      title: '我的',
      userName: '美甲达人',
      userDesc: '小玉艺术美甲店会员',
      myOrder: '我的预约',
      myCoupon: '优惠券',
      myFavorite: '我的收藏',
      shopInfo: '门店信息',
      contact: '联系客服',
      about: '关于我们',
      language: '语言设置',
      version: '小玉艺术美甲小程序 v1.0.0',
      couponTip: '优惠券功能开发中，敬请期待！',
      favoriteTip: '收藏功能开发中，敬请期待！',
      aboutContent: '小玉艺术美甲店\n专业美甲服务，品质保障\n让每一个指尖都绽放光彩！',
      contactContent: '客服电话：{phone}\n工作时间：{time}'
    },
    
    // 语言设置
    language: {
      title: '语言设置',
      current: '当前语言',
      select: '选择语言',
      changeSuccess: '语言切换成功',
      changeFailed: '语言切换失败'
    },
    
    // 店铺信息
    shop: {
      name: '小玉艺术美甲店',
      address: '深圳市龙岗区南联',
      phone: '400-888-6688',
      openTime: '10:00-22:00'
    },
    
    // 提示信息
    toast: {
      addCartSuccess: '已加入购物车',
      bookingSuccess: '预约成功',
      cancelSuccess: '预约已取消',
      deleteSuccess: '已删除',
      networkError: '网络错误，请重试',
      notExist: '预约不存在'
    }
  },
  
  // English
  'en-US': {
    code: 'en-US',
    name: 'English',
    nativeName: 'English',
    
    common: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      loading: 'Loading...',
      success: 'Success',
      failed: 'Failed',
      tip: 'Tip'
    },
    
    tabBar: {
      home: 'Home',
      menu: 'Menu',
      cart: 'Cart',
      order: 'Booking',
      mine: 'Mine'
    },
    
    index: {
      title: 'Xiaoyu Nail Art',
      shopInfo: 'Shop Info',
      hotProducts: 'Hot Items',
      viewMore: 'View More',
      sales: 'Sales',
      openStatus: 'Open',
      quickNav: {
        menu: 'Menu',
        order: 'Booking',
        cart: 'Cart',
        contact: 'Contact'
      },
      activity: {
        title: 'Promotions',
        discount: 'Discount',
        sale: 'Sale',
        gift: 'Gift',
        discount1: '¥10 off over ¥50, ¥25 off over ¥100',
        discount2: '10% off for new customers',
        discount3: 'Free drink for orders over ¥80'
      },
      contactTitle: 'Contact Us',
      contactContent: 'Phone: {phone}',
      contactConfirm: 'Got it'
    },
    
    menu: {
      title: 'Menu',
      addCart: 'Add',
      addToCart: 'Add to Cart',
      checkout: 'Book Now',
      hot: 'Hot',
      duration: 'Duration'
    },
    
    cart: {
      title: 'Selected',
      empty: 'No services selected',
      goShopping: 'Go Shopping',
      subtotal: 'Subtotal',
      discount: 'Discount',
      total: 'Total',
      submit: 'Book Now',
      deleteConfirm: 'Remove this service?',
      items: 'items'
    },
    
    order: {
      title: 'My Bookings',
      orderNo: 'Booking No.',
      empty: 'No bookings yet',
      goShopping: 'Go Shopping',
      status: {
        pending: 'Pending',
        preparing: 'In Service',
        completed: 'Completed',
        cancelled: 'Cancelled'
      },
      detail: {
        title: 'Booking Detail',
        info: 'Booking Info',
        time: 'Booking Time',
        services: 'Services',
        cost: 'Cost Details',
        paid: 'Total Paid',
        cancel: 'Cancel Booking',
        cancelConfirm: 'Cancel this booking?',
        statusDesc: {
          pending: 'Booking submitted, please wait',
          preparing: 'Nail artist is serving you',
          completed: 'Service completed, see you again',
          cancelled: 'Booking cancelled'
        }
      }
    },
    
    mine: {
      title: 'Mine',
      userName: 'Nail Lover',
      userDesc: 'Xiaoyu Nail Art Member',
      myOrder: 'My Bookings',
      myCoupon: 'Coupons',
      myFavorite: 'Favorites',
      shopInfo: 'Shop Info',
      contact: 'Contact',
      about: 'About Us',
      language: 'Language',
      version: 'Xiaoyu Nail Art v1.0.0',
      couponTip: 'Coupon feature coming soon!',
      favoriteTip: 'Favorite feature coming soon!',
      aboutContent: 'Xiaoyu Nail Art\nProfessional nail service\nMake your fingertips shine!',
      contactContent: 'Phone: {phone}\nWorking Hours: {time}'
    },
    
    language: {
      title: 'Language',
      current: 'Current Language',
      select: 'Select Language',
      changeSuccess: 'Language changed',
      changeFailed: 'Change failed'
    },
    
    shop: {
      name: 'Xiaoyu Nail Art',
      address: 'Nanlian, Longgang District, Shenzhen',
      phone: '400-888-6688',
      openTime: '10:00-22:00'
    },
    
    toast: {
      addCartSuccess: 'Added to cart',
      bookingSuccess: 'Booking successful',
      cancelSuccess: 'Booking cancelled',
      deleteSuccess: 'Deleted',
      networkError: 'Network error',
      notExist: 'Booking not found'
    }
  },
  
  // Bahasa Indonesia
  'id-ID': {
    code: 'id-ID',
    name: 'Bahasa Indonesia',
    nativeName: 'Bahasa Indonesia',
    
    common: {
      confirm: 'Konfirmasi',
      cancel: 'Batal',
      save: 'Simpan',
      delete: 'Hapus',
      edit: 'Edit',
      back: 'Kembali',
      loading: 'Memuat...',
      success: 'Berhasil',
      failed: 'Gagal',
      tip: 'Tips'
    },
    
    tabBar: {
      home: 'Beranda',
      menu: 'Menu',
      cart: 'Keranjang',
      order: 'Pesanan',
      mine: 'Saya'
    },
    
    index: {
      title: 'Xiaoyu Nail Art',
      shopInfo: 'Info Toko',
      hotProducts: 'Populer',
      viewMore: 'Lihat Lebih Banyak',
      sales: 'Terjual',
      openStatus: 'Buka',
      quickNav: {
        menu: 'Menu',
        order: 'Pesanan',
        cart: 'Keranjang',
        contact: 'Hubungi'
      },
      activity: {
        title: 'Promosi',
        discount: 'Diskon',
        sale: 'Sale',
        gift: 'Hadiah',
        discount1: 'Diskon ¥10 untuk ¥50, ¥25 untuk ¥100',
        discount2: 'Diskon 10% untuk pelanggan baru',
        discount3: 'Minuman gratis untuk pembelian di atas ¥80'
      },
      contactTitle: 'Hubungi Kami',
      contactContent: 'Telepon: {phone}',
      contactConfirm: 'Mengerti'
    },
    
    menu: {
      title: 'Menu',
      addCart: 'Tambah',
      addToCart: 'Tambah ke Keranjang',
      checkout: 'Pesan Sekarang',
      hot: 'Populer',
      duration: 'Durasi'
    },
    
    cart: {
      title: 'Terpilih',
      empty: 'Belum ada layanan dipilih',
      goShopping: 'Belanja',
      subtotal: 'Subtotal',
      discount: 'Diskon',
      total: 'Total',
      submit: 'Pesan Sekarang',
      deleteConfirm: 'Hapus layanan ini?',
      items: 'item'
    },
    
    order: {
      title: 'Pesanan Saya',
      orderNo: 'No. Pesanan',
      empty: 'Belum ada pesanan',
      goShopping: 'Belanja',
      status: {
        pending: 'Menunggu',
        preparing: 'Dalam Layanan',
        completed: 'Selesai',
        cancelled: 'Dibatalkan'
      },
      detail: {
        title: 'Detail Pesanan',
        info: 'Info Pesanan',
        time: 'Waktu Pesanan',
        services: 'Layanan',
        cost: 'Rincian Biaya',
        paid: 'Total Bayar',
        cancel: 'Batalkan Pesanan',
        cancelConfirm: 'Batalkan pesanan ini?',
        statusDesc: {
          pending: 'Pesanan diterima, mohon tunggu',
          preparing: 'Nail artist sedang melayani Anda',
          completed: 'Layanan selesai, sampai jumpa lagi',
          cancelled: 'Pesanan dibatalkan'
        }
      }
    },
    
    mine: {
      title: 'Saya',
      userName: 'Pecinta Nail Art',
      userDesc: 'Member Xiaoyu Nail Art',
      myOrder: 'Pesanan Saya',
      myCoupon: 'Kupon',
      myFavorite: 'Favorit',
      shopInfo: 'Info Toko',
      contact: 'Hubungi',
      about: 'Tentang Kami',
      language: 'Bahasa',
      version: 'Xiaoyu Nail Art v1.0.0',
      couponTip: 'Fitur kupon segera hadir!',
      favoriteTip: 'Fitur favorit segera hadir!',
      aboutContent: 'Xiaoyu Nail Art\nLayanan nail art profesional\nBuat jari Anda bersinar!',
      contactContent: 'Telepon: {phone}\nJam Kerja: {time}'
    },
    
    language: {
      title: 'Pengaturan Bahasa',
      current: 'Bahasa Saat Ini',
      select: 'Pilih Bahasa',
      changeSuccess: 'Bahasa berhasil diubah',
      changeFailed: 'Gagal mengubah bahasa'
    },
    
    shop: {
      name: 'Xiaoyu Nail Art',
      address: 'Nanlian, Distrik Longgang, Shenzhen',
      phone: '400-888-6688',
      openTime: '10:00-22:00'
    },
    
    toast: {
      addCartSuccess: 'Ditambahkan ke keranjang',
      bookingSuccess: 'Pesanan berhasil',
      cancelSuccess: 'Pesanan dibatalkan',
      deleteSuccess: 'Dihapus',
      networkError: 'Kesalahan jaringan',
      notExist: 'Pesanan tidak ditemukan'
    }
  }
}

// 获取当前语言
function getCurrentLanguage() {
  const saved = wx.getStorageSync('language')
  if (saved && languages[saved]) {
    return saved
  }
  
  // 尝试使用系统语言
  const systemInfo = wx.getSystemInfoSync()
  const systemLang = systemInfo.language
  
  if (systemLang.startsWith('zh')) {
    return 'zh-CN'
  } else if (systemLang.startsWith('id')) {
    return 'id-ID'
  } else {
    return 'en-US'
  }
}

// 设置语言
function setLanguage(langCode) {
  if (languages[langCode]) {
    wx.setStorageSync('language', langCode)
    return true
  }
  return false
}

// 获取翻译文本
function t(key, params = {}) {
  const langCode = getCurrentLanguage()
  const lang = languages[langCode] || languages['zh-CN']
  
  // 支持嵌套的key，如 'menu.title'
  const keys = key.split('.')
  let value = lang
  
  for (let k of keys) {
    if (value && typeof value === 'object') {
      value = value[k]
    } else {
      return key // 如果找不到，返回key本身
    }
  }
  
  // 替换参数
  if (typeof value === 'string' && Object.keys(params).length > 0) {
    Object.keys(params).forEach(paramKey => {
      value = value.replace(`{${paramKey}}`, params[paramKey])
    })
  }
  
  return value || key
}

// 获取商品的多语言文本
function getProductText(product, field) {
  const langCode = getCurrentLanguage()
  
  // 如果商品有多语言字段
  if (product[field] && typeof product[field] === 'object') {
    return product[field][langCode] || product[field]['zh-CN'] || ''
  }
  
  // 否则返回原始字段
  return product[field] || ''
}

// 获取所有可用语言
function getAvailableLanguages() {
  return Object.values(languages).map(lang => ({
    code: lang.code,
    name: lang.name,
    nativeName: lang.nativeName
  }))
}

module.exports = {
  languages,
  getCurrentLanguage,
  setLanguage,
  t,
  getProductText,
  getAvailableLanguages
}
