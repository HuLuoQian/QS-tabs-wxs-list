## android端建议使用[QS-tabs-list Nvue版 ](https://ext.dcloud.net.cn/plugin?id=1399)

* ## `请先下载示例项目体验，页面右上角蓝色按钮`
* ## `若觉得复杂不会用请先加群交流不要盲目主观下定论`
* ## 愿君学长松，慎勿作桃李。受屈不改心，然后知君子。

* ## QQ交流群: 750104037 [点我加入](https://jq.qq.com/?_wv=1027&k=5OyZoXa)

# 注意: 目前若直接引入组件到项目中会报错, 因为方便示例演示, 在组件目录/components/QS-tabs-wxs-template-def.vue中的script标签最前面有引入示例用的js

# 快速指引
### [简介](#introduction)
### [示例项目结构](#project-structure)
### [支持度](#support)
### [使用须知](#notice-for-use)
### [Attributes](#Attributes)
### [config.js(v2.3+)](#config)
### [Events](#Events)
### [Methods](#Methods)
### [使用步骤](#use-steps)
### [分页加载概述](#pageDemand)
### [组件结构图](#jg)
### [获取分页数据原理图](#img)
### [终极详解](#super-readme)

# <span id="introduction">简介</span>
* ### 使用wxs实现性能更好的tab线条滑动效果和下拉刷新效果, 并使用swiper嵌套scrollview的方式集成了list方便开发分类列表业务需求, 同时简化分页加载方式

# <span id="project-structure">示例项目结构</span>
```
|-- QS-tabs-wxs-list
    |-- App.vue
    |-- main.js
    |-- manifest.json
    |-- pages.json
    |-- README.md	//自述文档
    |-- components
    |   |-- QS-tabs-wxs-list	//组件文件夹
    |       |-- QS-tabs-wxs-list-refresh.vue	//下拉刷新模板
    |       |-- QS-tabs-wxs-list.vue	//组件核心vue文件
    |       |-- components	//组件中应用的组件文件，可自定义多个以便实现业务需求
    |       |   |-- QS-tabs-wxs-template-def.vue	//示例列表模板
    |       |-- css
    |       |   |-- QS-refresh-image-isrefreshing.css
    |       |   |-- QS-tabs-wxs-list-components.css
    |       |   |-- QS-tabs-wxs-list.css
    |       |-- js
    |       |   |-- config.js	//v2.3新增checkContentMode、checkvShowDuration方法
    |       |   |-- pageDemand.js	//分页加载js
    |       |   |-- publicProps.js
    |       |-- mixins
    |       |   |-- QS-tabs-wxs-list-mixin.js	//子组件必须实现的mixin
    |       |-- wxs
    |           |-- QS-refresh-wxs.wxs	//下拉刷新实现的wxs
    |           |-- QS-tabs-wxs.wxs	//滑动线条实现的wxs
    |-- pages
    |   |-- default
    |   |   |-- default.vue
    |   |-- index
    |   |   |-- index.vue
    |   |-- more
    |   |   |-- more.vue
    |   |-- reset
    |   |   |-- reset.vue
    |   |-- select
    |   |   |-- select.vue
    |   |-- setColor
    |       |-- setColor.vue
    |-- static
    |   |-- logo.png
    |   |-- refresh.png
    |-- util	//示例项目所需的js
        |-- getTabList.js	//获取tabs对应的list内容的js
        |-- request	//封装uni.request
            |-- app.js
            |-- interfaces.js
            |-- mock.js	//本地模拟返回list数据
            |-- QS-request.js

```

# <span id="support">支持度</span>
* ### 因wxs支持度原因，目前支持： APP(vue)、微信小程序、H5、QQ小程序

