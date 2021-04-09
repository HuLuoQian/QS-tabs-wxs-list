<template>
	<view class="container" :style="{
		'z-index': zIndex
	}">
		<!-- 顶部tabs -->
		<view v-if="tabsPosition === 'top'" class="tabs-container" :style="{
			'position': String(tabsSticky)==='true'?'sticky': 'relative',
			'z-index': Number(zIndex) + 2,
			'background-color': tabs[getSwiperCurrent]?(tabs[getSwiperCurrent].tabsBackgroundColor || tabsBackgroundColor):tabsBackgroundColor
		}">
			<scroll-view id="tabs-scroll" scroll-x :scroll-left="scrollLeft" class="tabs-scroll" scroll-with-animation>
				<view class="tabs-scroll-box" :style="{
					'height': tabHeight,
					'line-height': tabHeight
				}">
					<view class="tabs-scroll-item" :style="{
						'min-width': minWidth,
						'padding': '0 ' + space
					}" v-for="(item, index) in tabs"
					 :id="preId + index" :key="index" @tap="tabTap(index)">
						<view class="hide_text" :style="{
							'font-size': fontSize
						}">
							{{item.name || item}}
						</view>
						<view class="abs_text" :style="{
							'font-size':  getSwiperCurrent===index?activeFontSize:fontSize,
							'color': getSwiperCurrent===index?(tabs[getSwiperCurrent]?(tabs[getSwiperCurrent].activeFontColor || activeFontColor || tabsFontColor):(activeFontColor || tabsFontColor)):tabsFontColor,
							'font-weight': String(activeBold)==='true'?(getSwiperCurrent===index?'800':'400'):'400'
						}">
							{{item.name || item}}
						</view>
					</view>

					<view v-if="nContentMode === 'swiper'" id="line" class="line" :style="{
						'height': lineHieght,
						'width': wxsLineWidth + 'px',
						'bottom': lineMarginBottom,
						'background-color': tabs[getSwiperCurrent]?(tabs[getSwiperCurrent].lineColor || lineColor):lineColor
					}">
					</view>
					<view v-else-if="nContentMode === 'vShow'" class="vShow-line" :style="{
						'height': lineHieght,
						'width': (Number(lineWidth)>1?Number(lineWidth):Number(lineWidth)*(tabsInfo[getSwiperCurrent]?tabsInfo[getSwiperCurrent].width:0)) + 'px',
						'transform': 'translateX(' + (tabsInfo[getSwiperCurrent]?(tabsInfo[getSwiperCurrent].left + tabsInfo[getSwiperCurrent].width/2 - (((Number(lineWidth)>1?Number(lineWidth):Number(lineWidth)*(tabsInfo[getSwiperCurrent]?tabsInfo[getSwiperCurrent].width:0)))/2)):0) + 'px)',
						'bottom': lineMarginBottom,
						'background-color': tabs[getSwiperCurrent]?(tabs[getSwiperCurrent].lineColor || lineColor):lineColor
					}"></view>
				</view>
			</scroll-view>
		</view>

		<!-- content -->
		<view class="swiper-container" :style="{
			'z-index': Number(zIndex) + 1,
			'background-color': tabs[getSwiperCurrent]?(tabs[getSwiperCurrent].swiperBackgroundColor||swiperBackgroundColor):swiperBackgroundColor
		}">
			<!-- swiper -->
			<block v-if="nContentMode === 'swiper'">
				<!-- #ifdef APP-PLUS || MP-WEIXIN || H5 || MP-QQ -->
				<!-- 下拉刷新 -->
				<block v-if="nContentMode === 'swiper' && String(hasRefresh) === 'true'">
					<view class="refresh-container" id="refresh-container" @touchstart="QSREFRESHWXS.touchstart" @touchmove="QSREFRESHWXS.touchmove"
					 @touchend="QSREFRESHWXS.touchend" @touchcancel="QSREFRESHWXS.touchend" :refreshstatus="refreshStatus"
					 :refreshdistance="refreshDistance" :readyrefresh="readyRefresh" :refreshshow="refreshShow" :curreadyrefresh="curReadyRefresh"
					 :change:refreshstatus="QSREFRESHWXS.refreshStatusChange" :change:refreshshow="QSREFRESHWXS.refreshShowChange"
					 :change:readyrefresh="QSREFRESHWXS.readyRefreshChange" :change:refreshdistance="QSREFRESHWXS.refreshDistanceChange"
					 :change:curreadyrefresh="QSREFRESHWXS.curReadyRefreshChange">
						<view class="refresh-image-container" :style="{ 
							'height': refreshDistance + 'px'
						}">
							<image id="refreshImage" v-if="refreshImage" :src="refreshImage" mode="scaleToFill" class="refresh-image" :class="{'isRefreshing': isRefreshing}"></image>
							<view class="refreshText" :style="{
								'font-size': refreshTextFontSize,
								'color': refreshTextColor
							}">{{refreshStatusText}}</view>
						</view>
						<swiper id="swiper" class="swiper" :style="{
							'height': getSwiperHieght + 'px'
						}" :current="getSwiperCurrent"
						 @transition="QSTABSWXS.transition" :change:tabsInfo="QSTABSWXS.tabsInfoChange" :tabsInfo="tabsInfo"
						 :data-tabsinfo="tabsInfo" :data-current="getCurrent" :data-windowwidth="windowWidth" :data-linewidth="lineWidth"
						 :data-scrollleft="scrollLeft" :data-tabsinfochangebl="tabsInfoChangeBl" :data-componentid="componentId" @change="QSTABSWXS.swiperChange"
						 @animationfinish="QSTABSWXS.animationfinish">
							<swiper-item v-for="(item, index) in tabs" :key="index" class="swiper-item" :style="{
								'background-color': item.swiperItemBackgroundColor || 'rgba(255,255,255,0)'
							}">
								<QSTabsListTemplate :ref="refPre" :readyRefresh="getCurrent===index?Boolean(readyRefresh):false" :show="readyRefresh?
									(getCurrent===index):
									(((index-getCurrent)<=1 && (index-getCurrent)>=-1)?
									true:false)"
								 :type="type" :current="getCurrent" :tab="item" :index="index" @refreshEnd="setRefreshStatus" @scrollFn="scrollFn"
								 :refreshDistance="Number(refreshDistance)" :customData="nCustomData"></QSTabsListTemplate>
							</swiper-item>
						</swiper>
					</view>
				</block>
				<!-- 没有下拉刷新 -->
				<block v-else>
					<swiper id="swiper" class="swiper" :style="{
					'height': getSwiperHieght + 'px'
				}" :current="getSwiperCurrent"
					 @transition="QSTABSWXS.transition" :change:tabsInfo="QSTABSWXS.tabsInfoChange" :tabsInfo="tabsInfo"
					 :data-tabsinfo="tabsInfo" :data-current="getCurrent" :data-windowwidth="windowWidth" :data-linewidth="lineWidth"
					 :data-scrollleft="scrollLeft" :data-tabsinfochangebl="tabsInfoChangeBl" :data-componentid="componentId" @change="QSTABSWXS.swiperChange"
					 @animationfinish="QSTABSWXS.animationfinish">
						<swiper-item v-for="(item, index) in tabs" :key="index" class="swiper-item" :style="{
						'background-color': item.swiperItemBackgroundColor || 'rgba(255,255,255,0)'
					}">
							<QSTabsListTemplate :ref="refPre" :readyRefresh="getCurrent===index?readyRefresh:false" :show="readyRefresh?
							(getCurrent===index):
							(((index-getCurrent)<=1 && (index-getCurrent)>=-1)?
							true:false)"
							 :type="type" :current="getCurrent" :tab="item" :index="index" 
							 @refreshEnd="setRefreshStatus" @scrollFn="scrollFn" :customData="nCustomData"></QSTabsListTemplate>
						</swiper-item>
					</swiper>
				</block>
				<!-- #endif -->
			</block>
			<!-- vShow -->
			<block v-else-if="nContentMode === 'vShow'">
				<!-- 有下拉刷新 -->
				<block v-if="String(hasRefresh) === 'true'">
					<!-- #ifdef APP-PLUS || MP-WEIXIN || H5 || MP-QQ -->
					<view class="refresh-container" id="refresh-container" @touchstart="QSREFRESHWXS.touchstart" @touchmove="QSREFRESHWXS.touchmove"
					 @touchend="QSREFRESHWXS.touchend" @touchcancel="QSREFRESHWXS.touchend" :refreshdistance="refreshDistance"
					 :readyrefresh="readyRefresh" :refreshshow="refreshShow" :refreshstatus="refreshStatus" :curreadyrefresh="curReadyRefresh"
					 :change:refreshstatus="QSREFRESHWXS.refreshStatusChange" :change:refreshshow="QSREFRESHWXS.refreshShowChange"
					 :change:readyrefresh="QSREFRESHWXS.readyRefreshChange" :change:refreshdistance="QSREFRESHWXS.refreshDistanceChange"
					 :change:curreadyrefresh="QSREFRESHWXS.curReadyRefreshChange">
						<view class="refresh-image-container" :style="{ 
							'height': refreshDistance + 'px'
						}">
							<image id="refreshImage" v-if="refreshImage" :src="refreshImage" mode="scaleToFill" class="refresh-image" :class="{'isRefreshing': isRefreshing}"></image>
							<view class="refreshText" :style="{
								'font-size': refreshTextFontSize,
								'color': refreshTextColor
							}">{{refreshStatusText}}</view>
						</view>
						<view class="vShowView" id="swiper" :style="{ 'height': getSwiperHieght + 'px' }">
							<view class="vShow-item" v-for="(item, index) in tabs" :class="{
								'vShow-active': getCurrent===index
							}"
							 :key="index" :style="{ 
								'background-color': item.swiperItemBackgroundColor || 'rgba(255,255,255,0)',
								'z-index': getCurrent===index?(Number(zIndex) + 3):(Number(zIndex) + 2)
							}">
								<QSTabsListTemplate :ref="refPre" :readyRefresh="getCurrent===index?readyRefresh:false" :show="getCurrent===index"
								 :type="type" :current="getCurrent" :tab="item" :index="index" @refreshEnd="setRefreshStatus" @scrollFn="scrollFn"
								 :refreshDistance="Number(refreshDistance)" :customData="nCustomData"></QSTabsListTemplate>
							</view>
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef APP-PLUS || MP-WEIXIN || H5 || MP-QQ -->
					<view class="refresh-container" id="refresh-container" :animation="refresh_animationData" @touchstart="_vShow_touchstart"
					 @touchmove="_vShow_touchmove" @touchend="_vShow_touchend" @touchcancel="_vShow_touchend">
						<view class="refresh-image-container" :style="{ 
							'height': refreshDistance + 'px'
						}">
							<image id="refreshImage" v-if="refreshImage" :src="refreshImage" :animation="refresh_img_animationData" mode="scaleToFill"
							 class="refresh-image" :class="{'isRefreshing': isRefreshing}"></image>
							<view class="refreshText" :style="{
								'font-size': refreshTextFontSize,
								'color': refreshTextColor
							}">{{refreshStatusText}}</view>
						</view>

						<view class="vShowView" :style="{ 'height': getSwiperHieght + 'px' }">
							<view class="vShow-item" v-for="(item, index) in tabs" :class="{
								'vShow-active': getCurrent===index
							}"
							 :key="index" :style="{ 
								'background-color': item.swiperItemBackgroundColor || 'rgba(255,255,255,0)',
								'z-index': getCurrent===index?(Number(zIndex) + 3):(Number(zIndex) + 2)
							}">
								<QSTabsListTemplate :ref="refPre" :readyRefresh="getCurrent===index?readyRefresh:false" :show="getCurrent===index"
								 :type="type" :current="getCurrent" :tab="item" :index="index" 
								 @refreshEnd="setRefreshStatus" @scrollFn="scrollFn" :customData="nCustomData"></QSTabsListTemplate>
							</view>
						</view>
					</view>
					<!-- #endif -->
				</block>
				<!-- 没有下拉刷新 -->
				<block v-else>
					<view class="vShowView" :style="{ 'height': getSwiperHieght + 'px' }">
						<view class="vShow-item" v-for="(item, index) in tabs" :class="{
							'vShow-active': getCurrent===index
						}"
						 :key="index" :style="{ 
							'background-color': item.swiperItemBackgroundColor || 'rgba(255,255,255,0)',
							'z-index': getCurrent===index?(Number(zIndex) + 3):(Number(zIndex) + 2)
						}">
							<QSTabsListTemplate :ref="refPre" :readyRefresh="getCurrent===index?readyRefresh:false" :show="getCurrent===index"
							 :type="type" :current="getCurrent" :tab="item" :index="index" 
							 @refreshEnd="setRefreshStatus" @scrollFn="scrollFn" :customData="nCustomData"></QSTabsListTemplate>
						</view>
					</view>
				</block>
			</block>
		</view>

		<!-- 底部tabs -->
		<view v-if="tabsPosition === 'bottom'" class="tabs-container" :style="{
			'position': String(tabsSticky)==='true'?'sticky': 'relative',
			'z-index': Number(zIndex) + 2,
			'background-color': tabs[getSwiperCurrent]?(tabs[getSwiperCurrent].tabsBackgroundColor || tabsBackgroundColor):tabsBackgroundColor
		}">
			<scroll-view id="tabs-scroll" scroll-x :scroll-left="scrollLeft" class="tabs-scroll" scroll-with-animation>
				<view class="tabs-scroll-box" :style="{
					'height': tabHeight,
					'line-height': tabHeight
				}">
					<view class="tabs-scroll-item" :style="{
						'min-width': minWidth,
						'padding': '0 ' + space
					}" v-for="(item, index) in tabs"
					 :id="preId + index" :key="index" @tap="tabTap(index)">
						<view class="hide_text" :style="{
							'font-size': fontSize
						}">
							{{item.name || item}}
						</view>
						<view class="abs_text" :style="{
							'font-size':  getSwiperCurrent===index?activeFontSize:fontSize,
							'color': getSwiperCurrent===index?(tabs[getSwiperCurrent]?(tabs[getSwiperCurrent].activeFontColor || activeFontColor || tabsFontColor):(activeFontColor || tabsFontColor)):tabsFontColor,
							'font-weight': String(activeBold)==='true'?(getSwiperCurrent===index?'800':'400'):'400'
						}">
							{{item.name || item}}

						</view>
					</view>

					<view v-if="nContentMode === 'swiper'" id="line" class="line" :style="{
						'height': lineHieght,
						'width': wxsLineWidth + 'px',
						'bottom': lineMarginBottom,
						'background-color': tabs[getSwiperCurrent]?(tabs[getSwiperCurrent].lineColor || lineColor):lineColor
					}"></view>
					<view v-else-if="nContentMode === 'vShow'" class="vShow-line" :style="{
						'height': lineHieght,
						'width': (Number(lineWidth)>1?Number(lineWidth):Number(lineWidth)*(tabsInfo[getSwiperCurrent]?tabsInfo[getSwiperCurrent].width:0)) + 'px',
						'transform': 'translateX(' + (tabsInfo[getSwiperCurrent]?(tabsInfo[getSwiperCurrent].left + tabsInfo[getSwiperCurrent].width/2 - (((Number(lineWidth)>1?Number(lineWidth):Number(lineWidth)*(tabsInfo[getSwiperCurrent]?tabsInfo[getSwiperCurrent].width:0)))/2)):0) + 'px)',
						'bottom': lineMarginBottom,
						'background-color': tabs[getSwiperCurrent]?(tabs[getSwiperCurrent].lineColor || lineColor):lineColor
					}"></view>
				</view>
			</scroll-view>
		</view>

		<!-- #ifdef MP -->
		<view class="disabled" :style="{
			'z-index': Number(zIndex) + 3
		}" v-if="disabled" @touchmove.prevent="_emit('disabledTouchmove')"
		 @tap.prevent="_emit('disabledTap')"></view>
		<!-- #endif -->

		<!-- #ifndef MP -->
		<view class="disabled" :style="{
		'z-index': Number(zIndex) + 3
		}" v-if="disabled" @touchmove.stop="_emit('disabledTouchmove')"
		 @tap.stop="_emit('disabledTap')"></view>
		<!-- #endif -->

		<!-- #ifdef MP -->
		<view class="disabled" :style="{
			'z-index': Number(zIndex) + 4
		}" v-show="ndisabled" @touchmove.prevent="voidFn"
		 @tap.prevent="voidFn"></view>
		<!-- #endif -->

		<!-- #ifndef MP -->
		<view class="disabled" :style="{
		'z-index': Number(zIndex) + 4
		}" v-show="ndisabled" @touchmove.stop="voidFn"
		 @tap.stop="voidFn"></view>
		<!-- #endif -->
	</view>
