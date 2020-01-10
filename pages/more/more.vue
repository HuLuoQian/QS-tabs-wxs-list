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
		minWidth="125rpx" 
		type="more"
		:height="windowHeight-topViewHeight"></QSTabsWxs>
		<!-- defCurrent="2" -->
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
			let s = 0;
			let tabs2 = Array(50).fill('').map(() => {
				const name = 'tab_' + s++;
				return {
					name,
					id: name
				}
			});
			this.getTopViewHeight();
			this.$refs.QSTabsWxs.setTabs(tabs2);
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
		padding: var(--status-bar-height) 20px 0 20px;
	}
	.topViewItem{
		font-size: 16px;
		color: #999;
		width: 15%;
	}
</style>
