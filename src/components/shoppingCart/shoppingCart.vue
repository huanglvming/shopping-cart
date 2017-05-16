<template>
	<div class="list-wrapper">
		<div class="list-content">
			<goods-item v-for="(item,index) in list" :item="item" :index="index" :key="index" ref="goods"></goods-item>
		</div>
		<div class="list-bottom">
			<div class="check-all">
				<label for="checkAll">
					<input type="checkbox" @click="checkedAll" :checked="checkAll">
					全选
				</label>
			</div>
			<div class="bills-container">
				<div class="amount">
					<span>合计: </span>{{amount | price}}
				</div>
				<div class="check-out">
					<div class="btn-pay">结算({{checkNumber}})</div>
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
				checked: false,
			}
		},
		components:{
			goodsItem
		},
		computed:{
			list(){
				return this.$store.state.list;
			},
			amount(){
				return this.$store.state.amount;
			},
			checkNumber(){
				return this.$store.state.checkNumber;
			},
			checkAll(){
				return this.$store.state.checkAll;
			}
		},
		created(){
			this.$axios.get('api/goods').then(res => {
				console.log(res);
				this.$store.state.list = res.data.data.list;
				console.log(this.$store.state.list);
			}).catch(err => {
				console.log(err);
			})
		},
		filters:{
			price(value){
				return '¥ ' + value.toFixed(2);
			}
		},
		methods:{
			checkedAll(){
				this.checked = !this.checked;
				if(this.checked){
					for(let i=0,len=this.$store.state.list.length; i<len; i++){
						this.$set(this.$store.state.list[i],'checked',true);
						//计算购物车商品总额
						this.$store.state.amount += this.$refs.goods[i].num * this.$store.state.list[i].price;
					}
					this.$store.state.checkAll = true;
					this.$store.state.checkNumber = this.$store.state.list.length;
				}else{
					for(let i=0,len=this.$store.state.list.length; i<len; i++){
						this.$set(this.$store.state.list[i],'checked',false);
					}
					this.$store.state.checkAll = false;
					this.$store.state.checkNumber = 0;
					this.$store.state.amount = 0;
				}
			}
		}
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
			color: lightcoral;
			span{
				font-weight: bolder;
				color: #333;
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