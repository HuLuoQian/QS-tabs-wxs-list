<template>
	<view class="container" @tap="_click">
		<!-- <view class="image-box">
			<image src="/static/logo.png" mode="aspectFill" class="image"></image>
		</view> -->
		<image :src="listItem.img" mode="widthFix" class="img" @load="imgLoaded" @error="imgLoaded"></image>
		<text class="text">{{listItem.text}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			listItem: {
				type: [Object, String, Number, Array],
				default: ()=> { return {} }
			},
			type: {
				type: String,
				default: ''
			}
		},
		methods: {
			_click() {
				uni.showToast({
					title: `点击了${this.listItem.index}`,
					icon: 'none',
					position: 'center'
				})
			},
			imgLoaded() {
				this.$emit('imgLoaded')
			}
		}
	}
</script>

<style scoped>
	@import url("../css/box-sizing-border-box.css");
	.container{
		width: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 10rpx;
		overflow: hidden;
		padding: 15rpx;
		background-color: #fff;
	}
	.image-box{
		width: 100%;
		position: relative;
		height: 0;
		padding-top: 100%;
	}
	.image{
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx; 
	}
	.img{
		width: 100%;
		height: auto;
	}
	.text{
		font-size: 28rpx;
		color: #999999;
		margin-top: 25rpx;
	}
</style>
