<template>
	<view>
		<view class="maoScroll-main" :style="'height:'+(lineHeight*showLine)+'rpx;'">
			<view :style="'margin-top:-'+marginTop+'rpx;'">
				<view v-for="(item,index) in showdata" :key="'maoScroll'+index" :style="'height:'+lineHeight+'rpx;'">
					<slot :line="item" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'maoScroll',
		data() {
			return {
				showdata: [],
				marginTop: 0,
				showLine: 0,
			}
		},
		props:{
			data: {
				type: Array,
				default: []
			},
			showNum: {
				type: Number,
				default: 3,
			},
			lineHeight: {
				type: Number,
				default: 60,
			},
			animationScroll: {
				type: Number,
				default: 500,
			},
			animation: {
				type: Number,
				default: 2000,
			}
		},
		methods: {
			init: function(){
				this.showLine = this.showNum < this.data.length ? this.showNum : this.data.length;
				for(let i = 0; i < this.data.length; i++){
					this.showdata.push(this.data[i]);
				}
				for(let i = 0; i < this.showLine; i++){
					this.showdata.push(this.data[i]);
				}
				setInterval(this.animationFunc, this.animation);
			},
			animationFunc: function(){
				if(this.marginTop >= this.data.length*this.lineHeight){
					this.marginTop = 0;
				}
				let stepTime = this.animationScroll/this.lineHeight;
				
				var step = 0;
				let self = this;
				var index = setInterval(function(){
					self.marginTop = self.marginTop + 1;
					step++;
					if (step >= self.lineHeight) {
						clearInterval(index);
					}
				}, stepTime);
			}
		},
		watch: {
			data(outdata, newdata) {
				this.init();
			}
		}
	}
</script>

<style>
	.maoScroll-main{width: 100%;overflow: hidden;}
</style>
