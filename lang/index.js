import langEn from './en.js'
import langZh from './zh.js'
import Vue from 'vue'
import VueI18n from './vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: uni.getStorageSync("lang") || 'zh',
	messages: {  
			'en': langEn,
			'zh': langZh
		}
})
export default i18n