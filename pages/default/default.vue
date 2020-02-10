<template>
	<!-- <view class="content">
		<view class="topView"> 
			<view class="topViewItem" @tap="back">
				返回
			</view>
			<view class="">
				QS-tabs-wxs-list
			</view>
			<view class="topViewItem"></view>
		</view>
		<view style="height:1000px;width: 100%;"></view>
		<QSTabsWxs 
		ref="QSTabsWxs" 
		minWidth="125rpx"
		 type="default"
		 tabsSticky
		:height="200"></QSTabsWxs>
		<view style="height:1000px;width: 100%;"></view>
	</view> -->
	<view class="">
		<view class="topView">
			<view class="topViewItem" @tap="back">
				返回
			</view>
			<view class="">
				QS-tabs-wxs-list
			</view>
			<view class="topViewItem"></view>
		</view>
		<QSTabsWxsListRefresh 
		ref="QSTabsWxs" 
		minWidth="125rpx"
		 type="default"
		 tabsSticky
		 refreshImage="/static/refresh.png"
		:height="200">
			<view class="" style="width: 100%;" slot="pre">
				
				<view style="height:200px;width: 100%;"></view>
			</view>
			<view style="height:1000px;width: 100%;" slot="pos"></view>
		</QSTabsWxsListRefresh>
	</view>
</template>

<script>
	import QSTabsWxs from '@/components/QS-tabs-wxs-list/QS-tabs-wxs-list.vue';
	import QSTabsWxsListRefresh from '@/components/QS-tabs-wxs-list/QS-tabs-wxs-list-refresh.vue';
	const {windowHeight} = uni.getSystemInfoSync();
	function randomColor1(){
	           var r = Math.floor(Math.random()*256);
	           var g = Math.floor(Math.random()*256);
	           var b = Math.floor(Math.random()*256);
	            
	           if(r < 16){
	               r = "0"+r.toString(16);
	           }else{
	               r = r.toString(16);
	           }
	           if(g < 16){
	               g = "0"+g.toString(16);
	           }else{
	               g = g.toString(16);
	           }
	           if(b < 16){
	               b = "0"+b.toString(16);
	           }else{
	               b = b.toString(16);
	           }
	            
	           return "#"+r+g+b;
	       }
	export default {
		components: {
			QSTabsWxs,
			QSTabsWxsListRefresh
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
					id: name,
					hasRefreshContainerBackgroundColor: randomColor1()
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
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
	}
	.topView{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		height: 44px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size:  18px;
		padding: var(--status-bar-height) 20px 0 20px;
		z-index: 100;
		background-color: white;
	}
	.topViewItem{
		font-size: 16px;
		color: #999;
		width: 15%;
	}
</style>
