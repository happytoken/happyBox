<template>
	<view>
		<cu-custom :bgImage="'../static/img/nav_bg.png'" :isBack="true">
			<block slot="content">
				<view class="flex justify-center align-center">
					<image src="../static/img/logo_white.png" style="width: 1.75rem; height: 1.75rem; border-radius: 10upx;"></image>
					<text class="text-xl text-bold margin-left-xs">{{$t("boxNotice")}}</text>
				</view>
			</block>
			<view @tap="langSwitch" slot="right" class="margin-right margin-top-xs">
				<image src="../static/img/lang.png" style="width: 1.25rem; height: 1.25rem;"></image>
			</view>
		</cu-custom>
		<view style="min-height: 90vh; background: #f1f1f1; background-position: 0 0; background-size: 100% 100%; background-repeat: no-repeat;">
			<view class="padding-sm">
				<view class="text-left radius padding" style="background-image: linear-gradient(180deg,#deffff,#deffff 0,#fff 48.38%,#ebf1ff 100%,#ebf1ff 0);" v-for="(notice, index) in notices" :key="'notice' + index">
					<view class="flex">
						<view class="flex-treble text-blue">{{$i18n.locale == 'zh' ? notice.title : notice.titleEn}}</view>
						<view class="flex-sub text-blue">{{(notice.date||'')}}</view>
					</view>
					<view class="margin-top-sm" style="text-indent: 60upx; white-space: break-spaces; word-break: break-all;">
						<rich-text :nodes="$i18n.locale == 'zh' ? notice.content : notice.contentEn"></rich-text>
					</view>
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
				notices: [],
			};
		},
		onLoad(options) {
			this.notices = JSON.parse(decodeURIComponent(options.notices));
		},
		mounted() {
			_this = this;
		},
		methods: {
		}
	}
</script>