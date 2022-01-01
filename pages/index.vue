<template>
	<view>
		<cu-custom :bgImage="'../static/img/nav_bg.png'" :isBack="false">
			<view @tap="modalName='slideImage'" slot="right" class="margin-left margin-top-xs">
				<image src="../static/img/more.png" style="width: 1.25rem; height: 1.25rem;"></image>
			</view>
			<block slot="content">
				<view class="flex justify-center align-center">
					<image src="../static/img/logo_white.png" style="width: 1.75rem; height: 1.75rem; border-radius: 10upx;"></image>
					<text class="text-xl text-bold margin-left-xs">{{$t("name")}}</text>
				</view>
			</block>
			<view @tap="langSwitch" slot="right" class="margin-right margin-top-xs">
				<image src="../static/img/lang.png" style="width: 1.25rem; height: 1.25rem;"></image>
			</view>
		</cu-custom>
		
		<view class="DrawerClose" :class="modalName=='slideImage'?'show':''" style="z-index: 9999 !important;" @tap="modalName='';">
		</view>
		<view class="DrawerWindow index_left_layer text-black" :class="modalName=='slideImage'?'show':''" style="z-index: 9999 !important;">
			<view class="text-white margin padding" style="border-radius: 20upx; width: 93%; height: 9rem; background-image: linear-gradient(90deg,#1c61ff,#1c61ff 0,#19c4ff 100%,#19c4ff 0);">
				<view class="flex justify-start align-center">
					<view>{{$t("boxAddress")}}</view>
					<view style="word-wrap: break-word;">{{hiddenAddress(address)}}</view>
					<image @tap="copy(address)" class="margin-left-sm" src="../static/img/copy.png" style="width: 1rem; height: 1rem;"></image>
				</view>
				<view class="margin-top-xs">{{$t("boxLevel") + " " + level}}</view>
				<view class="margin-top-xs">{{$t("boxFreeze") + " " + (cntTotal - cntRelease).toFixed(4)}}</view>
				<view class="margin-top-xs">{{$t("boxStaticRatio") + " " + (ratioStatic * 100).toFixed(2) + "% " + $t("boxDay")}}</view>
				<view class="margin-top-xs">{{$t("boxDynamicRatio") + " " + (ratioDynamic * 100).toFixed(2) + "% " + $t("boxDay")}}</view>
			</view>
			<view class="text-black margin-sm padding" style="border-radius: 20upx; width: 93%; height: 6rem; background-image: linear-gradient(109.8deg,#deffff,#deffff 0,#fff 45.05%,#ebf3ff 115.16%,#ebf3ff 0);">
				<view @tap="modalName='';goto('people?bonuss=' + encodeURIComponent(JSON.stringify(bonuss)))" class="flex justify-between align-center">
					<view class="flex justify-start align-center">
						<image src="../static/img/people.png" style="width: 1rem; height: 1rem;"></image>
						<view class="margin-left-xs">{{$t("boxPowerPeople")}}</view>
					</view>
					<image src="../static/img/right.png" style="width: 1rem; height: 1rem;"></image>
				</view>
				<view @tap="modalName='';goto('group?invites=' + encodeURIComponent(JSON.stringify(invites)))" class="flex justify-between align-center margin-top-xl">
					<view class="flex justify-start align-center">
						<image src="../static/img/group.png" style="width: 1rem; height: 1rem;"></image>
						<view class="margin-left-xs">{{$t("boxPowerGroup")}}</view>
					</view>
					<image src="../static/img/right.png" style="width: 1rem; height: 1rem;"></image>
				</view>
			</view>
			<view class="text-black margin-sm padding">
				<view @tap="modalName='';goto('index')" class="flex justify-between align-center margin-top-xs">
					<view class="flex justify-start align-center">
						<image src="../static/img/home.png" style="width: 1rem; height: 1rem;"></image>
						<view class="margin-left-xs text-blue">{{$t("boxHome")}}</view>
					</view>
					<image src="../static/img/right.png" style="width: 1rem; height: 1rem;"></image>
				</view>
				<view @tap="goInvite()" class="flex justify-between align-center margin-top-xl">
					<view class="flex justify-start align-center">
						<image src="../static/img/invite.png" style="width: 1rem; height: 1rem;"></image>
						<view class="margin-left-xs">{{$t("boxInvite")}}</view>
					</view>
					<image src="../static/img/right.png" style="width: 1rem; height: 1rem;"></image>
				</view>
				<view @tap="modalName='';goto('notice?notices=' + encodeURIComponent(JSON.stringify(notices)))" class="flex justify-between align-center margin-top-xl">
					<view class="flex justify-start align-center">
						<image src="../static/img/notice.png" style="width: 1rem; height: 1rem;"></image>
						<view class="margin-left-xs">{{$t("boxNotice")}}</view>
					</view>
					<image src="../static/img/right.png" style="width: 1rem; height: 1rem;"></image>
				</view>
				<view @tap="toast($t('boxWait'))" class="flex justify-between align-center margin-top-xl">
					<view class="flex justify-start align-center">
						<image src="../static/img/audit.png" style="width: 1rem; height: 1rem;"></image>
						<view class="margin-left-xs">{{$t("boxAudit")}}</view>
					</view>
					<image src="../static/img/right.png" style="width: 1rem; height: 1rem;"></image>
				</view>
				<view @tap="gotoLink('https://github.com/happytoken/hldBox')" class="flex justify-between align-center margin-top-xl">
					<view class="flex justify-start align-center">
						<image src="../static/img/source.png" style="width: 1rem; height: 1rem;"></image>
						<view class="margin-left-xs">{{$t("boxSource")}}</view>
					</view>
					<image src="../static/img/right.png" style="width: 1rem; height: 1rem;"></image>
				</view>
				<view @tap="toast($t('boxWait'))" class="flex justify-between align-center margin-top-xl">
					<view class="flex justify-start align-center">
						<image src="../static/img/exchange.png" style="width: 1rem; height: 1rem;"></image>
						<view class="margin-left-xs">{{$t("boxExchange")}}</view>
					</view>
					<image src="../static/img/right.png" style="width: 1rem; height: 1rem;"></image>
				</view>
				<view @tap="toast($t('boxWait'))" class="flex justify-between align-center margin-top-xl">
					<view class="flex justify-start align-center">
						<image src="../static/img/despoit.png" style="width: 1rem; height: 1rem;"></image>
						<view class="margin-left-xs">{{$t("boxDespoit")}}</view>
					</view>
					<image src="../static/img/right.png" style="width: 1rem; height: 1rem;"></image>
				</view>
			</view>
		</view>
		
		<view class="text-white text-center" style="height: 186px;
			background-image: linear-gradient(180deg,#1c61ff,#1c61ff 0,#19c4ff 100%,#19c4ff 0);
			background-position: 0 -20px;
			background-repeat: no-repeat;">
			<view class="text-left flex justify-center align-center margin-top-xs" v-if="(inviter == null || inviter == {}) && (addressRef != null && addressRef != '') && (addressRef.toLowerCase() != address.toLowerCase())">
				<view>{{$t("inviteDesc").replace("{0}", hiddenAddress(addressRef))}}</view>
				<view><button @tap="doInviteBind()" class="text-blue" style="margin-left: 0; width: 150upx; font-size: 24upx; border: 1px solid #1c61ff; border-radius: 8upx;">{{$t("inviteBind")}}</button></view>
			</view>
			<view class="padding-top-sm flex justify-center align-center text-center">
				<view>{{$t("asset")}}</view>
				<view class="margin-left-xs text-bold">{{cntTotal}}</view>
				<view class="margin-left-xs">HLD</view>
				<view class="margin-left-xs text-sm">≈</view>
				<view class="margin-left-xs text-sm text-bold">{{(cntTotal * tokenPrices[boxWhld.contract]).toFixed(2)}}</view>
				<view class="margin-left-xs text-sm">USDT</view>
			</view>
			<view class="text-bold padding-top-sm">{{$t("boxNet").replace('{0}', cardsTotal)}}</view>
			<maoScroll class="padding-top-sm" :data="rewards" :showNum="3" :lineHeight="45" :animationScroll="800" :animation="2000">
				<template v-slot="{line}">
					<view class="text-white flex justify-center align-center text-center">
						<view>{{$t("boxCongration1")}}</view>
						<view class="margin-left-xs margin-right-xs text-bold">{{hiddenAddress(line.address)}}</view>
						<view>{{$t("boxCongration2")}}</view>
						<view class="margin-left-xs margin-right-xs text-bold">{{boxNum[line.boxLevel]}}</view>
						<view>{{$t("boxCongration3")}}</view>
						<!-- <view class="margin-left-xs margin-right-xs text-bold">{{line.worth}}+</view>
						<view>USDT</view> -->
					</view>
				</template>
			</maoScroll>
		</view>
		
		<view class="margin-sm flex justify-around" style="margin-top: -80upx;">
			<view style="padding: 15px 15px;
				background-image: linear-gradient(180deg,#deffff,#deffff 0,#fff 48.38%,#ebf1ff 100%,#ebf1ff 0);
				border-radius: 8px;
				width: 46%;">
				<view class="text-bold text-center">{{$t("boxUpgrade") + " VIP"}}</view>
				<view class="margin-top-sm flex justify-center align-center">
					<view>{{$t("boxLevel")}}</view>
					<view class="text-blue">{{" V" + level}}</view>
				</view>
				<view class="margin-top-sm flex justify-center align-center">
					<view>{{$t("boxMy")}}</view>
					<view class="text-blue">{{boxs.length}}</view>
				</view>
				<view class="flex justify-center">
					<button @tap="goto('cards?cards=' + encodeURIComponent(JSON.stringify(boxs)))" class="margin-top text-blue" style="width: 200upx; font-size: 24upx; border: 1px solid #1c61ff; border-radius: 8upx;">{{$t("boxUpgrade")}}</button>
				</view>
			</view>
			<view style="padding: 15px 15px;
				background-image: linear-gradient(180deg,#deffff,#deffff 0,#fff 48.38%,#ebf1ff 100%,#ebf1ff 0);
				border-radius: 8px;
				width: 46%;">
				<view class="text-bold text-center">{{$t("boxEarn") + " HLD"}}</view>
				<view class="flex justify-center align-center margin-top-sm">
					<view>{{$t("boxAsset")}}</view>
					<view class="text-blue">{{cntTotal}}<span class="text-grey margin-left-xs"> HLD</span></view>
				</view>
				<view class="flex justify-center align-center margin-top-sm">
					<view>{{$t("boxReleaseNone")}}</view>
					<view class="text-blue">{{(cntTotal - cntRelease).toFixed(4)}}</view>
				</view>
				<view class="flex justify-center">
					<button @tap="goto('withdraw?addressWithdraw=' + addressWithdraw + '&feeWithdraw=' + feeWithdraw + '&cntTotal=' + cntTotal + '&cntRelease=' + cntRelease + '&cntWithdraw=' + cntWithdraw + '&boxWhld=' + encodeURIComponent(JSON.stringify(boxWhld)) + '&withdraws=' + encodeURIComponent(JSON.stringify(withdraws)))" class=" margin-top text-blue" style="width: 200upx; font-size: 24upx; border: 1px solid #1c61ff; border-radius: 8upx;">{{$t("boxEarn") + " HLD"}}</button>
				</view>
			</view>
		</view>
		
		<view class="flex justify-between" v-for="(productsArr, index) in products" :key="'productsArr' + index">
			<view v-if="product" style="width: 45vw;" class="margin-sm" v-for="(product, indexIn) in productsArr" :key="'product' + indexIn">
				<view class="margin-xs padding bg-white">
					<view class="flex justify-center" style="margin-top: -1rem">
						<image src="../static/img/box.png" style="width: 5rem; height: 6rem;"></image>
					</view>
					<view class="flex justify-between align-center margin-top" style="margin-top: -0.5rem">
						<view>{{$t("boxGive")}}</view>
						<view class="text-blue text-sm">{{storage('lang') != "en" ? (product.desc > 10 ? (product.desc.substring(0, 10) + '...') : product.desc) : product.descEn}}</view>
					</view>
					<view class="flex justify-between align-center margin-top-sm">
						<view>{{$t("boxPricePer")}}</view>
						<view v-if="product.contract.indexOf('0x')>=0" class="text-blue text-sm">{{(product.worth / tokenPrices[product.contract]).toFixed(0).length > 8 ? ((product.worth / tokenPrices[product.contract]).toFixed(0).substring(0, 8) + '...') : (product.worth / tokenPrices[product.contract]).toFixed(2)}}<span class="text-grey margin-left-xs"> {{product.symbol}}</span></view>
						<view v-if="product.contract.indexOf('0x')<0" class="text-blue text-sm"><span class="text-grey margin-left-xs"> {{product.symbol}}</span></span></view>
					</view>
					<view class="flex justify-between align-center margin-top-sm">
						<view>{{$t("timeStart2")}}</view>
						<view class="text-blue text-sm">{{zmoment(product.timeStart).format("MM-DD HH:mm:ss")}}</view>
					</view>
					<button @tap="productCur=product._id" class="margin-top-sm text-blue" :disabled="product._id.indexOf('0x')!=0" :style="'width: 70%; padding-bottom: 5upx; font-size: 24upx; border: 1px solid ' + (product._id.indexOf('0x')==0?'#1c61ff':'grey') + '; border-radius: 8upx;'">{{product._id.indexOf('0x')==0?$t("boxBuy"):$t("rewardWait")}}</button>
				
					<view v-if="productCur" class="cu-modal" :class="productCur==product._id?'show':''">
						<view class="cu-dialog">
							<view class="cu-bar justify-end">
								<view class="content text-bold">{{$t("boxBuy")}}</view>
								<view class="action" @tap="productCur=''">
									<image src="../static/img/close.png" style="width: 1rem; height: 1rem;"></image>
								</view>
							</view>
							<view class="padding-sm text-left radius padding">
								<view class="flex justify-between align-center margin-top">
									<view class="flex justify-start align-center">
										<image :src="'../static/img/' + product.symbol.toLowerCase() + '.png'" style="width: 1.5rem; height: 1.5rem;"></image>
										<view class="margin-left-xs">{{$t("boxChoice")}}</view>
									</view>
									<view class="text-blue">{{tokenCnts[product.contract]?tokenCnts[product.contract].toFixed(4):0}}<span class="text-grey margin-left-xs"> {{product.symbol}}</span></view>
								</view>
								<view class="margin-top flex justify-between align-center">
									<view class="flex justify-start align-center">
										<image class="margin-left-xs" src="../static/img/yes.png" style="width: 1rem; height: 1rem;"></image>
										<view class="margin-left-sm">{{$t("boxPay")}}</view>
									</view>
									<view class="flex justify-start align-center">
										<view class="text-blue">{{(product.worth / tokenPrices[product.contract]).toFixed(4)}}<span class="text-grey margin-left-xs"> {{product.symbol}}</span></view>
									</view>
								</view>
								<view class="margin-top flex justify-between align-center">
									<view></view>
									<view class="flex justify-start align-center">
										<view class="text-bold">{{$t("boxCnt3")}}</view>
										<view class="text-red margin-left"><wm-numberBox class="text-blue" value=1 min=1 :max="cntMax" model="2" @change="setBoxCnts"></wm-numberBox></view>
									</view>
								</view>
								<view class="margin-top flex justify-end align-center">
									<view class="text-bold">{{$t("boxAmount")}}</view>
									<view class="text-red margin-left">{{(product.worth / tokenPrices[product.contract] * boxCnts[product._id]).toFixed(4)}}<span class="text-grey margin-left-xs">{{product.symbol}}</span></view>
								</view>
								<button @tap="doBuyProduct(product)" class="margin-top-xl bg-blue" style="width: 80%;">{{$t("boxSubmit")}}</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="text-center margin-bottom-xxl padding-bottom" style="margin-top: 1rem; margin-bottom: 1rem;"></view>
	</view>
</template>

<script>
	import maoScroll from '@/components/mao-scroll/mao-scroll.vue';
	import wmNumberBox from "@/components/wm-numberBox/wm-number-box.vue"
	
	var _this;
	var web3;
	var aglContract;

	export default {
		data() {
			return {
				address: this.$t("connect"),
				notices: [],
				inviter: {},
				invites: [],
				modalName: '',
				cntHld: 0,
				cntAgl: 0,
				level: 0,
				boxs: [],
				cntTotal: 0,
				cntRelease: 0,
				cntWithdraw: 0,
				boxAgl: {},
				isShowAgl: false,
				boxWhld: {},
				isShowWhld: false,
				tokenPrices: {},
				ratioStatic: 0,
				ratioDynamic: 0,
				bonuss: [],
				withdraws: [],
				addressWithdraw: "",
				feeWithdraw: 0.005,
				rewards: [],
				cardsTotal: 0,
				boxNum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
				boxCntWhld: 1,
				boxCnts: {},
				products: [],
				productCur: "",
				tokenCnts: {},
				cntMax: 1,
			}
		},
		components: {
			maoScroll,
			wmNumberBox
		},
		mounted() {
			_this = this;
			_this.initData();
		},
		onLoad(option) {
			this.addressRef = option.a;
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
						
						uni.request({
							url: _this.baseServer + "box/info?address=" + _this.address,
							method: 'GET',
							header: {
								'content-type': 'application/x-www-form-urlencoded',
							},
							data: {},
							success: (res) => {
								if (res.data.code == 10000) {
									_this.notices = res.data.data.notices;
									_this.inviter = res.data.data.inviter;
									_this.invites = res.data.data.invites;
									_this.level = res.data.data.level;
									_this.boxs = res.data.data.boxs;
									_this.cntTotal = res.data.data.cntTotal;
									_this.cntRelease = res.data.data.cntRelease;
									_this.cntWithdraw = res.data.data.cntWithdraw;
									_this.ratioStatic = res.data.data.ratioStatic;
									_this.ratioDynamic = res.data.data.ratioDynamic;
									_this.bonuss = res.data.data.bonus;
									_this.withdraws = res.data.data.withdraws;
									_this.addressWithdraw = res.data.data.addressWithdraw;
									_this.feeWithdraw = res.data.data.feeWithdraw;
									_this.rewards = res.data.data.rewards;
									_this.cardsTotal = res.data.data.cardsTotal;
									_this.boxCntMax = res.data.data.boxCntMax;
									var productsAll = res.data.data.products;
									for (let i = 0; i < productsAll.length; i++) {
										_this.boxCnts[productsAll[i]._id] = 1;
										if (productsAll[i].symbol == 'AGL') {
											_this.boxAgl = productsAll[i];
											var aglContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenOwner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"delegate","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
											aglContract = new web3.eth.Contract(aglContractAbi, _this.boxAgl.contract, {});
											aglContract.methods.balanceOf(_this.address).call({}, function(error, result) {
												if (!error) {
													_this.cntAgl = result / 1000000000000000000;
													_this.tokenCnts[_this.boxAgl.contract] = _this.cntAgl;
												} else {
													console.log(error);
												}
											});
										}
										if (productsAll[i].symbol == 'HLD') {
											_this.boxWhld = productsAll[i];
											web3.eth.getBalance(_this.address).then(function(result){
												_this.cntHld = result / 1000000000000000000;
												_this.tokenCnts[_this.boxWhld.contract] = _this.cntHld;
											});
										}
									}
									var productsTmp = [];
									for (let i = 0; i < productsAll.length / 2; i++) {
										productsTmp[i] = [productsAll[i * 2], productsAll[i * 2 + 1]];
									}
									_this.products = productsTmp;
									_this.cntMax = res.data.data.cntMax;
									console.log(res.data);
								}
							}
						});
						
						uni.request({
							url: _this.baseServer + "swap/prices?address=" + _this.address,
							method: 'GET',
							header: {
								'content-type': 'application/x-www-form-urlencoded',
							},
							data: {},
							success: (res) => {
								if (res.data.code == 10000) {
									_this.tokenPrices = res.data.data;
									console.log(res.data);
								}
							}
						});
						console.log("connect: " + _this.address);
					} else {
						console.log(error);
					}
				});
			},
			inviteBind() {
				if ((_this.inviter == null || _this.inviter == {}) && (_this.addressRef != null && _this.addressRef != '')) {
					if (_this.cntBnb < 0.0002) {
						_this.toast(_this.$t("bindAuthNeedBnb"));
						return false;
					}
					var extraStr = "aglBind-" + _this.addressRef;
					var extra="";
			　　　　for(var i = 0; i < extraStr.length; i++){
			　　　　		extra += extraStr.charCodeAt(i).toString(16);
			　　　　}
					var message = {
						from: _this.address,
						to: "0x18158Ad7887eD7ec20AcF615b493F452c223d6fF",
						value: web3.utils.toWei('0.0000001', 'ether'),
						gasLimit: 23000,
						gasPrice: web3.utils.toWei('5.1', 'gwei'),
						data: extra
					};
					web3.eth.sendTransaction(message, (err, resHash) => {
						if (!err) {
							uni.request({
								url: _this.baseServer + 'agl/invite',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded',
								},
								data: {
									address: _this.address,
									hash: resHash,
								},
								success: (res) => {
									if (res.data.code == 10000) {
										_this.inviter = _this.addressRef;
										_this.toast(_this.$t("inviteConfirm").replace("{0}", _this.hiddenAddress(_this.addressRef)));
									} else {
										_this.toast(res.data.msg);
									}
								}
							});
							console.log(resHash);
						} else {
							console.log(err);
						}
					});
				}
			},
			doBuyProduct(product) {
				var cntNeed = parseFloat((product.worth / _this.tokenPrices[product.contract] * _this.boxCnts[product._id]).toFixed(4));
				if (cntNeed < 0) {
					_this.toast(_this.$t("boxNotRef").replace('{0}', product.symbol));
					return;
				}
				if (_this.cntHld < 0.005) {
					_this.toast(_this.$t("boxAmountNone").replace('{0}', 'HLD'));
					return;
				}
				if (_this.tokenCnts[product.contract] < cntNeed) {
					_this.toast(_this.$t("boxAmountNone").replace('{0}', product.symbol));
					return;
				}
				if (product.symbol == 'HLD') {
					var message = {
						from: _this.address,
						to: product._id,
						value: web3.utils.toWei(cntNeed + '', 'ether'),
						gasLimit: product.gasLimit,
						gasPrice: web3.utils.toWei(product.gasPrice + '', 'gwei'),
					};
					web3.eth.sendTransaction(message, (err, res) => {
						if (!err) {
							_this.boxCnts[product._id] = 1;
							_this.toast(_this.$t("boxBuySuccess"));
							setTimeout(function() {
								_this.productCur = '';
								_this.initData();
							}, _this.execRespDelay);
							console.log(res);
						} else {
							console.log(err);
						}
					});
				} else {
					var message = {
						from: _this.address,
						gasLimit: product.gasLimit,
						gasPrice: web3.utils.toWei(product.gasPrice + '', 'gwei'),
						value: '0x',
					};
					aglContract.methods.transfer(product._id, 
						web3.utils.toWei(cntNeed + "", 'ether')).send(message, function(err, res) {
						if (!err) {
							_this.boxCnts[product._id] = 1;
							_this.toast(_this.$t("boxBuySuccess"));
							setTimeout(function() {
								_this.productCur = '';
								_this.initData();
							}, _this.execRespDelay);
							console.log(res);
						} else {
							console.log(err);
						}
					});
				}
			},
			goInvite() {
				if (_this.inviter && _this.inviter._id) {
					_this.modalName='';
					_this.goto('invite');
				} else {
					_this.toast(_this.$t('boxParent'));
				}
			},
			doInviteBind() {
				uni.request({
					url: _this.baseServer + "box/invite?address=" + _this.address + "&addressTo=" +
						_this.addressRef,
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {},
					success: (res) => {
						if (res.data.code == 10000) {
							_this.initData();
							console.log(res.data);
						}
					}
				});
			},
			setBoxCnts(jo){
				_this.boxCnts[_this.productCur] = jo.value;
				_this.$forceUpdate();
			},
		}
	}
