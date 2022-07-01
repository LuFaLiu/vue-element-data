<template>
  <el-row :gutter="20">
    <el-col class="div-inline" :span="18">
      <global-analysis ref="globalData" v-if="userDetails.register7Day !== undefined" :user-details="userDetails" />
    </el-col>
    <el-col :span="6" class="globalAnalysisRight" v-if="!!userDetails.weekOfIncreaseTop && !!userDetails.registerToday">
      <el-row>
        <el-col :span="24">
          <div class="grid-right bg-purple userData" align="center">
            <div class="dataCout_title">{{this.$t('homePage.regionalGrowth')}}</div>
            <div v-for="(o,index) in userDetails.weekOfIncreaseTop" :key="index" class="regionalGrowth">
              <div class="regionalGrowth_name"> 
                <div class="regionalGrowth_country"> {{ o.country }}</div>
                <el-image class="countryTypeImage" v-if="countryTypeMethod(o.country)" :src="require('@/icons/flagIcon/'+countryTypeMethod(o.country)+'.svg')"></el-image>
                <div v-else class="countryTypeDefault"></div>
              </div>             
              <div class="regionalGrowth_count">{{ o.count }}</div>
              <el-image class="regionalGrowth_image_top" :src="require('@/static/icon/growth_'+(index+1)+'.png')" />
              <br>
            </div>
            <br>
          </div>
          <div class="grid-right bg-purple userData registeredUsers" align="center">
            <div class="dataCout_title"> {{this.$t('homePage.registeredUsers')}}：<div class="dataCout_num">{{registerTodayLength}}+</div></div>
            <div v-for="o in userDetails.registerToday" :key="o.index" class="regionalGrowth regionalGrowth_registered">
              <div class="regionalGrowth_userNum">
                <el-image class="countryTypeImage_user" v-if="countryTypeMethod(o.country)" :src="require('@/icons/flagIcon/'+countryTypeMethod(o.country)+'.svg')"></el-image>
                <div v-else class="countryTypeDefault"></div>
              </div>
              <div class="regionalGrowth_name">{{ o.nickName }}</div>
              <div class="regionalGrowth_count">{{  o.createdTime | formatDate}}</div>
              <br>
            </div>
            <br>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import userManageApi from '@/api/userManageApi'
import globalAnalysis from '@/components/home/global-analysis'
import authApi from '@/api/authApi'
import LangFlag from 'vue-lang-code-flags'
import {countryList} from '@/utils/allCountry.js';
import {countryNameList} from '@/utils/countryName.js';
import LoginVue from './Login.vue'

export default {
  name: 'Index',
  components: {
    'lang-flag':LangFlag,
    'global-analysis': globalAnalysis
  },
  data() {
    return {
      registerTodayLength:0,
      registerToday:[],
      userDetails: {
        globalUserPercent: []
      }
    }
  },
  watch:{
    '$i18n.locale':function (val) {
      this.getHomeInfoMethod();
    }
  },
  created() {
    this.getHomeInfoMethod();
  },
  methods: {
    getHomeInfoMethod(){
      authApi.getHomeInfo().then(res => {
        res.data.data.weekOfIncreaseTop = _.sortBy(res.data.data.weekOfIncreaseTop, 'user', function(o) {
          return parseInt(10 - o.count);
        });
        this.$set(this, "userDetails", res.data.data); //Update child components in real time
        this.registerTodayLength = res.data.data.registerToday.length;
        this.registerToday = res.data.data.registerToday.filter(v=>{
          return v.createdTime = this.$formatDate(v.createdTime);
        })
      })
    },
    countryTypeMethod(name){
      var countryFlag = this.getEnName(name);
      return countryFlag ? countryFlag.toLowerCase() : ''; 
    },

    getEnName(name){
      let countryTypeName;
      var lang = ''; 
      if(this.$i18n.locale == 'zh'){
        lang = /[^\u4e00-\u9fa5]/gi;
      }else{
        lang = /[^a-zA-Z]/g;
      }
      countryNameList.forEach(v=>{ 
        if(v.replace(lang,'') == name){
          const countryType = v.split('-')[1].replace(/\s*/g,""); 
          countryTypeName = this.relaceName(countryType);
        }else {
          return '';
        }
      })
      return countryTypeName;
    },
    //relaceName(name){
    relaceName(areaCode){
      return (
        countryList.find(function (item) {
          if(item.dialCode){
            return item.dialCode.replace("+","").replace(/\s*/g,"") === areaCode;
          }
        }) || {}
      ).code;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/index-common";

.div-inline{
  position: relative; 
  z-index: 1;
}

.flag-icon{
  width: 30px;
  height: 30px;
}

.countryTypeDefault{
  margin-left:10px;
  width: 30px!important;
  height: 23px!important;
  background: rgb(204,204,204);
}

.countryTypeImage{
  margin-left: 10px;
  width: 30px;
  height: 23px;
  box-shadow: 0 0 3px #DDDDDD;
}

.globalAnalysisRight{
  float: left;
  .userData{
    padding: 17px 20px 28px 20px;
    min-height: 430px;
  }
  .regionalGrowth{
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .regionalGrowth_name{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      .regionalGrowth_country{
        width: 65px;
        font-size: 15px;
        height: 20px;
        line-height: 20px;
      }
      .el-image__inner{
        margin-left: 10px;
        width: 40px!important;
        height: 27px!important;
      }
    }
    .regionalGrowth_count{
      flex: 2;
      font-size: 12px;
      text-align: center;
    }
    .regionalGrowth_image_top{
      width: 34px;
      height: 34px;
    }
  }

    .count_order{
        position: relative;
        .order_num{
          position: absolute;
          top: 8px;
          left: 13px;
          font-size: 9px;
          color: #FFFFFF;
        }
    }


  .registeredUsers{
    margin-top: 20px;
    min-height: 566px;
    .dataCout_title{
      display: flex;
      align-items: center;
    }
    .dataCout_num{
      font-size: 20px;
      font-weight: 600;
      color: #336FF6;
      text-indent: 0;
    }
    .countryTypeDefault{
      margin: 0;
      width: 33px;
      height: 20px;
    }
    .countryTypeImage{
      margin: 0;
      width: 40px;
      height: 27px;
    }
    .regionalGrowth_count{
      flex: none;
      text-align: right;
    }
    .regionalGrowth{
      justify-content: space-between;
    }
    
    .regionalGrowth_name{
      flex: 3;
    }
    
  }

  .regionalGrowth_registered{
    margin-top: 22px;

    .regionalGrowth_userNum{
      display: flex;
      align-items: center;
      justify-content: center;
      .countryTypeImage_user{
        margin: 0;
        padding: 0;
        width: 30px;
        height: 22px;
        box-shadow: 0 0 3px #DDDDDD;
      }

    }
  }

  

  
}
</style>
