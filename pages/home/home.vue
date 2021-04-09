<template>
	<view class="content">
		<view class="topView"> 
			<view class="topViewItem"></view>
			<view class="">
				QS-tabs-wxs-list
			</view>
			<view class="topViewItem"></view>
		</view>
		<QSTabsWxs 
		ref="QSTabsWxs" 
		tabsPosition="bottom"
		refreshImage="/static/refresh.png"
		activeFontColor="#fff" 
		refreshTextColor="#fff"
		tabsFontColor="rgba(255,255,255,.7)" 
		tabsBackgroundColor="#000" 
		swiperBackgroundColor="#000" 
		minWidth="375rpx" 
		:lineWidth=".2"
		type="home"
		:height="windowHeight-topViewHeight"></QSTabsWxs>
	</view>
</template>

<script>
	import QSTabsWxs from '@/components/QS-tabs-wxs-list/QS-tabs-wxs-list.vue';
	const {windowHeight} = uni.getSystemInfoSync();
	export default {
		components: {
			QSTabsWxs
		},
		data() {
			return {
				title: 'Hello',
				topViewHeight: 44,
				windowHeight
			}
		},
		onReady() {
			const tabs = [
				{
					name: 'Swiper',
					id: 'Swiper'
				},
				{
					name: 'vShow',
					id: 'vShow'
				}
			]
			this.getTopViewHeight();
			this.$refs.QSTabsWxs.setTabs(tabs);
		},
		methods: {
			getTopViewHeight() {
				let view = uni.createSelectorQuery().in(this);
				view.select('.topView').boundingClientRect();
				view.exec(res=>{
					console.log('总高度:' + JSON.stringify(res));
					this.topViewHeight = res[0].height;
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
	}
	.topView{
		height: 44px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size:  18px;
		background: #000;
		color: #fff;
		padding: var(--status-bar-height) 20px 0 20px;
	}
	.topViewItem{
		font-size: 16px;
		color: #999;
		width: 15%;
	}
</style>
