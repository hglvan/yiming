jQuery(function($) {
    //会员 - 生成
    $.post(erp.baseUrl +'login',{},function (response) {
        console.log(response)
        createAccountsList(response.data);
        
    });
    
    
    
    
    
    //会员管理
    
    var oTable1;
    function createAccountsList(response) {
        console.log(response)
        if(oTable1){
            oTable1.fnClearTable();
            oTable1.fnDestroy();
        }
        
        
        $('#accountslist').html(response.map(function (item) {
            var place = item.place || '广东 广州';
            var date = item.date || '2017-5-23 11:11:11';
            var gender = item.gender || '保密';
            var nickname = item.nickname || '知名不具';
            return `<tr>
          <td><label><input type="checkbox" class="ace"><span class="lbl"></span></label></td>
          <td id="accountid">${item.accountid}</td>
          <td><u style="cursor:pointer" class="text-primary" id="namebtn">${nickname}</u></td>
          <td>${gender}</td>
          <td>${item.username}</td>
          <td>${item.email}</td>
          <td class="text-l">${place}</td>
          <td>${date}</td>
          <td class="td-status"><span class="label label-success radius">已启用</span></td>
          <td class="td-manage">
          <a id="startbtn"  href="javascript:;" title="停用"  class="btn btn-xs btn-success"><i class="icon-ok bigger-120"></i></a>
          <a title="编辑" id="editbtn" href="javascript:;"  class="btn btn-xs btn-info" ><i class="icon-edit bigger-120"></i></a>
        
          <a title="删除" href="javascript:;"  id="removebtn" class="btn btn-xs btn-warning" ><i class="icon-trash  bigger-120"></i></a>
          </td>
		</tr>`;
        }).join(''));
        
        $('#accountsnum').html(response.length);
        
        $('#accountslist').on('click','#startbtn',function (e,id) {
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
        .on('click','#namebtn',member_show)
        .on('click','#removebtn',function (e,id) {
            layer.confirm('确认要删除吗？',function(index){
                $(this).parents("tr").remove();
                
                $.post(erp.baseUrl +'accountremove',{
                    accountid: $(this).parents('tr').find('#accountid').html()
                },function (response) {
                    $('#accountsnum').html($('#accountsnum').html() - 1);
                })
                
                layer.msg('已删除!',{icon:1,time:1000});
            }.bind(this));
            
        })
        .on('click','#editbtn',member_edit)
    
        /*用户-查看*/
        function member_show(title,url,id,w,h){
            layer_show(title,url+'#?='+id,w,h);
        }
    
        /*用户-编辑*/
        function member_edit(id){
            layer.open({
                type: 1,
                title: '修改用户信息',
                maxmin: true,
                shadeClose:false, //点击遮罩关闭层
                area : ['800px' , ''],
                content:$('#add_menber_style'),
                btn:['提交','取消'],
                yes:function(index,layero){
                    var str="";
                    $(".add_menber input[type$='text']").each(function(n){
                        if($(this).val()=="")
                        {
                        
                            layer.alert(str+=""+$(this).attr("name")+"不能为空！\r\n",{
                                title: '提示框',
                                icon:0,
                            });
                            return false;
                        }
                    });
                    console.log($(this),$('.gender:checked').siblings('span').html(),$(this).parents('tr').find('#accountid').html());
                    $.post(erp.baseUrl +'changemsg',{
                        accountid : $(this).parents('tr').find('#accountid').html(),
                        nickname : $('.nickname').val(),
                        realname : $('.realname').val(),
                        gender : $('.gender:checked').siblings('span').html(),
                        phone : $('.phone').val(),
                        username : $('.username').val(),
                        email : $('.email').val(),
                        place : $('.place').val()
                    },function (response) {
                        if(response){
                            layer.alert('添加成功！',{
                                title: '提示框',
                                icon:1,
                            });
                        }
                        
                    })
                    layer.close(index);
                }.bind(this)
            });
        }
    
        
        
        oTable1 = $('#sample-table').dataTable( {
            "aaSorting": [[ 1, "desc" ]],//默认第几个排序
            "bStateSave": true,//状态保存
            "aoColumnDefs": [
                //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
                {"orderable":false,"aTargets":[0,8,9]}// 制定列不参与排序
            ] } );
        
        
        
        
    }
    
    /*用户-添加*/
    $('#member_add').on('click', function(){
        layer.open({
            type: 1,
            title: '添加用户',
            maxmin: true,
            shadeClose: true, //点击遮罩关闭层
            area : ['800px' , ''],
            content:$('#add_menber_style'),
            btn:['提交','取消'],
            yes:function(index,layero){
                var num=0;
                var str="";
                $(".add_menber input[type$='text']").each(function(n){
                    if($(this).val()=="")
                    {
                        
                        layer.alert(str+=""+$(this).attr("name")+"不能为空！\r\n",{
                            title: '提示框',
                            icon:0,
                        });
                        num++;
                        return false;
                    }
                });
    
                console.log($(this),$('.gender:checked').siblings('span').html());
                $.post(erp.baseUrl +'register',{
                    
                    nickname : $('.nickname').val(),
                    realname : $('.realname').val(),
                    gender : $('.gender:checked').siblings('span').html(),
                    phone : $('.phone').val(),
                    username : $('.username').val(),
                    email : $('.email').val(),
                    place : $('.place').val()
                },function (response) {
                    if(response){
                        layer.alert('添加成功！',{
                            title: '提示框',
                            icon:1,
                        });
                    }
        
                })
                layer.close(index);
            }
        });
    });
    
    
    
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
})

/*/!*用户-查看*!/
function member_show(title,url,id,w,h){
    layer_show(title,url+'#?='+id,w,h);
}
/!*用户-停用*!/
function member_stop(obj,id){
    layer.confirm('确认要停用吗？',function(index){
        $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" class="btn btn-xs " onClick="member_start(this,id)" href="javascript:;" title="启用"><i class="icon-ok bigger-120"></i></a>');
        $(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已停用</span>');
        $(obj).remove();
        layer.msg('已停用!',{icon: 5,time:1000});
    });
}

/!*用户-启用*!/
function member_start(obj,id){
    layer.confirm('确认要启用吗？',function(index){
        $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" class="btn btn-xs btn-success" onClick="member_stop(this,id)" href="javascript:;" title="停用"><i class="icon-ok bigger-120"></i></a>');
        $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
        $(obj).remove();
        layer.msg('已启用!',{icon: 6,time:1000});
    });
}

/!*用户-删除*!/
function member_del(obj,id){
    layer.confirm('确认要删除吗？',function(index){
        $(obj).parents("tr").remove();
        layer.msg('已删除!',{icon:1,time:1000});
    });
}*/

