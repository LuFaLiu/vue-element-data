<template>
  <div style="height: 100%">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col class="row-bg-left" :xl="6" :lg="7">
        {{$t('login.logPlatform')}}
      </el-col>
      <el-col class="row-bg-right" :xl="6" :lg="7">
        <div align="center">
          <h3 class="title">{{$t('login.welcomeLogin')}}</h3>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" auto-complete="on">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" tabindex="1" auto-complete="on" :placeholder="$t('placeholder.pleaseEnter')+$t('form.account')" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" tabindex="2" auto-complete="on" :placeholder="$t('placeholder.pleaseEnter')+$t('form.passWord')" v-model="loginForm.password" type="password" show-password @keyup.enter.native="submitForm('loginForm')" />
          </el-form-item>

          <el-form-item>
            <el-button class="loginFormClass" type="primary" @click.native.prevent="submitForm('loginForm')">{{$t('login.login')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script>

import userApi from '@/api/sysUserApi'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      rules: {
        username: [
          { required: true, message: this.$t('placeholder.pleaseEnter')+this.$t('form.account'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('placeholder.pleaseEnter')+this.$t('form.passWord'), trigger: 'blur' }
        ]
      },
      captchaImg: null
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userApi.login(this.loginForm).then(res => {
            this.$store.commit('SET_TOKEN', res.data.data.token);
            this.$router.push('/index');
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
    
  }
}
</script>

<style lang="scss" scoped>

	.el-row {
    background-color: #1A1A1D;
		height: 100%;
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
	}

	.el-divider {
		height: 200px;
	}

	.captchaImg {
    width: 30%;
		float: left;
		margin-left: 11px;
		border-radius: 6px;
    background: #C9C9C9;
	}

  .row-bg-left{
    color: #FFFFFF;
    font-size: 30px;
    height: 600px;
    background: #2E2B2B;
    display: flex;
    align-items: center;
    justify-content: center;
     box-shadow: 1px 1px 10px #252627;
  }

  .row-bg-right{
    padding: 50px 57px 0 57px;
    height: 600px;
    background-color: #FFFFFF;
     box-shadow: 1px 1px 10px #252627;
    .title{
      font-size: 28px;
      font-weight: 400;
      color: #252627;
      margin: 0;
      padding: 0;
    }
  }

  .el-form{
    margin-top: 67px;
  }

  ::v-deep{
    .el-input{
      .el-input__prefix{
        .el-input__icon:before{
          content: "";
          background-size: 100% 100%;
          background-repeat: no-repeat;
          left: 0;
          width: 30px;
          position: absolute;
          height: 30px;
          top: 15%;
        }

        .el-icon-user:before{
          background-image:url(../static/icon/login_user.png);
          
        }

        .el-icon-lock:before{
          background-image:url(../static/icon/login_password.png);
        }

        .el-icon-suitcase:before{
          background-image:url(../static/icon/login_code.png);
        }
      }
    }

    .el-input--prefix .el-input__inner{
      border: transparent;
      border-bottom: 1px solid #CCCCCC;
      padding-left: 45px;
      border-radius: 0%;
      height: 46px;
      line-height: 46px;
    }

    .loginFormClass{
      margin-top: 55px;
      width: 100%;
      height: 56px;
      background: #336FF6;
      border-radius: 6px;
      font-size: 17px;
      font-weight: 400;
      line-height: 0px;
      color: #FFFFFF;
      &:hover,&:focus{
        background: #336FF6;
      }

    }



  }
  
  
  

</style>
