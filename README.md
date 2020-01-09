# 暂时先写这些，晚点继续完善

# 快速指引
### [简介](#introduction)
### [示例项目结构](#project-structure)
### [支持度](#support)
### [使用须知](#notice-for-use)
### [传入参数](#props)
### [ref调用函数](#refs)
### [传入参数](#props)
### [使用步骤](#use-steps)

# <span id="introduction">简介</span>
使用wxs实现性能更好的tab线条滑动效果, 并使用swiper嵌套scrollview的方式集成了list<br />
方便开发分类列表业务需求, 同时简化分页加载方式

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
    |       |-- QS-tabs-wxs-list.vue	//页面中引入使用的组件文件
    |       |-- components	//组件中应用的组件文件，可自定义多个以便实现业务需求
    |       |   |-- QS-tabs-wxs-template-def.vue	//默认
    |       |-- js
    |       |   |-- config.js
    |       |   |-- pageDemand.js	//分页加载js
    |       |-- wxs
    |           |-- QS-tabs-wxs.wxs	//滑动线条实现的wxs
    |-- pages	//页面
    |   |-- index
    |       |-- index.vue
    |-- static	//资源文件
    |   |-- logo.png
    |-- util	//示例项目所需的js
        |-- getTabList.js
        |-- request
            |-- app.js
            |-- interfaces.js
            |-- mock.js
            |-- QS-request.js
```

# <span id="support">支持度</span>
### 因wxs支持度原因，目前支持： APP(vue)、微信小程序、H5、QQ小程序

# <span id="notice-for-use">使用须知</span>
### * tabs数组不从组件传入, 而是使用ref调用setTabs方法设置tabs, 所以setTabs为组件必须调用方法, tabs可传参数详见[tabs参数详解](#tabs)
### * 正式使用前请务必详细阅读`pageDemand.js`分页加载实现代码, 以便对接自己的接口, 否则需自行实现分页逻辑
### * 该组件的列表内容样式展示取决于引入的模板(示例中为`QS-tabs-wxs-template-def.vue`), 开发者可以自行增加不同的模板文件并由外部传自定义标识决定内部展示哪个模板
### * 需要开发者自行计算该组件的高度, 并传入属性height中, 单位px
### * 组件内必须拥有初始调用函数, 若组件内的初始调用函数名称不为init, 必须传入initFnName属性指定初始调用函数名称

# <span id="props">传入参数</span>
```
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
lineColor: {	//默认线条颜色
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
swiperBackgroundColor: {	//swiper默认背景颜色
	type: String,
	default: '#f8f8f8'
},
tabsBackgroundColor: {	//tabs默认背景颜色
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
```
# <span id="refs">ref调用函数</span>
| 方法名| 返回值| 传入参数| 说明|
|------|------|------|------|
| setTabs| | tabs 详见[tabs参数详解](#tabs)| 设置tabs|

# <span id="tabs">tabs参数详解</span>
注: tabs由组件ref实例调用setTabs方法设置
```
|tabs Array
|----String
|--------tab名称
|----Object
|--------name: tab名称
|--------activeFontColor: 当前项文字颜色
|--------tabsBackgroundColor: 当前项tabs背景颜色
|--------lineColor: 当前项线条颜色
|--------swiperItemBackgroundColor: 当前项swiper-item背景颜色
```

# <span id="use-steps">使用步骤</span>
## Step 1:
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
```html
<template>
	<view>
		<!-- 使用组件并绑定ref, 动态绑定height属性 -->
		<QSTabsWxsList ref="QSTabsWxsList" :height="QSTabsWxsListHeight"></QSTabsWxsList>
	</view>
</template>
```

## Step 3:
```javascript
<script>
//页面中引入组件实例
import QSTabsWxsList from '组件路径';
export default {
	components: {
		QSTabsWxsList //注册组件
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
```javascript
//页面中引入组件实例
import QSTabsWxsList from '组件路径';
export default {
	components: {
		QSTabsWxsList //注册组件
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



