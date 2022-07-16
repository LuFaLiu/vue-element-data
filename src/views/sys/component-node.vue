<script type="text/jsx">
import { filteri18n, dynamicvModel } from '@/utils/index'
export default {
    inject: ['superParams'],
    props:{
        node:{
            type:Object
        }
    },
    render(h){
        const parent = this.$parent;
        const node = parent.appParams.pageData;
        if(!!node){
            this.deepChildrenComponent(node,h)
            return h(
                node.componentName,
                {
                    'class': node.class,
                    props:node,
                },
                this.deepChildrenComponent(node,h)
            )
            
        }
    },
    data(){
        return {
            domList:[]
        }
    },
    mounted(){
        //console.log(this.node);
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
    methods:{
        filteri18n,
        deepChildrenComponent(node,h){
           var that = this;
           return node.childrenNode.map(function (item) {
                //console.log(item.componentName);
                return h(
                    item.componentName == 'elContainer' ? 'div' : item.componentName,
                    {
                        'class':item.class,
                        props: 
                            item.componentName == 'elPagination' ? 
                            {
                                layout:item.layout,
                                'page-sizes':item.pageSize,
                                'current-page': that.superParams[item.params]['current'],
                                'page-size':that.superParams[item.params]['size'],
                                total:that.superParams[item.params]['total'],
                                ref:item.refName || '',
                            } : item.componentName == 'elForm' ? 
                            {
                                model:item.model ? that.superParams[item.model] : {},
                                class:item.class,
                                rules:item.formRule ? that.superParams[item.formRule] : {},
                                'label-width':item.labelWidth  || '',
                                ref:item.refName  || '',
                                'label-position':item.labelPosition || 'right',
                            } : item.componentName == 'elFormItem' ? 
                            {
                                label:that.$t(item.label),
                                prop:item.prop
                            } : item.componentName == 'elButton' ? 
                            {
                                type:item.btnType || '',
                                icon:item.icon,
                                class:item.class,
                                disabled:item.btnCondition ? (that.getValue() ? true : false) : false,
                                loading:item.loading ? that.superParams.btnLoading : false
                            } : item.componentName == 'elInput' ? 
                            {
                                type:item.inputType,
                                //'v-model':that.vModelVal(item),
                                domProps: {
                                    value: that.vModelVal(item)
                                },
                                on: {
                                    input: function (event) {
                                        that.$emit('input', event.target.value)
                                    }
                                },
                                placeholder:that.filteri18n(item.placeholder) || '',
                                disabled:item.inputCondition ? (that.superParams[item.inputCondition] ? true : false) : item.disabled,
                                clearable:true
                            }
                            : item,  
                    },
                    //item.childrenNode ? that.deepChildrenComponent(item,h) : that.$slots.default()
                    item.childrenNode.length > 0  
                        ? that.deepChildrenComponent(item,h) 
                            : item.componentName == 'elButton' 
                                ? [h('span',that.filteri18n(item.title))] 
                                    : [h('h1','13456')]
                )
           })
        },
        getValue(){
            if(_.get(this.rowData, this.parentNode.btnCondition)){
                return false;
            }else{
                return true;
            }
        },
        vModelVal(item){
            console.log(item);
            return dynamicvModel(this.superParams,item.vModel,'','get');
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "~@/styles/component.scss";
</style>
