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
        model:{},
        rules:{},
        autosize:{},
        value:'test'
    }
  }
}
</script>
<style lang="scss" scoped>

</style>