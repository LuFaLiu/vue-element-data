<template>
  <div class="custom-tree-container">
    <div class="custom-tree-left">
      <el-select v-model="selectPage" :placeholder="$t('placeholder.pleaseSelect') + $t('pageRule.menuPage')" @change="selectPageMethod">
        <el-option
          v-for="item in routerList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <p>{{$t('pageRule.configureInterfaceModule')}}</p>
      <div class="block" v-if="selectPage">
        <el-tree
          :data="data"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          draggable
          @node-drop="handleDrop"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">
                {{$t('pageRule.addChild')}}
              </el-button>
              <el-button type="text" :disabled="data.id == 1 ? true : false"  size="mini" @click="() => editNode(data)">
                {{$t('pageRule.changeNode')}}
              </el-button>
              <el-button
                :disabled="data.id == 1 ? true : false"
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                {{$t('pageRule.removeNode')}}
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <el-dialog
        :title="$t('tip.tip')"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="form" label-width="180px">
          <el-form-item :label="$t('pageRule.componentName')">
            <el-select v-model="form.componentName" :placeholder="$t('placeholder.pleaseSelect') + $t('pageRule.componentName')" @change="selectComponent" :popper-append-to-body="false">
              <el-option
                v-for="item in componentSelectList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div v-if="componentProps.length > 0">
            <div v-for="(item,index) in componentProps" :key="index">
              <div v-if="item.attributeType == 'ruleDynamicInput'">
                <el-form-item
                  v-for="(defaultItem, defaultIndex) in item.childrenNode"
                  :label="defaultItem.name"
                  :key="defaultIndex"
                >
                  <div v-if="defaultItem.attributeType == 'ruleDynamicInput'">
                    <div v-for="(defaultItem2,index2) in defaultItem.childrenNode" :key="index2">
                      <el-input v-model="defaultItem2.key" placeholder="key"></el-input>
                      <el-input v-model="defaultItem2.value" placeholder="value"></el-input>
                      <el-button @click.prevent="deleteDefaultItem(defaultItem2,index2)">{{$t('form.delete')}}</el-button>
                      <el-button @click="addDefaultItem(defaultItem2.attributeLabel)">{{$t('form.add')}}{{defaultItem2.attributeLabel}}</el-button>
                    </div>
                  </div>
                  <div v-else>
                    <el-input v-model="item.value" placeholder="value"></el-input>
                  </div>
                </el-form-item>
              </div>
            
              <div v-else>
                <component :parentNode="item" :is="item.attributeType" />
              </div>  
            </div>
          </div>
          
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDialog">{{$t('form.cancel')}}</el-button>
          <el-button type="primary" @click="addChildrenThree">{{$t('form.sure')}}</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="custom-tree-right">
      <el-button type="primary" @click="viewChangePageMethod">{{$t('pageRule.preview')}}</el-button>
      <div class="custom-tree-right-ctn" v-if="viewChangePage">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import _ from "lodash";
import pageConfigApi from "@/api/pageConfigApi"
import ruleInput from "@/components/PageRule/ruleInput"
import ruleParamsInput from "@/components/PageRule/ruleParamsInput"
import ruleRadio from "@/components/PageRule/ruleRadio"
import { apiRequestAll,apiRequestOpration } from "@/api/commonApi"
import { resetObj,filterCondition } from '@/utils/index'

