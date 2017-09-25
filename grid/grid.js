var curTr = null //记录修改哪一行
var curSearch=false //记录是否点击查找
function getId(id) {
    return document.getElementById(id);
}
function getTagName(tagName, father) {
    father = father || document;
    return father.getElementsByTagName(tagName);
}
//声明一个全局变量，如何将grid的参数附给他？
function grid(config) {
    // alert(typeof config.delHandler);
    grid.config = config; //动态开辟空间
    var table = document.createElement('table');
    //拼表的名字
    table.appendChild(grid.createCaption());
    //拼thead
    table.appendChild(grid.createTHead());
    //拼tbody
    table.appendChild(grid.createBody());
    getId(grid.config.divId).appendChild(table);

   
}
//创建行  传一个对象  通过配置表来判断是否在行里加删除，添加主键等操作
grid.createTr = function(data) {
    var tr = document.createElement('tr'),td;
    for (var i in data) {
        td = document.createElement('td');
        if (typeof this.config.addHandler == 'function' && i == this.config.id) {
            td.innerHTML = '<a href="#" onclick=grid.showDialog(this)>' + data[i] + '</a>';

        } else {
            td.innerText = data[i];
        }
        tr.appendChild(td);
    }
    if (typeof this.config.delHandler == 'function') {
        tr.innerHTML += '<td><a href="#" onclick="grid.del(this)" data-id=' + data[this.config.id] + '>删除</a></td>';
    }
    return tr;
}
grid.createCaption = function() {
    var caption = document.createElement('caption');
    caption.innerText = this.config.name;
    if (typeof this.config.addHandler == 'function') {
        caption.innerHTML += '<a href="#" onclick="grid.showDialog(this)" data-flag="true">新增</a>';
    }
    if(typeof this.config.searchHandler=='function'){
    
        caption.innerHTML+='<img  id="searchBtn" onclick="grid.search(this)" src="../images/search.png">';
        caption.innerHTML+='<input type="text" id="grif_search" placeholder="输入任意项">';
    }
    return caption;
}
//grid.showDialog()有没有传参来判断target 
//在弹框显示时就已经通过target真假来改变save里的data-flag值
//来执行不同的保存
grid.createTHead = function() {
    var thead = document.createElement('thead');
    var tr = document.createElement('tr'), td;
    for (var k in this.config.data[0]) {
        td = document.createElement('td');
        td.innerText = k;
        tr.appendChild(td);
    }
    if (typeof this.config.delHandler == 'function') {
        td = document.createElement('td');
        td.innerText = 'operation';
        tr.appendChild(td);
    }
    thead.appendChild(tr);
    return thead;
}
grid.createBody = function() {
    var tbody = document.createElement('tbody'),tr;
    for (var i in this.config.data) {
        var tbodyDate = {};
        tbodyDate = this.config.data[i];
        tr = grid.createTr(tbodyDate);
        tbody.appendChild(tr);

    }
    return tbody;
}
//删除tr怎么删
grid.del = function(target) {
    if (confirm('确定删除？')) {
        var tr = target.parentNode.parentNode;
        getTagName('tbody')[0].removeChild(tr);
        this.config.delHandler(target.getAttribute('data-id'));
    }
}
grid.add = function() {
    var addHtml = {};
    for (var i = 0; i < this.config.fields.length; i++) {
        //对象插入 addHtml[]='';
        addHtml[this.config.fields[i].name] = getId(this.config.fields[i].name).value;
    }
    // console.log(addHtml);
    getTagName('tbody')[0].appendChild(grid.createTr(addHtml));
    this.config.addHandler(addHtml);

}

