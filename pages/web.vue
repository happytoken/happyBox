<template>
	<view>
		<cu-custom style="background-color: #081f29 !important; color: #6cbf77;" v-if="title != ''" :isBack="true">
			<block slot="content">{{title}}</block>
		</cu-custom>
		
		<view>
			<web-view :webview-styles="webviewStyles" :src="url" @message="handleMessage"></web-view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				webviewStyles: {
					progress: false
				},
				title: "",
				url: "",
			}
		},
		onUnload(){
			view.close();
		},
		onLoad(options) {
			if (options.title != undefined && options.title.trim() != "") {
				this.title = options.title;
			}
			this.url = decodeURIComponent(options.url);
			this.creatView();
		},
		methods: {
			handleMessage(event) {
			    this.toast('接收到的消息：' + JSON.stringify(event.detail));
				if (event.detail.data[0]) {
					if (event.detail.data[0].water) {
						var water = event.detail.data[0].water;
						this.storage("ticket", water.split("#")[0]);
						this.storage("randstr", water.split("#")[1]);
					}
				}
			},
			creatView(){
				view = new plus.nativeObj.View('test',{top:'10px',left:'10px',height:'35px',width:'35px'});
				view.drawRect({color:'rgba(0,0,0,0.8)',radius:'20px'}, {top:'0px',left:'0px',width:'35px',height:'35px'});
				view.drawText('返回', {}, {size:'13px',color:'#333333'});
				view.show();
				view.addEventListener("click", this.onClick, false);
			},
			onClick(e){
				uni.navigateBack({})
			}
		}
	}
</script>
