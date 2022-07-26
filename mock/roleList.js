
const _ = require("lodash")
const Mock = require('mockjs')
const data = Mock.mock({
    roleList: [
        {"id":6,"i18n":true,"created":"2021-01-16T13:29:03","updated":"2021-01-17T15:50:45","status":1,"name":"common.admin","code":"admin","remark":"tip.permissionModified","menuIds":[],"switchStatus":true},
        {"id":7,"i18n":true,"created":"2021-12-14T15:12:07","updated":"2021-12-14T15:12:15","status":1,"name":"common.developer","code":"developer","remark":"common.developer","menuIds":[],"switchStatus":true}
    ]

})
module.exports = [
    { 
        url: '/role/getRoleList',
        type: 'get',
        response: config => {
            const items = data.roleList;
            const paging = _.chunk(items, 10);
            const filterItem = paging[parseInt(config.query.current-1)].filter(v=>{
                if(config.body.roleId){
                    return v.username == config.body.roleId;
                }else if(config.body.nickName) {
                    return v.nickName == config.body.nickName;
                }else {
                    return v;
                }
            })
            
            return {
                code: 200,
                data:{
                    total: (paging.length * 10),
                    current: config.query.current,
                    size: items.length < 10 ? (items.length+10) : items.length,
                    items: filterItem
                }
            }
        }
    },
    { 
        url: '/role/addRole',
        type: 'post',
        response: config => {
            data.roleList.push(config.body);
            return {
                code: 200,
                data: {
                    code:200,
                    message:'success'
                }
            }
        }
    },
    { 
        url: '/account/delectAccount',
        type: 'delete',
        response: config => {
            data.roleList = data.roleList.filter(function (item) {
                return config.body.indexOf(item.id) == -1;
            })
            return {
                code: 200,
                data: {
                    code:200,
                    message:'success'
                }
            }
        }
    }
]