<template>
    <el-button
        v-if="!parentNode.btnFormConditon"
        :type="parentNode.btnType || ''"
        :icon="parentNode.icon"
        :class="parentNode.class"
        @click="btnClick"
        :disabled="parentNode.btnCondition ? (getValue() ? true : false) : false"
        :loading="parentNode.loading ? superParams.btnLoading : false"
    >
        {{ filteri18n(parentNode.title) }}
    </el-button>
</template>
<script>
    import _ from "lodash";
    import { filteri18n } from '@/utils/index'
    export default{
        inject: ['superParams'],
        props:{
            parentNode:{
                type:Object
            },
            rowData:{
                type:Object
            }
        },
        methods:{
            filteri18n,
            getValue(){
                if(_.get(this.rowData, this.parentNode.btnCondition)){
                    return false;
                }else{
                    return true;
                }
            },
            btnClick(){
                if(this.parentNode.params){
                    this.superParams[this.parentNode.event](this.parentNode.paramsName);
                }else if(this.parentNode.tableParams){
                    this.superParams[this.parentNode.event](this.rowData);  
                } else{
                    this.superParams[this.parentNode.event]();  
                }
                
            }
        }
    }
</script>
<style lang="scss" scoped>

    .editBtn {
        color: #336ff6 !important;
    }

    .delBtn{
        color: #ff0000 !important;
        margin-left: 20px;
    }

    .dialog-footer {
        .el-button {
            padding: 10px 32px;
            border-radius: 5px;
        }
    }

    .addAccountBtn {
        background: #20d4b1;
    }
    .el-button {
        color: #ffffff;
        border: none;
        border-radius: 5px;
    }
    .searchAccount {
        width: 150px;
    }
    .el-button--default{
        border: 1px solid #336FF6;
        color: #336FF6;
    }

    .el-button--default:hover{
        border: 1px solid #336FF6;
        background-color: transparent;
        color: #336FF6;
    }

    .el-button--primary,.el-button--primary:hover{
        color: #FFFFFF!important;
        background: #336FF6!important;
        border: 1px solid #336FF6!important;
    }

    .el-button--default{
        border: 1px solid #336FF6;
        color: #336FF6;
    }

    .el-button--default:hover{
        border: 1px solid #336FF6;
        background-color: transparent;
        color: #336FF6;
    }

    .el-button--primary,.el-button--primary:hover{
        color: #FFFFFF!important;
        background: #336FF6!important;
        border: 1px solid #336FF6!important;
    }
</style>