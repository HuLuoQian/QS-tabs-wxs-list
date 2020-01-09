<template>
	<view class="container">
		<view 
		class="tabs-container"
		:style="{
			'background-color': tabs[getSwiperCurrent]?(tabs[getSwiperCurrent].tabsBackgroundColor || tabsBackgroundColor):tabsBackgroundColor
		}">
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
					'line-height': tabHeight
				}">
					<view 
					class="tabs-scroll-item" 
					:style="{
						'min-width': minWidth,
						'padding': '0 ' + space
					}"
					v-for="(item, index) in tabs" 
					:id="preId + index"
					:key="index"
					@tap="tabTap(index)">
						<view class="hide_text" 
						:style="{
							'font-size': fontSize,
							'opacity': 0
						}">
							{{item.name || item}}
						</view>
						<view class="abs_text"
						:style="{
							'font-size':  getSwiperCurrent===index?activeFontSize:fontSize,
							'color': getSwiperCurrent===index?(tabs[getSwiperCurrent]?(tabs[getSwiperCurrent].activeFontColor || activeFontColor || tabsFontColor):(activeFontColor || tabsFontColor)):tabsFontColor,
							'font-weight': String(activeBold)==='true'?(getSwiperCurrent===index?'bold':'0'):'0'
						}">
							{{item.name || item}}
						</view>
					</view>
					
					<!-- 'width': lineWidth>1?lineWidth + 'px':, -->
					<view 
					id="line" 
					class="line"
					:style="{
						'height': lineHieght,
						'width': wxsLineWidth + 'px',
						'bottom': lineMarginBottom,
						'background-color': tabs[getSwiperCurrent]?(tabs[getSwiperCurrent].lineColor || lineColor):lineColor
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
				'background-color': swiperBackgroundColor
			}"
			:current="getSwiperCurrent"
			@transition="QSTABSWXS.transition"
			:change:tabsInfo="QSTABSWXS.tabsInfoChange"
			:tabsInfo="tabsInfo"
			:data-tabsinfo="tabsInfo"
			:data-current="getCurrent"
			:data-windowwidth="windowWidth"
			:data-linewidth="lineWidth"
			:data-scrollleft="scrollLeft"
			:data-tabsinfochangebl="tabsInfoChangeBl"
			@change="QSTABSWXS.swiperChange"
			@animationfinish="QSTABSWXS.animationfinish">
				<swiper-item 
				v-for="(item, index) in tabs" 
				:key="index"
				class="swiper-item"
				:style="{
					'background-color': item.swiperItemBackgroundColor || 'rgba(255,255,255,0)'
				}">
					<templateDef ref="QSTabsWxsRef" :current="getCurrent" :tab="item" :index="index"></templateDef>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script lang="wxs" module="QSTABSWXS" src="./wxs/QS-tabs-wxs.wxs"></script>

