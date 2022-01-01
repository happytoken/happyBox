<template>
	<view>
		<cu-custom :bgImage="'../static/img/nav_bg.png'" :isBack="true">
			<block slot="content">
				<view class="flex justify-center align-center">
					<image src="../static/img/logo_white.png" style="width: 1.75rem; height: 1.75rem; border-radius: 10upx;"></image>
					<text class="text-xl text-bold margin-left-xs">{{$t("boxInvite")}}</text>
				</view>
			</block>
			<view @tap="langSwitch" slot="right" class="margin-right margin-top-xs">
				<image src="../static/img/lang.png" style="width: 1.25rem; height: 1.25rem;"></image>
			</view>
		</cu-custom>
		<view class="text-white text-center" style="min-height: 90vh;
			background: #fff;
			background-image: url(../static/img/weitu.png);
			background-position: 0 0;
			background-size: 100% 100%;
			background-repeat: no-repeat;">
			<view class="text-bold text-sl padding-top-xl">{{$t("boxFriend")}}</view>
			<view class="text-xxl margin-top padding-bottom-xl">{{$t("boxGroup")}}</view>
			<view class="qrimg margin-top-xl padding bg-white" style="width: 400upx; border-radius: 50upx; margin-left: 23%;">
			    <tki-qrcode
					ref="qrcode"
					:val="baseServer.replace('api', 'box') + '?a=' + address"
					:size="350"
					:icon="'../static/img/logo.png'"
					:iconSize="50"
					:onval="address"
					:loadMake="true"
					:usingComponents="true"
					:showLoading="true"
					:loadingText="'二维码生成中'"
			    />
			</view>
			<view class="margin-top text-bold">{{$t("boxScan")}}</view>
			<view class="text-grey margin-top-xl padding-top">{{baseServer.replace('api', 'box') + '?a=' + hiddenAddress(address)}}</view>
			<button @tap="copy(baseServer.replace('api', 'box') + '?a=' + address)" class="margin-top-xl bg-blue" style="width: 80%;">{{$t("boxCopy")}}</button>
		</view>
	</view>
</template>

<script>
	// https://ext.dcloud.net.cn/plugin?id=39
	import tkiQrcode from "tki-qrcode"
	var _this;
	var web3;
	
	export default {
		data() {
			return {
				address: "",
				qrR: ""
			};
		},
		components: {
			tkiQrcode
		},
		mounted() {
			_this = this;
			let Web3 = require('web3');
			var web3Provider;
			if (window.ethereum) {
				web3Provider = window.ethereum;
				try {
					window.ethereum.enable();
				} catch (error) {
					console.error("User denied account access")
				}
			}
			web3 = new Web3(web3Provider);
			web3.eth.getAccounts(function(error, result) {
				if (!error) {
					_this.address = result[0];
					console.log("connect: " + _this.address);
				} else {
					console.log(error);
				}
			});
		},
		methods: {
		}
	}
</script>

<style>
	.qrimg {
		display: flex;
		justify-content: center;
	}
	.qrimg-i{
		margin-right: 10px;
	}
</style>