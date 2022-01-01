import Vue from "vue"
Vue.config.productionTip = false

import cuCustom from "./colorui/components/cu-custom.vue"
Vue.component("cu-custom", cuCustom)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import i18n from './lang/index'
Vue.prototype._i18n = i18n

import moment from 'moment'
Vue.prototype.zmoment = moment;

Vue.prototype.langSwitch = function() {
	var langCur = uni.getStorageSync("lang") == "en" ? "zh" : "en";
	i18n.locale = langCur;
	uni.setStorageSync("lang", langCur);
}

Vue.prototype.toast = function(title) {
	uni.showToast({
		icon: "none",
		position: "bottom",
		title: title,
		duration: 2000,
	});

	return false;
}

Vue.prototype.hiddenAddress = function(address) {
	if (address) {
		if (address.length > 6) {
			return address.substr(0, 6) + "..." + address.substr(address.length - 4, address.length);
		} else {
			return address.substr(0, 6) + "...";
		}
	} else {
		return "";
	}
}

Vue.prototype.hiddenAddress2 = function(address) {
	if (address) {
		return "..." + address.substr(address.length / 2 - 2, 4) + "...";
	} else {
		return "";
	}
}

Vue.prototype.toastTime = function(title, time) {
	uni.showToast({
		icon: "none",
		position: "bottom",
		title: title,
		duration: 1000 * time,
	});

	return false;
}

Vue.prototype.confirm = function(title, content, showCancel) {
	uni.showModal({
	    title: title==''?'提示框':'title',
	    content: content,
		showCancel: showCancel,
	    success: function (res) {
	        if (res.confirm) {
	            console.log('用户点击确定');
	        } else if (res.cancel) {
	            console.log('用户点击取消');
	        }
	    }
	});

	return false;
}

Vue.prototype.storage = function(key, data) {
	if (data != undefined) {
		uni.setStorageSync(key, data);
	} else {
		return uni.getStorageSync(key);
	}
}

Vue.prototype.goto = function(path, url, title) {
	if (url) {
		uni.navigateTo({
			url: path + "?url=" + encodeURIComponent(url) + (title ? "&title=" + title : "")
		});
	} else {
		uni.navigateTo({
			url: path
		});
	}
}

Vue.prototype.gotoBack = function() {
	uni.navigateBack({
		delta: 1
	});
}

Vue.prototype.gotoLaunch = function(url) {
	uni.reLaunch({
		url: url
	});
}

Vue.prototype.gotoLink = function(url) {
	// #ifndef H5
	plus.runtime.openURL(url)
	// #endif
	// #ifdef H5
	window.location.href = url;
	// #endif
}

Vue.prototype.copy = function(text) {
	// #ifndef H5
	uni.setClipboardData({
		data: text,
		success: function() {
			uni.showToast({
				icon: "none",
				position: "bottom",
				title: "复制成功",
				duration: 2000,
			});
		}
	});
	// #endif
	// #ifdef H5
	this.$copyText(text).then(
		res => {
			uni.showToast({
				icon: "none",
				position: "bottom",
				title: "复制成功",
				duration: 2000,
			});
		}
	)
	// #endif
}

Vue.prototype.share = function(title, desc, url, imgUrl) {
	uni.share({
		provider: "weixin",
		scene: "WXSceneSession",
		type: 0,
		href: url,
		title: title,
		summary: desc,
		imageUrl: imgUrl ? imgUrl : "../../static/logo.png",
		success: function(res) {
			_this.toast("分享成功");
		},
		fail: function(err) {
			_this.toast("分享失败");
		}
	});
}
Vue.prototype.baseServer = "https://api.hld.im/";
Vue.prototype.baseOss = "https://yht-chain.oss-cn-beijing.aliyuncs.com/";
Vue.prototype.execRespDelay = 2000;

import App from "./App"
App.mpType = "app"
const app = new Vue({
	i18n,
	...App
})
app.$mount()
