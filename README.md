##使用Vue全家桶实现购物车功能

####业务逻辑简述
该项目参照淘宝购物车实现基本的购物车功能逻辑，主要包括单选、全选、商品数量加减操作、同步更新商品总价等功能。

####主要代码结构
* 父组件

```
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
```
* 子组件

```
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
```
* api数据结构

```
data{
	list:[{
		name: ""    //商品名称
		pic: ""     //商品图片
		price：""   //商品价格
	},{
		name: ""    //商品名称
		pic: ""     //商品图片
		price：""   //商品价格
	},{
		name: ""    //商品名称
		pic: ""     //商品图片
		price：""   //商品价格
	}]
}
```

* vuex——state

```
export default{
	list: [],          //商品数组
	amount: 0,         //购物车总价
	checkAll: false,   //判断全选字段
	checkNumber: 0,    //选中商品数量
}
```

####技术分析
* **关于单选功能**

	点击单选按钮的时候，首先检测被点击对象是否包含checked字段，此字段用于判别商品是否被选中。如未包含该字段，可通过 **this.$set** 方法添加属性，添加checked属性后，原数据结构变为
	
	```
	data{
		list:[{
			checked: true,
			name: "",    //商品名称
			pic: "",     //商品图片
			price："",   //商品价格
		},{
			checked: true,
			name: "",    //商品名称
			pic: "",     //商品图片
			price："",   //商品价格
		},{
			checked: true,
			name: "",    //商品名称
			pic: "",     //商品图片
			price："",   //商品价格
		}]
	}
	```
	
	当然，这不是唯一的方法，在此选择该方式是为了引入 **this.$set** 知识点。当设置了checked字段以后，该字段就成为了后续程序中判定商品是否被选中的依据。
	
	如果商品处于选中状态，即checked=true，则累计商品价格,反之否然。
	
	每次点击单选按钮的时候，还需要执行函数遍历商品数组，判断是否所有商品都被选中了，如是，则更新state里的判断全选字段，反之否然。
	
	单选功能的代码逻辑如下：
	
	```
	singelCheck(item,event){
		if(typeof item.checked === 'undefined'){
			this.$set(item,'checked',true);
		}
		this.$set(item,'checked',event.currentTarget.checked);
		this.isChecked = event.currentTarget.checked;
		// 判断是否激活全选按钮
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
	```	
	
* **关于全选功能**
	
	每次点击全选按钮的时候，执行函数遍历商品数组，若商品数组未包含checked字段，则使用 **this.$set** 设置，并设值为true；如果商品数组已经包含checked字段，直接设值为true。点击反选则遍历商品数组奖checked值置为false。
	
	当全选之后，更新购物车总价数据，方法为遍历商品数组，累计商品数量*商品单价。
	
	在这里需要介绍一个知识点，即 **ref**, 通过 **ref** 方法可以让父组件读取到子组件的数据，因此可以获取到商品的数量。
	
	代码如下：
  
	
	```
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
    
	```