# <span id="notice-for-use">使用须知</span>
* ### tabs数组不从组件传入, 而是使用ref调用setTabs方法设置tabs, 所以setTabs为组件必须调用方法, tabs可传参数详见[tabs参数详解](#tabs)
* ### 正式使用前请务必详细阅读`pageDemand.js`分页加载实现代码, 以便对接自己的接口, 否则需自行实现分页逻辑
* ### 该组件的列表内容样式展示取决于引入的模板(示例中为`QS-tabs-wxs-template-def.vue`), 开发者可以自行增加不同的模板文件并由外部传自定义标识type决定内部展示哪个模板
* ### 需要开发者自行计算该组件的高度, 并传入属性`height`中, `单位px`
* ### 组件内必须拥有初始调用函数, 若组件内的初始调用函数名称不为`init`, 必须传入`initFnName`属性指定初始调用函数名称
* ### 请不要在列表中使用video、textarea等原生组件
* ### 若开启`下拉刷新` 请确保组件高度是占满屏幕或者使用下拉刷新模板QS-tabs-wxs-list-refresh.vue
* ### 安卓H5网页下拉冲突, 可加入下面的代码
```
// #ifdef H5
document.body.addEventListener('touchmove', function (e) {
	e.preventDefault(); 
}, {passive: false}); 
// #endif
```

# <span id="Attributes">Attributes</span>
```
	tabsPosition: {	//tabs位置 top: 上, bottom: 下
		type: String,
		default: 'top'
	},
	minWidth: { //tab最小宽度
		type: String,
		default: '250rpx'
	},
	space: { //tab间距, 左右padding值
		type: String,
		default: '10px'
	},
	tabHeight: { //tabs高度
		type: String,
		default: '44px'
	},
	height: { //组件总高度, 需外部计算并传入
		type: [Number, String],
		default: 500
	},
	lineWidth: { //线条宽度，若小于1则当做百分比计算
		type: [Number, String],
		default: .7
	},
	lineHieght: { //线条高度
		type: String,
		default: '2px'
	},
	lineColor: { //线条颜色
		type: String,
		default: '#f1505c'
	},
	lineMarginBottom: { //线条距离底部距离
		type: [Number, String],
		default: 0
	},
	defCurrent: { //默认当前项
		type: [Number, String],
		default: 0
	},
	autoCenter: { //scrollview自动居中
		type: [Boolean, String],
		default: true
	},
	tapTabRefresh: { //点击当前项tab触发组件内部init函数
		type: [Boolean, String],
		default: true
	},
	fontSize: { //tab默认字体大小
		type: String,
		default: '28rpx'
	},
	activeFontSize: { //当前项字体大小
		type: String,
		default: '32rpx'
	},
	swiperBackgroundColor: { //swiper背景颜色
		type: String,
		default: '#f8f8f8'
	},
	tabsBackgroundColor: { //tabs背景颜色
		type: String,
		default: '#fff'
	},
	tabsFontColor: { //tabs默认字体颜色
		type: String,
		default: '#999'
	},
	activeFontColor: { //tabs当前项字体颜色
		type: String,
		default: '#000'
	},
	activeBold: { //当前项字体加粗
		type: [Boolean, String],
		default: true
	},
	initFnName: { //初始调用函数名称(组件内部)
		type: String,
		default: 'init'
	},
	type: { //用于区分展示不同列表模板的标识
		type: String,
		default: 'default'
	},
	zIndex: { //z-index属性值
		type: [String, Number],
		default: 99
	},
	tabsSticky: { //tabs是否sticky定位(粘贴组件顶部)
		type: [Boolean, String],
		default: false
	},
	hasRefresh: {
		type: [Boolean, String],
		default: false
	},
	refreshImage: { //刷新动画图片
		type: String,
		default: ''
	},
	refreshDistance: { //刷新距离
		type: [Number, String],
		default: 90
	},
	beforRefreshText: { //刷新前文字
		type: String,
		default: '下拉刷新'
	},
	releaseRefreshText: { //释放刷新文字
		type: String,
		default: '松开刷新'
	},
	isRefreshingText: { //刷新中文字
		type: String,
		default: '刷新中...'
	},
	successRefreshText: {//刷新成功
		type: String,
		default: '刷新成功'
	},
	failRefreshText: {//刷新失败
		type: String,
		default: '刷新失败'
	},
	completeRefreshText: { //刷新完成文字
		type: String,
		default: '刷新完毕'
	},
	refreshTextColor: { //刷新文字的颜色
		type: String,
		default: '#666'
	},
	refreshTextFontSize: { //刷新文字的大小
		type: String,
		default: '25rpx'
	},
	restrictSlider: {	//限制用户只能滑动一块
		type: [Boolean, String],
		default: true
	},
	contentMode: {	//content展示模式, default、swiper、vShow, 若传default, 则会根据config.js中的checkContentMode返回相应模式, 安卓平台下传default或swiper都会经过checkContentMode的检测
		type: String,
		default: 'default'
	},
	customData: {	//自定义数据，最终传至列表vue中 v2.9+
		type: [Object, String, Number, Array, Boolean],
		default: ()=>{ return {} }
	}
```


