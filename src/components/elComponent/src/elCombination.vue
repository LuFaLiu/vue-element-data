<script type="text/jsx">
import { filteri18n, dynamicvModel } from '@/utils/index'
import Template from './template'
import TraverseTemplate from './traverseTemplate'
export default {
    inject: ['superParams'],
    name: 'ElCombination',
    props:{
        node:{
            type:Object
        }
    },
    render(h){
        const node = this.node;
        if(!!node){
            return h(
                node.componentName,
                {
                    'class': node.class,
                    props: node.componentName == 'elForm' ? 
                            {
                                model:node.model ? this.superParams[node.model] : {},
                                class:node.class,
                                rules:node.formRule ? this.superParams[node.formRule] : {},
                                'label-width':node.labelWidth  || '',
                                'label-position':node.labelPosition || 'right',
                            } : node,
                    ref:node.refName  || '',       
                },
                this.deepChildrenComponent(node,h)
            )
            
        }
    },
    components:{
        Template,
        TraverseTemplate
    },
    data(){
        return {
            domList:[]
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
    methods:{
        filteri18n,
        deepChildrenComponent(node,h){
           var that = this;
           return node.childrenNode.map(function (item) {
                return h(
                    item.componentName == 'elContainer' ? 'div' : item.componentName,
                    {
                        'class':item.class,
                        attrs: {
                            placeholder: item.componentName == 'elInput' && that.filteri18n(item.placeholder) || ''
                        },
                        props: //compontent attribute
                            item.componentName == 'elPagination' ? 
                            {
                                layout:item.layout,
                                'page-sizes':item.pageSize,
                                'current-page': that.superParams[item.params]['current'],
                                'page-size':that.superParams[item.params]['size'],
                                total:that.superParams[item.params]['total'],
                            } : item.componentName == 'elForm' ? 
                            {
                                model:item.model ? that.superParams[item.model] : {},
                                class:item.class,
                                rules:item.formRule ? that.superParams[item.formRule] : {},
                                'label-width':item.labelWidth  || '',
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
                                loading:item.loading ? that.superParams.btnLoading : false,
                            } : item.componentName == 'elInput' ? 
                            {
                                type:item.inputType,
                                value:that.vModelVal(item), //必须值
                                disabled:item.inputCondition ? (that.superParams[item.inputCondition] ? true : false) : item.disabled,
                                clearable:true
                            } : item.componentName == 'elTable' ? 
                            {
                                class:item.class,
                                data:that.superParams[item.tableDataName],
                                'tooltip-effect':item.tooltipEffect,
                                style:[item.style],
                                stripe:item.stripe,
                                height:that.superParams[item.tableHeightName],
                                'default-sort':item.defaultSort,
                                'row-key':item.rowKey && item.rowKey,
                                'default-expand-all':item.defaultExpandAll && item.defaultExpandAll,
                                'tree-prop':item.treeProp,
                            } : item.componentName == 'elTableColumn' ? 
                            {
                                type:item.type,
                                label:that.$t(item.label),
                                width:item.width,
                                align:'center'
                            } 
                            : item,  
                        on:{
                            click:function (e) {
                                switch (item.componentName) {
                                    case "elButton" :
                                        const elButtonParent = that.$parent;
                                        that.btnClick(item);
                                        break;
                                
                                    default:
                                        break;
                                }
                            },
                            'selection-change':function (e) {
                                that.selectChange(e,item);
                            },
                            input: function (event) { //v-model
                                if(typeof event == 'string'){
                                    dynamicvModel(that.superParams,item.vModel,event,'set');
                                }
                            },
                            change:function (event) {
                                if(item.componentName == 'elRadioGroup'){
                                    dynamicvModel(that.superParams,item.vModel,event,'set');
                                }
                            }
                        },
                        ref:item.refName || '',
                        scopedSlots: item.componentName == 'elTableColumn' && item.type !== 'selection' && !item.operation && {
                            default: props => h('Template',{props,item}) //通过单文件组件展示对应的信息(组件需要的一切都是通过 context 参数传递)
                        } || item.componentName == 'elRadioGroup' && { default: props => h('TraverseTemplate',{props:{node:item,parent:that}})  } //非单文件组件
                    },
                    item.childrenNode && item.childrenNode.length > 0  
                        ? that.deepChildrenComponent(item,h) 
                            : item.componentName == 'elButton' 
                                ? [h('span',that.filteri18n(item.title))] 
                                        : that.$slots.default
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
            if(typeof item == 'object'){
                return dynamicvModel(this.superParams,item.vModel,'','get');
            }
        },
        sizeChange(val){
            this.superParams[this.parentNode.sizeChangeName](val);
        },
        currentChange(val){
            this.superParams[this.parentNode.currentChangeName](val);
        },
        btnClick(item){
            if(item.params){
                this.superParams[item.event](item.paramsName);
            }else if(item.tableParams){
                this.superParams[item.event](this.rowData);  
            } else{
                this.superParams[item.event]();  
            }
        },
        selectChange(val,item){ 
            var selectName = item.selectionEvent;
            this.superParams[selectName](val);
        },
        indexMethod(index) {
            if (index < 9) {
                return "0" + (index + 1);
            } else {
                return index + 1;
            }
        },
        getObjKey(row,key){
            return _.get(row, key);
        },
        formatDate(val){
            return this.$formatDate(val);
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "~@/styles/elComponent.scss";
</style>