</template>

<!-- #ifdef APP-PLUS || MP-WEIXIN || H5 || MP-QQ -->
<script lang="wxs" module="QSTABSWXS" src="./wxs/QS-tabs-wxs.wxs"></script>
<script lang="wxs" module="QSREFRESHWXS" src="./wxs/QS-refresh-wxs.wxs"></script>
<!-- #endif -->

<script>
	import _app from './js/config.js';
	import QSTabsListTemplate from './components/QS-tabs-wxs-list-template.vue';
	import publicProps from './js/publicProps.js';
	const Sys = uni.getSystemInfoSync();
	var QSComponentId = 0;
	var vShow_touchstart = 0;
	var vShow_touchmove = 0;
	var vShow_touchend = true;
	var scrollTopArr = [];
	var start_scrollFn_timeout_fn = false;
	var vShowDefDuration = 300;
	let hasWxs = false;
	// #ifdef APP-PLUS || MP-WEIXIN || H5 || MP-QQ
	hasWxs = true;
	// #endif
	export default {
		provide: {
			nRefreshInstance: 90
		},
		components: {
			QSTabsListTemplate
		},
		props: publicProps,
		data() {
			let nContentMode = 'vShow';
			const isAndroid = Sys.platform.toLocaleLowerCase() === 'android';
			// #ifdef APP-PLUS || MP-WEIXIN || H5 || MP-QQ
			if (this.contentMode === 'default') {
				if (isAndroid) {
					nContentMode = _app.checkContentMode(Sys) || 'vShow';
				} else {
					nContentMode = 'swiper';
				}
			} else {
				switch (this.contentMode) {
					case 'swiper':
						if (isAndroid) {
							nContentMode = _app.checkContentMode(Sys) || 'vShow';
						} else {
							nContentMode = this.contentMode;
						}
						break;
					default:
						nContentMode = this.contentMode;
						break;
				}
			}
			// #endif
			// #ifndef APP-PLUS || MP-WEIXIN || H5 || MP-QQ
			nContentMode = 'vShow';
			// #endif
			if (nContentMode === 'vShow') {
				if (isAndroid) {
					let dur = _app.checkvShowDuration(Sys);
					dur = typeof dur === 'number' ? dur : 300;
					vShowDefDuration = dur;
				} else {
					vShowDefDuration = 0;
				}
			}
			return {
				componentId: 'QSComponentId_' + QSComponentId++,
				preId: 'QSTabsWxsID_',
				refPre: 'QSTabsWxsRef',
				tabs: [],
				tabs_copy: [],
				tabsInfo: [],
				windowWidth: Sys.windowWidth,
				current: 0,
				swiperCurrent: 0,
				scrollLeft: 0,
				count: 0,
				initStatus: [],
				tabsHeight: 44,
				wxsLineWidth: 0,
				tabsInfoChangeBl: false,
				disabled: false,
				ndisabled: false,
				refreshStatus: 1,
				refreshStatusText: this.beforRefreshText,
				isRefreshing: false,
				readyRefresh: false,
				refreshShow: false,
				nContentMode,

				refresh_Ani: null,
				refresh_animationData: {},

				refresh_img_Ani: null,
				refresh_img_animationData: {},

				scrollFn_timeout: null,

				curReadyRefresh: true,
				
				nCustomData: this.customData
			}
		},
		computed: {
			getCurrent() {
				return this.current > this.tabs.length ? this.tabs.length : this.current;
			},
			getSwiperCurrent() {
				return this.swiperCurrent > this.tabs.length ? this.tabs.length : this.swiperCurrent;
			},
			getSwiperHieght() {
				return this.height ? (Number(this.height) - Number(this.tabsHeight)) : Sys.windowHeight;
			},
			isVShowAndNotWxs() {
				return this.nContentMode === 'vShow' && !hasWxs;
			}
		},
		watch: {
			customData(newValue) {
				this.setCustomData(newValue);
			}
		},
		created() {
			if (this.nContentMode === 'vShow' && !hasWxs) {
				this.refresh_Ani = uni.createAnimation({
					duration: vShowDefDuration
				});
				this.refresh_img_Ani = uni.createAnimation({
					duration: vShowDefDuration
				})
			}
		},
		methods: {
			setCustomData(customData) {
				this.nCustomData = customData;
			},
			_vShow_touchstart(e) {
				vShow_touchend = false;
				start_scrollFn_timeout_fn = false;
				if (this.tabs_copy[this.getCurrent].readyRefresh && !this.isRefreshing) {
					vShow_touchstart = e.touches[0].clientY;
				}
			},
			_vShow_touchmove(e) {
				if (e.touches.length > 1) return;
				if (this.tabs_copy[this.getCurrent].readyRefresh && !this.isRefreshing) {
					vShow_touchmove = e.touches[0].clientY;
					let distance = e.touches[0].clientY - vShow_touchstart;
					distance = distance >= 0 ? distance : 0;
					this._vShow_setRefreshY(distance * .5);
					this._vShow_setRefreshImage_r(distance * 10);

					if (distance > this.refreshDistance / 0.5) {
						this.setRefreshStatus(2);
					} else {
						this.setRefreshStatus(1);
					}
				}
			},
			_vShow_touchend(e) {
				vShow_touchend = true;
				if (this.tabs_copy[this.getCurrent].readyRefresh && !this.isRefreshing) {
					if (vShow_touchmove - vShow_touchstart > this.refreshDistance / 0.5) {
						this._vShow_setRefreshY(this.refreshDistance, {
							duration: 300
						});
					} else {
						this._vShow_setRefreshY(0, {
							duration: 300
						});
						this._vShow_setRefreshImage_r(0, {
							duration: 300
						});
					}

					if (this.refreshStatus === 2) {
						this.setRefreshStatus(3);
					}
				}
				if (!start_scrollFn_timeout_fn) {
					start_scrollFn_timeout_fn = true;
					this.scrollFn_timeout = setTimeout(this.scrollFn_timeout_fn, 100)
				}
			},
			scrollFn(obj) {
				// console.log('scrollFn:' + obj.scrollTop);
				if (this.scrollFn_timeout) clearTimeout(this.scrollFn_timeout)
				scrollTopArr.push(obj);
				this.tabs_copy[obj.index].scrollTop = obj.scrollTop;
				if (vShow_touchend) {
					start_scrollFn_timeout_fn = true;
					this.scrollFn_timeout = setTimeout(this.scrollFn_timeout_fn, 100)
				}
			},
			scrollFn_timeout_fn() {
				// console.log(scrollTopArr.length);
				if (scrollTopArr.length > 0) {
					const end = scrollTopArr.length - 1;
					if (scrollTopArr[end].scrollTop < 15) {
						this.tabs_copy[this.getCurrent].readyRefresh = true;
					} else {
						if (scrollTopArr.length > 1) {
							const meanValue = (Math.abs(scrollTopArr[scrollTopArr.length - 1].scrollTop - scrollTopArr[0].scrollTop)) /
								scrollTopArr.length;
							if (scrollTopArr[scrollTopArr.length - 2].scrollTop > scrollTopArr[scrollTopArr.length - 1].scrollTop) {
								this.tabs_copy[this.getCurrent].readyRefresh = (scrollTopArr[scrollTopArr.length - 2].scrollTop - scrollTopArr[
									scrollTopArr.length - 1].scrollTop) > scrollTopArr[scrollTopArr.length - 1].scrollTop;
							} else {
								this.tabs_copy[this.getCurrent].readyRefresh = false;
							}
						} else {
							this.tabs_copy[this.getCurrent].readyRefresh = scrollTopArr[scrollTopArr.length - 1].scrollTop < 15;
						}
					}
				}
				if (this.tabs_copy[this.getCurrent].readyRefresh !== this.curReadyRefresh) {
					this.curReadyRefresh = this.tabs_copy[this.getCurrent].readyRefresh;
				}
				scrollTopArr = [];
			},
			setRefreshStatus(status) {
				if (status === this.refreshStatus) return;
				this.refreshStatus = status;
				// console.log(status);
				switch (status) {
					case 1:
						this.refreshStatusText = this.beforRefreshText;
						break;
					case 2:
						this.refreshStatusText = this.releaseRefreshText;
						// #ifndef H5
						uni.vibrateShort();
						// #endif
						break;
					case 3:
						this.refreshStatusText = this.isRefreshingText;
						this.isRefreshing = true;
						this._doInit({
							refresh: true
						});
						break;
					case 4:
						this.refreshStatusText = this.successRefreshText;
						if (this.isVShowAndNotWxs) {
							this.setRefreshStatus(6);
						}
						break;
					case 5:
						this.refreshStatusText = this.failRefreshText;
						if (this.isVShowAndNotWxs) {
							this.setRefreshStatus(6);
						}
						break;
					case 6:
						setTimeout(() => {
							if (this.isVShowAndNotWxs) {
								this._vShow_setRefreshY(0, {
									duration: 300
								});
							}
							this.setRefreshStatus(1);
							this.isRefreshing = false;
							this.refreshShow = false;
						}, 1000);
						break;
				}
			},
			_vShow_setRefreshY(Y, obj = null) {
				this.refresh_Ani.translateY(Y).step(obj);
				this.refresh_animationData = this.refresh_Ani.export();
			},
			_vShow_setRefreshImage_r(r, obj = null) {
				this.refresh_img_Ani.rotate(r).step(obj);
				this.refresh_img_animationData = this.refresh_img_Ani.export();
			},
			setRefreshShow(obj) {
				this.refreshShow = obj.refreshShow;
			},
			setReadyRefresh(obj) {
				this.readyRefresh = obj.readyRefresh;
			},
			setDisabled(bl) {
				if (this.disabled !== bl) this.disabled = bl;
			},
			setNdisabled(bl) {
				if (this.ndisabled !== bl) this.ndisabled = bl;
			},
			setWxsLineWidth(lineWidth) {
				this.wxsLineWidth = lineWidth;
			},
			getTabsHeight() {
				try {
					let view = uni.createSelectorQuery().in(this);
					view.select('.tabs-container').boundingClientRect();
					view.exec(res => {
						_app.log('tabs高度:' + JSON.stringify(res));
						this.tabsHeight = res[0].height;
					})
				} catch (e) {
					//TODO handle the exception
					this.tabsHeight = 44;
					console.log('获取tabs高度异常:' + JSON.stringify(e))
				}
			},
			getTabsInfo(returnPromise) {
				try {
					let view = uni.createSelectorQuery().in(this);
					let scroll = uni.createSelectorQuery().in(this);
					scroll.select('#tabs-scroll').fields({
						scrollOffset: true
					});
					for (let i = 0; i < this.tabs.length; i++) {
						view.select('#' + this.preId + i).boundingClientRect();
					}
					const fn = (cb) => {
						// _app.log('fn执行');
						scroll.exec((data) => {
							_app.log('scroll布局信息:' + JSON.stringify(data));
							view.exec((res) => {
								_app.log('tabs布局信息:' + JSON.stringify(res));
								const arr = [];
								for (let i = 0; i < res.length; i++) {
									const item = res[i];
									if (item) {
										item.left += data[0].scrollLeft;
										arr.push(item)
									} else {
										arr.push({})
									}
								}
								this.tabsInfoChangeBl = true;
								this.tabsInfo = arr;
								_app.log('tabsInfo:' + JSON.stringify(arr));
								if (cb && typeof cb === 'function') cb(arr);
							})
						})
					}
					if (returnPromise) return new Promise((resolve, reject) => {
						setTimeout(() => {
							fn((arr) => {
								resolve(arr);
							});
						}, 200)
					})

					setTimeout(fn, 0)
				} catch (e) {
					//TODO handle the exception
					console.log('获取布局信息异常:' + JSON.stringify(e))
				}
			},
			setTabs(arr) {
				const fn = () => {
					this.tabs = arr;
					this.setTabsCopy();
					this.initStatus = new Array(arr.length);
					this.$nextTick(() => { //H5需要nextTick后能拿到布局信息
						setTimeout(() => { //QQ小程序需要setTimeout后能拿到布局信息
							this.getTabsInfo();
							_app.log('初始化');
							const defCurrent = this._getDefCurrent();
							_app.log('defCurrent:' + defCurrent);
							this.swiperCurrent = defCurrent;
							if (this.nContentMode === 'vShow') {
								this.current = defCurrent;
							}
							this.setHasRefreshContainerBackgroundColor(defCurrent);
							this._doInit({
								index: defCurrent,
								init: true
							});
							this.getTabsHeight();
						}, 0)
					})
				}
				if (this.count++ === 0) {
					fn();
				} else {
					this.tabs = [];
					this.current = 0;
					this.swiperCurrent = 0;
					this.$nextTick(() => {
						setTimeout(fn, 0);
						this.setNdisabled(false);
					})
				}
			},
			setTabsCopy() {
				this.tabs_copy = this.tabs.map(item => {
					return {
						scrollTop: 0,
						readyRefresh: true
					}
				});
			},
			setHasRefreshContainerBackgroundColor(index) {
				const tab = this.tabs[index];
				if (tab && tab.hasRefreshContainerBackgroundColor) {
					this.$emit('setRefreshContainerBgColor', tab.hasRefreshContainerBackgroundColor);
				}
			},
			_doInit({
				index,
				init,
				tap,
				slide,
				refresh
			} = {}) {
				try {
					if (refresh === false) return;
					index = index !== undefined ? index : this.current;
					if (!refresh) {
						const bl_status = this.initStatus[index] === true;
						if (this.initStatus[index] === true) {
							if (slide || init || tap) return;
							refresh = true;
						}
					}

					const refs = this.$refs[this.refPre];
					if (!refs) {
						console.log('not find refs');
						return;
					}
					const ref = refs[index];
					if (!ref) {
						console.log('not find ref');
						return;
					}
					const initFn = ref[this.initFnName];
					if (!initFn || typeof initFn !== 'function') {
						console.log('not find init function');
						return;
					}
					_app.log('执行了组件内的init函数');
					this.initStatus[index] = true;
					initFn(refresh);
				} catch (e) {
					//TODO handle the exception
					console.log('_doInit方法异常:' + JSON.stringify(e));
				}
			},
			_getDefCurrent() {
				const defCurrent = Number(this.defCurrent);
				const endCurrent = this.tabs.length - 1;
				return defCurrent > endCurrent ? endCurrent : defCurrent;
			},
			setCurrent(obj) { //由wxs内部触发animationinish事件
				const current = Number(obj.current);
				if (this.tabs_copy[current].readyRefresh !== this.curReadyRefresh) this.curReadyRefresh = this.tabs_copy[current].readyRefresh;
				if (this.swiperCurrent !== current) {
					this.swiperCurrent = current;
				}
				if (this.current !== current) {
					this.setNdisabled(true);
					const time = this.initStatus[current] === true ? 100 : 500;
					this.current = current;
					this.$emit('change', this.current);
					this._doInit({
						index: current,
						slide: true
					});
					setTimeout(() => {
						this.$nextTick(() => {
							setTimeout(() => {
								this.setNdisabled(false);
							}, 0)
						})
					}, time)
				}
			},
			setSwiperCurrent(obj) {
				if (String(this.restrictSlider) === 'true' && this.swiperCurrent !== current) this.setNdisabled(true);
				const current = Number(obj.current);
				this.swiperCurrent = current;
				this.setHasRefreshContainerBackgroundColor(current);
			},
			tabTap(index) {
				let refresh;
				switch (this.nContentMode) {
					case 'swiper':
						this.swiperCurrent = index;
						this._doInit({
							index,
							tap: true
						});
						break;
					case 'vShow':
						this.swiperCurrent = index;
						if (this.current === index) {
							refresh = false
						}
						this.current = index;
						this.$emit('change', this.current);
						break;
				}
				this._doInit({
					index,
					tap: true,
					refresh
				});
			},
			setScrollLeft(obj) {
				_app.log('setScrollLeft:' + JSON.stringify(obj));
				if ((!(String(this.autoCenter) === 'true')) && String(obj.tabsChange) === 'false') return;
				this.scrollLeft = Number(obj.scrollLeft);
			},
			setTabsInfoChangeBl() {
				this.tabsInfoChangeBl = false;
			},
			_emit(name) {
				this.$emit(name);
			},
			voidFn() {}
		}
	}
</script>

<style scoped>
	@import url("css/box-sizing-border-box.css");
	@import url("css/QS-tabs-wxs-list.css");
	@import url("css/QS-refresh-image-isrefreshing.css");
</style>
