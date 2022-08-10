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
          <el-button @click="addRuleParams">{{$t('form.addRuleParameters')}}</el-button>
          <el-button @click="cancelDialog">{{$t('form.cancel')}}</el-button>
          <el-button type="primary" @click="addChildrenThree">{{$t('form.sure')}}</el-button>
        </span>
      </el-dialog>
      <el-drawer
        :title="$t('form.addRuleParameters')"
        :visible.sync="drawer"
        size="50%"
        direction="rtl"
        :before-close="handleClose"
      >
        <el-transfer
          v-model="transferDataValue"
          :titles="[$t('form.ruleParametersLibrary'), $t('form.addRuleParameters')]"
          :props="{
            key: 'value',
            label: 'label',
          }"
          :data="transferData"
        >
        </el-transfer>
        <span class="drawer-footer">
          <el-button @click="drawer = false">{{$t('form.cancel')}}</el-button>
          <el-button type="primary" @click="submitRuleParameterList(transferDataValue)">{{$t('form.sure')}}</el-button>
        </span>
      </el-drawer>
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
      drawer: false,
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
      allListParams:[],
      allDefaultListParams:[],
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
    that.allListParams = [];
    that.allDefaultListParams = [];
    apiRequestAll(that,pageConfigApi,'getDefaultList','allDefaultListParams');
    apiRequestAll(that,pageConfigApi,'getDefaultList','allListParams');
    apiRequestAll(that,pageConfigApi,'getDynamicList','allListParams');
    that.form.webName = that.$route.name;
    that.routerList = [];
    that.getRouterList();

    console.log(that.elementUIPlugin);
    that.componentList = [];
    that.componentSelectList = [];
    for(var i in that.elementUIPlugin){
      if(/^[A-Z]/.test(i) && that.elementUIPlugin[i].name){
        that.componentList.push({name:that.elementUIPlugin[i].name,props:that.elementUIPlugin[i].props ? that.elementUIPlugin[i].props : {}});
        that.componentSelectList.push({lable:that.elementUIPlugin[i].name,value:that.elementUIPlugin[i].name});
      }
    }

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
      var selectRouteName = _.filter(that.$router.options.routes[0].children,_.matches({name:val}))[0].path.split('/'); //router info 

      _.filter(_.filter(that.$router.options.routes[0].children,_.matches({name:'page:manage:add'}))[0].children,function (item) {
        if(item.path == selectRouteName[selectRouteName.length - 1]){ //current page router info 
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
          //console.log("界面模块");
          //console.log(JSON.stringify(res.data.data[0].node));
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

    getDynamicList(type) {
      var that = this;
      that.dynamicList = [];
      that.transferData = [];
      apiRequestOpration(pageConfigApi,'getDynamicList',function (data) {
        _.filter(_.filter(data.items,_.matches({'componentName':type})),function (v) {
          that.dynamicList.push(v);
          var hasParamsList = _.map(that.defaultList[0].childrenNode,'attributeName'); //get default rule object name
          v.childrenNode.filter(node=>{
            that.transferData.push({ //left data
              value: node.attributeModel,
              label: that.$t(node.attributeLabel) 
            });
            if(hasParamsList.indexOf(node.attributeName) > -1){ //left to right
              that.transferDataValue.push(node.attributeModel); //cumulative rule
            }
          })
        })
      }) 
    },

    getDefaultList(type) {
      var that = this;
      that.dynamicList = []; 
      that.form.componentRule = {}; 
      apiRequestOpration(pageConfigApi,'getDefaultList',function (data) {
        that.defaultList = _.filter(_.filter(data.items,_.matches({'componentName':type})));
      })
    },

    addDefaultItem(attributeLabel){
      
      var that = this;
       _.filter(_.filter(that.defaultList[0].childrenNode,_.matches({'attributeLabel':attributeLabel})),function (v,index) {
          v.childrenNode.push({
            [`value${index+Date.now()}`]: '', //[`value${index+Date.now()}`] Dynamic properties facilitate traversal of different values
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
      console.log(val,componentInfo);
      var componentInfo = _.filter(this.componentList,['name',val])[0].props;
      this.componentProps = [];
      if(val == "ElInput"){
        this.componentProps.push({attributeName:'placeholder',attributeLabel:'placeholder',attributeModel:'', attributeType: 'ruleInput'})
      }
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

        this.componentProps.push({attributeName:i,attributeLabel:i,attributeModel:i,[`${i}`]:  i == 'treeProps' ? JSON.stringify({ hasChildren: 'hasChildren', children: 'children' }) : attributeVal ,inputFormat:supportedTypes, attributeType: type == 'boolean' ? 'ruleRadio' : 'ruleInput'})
        
      }
      console.log("componentProps=======>");
      console.log(this.componentProps);
      this.getDefaultList(val);
    },

    addRuleParams(){
      var that = this;
      if(!that.form.componentName){
        that.$message({
          message: this.$t('pageRule.selectPageComponent'),
          type: 'warning'
        });
      }else {
        that.getDynamicList(that.form.componentName);
        that.drawer = true;
      }
      
    },

    submitRuleParameterList(val){
      var that = this;
      if(val.length == 0){
        that.$message({
          message: this.$t('pageRule.addPageRuleParams'),
          type: 'warning'
        });
      }else {
        var defaultList = _.map(that.defaultList[0].childrenNode,'attributeName'); //Default rule parameters
        val.forEach(e => {
          that.dynamicList[0].childrenNode.filter(v=>{
            if(v.attributeName == e && defaultList.indexOf(v.attributeName) == -1){ //The rule parameter library matches the new rule parameter and does not exist in the right drawer accumulation rule
              that.$set(v,v.attributeName,v.attributeType == 'ruleInput' ? '' : false); // Adds rule parameters to the current object for dynamic value passing
              that.defaultList[0].childrenNode.push(v);
              that.drawer = false;
            }
          })
        });
      }
    },

    addChildrenThree(){
        
      var that = this;

      if(!that.form.componentName){
        that.$message({
          message: this.$t('pageRule.selectPageComponent'),
          type: 'warning'
        });
        return;
      }

      _.filter(that.defaultList[0].childrenNode,function (param) { //Adds the rule parameter list parameter to form.componentRule Facilitate the value of subcomponents
        if(param.attributeType == "ruleDynamicInput"){
          that.$set(that.form.componentRule,param.attributeName,{});
          param.childrenNode.filter((v,index)=>{ //Gets the child node parameters
            if(that.editThreeStatus == 0){ //Add
              that.$set(that.form.componentRule[param.attributeName],_.keys(v)[0],v.value);
            }else{ //Edit
              that.$set(that.form.componentRule[param.attributeName],_.keys(param.childrenNode)[index],v.value); //Dynamically set multiple child elements key、value
            }
          })
        }else if(param.attributeType == "ruleParamsInput"){
          that.$set(that.form.componentRule,param.attributeName,{});
          param.childrenNode.filter(v=>{ //Gets the child node parameters
            if(that.editThreeStatus == 0){ //Add
              that.$set(that.form.componentRule[param.attributeModel],v.attributeModel,v[v.attributeModel]);
            }else{ //Edit
              that.$set(that.form.componentRule[param.attributeModel],v.attributeModel,v[v.attributeModel]); //Dynamically set multiple child elements key、value
            }
          })
        } else{
          that.$set(that.form.componentRule,param.attributeModel,param[param.attributeModel]); //Gets the dynamic property value assigned to that.form.componentRule
        }
      })

      //Convert a parameter object to its initial value
      var componentRule = {};
      _.forEach(that.form.componentRule, function(value, key) { 
          if(key == 'class' || key == 'placeholder' || key == 'title' || key == 'pageSize'){
            componentRule[key] = [];
            _.forEach(that.form.componentRule[key], function(value2) {
              componentRule[key].push(value2);
            })
          }else{
            componentRule[key] = value;
          }
      });

      if(that.editThreeStatus == 0){
        const newChild = { id: Date.now(), label: that.form.componentName,componentRule:componentRule, children: [] }; //Assigned to the tree
        if (!that.appendData.children) {
          that.$set(that.appendData, 'children', []);
        }
        that.appendData.children.push(newChild);
      }else{
        that.appendData.componentRule = componentRule;
      }

      that.dialogVisible = false;
      that.submitParamsRule(); //Update parameter rule tree
    },

    //Drag and drop tree nodes
    handleDrop(){
      this.submitParamsRule(); //Update parameter rule tree
    },

    //Click the Add child button
    append(data) {
      this.dialogVisible = true;
      this.editThreeStatus = 0;
      this.form = resetObj(this.form); //Reset the current Form object
      this.transferData = [];
      this.transferDataValue = [];
      this.appendData = data; 
      //Resets existing default rule parameters
      this.defaultList = [
        {
          childrenNode:[],
          componentName: '',
          id: ''
        }
      ]; 
    },

    //Edit current node parameters
    editNode(data){
      var that = this;
      that.dialogVisible = true;
      that.appendData = data; //Assign to the current click tree node

      that.editThreeStatus = 1;
      let paramKey = _.keys(data.componentRule); //Gets the current rule parameter
      that.form.componentName = data.label;
      //Reset default rule parameters
      that.defaultList[0].childrenNode = []; //Reset an existing node

      //Take the parameter rule from the default list and remove the existing parameter rule
      _.filter(_.filter(that.allDefaultListParams,_.matches({'componentName':that.appendData.label})),function (node) {
        _.filter(node.childrenNode,function (attribute) {
          if(paramKey.indexOf(attribute.attributeName) == -1){
            that.$set(attribute,attribute.attributeName,attribute.attributeType == 'ruleInput' ? '' : false);
            that.defaultList[0].childrenNode.push(attribute);
          }
        })
      });

     //Matches an existing parameter rule in all parameter rule lists
     filterCondition(that,that.allListParams,'componentName',that.appendData.label,paramKey,function (childrenNode) {

        if(childrenNode.attributeName == 'class' || childrenNode.attributeName == 'placeholder' || childrenNode.attributeName == 'title' || childrenNode.attributeName == 'pageSize'){ //class
          childrenNode.childrenNode = [];
          for(var classVal of that.appendData.componentRule[childrenNode.attributeName]){ //Gets the assigned rule parameter value assigned to that.defaultList[0].childrenNode
            childrenNode.childrenNode.push({
              value:classVal, //Assign a value to dynamic value
            })
          } 
        }else{
          if(childrenNode.attributeType == 'ruleParamsInput'){
            that.$set(childrenNode,childrenNode.attributeName,that.appendData.componentRule[childrenNode.attributeName]); 
            childrenNode.childrenNode.filter(v=>{
              that.$set(v,v.attributeModel,that.appendData.componentRule[childrenNode.attributeName][v.attributeModel]);
            })
          }else {
            that.$set(childrenNode,childrenNode.attributeName,that.appendData.componentRule[childrenNode.attributeName]); //Assign to the original rule parameter
          }
        }
        that.defaultList[0].childrenNode.push(childrenNode);
     }); 

     //that.submitParamsRule(); //Update parameter rule tree
    },

    //Submit parameter rule tree
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
          that.$router.push({path:that.viewPageRoute}); //Display it after modification
        }
        */
      })
    },

    //Transform list tree
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

    //Remove the child
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      this.submitParamsRule(); //Update parameter rule tree
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

  .el-tree {
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