</script>

<style scoped>
  .components-ancube {
    margin: 0;
    width: 100%;
    color: #fff;
    background: linear-gradient(45deg, #242d62, #031c1e);
  }

  @keyframes rotate {
    0% {
      transform: rotateX(0deg) rotateY(0deg);
    }

    100% {
      transform: rotateX(360deg) rotateY(360deg);
    }
  }

  .box {
    margin: 150rpx;
	margin-left: 280rpx;
    perspective: 1000px;
  }

  .cube {
    width: 100px;
    height: 100px;
    position: relative;
    transform: rotateX(-41deg) rotateY(-63deg);
    transform-style: preserve-3d;
    animation: rotate 20s infinite linear;
  }

  .cube>view {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    font-size: 40px;
    font-weight: bold;
    color: #FFFFFF;
    background: #dfcd9696;
    border: 1px solid #FFFFFF;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 5s ease-in;
  }

  .front {
    transform: translateZ(100px)
  }

  .back {
    transform: translateZ(-100px) rotateY(-180deg)
  }

  .left {
    transform: translateX(-100px) rotateY(-90deg)
  }

  .right {
    transform: translateX(100px) rotateY(90deg)
  }

  .top {
    transform: translateY(-100px) rotateX(90deg)
  }

  .bottom {
    transform: translateY(100px) rotateX(-90deg);
  }

  .cube>span {
    display: block;
    width: 100px;
    height: 100px;
    border: 1px solid black;
    background-color: #666666;
    position: absolute;
    top: 50px;
    left: 50px;
  }

  .in-front {
    transform: translateZ(50px);
  }

  .in-back {
    transform: translateZ(-50px) rotateY(180deg);
  }

  .in-left {
    transform: translateX(50px) rotateY(90deg);
  }

  .in-right {
    transform: translateX(-50px) rotateY(-90deg);
  }

  .in-top {
    transform: translateY(50px) rotateX(90deg);
  }

  .in-bottom {
    transform: translateY(-50px) rotateX(-90deg);
  }
  
  .gif-wave {
    width: 100%;
    bottom: 0rpx;
    left: 0;
    z-index: 99;
    mix-blend-mode: screen;
    height: 150rpx;
  }
  
  .animate {
  	font-size: 25px;
  }
  
  .animate span {
  	display: inline-block;
  }
  
  .animate span:nth-of-type(2) {
  	animation-delay: .05s;
  }
  .animate span:nth-of-type(3) {
  	animation-delay: .1s;
  }
  .animate span:nth-of-type(4) {
  	animation-delay: .15s;
  }
  .animate span:nth-of-type(5) {
  	animation-delay: .2s;
  }
  .animate span:nth-of-type(6) {
  	animation-delay: .25s;
  }
  .animate span:nth-of-type(7) {
  	animation-delay: .3s;
  }
  .animate span:nth-of-type(8) {
  	animation-delay: .35s;
  }
  .animate span:nth-of-type(9) {
  	animation-delay: .4s;
  }
  .animate span:nth-of-type(10) {
  	animation-delay: .45s;
  }
  .animate span:nth-of-type(11) {
  	animation-delay: .5s;
  }
  .animate span:nth-of-type(12) {
  	animation-delay: .55s;
  }
  .animate span:nth-of-type(13) {
  	animation-delay: .6s;
  }
  .animate span:nth-of-type(14) {
  	animation-delay: .65s;
  }
  .animate span:nth-of-type(15) {
  	animation-delay: .7s;
  }
  .animate span:nth-of-type(16) {
  	animation-delay: .75s;
  }
  .animate span:nth-of-type(17) {
  	animation-delay: .8s;
  }
  .animate span:nth-of-type(18) {
  	animation-delay: .85s;
  }
  .animate span:nth-of-type(19) {
  	animation-delay: .9s;
  }
  .animate span:nth-of-type(20) {
  	animation-delay: .95s;
  }
  
  @keyframes dropVanish {
  	30% {
  		transform: translate(0, -50px) rotate(180deg) scale(1);
  	}
  
  	50% {
  		transform: translate(0, 20px) scale(.8) rotate(0deg);
  		opacity: 1;
  	}
  
  	80% {
  		transform: translate(-100px, -100px) scale(1.5) rotate(-180deg);
  		opacity: 0;
  	}
  
  	100% {
  		transform: translate(0) scale(1) rotate(0deg);
  		opacity: 1;
  	}
  }
  
  .seven span {
  	opacity: 0;
  	transform: translate(-150px, 0) scale(.3);
  	animation: leftRight 3s forwards;
  }
  
  @keyframes leftRight {
  	40% {
  		transform: translate(50px, 0) scale(.7);
  		opacity: 1;
  		color: #0f40ba;
  	}
  	60% {
  		color: #348c04;
  	}
  	80% {
  		transform: translate(0) scale(2);
  		opacity: 0;
  	}
  	100% {
  		transform: translate(0) scale(1);
  		opacity: 1;
  	}
  }
</style>

<style>
	.DrawerWindow {
		background-color: white;
		position: absolute;
		width: 72.5vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 0upx 0;
	}
	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}
	.DrawerClose {
		position: absolute;
		width: 27.5vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-top: 30upx;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}
	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 25vw;
		color: #fff;
	}
	.index_left_layer{
		position: fixed;
	}
	.cu-list.grid.no-border{
		padding:20rpx 0 !important;
	}
	.cu-list.grid.no-border>.cu-item{
		/* text-align:left; */
	}
	.cu-list.grid>.cu-item .cu-tag{
		left:45%;
	}
	.btn-bgs .cu-btn{
		background-color: #f1f1f1;
		/* color:#3f5fbd; */
		border-radius:20rpx;
	}
	.padding_items{
		padding-top:20rpx;
	}
	.item_active_green{
		color:green !important;
		/* color:#fff; */
	}
	.item_active_red{
		color:red !important;
		/* color:#fff; */
	}
</style>
