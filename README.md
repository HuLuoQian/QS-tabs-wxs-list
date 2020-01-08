# 暂时先写这些，晚点继续完善

# 快速指引
### [简介](#introduction)
### [示例项目结构](#project-structure)
### [支持度](#support)
### [使用须知](#notice-for-use)

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
### * 正式使用前请务必详细阅读`pageDemand.js`分页加载实现代码, 以便对接自己的接口, 否则需自行实现分页逻辑
### * 该组件的列表内容样式展示取决于引入的模板(示例中为`QS-tabs-wxs-template-def.vue`), 开发者可以自行增加不同的模板文件并由外部传自定义标识决定内部展示哪个模板
### * 需要开发者自行计算该组件的高度, 并传入属性height中, 单位px


