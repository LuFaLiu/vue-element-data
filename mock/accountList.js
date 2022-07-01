
const _ = require("lodash")
const Mock = require('mockjs')
const data = Mock.mock({
    accountList: [
        {"id":1,"created":"2022-06-29T10:47:09+08:00","status":1,"username":"admin","password":"123456","nickName":"admin","email":"","phone":"13352468136","sex":0,"country":"中国"},
        {"id":2,"created":"2022-06-29T11:00:09+08:00","status":1,"username":"developer","password":"123456","nickName":"developer","email":"","phone":"13352668456","sex":0,"country":"中国"}
    ],

})
module.exports = [
    { 
        url: '/account/getAccountList',
        type: 'get',
        response: config => {
            const items = data.accountList;
            const paging = _.chunk(items, 10);
            return {
                code: 200,
                data:{
                    total: (paging.length * 10),
                    current: config.query.current,
                    size: items.length < 10 ? (items.length+10) : items.length,
                    items: paging[parseInt(config.query.current-1)]
                }
            }
        }
    },
    { 
        url: '/account/addAccount',
        type: 'post',
        response: config => {
            data.accountList.push(config.body);
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
            data.accountList = data.accountList.filter(function (item) {
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