grid.update = function() {
    var tds = getTagName('td', curTr);
    var obj = {};
    for (var i = 0; i < this.config.fields.length; i++) {
        obj[this.config.fields[i].name] = getId(this.config.fields[i].name).value;
        if (i == 0) {} else tds[i].innerText = getId(this.config.fields[i].name).value;
    }

    this.config.updateHandler(obj);

}
grid.save = function(target) {
    if (getId('save').getAttribute('data-flag') == '1') {
        if (getId(this.config.id).value == '') {
            alert(''+this.config.id+'不能为空!');
            return;
        }
        grid.add(); //执行添加
    } else {
        grid.update(); //执行更新数据
    }
    grid.closeDialog();
}
grid.search=function(target){
    // curSearch=true;
    var tbody = document.createElement('tbody'),tr;
    var searchValue=getId('grif_search').value;  //获得输入框的值
    var tbodyDate = {};
    for(var i in this.config.data){
        for(var j in this.config.data[i]){
            if(this.config.data[i][j]==searchValue){
                // console.log(this.config.data[i]);
                    tbodyDate=this.config.data[i];
                 tr = grid.createTr(tbodyDate);            
                 tbody.appendChild(tr);
            }
        }
    }
    if(tbody.innerHTML==''){
        alert('没找到！');
    }
    // console.log(tbody);
     // getTagName('table')[0].removeChild('tbody');
     console.log(tbody.innerHTML);
     getTagName('tbody')[0].innerHTML=tbody.innerHTML;
  

}

//初始化整个弹窗
grid.initDialog = function() {
  var overlay=document.createElement('div');
    overlay.id='overlay';
    document.body.appendChild(overlay);
    //根据用户传来fields字段来拼content
    var fields=this.config.fields;
    var contentHtml=
    '<div id="dialog">\
        <div class="title">\
            <h1 id="hTitle">修 改</h1>\
            <span onclick="grid.closeDialog()">×</span>\
        </div>\
        <ul>';
    for(var i in fields){
        contentHtml+='<li>';
        contentHtml+='<label>'+fields[i].name+'</label>';
        switch(fields[i].type){
            case 'select':
                contentHtml+='<select id="'+fields[i].name+'">';
                for(var j in fields[i].option){
                    contentHtml+='<option value="'
                                +fields[i].option[j].value+'">'
                    contentHtml+=fields[i].option[j].text;
                    contentHtml+='</option>';
                }
                contentHtml+='</select>';
                break;
            default:
                contentHtml+='<input id="'+fields[i].name+'" />';
                break;
        }
        contentHtml+='</li>';
    }
    //拼两个按钮
    contentHtml+=
            '<li>\
                <input type="button" class="btn" value="Save" data-flag="1" onclick="grid.save(this)" id="save">\
                <input type="button" class="btn" value="Cancel" onclick="grid.closeDialog()">\
             </li>'
    contentHtml+=
        '</ul>\
    </div>';
    overlay.innerHTML=contentHtml;
};

//打开
grid.showDialog = function(target) {
    grid.initDialog();
    getId('save').setAttribute('data-flag', target.getAttribute('data-flag') ? 1 : 0);
    if (target.getAttribute('data-flag')) {
        //新增   dialog清空
        getId('hTitle').innerText = '新 增';
        for (var i = 0; i < this.config.fields.length; i++) {
            getId(this.config.fields[i].name).value = '';
            getId(this.config.fields[i].name).disabled = '';
        }
    } else {
        getId('hTitle').innerText = '修 改';

        //修改
        //得到tr 如何得到所有td内容
        //将内容显示到diolag
        curTr = target.parentNode.parentNode;
        var tds = getTagName('td', curTr);
        for (var i = 0; i < this.config.fields.length; i++) {
            getId(this.config.fields[i].name).value = tds[i].innerText;
            getId(this.config.id).disabled = 'disabled';
        }

    }
    getId('overlay').style.display = 'block';
    getId('dialog').className = 'show';
}
//关闭
grid.closeDialog = function() {
    setTimeout(function() {
        getId('overlay').style.display = 'none';
    },
    700);getId('dialog').className = 'hide';

}