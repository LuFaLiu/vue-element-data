import { dynamicvModel } from '@/utils/index'
export default {
    inject: ['superParams'],
    props:{
        attributeName:{
            type:String
        }
    },
    data(){
        return {
            advancedUsagedisabled:false,
            editableTabsValue: '2',
            editableTabs: [{
                title: 'Tab 1',
                name: '1',
                content: 'Tab 1 content'
                }, {
                title: 'Tab 2',
                name: '2',
                content: 'Tab 2 content'
            }],
            tabIndex: 2,
            editableTabsValue2: '2',
            editableTabs2: [{
                title: 'Tab 1',
                name: '1',
                content: 'Tab 1 content'
                }, {
                title: 'Tab 2',
                name: '2',
                content: 'Tab 2 content'
            }],
            tabIndex2: 2
        }
        
    },
    computed:{
        searchHeaderVal:{
            get(){
                return dynamicvModel(this.superParams,'searchHeaderVal','','get');
            },
            set(val){
                dynamicvModel(this.superParams,'searchHeaderVal',val,'set');
            }
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
            }else if (node.type == 'customCalendar') {
                return (
                    <template
                        slot={'dateCell'}
                        slot-scope={'date, data'}>
                        <p class={data.isSelected ? 'is-selected' : ''}>
                            { data.day.split('-').slice(1).join('-') } { data.isSelected ? '✔️' : ''}
                        </p>
                    </template>
                )
                
            }else if(node.type == 'customCollapseItemTitle'){  // 遇到slot=xxx，这种没有起效果的那么将整个模块都定义在customContent
                console.log("node.type == 'slot'");
                console.log(node);
                return (
                    <el-collapse-item>
                        <template slot={node.slot}>
                            {node.text}<i style={node.style} class={node.class}></i>
                        </template>
                        <div>
                            {
                                node.childrenNode && node.childrenNode.length > 0 ? this.deepChildrenComponent(node,h) : this.$slots.default
                            }
                        </div>
                    </el-collapse-item>
                )
            } else if(node.type == 'elRadioGroup'){
                const changeVal = () => {
                    node.value = !node.value;
                    this.superParams.changeElTimelineBasicUsageVal(node.value);
                } 
                return (
                    <el-radio-group onChange={changeVal} style={node.style} value={node.value}  ref={node.refName}>
                        {
                            node.elRadiolist.map((v,index) => <el-radio ref={node.refName} label={v.value} key={index} >{v.label}</el-radio >)
                        }
                    </el-radio-group>
                )
            }else if(node.type == 'timelineCustom'){
                return (
                    <div>
                        {
                            node.timelineCustomList.map((v,index) => <el-timeline-item key={index} icon={v.icon} type={v.type} color={v.color} size={v.size} timestamp={v.timestamp} >{v.content}</el-timeline-item>)
                        }
                    </div>
                )
            }else if(node.type == 'tooltipMoreContent'){ // 遇到slot=xxx，这种没有起效果的那么将整个模块都定义在customContent
                console.log(node.type == 'tooltipMoreContent');
                return (
                    <el-tooltip placement="top">
                        <div slot={node.slot}>
                            {node.text1}<br/>{node.text2}
                        </div>
                        <el-button>Top center</el-button>
                    </el-tooltip>
                )
            }else if(node.type == 'tooltipAdvancedUsage'){ // 遇到slot=xxx，这种没有起效果的那么将整个模块都定义在customContent
                return (
                    <el-tooltip disabled={this.advancedUsagedisabled} content={node.text} placement="bottom" effect="light">
                        <el-button onClick={this.changeAdvancedUsagedisabled}>click to {this.advancedUsagedisabled ? 'active' : 'close'} tooltip function</el-button>
                    </el-tooltip>
                )
            }else if(node.type == 'dropdownListBtn') {
                return (
                    <el-button type="primary">
                        {node.text}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                )
            }else if(node.type == 'basicUsageBtn') {
                return (
                    <span class="el-dropdown-link">
                        {node.text}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                )
            }else if(node.type == 'customTab') {
                return (
                    <span slot="label">
                        <i class="el-icon-date"></i> {node.text}
                    </span>
                )
            }else if(node.type == 'tabList') {
                return (
                    <el-tabs v-model={this.editableTabsValue} type="card" editable v-on:edit={this.handleTabsEdit}>
                        {
                            this.editableTabs.map((item,index) => <el-tab-pane key={item.name} label={item.title} name={item.name} >{item.content}</el-tab-pane>)
                        }
                    </el-tabs>
                )
            }else if(node.type == 'customizedTrigger') {
                return (
                    <div>
                        <div style="margin-bottom: 20px;">
                            <el-button
                                size="small"
                                nativeOnClick={this.addTab}
                            >
                                add tab
                            </el-button>
                        </div>
                        <el-tabs v-model={this.editableTabsValue2} type="card" closable v-on:tab-remove={this.removeTab}>
                            {
                                this.editableTabs2.map((item,index) => <el-tab-pane key={item.name} label={item.title} name={item.name} >{item.content}</el-tab-pane>)
                            }
                        </el-tabs>
                    </div>
                )
            }else if(node.type == 'submenuLoaction') {
                return (
                    <div>
                        <i class="el-icon-location"></i>
                        <span>{node.text}</span>
                    </div>
                )
            }else if(node.type == 'customMenuTitle') {
                return (
                    <div>
                        <i class={node.class}></i>
                        <span slot="title">{node.text}</span>
                    </div>
                )
            }else if(node.type == 'elMenuItemType') {
                return (
                    <el-menu-item index={node.index} disabled={node.disabled}>
                        <i class={node.icon}></i>
                        <span>{node.text}</span>
                    </el-menu-item>
                )
            }else if(node.type == 'elSkeletonRenderingList') {
                return (
                    // 原文为template 不展示模块，改为div则展示
                    <div>
                        {
                            node.skeletonList.map((item,index) => 
                                <el-card key={item} >
                                    <img src={item.imgUrl} class="image multi-content" />
                                    <div style="padding: 14px;">
                                        <span>Delicious hamberger</span>
                                        <div class="bottom card-header">
                                        <span class="time">{ node.currentDate }</span>
                                        <el-button type="text" class="button">Operation button</el-button>
                                        </div>
                                    </div>
                                </el-card>
                            )
                        }
                    </div>
                ) 
            }else if(node.type == 'usingScopedSlot') {
                const treeNode = this.$parent.node.data;
                
                return (
                    <template class="custom-tree-node">
                        <span>{ treeNode.label }</span>
                        <span>
                        <el-button
                            type="text"
                            size="mini"
                            on-click={ () => this.superParams.appendCustomNode(treeNode)}>
                            Append
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            on-click={ () => this.superParams.removeCustomNode(treeNode, treeNode)}>
                            Delete
                        </el-button>
                        </span>
                    </template>
                )
                
            }else if(node.type == 'removableTag') {
                return (
                    // template标签 不展示模块，改为div标签则展示
                    <div>
                        {
                            node.tags.map((tag,index) => 
                                <el-tag
                                    key={tag.name}
                                    closable
                                    type={tag.type}>
                                    {tag.name}
                                </el-tag>
                            )
                        }
                    </div>
                ) 
            }else if(node.type == 'dynamicallyTag') {
                return (
                    // 原文为template 不展示模块，改为div则展示
                    // onClose={() => function(){} } 或者 onClose={this.superParams.handleCloseDynamicTags.bind(this, tag)} 阻止事件在render时自动执行一遍
                    <div style="display:flex;">
                        {
                            node.dynamicTags.map((tag,index) => 
                                <el-tag
                                    key={tag}
                                    closable
                                    disable-transitions={false}
                                    onClose={this.superParams.handleCloseDynamicTags.bind(this, tag)}>
                                    {tag}
                                </el-tag>
                            )
                            
                        } 
                        <el-input
                            class="input-new-tag"
                            v-if={node.inputVisible}
                            v-model={node.inputValue}
                            style="width:30%;margin:0 15px;"
                            ref="saveTagInput"
                            size="mini"
                            v-on:keyup={this.superParams.handleInputConfirmDynamicTags}
                            v-on:blur={this.superParams.handleInputConfirmDynamicTags}
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" v-on:click={this.superParams.showInputDynamicTags}>+ New Tag</el-button>
                        
                    </div>
                ) 
            }else if(node.type == 'themeTag') {
                return (
                    // 原文为template 不展示模块，改为div则展示
                    // onClose={() => function(){} } 或者 onClose={this.superParams.handleCloseDynamicTags.bind(this, tag)} 阻止事件在render时自动执行一遍
                    <div>
                        <div class="tag-group">
                            <span class="tag-group__title" style="margin-right:10px;">Dark</span>
                            {
                                node.items.map((item,index) => 
                                    <el-tag
                                        key={item.label}
                                        type={item.type}
                                        effect="dark">
                                        { item.label }
                                    </el-tag>
                                )
                                
                            } 
                        </div>
                        <div class="tag-group" style="margin-top:20px;">
                            <span class="tag-group__title" style="margin-right:10px;">Plain</span>
                            {
                                node.items.map((item,index) => 
                                    <el-tag
                                        key={item.label}
                                        type={item.type}
                                        effect="plain">
                                        { item.label }
                                    </el-tag>
                                )
                                
                            } 
                        </div>
                    </div>
                ) 
            }else if (node.type == 'fixedColumn') {
                return (
                    <div slot-scope={'scope'}>
                        <el-button v-on:click={ () => this.superParams.handleClickTableColumn()} type="text" size="small">{node.eventName1}</el-button>
                        <el-button type="text" size="small">{node.eventName2}</el-button>
                    </div>
                ) 
            }else if (node.type == 'customHeader') {
                console.log("node.type == 'customHeader'");
                return (
                    <el-table-column align="right" width="200">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                v-model={this.searchHeaderVal}
                                size={node.size}
                                placeholder={node.placeholder}/>
                        </template>    
                        <div>
                            <el-button
                                size="mini"
                                >Edit</el-button>
                                <el-button
                                size="mini"
                                type="danger"
                                >Delete</el-button>
                        </div>
                    </el-table-column>
                ) 
            }else {

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
        changeAdvancedUsagedisabled(){

           this.advancedUsagedisabled = !this.advancedUsagedisabled;
           console.log(this.advancedUsagedisabled);
        },
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
        },
        changeValMethod(refName){
            if(refName == 'elRadioGroup') {
                this.superParams.changeElTimelineGroupVal(refName);
            }
        },
        handleTabsEdit(targetName, action){
            if (action === 'add') {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: 'New Tab',
                    name: newTabName,
                    content: 'New Tab content'
                });
                this.editableTabsValue = newTabName;
            }
            if (action === 'remove') {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                        activeName = nextTab.name;
                        }
                    }
                    });
                }
                
                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            }
        },
        addTab(targetName) {
            console.log("addTab==========>");
            let newTabName = ++this.tabIndex2 + '';
            this.editableTabs2.push({
                title: 'New Tab',
                name: newTabName,
                content: 'New Tab content'
            });
            this.editableTabsValue2 = newTabName;
        },
        removeTab(targetName) {
          let tabs = this.editableTabs2;
          let activeName = this.editableTabsValue2;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue2 = activeName;
          this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
        }
    }

}