<template>
	<view>
		<cu-custom :bgImage="'../static/img/nav_bg.png'" :isBack="true">
			<block slot="content">
				<view class="flex justify-center align-center">
					<image src="../static/img/logo_white.png" style="width: 1.75rem; height: 1.75rem; border-radius: 10upx;"></image>
					<text class="text-xl text-bold margin-left-xs">{{$t("boxPowerGroup")}}</text>
				</view>
			</block>
			<view @tap="langSwitch" slot="right" class="margin-right margin-top-xs">
				<image src="../static/img/lang.png" style="width: 1.25rem; height: 1.25rem;"></image>
			</view>
		</cu-custom>
		<view style="min-height: 90vh; background: #f1f1f1; background-position: 0 0; background-size: 100% 100%; background-repeat: no-repeat;">
			<view class="margin padding" style="background-image: linear-gradient(180deg,#deffff,#deffff 0,#fff 48.38%,#ebf1ff 100%,#ebf1ff 0);" v-for="(invite, index) in invites" :key="'invite' + index">
				<view class="flex justify-between margin-top-xs">
					<view class="text-grey">{{$t("boxAddress")}}</view>
					<view class="flex justify-end align-center">
						<view>{{hiddenAddress(invite._id)}}</view>
						<image @tap="copy(invite._id)" class="margin-left-sm" src="../static/img/copy_black.png" style="width: 1rem; height: 1rem;"></image>
					</view>
				</view>
				<view class="flex justify-between margin-top-xs">
					<view class="text-grey">{{$t("boxSpeed")}}</view>
					<view>{{(invite.cnt||0).toFixed(4)}}</view>
				</view>
				<view class="flex justify-between margin-top-xs">
					<view class="text-grey">{{$t("boxTime")}}</view>
					<view>{{zmoment(invite.time).format("yyyy-MM-DD HH:mm:ss")}}</view>
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
				invites: [],
			};
		},
		onLoad(options) {
			this.invites = JSON.parse(decodeURIComponent(options.invites));
		},
		mounted() {
			_this = this;
		},
		methods: {
		}
	}
</script>