<!-- 该组件需自行实现, 此处只是示例 -->
<template>
	<!-- 为性能缘故, 当tab项多时, 请尽量不要删除 v-if="show" -->
	<view v-if="show">
		<button type="primary" class="btn" @tap="openWin('default')">下拉刷新模板</button>
		<button type="primary" class="btn" @tap="openWin('setColor')">设置颜色</button>
		<button type="primary" class="btn" @tap="openWin('reset')">重置tabs测试</button>
		<button type="primary" class="btn" @tap="openWin('more')">50个分类100条数据</button>
		<button type="primary" class="btn" @tap="openWin('index')">随机颜色花里胡哨</button>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			openWin(path) {
				uni.navigateTo({
					url: '/pages/' + path + '/' + path
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../css/box-sizing-border-box.css");
	.btn {
		margin-top: 20px;
	}
</style>
