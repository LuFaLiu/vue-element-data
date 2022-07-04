<template>
  <el-menu
    :default-active="editableTabsValue"
    class="el-menu-vertical-demo"
    background-color="#2E2B2B"
    text-color="#FFFFFF"
    active-text-color="#0091FF"
  >

    <router-link to="/index">
      <el-menu-item index="Index" @click="selectMenu({name: 'Index', title: 'Home'})">
        <template slot="title">
          <!--<i class="el-icon-s-home" />-->
          <i class="font_family icon-home"></i>
          <span slot="title">{{ $t('sideMenu.home') }}</span>
        </template>
      </el-menu-item>
    </router-link>

    <el-submenu v-for="menu in menuList" :key="menu.key" :index="menu.name">
      <template slot="title">
        <i class="font_family"  :class="menu.icon" />
        <span>{{ $t(menu.title) }}</span>
      </template>

      <router-link v-for="item in menu.children" :key="item.key" :to="item.path">
        <el-menu-item :index="item.name" @click="selectMenu(item)">
          <template slot="title">
            <i class="font_family" :class="item.icon" />
            <span slot="title">{{ $t(item.title) }}</span>
          </template>
        </el-menu-item>
      </router-link>

    </el-submenu>

  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  name: 'SideMenu',
  data() {
    return {
      routerList:[]
    }
  },
  computed: {
    ...mapGetters(['menuList', 'editableTabsValue'])
  },
  watch:{
    '$route':function (val) {
      if (val.path != '/login' && val.path != '/index') {
        var routeList = val.name.split(':');
        var currentRouteType = routeList[0] + ':' + routeList[1] + ':list';
        var currentRouterList = this.$router.options.routes[0].children;
        var tab = _.filter(currentRouterList,['name',currentRouteType]); 
        if(tab.length > 0){ 
          this.$store.commit('addTab', tab[0]);
        }
      }
    }
  },
  methods: {
    selectMenu(item) {
      this.$store.commit('addTab', item);
    }
  }
}
</script>

<style lang="scss" scoped>

  a{
    text-decoration: none;
  }

  .el-menu-vertical-demo {
    height: 100%;
  }
  .el-menu{
    border-right: 0px!important;
    span{
      margin-left: 4px;
    }
  }
  .el-aside::-webkit-scrollbar{
    width: 6px!important;
    height: 6px!important;
  }
  .el-aside::-webkit-scrollbar-thumb{
    border-radius: 10px!important;
    background-color: #0091FF!important;
  }
</style>