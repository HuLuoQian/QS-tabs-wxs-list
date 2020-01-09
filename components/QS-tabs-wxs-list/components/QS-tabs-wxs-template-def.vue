<!-- 该组件需自行实现, 此处只是示例 -->
<template>
	<view class="container">
		<scroll-view 
		scroll-y 
		class="scrollView"  
		lower-threshold="200"
		@scrolltolower="getList(false, false, false)">
			<view class="scroll-container">
				<!-- 自行实现页面样式展示 -->
				<view class="scroll-item" v-for="(item, index) in list" :key="index">
					<image 
					class="scroll-item-image"
					src="http://imgsrc.baidu.com/forum/w%3D580/sign=f480662e3cadcbef01347e0e9cae2e0e/8f5b1cd8bc3eb13517d8e851ab1ea8d3fc1f4489.jpg" 
					mode="aspectFill"></image>
					<view class="scroll-item-text">
						{{item}}
					</view>
				</view>
				<!-- 列表状态展示 -->
				<view class="statusText" @tap="getList(false, true, false)">
					{{statusText.text || '数据未加载'}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getTabList
	} from '@/util/getTabList.js';
	import {
		doPageDemand
	} from '../js/pageDemand.js';
	export default {
		props: {
			tab: {
				type: [Object, String],
				default () {
					return {}
				}
			},
			index: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				list: [],
				sendData: {
					pageNum: 1,
					pageSize: 10,
					tabId: this.tab.id
				},
				statusText: {}
			}
		},
		created() {
			// console.log('component - created - tab:' + this.tab);
			// console.log('component - created - index:' + this.index);
		},
		methods: {
			init() {
				// console.log('component - init - index:' + this.index);
				this.getList(true);
			},
			getList(refresh, doEvent, force) {
				doPageDemand.call(this, {
					getDataFn: getTabList, //获取数据的方法
					fail() {
						console.log('访问接口失败');
					}, //接口访问失败回调

					sendDataName: 'sendData', //携带数据字段名称
					pageNumName: 'pageNum', //携带数据中的页数字段名称
					pageSizeName: 'pageSize', //携带数据中的条数字段名称

					checkLastPageMode: false, //判断是否是最后一页的逻辑标识, 用于逻辑判断, 目前默认有两个参数 size: 判断条数, page: 判断页数, 默认为size
					newDatafields: 'list', //接口访问成功后获取列表数据字段名称, 可用. 链式获取
					dataLastPageName: false, //接口访问成功后数据中的最大页数字段名称, 可用. 链式获取
					sizeName: false, //接口访问成功后数据中条数字段名称, 可用. 链式获取

					setName: 'list', //页面中列表数据字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略
					statusTextName: 'statusText', //页面中列表状态字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略
					lastPageName: false, //页面中最后一页字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略
					waitingName: false, //页面中获取数据等待字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略

					refresh, //刷新标识, 若为true则会将携带数据中的页数重置为1
					force, //强制标识, 若为true则会忽略等待标识为true时的跳过操作
					doEvent, //进入状态判断标识, 若为true则会进入判断列表status而进行相应操作

					noDataText: false	//访问接口后若数据长度为0则可自定义为空时文字
				})
			}
		}
	}
</script>

<style scoped>
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video,
	picker-view,
	picker-view-column {
		box-sizing: border-box;
	}
	.container {
		width: 100%;
		height: 100%;
	}

	.scrollView {
		width: 100%;
		height: 100%;
	}
	
	.scroll-container{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx;
	}
	
	.scroll-item{
		width: 100%;
		padding: 28rpx;
		background-color: white;
		border-radius: 8px;
		display: flex;
		flex-direction: row;
		margin-bottom: 35rpx;
	}
	
	.scroll-item-image{
		background-color: #F8F8F8;
		border-radius: 8px;
		height: 220rpx;
		width: 40%;
	}
	
	.scroll-item-text{
		width: 55%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		color: #666;
	}
	
	.statusText {
		height: 40px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: #fff;
	}
	
</style>
