<!--
<template>
    
    <div>
        <div class="compontent-parent">
            <component-node :node="node" />
        </div>
    </div>
</template>
-->
<script type="jsx">
export default {
    name:'componentNode',
    componentName:'compontentNode',
    props:{
        node:{}
    },
    render(h){
        const parent = this.$parent;
        const node = parent.appParams.pageData
        //console.log(parent);
        if(!!node){
            /*
            return h(
                'div',
                this.deepChildrenComponent(node.childrenNode,h)
            )
            */
            return h(
                'div',
                this.deepChildrenComponent(node.childrenNode,h)
            )
        }
    },
    data(){
        return {
            domList:[]
        }
    },
    methods:{
        deepChildrenComponent(node,h,dom = []){
            /*
            var that = this;
            return node.map(function (v) {
                return h(v.componentName,'template');
            })
            */

            var that = this;
            return node.map(function (v) {
                console.log(v);
                dom.push(h('div','template'))
                if(v.childrenNode){
                    return that.deepChildrenComponent(v.childrenNode,h,[]);
                }else {
                    return h;
                }
            })
            

            //return h('div',[ h('h1',[ h("I'm a template!") ] ) ])

        }
    }
}
</script>
