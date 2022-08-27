import { dynamicvModel} from '@/utils/index'
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
        return h(
            node.condition ? (this.vModelVal(node.condition) ? node.tag : node.tag ) : node.tag,
            {
               class:node.class,
               props:node.props 
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
        },
        vModelVal(item){
            console.log(item);
            return dynamicvModel(this.superParams,item,'','get');
        },
    }

}