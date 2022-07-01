<template>

  <el-container>
    <el-header>
      <div class="header-title">
        vue-element-data
      </div>
      <div class="header-avatar">
        <lang-select />
        <el-dropdown>
          <div class="el-dropdown-link">
            <div class="dropdowUserName">
              {{ userInfo.nickName }}
            </div>
            <el-avatar size="medium" :src="require('@/assets/avatar.png')" />
          </div>
          <el-dropdown-menu slot="dropdown" class="dropdownClass">
            <el-dropdown-item>
              <i class="font_family icon-user" />
              <router-link :to="{name: 'sys:userpersonal:list'}" class="userCenter">{{ this.$t('navbar.userCenter') }}</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click.native="showChangePasswordDialog">
              <i class="font_family icon-password" />{{ this.$t('navbar.changePassword') }}
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout" class="logout_line">
              <i class="font_family icon-logout" />{{ this.$t('navbar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        
        
      </div>
      <el-dialog :title="this.$t('navbar.changePassword')" :visible.sync="dialogFormVisible" width="27%" top="15%" :show-close="false">
        <el-form :model="passForm" :rules="formRule" ref="passForm">
          <el-form-item :label="this.$t('common.originalPass')" :label-width="formLabelWidth" prop="originalPass">
            <el-input v-model="passForm.originalPass" autocomplete="off" :type="originalPassIcon ? 'password' : ''">
              <i slot="suffix" :style="originalPassIcon ? '' : {'color':'#336FF6'}" class="el-icon-view" @click="originalPassIcon = !originalPassIcon"></i>
            </el-input>
          </el-form-item>
          <el-form-item :label="this.$t('common.newPassword')" :label-width="formLabelWidth" prop="newPassword">
            <el-input v-model="passForm.newPassword" autocomplete="off" :type="newPasswordIcon ? 'password' : ''">
              <i slot="suffix" :style="newPasswordIcon ? '' : {'color':'#336FF6'}" class="el-icon-view" @click="newPasswordIcon = !newPasswordIcon"></i>
            </el-input>
          </el-form-item>
          <el-form-item :label="this.$t('common.checkPass')" :label-width="formLabelWidth" prop="checkPass">
            <el-input v-model="passForm.checkPass" autocomplete="off" :type="checkPassIcon ? 'password' : ''">
              <i slot="suffix" :style="checkPassIcon ? '' : {'color':'#336FF6'}" class="el-icon-view" @click="checkPassIcon = !checkPassIcon"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{this.$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="confirmChange('passForm')">{{this.$t('common.confirm')}}</el-button>
        </div>
      </el-dialog>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideMenu v-on:currentMenu="currentMenuInfo"/>
      </el-aside>
      <el-main>
        <!--<Tabs />-->
        <div>
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from './SideMenu'
import userApi from '@/api/sysUserApi'
import LangSelect from '@/components/LangSelect'

export default {
  name: 'Navbar',
  components: {
    SideMenu,
    LangSelect
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        var tip = this.$t('tip.enterPassword')
        callback(new Error(tip))
      } else if (value !== this.passForm.newPassword) {
        var tip = this.$t('tip.enteredTwiceInconsistent')
        callback(new Error(tip))
      } else {
        callback()
      }
    }
    return {
      userInfo: {
        accountId: '',
        nickName: 'developer',
        avatar: ''
      },
      test:null,
      dialogFormVisible: false,
      passForm: {
        originalPass: '',
        newPassword: '',
        checkPass: ''
      },
      originalPassIcon:true,
      newPasswordIcon:true,
      checkPassIcon:true,
      formRule:{
        originalPass:[
          {required:true,message:this.$t('placeholder.pleaseEnter') + this.$t('common.originalPass'),trigger:'blur'}
        ],
        newPassword:[
          {required:true,message:this.$t('placeholder.pleaseEnter') + this.$t('common.newPassword'),trigger:'blur'},
          { min: 6, max: 12, message:this.$t('placeholder.lengthCharacters'), trigger: 'blur' }
        ],
        checkPass:[
          {required:true,validator: validatePass,trigger:'blur'}
        ]
      },
      formLabelWidth: '130px'
    }
  },
  methods: {
    currentMenuInfo(info){
      //console.log(info);
      this.test = info;
    },
    showChangePasswordDialog(){
      for(var i in this.passForm){
        this.passForm[i] = '';
      }
      let tip = this.$refs['passForm'];
      if(tip){
        tip.clearValidate();
      }
      this.dialogFormVisible = true;
    },
    confirmChange(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          const _this = this
            userApi.updatePass(_this.passForm).then(res => {
              _this.$message({
                showClose: true,
                message: res.data.msg + '请重新登录！',
                type: 'success',
                duration:500,
                onClose: () => {
                  _this.logout();
                }
              })
          })
        }else {
          return false;
        }
      })
    },
    logout() {
      userApi.logout().then(res => {
        sessionStorage.clear()
        sessionStorage.clear()
        this.$store.commit('resetState')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .dropdownClass{
    padding: 5px 0 0 0!important;
    .el-dropdown-menu__item{
      padding: 2px 20px;
    }
  }

  .header-title{
    font-size: 30px;
    color: #FFFFFF;
  }

  

  ::v-deep{

    .el-avatar{
      background-color: transparent!important;
    }

    .el-aside{
      overflow-y: scroll;
      overflow-x: hidden;
      background-color: rgb(46, 43, 43);
      &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
      }

      &::-webkit-scrollbar-thumb {
          border-radius: 3px;
          background-color: #504b4b;
      }
    }

    .userCenter{
      color: #606266;
      &:hover{
        color: #409EFF;
      }
    }

    .el-submenu__icon-arrow{
      transform: rotateZ(-90deg)!important;
    }

    .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
      transform: rotateZ(0deg)!important;
    }
  }

  .logout_line{
    border-top: 1px solid #c1c1c1;
  }
  

	.el-container {
    overflow: hidden;
		padding: 0;
		margin: 0;
		height: 100%;
    background: #F6F7FB;
    background-attachment: fixed;

    .el-header{
      width: 100%;
      height: 74px!important;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 22px!important;
      background-color: #2E2B2B; 
    }

    .header-title{
      width:260px; 
      height: auto;
      border-radius: 10%;
    }
	}

	.header-avatar {
    position: relative;
		float: right;
		width: 260px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

  .header-title {
    float: left;
    width: 210px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .el-dropdown{
    color: #FFFFFF;
  }

  .dropdowUserName{
    margin-right: 10px;
    color: #FFFFFF;
  }

	.el-dropdown-link {
    display: flex;
    align-items: center;
		cursor: pointer;
	}
	a {
		text-decoration: none;
	}

  .el-main::-webkit-scrollbar{
    width: 6px;
    height: 6px;
  }
  .el-main::-webkit-scrollbar-thumb{
    border-radius: 6px;
    background-color: #999999;
  }


</style>
