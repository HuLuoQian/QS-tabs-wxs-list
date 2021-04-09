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
		hasRefresh
		refreshImage="/static/refresh.png"
		activeFontColor="#fff" 
		refreshTextColor="#fff"
		tabsFontColor="rgba(255,255,255,.7)" 
		tabsBackgroundColor="#000" 
		swiperBackgroundColor="#000" 
		minWidth="125rpx" 
		type="index"
		defCurrent="2"
		:height="windowHeight-topViewHeight"></QSTabsWxs>
	</view>
</template>

<script>
	import QSTabsWxs from '@/components/QS-tabs-wxs-list/QS-tabs-wxs-list.vue';
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
					id: name,
					swiperBackgroundColor: randomColor1(),
					lineColor: randomColor1(),
					tabsBackgroundColor: randomColor1()
				}
			});
			let s = 0;
			let tabs2 = Array(50).fill('').map(() => {
				const name = 'tab_' + s++;
				return {
					name,
					id: name
				}
			});
			console.log(JSON.stringify(tabs))
			this.$refs.QSTabsWxs.setTabs(tabs);
			this.getTopViewHeight();
			// this.$refs.QSTabsWxs.setDisabled(true);	//	禁用组件
			setTimeout(()=>{
				// this.$refs.QSTabsWxs.setTabs(tabs2);	//重置tabs测试
				// this.$refs.QSTabsWxs.setDisabled(false);	//	取消禁用组件
			}, 3000)
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
