<script type="text/jsx">
import { filteri18n, dynamicvModel, resizeObserver } from '@/utils/index'
import Template from './template'
import TraverseTemplate from './traverseTemplate'
import elLevelSelect from '@/components/Page/elLevelSelect'
import elTableTree from '@/components/Page/elTableTree'
import _ from 'lodash'
export default {
    inject: ['superParams'],
    name: 'ElCombination',
    render(h){
        const node = this.node;
        const pageName = this.route;

        if(this.$parent.$route){
            if(this.$parent.$route.path.indexOf('/pageConfig/addPage') > -1){ //addRole children router
                this.$set(node,'pageName', pageName ? pageName :this.$parent.$route.name);
            }
        }

        if(!!node && node.pageName == pageName){ //filter old node 过滤掉旧数据
            const renderDom = () => {
                return h(
                    node.componentName,
                    {
                        'class': node.class,
                        props: this.conversionProps(node),   
                    },
                    this.deepChildrenComponent(node,h)
                )
            }

            return renderDom();

        }
        
    },
    props:{
        node:{
            default:function () {
                return {}
            }
        },
        route:{
            default:function () {
                return {}
            }
        }
    },
    components:{
        Template,
        TraverseTemplate,
        elLevelSelect,
        elTableTree
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
           return node && node.childrenNode.length > 0 && node.childrenNode.map(function (item) {
                return h(
                    item.componentName == 'elContainer' ? 'div' : item.componentName,
                    {
                        'class':item.class,
                        attrs: {
                            placeholder: (item.componentName == 'elInput' || item.componentName == 'elSelect') && that.filteri18n(item.placeholder) || ''
                        },
                        props:that.conversionProps(item),
                        on:{
                            '&click':function (e) {
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
                            'current-change':function (e) { //table row select
                                that.superParams[item.selectionEvent](e);
                            },
                            input: function (event) { //v-model
                                if(typeof event == 'string'){
                                    //dynamicvModel(that.superParams,item.vModel,event,'set');
                                    that.superParams.value = event;
                                    item.value = event;
                                }
                            },
                            change: function (event) { //v-model
                                switch (item.componentName) {
                                    case "elSelect" :
                                        dynamicvModel(that.superParams,item.vModel,event,'set');
                                        break;
                                
                                    default:
                                        break;
                                }
                            }
                        },
                        directives: [
                            {
                                name: 'loading',
                                value: item.componentName == 'elTable' ? that.tableLoading : false
                            },
                            {
                                name: 'show',
                                value: (that.node.pageName == 'page:manage:rule' && item.componentName == 'elDialog')  ? that.superParams.addContentDialog : item.componentName !== 'elPagination' ? true : that.showPage ? true : false //elPagination loading success to show / 等待表格高度赋值完成才可以显示elPagination
                            }
                        ],
                        //key:Math.random(), //v-model响应数据时会触发render函数，需将key关闭，否则会重新渲染组件
                        ref:item.refName,
                        scopedSlots: item.componentName == 'elTableColumn' && item.type !== 'selection' && !item.operation && {
                            default: props => h('Template',{props,item}) //通过单文件组件展示对应的信息(组件需要的一切都是通过 context 参数传递)
                        } || item.componentName == 'elRadioGroup' && { default: props => h('TraverseTemplate',{props:{node:item,parent:that}})  } //非单文件组件
                    },
                    item && item.childrenNode && item.childrenNode.length > 0 ? that.deepChildrenComponent(item,h) 
                            : item.componentName == 'elButton' || (item.componentName == 'elContainer' && item.title)
                                ? [h('span',that.filteri18n(item.title))] 
                                    : item.componentName == 'elSelect' ? that.superParams[item.elOptionList].map((v,index) => [h('el-option',{props:{label:that.$t(v.label),key:v.value,value:v.value}})] )
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
        },
        beforeClose(item){
          this.superParams[item.closeMethodName]();
        },
        onResize() {
            //console.log("onResize======>");
            //console.log(this.node);
            let classList = [];
            switch (this.node.pageName) {
                case 'sys:account:listData':
                    classList = ["searchUser","account-bottom"];
                    break;
                case 'sys:roleManage:role':
                    classList = ["searchUser","account-bottom"];
                    break;
                case 'page:manage:rule':
                    classList = ["searchUser","account-bottom"];
                    break;    
                case 'sys:roleManage:addRole':
                    classList = ["demo-editForm"];
                    break;    
                default:
                    break;
            }
            this.tableHeight = resizeObserver("el-main",classList,130);
        },
        //转化props属性
        conversionProps(item){
            
            var that = this;
            for(var i in item){
                if(i !== 'componentName' || i !== 'pageName'){
                    //console.log(item[i]);
                    //console.log(typeof item[i]);
                    //console.log(new Boolean(item[i]));
                    if(i == 'readonly'){
                        item[i] = false;
                    }else {
                        item[i] = (i == item[i] ? that.superParams[i] : item[i])
                    }
                }
            }
            
            return item;
        }
    },
    data(){
        return {
            tableLoading:true,
            domList:[],
            tableHeight:0,
            timer:null,
            showPage:false
        }
    },
    mounted(){
        var that = this;

        that.timer = setInterval(() => { //dom更新存在延迟
            var dom = document.getElementsByClassName(that.node.pageName == 'sys:roleManage:addRole' ? 'demo-editForm' : 'searchUser');
            if(dom.length !== 0){
                that.onResize();
                clearInterval(that.timer);
                that.showPage = true;
            }else {
                that.showPage = false;
            }
        }, 1);


        window.addEventListener('resize',function (e) {
            that.onResize();
        })
        
        setTimeout(() => {
            that.tableLoading = false;
        }, 1000);
    }
}
</script>
<style lang="scss" scoped>
    @import "~@/styles/elComponent.scss";
</style>
