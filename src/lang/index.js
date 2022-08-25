import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'




Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en or zh
  //locale: Cookies.get('language') || 'en',
  locale: Cookies.get('language') || 'zh',//默认中文
  // set locale messages
  messages,
  silentTranslationWarn: true, //去掉vue-i18n警告
})

Element.i18n((key, value) => i18n.t(key, value))

export default i18n
