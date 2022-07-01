<template>
    <el-input type="text" v-model="modelObj[vModelName]" :placeholder="filteri18n(placeholder)"></el-input>
</template>
<script>
import { filteri18n } from '@/utils/index'
export default{
    inject: ['superParams'],
    props:{
        vModelName:{
            type:String
        },
        modelObj:{
            type:Object
        },
        placeholder:{
            type:Array
        }
    },
    methods:{
        filteri18n
    }
}
</script>
