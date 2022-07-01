<template>
    <div>
        <el-form-item 
            v-if="!parentNode.dynamicForm && !parentNode.componentSlot && (parentNode.elFormItemCondition ? superParams[parentNode.elFormItemCondition] == 0 : true)"
            :label="$t(parentNode.label)" 
            :prop="parentNode.prop"
        >
            <component v-for="(item,index) in parentNode.childrenNode" :key="index" :parentNode="item" :is="item.componentName" />
        </el-form-item>

        <div class="dynamicForm" v-else-if="parentNode.dynamicForm == true">
            <el-form-item
                v-for="(lampId, index) in superParams[parentNode.paramsName][parentNode.vModel]"
                :label="$t(parentNode.label) + (index+1)"
                :key="index"
                :style="superParams[parentNode.paramsName][parentNode.vModel].length == 1 ? {width:'100%'} : {width:'50%'}"
            >
                <formInput :vModelName="'value'" :modelObj="lampId" :placeholder="parentNode.placeholder" />
                <formButton :eventName="parentNode.event" :params="lampId"  />
            </el-form-item>
        </div>

        <div v-else-if="parentNode.componentSlot">
            <component
                v-for="(item, index) in superParams[parentNode.componentListName]"
                :ref="parentNode.ref"
                :key="index"
                :lang="$t(parentNode.label)"
                :is="item.name"
                :data="item"
                v-on:deleteCurrentMoule="deleteModule"
            />
        </div>
        
    </div>
</template>
<script>
import { filteri18n } from '@/utils/index'
import elInput from './elInput'
import elUpload from './elUpload'
import elButton from './elButton'
import elSelect from './elSelect'
import elLevelSelect from './elLevelSelect'
import elTooltip from './elTooltip'
import elRadioGroup from './elRadioGroup'
import moduleUpload from "@/components/module/moduleUpload"
import formInput from './dynamicForm/formInput'
import formButton from './dynamicForm/formButton'
export default{
    inject: ['superParams'],
    components:{
        elInput,
        elUpload,
        elButton,
        elSelect,
        elLevelSelect,
        elTooltip,
        elRadioGroup,
        moduleUpload,
        formInput,
        formButton
    },
    props:{
        parentNode:{
            type:Object,
            require:true
        }
    },
    methods: {
        filteri18n,
        deleteModule(e){
            this.superParams[this.parentNode.event](e);
        },
        removeDynamicFormParams(eventName,val){
            this.superParams[eventName](val);
        }
    }
}
</script>
<style lang="scss" scoped>
    .dynamicForm{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        ::v-deep{
            .el-input{
                width: 50%;
            }
            .el-button{
                margin-left: 4%;
            }
            .el-form-item__content{
                display: flex;
            }
        }
    }
</style>
