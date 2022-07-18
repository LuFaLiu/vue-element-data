<script type="text/jsx">
import { filteri18n, dynamicvModel } from '@/utils/index'
import Template from './template'
export default {
    inject: ['superParams'],
    name: 'ElCombination',
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
    components:{
        Template
    },
    data(){
        return {
            domList:[]
        }
    },
    mounted(){
        console.log("界面初始化数据");
        console.log(this.node);
        console.log("父组件数据");
        console.log(this.superParams);
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
                        props: //compontent attribute
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
                                loading:item.loading ? that.superParams.btnLoading : false,
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
                            } : item.componentName == 'elTable' ? 
                            {
                                class:item.class,
                                ref:item.refName,
                                data:that.superParams[item.tableDataName],
                                'tooltip-effect':item.tooltipEffect,
                                style:[item.style],
                                stripe:item.stripe,
                                height:that.superParams[item.tableHeightName],
                                'default-sort':item.defaultSort,
                                'row-key':item.rowKey && item.rowKey,
                                'default-expand-all':item.defaultExpandAll && item.defaultExpandAll,
                                'tree-prop':item.treeProp
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
                                        console.log(elButtonParent);
                                        that.btnClick(item);
                                        break;
                                
                                    default:
                                        break;
                                }
                            },
                            'selection-change':function (e) {
                                that.selectChange(e,item);
                            }
                        },
                        scopedSlots: item.componentName == 'elTableColumn' && item.type !== 'selection' ? {
                            default: props => h('Template',{props,item}) //通过单文件组件展示对应的信息(组件需要的一切都是通过 context 参数传递)
                        } 
                        : that.$slots.default
                    },
                    //item.childrenNode ? that.deepChildrenComponent(item,h) : that.$slots.default()
                    item.childrenNode.length > 0  
                        ? that.deepChildrenComponent(item,h) 
                            : item.componentName == 'elButton' 
                                ? [h('span',that.filteri18n(item.title))] 
                                    //: [h(item.componentName,{scopedSlots: item.componentName == 'elTableColumn' && item.type !== 'selection' ? {default: props => h('Template',{props,item}) }] 
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
    }
}
</script>
<style lang="scss" scoped>
    @import "~@/styles/component.scss";
</style>
