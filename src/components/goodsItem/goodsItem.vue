<template>
	<div class="goods-item">
		<div class="goods-info-container">
			<div class="goods-check">
				<input type="checkbox" @click="singleCheck(item,$event)" :checked="checked">
			</div>
			<div class="goods-info">
				<img class="goods-pic">
				<div class="item-container">
					<div class="goods-name">{{item.name}}</div>
					<div class="goods-price">{{item.price}}</div>
				</div>
			</div>
		</div>
		<div class="goods-operate">
			<span class="operate sub" @click="sub(item)">-</span>
			<span class="goods-quantity">{{quantity}}</span>
			<span class="operate add" @click="add(item)">+</span>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	export default{
		name: 'goodsItem',
		props:['item'],
		data(){
			return{
				checked: false,
				quantity: 1,
			}
		},
		methods:{
			singleCheck(item,event){
				this.checked = event.currentTarget.checked;
				if(this.checked){
					this.$store.state.amount += this.quantity * item.price;
					this.$store.state.checkedNum ++;
					if(this.$store.state.checkedNum == this.$store.state.list.length){
						this.$store.state.allChecked = true;
					}
				}else{
					this.$store.state.amount -= this.quantity * item.price;
					this.$store.state.checkedNum --;
					this.$store.state.allChecked = false;
				}
				console.log("allChecked:"+this.$store.state.allChecked);
			},
			sub(item){
				if(this.quantity>1){
					this.quantity --;
					this.$store.state.amount -= item.price;
				}
			},
			add(item){
				this.quantity ++;
				this.$store.state.amount += item.price;
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