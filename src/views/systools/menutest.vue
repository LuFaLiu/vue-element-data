<template>
    <elComponent v-if="appParams.pageData" :node="appParams.pageData" :route="$route.name"/>
</template>

<script>
import _ from "lodash";
import elComponent from '@/components/elComponent/index'
import { resetObj,getVueComponent } from '@/utils/index'

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
          rules:[]
        },
        elinput:{
          value:'title',
          autosize:{},
        },
        elcheckbox:{
          value:false
        },
        elradiogroup:{
          value:''
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
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
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
        }
        
        

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
      console.log(this.elprogress.percentage );
      this.elprogress.percentage += 10;
      if (this.elprogress.percentage > 100) {
        this.elprogress.percentage = 100;
      }
    },
    decrease() {
      console.log(this.elprogress.percentage );
      this.elprogress.percentage -= 10;
      if (this.elprogress.percentage < 0) {
        this.elprogress.percentage = 0;
      }
    }
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