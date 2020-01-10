<template>
	<view class="">
		<view class="topView">QS-tabs-wxs-list</view>
		<view class="container">
			<button type="primary" class="btn" @tap="openWin('default')">普通示例</button>
			<button type="primary" class="btn" @tap="openWin('setColor')">设置颜色</button>
			<button type="primary" class="btn" @tap="openWin('reset')">重置tabs测试</button>
			<button type="primary" class="btn" @tap="openWin('more')">50个分类100条数据</button>
			<button type="primary" class="btn" @tap="openWin('index')">随机颜色花里胡哨</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			openWin(path) {
				uni.navigateTo({
					url: '../' + path + '/' + path
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.btn{
		margin: 10px;
	}
	.topView{
		position: sticky;
		top: 0;
		left: 0;
		height: 44px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size:  18px;
		padding-top: var(--status-bar-height);
	}
</style>
