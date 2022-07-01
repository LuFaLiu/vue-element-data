<template>
    <el-select v-model="resetvModel" :multiple="parentNode.multiple ? true : false" :clearable="parentNode.clearable || false" :placeholder="filteri18n(parentNode.placeholder) || ''" :popper-append-to-body="false">
        <template v-if="parentNode.deep"> 
            <template v-for="item in tableData">
                <el-option :key="item.id" :label="item.name" :value="item.id" />
                <template v-for="child in item.children">
                    <el-option :key="child.id" :label="child.name" :value="child.id">
                        <span>{{ "- " + child.name }}</span>
                    </el-option>
                </template>
            </template>
        </template>
        <template v-else>
             <el-option
                v-for="item in superParams[parentNode.elOptionList]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </template>  
    </el-select>
</template>
<script>
    import { filteri18n,dynamicvModel } from '@/utils/index'
    export default{
        inject: ['superParams'],
        props:{
            searchForm:{
                type:Object
            },
            parentNode:{
                type:Object
            }
        },
        computed:{
            resetvModel:{
                get(){
                return dynamicvModel(this.superParams,this.parentNode.vModel,'','get');
                },
                set(val){
                    dynamicvModel(this.superParams,this.parentNode.vModel,val,'set');
                }
            }
        },
        methods: {
            filteri18n,
        }
    }
</script>
<style lang="scss" scoped>

</style>
