<template>
	<view class="QS-Masonry-Template">
		<view :id="pre_id + index" :style="{ 'margin-bottom': itemSpace }" v-for="(item, index) in (String(hideTem) === 'true'?hideList:list)" :key="index">
			<block v-if="type==='xxx'">
				
			</block>
			<block v-else>
				<def :listItem="item" :type="type" @imgLoaded="imgLoaded"></def>
			</block>
		</view>
	</view>
</template>

<script>
	import def from './components/QS-Masonry-Template-Def.vue';
	export default {
		components: {def},
		props: {
			list: {
				type: Array,
				default:() => []
			},
			type: {
				type: String,
				default: ''
			},
			itemSpace: {
				type: [Number, String],
				default: '10px'
			},
			hideTem: {
				type: [Boolean, String],
				default: false
			},
			hasImage: {
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			return {
				pre_id: 'QS_Masonry_ID_',
				hideList: [],
				cb: null,
				imgLoadedCount: 0
			}
		},
		methods: {
			setHideList(arr, cb) {
				this.hideList = arr;
				if(cb && typeof cb === 'function') this.cb = cb;
				if(String(this.hasImage) !== 'true') {
					this.$nextTick(()=>{
						setTimeout(()=>{
							this.allImgLoaded();
						}, 0)
					})
				}
			},
			clearHideList() {
				this.hideList = [];
			},
			imgLoaded() {
				if(String(this.hideTem) === 'true' && String(this.hasImage) === 'true') {
					if(++this.imgLoadedCount >= this.hideList.length) {
						this.imgLoadedCount = 0;
						this.allImgLoaded();
					}
				}
			},
			allImgLoaded() {
				if(this.cb && typeof this.cb === 'function') this.cb()
				this.cb = null;
			},
			getQuery() {
				return new Promise((rs,rj)=>{
					this.$nextTick(()=>{
						setTimeout(()=>{
							let view;
							// #ifdef MP-ALIPAY
							view = uni.createSelectorQuery();
							// #endif
							// #ifndef MP-ALIPAY
							view = uni.createSelectorQuery().in(this);
							// #endif
							
							let l = 0;
							if(String(this.hideTem) === 'true') {
								l = this.hideList.length;
							}else{
								l = this.list.length;
							}
								
							for(let i = 0; i < l; i++) view.select(`#${this.pre_id + i}`).fields({size: true})
							
							view.exec(data =>{
								rs(data);
							})
						}, 0)
					})
				})
			},
			getBoxQuery() {
				return new Promise((rs,rj)=>{
					this.$nextTick(()=>{
						setTimeout(()=>{
							let view;
							// #ifdef MP-ALIPAY
							view = uni.createSelectorQuery();
							// #endif
							// #ifndef MP-ALIPAY
							view = uni.createSelectorQuery().in(this);
							// #endif
							
							view.select(`.QS-Masonry-Template`).fields({size: true})
							
							view.exec(data =>{
								rs(data[0]);
							})
						}, 0)
					})
				})
			}
		}
	}
</script>

<style scoped>
	@import url("css/box-sizing-border-box.css");
	.QS-Masonry-Template{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
