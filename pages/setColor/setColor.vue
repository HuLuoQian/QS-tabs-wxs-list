<template>
	<view class="content">
		<view class="topView"> 
			<view class="topViewItem" @tap="back">
				返回
			</view>
			<view class="">
				QS-tabs-wxs-list
			</view>
			<view class="topViewItem"></view>
		</view>
		<QSTabsWxs 
		ref="QSTabsWxs" 
		tabsPosition="bottom"
		hasRefresh
		refreshImage="/static/refresh.png"
		activeFontColor="#fff" 
		refreshTextColor="#fff"
		tabsFontColor="rgba(255,255,255,.7)" 
		tabsBackgroundColor="#000" 
		swiperBackgroundColor="#000" 
		minWidth="125rpx" 
		type="setColor"
		@change="change"
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
			let n = 0;
			let tabs = Array(10).fill('').map(() => {
				const name = 'tab_' + n++;
				return {
					name,
					id: name
				}
			});
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
			},
			back() {
				uni.navigateBack();
			},
			change(index) {
				console.log('current改变:' + index)
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
