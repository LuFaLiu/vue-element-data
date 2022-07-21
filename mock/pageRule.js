const Mock = require('mockjs')

//dynamicData:elMain,elForm,elTable,elFormItem,elButton,elContainer,elSelect,elInput,elTableColumn,elDialog,elPagination
const dynamicData = Mock.mock({
  'items': [
    {
      id: 1,
      parentId:0,
      componentName: 'elMain',
      childrenNode:[]
    },
    {
      id: 2,
      parentId:0,
      componentName: 'elForm', // 1-1 el-form
      childrenNode:[
        {
          id: 3,
          parentId:2,
          attributeName:'model',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.model',
          attributeModel:'model'
        },
        {
          id: 4,
          parentId:2,
          attributeName:'labelWidth',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.labelWidth',
          attributeModel:'labelWidth'
        },
        {
          id: 5,
          parentId:2,
          attributeName:'upladRef',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.upladRef',
          attributeModel:'upladRef'
        },
        {
          id: 6,
          parentId:2,
          attributeName:'refName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.refName',
          attributeModel:'refName'
        },
        {
          id: 7,
          parentId:2,
          attributeName:'formRule',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.formRule',
          attributeModel:'formRule'
        },
        {
          id: 8,
          parentId:2,
          attributeName:'slotList',
          attributeType:'ruleParamsInput',
          attributeLabel:'pageRule.slotList',
          attributeModel:'slotList',
          childrenNode:[
            {
              id: 9,
              parentId:8,
              attributeType:'ruleInput',
              attributeLabel:'pageRule.slotLabel',
              attributeModel:'slotLabel'
            },
            {
              id: 10,
              parentId:8,
              attributeType:'ruleInput',
              attributeLabel:'pageRule.slotName',
              attributeModel:'slotName'
            }
          ]
        },
        {
          id: 11,
          parentId:2,
          attributeName:'labelPosition',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.labelPosition',
          attributeModel:'labelPosition'
        }
      ]
      
    },
    {
      id: 12,
      parentId:0,
      componentName: 'elTable', 
      childrenNode:[
        {
          id: 13,
          parentId:12,
          attributeName:'rowKey',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.rowKey',
          attributeModel:'rowKey',
        },
        {
          id: 14,
          parentId:12,
          attributeName:'selectionEvent',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.selectionEvent',
          attributeModel:'selectionEvent',
        },
        {
          id: 15,
          parentId:12,
          attributeName:'defaultSort',
          attributeType:'ruleParamsInput',
          attributeLabel:'pageRule.defaultSort',
          attributeModel:'defaultSort',
          childrenNode:[
            {
              id: 16,
              parentId:15,
              attributeType:'ruleInput',
              attributeLabel:'prop',
              attributeModel:'prop'
            },
            {
              id: 17,
              parentId:15,
              attributeType:'ruleInput',
              attributeLabel:'order',
              attributeModel:'order'
            }
          ]
        },
        {
          id: 18,
          parentId:12,
          attributeName:'defaultExpandAll',
          attributeType:'ruleRadio',
          attributeLabel:'pageRule.defaultExpandAll',
          attributeModel:'defaultExpandAll',
        },
        {
          id: 19,
          parentId:12,
          attributeName:'treeProp',
          attributeType:'ruleParamsInput',
          attributeLabel:'pageRule.treeProp',
          attributeModel:'treeProp',
          childrenNode:[
            {
              id: 20,
              parentId:19,
              attributeType:'ruleInput',
              attributeLabel:'children',
              attributeModel:'children'
            },
            {
              id: 21,
              parentId:19,
              attributeType:'ruleInput',
              attributeLabel:'hasChildren',
              attributeModel:'hasChildren'
            }
          ]
        }
      ]
      
    },
    {
      id: 22,
      parentId:0,
      componentName: 'elFormItem',
      childrenNode:[
        {
          id: 23,
          parentId:22,
          attributeName:'elFormItemCondition',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.elFormItemCondition',
          attributeModel:'elFormItemCondition',
        },
        {
          id: 24,
          parentId:22,
          attributeName:'componentSlot',
          attributeType:'ruleRadio',
          attributeLabel:'pageRule.componentSlot',
          attributeModel:'componentSlot'
        },
        {
          id: 25,
          parentId:22,
          attributeName:'componentListName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.componentListName',
          attributeModel:'componentListName'
        },
        {
          id: 26,
          parentId:22,
          attributeName:'ref',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.ref',
          attributeModel:'ref'
        },
        {
          id: 27,
          parentId:22,
          attributeName:'elFormItemevent',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.elFormItemevent',
          attributeModel:'elFormItemevent'
        }
        
      ]
    },
    {
      id:28,
      parentId:0,
      componentName: 'elButton',
      childrenNode:[
        {
          id: 29,
          parentId:28,
          attributeName:'ref',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.refName',
          attributeModel:'ref'
        },
        {
          id: 30,
          parentId:28,
          attributeName:'params',
          attributeType:'ruleRadio',
          attributeLabel:'pageRule.params',
          attributeModel:'params'
        },
        {
          id: 31,
          parentId:28,
          attributeName:'paramsName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.paramsName',
          attributeModel:'paramsName'
        },
        {
          id: 32,
          parentId:28,
          attributeName:'elFormStatus',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.elFormStatus',
          attributeModel:'elFormStatus'
        },
        {
          id: 33,
          parentId:28,
          attributeName:'btnFormConditon',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.btnFormConditon',
          attributeModel:'btnFormConditon'
        }
      ]
      
    },
    {
      id:34,
      componentName: 'elContainer',
      parentId:0,
      childrenNode:[
        {
          id: 35,
          parentId:34,
          attributeName:'refName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.refName',
          attributeModel:'refName'
        }
      ]
      
      
    },
    {
      id:36,
      parentId:0,
      componentName: 'elSelect',
      childrenNode:[
        {
          id: 37,
          parentId:36,
          attributeName:'multiple',
          attributeType:'ruleRadio',
          attributeLabel:'pageRule.multiple',
          attributeModel:'multiple'
        }
      ]
      
    },
    {
      id:38,
      parentId:0,
      componentName: 'elInput',
      childrenNode:[
        {
          id: 39,
          parentId:38,
          attributeName:'min',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.refName',
          attributeModel:'refName'
        },
        {
          id: 40,
          parentId:38,
          attributeName:'maxlength',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.maxlength',
          attributeModel:'maxlength'
        },
        {
          id: 50,
          parentId:38,
          attributeName:'inputCondition',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.inputCondition',
          attributeModel:'inputCondition'
        }
      ]
      
    },
    {
      id:41,
      parentId:0,
      componentName: 'elTableColumn',
      childrenNode:[
        {
          id: 42,
          parentId:41,
          attributeName:'formatDate',
          attributeType:'ruleRadio',
          attributeLabel:'pageRule.formatDate',
          attributeModel:'formatDate'
        },
        {
          id: 43,
          parentId:41,
          attributeName:'align',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.align',
          attributeModel:'align'
        }
      ]
      
    },
    {
      id:44,
      parentId:0,
      componentName: 'elDialog',
      childrenNode:[
        {
          id: 45,
          parentId:44,
          attributeName:'center',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.center',
          attributeModel:'center'
        }
      ]
      
    },
    {
      id:46,
      parentId:0,
      componentName: 'elPagination',
      childrenNode:[
        {
          id: 48,
          parentId:46,
          attributeName:'currentChangeName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.currentChangeName',
          attributeModel:'currentChangeName'
        }
      ]
    },
    
    {
      
      id:49,
      parentId:0,
      componentName: 'elRadioGroup',
      childrenNode:[
       
      ]
    },
  ]
})

