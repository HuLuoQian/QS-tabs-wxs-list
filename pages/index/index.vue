<template>
	<view class="content">
		<view class="topView">QS-tabs-wxs-list</view>
		<QSTabsWxs ref="QSTabsWxs" activeFontColor="#fff" tabsFontColor="rgba(255,255,255,.7)" tabsBackgroundColor="#000" swiperBackgroundColor="#000" minWidth="100rpx" defCurrent="2" :height="windowHeight-topViewHeight"></QSTabsWxs>
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
					color: randomColor1(),
					tabsBackgroundColor: randomColor1()
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
		background-color: #000;
		color: #fff;
		padding-top: var(--status-bar-height);
	}
</style>
