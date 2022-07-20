
const _ = require("lodash")
const Mock = require('mockjs')

const paramsList = Mock.mock({
    'list':
            [
                {
                    //account
                    "pageName": "sys:account:listData", 
                    "node": [{"id":1,"label":"elMain",
                    "children":[{"id":1000,"label":"elMain","componentRule":{"class":["accountList","container"]},
                    "children":[{"id":1001,"label":"elForm","componentRule":{"class":["searchForm","searchUser"]},
                    "children":[{"id":1002,"label":"elContainer","componentRule":{"class":["search-left","search-right"]},
                    "children":[{"id":1003,"label":"elFormItem","componentRule":{"label":"form.account"},
                    "children":[{"id":1004,"label":"elInput","componentRule":{"vModel":"searchForm.accountId","label":"","placeholder":["placeholder.pleaseEnter","form.account"]},
                    "children":[]}]},{"id":1005,"label":"elFormItem","componentRule":{"label":"form.nickName"},
                    "children":[{"id":1006,"label":"elInput","componentRule":{"vModel":"searchForm.nickName","placeholder":["placeholder.pleaseEnter","form.nickName"]},
                    "children":[]}]},{"id":1011,"label":"elFormItem","componentRule":{},
                    "children":[{"id":1012,"label":"elButton","componentRule":{"class":["addAccountBtn"],"event":"addAccount","icon":"el-icon-plus","title":["form.add"]},
                    "children":[]}]},{"id":1013,"label":"elFormItem","componentRule":{},
                    "children":[{"id":1014,"label":"elButton","componentRule":{"class":[""],"btnType":"danger","event":"delHandle","icon":"el-icon-delete","title":["form.batchDelete"]},
                    "children":[]}]}]},{"id":1655448696710,"label":"elContainer","componentRule":{"class":["search-right"]},
                    "children":[{"id":1655448703478,"label":"elFormItem","componentRule":{},
                    "children":[{"id":1655448732846,"label":"elButton","componentRule":{"class":["mic-btn-primary","searchAccount"],"event":"getDataList","title":["form.query"]},
                    "children":[]}]}]}]},{"id":1015,"label":"elTable","componentRule":{"label":"form.account","value":"username","rowKey":"","selectionEvent":"handleSelectionChange","defaultSort":{},"defaultExpandAll":false,"treeProp":{},"refName":"multipleTable","class":["accountTable"],"tableDataName":"tableData","tableHeightName":"tableHeight","style":"dark"},
                    "children":[{"id":1016,"label":"elTableColumn","componentRule":{"type":"selection","width":"55"},
                    "children":[]},{"id":1017,"label":"elTableColumn","componentRule":{"type":"index","label":"form.sortNum","width":"130"},
                    "children":[]},{"id":1018,"label":"elTableColumn","componentRule":{"label":"form.account","value":"username"},
                    "children":[]},{"id":1019,"label":"elTableColumn","componentRule":{"label":"form.name","value":"nickName","width":"120"},
                    "children":[]},{"id":1020,"label":"elTableColumn","componentRule":{"label":"form.phone","value":"phone"},
                    "children":[]},{"id":1023,"label":"elTableColumn","componentRule":{"type":"","operation":false,"label":"form.enableTime","value":"created","width":"200","formatDate":"true","align":""},
                    "children":[]},{"id":1024,"label":"elTableColumn","componentRule":{"type":"","operation":"true","label":"form.operation","value":"","width":"260","formatDate":false,"align":""},
                    "children":[{"id":1655445225301,"label":"elButton","componentRule":{"class":["editBtn"],"btnType":"text","event":"editHandle","title":["form.view"]},
                    "children":[]},{"id":1655445225302,"label":"elButton","componentRule":{"class":["editBtn"],"btnType":"text","event":"repassHandle","title":["form.resetPassword"],"params":"true"},
                    "children":[]}]}]},{"id":1655445225303,"label":"elPagination","componentRule":{"total":"0","size":"10","current":"1","params":"pageAttribute","layout":"prev, pager, next","pageSize":["10","20","50","100"],"class":["account-bottom"],"currentChangeName":"handleCurrentChange"},
                    "children":[]}]}]}]

                },
                {
                    //addAccount
                    pageName:'sys:account:addData',
                    node:[{"id":1,"label":"elMain",
                    "children":[{"id":1655518567184,"label":"elForm","componentRule":{"class":["demo-ruleForm"],"model":"ruleForm","labelWidth":"100px","refName":"ruleForm","formRule":"rules","labelPosition":"top"},
                    "children":[{"id":1655518666352,"label":"elFormItem","componentRule":{"label":"form.name","prop":"nickName"},
                    "children":[{"id":1655518862544,"label":"elInput","componentRule":{"inputType":"","label":"","prop":"","autocomplete":"","vModel":"ruleForm.nickName","placeholder":[""],"clearable":"true"},
                    "children":[]}]},{"id":1655520405375,"label":"elFormItem","componentRule":{"label":"form.passWord","prop":"password"},
                    "children":[{"id":1655520424192,"label":"elInput","componentRule":{"vModel":"ruleForm.password","placeholder":[""],"clearable":"true"},
                    "children":[]}]},{"id":1655531011017,"label":"elFormItem","componentRule":{"label":"form.sex","prop":"sex"},
                    "children":[{"id":1655531035841,"label":"elRadioGroup","componentRule":{"vModel":"ruleForm.sex","radioListName":"radioList"},
                    "children":[]}]},{"id":1655531716376,"label":"elFormItem","componentRule":{"label":"form.phone","prop":"phone"},
                    "children":[{"id":1655531770993,"label":"elInput","componentRule":{"inputType":"","label":"","prop":"","autocomplete":"","vModel":"phoneParams","placeholder":[""],"clearable":"true","maxlength":"11"},
                    "children":[]}]},{"id":1655531791567,"label":"elFormItem","componentRule":{"label":"form.email","prop":"email"},
                    "children":[{"id":1655531805793,"label":"elInput","componentRule":{"vModel":"ruleForm.email","placeholder":[""],"clearable":"true"},
                    "children":[]}]},{"id":1655533665134,"label":"elFormItem","componentRule":{},
                    "children":[{"id":1655533710799,"label":"elButton","componentRule":{"class":["mic-btn-primary"],"params":true,"ref":"ruleForm","paramsName":"ruleForm","event":"submitForm","title":["form.save"],"elFormStatus":""},
                    "children":[]}]}]}]}]
                },
                {
                    pageName:'role:manage:list',
                    node:[{"id":1,"label":"elMain","children":[{"id":1657271682335,"label":"elContainer","componentRule":{"class":["roleManage"]},"children":[{"id":1657271714703,"label":"elContainer","componentRule":{"class":["dataCout_title"],"elContainerTitle":"menu.roleManage"},"children":[]}]}]}]
                },
                {
                    pageName:'page:manage:rule',
                    "node":[{"id":1,"label":"elMain","children":[{"id":1658282536249,"label":"elMain","componentRule":{"class":["accountList","container"]},
                    "children":[
                    {
                        "id":1658282549986,"label":"elForm","componentRule":{"class":["searchForm","searchUser"]},
                        "children":[{"id":1658282564937,"label":"elContainer","componentRule":{"class":["search-left"]},
                        "children":[{"id":1658282577273,"label":"elFormItem","componentRule":{"label":"form.sorting"},
                        "children":[{"id":1658282607914,"label":"elInput","componentRule":{"paramsName":"searchForm","vModel":"orderNum","placeholder":["placeholder.pleaseEnter","form.sorting"]},
                        "children":[]}]},{"id":1658283854305,"label":"elFormItem","componentRule":{"label":"form.searchReferenceName"},
                        "children":[{"id":1658283879570,"label":"elLevelSelect","componentRule":{"paramsName":"searchForm","vModel":"referenceName","placeholder":["placeholder.pleaseSelect","persion.problemCategory"],"elOptionList":"levelSelectList"},
                        "children":[]}]},{"id":1658283893793,"label":"elFormItem","componentRule":{},
                        "children":[{"id":1658283919369,"label":"elButton","componentRule":{"class":["addAccountBtn"],"event":"addContent","icon":"el-icon-plus","title":["form.add"]},
                        "children":[]}]}]},{"id":1658283930161,"label":"elContainer","componentRule":{"class":["search-right"]},
                        "children":[{"id":1658283937962,"label":"elFormItem","componentRule":{},
                        "children":[{"id":1658283961793,"label":"elButton","componentRule":{"class":["mic-btn-primary","searchAccount"],"event":"queryList","title":["form.query"]},
                        "children":[]}]}]}]
                    },
                    {
                        "id":1658284977880,"label":"elTable","componentRule":{"tableDataName":"tableData","tableHeightName":"tableHeight","refName":"multipleTable","tooltipEffect":"dark","style":"width: 100%;margin-bottom: 20px;","class":["accountTable"],"stripe":false,"defaultSort":{"prop":"orderNum","order":"ascending"},"defaultExpandAll":true,"treeProp":{"children":"childrenNode","hasChildren":"hasChildren"},"rowKey":"id"},
                        "children":[{"id":1658286089968,"label":"elTableColumn","componentRule":{"label":"pageRule.componentName","value":"componentName"},
                        "children":[]},{"id":1658286110129,"label":"elTableColumn","componentRule":{"label":"pageRule.attributeName","value":"attributeName"},
                        "children":[]},{"id":1658286122185,"label":"elTableColumn","componentRule":{"label":"pageRule.attributeName","value":"attributeName"},
                        "children":[]},{"id":1658286134352,"label":"elTableColumn","componentRule":{"label":"pageRule.attributeType","value":"attributeType"},
                        "children":[]},{"id":1658286149704,"label":"elTableColumn","componentRule":{"label":"pageRule.attributeLabel","value":"attributeLabel"},
                        "children":[]},{"id":1658286166984,"label":"elTableColumn","componentRule":{"label":"pageRule.attributeModel","value":"attributeModel"},
                        "children":[]},{"id":1658285051144,"label":"elTableColumn","componentRule":{"label":"table.operation","width":"260","align":"center","operation":true},
                        "children":[{"id":1658285295560,"label":"elButton","componentRule":{"class":["editBtn"],"btnType":"text","event":"editContent","title":["form.edit"],"params":false,"paramsName":"row"},
                        "children":[]},{"id":1658286050856,"label":"elButton","componentRule":{"class":["delBtn"],"btnType":"text","event":"delHandle","title":["form.delete"],"params":false,"paramsName":"row"},
                        "children":[]}]},
                    ]
                    },
                    {"id":1658298281089,"label":"elPagination","componentRule":{"total":"0","size":"10","current":"1","params":"pageAttribute","layout":"prev, pager, next","pageSize":["10","20","50","100"],"class":["account-bottom"],"currentChangeName":"handleCurrentChange"},"children":[]},
                    {"id":1658298488408,"label":"elDialog","componentRule":{"title":["form.add"],"width":"850px","dialogShowName":"addContentDialog","condition":"editMethodUser","closeMethodName":"handleClose","center":"center"},
                    "children":[{"id":1658298543688,"label":"elForm","componentRule":{"class":[""],"model":"paramsData","labelWidth":"230px","refName":"formRef","formRule":"paramsDataRules"},
                    "children":[{"id":1658299622776,"label":"elContainer","componentRule":{"class":["helpInfo"],"refName":"helpInfo"},
                    "children":[{"id":1658298575240,"label":"elFormItem","componentRule":{"label":"pageRule.componentType","prop":"componentType","elFormItemCondition":"editMethodUser"},
                    "children":[{"id":1658298613088,"label":"elLevelSelect","componentRule":{"paramsName":"pageRule.componentType","vModel":"paramsData.componentType","placeholder":["placeholder.pleaseSelect","pageRule.componentType"],"clearable":true,"elOptionList":"levelSelectList"},
                    "children":[]}]},{"id":1658299303232,"label":"elFormItem","componentRule":{"label":"pageRule.attributeName","prop":"attributeName"},
                    "children":[{"id":1658299356488,"label":"elInput","componentRule":{"vModel":"paramsData.attributeName","label":"pageRule.attributeName","autocomplete":"off","placeholder":["placeholder.pleaseEnter","pageRule.attributeName"],"clearable":true},"children":[]}]},
                    {"id":1658299415840,"label":"elFormItem","componentRule":{"label":"pageRule.attributeType","prop":"attributeType"},
                    "children":[{"id":1658299449488,"label":"elInput","componentRule":{"inputType":"","vModel":"paramsData.attributeType","label":"pageRule.attributeType","autocomplete":"off","placeholder":["placeholder.pleaseEnter","pageRule.attributeType"],"clearable":true},
                    "children":[]}]},{"id":1658299522632,"label":"elFormItem","componentRule":{"label":"pageRule.attributeModel","prop":"attributeModel"},
                    "children":[{"id":1658299563872,"label":"elInput","componentRule":{"paramsName":"","vModel":"paramsData.attributeModel","label":"pageRule.attributeModel","autocomplete":"off","placeholder":["placeholder.pleaseEnter","pageRule.attributeModel"],"clearable":true},
                    "children":[]}]},{"id":1658299473120,"label":"elFormItem","componentRule":{"label":"pageRule.attributeLabel","prop":"attributeLabel"},
                    "children":[{"id":1658299506104,"label":"elInput","componentRule":{"paramsName":"pageRule.attributeLabel","vModel":"paramsData.attributeLabel","autocomplete":"off","placeholder":["placeholder.pleaseEnter","pageRule.attributeLabel"],"clearable":true},
                    "children":[]}]},{"id":1658298627688,"label":"elFormItem","componentRule":{"label":"pageRule.componentName","prop":"componentName"},
                    "children":[{"id":1658298722760,"label":"elInput","componentRule":{"paramsName":"","inputType":"","vModel":"paramsData.componentName","label":"form.componentName","autocomplete":"off","placeholder":["placeholder.pleaseEnter","pageRule.componentName"],"clearable":true,"inputCondition":"editMethodUser"},
                    "children":[]}]}]},{"id":1658299686816,"label":"elContainer","componentRule":{"class":["dialog-footer"]},
                    "children":[{"id":1658299696128,"label":"elFormItem","componentRule":{},
                    "children":[{"id":1658299788416,"label":"elButton","componentRule":{"btnType":"","icon":"","params":true,"paramsName":"formRef","elFormStatus":"resetFieldStatus","class":["el-button--default"],"event":"resetForm","title":["form.cancel"],"ref":"paramsData"},"children":[]},
                    {"id":1658300193407,"label":"elButton","componentRule":{"class":["saveMethodList"],"btnType":"primary","event":"submitForm","title":["form.save"],"ref":"","elFormStatus":"resetFieldStatus","params":true,"paramsName":"formRef"},"children":[]}]
                    }]}]}]}

                    ]}]}]
                },
                {
                    //权限管理(测试数据)
                    "pageName": "systools:menu:role", 
                    "node": [{"id":1,"label":"elMain",
                    "children":[{"id":1000,"label":"div","componentRule":{"resizeMethod":"onResize","class":["accountList","container"]},
                    "children":[{"id":1001,"label":"elForm","componentRule":{"class":["searchForm","searchUser"]},
                    "children":[{"id":1002,"label":"div","componentRule":{"class":["search-left","search-right"]},
                    "children":[{"id":1003,"label":"elFormItem","componentRule":{"label":"form.account"},
                    "children":[{"id":1004,"label":"elInput","componentRule":{"vModel":"searchForm.accountId","label":"","placeholder":["placeholder.pleaseEnter","form.account"]},
                    "children":[]}]},{"id":1005,"label":"elFormItem","componentRule":{"label":"form.nickName"},
                    "children":[{"id":1006,"label":"elInput","componentRule":{"vModel":"searchForm.nickName","placeholder":["placeholder.pleaseEnter","form.nickName"]},
                    "children":[]}]},{"id":1007,"label":"elFormItem","componentRule":{"label":"form.roleName"},
                    "children":[{"id":1008,"label":"elSelect","componentRule":{"vModel":"searchForm.roleId","placeholder":["placeholder.pleaseSelect"],"elOptionList":"selectRole"},
                    "children":[]}]},{"id":1009,"label":"elFormItem","componentRule":{"label":"form.statu"},
                    "children":[{"id":1010,"label":"elSelect","componentRule":{"vModel":"searchForm.status","placeholder":["placeholder.pleaseSelect"],"elOptionList":"selectStatus"},
                    "children":[]}]},{"id":1011,"label":"elFormItem","componentRule":{},
                    "children":[{"id":1012,"label":"elButton","componentRule":{"class":["addAccountBtn"],"event":"addAccount","icon":"el-icon-plus","title":["form.add"]},
                    "children":[]}]},{"id":1013,"label":"elFormItem","componentRule":{},
                    "children":[{"id":1014,"label":"elButton","componentRule":{"class":[""],"btnType":"danger","event":"delHandle","icon":"el-icon-delete","title":["form.batchDelete"]},
                    "children":[]}]}]},{"id":1655448696710,"label":"div","componentRule":{"class":["search-right"]},
                    "children":[{"id":1655448703478,"label":"elFormItem","componentRule":{},
                    "children":[{"id":1655448732846,"label":"elButton","componentRule":{"class":["mic-btn-primary","searchAccount"],"event":"getUserList","title":["form.query"]},
                    "children":[]}]}]}]},{"id":1015,"label":"elTable","componentRule":{"label":"form.account","value":"accountId","rowKey":"","selectionEvent":"","defaultSort":{},"defaultExpandAll":false,"treeProp":{},"refName":"multipleTable","class":["accountTable"],"tableDataName":"tableData","tableHeightName":"","style":"dark"},
                    "children":[{"id":1016,"label":"elTableColumn","componentRule":{"type":"selection","width":"55"},
                    "children":[]},{"id":1017,"label":"elTableColumn","componentRule":{"type":"index","label":"form.sortNum","width":"55"},
                    "children":[]},{"id":1018,"label":"elTableColumn","componentRule":{"label":"form.account","value":"accountId"},
                    "children":[]},{"id":1019,"label":"elTableColumn","componentRule":{"label":"form.name","value":"nickName","width":"120"},
                    "children":[]},{"id":1020,"label":"elTableColumn","componentRule":{"label":"form.phone","value":"phone"},
                    "children":[]},{"id":1021,"label":"elTableColumn","componentRule":{"label":"form.roleName","value":"code"},
                    "children":[]},{"id":1022,"label":"elTableColumn","componentRule":{"type":"","operation":"false","label":"form.recentlylogintime","value":"updated","width":"200","formatDate":"true","align":""},
                    "children":[]},{"id":1023,"label":"elTableColumn","componentRule":{"type":"","operation":false,"label":"form.enableTime","value":"created","width":"200","formatDate":"true","align":""},
                    "children":[]},{"id":1024,"label":"elTableColumn","componentRule":{"type":"","operation":"true","label":"form.operation","value":"","width":"260","formatDate":false,"align":""},
                    "children":[{"id":1655445225301,"label":"elButton","componentRule":{"class":["editBtn"],"btnType":"text","event":"editHandle","title":["form.view"]},
                    "children":[]},{"id":1655445225302,"label":"elButton","componentRule":{"class":["editBtn"],"btnType":"text","event":"repassHandle","title":["form.resetPassword"],"params":"true"},
                    "children":[]}]}]},{"id":1655445225303,"label":"elPagination","componentRule":{"total":"0","size":"10","current":"1","params":"pageAttribute","layout":"prev, pager, next, total","pageSize":["10","20","50","100"],"class":["account-bottom"],"currentChangeName":"handleCurrentChange"},
                    "children":[]},{"id":1655445225304,"label":"elDialog","componentRule":{"title":["form.add"],"width":"600px","dialogShowName":"dialogVisible","condition":"","closeMethodName":"handleClose"},
                    "children":[{"id":1655445318616,"label":"elForm","componentRule":{"title":["form.add"],"width":"600px","dialogShowName":"dialogVisible","condition":"","closeMethodName":"handleClose","class":[""],"model":"editForm","upladRef":"editFormRules","refName":"editForm","labelWidth":"230px"},
                    "children":[{"id":1655447997351,"label":"elContainer","componentRule":{"class":[""]},
                    "children":[{"id":1655448015952,"label":"elFormItem","componentRule":{"label":"form.account","prop":"accountId"},
                    "children":[{"id":1655448059727,"label":"elInput","componentRule":{"vModel":"editForm.accountId","placeholder":[""],"clearable":"true"},
                    "children":[]}]},{"id":1655448163223,"label":"elFormItem","componentRule":{"label":"form.email","prop":"email"},
                    "children":[{"id":1655448185327,"label":"elInput","componentRule":{"vModel":"editForm.phone","autocomplete":"off","placeholder":[""],"clearable":"true"},
                    "children":[]}]},{"id":1655448116504,"label":"elFormItem","componentRule":{"label":"form.nickName","prop":"nickName"},
                    "children":[{"id":1655448139791,"label":"elInput","componentRule":{"vModel":"editForm.nickName","autocomplete":"off","placeholder":[""]},
                    "children":[]}]},{"id":1655454730442,"label":"elFormItem","componentRule":{"label":"form.statu","prop":"status"},
                    "children":[{"id":1655454744346,"label":"elRadioGroup","componentRule":{"vModel":"editForm.status"},
                    "children":[]}]},{"id":1655448208486,"label":"elFormItem","componentRule":{},
                    "children":[{"id":1655448256271,"label":"elButton","componentRule":{"class":["editBtn"],"event":"resetForm","title":["form.cancel"]},
                    "children":[]},{"id":1655448285630,"label":"elButton","componentRule":{"class":[""],"btnType":"primary","event":"submitForm","title":["form.sure"]},
                    "children":[]}]}]}]}]}]}]}]

                }
            ]
})
module.exports = [
    { 
        url: '/page/addPageNode',
        type: 'post',
        response: config => {
            if (paramsList.list.length == 0) {
                paramsList.list.push(config.body);
            } else {
                _.filter(paramsList.list, function (item) { 
                    if (item.pageName == config.body.pageName) {
                        item.node = config.body.node;
                    } else {
                        paramsList.list.push(config.body);
                    }
                })
            }
            return {
                code: 200,
                data: paramsList.list
            }
        }
    },
    { 
        url: '/page/getPageNode',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: _.filter(paramsList.list, function (item) {
                    return item.pageName == config.query[0];
                })
            }
        }
    }
]