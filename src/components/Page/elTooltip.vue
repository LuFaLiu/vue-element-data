<template>
    <el-tooltip
        class="item"
        effect="dark"
        :content="$t('form.add') + $t('form.descModule')"
        placement="right"
        >
        <component v-for="(item,index) in parentNode.childrenNode" :key="index" :parentNode="item" :is="item.componentName" />
    </el-tooltip>      
</template>
<script>
import elButton from './elButton'
export default {
    components:{
        elButton
    },
    inject: ['superParams'],
    props:{
        parentNode:{
            type:Object
        }
    }
}
</script>