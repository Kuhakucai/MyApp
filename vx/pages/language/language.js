// pages/language/language.js
const i18n = require('../../utils/i18n')

Page({
  data: {
    currentLang: '',
    languages: []
  },

  onLoad() {
    this.loadLanguages()
    this.setNavigationTitle()
  },

  setNavigationTitle() {
    wx.setNavigationBarTitle({
      title: i18n.t('mine.language')
    })
  },

  // 加载语言列表
  loadLanguages() {
    const currentLang = i18n.getCurrentLanguage()
    const languages = i18n.getAvailableLanguages()
    
    this.setData({
      currentLang: currentLang,
      languages: languages
    })
  },

  // 选择语言
  selectLanguage(e) {
    const langCode = e.currentTarget.dataset.code
    
    if (langCode === this.data.currentLang) {
      return
    }
    
    // 设置新语言
    const success = i18n.setLanguage(langCode)
    
    if (success) {
      wx.showToast({
        title: i18n.t('language.changeSuccess'),
        icon: 'success',
        duration: 1500,
        success: () => {
          setTimeout(() => {
            // 返回上一页并刷新
            wx.navigateBack({
              success: () => {
                // 触发页面刷新
                const pages = getCurrentPages()
                if (pages.length > 0) {
                  const prevPage = pages[pages.length - 1]
                  if (prevPage && prevPage.onLoad) {
                    prevPage.onLoad()
                  }
                }
              }
            })
          }, 1500)
        }
      })
    } else {
      wx.showToast({
        title: i18n.t('language.changeFailed'),
        icon: 'none'
      })
    }
  }
})