<script>
	import _app from './js/config.js';
	import templateDef from './components/QS-tabs-wxs-template-def.vue';
	const {windowWidth} = uni.getSystemInfoSync();
	export default {
		components: {
			templateDef
		},
		props: {
			minWidth: {	//tab最小宽度
				type: String,
				default: '250rpx'
			},
			space: {	//tab间距, 左右padding值
				type: String,
				default: '10px'
			},
			tabHeight: {	//tabs高度
				type: String,
				default: '44px'
			},
			height: {	//组件总高度, 需外部计算并传入
				type: [Number, String],
				default: 500
			},
			lineWidth: {	//线条宽度，若小于1则当做百分比计算
				type: [Number, String],
				default: .7
			},
			lineHieght: {	//线条高度
				type: String,
				default: '2px'
			},
			lineColor: {	//线条颜色
				type: String,
				default: '#f1505c'
			},
			lineMarginBottom: {	//线条距离底部距离
				type: [Number, String],
				default: 0
			},
			defCurrent: {	//默认当前项
				type: [Number, String],
				default: 0
			},
			autoCenter: {	//scrollview自动居中
				type: Boolean,
				default: true
			},
			tapTabRefresh: {	//点击当前项tab触发组件内部init函数
				type: Boolean,
				default: true
			},
			fontSize: {	//tab默认字体大小
				type: String,
				default: '28rpx'
			},
			activeFontSize: {	//当前项字体大小
				type: String,
				default: '32rpx'
			},
			swiperBackgroundColor: {	//swiper背景颜色
				type: String,
				default: '#f8f8f8'
			},
			tabsBackgroundColor: {	//tabs背景颜色
				type: String,
				default: '#fff'
			},
			tabsFontColor: {	//tabs默认字体颜色
				type: String,
				default: '#999'
			},
			activeFontColor: {	//tabs当前项字体颜色
				type: String,
				default: '#000'
			},
			activeBold: {	//当前项字体加粗
				type: [Boolean, String],
				default: true
			},
			initFnName: {	//初始调用函数名称(组件内部)
				type: String,
				default: 'init'
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
				tabsHeight: 44,
				wxsLineWidth: 0,
				tabsInfoChangeBl: false
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
			setWxsLineWidth(lineWidth) {
				_app.log('触发了设置线条宽度:' + lineWidth);
				this.wxsLineWidth = lineWidth;
			},
			getTabsHeight() {
				let view = uni.createSelectorQuery().in(this);
				view.select('.tabs-container').boundingClientRect();
				view.exec(res=>{
					_app.log('tabs高度:' + JSON.stringify(res));
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
					// _app.log('fn执行');
					scroll.exec((data)=>{
						_app.log('scroll布局信息:' + JSON.stringify(data));
						view.exec((res) => {
							_app.log('tabs布局信息:' + JSON.stringify(res));
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
							this.tabsInfoChangeBl = !this.tabsInfoChangeBl;
							// #ifdef H5
							this.tabsInfo = JSON.stringify(arr);
							// #endif
							// #ifndef H5
							this.tabsInfo = arr;
							// #endif
							// _app.log('tabsInfo:' + JSON.stringify(arr));
							if(cb && typeof cb === 'function') cb(arr);
						})
					})
				}
				if(returnPromise) {
					return new Promise((resolve, reject)=>{
						setTimeout(()=>{
							fn((arr)=>{
								resolve(arr);
							});
						}, 200)
					})
				}
				fn();
			},
			setTabs(arr) {
				const fn = ()=>{
					this.tabs = arr;
					this.initStatus = new Array(arr.length);
					this.$nextTick(()=>{	//H5需要nextTick后能拿到布局信息
						setTimeout(async ()=>{	//QQ小程序需要setTimeout后能拿到布局信息
							await this.getTabsInfo(true);
							_app.log('初始化');
							const defCurrent = this._getDefCurrent();
							_app.log('defCurrent:' + defCurrent);
							this.swiperCurrent = defCurrent;
							this._doInit({index: defCurrent, init: true});
							this.getTabsHeight();
						}, 0)
					})
				}
				if(this.count++ === 0) {
					fn();
				}else{
					this.tabs = [];
					this.current = 0;
					this.swiperCurrent = 0;
					this.$nextTick(()=>{
						setTimeout(fn, 0);
					})
				}
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
					if(ref) {
						const initFn = ref[this.initFnName];
						if(initFn && typeof initFn === 'function') {
							_app.log('执行了组件内的init函数');
							this.initStatus[index] = true;
							initFn();
						}else{
							console.log(this.initFnName + 'not a function');
						}
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
				// _app.log('设置current:' + JSON.stringify(obj));
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
				_app.log('setScrollLeft:' + JSON.stringify(obj));
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
		transition: background-color .3s;
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
		position: relative;
		display: inline-block;
		text-align: center;
		transition: color, font-size .3s;
	}
	.abs_text{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition-property: color;
		transition-duration: .3s; 
	}
	.swiper-container{
		width: 100%;
	}
	.swiper-item{
		transition: background-color .3s;
	}
	.line{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 0;
		transition-property: width, height, background-color, border;
		transition-duration: .3s;
	}
</style>
