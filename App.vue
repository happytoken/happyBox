<script>
	import Vue from "vue"
	
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			    uni.request({
			        url: Vue.prototype.baseServer + "wob/version",
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
			        data: {
			            version: widgetInfo.version,
			        },
			        success: (result) => {
			            if (result.data.code == 1) {
							var url = result.data.data.url;
							var desc = result.data.data.desc;
							uni.showModal({
								title: "升级提示",
								content: desc,
								success: (res) => {
									if (res.confirm) {
										if (url.endsWith(".wgt")) {
											// 清空缓存
											// plus.cache.clear( function () {
											// });
											uni.downloadFile({
											    url: url,
											    success: (downloadResult) => {
											        if (downloadResult.statusCode === 200) {
											            plus.runtime.install(downloadResult.tempFilePath, {
											                force: false
											            }, function() {
											                plus.runtime.restart();
											            }, function(e) {
											            });
											        }
											    }
											});
										} else {
											plus.runtime.openURL(url);
											plus.runtime.quit();
										}
									}
								}
							})
			            } else if(result.data.code == 2) {
							var maintenance = result.data.data.maintenance;
							if (maintenance != "") {
								uni.showModal({
									title: "维护中......",
									content: "预计到" + maintenance + "结束",
									showCancel: false,
									confirmText: "我知道了",
									success: (res) => {
										if (res.confirm) {
											plus.runtime.quit();
										}
									}
								})
							}
						}
			        }
			    });
			});
			// #endif
			
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == "android") {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "theme/day.css";
</style>
