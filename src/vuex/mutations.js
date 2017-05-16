export default{
	pushList(state,val){
		state.checkboxModel.push(val);
	},
	popList(state,val){
		state.checkboxModel.pop(val);
	},

}