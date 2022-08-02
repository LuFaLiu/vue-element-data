<template>
    <elComponent v-if="appParams.pageData" :node="appParams.pageData" :route="$route.name"/>
</template>

<script>
import pageConfigApi from "@/api/pageConfigApi"
import {deleteApiRequest,apiRequestParams,apiRequestTable} from "@/api/commonApi";
import _ from "lodash";
import { resetObj,getVueComponent } from '@/utils/index'
import elComponent from '@/components/elComponent/index'

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
  data() {

    const validateAttributeName = ((rule,value,callback)=>{
      if(!value){
        const tip = this.$t('placeholder.pleaseEnter') + this.$t('pageRule.attributeName');
        return callback(new Error(tip))
      }else{
        callback();
      }
    })
    const validateAttributeType = ((rule,value,callback)=>{
      if(!value){
        const tip = this.$t('placeholder.pleaseEnter') + this.$t('pageRule.attributeType');
        return callback(new Error(tip))
      }else{
        callback();
      }
    })
    const validateAttributeLabel = ((rule,value,callback)=>{
      if(!value){
        const tip = this.$t('placeholder.pleaseEnter') + this.$t('pageRule.attributeLabel');
        return callback(new Error(tip))
      }else{
        callback();
      }
    })
    const validateAttributeModel = ((rule,value,callback)=>{
      if(!value){
        const tip = this.$t('placeholder.pleaseEnter') + this.$t('pageRule.attributeModel');
        return callback(new Error(tip))
      }else{
        callback();
      }
    })
    return {
      paramsData: {
        componentType: "",
        componentName: "",
        attributeName: "",
        attributeType: "",
        attributeLabel: "",
        attributeModel: ""
      },
      addContentDialog: false,
      searchForm: {
        orderNum: "",
        referenceName:""
      },
      allQuestionTypeList: [],
      selectQuestionTypeList:[],
      referenceName:'',
      btnLoading:false, //Prevent multiple clicks
      delBtlStatu:true,
      tableData: [],
      paramsDataRules: {
        attributeName: [
          { required: true, validator:validateAttributeName, trigger: "blur" }
        ],
        attributeType: [
          { required: true, validator:validateAttributeType, trigger: "blur" },
        ],
        attributeLabel: [
          { required: true, validator:validateAttributeLabel, trigger: "blur" },
        ],
        attributeModel: [
          { required: true, validator:validateAttributeModel, trigger: "blur" },
        ]
      },

      multipleSelection: [],
      editMethodUser: 0,
      tableHeight: 0,
      moduleFileIdList:[],

      pageAttribute:{
        total: 0,
        size: 10,
        current: 1,
        layout:'prev, pager, next, total',
        pageSize:[10, 20, 50, 100],
        className:["account-bottom"]
      },
      levelSelectList:[],
      levelSelectListCount:0,
      num: 0
    };
  },
  created() {
    var that = this;
    that.getDataList();
  },
  mounted() {
    var that = this;
    that.getTypeList();
    //Set a fixed height when mounting the interface

    pageConfigApi.getDynamicList().then(res =>{
      that.levelSelectList = res.data.data.items;
      that.levelSelectListCount = 0;
      that.deepList(that.levelSelectList);
    });

    
  },
  
  methods: {

    deepList(list) {
      var that = this;
      list.filter(v => {
        that.levelSelectListCount++
        if (v.childrenNode) {
            that.num++;
            that.$set(v, "level", that.num);
            that.deepList(v.childrenNode);
        }else{
            that.$set(v, "level", (that.num+1)); 
        }
        if(v.componentName){
          that.num = 0;
        }
      });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    getTypeList(){
      //apiRequestList(this,pageConfigApi,'getDynamicList','','','i18n_questionName','questionName',{},['allQuestionTypeList','selectQuestionTypeList']);
    },


    queryList(){
      this.current = 1;
      this.getDataList();
    },

    getDataList() {
      var that = this;
      that.tableData = [];
      apiRequestTable(that,pageConfigApi,'getDynamicListPaging','',function (res) {
        that.tableData = res.items;
        that.pageAttribute.current = parseInt(res.current);
        that.pageAttribute.size = res.size;
        that.pageAttribute.total = res.total;
      },that.searchForm,that.pageAttribute.current,that.pageAttribute.size);
    },

    handleSizeChange(val) {
      this.pageAttribute.size = val;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.pageAttribute.current = val;
      this.getDataList();
    },


    resetForm(ref) {
      if (this.editMethodUser == 0) {//Add
        var resetForm = getVueComponent(this,'$children','$refs',ref);
        resetForm.resetFields();
        this.paramsData.referenceName = '';
        //Clearing existing data
        this.paramsData = resetObj(this.paramsData);
      }
      this.addContentDialog = false;
      
    },

    handleClose(ref) {
      if (this.editMethodUser == 0) {//Add
        var resetForm = getVueComponent(this,'$children','$refs','formRef');
        resetForm.resetFields();
        this.paramsData.referenceName = '';
      }
      this.addContentDialog = false;
    },

    addContent() {
      this.editMethodUser = 0;
      this.addContentDialog = true;
      //The data is cleared each time the data is added
      this.paramsData = resetObj(this.paramsData);
    },

    editContent(row) {
      var that = this;
      that.editMethodUser = 1;
      that.addContentDialog = true;
      //Reset paramsData
      _.mergeWith(this.paramsData,row,this.customizer);
      that.referenceName = row.referenceName;
      that.moduleFileIdList = [];
    },

    submitForm(formName) {
      var that = this;
      var resetForm = getVueComponent(that,'$children','$refs',formName);

      resetForm.validate((valid) => {
        if(valid){
            that.paramsData.count = that.levelSelectListCount;
            apiRequestParams(that,pageConfigApi,'operationDynamicList',that.paramsData,function (e) {
              if(e.code == 200){
                that.operationSuccess();
              }else {
                that.addContentDialog = false; 
              }
            })
        }else{
          return false;
        }
      });
    },

    operationSuccess(){
      this.addContentDialog = false;
      this.getDataList();
    },

    //Delete/batch delete usage
    delHandle(row) {
      var that = this;
      deleteApiRequest(that,row ? row.id : '',sysUse,'deleteHelpList',function () {
          that.getDataList();
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

