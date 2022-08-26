export default {
    props:{
        componentName:{
            type:String
        },
        attribute:{
            type:Object
        }
    },
    name:'CustomContent',
    render(h){
        return h(
            this.componentName,
            this.attribute,
            this.attribute.text ? [h('span',this.attribute.text)] : that.$slots.default
        )
    },
    methods:{
        deepChildrenComponent(node,h){
            var that = this;
            return node && node.childrenNode.length > 0 && node.childrenNode.map(function (item) {
                return h(
                    item.componentName,
                    item.attribute,
                    item && item.childrenNode && item.childrenNode.length > 0 ? that.deepChildrenComponent(item,h) : that.$slots.default
                )
            })
         },
    }

}