<template>
	<div class="goods-item">
		<div class="goods-info-container">
			<div class="goods-check">
				<input type="checkbox" :value="index" :checked="item.checked" @click="singelCheck(item,$event)">
			</div>
			<div class="goods-info">
				<img :src="item.pic" class="goods-pic">
				<div class="item-container">
					<div class="goods-name">{{item.name}}</div>
					<div class="goods-price">{{item.price | price}}</div>
				</div>
			</div>
		</div>
		<div class="goods-operate">
			<span class="operate sub" :price="item.price" @click="sub(item)">-</span>
			<span class="goods-quantity">{{num}}</span>
			<span class="operate add" @click="add(item)">+</span>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	export default{
		name: 'goodsItem',
		props:['item','index'],
		data(){
			return{
				num: 1,
				isChecked: false,
			}
		},
		computed:{
			quantity(){
				return this.num;
			}
		},
		methods:{
			sub(item){
				if(this.num>1){
					this.num --;
					if(item.checked){
						this.$store.state.amount -= item.price;
					}
				}
			},
			add(item){
				this.num ++;
				if(item.checked){
					this.$store.state.amount += item.price;
				}
			},
			singelCheck(item,event){
				if(typeof item.checked === 'undefined'){
					this.$set(item,'checked',true);
				}
				this.$set(item,'checked',event.currentTarget.checked);
				this.isChecked = event.currentTarget.checked;
				// 判断是否激活全选按钮
				// if(this.checkAll()){
				// 	this.$store.state.checkAll = true;
				// }else{
				// 	this.$store.state.checkAll = false;
				// }
				this.$store.state.checkAll = this.checkAll();
				// 更新购物车合计金额
				if(item.checked){
					this.$store.state.amount += item.price * this.quantity;
				}else{
					this.$store.state.amount -= item.price * this.quantity;
				}

			},
			checkAll(){
				let flag = true;
				this.$store.state.list.forEach(function(item,index){
					if(!item.checked){
						flag = false;
					}
				})
				return flag;
			}
		},
		filters:{
			price(value){
				return '¥' + value.toFixed(2);
			}
		},
	}
</script>

<style lang="scss">
	.goods-item{
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 5px 10px;
		margin-bottom: 5px;
		background-color: white;
		border-bottom: 1px solid #ddd;
	}
	.goods-info-container{
		display: flex;
		align-items: center;
	}
	.goods-info{
		display: flex;
		margin-left: 20px;
	}
	.goods-pic{
		width: 80px;
		height: 80px;
		vertical-align: top;
	}
	.goods-name{
		font-size: 16px;
		font-weight: bold;
	}
	.goods-price{
		color: lightcoral;
	}
	.item-container{
		display: flex;
	    align-items: stretch;
	    flex-direction: column;
	    width: 70px;
	    text-align: left;
	    margin-left: 10px;
	    &>div{
	    	margin-bottom: 10px;
	    }

	}
	.goods-operate{
		float: right;
		display: flex;
		justify-content: space-between;
		width: 70px;
		align-items: center;
	}
	.operate{
		display: inline-block;
		width: 20px;
		height: 20px;
		line-height: 20px;
		border-radius: 50%;
		border: 1px solid #73B785;
		cursor: pointer;
	}
	.add{
		background-color: #73B785;
		color: white;
	}
	.sub{
		color: #73B785;
		background-color: white;
	}
</style>