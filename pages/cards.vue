<template>
	<view>
		<cu-custom :bgImage="'../static/img/nav_bg.png'" :isBack="true">
			<block slot="content">
				<view class="flex justify-center align-center">
					<image src="../static/img/logo_white.png" style="width: 1.75rem; height: 1.75rem; border-radius: 10upx;"></image>
					<text class="text-xl text-bold margin-left-xs">{{$t("boxUpgrade")}}</text>
				</view>
			</block>
			<view @tap="langSwitch" slot="right" class="margin-right margin-top-xs">
				<image src="../static/img/lang.png" style="width: 1.25rem; height: 1.25rem;"></image>
			</view>
		</cu-custom>
		<view style="min-height: 90vh; background: #f1f1f1; background-position: 0 0; background-size: 100% 100%; background-repeat: no-repeat;">
			<view class="margin padding" style="background-image: linear-gradient(180deg,#deffff,#deffff 0,#fff 48.38%,#ebf1ff 100%,#ebf1ff 0);" v-for="(card, index) in cards" :key="'card' + index">
				<view class="flex justify-between margin-top-xs">
					<view class="text-grey">{{$t("boxCardId")}}</view>
					<view class="flex justify-end align-center">
						<view>{{card.boxId}}</view>
						<image @tap="copy(card.boxId)" class="margin-left-sm" src="../static/img/copy_black.png" style="width: 1rem; height: 1rem;"></image>
					</view>
				</view>
				<view v-if="card.boxLevel > 0" class="flex justify-between margin-top-xs">
					<view class="text-grey">{{$t("boxContract")}}</view>
					<view class="flex justify-end align-center">
						<view>{{hiddenAddress(card.contract)}}</view>
						<image @tap="copy(card.contract)" class="margin-left-sm" src="../static/img/copy_black.png" style="width: 1rem; height: 1rem;"></image>
					</view>
				</view>
				<view class="flex justify-between margin-top-xs">
					<view class="text-grey">{{$t("boxCardName")}}</view>
					<view>{{$t("boxCardNameReal").replace("{0}", boxNum[card.boxLevel])}}</view>
				</view>
				<view class="flex justify-between margin-top-xs">
					<view class="text-grey">{{$t("boxCardHash")}}</view>
					<view class="flex justify-end align-center">
						<view>{{hiddenAddress(card._id)}}</view>
						<image @tap="copy(card._id)" class="margin-left-sm" src="../static/img/copy_black.png" style="width: 1rem; height: 1rem;"></image>
					</view>
				</view>
				<view class="flex justify-between margin-top-xs">
					<view class="text-grey">{{$t("boxCardSymbol")}}</view>
					<view>{{card.symbol}}</view>
				</view>
				<view class="flex justify-between margin-top-xs">
					<view class="text-grey">{{$t("boxCardCnt")}}</view>
					<view>{{(card.cnt||0).toFixed(card.symbol == 'AGL' ? 0 : 4)}}</view>
				</view>
				<view class="flex justify-between margin-top-xs">
					<view class="text-grey">{{$t("boxCardTime")}}</view>
					<view>{{zmoment(card.time).format("yyyy-MM-DD HH:mm:ss")}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				cards: [],
				boxNum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
			};
		},
		onLoad(options) {
			this.cards = JSON.parse(decodeURIComponent(options.cards));
		},
		mounted() {
			_this = this;
		},
		methods: {
		}
	}
</script>