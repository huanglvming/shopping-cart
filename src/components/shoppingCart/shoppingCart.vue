<template>
	<div class="list-wrapper">
		<div class="list-content">
			<goods-item v-for="(item,index) in list" :key="index" :item="item" ref="goods"></goods-item>
		</div>
		<div class="list-bottom">
			<div class="check-all">
				<label for="checkAll">
					<input type="checkbox" :checked="allChecked" @click="checkAll($event)">
					全选
				</label>
			</div>
			<div class="bills-container">
				<div class="amount">
					合计：<span>{{amount | price}}</span>
				</div>
				<div class="check-out">
					<div class="btn-pay">结算({{checkedNum}})</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import goodsItem from "../goodsItem/goodsItem"
	export default{
		name: 'shoppingCart',
		data(){
			return{
				
			}
		},
		created(){
			this.$axios.get('api/goods').then(resp => {
				let obj = resp.data;
				console.log(obj);
				this.$store.state.list = obj.data.list;
			})
		},
		computed:{
			list(){
				return this.$store.state.list;
			},
			amount(){
				return this.$store.state.amount;
			},
			allChecked(){
				return this.$store.state.allChecked;
			},
			checkedNum(){
				return this.$store.state.checkedNum;
			}
		},
		components:{
			goodsItem
		},
		methods:{
			checkAll(event){
				var _this = this;
				this.$store.state.allChecked = event.currentTarget.checked;
				_this.$store.state.amount = 0;
				if(this.$store.state.allChecked){
					this.$refs.goods.forEach( function(el, index) {
						el.checked = true;
						_this.$store.state.amount += el.item.price * el.quantity;
					});
					this.$store.state.checkedNum = this.$refs.goods.length;
				}else{
					this.$refs.goods.forEach( function(el, index) {
						el.checked = false;
					});
					this.$store.state.checkedNum = 0;
				}
			}
		},
	    filters:{
	  	  	price(val){
	  		 return '¥' + val.toFixed(2);
	  	  	}
	    },
	}
</script>

<style lang="scss" scoped>
	.list-wrapper{
		position: absolute;
		top: 0;
		height: 0;
		width: 100%;
		height: 100%;
		background: #eee;
	}
	.list-bottom{
		position: fixed;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 40px;
		padding-left: 10px;
		background-color: white;
		border-top: 1px solid #dddddd;
	}
	.bills-container{
		display: flex;
		.amount{
			margin-right: 10px;
			line-height: 30px;
			span{
				font-weight: bolder;
				color: lightcoral;
			}
		}
	}
	.check-out{
		width: 100px;
		height: 100%;
		line-height: 40px;
		background-color: #73B785;
		color: white;
	}
</style>