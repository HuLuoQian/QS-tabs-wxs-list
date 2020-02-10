# `请先下载示例项目体验，页面右上角蓝色按钮`
# `若觉得复杂不会用请先加群交流不要盲目主观下定论`
# 愿君学长松，慎勿作桃李。受屈不改心，然后知君子。

# QQ交流群: 750104037 [点我加入](https://jq.qq.com/?_wv=1027&k=5OyZoXa)

# 注意: 目前若直接引入组件到项目中会报错, 因为方便示例演示, 在组件目录/components/QS-tabs-wxs-template-def.vue中的script标签最前面有引入示例用的js

# 快速指引
### [简介](#introduction)
### [示例项目结构](#project-structure)
### [支持度](#support)
### [使用须知](#notice-for-use)
### [传入参数](#props)
### [事件](#events)
### [ref调用函数](#refs)
### [传入参数](#props)
### [使用步骤](#use-steps)
### [分页加载概述](#pageDemand)

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
    |       |   |-- config.js
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

# <span id="props">传入参数</span>
```
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
hasRefresh: {	//是否开启下拉刷新, 注意：若开启请确保组件是占满屏幕的， 或者使用下拉刷新模板， 否则会和页面滑动冲突，另外根据mescroll插件强烈建议在page.json中相应页面配置 "disableScroll": true, 否则安卓会很卡
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
//下拉刷新模板专有
hasRefreshContainerheight: {	//下拉刷新模板的高度
	type: String,
	default: '100vh'
}
```
# <span id="events">事件</span>
| 事件名称| 形参| 说明|
|------|------|------|------|
| disabledTap| | 组件disabled为true时，组件区域点击时触发|
| disabledTouchmove| | 组件disabled为true时，组件区域滑动时触发|

# <span id="refs">ref调用函数</span>
| 方法名| 返回值| 传入参数| 说明|
|------|------|------|------|
| setTabs| | tabs 详见[tabs参数详解](#tabs)| 设置tabs|
| setDisabled| | Boolean| 设置组件是否可以被点击和滑动|

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




