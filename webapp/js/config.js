require.config({
	paths : {
		//这里的路径基于baseUrl
		//不写定baseUrl时，路径默认是home.js下的路径
		// baseUrl:js/
		// * 不添加后缀名
		// * 不使用绝对路径
        "jquery": "../../libs/jquery/jquery-2.1.1.min",
        "global": "../../libs/common/global",
        "address_change": "address_change",
        "address_parent": "address_parent",
        "address": "address",
        "coupon": "coupon",
        "login": "login",
        "personal": "personal",
        "register": "register"

	},


	shim : {
		//表示依赖关系
		"address_parent":["jquery"],
		"address_change":["jquery"],
		"address":["jquery"],
		"coupon":["jquery"],
		"login":["jquery"],
		"personal":["jquery"],
		"register":["jquery"]

	}
})