//defaultData:elMain,elForm,elTable,elFormItem,elButton,elContainer,elSelect,elInput,elTableColumn,elDialog,elPagination,elRadioGroup,elLevelSelect
const defaultData = Mock.mock({
  'items': [
    {
      id: '@id',
      componentName: 'elMain',
      childrenNode:[
        {
          attributeName:'class',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.class',
          childrenNode:[{
            value:''
          }]
        }
      ]
      
    },
    {
      id: '@id',
      componentName: 'elForm', // 1-1 el-form
      childrenNode:[
        {
          attributeName:'class',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.class',
          childrenNode:[{
            value:''
          }]
        }
      ]
      
    },
    {
      id: '@id',
      componentName: 'elTable', 
      childrenNode:[
        {
          attributeName:'class',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.class',
          childrenNode:[{
            value:''
          }]
        },
        {
          attributeName:'tableDataName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.tableDataName',
          attributeModel:'tableDataName'
        },
        {
          attributeName:'tableHeightName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.tableHeightName',
          attributeModel:'tableHeightName'
        },
        {
          attributeName:'refName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.refName',
          attributeModel:'refName'
        },
        {
          attributeName:'tooltipEffect',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.tooltipEffect',
          attributeModel:'tooltipEffect'
        },
        {
          attributeName:'stripe',
          attributeType:'ruleRadio',
          attributeLabel:'pageRule.stripe',
          attributeModel:'stripe'
        },
        {
          attributeName:'style',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.style',
          attributeModel:'style'
        }
      ]
    },
    {
      id: '@id',
      componentName: 'elFormItem',
      childrenNode:[
        {
          attributeName:'label',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.label',
          attributeModel:'label'
        },
        {
          attributeName:'prop',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.prop',
          attributeModel:'prop'
        }
      ]
      
    },
    {
      id:'@id',
      componentName: 'elButton',
      childrenNode:[
        {
          attributeName:'class',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.class',
          childrenNode:[{
            value:''
          }]
        },
        {
          attributeName:'btnType',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.btnType',
          attributeModel:'btnType'
        },
        {
          attributeName:'event',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.event',
          attributeModel:'event'
        },
        {
          attributeName:'icon',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.icon',
          attributeModel:'icon'
        },
        {
          attributeName:'title',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.title',
          childrenNode:[{
            value:''
          }]
        }
      ]
      
    },
    {
      id:'@id',
      componentName: 'elContainer',
      childrenNode:[
        {
          attributeName:'class',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.class',
          childrenNode:[{
            value:''
          }]
        }
      ]
     
      
    },
    {
      id:'@id',
      componentName: 'elSelect',
      childrenNode:[
        {
          attributeName:'paramsName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.paramsName',
          attributeModel:'paramsName'
        },
        {
          attributeName:'vModel',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.vModel',
          attributeModel:'vModel'
        },
        {
          attributeName:'label',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.label',
          attributeModel:'label'
        },
        {
          attributeName:'autocomplete',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.autocomplete',
          attributeModel:'autocomplete'
        },
        {
          attributeName:'placeholder',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.placeholder',
          childrenNode:[{
            value:''
          }]
        },
        {
          attributeName:'clearable',
          attributeType:'ruleRadio',
          attributeLabel:'pageRule.clearable',
          attributeModel:'clearable'
        },
        {
          attributeName:'elOptionList',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.elOptionList',
          attributeModel:'elOptionList'
        }
      ]
    },
    {
      id:'@id',
      componentName: 'elInput',
      childrenNode:[
        {
          attributeName:'paramsName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.paramsName',
          attributeModel:'paramsName'
        },
        {
          attributeName:'inputType',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.inputType',
          attributeModel:'inputType'
        },
        {
          attributeName:'vModel',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.vModel',
          attributeModel:'vModel'
        },
        {
          attributeName:'label',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.label',
          attributeModel:'label'
        },
        {
          attributeName:'prop',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.prop',
          attributeModel:'prop'
        },
        {
          attributeName:'autocomplete',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.autocomplete',
          attributeModel:'autocomplete'
        },
        {
          attributeName:'placeholder',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.placeholder',
          childrenNode:[{
            value:''
          }]
        },
        {
          attributeName:'clearable',
          attributeType:'ruleRadio',
          attributeLabel:'pageRule.clearable',
          attributeModel:'clearable'
        }
      ]
    },
    {
      id:'@id',
      componentName: 'elTableColumn',
      childrenNode:[
        {
          attributeName:'type',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.type',
          attributeModel:'type'
        },
        {
          attributeName:'label',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.label',
          attributeModel:'label'
        },
        {
          attributeName:'value',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.value',
          attributeModel:'value'
        },
        {
          attributeName:'width',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.width',
          attributeModel:'width'
        },
        {
          attributeName:'operation',
          attributeType:'ruleRadio',
          attributeLabel:'form.operation',
          attributeModel:'operation'
        }
      ]
    },
    {
      id:'@id',
      componentName: 'elDialog',
      childrenNode:[
        {
          /*
          attributeName:'title',
          attributeType:'ruleParamsInput',
          attributeLabel:'pageRule.title',
          childrenNode:[
            {
              attributeType:'ruleInput',
              attributeLabel:'pageRule.edit',
              attributeModel:'edit'
            },
            {
              attributeType:'ruleInput',
              attributeLabel:'pageRule.add',
              attributeModel:'add'
            }
          ]
          */
          attributeName:'title',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.title',
          childrenNode:[{
            value:''
          }]
        },
        {
          attributeName:'width',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.width',
          attributeModel:'width'
        },
        {
          attributeName:'dialogShowName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.dialogShowName',
          attributeModel:'dialogShowName'
        },
        {
          attributeName:'condition',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.condition',
          attributeModel:'condition'
        },
        {
          attributeName:'closeMethodName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.closeMethodName',
          attributeModel:'closeMethodName'
        }
      ]
    },
    {
      id:'@id',
      componentName: 'elPagination',
      childrenNode:[
        {
          attributeName:'total',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.total',
          attributeModel:'total'
        },
        {
          attributeName:'size',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.size',
          attributeModel:'size'
        },
        {
          attributeName:'current',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.current',
          attributeModel:'current'
        },
        {
          attributeName:'params',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.params',
          attributeModel:'params'
        },
        {
          attributeName:'layout',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.layout',
          attributeModel:'layout'
        },
        {
          attributeName:'pageSize',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.pageSize',
          childrenNode:[{
            value:''
          }]
        },
        {
          attributeName:'class',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.className',
          childrenNode:[{
            value:''
          }]
        }
      ]
    },
    {
      
      id:'@id',
      componentName: 'elRadioGroup',
      childrenNode:[
        {
          attributeName:'paramsName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.paramsName',
          attributeModel:'paramsName'
        },
        {
          attributeName:'vModel',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.vModel',
          attributeModel:'vModel'
        },
        {
          attributeName:'radioListName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.radioListName',
          attributeModel:'radioListName'
        }
      ]
    },
    {
      id:'@id',
      componentName:'customContent',
      childrenNode:[
        {
          attributeName:'class',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.className',
          childrenNode:[{
            value:''
          }]
        },
        {
          attributeName:'elContainerTitle',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.elContainerTitle',
          attributeModel:'elContainerTitle'
        }
      ]
    },
    {
      id:'@id',
      componentName:'elLevelSelect',
      childrenNode:[
        {
          attributeName:'paramsName',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.paramsName',
          attributeModel:'paramsName'
        },
        {
          attributeName:'vModel',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.vModel',
          attributeModel:'vModel'
        },
        {
          attributeName:'placeholder',
          attributeType:'ruleDynamicInput',
          attributeLabel:'pageRule.placeholder',
          childrenNode:[{
            value:''
          }]
        },
        {
          attributeName:'clearable',
          attributeType:'ruleRadio',
          attributeLabel:'pageRule.clearable',
          attributeModel:'clearable'
        },
        {
          attributeName:'elOptionList',
          attributeType:'ruleInput',
          attributeLabel:'pageRule.elOptionList',
          attributeModel:'elOptionList'
        }
      ]
    }
  ]
})

