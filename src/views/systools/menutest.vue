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
  data(){
    return {
        elform:{
          model:{},
          rules:{},
        },
        elformitem:{
          rules:{}
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
          value:12
        },
    }
  }
}
</script>
<style lang="scss" scoped>

</style>