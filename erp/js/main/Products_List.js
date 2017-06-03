$(function () {

    
    
    //产品 - 生成
    $.post(erp.baseUrl +'getProducts',{},function (response) {
        
        createGoodsList(response);
        
    });
    
    $('.btn_search').click(function () {
        $.post(erp.baseUrl +'searchProducts',{
            keyword : $('.text_add').val()
        },function (response) {
            
            if(response.length > 0){
                createGoodsList(response);
            }else{
                alert('查询结果为空');
            }
            
            
        })
    })
    
    $('.side_list').on('click','li.level1',function(){
        event.preventDefault();
        $.post(erp.baseUrl +'searchProducts',{
            keyword : $(this).text()
        },function (response) {
            if(response.length > 0){
                createGoodsList(response);
            }else{
                alert('查询结果为空');
            }
        
        
        })
        
    })
    
    //初始化宽度、高度
    $(".widget-box").height($(window).height()-215);
    $(".table_menu_list").width($(window).width()-260);
    $(".table_menu_list").height($(window).height()-215);
    //当文档窗口发生改变时 触发
    $(window).resize(function(){
        $(".widget-box").height($(window).height()-215);
        $(".table_menu_list").width($(window).width()-260);
        $(".table_menu_list").height($(window).height()-215);
    })
    
   /* laydate({
        elem: '#start',
        event: 'focus'
    });*/
    
    $("#products_style").fix({
        float : 'left',
        //minStatue : true,
        skin : 'green',
        durationTime :false,
        spacingw:30,//设置隐藏时的距离
        spacingh:260,//设置显示时间距
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
    $.fn.zTree.getZTreeObj("tree");
    
    
    $('table th input:checkbox').on('click' , function(){
        var that = this;
        $(this).closest('table').find('tr > td:first-child input:checkbox')
        .each(function(){
            this.checked = that.checked;
            $(this).closest('tr').toggleClass('selected');
        });
        
    });
    
    
    $('[data-rel="tooltip"]').tooltip({placement: tooltip_placement});
    function tooltip_placement(context, source) {
        var $source = $(source);
        var $parent = $source.closest('table')
        var off1 = $parent.offset();
        var w1 = $parent.width();
        
        var off2 = $source.offset();
        var w2 = $source.width();
        
        if( parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2) ) return 'right';
        return 'left';
    }
    
    
    //面包屑返回值
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.iframeAuto(index);
    $('.Order_form').on('click', function(){
        var cname = $(this).attr("title");
        var chref = $(this).attr("href");
        var cnames = parent.$('.Current_page').html();
        var herf = parent.$("#iframe").attr("src");
        parent.$('#parentIframe').html(cname);
        parent.$('#iframe').attr("src",chref).ready();;
        parent.$('#parentIframe').css("display","inline-block");
        parent.$('.Current_page').attr({"name":herf,"href":"javascript:void(0)"}).css({"color":"#4c8fbd","cursor":"pointer"});
        //parent.$('.Current_page').html("<a href='javascript:void(0)' name="+herf+" class='iframeurl'>" + cnames + "</a>");
        parent.layer.close(index);
        
    });
    
    var oTable1;
    function createGoodsList(response) {
        console.log(response)
        if(oTable1){
            oTable1.fnClearTable();
            oTable1.fnDestroy();
        }
    
    
        $('#goodslist').html(response.map(function (item) {
            var price = parseInt(item.goodsprice) * 1.2;
            price = price.toFixed(2);
            var place = item.goodsplace || '中国';
            var date = item.date || '2017-5-23 11:11:11';
            return `<tr>
                            <td width="25px"><label><input type="checkbox" class="ace" ><span class="lbl"></span></label></td>
                            <td width="80px" id="goodsID">${item.goodsid}</td>
                            <td width="250px"><u style="cursor:pointer" class="text-primary" onclick="">${item.goodstitle}</u></td>
                            <td width="100px">${price}</td>
                            <td width="100px">${item.goodsprice}</td>
                            <td width="100px">${place}</td>
                            <td width="180px">${date}</td>
                            <td class="text-l">通过</td>
                            <td class="td-status"><span class="label label-success radius">已启用</span></td>
                            <td class="td-manage">
                            <a  id="startbtn" href="javascript:;" title="停用"  class="btn btn-xs btn-success"><i class="icon-ok bigger-120"></i></a>
                            <a title="编辑"  id="editbtn"  href="javascript:;"  class="btn btn-xs btn-info" ><i class="icon-edit bigger-120"></i></a>
                            <a title="删除" href="javascript:;"  id="removebtn" class="btn btn-xs btn-warning" ><i class="icon-trash  bigger-120"></i></a>
                            </td>
                        </tr>`;
        }).join(''));
    
        $('#goodsnum').html(response.length);
    
        $('#goodslist').on('click','#startbtn',function (e,id) {
            if($(this).attr('title') == '停用'){
                layer.confirm('确认要停用吗？',function(index){
                    $(this).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" class="btn btn-xs " id="startbtn" href="javascript:;" title="启用"><i class="icon-ok bigger-120"></i></a>');
                    $(this).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已停用</span>');
                    $(this).remove();
                    layer.msg('已停用!',{icon: 5,time:1000});
                }.bind(this));
            }else{
                layer.confirm('确认要启用吗？',function(index){
                    $(this).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" class="btn btn-xs btn-success" id="startbtn" href="javascript:;" title="停用"><i class="icon-ok bigger-120"></i></a>');
                    $(this).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
                    $(this).remove();
                    layer.msg('已启用!',{icon: 6,time:1000});
                }.bind(this));
            }
        })
        .on('click','#editbtn',member_edit)
        .on('click','#removebtn',function (e,id) {
            layer.confirm('确认要删除吗？',function(index){
                $(this).parents("tr").remove();
            
                $.post(erp.baseUrl +'removeProduct',{
                    goodsid: $(this).parents('tr').find('#goodsID').html()
                },function (response) {
                    $('#goodsnum').html($('#goodsnum').html() - 1);
                })
            
                layer.msg('已删除!',{icon:1,time:1000});
            }.bind(this));
        
        })
    
        /*产品-编辑*/
        function member_edit(title,url,id,w,h){
            layer_show(title,url,w,h);
        }
    
        // $('#sample-table').dataTable().fnDestroy();
        
        oTable1 = $('#sample-table').dataTable( {
            "bDestory" : true,
            "aaSorting": [[ 1, "desc" ]],//默认第几个排序
            "bStateSave": true,//状态保存
            "aoColumnDefs": [
                //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
                {"orderable":false,"aTargets":[0,2,3,4,5,8,9]}// 制定列不参与排序
            ] } );
        
        
        
        
    }
    
})