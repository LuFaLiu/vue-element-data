<template>
    <el-button type="primary" @click.prevent="btnClick">{{$t('form.delete')}}</el-button>
</template>
<script>
export default{
    inject: ['superParams'],
    props:{
        eventName:{
            type:String
        },
        params:{
            type:Object
        }
    },
    methods:{
        btnClick(){
            this.superParams[this.eventName](this.params);
        }
    }
}
</script>
