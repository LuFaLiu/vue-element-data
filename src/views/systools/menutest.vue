<template>
    <elComponent v-if="appParams.pageData" ref="menutest" :node="appParams.pageData" :route="$route.name"/>
</template>

<script>
import _ from "lodash";
import elComponent from '@/components/elComponent/index'
import { resetObj,getVueComponent} from '@/utils/index'

export default {
 
  provide(){
    return {
      superParams:this
    }
  },
  inject:['appParams'],
  components: {
    elComponent
  },
  data(){
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${ i }`,
          disabled: i % 4 === 0
        });
      }
      console.log("generateData=========>");
      console.log(data);
      return data;
    };
    return {
        elform:{
          model:{},
          rules:{},
        },
        elformitem:{
          rules:{},
          prop:''
        },
        elinput:{
          value:'title',
          autosize:{},
        },
        elcheckbox:{
          value:false
        },
        elradiogroup:{
          value:'top'
        },
        elradio:{
          value:''
        },
        elinputnumber:{
          value:1
        },
        elselect:{
          ElOptionListName:[{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value:''
        },
        elFormNested:{
          inputVal:'',
          selectVal:''
        },
        elcascader:{
          value:'',
          props:{},
          options: [{
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }, {
            value: 'zujian',
            label: '组件',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }, {
                value: 'input',
                label: 'Input 输入框'
              }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
              }, {
                value: 'select',
                label: 'Select 选择器'
              }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              }, {
                value: 'switch',
                label: 'Switch 开关'
              }, {
                value: 'slider',
                label: 'Slider 滑块'
              }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              }, {
                value: 'upload',
                label: 'Upload 上传'
              }, {
                value: 'rate',
                label: 'Rate 评分'
              }, {
                value: 'form',
                label: 'Form 表单'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'table',
                label: 'Table 表格'
              }, {
                value: 'tag',
                label: 'Tag 标签'
              }, {
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }, {
                value: 'pagination',
                label: 'Pagination 分页'
              }, {
                value: 'badge',
                label: 'Badge 标记'
              }]
            }, {
              value: 'notice',
              label: 'Notice',
              children: [{
                value: 'alert',
                label: 'Alert 警告'
              }, {
                value: 'loading',
                label: 'Loading 加载'
              }, {
                value: 'message',
                label: 'Message 消息提示'
              }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
              }, {
                value: 'notification',
                label: 'Notification 通知'
              }]
            }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
              }, {
                value: 'tabs',
                label: 'Tabs 标签页'
              }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              }, {
                value: 'steps',
                label: 'Steps 步骤条'
              }]
            }, {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }]
        },
        elswitch:{
          value:false,
          rules:{},
        },
        elslider:{
          value:1,
          marks:{}
        },
        eltimepicker:{
          //value:new Date(2016, 9, 10, 18, 40),
          value:[new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
          pickerOptions:{
            selectableRange: '18:30:00 - 20:30:00'
          }
        },
        eltimeselect:{
          value:'',
          pickerOptions:{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }
        },
        eldatepicker:{
          value:'',
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
            shortcuts: [{
              text: 'Today',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            }, {
              text: 'Yesterday',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: 'A week ago',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
          },
        },
        elupload:{
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
          headers:{},
          limit:3,
          data:{},
          imageUrl:''
        },
        imageUrl:'',
        customcontent:{
          attributeName:'',
          tipAttribute:{
            tag:'div',
            class: ['el-upload__tip'],
            props: {
              slot: 'tip'
            },
            text:'jpg/png files with a size less than 500kb'
          },
          imageAttribute:{
            condition:'imageUrl',
            conditionVal:true,
            tag:'img',
            class: ['avatar'],
            props: {
              src:'imageUrl'
            }
          },
          iconAttribute:{
            conditionVal:false,
            condition:'imageUrl',
            tag:'i',
            class: ['el-icon-plus','avatar-uploader-icon']
          },
          templateAttribute:{
            slot:"template"
          },
          skeletonItemDiv:{
            style:{
              padding:'14px'
            }
          },
          skeletonItemRight:{
            display: 'flex',
            alignItems: 'center',
            justifyItems: 'space-between',
            marginTop: '16px',
            height: '16px'
          },
          elcartTitle:{
            tag:'span',
            text:'Delicious hamberger'
          },
          elcartTime:{
            tag:'span',
            text:'2021-06-01'
          },
          descriptionsItemTitle1:{
            tag:'span',
            text:'kooriookami'
          },
          descriptionsItemTitle2:{
            tag:'span',
            text:'18100000000'
          },
          descriptionsItemTitle3:{
            tag:'span',
            text:'Suzhou'
          },
          descriptionsItemTitle5:{
            tag:'span',
            text:'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province'
          },
          descriptionsItemElTagTitle:{
            tag:'span',
            text:'School'
          },
          transferAttribute:{
            scopedSlots:true
          },
          tabPaneText:{
            text:'Route'
          },
          elDropdownLink:{
            tag:'span',
            text:'Dropdown List'
          },
          eldialogContent:{
            tag:'span',
            text:'This is a message'
          },
          elCardTitle:{
            tag:'span',
            text:'Card name'
          },
          elCardContent1:{
            tag:'div',
            text:'List item 1',
            style:{
              'margin-bottom': '18px'
            }
          },
          elCardContent2:{
            tag:'div',
            text:'List item 2',
            style:{
              'margin-bottom': '18px'
            }
          },
          elCardContent3:{
            tag:'div',
            text:'List item 3',
            style:{
              'margin-bottom': '18px'
            }
          },
          elCardContent4:{
            tag:'div',
            text:'List item 4',
            style:{
              'margin-bottom': '18px'
            }
          },
          elCollapseItemContent1:{
            tag:'div',
            text:'Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;'
          },
          elCollapseItemContent2:{
            tag:'div',
            text:'Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.'
          },
          elCollapseItemContent3:{
            tag:'div',
            text:'Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;'
          },
          elCollapseItemContent4:{
            tag:'div',
            text:'Visual feedback: reflect current state by updating or rearranging elements of the page.'
          },
          elCollapseItemContent5:{
            tag:'div',
            text:'Simplify the process: keep operating process simple and intuitive;'
          },
          elCollapseItemContent6:{
            tag:'div',
            text:'Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;'
          },
          elCollapseItemContent7:{
            tag:'div',
            text:'Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.'
          },
          elCollapseItemContent8:{
            tag:'div',
            text:'Decision making: giving advices about operations is acceptable, but do not make decisions for the users;'
          },
          elCollapseItemContent9:{
            tag:'div',
            text:'Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.'
          },
          elDividerContent1:{
            tag:'span',
            text:'What you are you do not see, what you see is your shadow. '
          },
          elDividerContent2:{
            tag:'span',
            text:'I cannot choose the best. The best chooses me.'
          },
          elDividerContent3:{
            tag:'span',
            text:'My wishes are fools, they shout across thy song, my Master. Let me but listen.'
          },
          elbacktopText:{
            tag:'span',
            text:'Scroll down to see the bottom-right button.'
          },
          elbacktopcustomizationsText:{
            tag:'div',
            style:{
              'height': '100%',
              'width': '100%',
              'background-color': '#f2f5f6',
              'box-shadow': '0 0 6px rgba(0,0,0, .12)',
              'text-align': 'center',
              'line-height': '40px',
              'color': '#1989fa'
            },
            text:'UP'
          },
          elbacktopcustomizations:{
            tag:'span',
            text:'Customizations Scroll down to see the bottom-right button.'
          },
          vInfiniteScrollTemplate_basicUsage:{
            tag:'ul',
            class:'infinite-list',
            style:{'overflow':'auto'},
            directives: [
              {
                name: 'infinite-scroll',
                value: this.loadBasicUsage
              }
            ]
          },
          vInfiniteScrollTemplate_disableLoading:{
            tag:'ul',
            class:'infinite-list',
            style:{'overflow':'auto'},
            props: {
              'infinite-scroll-disabled': this.disabledMethod
            },
            directives: [
              {
                name: 'infinite-scroll',
                value: this.loadDisable
              }
            ]
          },
          infiniteScrollLoadingTag:{
            tag:'p',
            style:{
              'text-align':'center',
              'visibility':'hidden'
            },
            directives: [ //自定义指令无效
              {
                name: 'show',
                value: false
              }
            ],
            refName:'scrollLoadingTag',
            text:'Loading...'
          },
          infiniteScrollDisableTag:{
            tag:'p',
            style:{
              'text-align':'center',
              'visibility':'hidden'
            },
            directives: [ //自定义指令无效
              {
                name: 'show',
                value: false
              }
            ],
            refName:'scrollDisableTag',
            text:'No more'
          },
          infiniteListItem_basicUsage:{
            tag:'li',
            class:'infinite-list-item',
            list:[
              {id:1,label:1},
              {id:2,label:2},
              {id:3,label:3},
              {id:4,label:4},
              {id:5,label:5},
              {id:6,label:6},
              {id:7,label:7}
            ]
          },
          infiniteListItem_disableLoading:{
            tag:'li',
            class:'infinite-list-item',
            list:[
              {id:1,label:1},
              {id:2,label:2},
              {id:3,label:3},
              {id:4,label:4},
              {id:5,label:5},
              {id:6,label:6},
              {id:7,label:7}
            ]
          },
          elInnerDrawerText:{
            tag:'p',
            text:'_(:зゝ∠)_'
          },
          elDrawerCustomTag:{
            tag:'div'
          },
          imageFailedSlotAttribute:{
            tag:'div',
            slot: 'error',
            class:'image-slot'
          },
          imageFailedIconAttribute:{
            tag:'i',
            class:'el-icon-picture-outline'
          },
          elImageTypeName1:{
            tag:'p',
            text:'Basic Usage'
          },
          elImageTypeName2:{
            tag:'p',
            text:'Placeholder'
          },
          elImageTypeName3:{
            tag:'p',
            text:'Load Failed'
          },
          elImageTraverseAttribute:{
            type:'elImageTraverse',
            style:{
              'padding': '30px 0',
              'text-align': 'center',
              'border-right': '1px solid #eff2f6',
              'display': 'inline-block',
              'width': '20%',
              'box-sizing': 'border-box',
              'vertical-align': 'top',
              'margin-right': '20px'
            },
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          },
          elPlaceholderImageAttribute:{
            tag:'div',
            class:'demo-image__placeholder',
            childrenNode:[
              {
                tag:'div',
                style:{
                  'padding': '30px 0',
                  'text-align': 'center',
                  'border-right': '1px solid #eff2f6',
                  'display': 'inline-block',
                  'width': '20%',
                  'box-sizing': 'border-box',
                  'vertical-align': 'top',
                  'margin-right': '20px'
                },
                childrenNode:[
                  {
                    tag:'span',
                    style:{
                      'display': 'block',
                      'color': '#8492a6',
                      'font-size': '14px',
                      'margin-bottom': '20px'
                    },
                    text:'Default'
                  },
                  {
                    tag:'el-image',
                    style:{
                      'width':'100px',
                      'height':'100px'
                    },
                    props:{
                      src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                    }
                    
                  }
                ]
              },
              {
                tag:'div',
                style:{
                  'padding': '30px 0',
                  'text-align': 'center',
                  'border-right': '1px solid #eff2f6',
                  'display': 'inline-block',
                  'width': '20%',
                  'box-sizing': 'border-box',
                  'vertical-align': 'top',
                  'margin-right': '20px'
                },
                childrenNode:[
                  {
                    tag:'span',
                    style:{
                      'display': 'block',
                      'color': '#8492a6',
                      'font-size': '14px',
                      'margin-bottom': '20px'
                    },
                    text:'Custom'
                  },
                  {
                    tag:'el-image',
                    style:{
                      'width':'100px',
                      'height':'100px'
                    },
                    props:{
                      src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                    },
                    childrenNode:[
                      {
                        tag:'div',
                        class:'image-slot',
                        props:{
                          slot:'placeholder'
                        },
                        slot:'placeholder',
                        childrenNode:[
                          {
                            text:'Loading',
                            childrenNode:[
                              {
                                tag:'span',
                                class:'dot',
                                text:'...'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
            ]
          },
          elLoadFailedImageAttribute:{
            tag:'div',
            class:'demo-image__placeholder',
            childrenNode:[
              {
                tag:'div',
                style:{
                  'padding': '30px 0',
                  'text-align': 'center',
                  'border-right': '1px solid #eff2f6',
                  'display': 'inline-block',
                  'width': '20%',
                  'box-sizing': 'border-box',
                  'vertical-align': 'top',
                  'margin-right': '20px'
                },
                childrenNode:[
                  {
                    tag:'span',
                    style:{
                      'display': 'block',
                      'color': '#8492a6',
                      'font-size': '14px',
                      'margin-bottom': '20px'
                    },
                    text:'Default'
                  },
                  {
                    tag:'el-image',
                    style:{
                      'width':'100px',
                      'height':'100px'
                    }
                    
                  }
                ]
              },
              {
                tag:'div',
                style:{
                  'padding': '30px 0',
                  'text-align': 'center',
                  'border-right': '1px solid #eff2f6',
                  'display': 'inline-block',
                  'width': '20%',
                  'box-sizing': 'border-box',
                  'vertical-align': 'top',
                  'margin-right': '20px'
                },
                childrenNode:[
                  {
                    tag:'span',
                    style:{
                      'display': 'block',
                      'color': '#8492a6',
                      'font-size': '14px',
                      'margin-bottom': '20px'
                    },
                    text:'Custom'
                  },
                  {
                    tag:'el-image',
                    style:{
                      'width':'100px',
                      'height':'100px'
                    },
                    childrenNode:[
                      {
                        tag:'div',
                        slot:'error',
                        style:{
                          'display': 'flex',
                          'justify-content': 'center',
                          'align-items': 'center',
                          'font-size': '30px',
                          'width':'100%',
                          'height':'100%',
                          'background': '#f5f7fa',
                          'color': '#909399'
                        },
                        childrenNode:[
                          {
                            tag:'i',
                            class:'el-icon-picture-outline'
                          }
                        ]
                      }
                    ]
                    
                  }
                ]
              },
            ]
          },
          elBacktopType1:{
              tag:'p',
              text:'Basic usage'
          },
          elBacktopType2:{
               tag:'p',
               text:'Customizations'
          },
            elInfiniteScrollType1:{
                tag:'p',
                text:'Basic usage'
            },
            elInfiniteScrollType2:{
                tag:'p',
                text:'Disable Loading'
            },
            elDrawerlType1:{
                tag:'p',
                text:'Basic Usage'
            },
            elDrawerlType2:{
                tag:'p',
                text:'Customization Content'
            },
            elDrawerlType3:{
                tag:'p',
                text:'Nested Drawer'
            },
            elCalendarType1:{
              tag:'p',
              text:'Basic'
            },
            elCalendarType2:{
              tag:'p',
              text:'Custom Content'
            },
            elCalendarType3:{
              tag:'p',
              text:'Range'
            },
            elCalendarCustomContent:{
              tag:'p',
              type:'customCalendar'
            },
            elDividerType1:{
              tag:'p',
              style:{
                'margin':'20px 0'
              },
              text:'Basic usage'
            },
            elDividerType2:{
              tag:'p',
              style:{
                'margin':'20px 0'
              },
              text:'Custom content'
            },
            elDividerType3:{
              tag:'p',
              style:{
                'margin':'20px 0'
              },
              text:'Vertical divider'
            },
            elDividerVerticalDividertitle1:{
              tag:'span',
              text:'Rain'
            },
            elDividerVerticalDividertitle2:{
              tag:'span',
              text:'Home'
            },
            elDividerVerticalDividertitle3:{
              tag:'span',
              text:'Grass'
            },
            elTimelineType1:{
              tag:'span',
              style:{
                'display': 'flex',
                'margin-bottom': '20px'
              },
              text:'Basic usage'
            },
            elTimelineType2:{
              tag:'span',
              text:'Custom node'
            },
            elTimelineType3:{
              tag:'span',
              text:'Custom timestamp'
            },
            elTimelineOrder:{
              tag:'div',
              style:{
                'float':'left',
                'margin':'1px 0 20px 0'
              },
              text:'Order'
            },
            elTimelineGroup:{
              type:'elRadioGroup',
              refName:'elRadioGroup',
              value:true,
              style:{
                'float':'left',
                'margin':'0 0 20px 20px'
              },
              elRadiolist:[
                {
                  value:true,
                  label:'descending'
                },
                {
                  value:false,
                  label:'ascending'
                }
              ]
            },
            elTimelineCustomNode:{
              type:'timelineCustom',
              timelineCustomList: [{
                content: 'Custom icon',
                timestamp: '2018-04-12 20:46',
                size: 'large',
                type: 'primary',
                icon: 'el-icon-more'
              }, {
                content: 'Custom color',
                timestamp: '2018-04-03 20:46',
                color: '#0bbd87'
              }, {
                content: 'Custom size',
                timestamp: '2018-04-03 20:46',
                size: 'large'
              }, {
                content: 'Default node',
                timestamp: '2018-04-03 20:46'
              }]
            },
            elTimeLineItemCardContent1:{
              tag:'div',
              childrenNode:[
                {
                  tag:'h4',
                  text:'Update Github template'
                },
                {
                  tag:'p',
                  text:'Tom committed 2018/4/12 20:46'
                }
              ]
            },
            elTimeLineItemCardContent2:{
              tag:'div',
              childrenNode:[
                {
                  tag:'h4',
                  text:'Update Github template'
                },
                {
                  tag:'p',
                  text:'Tom committed 2018/4/3 20:46'
                }
              ]
            },
            elTimeLineItemCardContent3:{
              tag:'div',
              childrenNode:[
                {
                  tag:'h4',
                  text:'Update Github template'
                },
                {
                  tag:'p',
                  text:'Tom committed 2018/4/2 20:46'
                }
              ]
            },
            elCollapseType1:{
              tag:'span',
              style:{
                'margin':'20px 0'
              },
              text:'Basic usage'
            },
            elCollapseType2:{
              tag:'span',
              style:{
                'margin':'20px 0'
              },
              text:'Accordion'
            },
            elCollapseType3:{
              tag:'span',
              text:'Custom title'
            },
            elCollapseCustomTitle:{
              type:'customCollapseItemTitle',
              slot:'title',
              text:'Consistency',
              tag:'i',
              class:'header-icon el-icon-info',
              style:{
                'margin-left':'5px'
              },
              childrenNode:[
                {
                  tag:'div',
                  text:'Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;'
                },
                {
                  tag:'div',
                  text:'Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.'
                }
              ]
            },
            elCarouselType1:{
              tag:'span',
              text:'Basic usage'
            },
            elCarouselType2:{
              tag:'span',
              text:'Indicators'
            },
            elCarouselType3:{
              tag:'span',
              text:'Arrows'
            },
            elCarouselType4:{
              tag:'span',
              text:'Card mode'
            },
            elCarouselType5:{
              tag:'span',
              text:'vertical'
            },
            elCardType1:{
              tag:'span',
              text:'Basic usage'
            },
            elCardType2:{
              tag:'span',
              text:'Simple card'
            },
            elCardType3:{
              tag:'span',
              text:'With images'
            },
            elCardType4:{
              tag:'span',
              text:'Shadow'
            },
            elCardShadowAlway:{
              tag:'span',
              text:'Always'
            },
            elCardShadowHover:{
              tag:'span',
              text:'Hover'
            },
            elCardShadowNever:{
              tag:'span',
              text:'Never'
            },
            elPopconfirmType1:{
              tag:'span',
              text:'Basic usage',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elPopconfirmType2:{
              tag:'span',
              text:'Customise',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elPopoverType1:{
              tag:'span',
              text:'Basic usage',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elPopoverType2:{
              tag:'span',
              text:'Nested information',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elPopoverType3:{
              tag:'span',
              text:'Nested operation',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elPopoverNestedOperation:{
              tag:'p',
              text:'Are you sure to delete this?'
            },
            elTooltipType1:{
              tag:'span',
              text:'Basic usage',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elTooltipType2:{
              tag:'span',
              text:'Theme',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elTooltipType3:{
              tag:'span',
              text:'More Content',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elTooltipType4:{
              tag:'span',
              text:'Advanced usage',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elTooltipMoreContent:{
              type:'tooltipMoreContent',
              slot:'content',
              text1:'Advanced usage',
              text2:'second line'
            },
            elTooltipAdvancedUsage:{
              type:'tooltipAdvancedUsage',
              text:'click to close tooltip function'
            },
            elDialogType1:{
              tag:'span',
              text:'Basic usage',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elDialogType2:{
              tag:'span',
              text:'Customizations',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elDialogType3:{
              tag:'span',
              text:'Nested Dialog',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elDialogType4:{
              tag:'span',
              text:'Centered content',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elCenteredContent:{
              tag:'span',
              text:'It should be noted that the content will not be aligned in center by default',
            },
            elStepsType1:{
              tag:'span',
              text:'Basic usage',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elStepsType2:{
              tag:'span',
              text:'Step bar that contains status',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elStepsType3:{
              tag:'span',
              text:'Center',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elStepsType4:{
              tag:'span',
              text:'Step bar with description',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elStepsType5:{
              tag:'span',
              text:'Step bar with icon',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elStepsType6:{
              tag:'span',
              text:'Vertical step bar',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elStepsType7:{
              tag:'span',
              text:'Simple step bar',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elDropdownType1:{
              tag:'span',
              text:'Basic usage',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elDropdownType2:{
              tag:'span',
              text:'Triggering element',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elDropdownType3:{
              tag:'span',
              text:'How to trigger',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elDropdownType4:{
              tag:'span',
              text:'Menu hiding behavior',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elDropdownType5:{
              tag:'span',
              text:'Command event',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elDropdownType6:{
              tag:'span',
              text:'Sizes',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elDropdownBasicUsageBtn:{
              type:'basicUsageBtn',
              text:'Dropdown List'
            },
            elDropdownTriggeringElementBtn:{
              type:'dropdownListBtn',
              text:'Dropdown List'
            },
            elDropdownTriggeringElementBtn2:{
              tag:'span',
              text:'Dropdown List'
            },
            elHoverTriggerTitle:{
              tag:'span',
              text:'hover to trigger',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elClickTriggerTitle:{
              tag:'span',
              text:'click to trigger',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elDropdownSizesType1:{
              tag:'span',
              text:'Default'
            },
            elDropdownSizesType2:{
              tag:'span',
              text:'Medium'
            },
            elDropdownSizesType3:{
              tag:'span',
              text:'Small'
            },
            elDropdownSizesType4:{
              tag:'span',
              text:'Mini'
            },
            elPageHeaderType:{
              tag:'span',
              text:'Basic',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elBreadcrumbType1:{
              tag:'span',
              text:'Basic usage',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elBreadcrumbType2:{
              tag:'span',
              text:'Icon separator',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elTabsType1:{
              tag:'span',
              text:'Basic usage',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elTabsType2:{
              tag:'span',
              text:'Card Style',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elTabsType3:{
              tag:'span',
              text:'Border card',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elTabsType4:{
              tag:'span',
              text:'Tab position',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elTabsType5:{
              tag:'span',
              text:'Custom Tab',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elTabsType6:{
              tag:'span',
              text:'Add & close tab',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elTabsType7:{
              tag:'span',
              text:'Customized trigger button of new tab',
              style:{
                'margin':'15px 0',
                'display': 'block'
              }
            },
            elTabsCustomTab:{
              type:'customTab',
              text:'Route',
            },
            elTabList:{
              type:'tabList',
              tabList:[{
                title: 'Tab 1',
                name: '1',
                content: 'Tab 1 content'
              }, {
                title: 'Tab 2',
                name: '2',
                content: 'Tab 2 content'
              }]
            },
            elTabsCustomizedTrigger:{
              type:'customizedTrigger'
            }
        },
        elrate:{
          value:0,
          colors:['#F7BA2A', '#F7BA2A', '#F7BA2A'],
          texts:['Very poor ',' disappointed ', 'average ',' satisfied ', 'surprised'],
          iconClasses:['el-icon-star-on', 'el-icon-star-on','el-icon-star-on']
        },
        elavatar:{
          
        },
        elcard:{
          bodyStyle:{ padding: '0px', marginBottom: '1px' },
        },
        elskeleton:{
          elskeletonLoading:false,
        },
        img:{
          attrs:{
            src:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
          },
          props:{
            src:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
          }
        },
        eldescriptions:{
          labelStyle:{},
          contentStyle:{}
        },
        elcolorpicker:{
          value:'#409EFF',
          predefine:[]
        },
        eltransfer:{
          data: generateData(),
          value: [],
          buttonTexts:[],
          titles:[],
          leftDefaultChecked:[],
          rightDefaultChecked:[],
          format:{},
          props:{
            label: 'label',
            key: 'key',
            disabled: 'disabled'
          }, //必须
          defaultChecked:[2, 3],
          renderContent(h, option) {
            return <span>{ option.key } - { option.label }</span>;
          }
        },
        eltable:{
          data: [{
            date: '2016-05-02',
            name: 'Jack',
            address: 'New York City'
          }, {
            date: '2016-05-04',
            name: 'Jack',
            address: 'New York City'
          }, {
            date: '2016-05-01',
            name: 'Jack',
            address: 'New York City'
          }, {
            date: '2016-05-03',
            name: 'Jack',
            address: 'New York City'
          }],
          rowStyle:{},
          cellStyle:{},
          headerRowStyle:{},
          headerCellStyle:{},
          expandRowKeys:[],
          defaultSort:{},
          treeProps:{
            "hasChildren":"hasChildren",
            "children":"children"
          }
        },
        eltablecolumn:{
          filteredValue:[],
          filters:[],
          sortOrders:['ascending', 'descending', null],
        },
        elformList:{
          model: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          rules: {
            name: [
              { required: true, message: 'Please input Activity name', trigger: 'blur' },
              { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
            ],
            region: [
              { required: true, message: 'Please select Activity zone', trigger: 'change' }
            ],
            date1: [
              { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
            ],
            date2: [
              { type: 'date', required: true, message: 'Please pick a time', trigger: 'change' }
            ],
            type: [
              { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
            ],
            resource: [
              { required: true, message: 'Please select activity resource', trigger: 'change' }
            ],
            desc: [
              { required: true, message: 'Please input activity form', trigger: 'blur' }
            ]
          },

        },
        elselectForm:{
          ElOptionListName:[{
            value: 'shanghai',
            label: 'Zone one'
          }, {
            value: 'beijing',
            label: 'Zone two'
          }]
        },
        eltree:{
          data: [{
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }, {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '一级 3',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          defaultCheckedKeys:[],
          defaultExpandedKeys:[],
        },
        elprogress:{
          percentage: 10,
          colors: [
            {color: '#f56c6c', percentage: 20},
            {color: '#e6a23c', percentage: 40},
            {color: '#5cb87a', percentage: 60},
            {color: '#1989fa', percentage: 80},
            {color: '#6f7ad3', percentage: 100}
          ]
        },
        elpagination:{
          pageSizes:[100, 200, 300, 400]
        },
        elbadge:{
          value:12
        },
        elavatar:{
          size:"",
          src: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        },
        elmenu:{
          defaultActive:'1'
        },
        eltabs:{
          activeName: 'first'
        },
        elsteps:{
          active:0
        },
        eltooltip:{
          popperOptions:{ boundariesElement: 'body', gpuAcceleration: false }
        },
        eldialog:{
          visible:false
        },
        elcollapse:{
          value: ['1']
        },
        elcalendar:{
          value: new Date(),
          range:['2019-03-04', '2019-03-24']
        },
        elimage:{
          src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          previewSrcList: [
            'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          ]
        },

        
        

    }
  },
  watch:{
    'elformList.model.region':function (val,oldVal) {
      console.log("elformList.model.region====>");
      console.log(val,oldVal);
    },
    'elformList.model.type':function (val,oldVal) {
      console.log("elformList.model.type====>");
      console.log(val,oldVal);
      console.log(Array.isArray(val));
    },
    'elprogress.percentage':function (val,oldVal) {
      console.log("elprogress.percentage====>");
      console.log(val,oldVal);
    },
  },
  mounted(){
    this.elskeleton.elskeletonLoading = false;
  },
  methods:{
    load(){

    },
    renderHeader(h, { column, $index }){
      return column.label;
    },
    formatter(row, column, cellValue, index){
      return cellValue;
    },
    selectable(){

    },
    filterMethod(){
      return true; //为Transfer组件时必须返回真值才能回显数据
    },
    beforeFilter(){

    },
    formatTooltip(){

    },
    onRemove(file, fileList) {
      console.log(file, fileList);
    },
    onPreview(file) {
      console.log(file);
    },
    onExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    httpRequest(){

    },
    beforeUpload(file){
      const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    onChange(file){
      console.log(file);
      console.log('change方法');
      this.imageUrl = URL.createObjectURL(file.raw);
      this.customcontent.imageAttribute.props.src = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    onSuccess(res, file){
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    onProgress(){

    },
    onError(){

    },
    rowKey(row){
      return row.staffTypeId;
    },
    setLoading() {
      console.log("123456");
      this.elskeleton.elskeletonLoading = true
      setTimeout(() => (this.elskeleton.elskeletonLoading = false), 2000)
    },
    formSubmit(formName) {
      var resetForm = getVueComponent(this,'$children','$refs',formName);
      resetForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    formCancel(formName) {
      var resetForm = getVueComponent(this,'$children','$refs',formName);
      resetForm.resetFields();
    },
    filterNodeMethod(){
      return true;
    },
    renderContentTree(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
            <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
          </span>
        </span>);
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    },
    allowDrop(){

    },
    formatPercentage(percentage) {
      console.log("format方法");
      console.log(percentage);
      return percentage === 100 ? 'Full' : `${percentage}%`;
    },
    increase() {

      let percentageVal = this.elprogress;
      percentageVal.percentage += 10;
      if (percentageVal.percentage > 100) {
        percentageVal.percentage = 100;
      }

      this.getVueComponentName('elProgressBar','percentage',percentageVal.percentage);

    },
    decrease() {
      
      let percentageVal = this.elprogress;
      percentageVal.percentage -= 10;
      if (percentageVal.percentage < 0) {
        percentageVal.percentage = 0;
      }

      this.getVueComponentName('elProgressBar','percentage',percentageVal.percentage);

    },
    open() {
      this.$message('This is a message.');
    },

    openVn() {
      const h = this.$createElement;
      this.$message({
        message: h('p', null, [
          h('span', null, 'Message can be '),
          h('i', { style: 'color: teal' }, 'VNode')
        ])
      });
    },
    openAlert() {
      this.$alert('This is a message', 'Title', {
        confirmButtonText: 'OK',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    },
    openCustomization(){
      const h = this.$createElement;
      this.$msgbox({
        title: 'Message',
        message: h('p', null, [
          h('span', null, 'Message can be '),
          h('i', { style: 'color: teal' }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = 'Loading...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
    },
    openNotification1(){
      const h = this.$createElement;
      this.$notify({
        title: 'Title',
        message: h('i', { style: 'color: teal' }, 'This is a reminder')
      });
    },
    openNotification2() {
      this.$notify({
        title: 'Prompt',
        message: 'This is a message that does not automatically close',
        duration: 0
      });
    },
    stepNext(){
      /*
      该方法会直接修改VueComponent, error:Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "active"
      var refComponent = getVueComponent(this,'$children','$refs','elsteps');
      if (refComponent.active++ > 2){
        refComponent.active = 0;
      } else {
        refComponent.active ++;
      }
      */

   
      let elstepsVal = this.elsteps;
      if (elstepsVal.active++ > 2){
        elstepsVal.active = 0;
      } else {
        elstepsVal.active ++;
      }

      this.getVueComponentName('elsteps','active',elstepsVal.active);
      
    },
    labelContent(){
      return 'test';
    },
    beforeLeave(activeName, oldActiveName){
      
    },
    elProgressFormat(percentage){
      return percentage;
    },
    openBasicUsageDialog(){
      let visibleVal = this.eldialog;
      visibleVal.visible = true;
      this.getVueComponentName('eldialog','visible',visibleVal.visible);
    },
    openCustomizationsDialog(){
      let visibleVal = this.eldialog;
      visibleVal.visible = true;
      this.getVueComponentName('elCustomizationsDialog','visible',visibleVal.visible);
    },
    openFormNestedDialog(){
      let visibleVal = this.eldialog;
      visibleVal.visible = true;
      this.getVueComponentName('elFormNestedDialog','visible',visibleVal.visible);
    },
    openOuterDialog(){
      let visibleVal = this.eldialog;
      visibleVal.visible = true;
      this.getVueComponentName('elOuterDialog','visible',visibleVal.visible);
      this.getVueComponentName('elInnerDialog','visible',false);
    },
    openInnerDialog(){
      let visibleVal = this.eldialog;
      visibleVal.visible = true;
      this.getVueComponentName('elInnerDialog','visible',visibleVal.visible);
    },
    openCenteredContentDialog(){
      let visibleVal = this.eldialog;
      visibleVal.visible = true;
      this.getVueComponentName('elCenteredContentDialog','visible',visibleVal.visible);
    },
    //具备beforeClose方法的集合(所有关闭弹框事件取refName检索组件并修改组件值)
    beforeClose(){
      console.log("beforeClose======>");
      console.log(this);
      var closeComponentRefList = ['elDrawerRef','eldialog','elTableDrawerRef','elNestedDrawerRef','elInnerDrawerRef','elCustomizationsDialog','elFormNestedDialog','elOuterDialog','elInnerDialog','elCenteredContentDialog'];
      for(var i in closeComponentRefList){
        var component = getVueComponent(this,'$children','$refs',closeComponentRefList[i]);
        console.log(component);
        if(component.visible){ //为打开状态则关闭
          this.getVueComponentName(closeComponentRefList[i],'visible',false);
        }
      }
    },
    cancelDialog(){
      let visibleVal = this.eldialog;
      visibleVal.visible = false;
      this.getVueComponentName('eldialog','visible',visibleVal.visible);
    },
    loadBasicUsage(){
        console.log("加载loadBasicUsage");
        var list = this.customcontent.infiniteListItem_basicUsage.list;
        var lastItem = list[list.length-1];
        list.push({id:lastItem.id+1,label:lastItem.label+1})
    },
    loadDisable(){
        console.log("加载loadDisable");
        var scrollDisabledloading = getVueComponent(this,'$children','$refs','scrollLoadingTag');
        var scrollDisableTag = getVueComponent(this,'$children','$refs','scrollDisableTag');
        var list = this.customcontent.infiniteListItem_disableLoading.list;
        var lastItem = list[list.length-1];
        if(list.length < 20) {
          scrollDisabledloading.style.visibility = 'visible';
        }
        setTimeout(() => {
          if(list.length >= 20) {
            scrollDisableTag.style.visibility = 'visible';
            scrollDisabledloading.style.visibility = 'hidden';
          }else {
            list.push({id:lastItem.id+1,label:lastItem.label+1});
            list = [...new Set(list)]
            scrollDisableTag.style.visibility = 'hidden';
          }
        }, 2000)
    },
    openDrawer(){
      this.getVueComponentName('elDrawerRef','visible',true);
    },
    elDrawerBeforeClose(){
      this.getVueComponentName('elDrawerRef','visible',false);
    },
    openTableDrawer(){
      this.getVueComponentName('elTableDrawerRef','visible',true);
    },
    elDrawerTableBeforeClose(){
      this.getVueComponentName('elTableDrawerRef','visible',false);
    },
    openNestedDrawer(){
      this.getVueComponentName('elNestedDrawerRef','visible',true);
    },
    elNestedDrawerBeforeClose(){
      console.log("elNestedDrawerBeforeClose=====>");
      this.getVueComponentName('elNestedDrawerRef','visible',false);
    },
    openInnerDrawer(){
      this.getVueComponentName('elInnerDrawerRef','visible',true);
    },
    elInnerDrawerBeforeClose(type){
      console.log("elInnerDrawerBeforeClose=====>");
      if(type !== 'init'){
        this.getVueComponentName('elInnerDrawerRef','visible',false);
      }
    },
    changeElTimelineBasicUsageVal(val){
      this.getVueComponentName('elTimelineBasicUsage','reverse',val);
    },
    visibleManualPopover(){ // ElPopover 无法设置visible 只能设置value
      var manualPopoverVal = getVueComponent(this,'$children','$refs','manualPopoverRef').value;
      this.getVueComponentName('manualPopoverRef','value',!manualPopoverVal);
    },
    closePopoverNestedOperation(){ // ElPopover 无法设置visible 只能设置value
      console.log("关闭nestedOperationRef");
      this.getVueComponentName('nestedOperationRef','value',false);
    },





    
    getVueComponentName(refName,paramsName,paramsVal){
      var refComponent = getVueComponent(this,'$children','$refs',refName);
      refComponent._events.changeValue[0](paramsName,paramsVal); 
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "~@/styles/element-ui.scss";
  .el-form {
    display: flex;
    flex-direction: column;
  }

  ::v-deep {
    .elRadioTab {
      margin-bottom: 30px;
    }
    .elTabPosition {
      height: 200px;
    }
    .triggerType {
      display: flex;
    }
    .triggerDetail {
      display: flex;
      flex-direction: column;
    }
    .el-dropdown {
      margin-right: 15px;
    }
    .elStepsVerticalStep {
      height: 300px;
    }

    .elInnerDialogClass {
      .el-dialog__body {
        width: 200px;
        height: 200px;
      } 
      
    }
    .el-popover__reference {
      margin-right: 20px;
    }
    .popoverNestedOperationContent {
      text-align: right; 
      margin: 0
    }
    .elCardShadowRow {
      .el-card {
        width: auto !important;
      }
    }
    .el-collapse,.el-carousel,.el-card {
      margin: 30px 0;
    }

    .el-timeline {
      margin-top: 30px;
    }
    .is-selected {
      color: #1989FA;
    }

    .el-button--text {
      margin: 0 15px;
    }
    .el-drawer__body {
      .el-table,.el-table__body,.el-table__fixed,.el-table__header {
        width: 100% !important;
      }
      
    }
    .infinite-list {
      width: 500px;
      height: 300px;
      padding: 0;
      margin: 0;
      list-style: none;
      .infinite-list-item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
          background: #e8f3fe;
          margin: 10px;
          color: #7dbcfc;
      }
    }

    .infinite-list:last-child {
      margin-top: 45px;
      .infinite-list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        background: #fff6f6;
        color: #ff8484;
      }
    }

    .el-collapse {
      width: 500px;
      .el-collapse-item__header,.el-collapse-item__content {
        padding: 0 15px;
      }
      
    }
    .el-carousel {
      width: 500px;

      .el-carousel__item {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
        text-align: center;
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }
      
      .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
      }
    }
    
    .skeleton {
      .el-card {
        width: 400px;
      }
    }
    .el-card {
      width: 500px;
      .el-button {
        float: right; padding: 3px 0
      }
    }
    .el-dialog {
      top: 20%;
      width: 50% !important;
      height: 50% !important;
      .el-dialog__body {
        height: 28%;
      }
    }
    .el-steps {
      width: 500px;
    }
    .el-tabs--border-card {
      margin-top: 15px;
    }
    .el-menu-vertical-demo {
      margin-top: 15px;
    }
    .el-link--inner {
      span {
        width: auto !important;
        height: auto !important;
        overflow: auto !important;
        height: auto !important;
      }
    }
    .el-menu {
      width: 100%;
    }
    .el-menu-item,.el-submenu {
      span {
        width: auto !important;
        height: auto !important;
        overflow: auto !important;
        color: #909399 !important;
        visibility: initial !important;
      }
    }
    .el-alert {
      width: 500px;
      padding: 8px 16px;
    }
    .is-dark {
      margin-top: 20px;
    }
    .el-result {
      float: left;
      margin-right: 30px;
    }
    .el-badge {
      margin-right: 30px;
    }
    .el-progress{
      width: 350px;
      margin-top: 12px;
    }
    .el-progress--dashboard {
        width: 126px!important;
    }
    .demo-ruleForm {
      height: 62vh!important;
      .el-form-item {
        margin-top: 30px;
      }
      .el-date-editor--time {
        margin-left: 20px;
      }
    }
    .el-form-item{
      display: flex;
    }

    .el-form-item__content {
      line-height: 1 !important;
    }

    .el-slider {
      width: 500px;
      margin-left: 20px;
    }
    .el-date-editor--time-select {
      margin-left: 20px;
    }
    .upload-demo {
      float: left;
    }
    .avatar-uploader { 
      float: left;
      margin-left: 30px;
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }  
      .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
      }
      .avatar {
          width: 178px;
          height: 178px;
          display: block;
      }
    }

    .el-avatar {
      display: inline-block;
      box-sizing: border-box;
      text-align: center;
      overflow: hidden;
      color: #fff;
      background: #c0c4cc!important;
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }

    .el-avatar--circle:last-child {
      margin-left: 15px;
    }

    .el-avatar--square {
      margin-left: 15px;
    }

    .el-card__body {
      .image {
        width: 500px;
        height: 267px;
      }
      .skeletonCardCtn {
        padding: 14px;
      }
    }

    //.skeletonContainer {
      flex-direction: column;
      .skeleton {
        margin-top: 30px;
        .el-skeleton{
          width: 240px;
          margin-top: 30px;
          .skeletonItemImage {
            width: 400px; 
            height: 267px;
          }
          .skeletonttemList {
            padding: 14px;
            .skeletonItemh3 {
              width: 50%;
            }
            .skeletonItemTextList {
              display: flex; 
              align-items: center; 
              justify-items: space-between; 
              margin-top: 16px; 
              height: 16px;
              
              .skeletonItemRight-1 {
                margin-right: 16px;
              }
              .skeletonItemRight-2 {
                width: 30%;
              }
            }
          }

        }
        .el-card__body {
          .image {
            width: 400px;
            height: 267px;
          }
          .skeletonCardCtn {
            padding: 14px;
          }
        }
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
      }
      
    //}

    .el-descriptions {
      padding: 20px;
      background-color: #fff;
    }
    
  }
</style>