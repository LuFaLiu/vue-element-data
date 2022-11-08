export default {
    inject: ['superParams'],
    props:{
        attributeName:{
            type:String
        }
    },
    name:'CustomContent',
    render(h){
        //console.log(this.attributeName);
        //console.log(this.superParams.customcontent[this.attributeName]);
        const node = this.superParams.customcontent[this.attributeName];
        if(node){
            //console.log(node);
            //console.log(node.tag == 'img' ? node.props.src : '');
            //console.log(Boolean(this.superParams[node.condition]));
            if(node.list && node.list.length > 0){
                return (
                    <div>
                        {
                            node.list.map((v,index) => <li style={node.style} key={index} class={node.class} >{v.label}</li>)
                        }
                    </div>
                );
            }else {
                return h(
                    node.condition ? (Boolean(this.superParams[node.condition]) == node.conditionVal && node.tag)  : node.tag,
                    {
                        class:node.class || '',
                        style:node.style || {},
                        props:{
                            slot:node.props && node.props.slot || '',
                        },
                        attrs: {
                            src:node.props && node.props.src || '',
                        },
                        directives: node.directives || ''
                    },
                    node.text 
                        ? [h('span',node.text)] : node.childrenNode && node.childrenNode.length > 0 ? this.deepChildrenComponent(node,h) : this.$slots.default
                )
            }
        }
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