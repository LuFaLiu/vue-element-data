
const _ = require("lodash")
const Mock = require('mockjs')

const paramsList = Mock.mock({
    'list':
            [
                {
                    pageName:'page:manage:rule',
                    "node":[{"id":1,"label":"elMain",
                    "children":[{"id":1658282536249,"label":"elMain","componentRule":{"class":["accountList","container"]},
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
                    //account
                    "pageName": "sys:account:listData", 
                    "node": [{"id":2,"label":"elMain",
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
                    node:[{"id":3,"label":"elMain",
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
                    //role
                    pageName:'sys:roleManage:role',
                    node:[{
                        "id":4,"label":"elMain",
                        "children":[{"id":1658802148702,"label":"elMain","componentRule":{"class":["accountList","container"]},
                        "children":[{"id":1658802161166,"label":"elForm","componentRule":{"class":["searchForm","searchUser"]},
                        "children":[{"id":1658802191134,"label":"elContainer","componentRule":{"class":["search-left"]},
                        "children":[{"id":1658802265686,"label":"elContainer","componentRule":{"class":["dataCout_title"],"title":["menu.roleManage"]},
                        "children":[]}]},{"id":1658802199670,"label":"elContainer","componentRule":{"class":["search-right"]},
                        "children":[{"id":1658802358478,"label":"elButton","componentRule":{"class":["addAccountBtn"],"event":"addRole","icon":"el-icon-plus","title":["form.add"]},
                        "children":[]},{"id":1658802392878,"label":"elButton","componentRule":{"class":[""],"btnType":"danger","event":"delHandle","icon":"el-icon-delete","title":["form.delete"]},
                        "children":[]}]}]},{"id":1658802392879,"label":"elTable","componentRule":{"label":"form.account","value":"username","rowKey":"","selectionEvent":"handleSelectionChange","defaultSort":{},"defaultExpandAll":false,"treeProp":{},"refName":"multipleTable","class":["accountTable"],"tableDataName":"tableData","tableHeightName":"tableHeight","style":"dark"},
                        "children":[{"id":1658802392880,"label":"elTableColumn","componentRule":{"type":"selection","width":"55"},
                        "children":[]},{"id":1658802392881,"label":"elTableColumn","componentRule":{"type":"index","label":"table.serialNumber","width":"130"},
                        "children":[]},{"id":1658802392882,"label":"elTableColumn","componentRule":{"label":"routerMenu.roleName","value":"name"},
                        "children":[]},{"id":1658802392883,"label":"elTableColumn","componentRule":{"label":"table.roleRemark","value":"remark","width":"120"},
                        "children":[]},{"id":1658802392884,"label":"elTableColumn","componentRule":{"label":"form.statu","value":"status","tableColumnType":"multiple"},
                        "children":[]},{"id":1658802392885,"label":"elTableColumn","componentRule":{"type":"","operation":"true","label":"form.operation","value":"","width":"260","formatDate":false,"align":""},
                        "children":[{"id":1658802392886,"label":"elButton","componentRule":{"class":["editBtn"],"btnType":"text","event":"editHandle","title":["routerMenu.set_permission"]},
                        "children":[]},{"id":1658802392887,"label":"elButton","componentRule":{"class":["editBtn"],"btnType":"text","event":"repassHandle","title":["form.view"],"params":"true"},
                        "children":[]}]}]},{"id":1658802392888,"label":"elPagination","componentRule":{"total":"0","size":"10","current":"1","params":"pageAttribute","layout":"prev, pager, next","pageSize":["10","20","50","100"],"class":["account-bottom"],"currentChangeName":"handleCurrentChange"},
                        "children":[]}
                        ]}]
                    }]
                },
                {
                   //addRole
                   pageName:'sys:roleManage:addRole',
                   node:[{"id":5,"label":"elMain",
                   "children":[{"id":1658817202087,"label":"elMain","componentRule":{"class":["addRole"]},
                   "children":[{"id":1658817217239,"label":"elContainer","componentRule":{"title":["menu.addRole"],"class":["dataCout_title"]},"children":[]},
                   {"id":1658817365424,"label":"elForm","componentRule":{"class":["demo-editForm"],"model":"editForm","labelWidth":"100px","refName":"editForm","formRule":"editFormRules"},
                   "children":[{"id":1658817381975,"label":"elContainer","componentRule":{"class":["editForm_left"]},
                   "children":[{"id":1658817439759,"label":"elFormItem","componentRule":{"label":"routerMenu.roleName","prop":"name"},
                   "children":[{"id":1658817700280,"label":"elInput","componentRule":{"vModel":"editForm.name","autocomplete":"off","placeholder":["placeholder.pleaseEnter","routerMenu.roleName"],"inputCondition":"viewType"},"children":[]}]},
                   {"id":1658817462183,"label":"elFormItem","componentRule":{"label":"form.statu","prop":"status"},
                   "children":[{"id":1658817755183,"label":"elSelect","componentRule":{"paramsName":"","vModel":"editForm.status","placeholder":["placeholder.pleaseSelect"],"elOptionList":"roleStatus"},"children":[]}]},
                   {"id":1658817788720,"label":"elFormItem","componentRule":{"label":"table.roleRemark"},
                   "children":[{"id":1658817867919,"label":"elInput","componentRule":{"vModel":"editForm.remark","autocomplete":"off","placeholder":["placeholder.pleaseEnter","table.roleRemark"],"inputCondition":"viewType"},"children":[]}]}]},
                   {"id":1658817900103,"label":"elContainer","componentRule":{"class":["editForm_right"]},
                   "children":[{"id":1658817907823,"label":"elFormItem","componentRule":{},"children":[
                    {"id":1658817962199,"label":"elButton","componentRule":{"class":[""],"btnType":"primary","event":"resetForm","title":["form.cancel"]},"children":[]},
                    {"id":1658818020495,"label":"elButton","componentRule":{"class":[""],"btnType":"primary","event":"submitForm","title":["form.save"],"ref":""},"children":[]},
                    ]}]}]},
                    {"id":1658885457735,"label":"elTableTree","componentRule":{"class":["test"],"tableDataName":"tableTreeData","tableHeightName":"tableHeight","vModel":"tets"},"children":[]}
                    ]}]}]
                },
                {
                    //测试
                    pageName:'systools:menu:menutest',
                    node: [{"id":1,"label":"elMain",
                    "children":[{"id":1660353557977,"label":"ElForm","componentRule":{"model":"model","rules":"rules","labelPosition":"","labelWidth":"","labelSuffix":"","inline":"","inlineMessage":"","statusIcon":"","showMessage":true,"size":"","validateOnRuleChange":true,"hideRequiredAsterisk":""},
                    "children":[{"id":1660353568656,"label":"ElFormItem","componentRule":{"label":"Button","labelWidth":"100px","prop":"","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1660783994487,"label":"ElButton","componentRule":{"type":"primary","size":"","icon":"","nativeType":"button","loading":false,"disabled":false,"plain":false,"autofocus":false,"round":false,"circle":false,"title":"componentInfo.title","vModelName":"value"},
                    "children":[]},{"id":1660788326173,"label":"ElButton","componentRule":{"type":"success","size":"","icon":"","nativeType":"button","loading":false,"disabled":false,"plain":false,"autofocus":false,"round":false,"circle":false,"title":"componentInfo.title"},
                    "children":[]},{"id":1660788477109,"label":"ElButton","componentRule":{"type":"default","size":"","icon":"","nativeType":"button","loading":false,"disabled":false,"plain":true,"autofocus":false,"round":false,"circle":false,"title":"componentInfo.title"},
                    "children":[]},{"id":1660788515750,"label":"ElButton","componentRule":{"type":"primary","size":"","icon":"","nativeType":"button","loading":false,"disabled":false,"plain":false,"autofocus":false,"round":true,"circle":false,"title":"componentInfo.title"},
                    "children":[]},{"id":1660788549773,"label":"ElButton","componentRule":{"type":"warning","size":"","icon":"","nativeType":"button","loading":true,"disabled":false,"plain":false,"autofocus":false,"round":false,"circle":false,"title":"componentInfo.title"},
                    "children":[]},{"id":1660788575333,"label":"ElButton","componentRule":{"type":"info","size":"","icon":"","nativeType":"button","loading":false,"disabled":true,"plain":false,"autofocus":false,"round":false,"circle":false,"title":"componentInfo.title"},
                    "children":[]}]},{"id":1660789004789,"label":"ElFormItem","componentRule":{"label":"Link","labelWidth":"100px","prop":"","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1660789048677,"label":"ElLink","componentRule":{"type":"primary","underline":true,"disabled":false,"href":"","icon":"","title":"componentInfo.title"},
                    "children":[]},{"id":1660789657405,"label":"ElLink","componentRule":{"type":"success","underline":true,"disabled":false,"href":"","icon":"","title":"componentInfo.title"},
                    "children":[]},{"id":1660789734429,"label":"ElLink","componentRule":{"type":"info","underline":true,"disabled":true,"href":"","icon":"","title":"componentInfo.title"},
                    "children":[]}]},{"id":1660789817261,"label":"ElFormItem","componentRule":{"label":"Container","labelWidth":"100px","prop":"","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1660789854011,"label":"ElContainer","componentRule":{"direction":""},
                    "children":[{"id":1660789866867,"label":"ElHeader","componentRule":{"height":"60px","title":"componentInfo.title"},
                    "children":[]},{"id":1660789934012,"label":"ElFooter","componentRule":{"height":"60px","title":"componentInfo.title"},
                    "children":[]}]}]},{"id":1660791806365,"label":"ElFormItem","componentRule":{"label":"Radio","labelWidth":"100px","prop":"","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1660812301007,"label":"ElRadioGroup","componentRule":{"value":"value","size":"","fill":"","textColor":"","disabled":false},
                    "children":[{"id":1660791875075,"label":"ElRadio","componentRule":{"value":"value","label":"1","disabled":false,"name":"","title":"componentInfo.title","border":false,"size":""},
                    "children":[]},{"id":1660791853396,"label":"ElRadio","componentRule":{"value":"value","label":"2","disabled":false,"name":"","title":"componentInfo.title","border":false,"size":""},
                    "children":[]}]}]},{"id":1660791948900,"label":"ElFormItem","componentRule":{"label":"Checkbox","labelWidth":"100px","prop":"","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1660792026716,"label":"ElCheckbox","componentRule":{"value":"value","label":"title","indeterminate":false,"disabled":false,"checked":false,"name":"1","trueLabel":"","falseLabel":"","id":"","controls":"","border":false,"size":""},
                    "children":[]}]},{"id":1660812888704,"label":"ElFormItem","componentRule":{"label":"Input","labelWidth":"100px","prop":"","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1660813215336,"label":"ElInput","componentRule":{"value":"value","size":"","resize":"","form":"","disabled":false,"readonly":false,"type":"text","autosize":false,"autocomplete":"off","autoComplete":"","validateEvent":true,"suffixIcon":"","prefixIcon":"","label":"","clearable":false,"showPassword":false,"showWordLimit":"","tabindex":"","placeholder":"title"},
                    "children":[]}]},{"id":1660813712639,"label":"ElFormItem","componentRule":{"label":"InputNumber","labelWidth":"100px","prop":"","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1660813762199,"label":"ElInputNumber","componentRule":{"step":1,"stepStrictly":"","max":"10","min":"1","value":"value","disabled":false,"size":"","controls":true,"controlsPosition":"","name":"","label":"","placeholder":"number","precision":"0"},
                    "children":[]}]},{"id":1660877095960,"label":"ElFormItem","componentRule":{"label":"Select","labelWidth":"100px","prop":"","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1660879783663,"label":"ElSelect","componentRule":{"name":"","id":"","value":"value","autocomplete":"off","autoComplete":"","automaticDropdown":"","size":"","disabled":false,"clearable":false,"filterable":"","allowCreate":"","loading":false,"popperClass":"","remote":"","loadingText":"","noMatchText":"","noDataText":"","remoteMethod":"remoteMethod","filterMethod":"filterMethod","multiple":false,"multipleLimit":"1","placeholder":"select","defaultFirstOption":"","reserveKeyword":"","valueKey":"value","collapseTags":"","popperAppendToBody":false,"ElOptionListName":"ElOptionListName"},
                    "children":[]}]},{"id":1660888378894,"label":"ElFormItem","componentRule":{"label":"Cascader","labelWidth":"100px","prop":"","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1660888432231,"label":"ElCascader","componentRule":{"value":"value","options":"options","props":"props","size":"","placeholder":"select","disabled":false,"clearable":false,"filterable":"","filterMethod":"filterMethod","separator":" / ","showAllLevels":true,"collapseTags":"","debounce":300,"beforeFilter":"beforeFilter","popperClass":""},
                    "children":[]}]},{"id":1660889351822,"label":"ElFormItem","componentRule":{"label":"Switch","labelWidth":"100px","prop":"","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1660889432390,"label":"ElSwitch","componentRule":{"value":"value","disabled":false,"width":40,"activeIconClass":"#13ce66","inactiveIconClass":"#ff4949","activeText":"switchActive","inactiveText":"switchInActive","activeColor":"","inactiveColor":"","activeValue":"true","inactiveValue":"false","name":"","validateEvent":true,"id":""},
                    "children":[]}]},{"id":1660889832893,"label":"ElFormItem","componentRule":{"label":"Slider","labelWidth":"100px","prop":"","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1660890775317,"label":"ElSlider","componentRule":{"min":"1","max":100,"step":1,"value":"value","showInput":"","showInputControls":true,"inputSize":"small","showStops":"","showTooltip":true,"formatTooltip":"formatTooltip","disabled":false,"range":"","vertical":false,"height":"","debounce":300,"label":"","tooltipClass":"","marks":"marks"},
                    "children":[]}]},{"id":1660898872769,"label":"ElFormItem","componentRule":{"label":"TimePicker","labelWidth":"100px","prop":"","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1660898904937,"label":"ElTimePicker","componentRule":{"size":"","format":"HH:mm:ss","valueFormat":"","readonly":false,"placeholder":"select time","startPlaceholder":"","endPlaceholder":"","prefixIcon":"","clearIcon":"el-icon-circle-close","name":"","disabled":false,"clearable":false,"id":"","popperClass":"","editable":true,"align":"left","value":"value","defaultValue":"value","defaultTime":"","rangeSeparator":"-","pickerOptions":"pickerOptions","unlinkPanels":"","validateEvent":true,"isRange":true,"arrowControl":false},
                    "children":[]},{"id":1661243157133,"label":"ElTimeSelect","componentRule":{"size":"","format":"","valueFormat":"","readonly":false,"placeholder":"","startPlaceholder":"","endPlaceholder":"","prefixIcon":"","clearIcon":"el-icon-circle-close","name":"","disabled":false,"clearable":true,"id":"","popperClass":"","editable":true,"align":"left","value":"value","defaultValue":"","defaultTime":"","rangeSeparator":"-","pickerOptions":"pickerOptions","unlinkPanels":"","validateEvent":true},
                    "children":[]}]},{"id":1661305169369,"label":"ElFormItem","componentRule":{"label":"DatePicker","labelWidth":"100px","prop":"prop","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1661305297801,"label":"ElDatePicker","componentRule":{"size":"","format":"","valueFormat":"","readonly":false,"placeholder":"","startPlaceholder":"","endPlaceholder":"","prefixIcon":"","clearIcon":"el-icon-circle-close","name":"","disabled":false,"clearable":true,"id":"","popperClass":"","editable":true,"align":"left","value":"value","defaultValue":"","defaultTime":"","rangeSeparator":"-","pickerOptions":"pickerOptions","unlinkPanels":"","validateEvent":true,"type":"datetime"},
                    "children":[]}]},{"id":1661387685078,"label":"ElFormItem","componentRule":{"label":"Upload","labelWidth":"100px","prop":"prop","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":""},
                    "children":[{"id":1661387954070,"label":"ElUpload","componentRule":{"action":"https://jsonplaceholder.typicode.com/posts/","headers":"headers","data":"data","multiple":true,"name":"file","drag":false,"dragger":"","withCredentials":"","showFileList":true,"accept":"","type":"select","beforeUpload":"beforeUpload","beforeRemove":"beforeRemove","onRemove":"onRemove","onChange":"onChange","onPreview":"onPreview","onSuccess":"onSuccess","onProgress":"onProgress","onError":"onError","fileList":"fileList","autoUpload":true,"listType":"text","httpRequest":"","disabled":false,"limit":"limit","onExceed":"onExceed","class":"upload-demo"},
                    "children":[{"id":1661388543949,"label":"ElButton","componentRule":{"type":"primary","size":"small","icon":"","nativeType":"button","loading":false,"disabled":false,"plain":false,"autofocus":false,"round":false,"circle":false,"title":"upload"},
                    "children":[]},{"id":1661563428021,"label":"customContent","componentRule":{"componentName":"customContent","tag":"div","attributeName":"tipAttribute"},
                    "children":[]}]},{"id":1661569548236,"label":"ElUpload","componentRule":{"action":"https://jsonplaceholder.typicode.com/posts/","headers":"headers","data":"data","multiple":"","name":"file","drag":false,"dragger":"","withCredentials":"","showFileList":false,"accept":"","type":"select","beforeUpload":"beforeUpload","beforeRemove":"beforeRemove","onRemove":"onRemove","onChange":"onChange","onPreview":"onPreview","onSuccess":"onSuccess","onProgress":"onProgress","onError":"onError","fileList":"fileList","autoUpload":true,"listType":"text","httpRequest":"","disabled":false,"limit":"limit","onExceed":"onExceed","class":"avatar-uploader"},
                    "children":[{"id":1661569727299,"label":"customContent","componentRule":{"componentName":"customContent","tag":"img","attributeName":"imageAttribute"},
                    "children":[]},{"id":1661569742386,"label":"customContent","componentRule":{"componentName":"customContent","tag":"i","attributeName":"iconAttribute"},
                    "children":[]}]}]},{"id":1661819632972,"label":"ElFormItem","componentRule":{"label":"Rate","labelWidth":"100px","prop":"prop","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":"","class":""},
                    "children":[{"id":1661819668884,"label":"ElRate","componentRule":{"value":"value","lowThreshold":2,"highThreshold":4,"max":5,"colors":"colors","voidColor":"#C6D1DE","disabledVoidColor":"#EFF2F7","iconClasses":"iconClasses","voidIconClass":"el-icon-star-off","disabledVoidIconClass":"el-icon-star-on","disabled":false,"allowHalf":"","showText":false,"showScore":false,"textColor":"#1f2d3d","texts":"texts","scoreTemplate":"{value}","class":""},
                    "children":[]},{"id":1661820612211,"label":"ElRate","componentRule":{"value":"value","lowThreshold":2,"highThreshold":4,"max":5,"colors":"colors","voidColor":"#C6D1DE","disabledVoidColor":"#EFF2F7","iconClasses":"iconClasses","voidIconClass":"el-icon-star-off","disabledVoidIconClass":"el-icon-star-on","disabled":false,"allowHalf":"","showText":true,"showScore":false,"textColor":"#1f2d3d","texts":"texts","scoreTemplate":"{value}","class":""},
                    "children":[]}]},{"id":1661905717547,"label":"ElFormItem","componentRule":{"label":"Avatar","labelWidth":"100px","prop":"prop","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":"","class":""},
                    "children":[{"id":1661905765786,"label":"ElAvatar","componentRule":{"size":"large","shape":"circle","icon":"el-icon-user-solid","src":"","alt":"","srcSet":"","error":"error","fit":"cover","class":""},
                    "children":[]},{"id":1661906109683,"label":"ElAvatar","componentRule":{"size":"large","shape":"circle","icon":"","src":"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png","alt":"","srcSet":"","error":"error","fit":"cover","class":""},
                    "children":[]}]},{"id":1661992547866,"label":"ElFormItem","componentRule":{"label":"Skeleton","labelWidth":"100px","prop":"prop","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":"","class":""},
                    "children":[{"id":1661994152409,"label":"ElContainer","componentRule":{"direction":"","class":""},
                    "children":[{"id":1661994312545,"label":"ElButton","componentRule":{"type":"default","size":"","icon":"","nativeType":"button","loading":false,"disabled":false,"plain":false,"autofocus":"","round":false,"circle":false,"title":"reload","event":"setLoading"},
                    "children":[]}]},{"id":1661992633641,"label":"ElSkeleton","componentRule":{"animated":true,"count":"1","rows":4,"loading":"elskeletonLoading","throttle":"0","class":"skeleton"},
                    "children":[{"id":1662014796144,"label":"customTemplate","componentRule":{"componentName":"template","slot":"template","class":""},
                    "children":[{"id":1661992719697,"label":"ElSkeletonItem","componentRule":{"variant":"image","class":"skeletonItemImage"},
                    "children":[]},{"id":1662014910688,"label":"customTag","componentRule":{"componentName":"div","class":"skeletonttemList"},
                    "children":[{"id":1661993699290,"label":"ElSkeletonItem","componentRule":{"variant":"h3","class":"skeletonItemh3"},
                    "children":[]},{"id":1662015010825,"label":"customTag","componentRule":{"componentName":"div","class":"skeletonItemTextList"},
                    "children":[{"id":1661993918705,"label":"ElSkeletonItem","componentRule":{"variant":"text","class":"skeletonItemRight-2"},
                    "children":[]},{"id":1661993883649,"label":"ElSkeletonItem","componentRule":{"variant":"text","class":"skeletonItemRight-1"},
                    "children":[]}]}]}]},{"id":1662016415607,"label":"customTemplate","componentRule":{"componentName":"template","slot":"default","class":""},
                    "children":[{"id":1661998562656,"label":"ElCard","componentRule":{"header":"","bodyStyle":"bodyStyle","shadow":"","class":""},
                    "children":[{"id":1662016350823,"label":"customTag","componentRule":{"componentName":"img","attrs":"attrs","class":"image","props":"props"},
                    "children":[]},{"id":1662016531023,"label":"customTag","componentRule":{"componentName":"div","attrs":"","class":"skeletonCardCtn"},
                    "children":[{"id":1662016595303,"label":"customContent","componentRule":{"componentName":"customContent","tag":"span","attributeName":"elcartTitle","class":""},
                    "children":[]},{"id":1662016614303,"label":"customTag","componentRule":{"componentName":"div","attrs":"","class":"bottom card-header"},
                    "children":[{"id":1662016685359,"label":"customContent","componentRule":{"componentName":"customContent","tag":"span","attributeName":"elcartTime","class":"time"},
                    "children":[]},{"id":1662082886641,"label":"ElButton","componentRule":{"type":"text","size":"","icon":"","nativeType":"button","loading":false,"disabled":false,"plain":false,"autofocus":false,"round":false,"circle":false,"title":"operation button","event":""},
                    "children":[]}]}]}]}]}]}]},{"id":1662083035586,"label":"ElFormItem","componentRule":{"label":"Empty","labelWidth":"100px","prop":"prop","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":"","class":""},
                    "children":[{"id":1662083074201,"label":"ElEmpty","componentRule":{"image":"","imageSize":"0","description":"description","class":""},
                    "children":[]}]},{"id":1662338323293,"label":"ElFormItem","componentRule":{"label":"Descriptions","labelWidth":"100px","prop":"prop","required":"","rules":"rules","error":"","validateStatus":"","for":"","inlineMessage":"","showMessage":true,"size":"","class":""},
                    "children":[{"id":1662338340973,"label":"ElDescriptions","componentRule":{"border":false,"column":3,"direction":"horizontal","size":"","title":"userInfo","extra":"","labelStyle":"labelStyle","contentStyle":"contentStyle","labelClassName":"","contentClassName":"","colon":true,"class":""},
                    "children":[{"id":1662338383141,"label":"ElDescriptionsItem","componentRule":{"label":"Username","span":"1","contentClassName":"","contentStyle":"","labelClassName":"","labelStyle":"","class":""},
                    "children":[{"id":1662338741126,"label":"customContent","componentRule":{"componentName":"customContent","tag":"span","attributeName":"descriptionsItemTitle1","class":""},
                    "children":[]}]},{"id":1662338906365,"label":"ElDescriptionsItem","componentRule":{"label":"Telephone","span":1,"contentClassName":"","contentStyle":"","labelClassName":"","labelStyle":"","class":""},
                    "children":[{"id":1662338943181,"label":"customContent","componentRule":{"componentName":"customContent","tag":"span","attributeName":"descriptionsItemTitle2","class":""},
                    "children":[]}]},{"id":1662339911365,"label":"ElDescriptionsItem","componentRule":{"label":"Place","span":1,"contentClassName":"","contentStyle":"","labelClassName":"","labelStyle":"","class":""},
                    "children":[{"id":1662339982885,"label":"customContent","componentRule":{"componentName":"customContent","tag":"span","attributeName":"descriptionsItemTitle3","class":""},
                    "children":[]}]},{"id":1662339923813,"label":"ElDescriptionsItem","componentRule":{"label":"Remarks","span":1,"contentClassName":"","contentStyle":"","labelClassName":"","labelStyle":"","class":""},
                    "children":[{"id":1662340006759,"label":"ElTag","componentRule":{"text":"School","closable":"","type":"","hit":"","disableTransitions":"","color":"","size":"small","effect":"light","class":""},
                    "children":[{"id":1662340200358,"label":"customContent","componentRule":{"componentName":"customContent","tag":"span","attributeName":"descriptionsItemElTagTitle","class":""},
                    "children":[]}]}]},{"id":1662339934813,"label":"ElDescriptionsItem","componentRule":{"label":"Address","span":1,"contentClassName":"","contentStyle":"","labelClassName":"","labelStyle":"","class":""},
                    "children":[{"id":1662340023573,"label":"customContent","componentRule":{"componentName":"customContent","tag":"span","attributeName":"descriptionsItemTitle5","class":""},
                    "children":[]}]}]}]}]}]}]
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
    },
    { 
        url: '/page/getPageList',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: paramsList.list
            }
        }
    }
]