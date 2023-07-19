<script type="text/jsx">
import { filteri18n, dynamicvModel, resizeObserver, getVueComponent } from '@/utils/index'
import Template from './template' //template里面有多层参数可先创建template solt 再在里面创建子元素
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
                        props: item.props  && componentNameParams !== 'eltree' ? that.superParams[componentNameParams][item.props] : that.conversionProps(item,componentNameParams),
                        on:{
                            '&close':function (params) { // close event
                                if(item.uniqueIdentifier == 'alertTip') {
                                    alert('Hello World!');
                                }
                            },
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
                                console.log('selection-change');
                                console.log(e);
                                if(e){
                                    that.selectChange(e,item);
                                }
                                
                            },
                            'current-change':function (e) { //table row select
                                console.log(e);
                                if(e && e.selectionEvent){
                                    that.superParams[item.selectionEvent](e);
                                }else {
                                    return
                                }
                                
                            },
                            input: function (event) { //v-model
                                var hasVal = false;
                                if(typeof event == 'Array'){
                                    if(event.length > 0){
                                        hasVal = true;
                                    }
                                }else if(item.componentName == "ElRadioGroup"){ 
                                    console.log("item.componentName == ElRadioGroup");
                                    console.log(event);
                                    console.log(item);
                                    if(item.customVal == "elRadioTab") { //elTabs Tab position
                                        item.value = event;
                                        that.superParams.getVueComponentName('tabPosition','tabPosition',event);
                                    }else if(item.customVal == "collapse") {
                                        item.value = event;
                                        that.superParams.getVueComponentName('elMenuCollapse','elMenuCollapse',event);
                                    }else if(item.customVal == "elDescriptionRadio") {
                                        that.superParams.getVueComponentName('elDescriptionsSizes1','size',event);
                                        that.superParams.getVueComponentName('elDescriptionsSizes2','size',event);
                                        that.superParams.getVueComponentName('elDescriptionRadio','value',event);
                                        
                                    }
                                } else {
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
                                console.log("changeTable");
                                console.log(event);
                                console.log(item);
                                console.log(componentNameParams);
                                if(item.event){
                                    item.value = event;
                                    that.btnClick(item,'param');
                                }
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

                                            if(customVal == "collapse") { // NavMenu  Collapse 类型转换
                                                item.value = event;
                                                console.log("item.customVal == collapse");
                                                console.log(event);
                                                that.superParams.getVueComponentName('elMenuCollapse','collapse',eval(event.toLowerCase()));
                                            }else if(customVal == "elPaginationSwitchVal"){ // elPagination Hide pagination when there is only one page 监听switch切换
                                                //JSON.parse(event)  将字符串'false',转为布尔类型false
                                                that.superParams.getVueComponentName('hidePaginationRef','hideOnSinglePage',JSON.parse(event));
                                            }

                                            console.log(event);
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
                        scopedSlots: that.customScopedSlots(h,item)
                        /*
                        scopedSlots: item.componentName == 'elTableColumn' && item.type !== 'selection' && !item.operation && {
                            default: props => h('Template',{props,item}) //通过单文件组件展示对应的信息(组件需要的一切都是通过 context 参数传递)
                        } || (item.componentName == 'elRadioGroup' || item.uniqueIdentifier == 'fixedHeaderAndColumn' || item.uniqueIdentifier == 'tagScope' || item.uniqueIdentifier == 'elMultipleSelectType' || item.uniqueIdentifier == 'customIconDate' || item.uniqueIdentifier == 'customHoverName' || item.uniqueIdentifier == 'customOperations' || item.uniqueIdentifier == 'expandableRow') && { default: props => h('TraverseTemplate',{props:{node:item,parent:that,props:props}}) }  //非单文件组件
                        */
                    },
                    item && item.childrenNode && item.childrenNode.length > 0 ? that.deepChildrenComponent(item,h) 
                            : item.componentName == 'ElButton' || (item.componentName == 'elContainer' && item.title) || item.componentName == 'ElLink' || item.componentName == 'ElHeader' || item.componentName == 'ElFooter' || item.componentName == 'ElRadio' || item.componentName == 'ElMenuItem' || (item.componentName == 'template' && item.title) || (item.componentName == 'ElTabPane' && item.title) || (item.componentName == 'ElBreadcrumbItem' && item.title) || (item.componentName == 'ElDropdownItem' && item.title) || (item.componentName == 'ElCarouselItem' && item.title) || (item.componentName == 'ElTimelineItem' && item.title) || (item.componentName == 'ElDivider' && item.title) || (item.componentName == 'ElDescriptionsItem' && item.title) || (item.componentName == 'ElTag' && item.title) 
                                //? [h('span',that.filteri18n(item.title))] 
                                ? [h('span',that.$t(item.title))] 
                                    : item.componentName == 'ElSelect' ? that.superParams[item.uniqueIdentifier ? (componentNameParams + item.uniqueIdentifier) : componentNameParams]['ElOptionListName'].map((v,index) => [h('el-option',{props:{label:that.$t(v.label),key:v.value,value:v.value}})] )
                                        : that.$slots.default
                )
           })
        },

        customScopedSlots(h,item) {
            var that = this
            console.log(item.uniqueIdentifier);
            if(item.componentName == 'elTableColumn' && item.type !== 'selection' && !item.operation) {
                return { default: props => h('Template',{props,item}) }
            }else if(item.componentName == 'elRadioGroup' || item.uniqueIdentifier == 'fixedHeaderAndColumn' || item.uniqueIdentifier == 'tagScope' || item.uniqueIdentifier == 'elMultipleSelectType' || item.uniqueIdentifier == 'customIconDate' || item.uniqueIdentifier == 'customHoverName' || item.uniqueIdentifier == 'customOperations' || item.uniqueIdentifier == 'expandableRow') {
                return { default: props => h('TraverseTemplate',{props:{node:item,parent:that,props:props}}) }
            }else if(item.uniqueIdentifier == 'customizableTransfer'){
                console.log("item.uniqueIdentifier == 'customizableTransfer'");
                return { default: props => h(TraverseTemplate,{props:{node:item,parent:that,props:props}}) }
            }else if(item.uniqueIdentifier == 'customFileThumbnail'){
                console.log("item.uniqueIdentifier == 'customFileThumbnail'");
                return { file: props => h(TraverseTemplate,{props:{node:item,parent:that,props:props}}) }
            }
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
        btnClick(item,type){
            if(item.params){
                this.superParams[item.event](item.paramsName);
            }else if(item.tableParams){
                this.superParams[item.event](this.rowData);  
            }else if(type == 'param'){
                this.superParams[item.event](item.value);  
            }else if(item.ref){
                this.superParams[item.event](item.ref,item);  
            } else{
                this.superParams[item.event]();  
            }
        },
        handleDropdownCommand(command){
            this.$message('click on item ' + command);
        },
        selectChange(val,item){ 
            if(item.selectionEvent) {
                var selectName = item.selectionEvent;
                this.superParams[selectName](val);
            }
        },
        indexMethod(index) {
            if (index < 9) {
                return "0" + (index + 1);
            } else {
                return index + 1;
            }
        },

        renderContentTransferBasicusage(h, option) {
            console.log("renderContentTransferBasicusage");
            console.log(option);
            return <span>{ option.key } - { option.label }</span>;
        },

        customIndexMethod(index) {
            return index * 2;
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

        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            console.log("columns, data");
            console.log(columns, data);
            columns.forEach((column, index) => {
                if (index === 0) {
                sums[index] = 'Total Cost';
                return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                sums[index] = '$ ' + values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                    return prev + curr;
                    } else {
                    return prev;
                    }
                }, 0);
                } else {
                sums[index] = 'N/A';
                }
            });

            return sums;
        },

        //转化props属性
        conversionProps(props,componentNameParams){
            //console.log("转化props属性");
            //console.log(props,componentNameParams);
            var that = this;
            var item = _.cloneDeep(props)
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
                    } else if(i.indexOf('Method') > 0 || i == 'beforeFilter' || i == 'formatTooltip' || i == 'onRemove' | i == 'onPreview' || i == 'onExceed' || i == 'beforeRemove' || i == 'httpRequest' || i == 'beforeUpload' || i == 'onChange' || i == 'onSuccess' || i == 'onProgress' || i == 'onError' || i == 'error' || i == 'load' || i == 'renderHeader' || i == 'formatter' || i == 'selectable' || i == 'rowKey' || item[i] == 'renderContentTree' || i == 'allowDrag' || i == 'allowDrop' || item[i] == 'formatPercentage' || i == 'increase' || i == 'decrease' || i == 'openDialog' || i == 'beforeClose' || i == 'cancelDialog' || i == 'labelContent' || i == 'beforeLeave' || i == 'format' || i == 'openDrawer' || i == 'openNestedDrawer' || i == 'openInnerDrawer' || i == 'visibleManualPopover' || i == 'closePopoverNestedOperation' || i == 'nodeDragStart' || i == 'nodeDragEnter' || i == 'nodeDragLeave' || i == 'nodeDragOver' || i == 'nodeDragEnd' || i == 'nodeDrop' || i == 'allowDrop'){
                        
                        if (item[i] == 'loadSelectableNode'){
                            item[i] = that.superParams.loadSelectableNode;
                        } else if(item[i] == 'loadCustomLazyNode'){
                            item[i] = that.superParams.loadCustomLazyNode;
                        } else if(item[i] == 'formatElProgress'){
                            item[i] = that.superParams.formatElProgress;
                        } else if(componentNameParams == 'eltablecolumn' && i == 'filterMethod'){ // 需要设置filterMethod为空时删除该属性，否则eltablecolumn 会出现下拉框筛选条件
                            if(!item[i]) {
                                delete item[i]
                            }else if(item[i] == 'filterTagHandler'){
                                item[i] = that.superParams.filterTagHandler
                            }else if(item[i] == 'filterDateHandler'){
                                item[i] = that.superParams.filterDateHandler
                            }else {
                                item[i] = that.superParams.eltablecolumn.filterMethod
                            }
                        } else if(item[i] == 'treeDataload'){
                            item[i] = that.superParams.treeDataload
                        } else if(item[i] == 'rowKey' || componentNameParams == 'eltable') {
                            if(item[i]) { // 一定需要这样设置，否则不能显示出对应的children
                                item[i] = 'id'
                            }else {
                                let rowKey = 0
                                item[i] = (++rowKey).toString()
                            }
                            
                            console.log("item[i] == 'rowKey'");
                                console.log(item);
                        }else if(item[i] == 'photoWallPreview'){
                            console.log("item[i] == 'photoWallPreview'");
                            item[i] = that.superParams.photoWallPreview
                        } else {
                            item[i] = that.superParams[i];
                        }
                    } else {
                        if(componentNameParams == 'elskeleton' && i == 'loading'){
                            if(item[i]){
                                item[i] = that.superParams.elskeleton[item[i]];
                            }
                            //item[i] = that.superParams.elskeleton.elskeletonLoading; 
                        } else if(componentNameParams == 'elpagination' && i == 'pageSizes'){
                            if(item[i]){
                                item[i] = that.superParams.elpagination[item[i]];
                            }
                            //item[i] = that.superParams.elskeleton.elskeletonLoading; 
                        }else if(componentNameParams == 'eltree' && (i == 'defaultCheckedKeys' || i == 'defaultExpandedKeys')){
                            if(item[i]){
                                item[i] = that.superParams.eltree[item[i]];
                            }
                        }else if((componentNameParams == 'elsubmenu' && i == 'index') || (componentNameParams == 'elmenuitem' && i == 'index')){
                            item[i] = item[i];
                        }else if(componentNameParams == 'elinput' && i == 'tabindex'){
                            item[i] = item[i];
                        }else if(componentNameParams == 'elbadge' && i == 'value'){ // value必须为Number类型
                            if(Boolean(Number(item[i]))) {
                                item[i] = Number(item[i]);
                            }else { //为NaN
                                item[i] = item[i];
                            }
                            
                        }else if(componentNameParams == 'elrate' && i == 'value'){
                            if(item[i] === 'readOnlyValue'){
                                item[i] = that.superParams.elrate.readOnlyValue
                            }else {
                                item[i] = Number(item[i]);
                            }
                            
                        }else if(componentNameParams == 'elrate' && i == 'colors'){
                            item[i] = that.superParams.elrate.basicUsageColors
                        }else if(componentNameParams == 'elrate' && i == 'texts'){
                            if(item[i] == 'texts') {
                                item[i] = that.superParams.elrate.texts
                            }else if(item[i] == 'withText'){
                                item[i] = that.superParams.elrate.withText
                            }
                            
                        }else if(componentNameParams == 'elrate' && i == 'iconClasses'){
                            console.log("componentNameParams == 'elrate' && i == 'iconClasses'");
                            console.log(item[i]);
                            if(item[i] == 'iconClasses') {
                                item[i] = that.superParams.elrate.iconClasses
                            }else if(item[i] == 'moreIconClasses') {
                                item[i] = that.superParams.elrate.moreIconClasses
                                console.log(that.superParams.elrate.moreIconClasses);
                            }
                            
                            
                        }else if(item[i] == 'clear'){
                            delete item[i]
                        } else if(componentNameParams == 'elsteps' && i == 'active'){
                            item[i] = that.superParams.elsteps.active; 
                        } else if(componentNameParams == 'eltree' && i == 'props'){
                            item[i] = that.superParams.eltree[item[i]]; 
                        } else if(componentNameParams == 'eltree' && item[i] == 'renderCustomNodeContent'){
                            item[i] = that.superParams.renderCustomNodeContent;
                        } else if(componentNameParams == 'eltable' && item[i] == 'treeProps'){
                            item[i] = new Object(that.superParams.eltable.treeProps);  
                        }  else if(componentNameParams == 'eltable' && i == 'rowClassName' && item[i] == 'tableRowClassName'){
                            item[i] = that.superParams.tableRowClassName
                        } else if(componentNameParams == 'eltablecolumn' && (i == 'filters' || i == 'filteredValue')){
                            console.log(item);
                            if(!item[i]) {
                                //delete item[i]
                            }else if(item[i] == 'dateFilter'){
                                console.log(item[i]);
                                console.log(item,i);
                                console.log("item[i] == 'dateFilter'");
                                console.log(that.superParams.dateFilter);
                                // that.superParams.dateFilter
                                item[i] = that.superParams.dateFilter
                                console.log(item);
                            }else if(item[i] == 'tagFilter'){
                                console.log("tem[i] == 'tagFilter'");
                                console.log(that.superParams.tagFilter);
                                item[i] = that.superParams.tagFilter
                            } else {
                                item[i] = that.superParams.eltablecolumn[item[i]]
                            }

                            console.log(item);
                        } else if(componentNameParams == 'eltablecolumn' && (i == 'width' || i == 'minWidth')){
                            if(item[i]) {
                                item[i] = Number(item[i]) 
                            }else {
                                item[i] = 400
                            }
                        } else if(componentNameParams == 'eltablecolumn' && i == 'fixed'){
                            console.log(componentNameParams == 'eltablecolumn' && i == 'fixed');
                            console.log(i,item[i]);
                            console.log(typeof item[i]);
                            item[i] = Boolean(item[i]) 
                            /*
                            if(item[i] == 'true' || item[i] == 'false') {
                                item[i] = Boolean(item[i]) 
                            }
                            */ 
                        } else if(componentNameParams == 'eltablecolumn' && i == 'index'){
                            if(item[i] == 'indexMethod') {
                                item[i] = that.indexMethod
                            }else if(item[i] == 'customIndexMethod') {
                                item[i] = that.customIndexMethod
                            } else {
                                item[i] = item[i]
                            }
                            
                            console.log("indexMethod");
                            console.log(item[i]);
                        } else if(componentNameParams == 'eltablecolumn' && i == 'formatter'){
                            if(item[i] == 'formatterSorting') {
                                item[i] = that.superParams.formatterSorting
                            }else {
                                item[i] = item[i]
                            }
                              
                            console.log("indexMethod");
                            console.log(item[i]);
                        } else if(componentNameParams == 'elform' && i == 'labelPosition'){
                            if(item[i] == 'alignmentLabelPosition') {
                                item[i] = that.superParams.alignmentLabelPosition
                            }
                        } else if(componentNameParams == 'elform' && i == 'rules'){
                            if(item[i] == 'validationRules') {
                                item[i] = that.superParams.elform.validationRules
                            }else if(item[i] == 'customValidationRules') {
                                item[i] = that.superParams.elform.customValidationRules
                            }
                            
                        } else if(componentNameParams == 'elformitem' && i == 'rules'){
                            if(item[i] == 'dynamicValidateEmailRules') {
                                item[i] = that.superParams.elform.dynamicValidateEmailRules
                            }else if(item[i] == 'numberValidateRules') {
                                item[i] = that.superParams.elform.numberValidateRules
                            }
                        } else if(componentNameParams == 'elcolorpicker' && i == 'predefine'){
                            if(item[i] == 'predefineColorList') {
                                item[i] = that.superParams.elcolorpicker.predefineColorList
                            }
                        } else if(componentNameParams == 'elimage' && i == 'src'){
                            if(item[i] == 'photoWallImageUrl') {
                                item[i] = that.superParams.elupload.photoWallImageUrl
                            }else if(item[i] == 'customFileThumbnailImageUrl') {
                                item[i] = that.superParams.elupload.customFileThumbnailImageUrl
                            }
                        } else if(componentNameParams == 'elupload' && i == 'onRemove'){
                            if(item[i] == 'handleFileListWithThumbnailRemove') {
                                item[i] = that.superParams.handleFileListWithThumbnailRemove
                            }
                        } else if(componentNameParams == 'elupload' && i == 'onPreview'){
                            if(item[i] == 'handleFileListWithThumbnailRemove') {
                                item[i] = that.superParams.handleFileListWithThumbnailPreview
                            } 
                        } else if(componentNameParams == 'elupload' && i == 'onChange'){
                            if(item[i] == 'handleFileListControlChange') {
                                item[i] = that.superParams.handleFileListControlChange
                            } 
                        } else if(componentNameParams == 'elupload' && i == 'fileList'){
                            if(item[i] == 'dragToUploadFileList') {
                                item[i] = that.superParams.elupload.dragToUploadFileList
                            } else {
                                item[i] = that.superParams.elupload.fileList
                            }
                        } else if(componentNameParams == 'eldatetimePicker' && i == 'value'){
                            if(item[i] == 'value1') {
                                item[i] = that.superParams.eldatetimePicker.value1
                            } else if(item[i] == 'value2') {
                                item[i] = that.superParams.eldatetimePicker.value2
                            } else if(item[i] == 'value3') {
                                item[i] = that.superParams.eldatetimePicker.value3
                            }  else if(item[i] == 'value5') {
                                item[i] = that.superParams.eldatetimePicker.value5
                            }  else if(item[i] == 'value6') {
                                item[i] = that.superParams.eldatetimePicker.value6
                            } 
                        } else if(componentNameParams == 'eldatepicker' && i == 'value'){
                            if(item[i] == 'value1') {
                                item[i] = that.superParams.eldatepicker.value1
                            } else if(item[i] == 'value2') {
                                item[i] = that.superParams.eldatepicker.value2
                            } else if(item[i] == 'value3') {
                                item[i] = that.superParams.eldatepicker.value3
                            } else if(item[i] == 'value5') {
                                item[i] = that.superParams.eldatepicker.value5
                            } else if(item[i] == 'value6') {
                                item[i] = that.superParams.eldatepicker.value6
                            } else if(item[i] == 'value7') {
                                item[i] = that.superParams.eldatepicker.value7
                            } else if(item[i] == 'value8') {
                                item[i] = that.superParams.eldatepicker.value8
                            } else if(item[i] == 'value9') {
                                item[i] = that.superParams.eldatepicker.value9
                            } else if(item[i] == 'dateRangeValue1') {
                                item[i] = that.superParams.eldatepicker.dateRangeValue1
                            } else if(item[i] == 'dateRangeValue2') {
                                item[i] = that.superParams.eldatepicker.dateRangeValue2
                            }
                        } else if(componentNameParams == 'eldatetimePicker' && i == 'pickerOptions'){
                            if(item[i] == 'pickerOptions') {
                                item[i] = that.superParams.eldatetimePicker.pickerOptions
                            } else if(item[i] == 'pickerOption2'){
                                item[i] = that.superParams.eldatetimePicker.pickerOption2
                            } else if(item[i] == 'dateRangepickerOptions'){
                                item[i] = that.superParams.eldatetimePicker.dateRangepickerOptions
                            }
                            
                        }  else if(componentNameParams == 'eldatepicker' && i == 'pickerOptions'){
                            if(item[i] == 'pickerOptions') {
                                item[i] = that.superParams.eldatepicker.pickerOptions
                            }  else if(item[i] == 'dateRangepickerOptions'){
                                item[i] = that.superParams.eldatepicker.dateRangepickerOptions
                            }
                            
                        }  else {
                            item[i] = componentNameParams == 'eldialog' && i == 'width' ? item[i] :
                                      ( 
                                            i == item[i] 
                                                ? that.vModelVal(`${hasUniqueIdentifier ? (componentNameParams + hasUniqueIdentifier) : componentNameParams}.${i}`)
                                                    : i == 'max' || i == 'min' || i == 'precision' || i == 'multipleLimit' || i == 'count' || i == 'throttle' || i == 'rows' || i == 'imageSize' || i == 'index' || i == 'width' || i == 'multipleLimit' || i == 'span' || i == 'offset' || i == 'pull' || i == 'push' || i == 'xs' || i == 'sm' || i == 'md' || i == 'lg' || i == 'xl' || i == 'pageCount' || i == 'total' || i == 'active' || i == 'openDelay' || i == 'arrowOffset' || i == 'tabindex' || i == 'hideAfter' || i == 'percentage' || i == 'initialIndex' || i == 'visibilityHeight' || i == 'right' || i == 'bottom' || i == 'gutter' || i == 'strokeWidth' || i == 'index'
                                                        ? Number(item[i]) 
                                                                : item[i] == 'orderVal' && customVal //customVal exist   (需要将目标key的value设置为orderVal，然后再将customVal设置为具体的值，例：将data的value设置为orderVal，然后将customVal设置为eltree.disabledCheckboxData,就可以将data赋值成eltree.disabledCheckboxData)
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