# <span id="config">config.js(v2.3+)</span>
* ### config.js位于QS-tabs-wxs-list/js/config.js, 在v2.3中新增了两个方法
| 方法名称| 形参| 说明|
|------|------|------|------|
| checkContentMode| | 安卓平台下, 当contentMode为default或swiper时, 进一步判断当前机型性能是否可以开启swiper模式|
| checkvShowDuration| | (当前平台不支持wxs时)安卓平台下, 当contentMode最终为vShow时, 进一步配置当前机型的下拉刷新过渡时间值|

# <span id="Events">Events</span>
| 事件名称| 形参| 说明|
|------|------|------|------|
| change `v2.9+`| current| 内部current改变时触发|
| disabledTap| | 组件disabled为true时，组件区域点击时触发|
| disabledTouchmove| | 组件disabled为true时，组件区域滑动时触发|

# <span id="Methods">Methods</span>
| 方法名| 返回值| 传入参数| 说明|
|------|------|------|------|
| setTabs| | tabs 详见[tabs参数详解](#tabs)| 设置tabs|
| setDisabled| | Boolean| 设置组件是否可以被点击和滑动|
| setCustomData `v2.9+`| | Object/Array/String/Number/Boolean | 设置自定义数据, 该数据可在list vue中获取|

# <span id="tabs">tabs参数详解</span>
* ### 注: tabs由组件ref实例调用setTabs方法设置
```
|tabs Array
|----String
|--------tab名称
|----Object
|--------name: tab名称
|--------activeFontColor: 当前项文字颜色
|--------tabsBackgroundColor: 当前项tabs背景颜色
|--------lineColor: 当前项线条颜色
|--------swiperBackgroundColor: 当前项swiper背景颜色
|--------swiperItemBackgroundColor: 当前项swiper-item背景颜色
```

# <span id="use-steps">使用步骤</span>
## Step 1:
* ### 引入并注册组件

```javascript
<script>
//页面中引入组件实例
import QSTabsWxsList from '组件路径';
export default {
	components: {
		QSTabsWxsList //注册组件
	}
}
</script>
```

## Step 2:
* ### template标签内写入并绑定ref与动态高度

```html
<template>
	<view>
		<!-- 使用组件并绑定ref, 动态绑定height属性 -->
		<QSTabsWxsList ref="QSTabsWxsList" :height="QSTabsWxsListHeight"></QSTabsWxsList>
	</view>
</template>
```

## Step 3:
* ### 实现计算组件高度方法

```javascript
<script>
//页面中引入组件实例
import QSTabsWxsList from '组件路径';
export default {
	components: {
		QSTabsWxsList //注册组件
	},
	data() {
		return {
			QSTabsWxsListHeight: 0	//组件高度
		}
	},
	onReady() {
		//执行计算组件高度方法
		this.countQSTabsWxsListHeight();
	},
	methods: {
		//计算组件高度
		countQSTabsWxsListHeight() {
			//...
			this.QSTabsWxsListHeight = xxx;
		}
	}
}
</script>
```

## Step 4:
* ### 设置tabs

```javascript
//页面中引入组件实例
import QSTabsWxsList from '组件路径';
export default {
	components: {
		QSTabsWxsList //注册组件
	},
	data() {
		return {
			QSTabsWxsListHeight: 0	//组件高度
		}
	},
	onReady() {
		//执行计算组件高度方法
		this.countQSTabsWxsListHeight();
	},
	methods: {
		//计算组件高度
		countQSTabsWxsListHeight() {
			//...
			this.QSTabsWxsListHeight = xxx;
		},
		setTabs() {
			//接口获取tabs数组，使用ref调用setTabs方法传入
			//...获取tabs
			this.$refs.QSTabsWxsList.setTabs(tabs);
		}
	}
}
</script>
```
## Step 5:
* ### 后续需要详细看示例列表获取数据与分页加载的实现-[分页加载概述](#pageDemand)


# <span id="pageDemand">分页加载概述</span>
### 在components/QS-tabs-wxs-list/js/pageDemand.js文件中抽离出了公共的分页加载逻辑, 开发者可以自行修改逻辑从而契合自己的分页加载逻辑, 该js文件中的doPageDemand方法由call方法绑定this指向实现, 并传入相应参数, 具体逻辑需查看源码注释

# <span id="jg">组件结构图</span>
![Image](http://121.40.114.64/HuAnNing/image/QS-tabs-wxs-list%20%E7%BB%84%E4%BB%B6%E7%BB%93%E6%9E%84.png)
# <span id="img">获取分页数据原理图</span>
![Image](http://121.40.114.64/HuAnNing/image/QS-tabs-wxs-list%20%E8%8E%B7%E5%8F%96%E6%95%B0%E6%8D%AE%E5%8E%9F%E7%90%86.png)

# <span id="super-readme">终极详解</spam>
首先，该组件的对接分为两部分`视图`和`数据`<br />
### 视图
我们先来看`视图`部分:<br />
该组件的列表样式(或者说视图)是集中放在一个"池子"里面的, 位于 `组件文件夹/components/components`, 该文件夹下存放了列表的vue文件.<br />
而所有的列表vue文件都由 `组件文件夹/components/QS-tabs-wxs-list-template.vue` 来`分流`，所谓的`分流`就是不同的页面使用不同的模板，甚至是不同的列也是用不同的模板.<br />
因此你新创建的列表vue需要在模板分流组件内注册并由`type`属性控制不同的页面使用不同的列表模板.<br />
也有小伙伴的需求是`不同列`也需要不同的模板， 那么这时候就可以使用mixins混入的index(当前tab下标)或者自己再tab中设置的自定义id来区分不同的模板.<br />
SO `区分不同的列表模板`都是在 组件文件夹/components/`QS-tabs-wxs-list-template.vue` 这个文件进行的.<br />
而`列表的具体样式与数据的获取`是在 `组件文件夹/components/components/xxx.vue` 下进行.<br />
### 数据
我们接着来看数据部分的对接:<br />
该组件在示例中已经实现了从`访问接口`到`过滤数据`再到`分页数据`的封装.<br />
首先在示例项目根目录有一个`util`文件夹, 在里面我们放了request文件夹和获取列表数据的api js文件(getTabList.js 其实我们大可以把这里面的api整合在一个公共的apis.js里面).<br />
getTabList.js中`import './request/QS-request.js'`,  QS-request.js导出对象中的QSRequest就是对uni.request的封装.<br />
`!!注意`:QSRequest为了便于示例演示在其内使用的是mock方法， 并没有直接使用uni.request, 所以在正式使用时请删除使用mock的逻辑.<br />
那么QSRequest传入的参数是:<br />
```
{
	urlField,	//接口地址， 在interface.js导出的对象中使用 . 链式获取对应的接口地址
	sendData,	//传入uni.request的参数, 详细参数见uni.request api所传的参数, 这里有多出一个contentType属性，为了便于Content-Type的设置， 详见源码，当然其实这里我自己不是很满意，你大可可以自己修改
	checkType,	//健壮性判断的类型
	field,	//在健壮性判断通过后使用.链式获取想要的数据
	check,	//是否经使用壮性判断
	filterFn,	//代理函数， 在Promise.resolve之前会把field获取的数据传进该函数执行一次，最终resolve函数return的数据
	hasLoading	//是否显示交互loading
	...//其实可以自己增加一些逻辑 像我自己增加了 login属性， 判断若未登录则跳转登录页面或者提示未登录，还有promiseProxyFn，可以对返回数据做一次异步的代理
}
```
QSRequest 接收上面的对象后会返回一个经过一系列处理的Promise对象， 所以在getTabList.js中是直接return了一个QSRequest所返回的Promise对象，而外部可以使用then方法或者 async await的方式获取数据.<br />
到这里我们已经讲了`访问接口`到`过滤数据`的过程, 那么在`分页数据`之前，我们需要做的是如下几点:<br />
* ### 1.删除mock逻辑(源码大概在QS-request.js 20-24行左右， 即是fn等于request方法即可)
* ### 2.在`util/interface.js`中写好接口地址以便使用QSRequest中的urlField属性来获取
* ### 3.因为QSRequest默认会对返回数据做一次健壮性判断，所以你应该修改QS-request.js中的checkRes方法来符合自己的业务需求
假如我们已经把上面的问题都搞定了，那么geTabList.js这个api在外部调用时返回的应该就是我们想要的数据了, 那么我们接下来看`分页数据`.<br />
分页数据的js位于 `组件文件夹/js/pageDemand.js`, 该js文件是一个分页公共逻辑的封装，注意 抽离出的时公共的逻辑, 所以外部调用就是用Function.prototype.call方法来使用, 因为call方法能改变this指向, 所以我们只要在每个list的实例中使用call方法使用它，它this所指向的都是这个list vue的实例.<br />
我们所说的list vue实例 其实指的就是列表样式池(`组件文件夹/components/components`)里的vue文件, 那么我们看看示例代码: <br />
```
import { getTabList } from '@/util/getTabList.js';	//引入获取列表数据的api 就是我们前面说的 getTabList.js
import { doPageDemand } from '../../js/pageDemand.js';	//引入分页js
doPageDemand.call(_this, {	//传入this, 使pageDemand.js中的this指向使用他的vue实例
		getDataFn: getTabList, //传入我们引入的获取数据的方法
		successEnd() {	//获取数据成功后将要结束的回调
			if (refresh) _this.$emit('refreshEnd', true);	//触发父级事件， true表示刷新成功
		},
		fail() {
			console.log('访问接口失败');
			if (refresh) _this.$emit('refreshEnd', false);	//触发父级事件， false表示刷新失败
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

		noDataText: false, //访问接口后若数据长度为0则可自定义为空时文字

		refreshClear: false, //刷新时是否清空数据
})
```

那么pageDemand.js 的具体逻辑还需要看源码, 他的大概步骤如下:
* ### 1.判断是否已经是最后一页， 若是则直接return
* ### 2.执行从外面传入的getDataFn函数(就是我们在getTabList.js中写的获取数据的那个函数), 该函数使用then方式获取了最终需要的数据
* ### 3.对list vue实例data中的list属性赋值, 该操作就会影响视图变化
* ### 3.判断并展示对应的列表状态
list vue页面它data上绑定的应该有(比如示例):<br />
```
data() {
	return {
		list: [], //列表数据,
		sendData: {}, //访问接口时携带的数据,
		statusText: {}, //列表状态对象
	}
}
```
好了， 讲到这里应该就差不多了， 如果还有不明白的......请加QQ群.





