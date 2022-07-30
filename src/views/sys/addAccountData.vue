<template>
    <el-row class="addAccount">
        <div class="dataCout_title">{{$t('form.add')}}{{$t('form.account')}}</div>
        <div class="addAccount_title">{{$t('form.personalData')}}</div>
        <el-col :span="5">
            <elComponent v-if="appParams.pageData" :node="appParams.pageData" :route="$route.name" />
        </el-col>
    </el-row>
    
</template>
<script>
  import userManageApi from '@/api/userManageApi'
  import { getVueComponent } from '@/utils/index'
  import elComponent from '@/components/elComponent/index'
  var moment = require('moment');
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
      const checkPhoneNumber = (rule, value, callback) => {
        const reg = /^1[3|4|5|6|7|8|9]\d{9}$/; 
        if (!this.phoneParams) {
          var tip = this.$t('placeholder.pleaseEnter') + this.$t('form.phone');
          return callback(new Error(tip))
        } else if (!reg.test(this.phoneParams)) {
          var tip = this.$t('tip.formatPhone')
          return callback(new Error(tip))
        }else{
          callback()
        }
      }
      const validateNickName = ((rule,value,callback)=>{
        if(!value){
          const tip = this.$t('placeholder.pleaseEnter') + this.$t('form.name');
          return callback(new Error(tip))
        }
      })
      const validatePassword = (rule,value,callback) =>{
        if(!value){
          const tip = this.$t('placeholder.pleaseEnter') + this.$t('form.passWord');
          return callback(new Error(tip));
        }
      }
      const validateSex = (rule,value,callback) =>{
        if(!value){
          const tip = this.$t('placeholder.pleaseSelect') + this.$t('form.sex');
          return callback(new Error(tip));
        }
      }

      const validateEmail = (rule,value,callback) =>{
        const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; 
        if (!value) {
          var tip = this.$t('placeholder.pleaseEnter') + this.$t('form.email');
          return callback(new Error(tip))
        } else if (!reg.test(value)) {
          var tip = this.$t('tip.formatEmail')
          return callback(new Error(tip))
        }else{
          callback()
        }
      }

      return {
        value: 86,
        ruleForm: {
          id:Date.now(),
          email: "",
          username:"",
          nickName: "",
          phone: null,
          password:"123456",
          roleId: "",
          sex: 3,
          department: ""
        },
        radioList:[
          {
            lable:1,
            name:'pageRule.men'
          },
          {
            lable:2,
            name:'pageRule.women'
          },
          {
            lable:3,
            name:'pageRule.secret'
          }
        ],
        phoneParams:'',
        rules: {
          nickName: [
            { required: true,validator:validateNickName, trigger: 'blur' }
          ],
          password: [
            { required: true, validator:validatePassword, trigger: 'blur' },
          ],
          sex: [
            { required: true, validator:validateSex, trigger: 'change' }
          ],
          phone:[
            { required: true,validator:checkPhoneNumber, trigger: 'blur'},
          ],
          email: [
            { required: true, validator:validateEmail, trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        var resetForm = getVueComponent(this,'$children','$refs',formName);
        resetForm.validate((valid) => {
          if (valid) {
            this.ruleForm.created = moment().format(); 
            this.ruleForm.username = this.phoneParams;
            this.ruleForm.phone = this.phoneParams;
            userManageApi.saveUser(this.ruleForm).then(res => {
              this.$message({
                showClose: true,
                message: this.$t('tip.success'),
                type: 'success',
                duration:500,
                onClose: () => {
                  this.$router.go(-1)
                }
              })
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="scss" scoped>
    .addAccount{
        padding: 20px;
        border-radius: 8px;
        background: #FFFFFF;
       .addAccount_title{
            font-size: 18px;
            font-weight: 500;
            color: #336FF6;
            margin: 34px 0 30px 0;
       }
       ::v-deep{
            .el-select{
              width: 100%;
            }
           .el-form-item{
               margin-bottom: 30px;
           }
           .mic-btn-primary{
               width: 80%;
               margin-top: 20px;
               margin-bottom: 15px;
           }
           .el-form-item__label{
               line-height: 20px;
           }

           .el-radio-button__orig-radio:checked+.el-radio-button__inner{
               background-color: #336FF6;
               border-color: #336FF6;
           }

       }
    }
    
</style>
