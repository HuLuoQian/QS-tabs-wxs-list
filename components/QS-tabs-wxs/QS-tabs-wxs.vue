<template>
	<view class="container">
		<view class="tabs-container">
			<scroll-view 
			id="tabs-scroll"
			scroll-x 
			:scroll-left="scrollLeft"
			class="tabs-scroll" 
			scroll-with-animation>
				<view 
				class="tabs-scroll-box"
				:style="{
					'height': tabHeight,
					'line-height': tabHeight,
					'font-size': fontSize
				}">
					<view 
					class="tabs-scroll-item" 
					:style="{
						'width': minWidth
					}"
					v-for="(item, index) in tabs" 
					:id="preId + index"
					:key="index"
					@tap="tabTap(index)">
						{{item.name || item}}
					</view>
					
					<view 
					id="line" 
					class="line"
					:style="{
						'transition-duration': duration,
						'width': lineWidth,
						'height': lineHieght,
						'background-color': lineColor
					}">
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="swiper-container">
			<swiper 
			id="swiper"
			:style="{
				'height': getSwiperHieght + 'px',
				'background-color': '#f8f8f8'
			}"
			:current="getSwiperCurrent"
			@transition="QSTABSWXS.transition"
			:change:tabsInfo="QSTABSWXS.tabsInfoChange"
			:tabsInfo="tabsInfo"
			:data-tabsinfo="tabsInfo"
			:data-current="getCurrent"
			:data-windowwidth="windowWidth"
			@animationfinish="QSTABSWXS.animationfinish">
				<swiper-item v-for="(item, index) in tabs" :key="index">
					<templateDef ref="QSTabsWxsRef" :tab="item" :index="index"></templateDef>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script lang="wxs" module="QSTABSWXS" src="./wxs/QS-tabs-wxs.wxs"></script>