module.exports = [
  
  {
    url: '/table/dynamicListPaging',
    type: 'get',
    response: config => {
      const items = dynamicData.items;
      const paging = _.chunk(items, 10);
      return {
        code: 200,
        data: {
          total: (paging.length * 10),
          current: config.query.current,
          size: items.length,
          items: paging[parseInt(config.query.current-1)]
        }
      }
    }
  },
  {
    url: '/table/operationDynamicList',
    type: 'post',
    response: config => {
      if(!config.body.id){
        config.body.parentId = config.body.componentType;
      }
      operateDynamicListInfo(dynamicData.items,config.body);
      return {
        code: 200,
        data: {
          code: 200,
          message:'success'
        }
      }
    }
  },
  {
    url: '/table/dynamicList',
    type: 'get',
    response: config => {
      const items = dynamicData.items;
      return {
        code: 200,
        data: {
          items: items
        }
      }
    }
  },
  {
    url: '/table/defaultList',
    type: 'get',
    response: config => {
      const items = defaultData.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]


function operateDynamicListInfo(list,data) {
  _.filter(list,function (item) {
      if(data.parentId && data.id){ //edit
          return item.id == data.id ? _.mergeWith(item,data) : operateDynamicListInfo(item.childrenNode,data);
      }else if(data.parentId){ //add
          if(item.id == data.parentId){
            data.id = data.count + 1;
            if(item.childrenNode && item.childrenNode.length == 0){
              data.childrenNode = [];
              return item.childrenNode.push(data);
            }else{
              item.childrenNode = [];
              return item.childrenNode.push(data);
            }
          }else{
            return operateDynamicListInfo(item.childrenNode,data);
          }
      }
  }) 
}