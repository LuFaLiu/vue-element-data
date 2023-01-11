<script type="text/jsx">
import { filteri18n, dynamicvModel, resizeObserver, getVueComponent } from '@/utils/index'
import Template from './template'
import TraverseTemplate from './traverseTemplate'
import CustomContent from './customContent'
import elLevelSelect from '@/components/Page/elLevelSelect'
import elTableTree from '@/components/Page/elTableTree'
import _ from 'lodash';
let inputVal = '';
export default {
    inject: ['superParams'],
    name: 'ElCombination',
    render(h){
        const node = this.node;
        const pageName = this.route;

        console.log("触发渲染函数更新");

        if(this.$parent.$route){
            if(this.$parent.$route.path.indexOf('/pageConfig/addPage') > -1){ //addRole children router
                this.$set(node,'pageName', pageName ? pageName :this.$parent.$route.name);
            }
        }
        

        if(!!node && node.pageName == pageName){ //filter old node 过滤掉旧数据
            var componentNameParams = node.componentName.toLowerCase();
            const renderDom = () => {
                return h(
                    node.componentName,
                    {
                        'class': node.class,
                        props: this.conversionProps(node,componentNameParams)
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
        CustomContent,
        elLevelSelect,
        elTableTree
    },
    computed:{
        resetvModel:{
            get(){
                return dynamicvModel(this.superParams,this.parentNode.vModel,'','get');
            },
            set(val){
                console.log(val);
                dynamicvModel(this.superParams,this.parentNode.vModel,val,'set');
            }
        }
    },
    methods:{
        filteri18n,
        deepChildrenComponent(node,h){
           var that = this;
           return node && node.childrenNode.length > 0 && node.childrenNode.map(function (item) {
                var componentNameParams = item.componentName.toLowerCase();
                if(componentNameParams == 'eltable'){
                    console.log("componentNameParams == 'eltable'");
                    console.log(item);
                }
                return h(
                    item.componentName == 'div' ? 'div' : item.componentName == 'img' ? 'img' : item.componentName == 'span' ? 'span' : item.componentName == 'template' ? 'template' : item.componentName,
                    {
                        'class':item.class,
                        attrs: item.attrs ? that.superParams[componentNameParams][item.attrs] : {
                            placeholder: (item.componentName == 'elInput' || item.componentName == 'elSelect') && that.filteri18n(item.placeholder) || ''
                        },
                        props: item.props && componentNameParams !== 'eltransfer' && componentNameParams !== 'eltree' ? that.superParams[componentNameParams][item.props] : that.conversionProps(item,componentNameParams),
                        on:{
                            changeValue:function (paramsName,val) {
                                item[paramsName] = val;
                            },
                            '&click':function (e) {
                                switch (item.componentName) {
                                    case "ElButton" :
                                        const elButtonParent = that.$parent;
                                        that.btnClick(item);
                                        break;
                                    default:
                                        break;
                                }
                            },
                            'command':function (e) {
                                switch (item.componentName) {
                                    case "ElDropdown" :
                                        if(item.command) {
                                            that.handleDropdownCommand(e);
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            },
                            'selection-change':function (e) {
                                console.log(e);
                                that.selectChange(e,item);
                            },
                            'current-change':function (e) { //table row select
                                that.superParams[item.selectionEvent](e);
                            },
                            input: function (event) { //v-model
                                var hasVal = false;
                                if(typeof event == 'Array'){
                                    if(event.length > 0){
                                        hasVal = true;
                                    }
                                }else {
                                    if(event){
                                        hasVal = true;
                                    }
                                }
                                if(hasVal){
                                    var customVal = '';
                                    var hasUniqueIdentifier = '';
                                    var paramsList = _.keysIn(item);
                                    if(paramsList.indexOf('customVal') > -1){
                                        if(item['customVal']){
                                            customVal = item['customVal'];
                                        }
                                    }
                                    if(paramsList.indexOf('uniqueIdentifier') > -1){
                                        if(item['uniqueIdentifier']){
                                            hasUniqueIdentifier = item['uniqueIdentifier'];
                                        }
                                    }
                                    if(customVal) {
                                        dynamicvModel(that.superParams,customVal,event,'set');
                                        item.value = event;
                                        inputVal = event;
                                    }else {
                                        dynamicvModel(that.superParams,`${componentNameParams}.value`,event,'set');
                                        item.value = event;
                                        inputVal = event;
                                    }   
                                }
                                
                            }, 
                            change: function (event) { //v-model
                                console.log(event);
                                console.log(item);
                                console.log(componentNameParams);
                                var hasVal = false;
                                if(typeof event == 'string'){
                                    if(event){
                                        hasVal = true;
                                    }
                                }else {
                                    if(event.length > 0){
                                        hasVal = true;
                                    }
                                }
                                if(hasVal){
                                    if(componentNameParams == 'elcheckbox'){
                                        that.superParams[`${componentNameParams}`].value = !that.superParams[`${componentNameParams}`].value;
                                        item.value = !that.superParams[`${componentNameParams}`].value;
                                    }else {
                                        var customVal = '';
                                        var hasUniqueIdentifier = '';
                                        var paramsList = _.keysIn(item);
                                        if(paramsList.indexOf('customVal') > -1){
                                            if(item['customVal']){
                                                customVal = item['customVal'];
                                            }
                                        }
                                        if(paramsList.indexOf('uniqueIdentifier') > -1){
                                            if(item['uniqueIdentifier']){
                                                hasUniqueIdentifier = item['uniqueIdentifier'];
                                            }
                                        }
                                        if(customVal) {
                                            console.log("customVal存在");
                                            console.log(customVal);
                                            dynamicvModel(that.superParams,customVal,event,'set');
                                            item.value = event;
                                        }else {
                                            dynamicvModel(that.superParams,`${componentNameParams}.value`,event,'set');
                                            item.value = event;
                                        } 
                                    }
                                }
                            }
                        },
                        directives: [
                            {
                                name: 'loading',
                                value: item.componentName == "ElTable" ? item.loading : false
                            },
                            {
                                name: 'show',
                                value: (that.node.pageName == 'page:manage:rule' && item.componentName == 'elDialog')  ? that.superParams.addContentDialog : item.componentName !== 'elPagination' ? true : that.showPage ? true : false //elPagination loading success to show / 等待表格高度赋值完成才可以显示elPagination
                            }
                        ],
                        //key:Math.random(), //v-model响应数据时会触发render函数，需将key关闭，否则会重新渲染组件
                        slot: item.slot ? item.slot : that.$slots.default,
                        ref:item.refName,
                        scopedSlots: item.componentName == 'elTableColumn' && item.type !== 'selection' && !item.operation && {
                            default: props => h('Template',{props,item}) //通过单文件组件展示对应的信息(组件需要的一切都是通过 context 参数传递)
                        } || item.componentName == 'elRadioGroup' && { default: props => h('TraverseTemplate',{props:{node:item,parent:that}})  } //非单文件组件
                        
                    },
                    item && item.childrenNode && item.childrenNode.length > 0 ? that.deepChildrenComponent(item,h) 
                            : item.componentName == 'ElButton' || (item.componentName == 'elContainer' && item.title) || item.componentName == 'ElLink' || item.componentName == 'ElHeader' || item.componentName == 'ElFooter' || item.componentName == 'ElRadio' || item.componentName == 'ElMenuItem' || (item.componentName == 'template' && item.title) || (item.componentName == 'ElTabPane' && item.title) || (item.componentName == 'ElBreadcrumbItem' && item.title) || (item.componentName == 'ElDropdownItem' && item.title) || (item.componentName == 'ElCarouselItem' && item.title) || (item.componentName == 'ElTimelineItem' && item.title) || (item.componentName == 'ElDivider' && item.title) 
                                //? [h('span',that.filteri18n(item.title))] 
                                ? [h('span',that.$t(item.title))] 
                                    : item.componentName == 'ElSelect' ? that.superParams[item.uniqueIdentifier ? (componentNameParams + item.uniqueIdentifier) : componentNameParams]['ElOptionListName'].map((v,index) => [h('el-option',{props:{label:that.$t(v.label),key:v.value,value:v.value}})] )
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
            if(item){
                return dynamicvModel(this.superParams,item,'','get');
            }
        },
        getVueComponentName(refName){
            var refComponent = getVueComponent(this,'$children','$refs',refName);
            console.log(refName,refComponent);
            return refComponent;
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
        handleDropdownCommand(command){
            this.$message('click on item ' + command);
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
        beforeClose(){
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
        conversionProps(item,componentNameParams){
            //console.log(item,componentNameParams);
            var that = this;
            var customVal = '';
            var hasUniqueIdentifier = '';
            var paramsList = _.keysIn(item);
            if(paramsList.indexOf('customVal') > -1){
                if(item['customVal']){
                    customVal = item['customVal'];
                }else {
                    customVal = '';
                }
            }
            if(paramsList.indexOf('uniqueIdentifier') > -1){
                if(item['uniqueIdentifier']){
                    hasUniqueIdentifier = item['uniqueIdentifier'];
                }else {
                    hasUniqueIdentifier = '';
                }
            }
        
            for(var i in item){
                if(i !== 'componentName' || i !== 'pageName'){
                    if(i == 'readonly'){
                        item[i] = false;
                    } else if(i.indexOf('Method') > 0 || i == 'beforeFilter' || i == 'formatTooltip' || i == 'onRemove' | i == 'onPreview' || i == 'onExceed' || i == 'beforeRemove' || i == 'httpRequest' || i == 'beforeUpload' || i == 'onChange' || i == 'onSuccess' || i == 'onProgress' || i == 'onError' || i == 'error' || i == 'load' || i == 'renderHeader' || i == 'formatter' || i == 'selectable' || i == 'rowKey' || item[i] == 'renderContentTree' || i == 'allowDrag' || i == 'allowDrop' || item[i] == 'formatPercentage' || i == 'increase' || i == 'decrease' || i == 'openDialog' || i == 'beforeClose' || i == 'cancelDialog' || i == 'labelContent' || i == 'beforeLeave' || i == 'format' || i == 'openDrawer' || i == 'openNestedDrawer' || i == 'openInnerDrawer' || i == 'visibleManualPopover' || i == 'closePopoverNestedOperation'){
                        item[i] = that.superParams[i];
                    } else {
                        if(componentNameParams == 'elskeleton' && i == 'loading'){
                            item[i] = that.superParams.elskeleton.elskeletonLoading; 
                        }else if((componentNameParams == 'elsubmenu' && i == 'index') || (componentNameParams == 'elmenuitem' && i == 'index')){
                            item[i] = item[i];
                        }else if(componentNameParams == 'elinput' && i == 'tabindex'){
                            item[i] = item[i];
                        }else if(componentNameParams == 'elrate' && i == 'value'){
                            item[i] = Number(item[i]);
                        }else if(item[i] == 'clear'){
                            delete item[i]
                        } else if(componentNameParams == 'elsteps' && i == 'active'){
                            item[i] = that.superParams.elsteps.active; 
                        } else {
                            item[i] = componentNameParams == 'eldialog' && i == 'width' ? item[i] :
                                      ( 
                                            i == item[i] 
                                                ? that.vModelVal(`${hasUniqueIdentifier ? (componentNameParams + hasUniqueIdentifier) : componentNameParams}.${i}`)
                                                    : i == 'max' || i == 'min' || i == 'precision' || i == 'multipleLimit' || i == 'count' || i == 'throttle' || i == 'imageSize' || i == 'index' || i == 'width' || i == 'multipleLimit' || i == 'span' || i == 'offset' || i == 'pull' || i == 'push' || i == 'xs' || i == 'sm' || i == 'md' || i == 'lg' || i == 'xl' || i == 'pageCount' || i == 'total' || i == 'active' || i == 'openDelay' || i == 'arrowOffset' || i == 'tabindex' || i == 'hideAfter' || i == 'percentage' || i == 'initialIndex' || i == 'visibilityHeight' || i == 'right' || i == 'bottom' || i == 'gutter'
                                                        ? Number(item[i]) 
                                                                : item[i] == 'orderVal' && customVal //customVal exist   
                                                                    ? that.vModelVal(customVal)
                                                                        : item[i]
                                        )
                        }
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
            showPage:false,
            params:{},
            renderCompontentName:''
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
            //that.tableLoading = false;
        }, 1000);
    }
}
</script>
<style lang="scss" scoped>
    @import "~@/styles/elComponent.scss";
</style>
