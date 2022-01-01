<template>
	<view>
		<cu-custom :bgImage="'../static/img/nav_bg.png'" :isBack="true">
			<block slot="content">
				<view class="flex justify-center align-center">
					<image src="../static/img/logo_white.png" style="width: 1.75rem; height: 1.75rem; border-radius: 10upx;"></image>
					<text class="text-xl text-bold margin-left-xs">{{$t("boxGet")}}</text>
				</view>
			</block>
			<view @tap="langSwitch" slot="right" class="margin-right margin-top-xs">
				<image src="../static/img/lang.png" style="width: 1.25rem; height: 1.25rem;"></image>
			</view>
		</cu-custom>
		<view class="text-white text-center" style="height: 97.5vh;
			background-image: linear-gradient(180deg,#deffff,#deffff 0,#fff 48.38%,#ebf1ff 100%,#ebf1ff 0);
			background-position: 0 -20px;
			background-repeat: no-repeat;">
			<view class="padding-xs padding-top padding-left flex align-center">
				<view class="text-grey">{{$t("boxAsset")}}</view>
				<view class="text-blue">{{(cntTotal||0).toFixed(4)}}<span class="text-grey margin-left-xs"> HLD</span></view>
			</view>
			<view class="padding-xs padding-left flex align-center">
				<view class="text-grey">{{$t("boxReleaseNone")}}</view>
				<view class="text-blue">{{((cntTotal - cntRelease)||0).toFixed(4)}}</view>
			</view>
			<view class="padding-xs padding-left flex align-center">
				<view class="text-grey">{{$t("boxRelease")}}</view>
				<view class="text-blue">{{(cntRelease||0).toFixed(4)}}</view>
			</view>
			<view class="padding-xs padding-left flex align-center">
				<view class="text-grey">{{$t("boxWithdraw")}}</view>
				<view class="text-blue">{{(cntWithdraw||0).toFixed(4)}}</view>
			</view>
			<view class="padding-xs padding-left flex align-center">
				<view class="text-grey">{{$t("boxWithdrawCan")}}</view>
				<view class="text-blue">{{(cntCan||0).toFixed(4)}}</view>
			</view>
			
			<input v-model="cnt" class="text-center margin-top-xl padding-xs text-blue"
				style="margin-left:15%; width: 70%;height: 70upx;border: 1px solid #1c61ff; border-radius: 8upx;" :placeholder="$t('assetCnt')"
				name="input"></input>
			<view class="flex justify-center align-center">
				<button @tap="doPrivateWithdraw();" class="margin-top-xl margin text-white bg-blue margin-bottom-xl" style=";width: 200upx; font-size: 24upx; border-radius: 25upx;">{{$t("boxWithdrawExec")}}</button>
			</view>
			
			<view class="margin text-center border-zdownsXs padding-bottom-sm text-blue text-bold">{{$t("withdrawDesc")}}</view>
			<view style="min-height: 50vh; background: white; background-position: 0 0; background-size: 100% 100%; background-repeat: no-repeat;">
				<view class="margin padding" style="background-image: linear-gradient(180deg,#deffff,#deffff 0,#fff 48.38%,#ebf1ff 100%,#ebf1ff 0);" v-for="(withdraw, index) in withdraws" :key="'withdraw' + index">
					<view class="flex justify-between margin-top-xs">
						<view class="text-grey">{{$t("boxCnt2")}}</view>
						<view class="text-black">{{(withdraw.cnt||0).toFixed(4)}}</view>
					</view>
					<view class="flex justify-between margin-top-xs">
						<view class="text-grey">{{$t("boxTransferHash")}}</view>
						<view class="flex justify-end align-center text-black">
							<view>{{hiddenAddress(withdraw.hash)}}</view>
							<image @tap="copy(withdraw.hash)" class="margin-left-sm" src="../static/img/copy_black.png" style="width: 1rem; height: 1rem;"></image>
						</view>
					</view>
					<view class="flex justify-between margin-top-xs">
						<view class="text-grey">{{$t("boxTime")}}</view>
						<view class="text-black">{{zmoment(withdraw.time).format("yyyy-MM-DD HH:mm:ss")}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	var web3;
	
	export default {
		data() {
			return {
				addressWithdraw: "",
				cntTotal: 0,
				cntRelease: 0,
				cntWithdraw: 0,
				cntCan: 0,
				cnt: "",
				withdraws: [],
				boxWhld: {},
				address: "",
			};
		},
		onLoad(options) {
			this.addressWithdraw = options.addressWithdraw;
			this.feeWithdraw = options.feeWithdraw;
			this.withdraws = JSON.parse(decodeURIComponent(options.withdraws));
			this.cntTotal = parseFloat(options.cntTotal);
			this.cntRelease = parseFloat(options.cntRelease);
			this.cntWithdraw = parseFloat(options.cntWithdraw);
			this.cntCan = this.cntRelease - this.cntWithdraw;
			this.boxWhld = JSON.parse(decodeURIComponent(options.boxWhld));
		},
		mounted() {
			_this = this;
			_this.initData();
		},
		methods: {
			initData() {
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
			doPrivateWithdraw() {
				if (_this.cnt == "" || _this.cnt < 0.0001) {
					_this.toast(_this.$t("assetCnt"));
					return false;
				}
				if (_this.cnt > _this.cntCan) {
					_this.toast(_this.$t("boxAmountNone").replace('{0}', 'HLD'));
					return;
				}
				var extraStr =  _this.cnt;
				var extra="";
				for(var i = 0; i < extraStr.length; i++){
					extra += extraStr.charCodeAt(i).toString(16);
				}
				var message = {
					from: _this.address,
					to: _this.addressWithdraw,
					value: web3.utils.toWei(_this.feeWithdraw + '', 'ether'),
					gasLimit: _this.boxWhld.gasLimit,
					gasPrice: web3.utils.toWei(_this.boxWhld.gasPrice + '', 'gwei'),
					data: extra
				};
				web3.eth.sendTransaction(message, (err, res) => {
					if (!err) {
						_this.toast(_this.$t("boxWithdrawSuccess"));
						console.log(res);
					} else {
						console.log(err);
					}
				});
			},
		}
	}
</script>