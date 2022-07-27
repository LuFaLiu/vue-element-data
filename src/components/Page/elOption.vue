<template>
    <div :style="{ 'text-indent':(node.level * 20) + 'px' }">
        <el-option :node="node"></el-option>
        <template-list class="123456" v-for="(item,index) in node.childrenNode" :node="item" :key="index" />
    </div>
</template>
<script type="text/jsx">
    export default{
        name:'template-list',
        componentName:'template-list',
        props:{
            node:{
                default() {
                    return {};
                }
            }
        },
        components:{
            ElOption:{
                props:{
                    node:{
                        default() {
                            return {};
                        }
                    }
                },
                render(){
                    const node = this.node;
                    const component = <el-option key={node.id} value={node.id} label={ node.componentName || node.attributeModel } />
                    return (component)
                },
                
                
            }
        }
    }
</script>
<style lang="scss" scoped>
    
</style>
