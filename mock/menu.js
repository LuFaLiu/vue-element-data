const _ = require("lodash")
const Mock = require('mockjs')

const paramsList = Mock.mock({
    'menuList': [
        {
            "id":1,"status":1,"parentId":0,"title":"menu.interfaceConfiguration","path":null,"name":"page:manage","component":null,"type":1,"icon":null,"orderNum":1,
            "children":[
                {
                    "id":2,"status":1,"parentId":1,"title":"menu.addInterface","path":"/pageConfig/addPage","name":"page:manage:add","component":"pageConfig/addPage","type":2,"icon":"","orderNum":1,"children":[]
                },
                {
                    "id":3,"status":1,"parentId":1,"title":"menu.interfaceRule","path":"/pageConfig/pageRule","name":"page:manage:rule","component":"pageConfig/pageRule","type":2,"icon":null,"orderNum":2,"children":[]
                }
            ]
        },
        {   "id":4,"status":1,"parentId":0,"title":"menu.systemManage","path":"","name":"sys:manage","component":"","type":1,"icon":"icon-setting","orderNum":3,
            "children":[
                {
                    "id":5,"status":1,"parentId":4,"title":"menu.accountManage","path":"/sys/accountListData","name":"sys:account:listData","component":"sys/AccountListData","type":2,"icon":"el-icon-s-order","orderNum":5,
                    "children":[
                        {
                            "id":6,"status":1,"parentId":5,"title":"menu.addAccount","path":"/sys/addAccountData","name":"sys:account:addData","component":"sys/addAccountData","type":3,"icon":null,"orderNum":1,"children":[]
                        }
                    ]
                },
                /*
                {
                    "id":10,"status":1,"parentId":4,"title":"menu.roleManage","path":"/roleManage/role","name":"role:manage:list","component":"roleManage/role","type":2,"icon":"el-icon-s-order","orderNum":6,
                    "children":[]
                }
                */
            ]
        },
        {"id":7,"name":"sys:tools","title":"menu.systemTools","icon":"icon-tool","path":"","component":null,"type":1,
            "children":[
                {"id":8,"parentId":7,"name":"systools:menu:manage","title":"menu.menuManage","icon":"el-icon-menu","path":"/systools/menus","component":"systools/Menu","children":[]},
                {"id":9,"parentId":7,"name":"systools:menu:role","title":"menu.rightsManagement","icon":"el-icon-menu","path":"/systools/role","component":"systools/role","children":[]}
            ]
        }
    ]
})
module.exports = [
    { 
        url: '/menu/getmenuList',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: paramsList.menuList
            }
        }
    },
    { 
        url: '/menu/operateMenu',
        type: 'post',
        response: config => {
            operateMenuInfo(paramsList.menuList,config.body);
            return {
                code: 200,
                data: paramsList.menuList
            }
        }
    },
    { 
        url: '/menu/editMenu',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: getMenuInfo(paramsList.menuList,config.query.id)
            }
        }
    },
    { 
        url: '/menu/deleteMenu',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: _.filter(paramsList.list,function (item) {
                    return item.pageName == config.query[0];
                })
            }
        }
    }
]


function getMenuInfo(list,id,result = []) {

    _.filter(list,function (item) {
        result = (item.id == id ? item : (item.children ? getMenuInfo(item.children,id,result) : {}))
    })

    if(_.isObject(result)){
        return result;
    }
}

function operateMenuInfo(list,data) {
    _.filter(list,function (item) {
        if(data.id){ 
            return item.id == data.id ? _.mergeWith(item,data) : operateMenuInfo(item.children,data);
        }else if(data.parentId == 0){ 
            data.id = Date.now();
            data.children = [];
            return list.push(data);
        }else if(data.parentId && !data.id){ 
            if(item.id == data.parentId){
                data.id = Date.now();
            }
            return item.id == data.parentId ? item.children.push(data) : operateMenuInfo(item.children,data);
        }
    }) 
}