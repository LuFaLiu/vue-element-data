<template>
    <el-form 
        :model="parentNode.model ? superParams[parentNode.model] : {}" 
        :class="parentNode.class"
        :rules="parentNode.formRule ? superParams[parentNode.formRule] : {}"
        :label-width="parentNode.labelWidth  || ''"
        :ref="parentNode.refName  || ''"
        :label-position="parentNode.labelPosition || 'right'"
    >
        <component v-for="(item,index) in parentNode.childrenNode" :key="index" :parentNode="item" :is="item.componentName"  />
    </el-form>    
</template>
<script>
import elContainer from '@/components/Page/elContainer';
import elFormItem from '@/components/Page/elFormItem';
export default{
    inject: ['superParams'],
    components:{
        elContainer,
        elFormItem
    },
    props:{
        parentNode:{
            type:Object,
            require:true
        }
    },
    watch:{
      "$i18n.locale": function () {
            if(this.parentNode.refName){
                this.$refs[this.parentNode.refName].fields.forEach(item => {
                    if(item.validateState === 'error'){
                        this.$refs[this.parentNode.refName].validateField(item.labelFor)
                    }
                })
            }
        }
    }
}
</script>
