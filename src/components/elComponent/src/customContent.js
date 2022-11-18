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
            console.log(node);
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
            }else if (node.type == 'elImageTraverse'){
                return (
                    <div>
                        {
                            node.fits.map((v,index) =>
                                <div style={node.style} key={index}>
                                    <span style="display: block;color: #8492a6;font-size: 14px;margin-bottom: 20px;">{ v }</span>
                                    <el-image style="width: 100px; height: 100px" src={node.url} fit={v}></el-image>
                                </div> 
                            )
                        }
                    </div>
                )
            } else {

                return h(
                    node.condition ? (Boolean(this.superParams[node.condition]) == node.conditionVal && node.tag)  : node.tag,
                    {
                        class:node.class || '',
                        style:node.style || {},
                        props:node.props ? node.props : {
                            slot:node.props && node.props.slot || '',
                        },
                        attrs: {
                            src:node.props && node.props.src || '',
                        },
                        domProps: node.domProps || '',
                        directives: node.directives || '',
                        slot: node.slot || '',
                        ref: node.refName || '',
                    },
                    node.text 
                        ? [h('span',node.text)] : node.childrenNode && node.childrenNode.length > 0 ? this.deepChildrenComponent(node,h) : this.$slots.default
                )
            }
        }
    },
    methods:{
        deepChildrenComponent(nodeList,h){
            var that = this;
            return nodeList && nodeList.childrenNode.length > 0 && nodeList.childrenNode.map(function (item) {
                return h(
                    
                    //版本一
                    /*
                    item.componentName,
                    item.attribute,
                    item && item.childrenNode && item.childrenNode.length > 0 ? that.deepChildrenComponent(item,h) : that.$slots.default
                    */
                    //版本二
                    item.condition ? (Boolean(this.superParams[item.condition]) == item.conditionVal && item.tag)  : item.tag,
                    {
                        class:item.class || '',
                        style:item.style || {},
                        props:item.props ? item.props : {
                            slot:item.props && item.props.slot || '',
                        },
                        attrs: {
                            src:item.props && item.props.src || '',
                        },
                        domProps: item.domProps || '',
                        directives: item.directives || '',
                        slot: item.slot || '',
                        ref: item.refName || '',
                        
                    },
                    item.text 
                        ? [h('span',item.text)] : item.childrenNode && item.childrenNode.length > 0 ? that.deepChildrenComponent(item,h) : that.$slots.default
                )
            })
        }
    }

}