<template>
	<view class="content">
		<view class="topView">QS-tabs-wxs + list</view>
		<QSTabsWxs ref="QSTabsWxs" defCurrent="2" :height="windowHeight-topViewHeight"></QSTabsWxs>
	</view>
</template>

<script>
	import QSTabsWxs from '@/components/QS-tabs-wxs/QS-tabs-wxs.vue';
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
			this.$refs.QSTabsWxs.setTabs(tabs);
			this.getTopViewHeight();
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
		justify-content: center;
		align-items: center;
		font-size:  18px;
		color: #666;
		background-color: white;
		padding-top: var(--status-bar-height);
	}
</style>
