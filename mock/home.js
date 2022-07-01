
const _ = require("lodash")
const Mock = require('mockjs')
var store = require('@/store')
//界面更新后会重新执行
const homeList = Mock.mock({
    data_zh: { 
        "globalUserPercent": [
            { "country": "中国", "count": 366, "percentage": 44.1 }, 
            { "country": "美国", "count": 84, "percentage": 10.12 }, 
            { "country": "印度", "count": 55, "percentage": 6.63 }, 
            { "country": "意大利", "count": 18, "percentage": 2.17 }, 
            { "country": "土耳其", "count": 16, "percentage": 1.93 }, 
            { "country": "德国", "count": 14, "percentage": 1.69 }, 
            { "country": "日本", "count": 11, "percentage": 1.33 }, 
            { "country": "巴西", "count": 11, "percentage": 1.33 }, 
            { "country": "俄罗斯", "count": 11, "percentage": 1.33 }, 
            { "country": "其它", "count": 244, "percentage": 29.4 }
        ], 
        "register30Day": { "2022-05-28": 24, "2022-05-29": 10, "2022-05-30": 13, "2022-05-31": 11, "2022-06-01": 8, "2022-06-02": 2, "2022-06-05": 15, "2022-06-06": 13, "2022-06-07": 6, "2022-06-08": 7, "2022-06-09": 13, "2022-06-10": 12, "2022-06-11": 7, "2022-06-12": 11, "2022-06-13": 10, "2022-06-14": 5, "2022-06-15": 22, "2022-06-16": 13, "2022-06-17": 11, "2022-06-18": 27, "2022-06-19": 17, "2022-06-20": 16, "2022-06-21": 21, "2022-06-22": 10, "2022-06-23": 9, "2022-06-24": 21, "2022-06-25": 8, "2022-06-26": 10, "2022-06-27": 18, "2022-06-28": 4 }, "register7Day": { "2022-06-22": 10, "2022-06-23": 9, "2022-06-24": 21, "2022-06-25": 8, "2022-06-26": 10, "2022-06-27": 18, "2022-06-28": 4 }, 
        "userCount": 830, 
        "registerToday": [
            { "country": "波兰", "nickName": "0128", "createdTime": "2022-06-29T15:47:09+08:00" }, 
            { "country": "中国", "nickName": "6880", "createdTime": "2022-06-29T16:47:09+08:00" }, 
            { "country": "美国", "nickName": "3328", "createdTime": "2022-06-29T17:47:09+08:00" }, 
            { "country": "中国", "nickName": "刘坤", "createdTime": "2022-06-29T18:47:09+08:00" }
        ], 
        "dayOfActive": 13, 
        "weekOfIncreaseTop": [
            { "country": "中国", "count": 10 }, 
            { "country": "美国", "count": 2 }, 
            { "country": "法国", "count": 1 }, 
            { "country": "埃及", "count": 1 }, 
            { "country": "缅甸", "count": 1 }, 
            { "country": "印度尼西亚", "count": 1 }, 
            { "country": "马来西亚", "count": 1 }, 
            { "country": "俄罗斯", "count": 1 }, 
            { "country": "乌克兰", "count": 1 }, 
            { "country": "德国", "count": 3 }
        ], 
        "monthOfActive": 310, 
        "dayOfRegister": 4 
    },
    data_en:{
        "globalUserPercent":[
            {"country":"China","count":366,"percentage":44.1},
            {"country":"America","count":84,"percentage":10.12},
            {"country":"India","count":55,"percentage":6.63},
            {"country":"Italy","count":18,"percentage":2.17},
            {"country":"Turkey","count":16,"percentage":1.93},
            {"country":"Germany","count":14,"percentage":1.69},
            {"country":"Japan","count":11,"percentage":1.33},
            {"country":"Brazil","count":11,"percentage":1.33},
            {"country":"Russia","count":11,"percentage":1.33},
            {"count":244,"percentage":29.4}
        ],
        "register30Day":{"2022-05-28":24,"2022-05-29":10,"2022-05-30":13,"2022-05-31":11,"2022-06-01":8,"2022-06-02":2,"2022-06-05":15,"2022-06-06":13,"2022-06-07":6,"2022-06-08":7,"2022-06-09":13,"2022-06-10":12,"2022-06-11":7,"2022-06-12":11,"2022-06-13":10,"2022-06-14":5,"2022-06-15":22,"2022-06-16":13,"2022-06-17":11,"2022-06-18":27,"2022-06-19":17,"2022-06-20":16,"2022-06-21":21,"2022-06-22":10,"2022-06-23":9,"2022-06-24":21,"2022-06-25":8,"2022-06-26":10,"2022-06-27":18,"2022-06-28":4},"register7Day":{"2022-06-22":10,"2022-06-23":9,"2022-06-24":21,"2022-06-25":8,"2022-06-26":10,"2022-06-27":18,"2022-06-28":4},
        "userCount":830,
        "registerToday":[
            {"country":"Poland","nickName":"0128","createdTime":"2022-06-29T15:47:09+08:00"},
            {"country":"China","nickName":"6880","createdTime":"2022-06-29T16:47:09+08:00"},
            {"country":"America","nickName":"3328","createdTime":"2022-06-29T17:47:09+08:00"},
            {"country":"China","nickName":"刘坤","createdTime":"2022-06-29T18:47:09+08:00"}
        ],
        "dayOfActive":13,
        "weekOfIncreaseTop":[
            {"country":"China","count":10},
            {"country":"America","count":2},
            {"country":"France","count":1},
            {"country":"Egypt","count":1},
            {"country":"Burma","count":1},
            {"country":"Indonesia","count":1},
            {"country":"Malaysia","count":1},
            {"country":"Russia","count":1},
            {"country":"Ukraine","count":1},
            {"country":"Germany","count":3}
        ],
        "monthOfActive":310,
        "dayOfRegister":4
    }
})
module.exports = [
    { //获取首页信息
        url: '/home/getHomeInfo',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: store.default.getters.language == 'en' ? homeList.data_en : homeList.data_zh
            }
        }
    }
]
