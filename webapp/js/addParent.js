// baseUrl:js/
// * 不添加后缀名
// * 不使用绝对路径

require(['config'],function(){
	// 这里不能保证jquery,gdszoom,common的加载顺序
	require(['jquery','global','address_parent'],function(){
		console.log('ok_parent')
	});

});