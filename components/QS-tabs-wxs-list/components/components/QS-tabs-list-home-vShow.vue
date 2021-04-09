<!-- 该组件需自行实现, 此处只是示例 -->
<template>
	<!-- 为性能缘故, 当tab项多时, 请尽量不要删除 v-if="show" -->
	<view v-if="show">
			<button type="primary" class="btn" @tap="openWin('vShow')">vShow模式 示例1</button>
			<button type="primary" class="btn" @tap="openWin('vShow2')">vShow模式 示例2</button>
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
