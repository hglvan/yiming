
$(function() {
    $("#add_picture").fix({
        float: 'left',
        skin: 'green',
        durationTime: false,
        stylewidth: '220',
        spacingw: 0,
        spacingh: 260
    });
    
    
    $(document).ready(function () {
        //初始化宽度、高度
        $(".widget-box").height($(window).height());
        $(".page_right_style").height($(window).height());
        $(".page_right_style").width($(window).width() - 220);
        
        //当文档窗口发生改变时 触发
        $(window).resize(function () {
            $(".widget-box").height($(window).height());
            $(".page_right_style").height($(window).height());
            $(".page_right_style").width($(window).width() - 220);
        });
    });
    //******树状图******
    var setting = {
        view: {
            dblClickExpand: false,
            showLine: false,
            selectedMulti: false
        },
        data: {
            simpleData: {
                enable:true,
                idKey: "id",
                pIdKey: "pId",
                rootPId: ""
            }
        },
        callback: {
            beforeClick: function(treeId, treeNode) {
                var zTree = $.fn.zTree.getZTreeObj("tree");
                if (treeNode.isParent) {
                    zTree.expandNode(treeNode);
                    return false;
                } else {
                    demoIframe.attr("src",treeNode.file + ".html");
                    return true;
                }
            }
        }
    };
    
    var zNodes =[
        { id:1, pId:0, name:"商城分类列表", open:true},
        { id:11, pId:1, name:"专业洗护"},
        { id:111, pId:11, name:"洗发水"},
        { id:112, pId:11, name:"护发素"},
        { id:113, pId:11, name:"头皮项目"},
        { id:114, pId:11, name:"其他洗护产品"},
        { id:12, pId:1, name:"洗护套装"},
        { id:121, pId:12, name:"洗护套装"},
        { id:13, pId:1, name:"美妆个护"},
        { id:131, pId:13, name:"面部护肤 "},
        { id:132, pId:13, name:"身体护理"},
        { id:133, pId:13, name:"女性护理 "},
        { id:134, pId:13, name:"清洁用品"},
        { id:14, pId:1, name:"日化产品"},
        { id:141, pId:14, name:"日化产品"},
        { id:15, pId:1, name:"专业染发"},
        { id:151, pId:15, name:"染发膏 "},
        { id:152, pId:15, name:"双氧乳 "},
        { id:153, pId:15, name:"色板 "},
        { id:154, pId:15, name:"其他染发产品 "},
        { id:16, pId:1, name:"专业烫发"},
        { id:161, pId:16, name:"电发水 "},
        { id:162, pId:16, name:"离子烫 "},
        { id:163, pId:16, name:"陶瓷烫 "},
        { id:17, pId:1, name:"专业造型"},
        { id:171, pId:17, name:"啫喱水 "},
        { id:172, pId:17, name:"发蜡 "},
        { id:173, pId:17, name:"发泥 "},
        { id:174, pId:17, name:"发油 "},
        { id:175, pId:17, name:"发胶 "},
        { id:176, pId:17, name:"摩丝 "},
        { id:177, pId:17, name:"弹力素 "},
        { id:18, pId:1, name:"美发工具"},
        { id:181, pId:18, name:"美发梳 "},
        { id:182, pId:18, name:"美发剪 "},
        { id:183, pId:18, name:"直发器"},
        { id:184, pId:18, name:"卷发器"},
        { id:185, pId:18, name:"电推"},
        { id:186, pId:18, name:"吹风机"},
        { id:187, pId:18, name:"烫发设备"},
        { id:188, pId:18, name:"梳妆镜"},
        { id:189, pId:18, name:"其他工具类产品 "}
    ];
    
    var code;
    function showCode(str) {
        if (!code) code = $("#code");
        code.empty();
        code.append("<li>"+str+"</li>");
    }
    
    var t = $("#treeDemo");
    t = $.fn.zTree.init(t, setting, zNodes);
    demoIframe = $("#testIframe");
    var zTree = $.fn.zTree.getZTreeObj("tree");
    
    //文件上传
    $('#subBtn').click(function(){
        $('#form-article-add').ajaxSubmit({
            type: 'post',
            url: erp.baseUrl + 'upload',
            success:function(data){
                console.log(data);
            },
            error:function(XmlHttpRequest,textStatus,errorThrown){
                console.log(XmlHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    })
    
})