let id = 1000;
export default {
  //In reactive mode, it must be set to object
  provide() {
    return {
      appParams:this,
      superAddPageParams: this.form.componentRule
    };
  },
  inject:['appParams'],
  components:{
    ruleInput,
    ruleParamsInput,
    ruleRadio
  },
  data() {
    const data = [
      {
        id: 1,
        label: "elMain"
      },
    ];
    return {
      data: JSON.parse(JSON.stringify(data)),
      dialogVisible: false,
      form: {
        webName:"",
        componentName:"",
        componentClass:{},
        componentRule:{}
      },
      componentSelectList:[],
      dynamicList:[],
      defaultList:[],
      paramsData: {},
      transferData: [],
      transferDataValue: [],
      appendData:{},
      editThreeStatus:0,
      selectPage:'',
      routerList:[],
      pageData:'',
      viewPageRoute:'',
      viewChangePage:false,
      elementUIPlugin:Vue.prototype.constructor._installedPlugins[5],
      componentList:[],
      componentSelectList:[],
      componentProps:[]
    };
  },
  computed: {
    key() {
      return this.viewPageRoute
    }
  },
  watch:{
    '$i18n.locale':function (val) {
      this.routerList = [];
      this.getRouterList();
    }
  },
  mounted(){
    var that = this;
    that.form.webName = that.$route.name;
    that.routerList = [];
    that.getRouterList();

    console.log(that.elementUIPlugin);
    that.componentList = [];
    that.componentSelectList = [];
    for(var i in that.elementUIPlugin){
      if(i.indexOf('Option') == -1){ //屏蔽Option
        if(/^[A-Z]/.test(i) && that.elementUIPlugin[i].name && that.elementUIPlugin[i].props){
          if(i == 'TimePicker' || i == 'TimeSelect' || i == 'DatePicker'){
            that.componentList.push({name:that.elementUIPlugin[i].name,props:that.elementUIPlugin[i].mixins[0].props});
          }else {
            that.componentList.push({name:that.elementUIPlugin[i].name,props:that.elementUIPlugin[i].props ? that.elementUIPlugin[i].props : {}});
          }
          that.componentSelectList.push({lable:that.elementUIPlugin[i].name,value:that.elementUIPlugin[i].name});
        }
      }
    }

    //添加自定义组件
    that.componentList.push({name:'customContent',props:{'componentName':'','tag':'','attributeName':''}})
    that.componentSelectList.push({lable:'customContent',value:'customContent'});

    //添加自定义标签组件
    that.componentList.push({name:'customTag',props:{'componentName':'','attrs':'',props:''}});
    that.componentSelectList.push({lable:'customTag',value:'customTag'});

    //添加自定义template标签 (默认为default)
    that.componentList.push({name:'customTemplate',props:{'componentName':'','slot':'default','class':''}});
    that.componentSelectList.push({lable:'customTemplate',value:'customTemplate'});

    console.log(that.componentList);
    console.log(that.componentSelectList);
  },

  methods: {
    getRouterList(){
      var that = this;
      _.filter(_.filter(that.$router.options.routes[0].children,_.matches({name:'page:manage:add'}))[0].children,function (item) { 
        that.routerList.push({'label': that.$t(item.meta.title),'value':item.name});
        /*
        if(item.name.indexOf('page') == -1){ 
          that.routerList.push({'label': that.$t(item.meta.title),'value':item.name});
        }
        */
      });
    },
  
    selectPageMethod(val,showType){
      var that = this;
      that.viewChangePage = false;
      var selectRouteName = _.filter(that.$router.options.routes[0].children,_.matches({name:val}))[0].path.split('/'); //路由信息 

      _.filter(_.filter(that.$router.options.routes[0].children,_.matches({name:'page:manage:add'}))[0].children,function (item) {
        if(item.path == selectRouteName[selectRouteName.length - 1]){ //当前页面路由信息
          that.viewPageRoute =  '/pageConfig/addPage/' + item.path;
        }
      })

      //page model
      that.getPageModel(val,showType);
      if(showType){
        that.selectPage = val;
      }
       
    },
    
    getPageModel(val){
      var that = this;
      that.pageData = '';
      pageConfigApi.getPageNode(val).then(res=>{
        if(res.data.data.length > 0){
          that.data = res.data.data[0].node;
          //reset defaultList
          that.defaultList = [
            {
              childrenNode:[],
              componentName: '',
              id: ''
            }
          ];
          //需选择下拉框
          console.log("界面模块");
          console.log(JSON.stringify(res.data.data[0].node));
          var getSelectPageNode = that.conversionPageData(res.data.data[0].node,[])[0];
          if(getSelectPageNode.childrenNode){
            that.pageData = that.conversionPageData(res.data.data[0].node,[])[0].childrenNode[0];
          }
        }else{
          that.data = [{
              id: 1,
              label: "elMain"
          }];
        }
      })
    },

    //view page
    viewChangePageMethod(){
      if(!this.selectPage){
        this.$message({
          message: this.$t('pageRule.selectPageRouter'),
          type: 'warning'
        });
        return false;
      }

      if(this.pageData){
        this.$router.push({path:this.viewPageRoute}); 
        this.viewChangePage = true;
      }else{
        this.$message({
          message: this.$t('pageRule.modulesInterface'),
          type: 'warning'
        });
      }
      
    },

    changePageData(val){
      //console.log(val);
    },

    addDefaultItem(attributeLabel){
      
      var that = this;
       _.filter(_.filter(that.defaultList[0].childrenNode,_.matches({'attributeLabel':attributeLabel})),function (v,index) {
          v.childrenNode.push({
            [`value${index+Date.now()}`]: '', //[`value${index+Date.now()}`] 动态属性便于遍历不同的值
            key: Date.now()
          })
       })
    },

    deleteDefaultItem(attributeLabel,index){
      var that = this;
      that.defaultList[0].childrenNode.filter(v=>{
        if(v.attributeLabel == attributeLabel){
          v.childrenNode = v.childrenNode.filter((node,nodeIndex)=>{
            return index !== nodeIndex;
          })  
        }
      })
    },

    selectComponent(val){

      var componentInfo = _.filter(this.componentList,['name',val])[0].props;

      this.componentProps = [];
      for(var i in componentInfo){

        var paramType = typeof componentInfo[i].type;
        var type = paramType == 'function' ? typeof componentInfo[i].type() : paramType ;

        var attributeVal = 
          componentInfo[i].default 
            ? typeof componentInfo[i].default == 'function'
                ? type == 'function' ? '' : (()=>{ return '' })
                 (type == 'boolean' ? componentInfo[i].default() : type == 'object' ? '' : componentInfo[i].default().toString()) 
                        : type == 'object' ? typeof componentInfo[i].default == 'undefined' ? '' : componentInfo[i].default.toString() : type == 'undefined' ? componentInfo[i].default.toString() : componentInfo[i].default 
                          : type == 'object' ? typeof componentInfo[i].default == 'undefined' ? '' :  componentInfo[i].default.toString() :  componentInfo[i].default 
                            ? type == 'string' ? '' : false 
                              :  componentInfo[i].default ? componentInfo[i].default : '';

        //console.log(i,paramType,type,componentInfo[i].default ? typeof componentInfo[i].default : 'null' ,componentInfo[i],attributeVal);


        var supportedTypes = '';
        if(componentInfo[i].type && componentInfo[i].type.length && componentInfo[i].type.length > 1){
          componentInfo[i].type.filter((v,index)=>{
            supportedTypes += ((typeof v()) +  ((index !== componentInfo[i].type.length -1) ? '/' : '') );
          })
        }else {
          if(type == 'function'){
            supportedTypes = 'string';
          }else {
            supportedTypes = type;
          }
        }
        
        //特殊属性作处理
        if(i == 'modal'){
          this.componentProps.push({attributeName:i,attributeLabel:i,attributeModel:i,[`${i}`]: '' ,inputFormat:'string', attributeType: 'ruleInput'})
        }else if(i == 'showClose' || i == 'disabled' || i == 'showPassword' || i == 'clearable' || i== 'loading' || i == 'autosize' || i == 'border' || i == 'vertical' || i == 'readonly' || i == 'drag' || i == 'showScore' || i == 'round' || i == 'plain' || i == 'circle' || i == 'filterable' || i == 'showSummary' || i == 'remote' || i == 'multiple' || i == 'required' || i == 'lazy' || i == 'textInside' || i == 'hidden' || i == 'isDot' || i == 'closable' || i == 'divided' || i == 'simple' || i == 'appendToBody' || i== 'visible' || i == 'hideIcon'){
          this.componentProps.push({attributeName:i,attributeLabel:i,attributeModel:i,[`${i}`]: componentInfo[i].default ? componentInfo[i].default : false ,inputFormat:'text', attributeType: 'ruleRadio'})
        }else if(i == 'pageSizes'){
          this.componentProps.push({attributeName:i,attributeLabel:i,attributeModel:i,[`${i}`]: '[10, 20, 30, 40, 50, 100]',inputFormat:'Array', attributeType: 'ruleInput'})
        }else if(i == 'clearable'){
          this.componentProps.push({attributeName:i,attributeLabel:i,attributeModel:i,[`${i}`]: false ,inputFormat: typeof componentInfo[i].type(), attributeType: 'ruleRadio'})
        } else {
          this.componentProps.push({attributeName:i,attributeLabel:i,attributeModel:i,[`${i}`]:  i == 'treeProps' ? JSON.stringify({ hasChildren: 'hasChildren', children: 'children' }) : attributeVal ,inputFormat:supportedTypes, attributeType: type == 'boolean' ? 'ruleRadio' : 'ruleInput'})
        }
        
        
      }

      //添加自定义属性
      switch (val) {
        case 'ElSelect':
          this.componentProps.push({attributeName:'ElOptionListName',attributeLabel:'ElOptionListName',attributeModel:'ElOptionListName',[`${i}`]: '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;
        case 'ElButton':
          this.componentProps.push({attributeName:'title',attributeLabel:'title',attributeModel:'title',[`${i}`]: '' ,inputFormat:'string', attributeType: 'ruleInput'})
          this.componentProps.push({attributeName:'vModelName',attributeLabel:'vModelName',attributeModel:'vModelName',[`${i}`]: '' ,inputFormat:'string', attributeType: 'ruleInput'})
          this.componentProps.push({attributeName:'event',attributeLabel:'event',attributeModel:'event','event': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          this.componentProps.push({attributeName:'slot',attributeLabel:'slot',attributeModel:'slot','slot': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;
        case 'ElLink':
          this.componentProps.push({attributeName:'title',attributeLabel:'title',attributeModel:'title',[`${i}`]: '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break; 
        case 'ElHeader':
          this.componentProps.push({attributeName:'title',attributeLabel:'title',attributeModel:'title',[`${i}`]: '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;
        case 'ElFooter':
          this.componentProps.push({attributeName:'title',attributeLabel:'title',attributeModel:'title',[`${i}`]: '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;
        case 'ElRadio':
          this.componentProps.push({attributeName:'title',attributeLabel:'title',attributeModel:'title',[`${i}`]: '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;        
        case 'ElInput':
          this.componentProps.push({attributeName:'placeholder',attributeLabel:'placeholder',attributeModel:'placeholder',[`${i}`]: '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;
        case 'ElTimePicker':
          this.componentProps.push({attributeName:'isRange',attributeLabel:'isRange',attributeModel:'isRange','isRange': false ,inputFormat:'boolean', attributeType: 'ruleRadio'})
          this.componentProps.push({attributeName:'arrowControl',attributeLabel:'arrowControl',attributeModel:'arrowControl','arrowControl': false ,inputFormat:'boolean', attributeType: 'ruleRadio'})
          break; 
        case 'ElDatePicker':
          this.componentProps.push({attributeName:'type',attributeLabel:'type',attributeModel:'type','type': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;  
        case 'ElForm':
          this.componentProps.push({attributeName:'refName',attributeLabel:'refName',attributeModel:'refName','refName': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;
        case 'ElCheckboxGroup':
          this.componentProps.push({attributeName:'indeterminate',attributeLabel:'indeterminate',attributeModel:'indeterminate','indeterminate': false ,inputFormat:'boolean', attributeType: 'ruleRadio'})
          break;        
        case 'ElFormItem':
          this.componentProps.push({attributeName:'inline',attributeLabel:'inline',attributeModel:'inline','inline': false ,inputFormat:'boolean', attributeType: 'ruleRadio'})
          break; 
        case 'ElTable':
          this.componentProps.push({attributeName:'loading',attributeLabel:'loading',attributeModel:'loading','loading':false ,inputFormat:'boolean', attributeType: 'ruleRadio'})
          break; 
        case 'ElMenuItem':
          this.componentProps.push({attributeName:'title',attributeLabel:'title',attributeModel:'title','title': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break; 
        case 'ElTabPane':
          this.componentProps.push({attributeName:'title',attributeLabel:'title',attributeModel:'title','title': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;   
        case 'customTemplate':
          this.componentProps.push({attributeName:'title',attributeLabel:'title',attributeModel:'title','title': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;    
        case 'ElBreadcrumbItem':
          this.componentProps.push({attributeName:'title',attributeLabel:'title',attributeModel:'title','title': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;  
        case 'ElDropdownItem':
          this.componentProps.push({attributeName:'title',attributeLabel:'title',attributeModel:'title','title': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;  
        case 'ElDropdownMenu':
          this.componentProps.push({attributeName:'slot',attributeLabel:'slot',attributeModel:'slot','slot': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;  
        case 'ElDialog':
          this.componentProps.push({attributeName:'visible',attributeLabel:'visible',attributeModel:'visible','visible': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;  
        case 'ElTooltip':
          this.componentProps.push({attributeName:'placement',attributeLabel:'placement',attributeModel:'placement','placement': 'bottom' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;  placement
        case 'ElPopover':
          this.componentProps.push({attributeName:'placement',attributeLabel:'placement',attributeModel:'placement','placement': 'bottom' ,inputFormat:'string', attributeType: 'ruleInput'})
          break; 
        case 'ElCarouselItem':
          this.componentProps.push({attributeName:'title',attributeLabel:'title',attributeModel:'title','title': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;    
        default: 
          this.componentProps.push({attributeName:'class',attributeLabel:'class',attributeModel:'class','class': '' ,inputFormat:'list', attributeType: 'ruleInput'})
          this.componentProps.push({attributeName:'refName',attributeLabel:'refName',attributeModel:'refName','refName': '' ,inputFormat:'string', attributeType: 'ruleInput'})
          break;
      }


      if(val == 'ElSkeleton'){
        componentInfo[i].inputFormat = 'string';
        componentInfo[i].attributeType = 'ruleInput';
        componentInfo[i].loading = '';
        this.componentProps.filter(v=>{
          if(v.attributeLabel == 'loading'){
            v.inputFormat = 'string';
            v.attributeType = 'ruleInput';
            v.loading = '';
          }
        })
      }

      //所有的都默认添加该属性
      this.componentProps.push({attributeName:'customVal',attributeLabel:'customVal',attributeModel:'customVal','customVal': '' ,inputFormat:'string', attributeType: 'ruleInput'})
      this.componentProps.push({attributeName:'uniqueIdentifier',attributeLabel:'uniqueIdentifier',attributeModel:'uniqueIdentifier','uniqueIdentifier': '' ,inputFormat:'string', attributeType: 'ruleInput'})

      console.log("componentProps=======>");
      console.log(val,componentInfo);
      console.log(this.componentProps);
    },

    //提交添加
    addChildrenThree(){
        
      var that = this;

      if(!that.form.componentName){
        that.$message({
          message: this.$t('pageRule.selectPageComponent'),
          type: 'warning'
        });
        return;
      }
      that.form.componentRule = {};
      _.filter(that.componentProps,function (param) { //将规则参数列表参数添加到form.componentRule便于子组件的值
        console.log(param);
        if(param.attributeType == "ruleDynamicInput"){
          that.$set(that.form.componentRule,param.attributeName,{});
          param.childrenNode.filter((v,index)=>{ //获取子节点参数
            if(that.editThreeStatus == 0){ //Add
              that.$set(that.form.componentRule[param.attributeName],_.keys(v)[0],v.value);
            }else{ //Edit
              that.$set(that.form.componentRule[param.attributeName],_.keys(param.childrenNode)[index],v.value); //动态设置多个子元素key、value
            }
          })
        }else if(param.attributeType == "ruleParamsInput"){
          that.$set(that.form.componentRule,param.attributeName,{});
          param.childrenNode.filter(v=>{ //获取子节点参数
            if(that.editThreeStatus == 0){ //Add
              that.$set(that.form.componentRule[param.attributeModel],v.attributeModel,v[v.attributeModel]);
            }else{ //Edit
              that.$set(that.form.componentRule[param.attributeModel],v.attributeModel,v[v.attributeModel]); //动态设置多个子元素key、value
            }
          })
        } else{
          that.$set(that.form.componentRule,param.attributeModel,param[param.attributeModel]); //获取分配给该form.componentrule的动态属性值
        }
      })

      console.log(that.form.componentRule);

      //将参数对象转换为其初始值
      var componentRule = {};
      _.forEach(that.form.componentRule, function(value, key) { 
          componentRule[key] = value;
          /*
          if(key == 'class' || key == 'placeholder' || key == 'title' || key == 'pageSize'){
            componentRule[key] = [];
            _.forEach(that.form.componentRule[key], function(value2) {
              componentRule[key].push(value2);
            })
          }else{
            componentRule[key] = value;
          }
          */
      });

      if(that.editThreeStatus == 0){
        const newChild = { id: Date.now(), label: that.form.componentName,componentRule:componentRule, children: [] }; //分配给树
        if (!that.appendData.children) {
          that.$set(that.appendData, 'children', []);
        }
        that.appendData.children.push(newChild);
      }else{
        that.appendData.componentRule = componentRule;
      }

      that.dialogVisible = false;
      that.submitParamsRule(); //更新参数规则树


    },

    //拖放树节点
    handleDrop(){
      this.submitParamsRule(); //更新参数规则树
    },

    //单击Add子按钮
    append(data) {

      this.componentProps = []; //清空已存在的组件属性
      this.dialogVisible = true;
      this.editThreeStatus = 0;
      this.form = resetObj(this.form); //重置当前Form对象
      this.transferData = [];
      this.transferDataValue = [];
      this.appendData = data; 
      //重置现有的默认规则参数
      this.defaultList = [
        {
          childrenNode:[],
          componentName: '',
          id: ''
        }
      ]; 
    },

    //编辑当前节点参数
    editNode(data){
      console.log("点击编辑");
      console.log(data);
      var that = this;
      that.dialogVisible = true;
      that.appendData = data; //分配给当前的单击树节点

      that.editThreeStatus = 1;
      let paramKey = _.keys(data.componentRule); //获取当前规则参数

      that.form.componentName = data.label;
      this.componentProps = [];
      let componentInfo = data.componentRule;
      for(var i in componentInfo){
        var paramType = typeof componentInfo[i];
        if(paramType == 'boolean') {
          this.componentProps.push({attributeName:i,attributeLabel:i,attributeModel:i,[`${i}`]: componentInfo[i] ,inputFormat:'boolean', attributeType: 'ruleRadio'})
        }else {
          this.componentProps.push({attributeName:i,attributeLabel:i,attributeModel:i,[`${i}`]: componentInfo[i] ,inputFormat:'string', attributeType: 'ruleInput'})
        }
      }
      
      //重置默认规则参数
      /*
      that.defaultList[0].childrenNode = []; //重置已存在节点

      //从默认列表中获取参数规则并删除现有的参数规则
      _.filter(_.filter(that.componentList,_.matches({'componentName':that.appendData.label})),function (node) {
        _.filter(node.childrenNode,function (attribute) {
          if(paramKey.indexOf(attribute.attributeName) == -1){
            that.$set(attribute,attribute.attributeName,attribute.attributeType == 'ruleInput' ? '' : false);
            that.defaultList[0].childrenNode.push(attribute);
          }
        })
      });

     //匹配所有参数规则列表中已存在的参数规则
     filterCondition(that,that.allListParams,'componentName',that.appendData.label,paramKey,function (childrenNode) {

        if(childrenNode.attributeName == 'class' || childrenNode.attributeName == 'placeholder' || childrenNode.attributeName == 'title' || childrenNode.attributeName == 'pageSize'){ //class
          childrenNode.childrenNode = [];
          for(var classVal of that.appendData.componentRule[childrenNode.attributeName]){ //获取分配给defaultlist [0].childrenNode的已分配规则参数值
            childrenNode.childrenNode.push({
              value:classVal, //将值赋给动态值
            })
          } 
        }else{
          if(childrenNode.attributeType == 'ruleParamsInput'){
            that.$set(childrenNode,childrenNode.attributeName,that.appendData.componentRule[childrenNode.attributeName]); 
            childrenNode.childrenNode.filter(v=>{
              that.$set(v,v.attributeModel,that.appendData.componentRule[childrenNode.attributeName][v.attributeModel]);
            })
          }else {
            that.$set(childrenNode,childrenNode.attributeName,that.appendData.componentRule[childrenNode.attributeName]); //对原始规则参数赋值
          }
        }
        that.defaultList[0].childrenNode.push(childrenNode);
     }); 
     */

     //that.submitParamsRule(); //更新参数规则树
     

    },

    //提交参数规则树
    submitParamsRule(){
      var that = this;
      pageConfigApi.saveComponent({pageName:that.selectPage,node:that.data}).then(res=>{

        if(res.data.code == 200){
          that.$message({
            message: this.$t('tip.success'),
            type: 'success'
          });
        }

        var currentPageModel = _.filter(res.data.data,_.matches({pageName:that.selectPage}));

        that.pageData = that.conversionPageData(currentPageModel[0].node,[])[0].childrenNode[0];
 
        that.viewChangePage = false; //test
        /*
        if(that.viewChangePage){
          that.$router.push({path:that.viewPageRoute}); //修改后显示
        }
        */
      })
    },

    //转换列表树
    conversionPageData(list,item){
      var that = this;
      list.filter(v=>{
        let obj = {}
        obj['componentName'] = v.label;
        if(v.componentRule){
          _.forEach(v.componentRule,function (val,key) {
            obj[key] = val;
          })
        }

        item.push(obj);
        if(v.children && v.children.length > 0){
          that.$set(obj,'childrenNode',[]);
          return that.conversionPageData(v.children,obj['childrenNode']);
        }else{
          return item;
        }
      })
      return item;
    },

    //移除子节点
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      this.submitParamsRule(); //更新参数规则树
    },
    cancelDialog(){
      this.dialogVisible = false;
      this.componentProps = [];
    },
    handleClose(done) {
      this.componentProps = [];
      done();
    }
  },
};
</script>

<style lang="scss" scoped>
.custom-tree-container{
  display: flex;
  justify-content: space-between;
  .custom-tree-left{
    width: 35%;
  }
  .custom-tree-right{
    width: 62%;
    display: flex;
    flex-direction: column;
    .el-button{
      width: 100px;
    }
    .custom-tree-right-ctn{
      margin-top: 30px;
      zoom:0.8;
      position: relative;
    }
  }

}


::v-deep{

  .el-form {
    display: flex;
    flex-direction: column;
  }

  .el-footer, .el-header {
      background-color: #b3c0d1;
      color: #333;
      line-height: 60px;
  }

  .custom-tree-right-ctn{
    .addRole {
      position: fixed!important;
      width: calc(53% - 40px)!important;
      height: auto!important;
    }
    .el-button{
      //pointer-events: none!important;//Do not operate the preview button
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .drawer-footer{
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-transfer{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-dialog__body {
    height: 60vh;
    padding-bottom: 20px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #c1c1c1;
    }
    .el-input {
      width: 70%;
    }
    .el-select {
      width: 160px;
      .el-input {
        width: 100%;
      }
    }
  }


  .el-form {
    height: 90vh!important;
  }

  

  .el-tree,.custom-tree-right-ctn .el-form {
    height: 70vh;
    padding-bottom: 20px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #c1c1c1;
    }
  }
}

</style>