<script>
	import templateDef from './components/QS-tabs-wxs-template-def.vue';
	const {windowWidth} = uni.getSystemInfoSync();
	export default {
		components: {
			templateDef
		},
		props: {
			minWidth: {
				type: String,
				default: '250rpx'
			},
			tabHeight: {
				type: String,
				default: '44px'
			},
			height: {
				type: [Number, String],
				default: 500
			},
			duration: {
				type: String,
				default: '.2s'
			},
			lineWidth: {
				type: String,
				default: '80rpx'
			},
			lineHieght: {
				type: String,
				default: '2px'
			},
			lineColor: {
				type: String,
				default: '#f1505c'
			},
			defCurrent: {
				type: [Number, String],
				default: 0
			},
			autoCenter: {
				type: Boolean,
				default: true
			},
			tapTabRefresh: {
				type: Boolean,
				default: true
			},
			fontSize: {
				type: String,
				default: '28rpx'
			}
		},
		data() {
			return {
				preId: 'QSTabsWxsID_',
				refPre: 'QSTabsWxsRef',
				tabs: [],
				tabsData: [],
				tabsInfo: [],
				windowWidth,
				current: 0,
				swiperCurrent: 0,
				scrollLeft: 0,
				count: 0,
				initStatus: [],
				tabsHeight: 44
			}
		},
		computed: {
			getCurrent() {
				return this.current>this.tabs.length?this.tabs.length:this.current;
			},
			getSwiperCurrent() {
				return this.swiperCurrent>this.tabs.length?this.tabs.length:this.swiperCurrent;
			},
			getSwiperHieght() {
				return Number(this.height) - Number(this.tabsHeight);
			}
		},
		methods: {
			getTabsHeight() {
				let view = uni.createSelectorQuery().in(this);
				view.select('.tabs-container').boundingClientRect();
				view.exec(res=>{
					console.log('tabs高度:' + JSON.stringify(res));
					this.tabsHeight = res[0].height;
				})
			},
			getTabsInfo(returnPromise) {
				let view = uni.createSelectorQuery().in(this);
				let scroll = uni.createSelectorQuery().in(this);
				scroll.select('#tabs-scroll').fields({ scrollOffset: true });
				for (let i = 0; i < this.tabs.length; i++) {
					view.select('#' + this.preId + i).boundingClientRect();
				}
				const fn = (cb) => {
					// console.log('fn执行');
					scroll.exec((data)=>{
						// console.log('scroll布局信息:' + JSON.stringify(data));
						view.exec((res) => {
							// console.log('tabs布局信息:' + JSON.stringify(res));
							const arr = [];
							for (let i = 0; i < res.length; i++) {
								const item = res[i];
								if(item) {
									item.left += data[0].scrollLeft;
									// #ifdef H5
									arr.push(JSON.stringify(item));
									// #endif
									// #ifndef H5
									arr.push(item);
									// #endif
								}
							}
							// #ifdef H5
							this.tabsInfo = JSON.stringify(arr);
							// #endif
							// #ifndef H5
							this.tabsInfo = arr;
							// #endif
							// console.log('tabsInfo:' + JSON.stringify(arr));
							if(cb && typeof cb === 'function') cb(arr);
						})
					})
				}
				if(returnPromise) {
					return new Promise((resolve, reject)=>{
						fn((arr)=>{
							resolve(arr);
						});
					})
				}
				fn();
			},
			setTabs(arr) {
				this.tabs = arr;
				this.initStatus = new Array(arr.length);
				this.$nextTick(()=>{	//H5需要nextTick后能拿到布局信息
					setTimeout(()=>{	//QQ小程序需要setTimeout后能拿到布局信息
						this.getTabsInfo();
						if(this.count++ === 0) {
							const defCurrent = this._getDefCurrent();
							this.swiperCurrent = defCurrent;
							this._doInit({index: defCurrent, init: true});
							this.getTabsHeight();
						}
					}, 0)
				})
			},
			_doInit({index, init, tap, slide} = {}) {
				try{
					const bl_status = this.initStatus[index] === true;
					const bl_tapTabRefresh =  this.tapTabRefresh;
					if(bl_status && slide) return;
					if(bl_status && tap) {
						if(!bl_tapTabRefresh) return;
						if(!(this.current === index)) {
							return;
						}
					}
					if(bl_status && init) return;
					
					const ref = this.$refs[this.refPre][index];
					if(ref && ref.init && typeof ref.init === 'function') {
						this.initStatus[index] = true;
						ref.init();
					}else{
						console.log('not find ref or init function');
					}
				}catch(e){
					//TODO handle the exception
					console.log('_doInit方法异常:' + JSON.stringify(e));
				}
			},
			_getDefCurrent() {
				const defCurrent = Number(this.defCurrent);
				const endCurrent = this.tabs.length-1;
				return defCurrent>endCurrent?endCurrent:defCurrent;
			},
			setCurrent(obj) {	//由wxs内部触发
				// console.log('设置current:' + JSON.stringify(obj));
				const current = Number(obj.current);
				this.current = current;
				this.swiperCurrent = current;
				this._doInit({index: current, slide: true});
			},
			tabTap(index) {
				this.swiperCurrent = index;
				this._doInit({index, tap: true});
			},
			setScrollLeft(obj) {
				// console.log('setScrollLeft:' + JSON.stringify(obj));
				if(!this.autoCenter && !Boolean(obj.tabsChange)) return;
				this.scrollLeft = Number(obj.scrollLeft);
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
	.container{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.tabs-container{
		width: 100%;
	}
	.tabs-scroll{
		width: 100%;
		white-space: nowrap;
		position: relative;
	}
	.tabs-scroll-box{
		position: relative;
		display: flex;
		white-space: nowrap !important;
		display: block !important;
	}
	.tabs-scroll-item{
		display: inline-block;
		text-align: center;
	}
	.swiper-container{
		width: 100%;
	}
	.line{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 0;
		transition-property: width, height, background-color, border;
		transition-duration: .2s;
		transform: translate(-50%, -100%);
	}
</style>
