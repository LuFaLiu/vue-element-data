export default {
    inject: ['superParams'],
    props:{
        attributeName:{
            type:String
        }
    },
    name:'CustomContent',
    render(h){
        console.log(this.attributeName);
        console.log(this.superParams.customcontent[this.attributeName]);
        const node = this.superParams.customcontent[this.attributeName];
        console.log(node);
        console.log(node.tag == 'img' ? node.props.src : '');
        console.log(Boolean(this.superParams[node.condition]));
        return h(
            node.condition ? (Boolean(this.superParams[node.condition]) == node.conditionVal && node.tag)  : node.tag,
            {
               class:node.class,
               props:{
                slot:node.props && node.props.slot || '',
               },
               attrs: {
                src:node.props && node.props.src || '',
               },
            },
            node.text ? [h('span',node.text)] : node.childrenNode && node.childrenNode.length > 0 ? this.deepChildrenComponent(node,h) : this.$slots.default
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
        }
    }

}