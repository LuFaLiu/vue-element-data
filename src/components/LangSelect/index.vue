<template>
  <div>
    <el-dropdown trigger="click" @command="handleSetLanguage">
      <div class="lang" :class="showLangClass(language)">
        <span>{{ language === 'en' ? 'English' : '中文' }}</span>
        <i class="el-icon-caret-bottom avatar-icon" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['language'])
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch('setLanguage', lang);
      this.$message.success(this.$t('languageSelect.switchLanguage'))
    },
    showLangClass(language) {
      //console.log(language)
    }
  }
}
</script>

<style lang="scss" scoped>
  .lang{
    cursor: pointer;
  }
  .logo{
    height: 100%;
  }

  .mr-1 {
    margin-right: 10%;
  }

  .avatar-icon {
    margin-top: -5%;
  }

  .el-dropdown{
    color: #FFFFFF;
  }

  .navbar {
    //height: 60px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;
        cursor: pointer;

        .avatar-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 5px;
          position: relative;

          .user-avatar {
            margin-right: 5px;
            width: 40px;
            height: 40px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }

          .international{
            vertical-align: top;
          }

          .right-menu-item {
            display: inline-block;
            margin: 0 8px;
          }
        }
      }
    }
  }
</style>
