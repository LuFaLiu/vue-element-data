import { dynamicvModel } from '@/utils/index'
export default {
    inject: ['superParams'],
    props: {
        attributeName: {
            type: String
        }
    },
    data() {
        return {
            advancedUsagedisabled: false,
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
            tabIndex2: 2,
            customFileThumbnailDialogImageUrl: '',
            customFileThumbnailDialogVisible: false,
            customFileThumbnailDisabled: false
        }

    },
    computed: {
        searchHeaderVal: {
            get() {
                return dynamicvModel(this.superParams, 'searchHeaderVal', '', 'get');
            },
            set(val) {
                dynamicvModel(this.superParams, 'searchHeaderVal', val, 'set');
            }
        }
    },
    name: 'CustomContent',
    render(h) {
        //console.log(this.attributeName);
        //console.log(this.superParams.customcontent[this.attributeName]);
        const node = this.superParams.customcontent[this.attributeName];
        if (node) {
            console.log(node);
            //console.log(node.tag == 'img' ? node.props.src : '');
            //console.log(Boolean(this.superParams[node.condition]));
            if (node.list && node.list.length > 0) {
                return (
                    <div>
                        {
                            node.list.map((v, index) => <li style={node.style} key={index} class={node.class} >{v.label}</li>)
                        }
                    </div>
                );
            } else if (node.type == 'elImageTraverse') {
                return (
                    <div>
                        {
                            node.fits.map((v, index) =>
                                <div style={node.style} key={index}>
                                    <span style="display: block;color: #8492a6;font-size: 14px;margin-bottom: 20px;">{v}</span>
                                    <el-image style="width: 100px; height: 100px" src={node.url} fit={v}></el-image>
                                </div>
                            )
                        }
                    </div>
                )
            } else if (node.type == 'customCalendar') {
                return (
                    <template
                        slot={'dateCell'}
                        slot-scope={'date, data'}>
                        <p class={data.isSelected ? 'is-selected' : ''}>
                            {data.day.split('-').slice(1).join('-')} {data.isSelected ? '✔️' : ''}
                        </p>
                    </template>
                )

            } else if (node.type == 'customCollapseItemTitle') {  // 遇到slot=xxx，这种没有起效果的那么将整个模块都定义在customContent
                console.log("node.type == 'slot'");
                console.log(node);
                return (
                    <el-collapse-item>
                        <template slot={node.slot}>
                            {node.text}<i style={node.style} class={node.class}></i>
                        </template>
                        <div>
                            {
                                node.childrenNode && node.childrenNode.length > 0 ? this.deepChildrenComponent(node, h) : this.$slots.default
                            }
                        </div>
                    </el-collapse-item>
                )
            } else if (node.type == 'elRadioGroup') {
                const changeVal = () => {
                    node.value = !node.value;
                    this.superParams.changeElTimelineBasicUsageVal(node.value);
                }
                return (
                    <el-radio-group onChange={changeVal} style={node.style} value={node.value} ref={node.refName}>
                        {
                            node.elRadiolist.map((v, index) => <el-radio ref={node.refName} label={v.value} key={index} >{v.label}</el-radio >)
                        }
                    </el-radio-group>
                )
            } else if (node.type == 'timelineCustom') {
                return (
                    <div>
                        {
                            node.timelineCustomList.map((v, index) => <el-timeline-item key={index} icon={v.icon} type={v.type} color={v.color} size={v.size} timestamp={v.timestamp} >{v.content}</el-timeline-item>)
                        }
                    </div>
                )
            } else if (node.type == 'tooltipMoreContent') { // 遇到slot=xxx，这种没有起效果的那么将整个模块都定义在customContent
                console.log(node.type == 'tooltipMoreContent');
                return (
                    <el-tooltip placement="top">
                        <div slot={node.slot}>
                            {node.text1}<br />{node.text2}
                        </div>
                        <el-button>Top center</el-button>
                    </el-tooltip>
                )
            } else if (node.type == 'tooltipAdvancedUsage') { // 遇到slot=xxx，这种没有起效果的那么将整个模块都定义在customContent
                return (
                    <el-tooltip disabled={this.advancedUsagedisabled} content={node.text} placement="bottom" effect="light">
                        <el-button onClick={this.changeAdvancedUsagedisabled}>click to {this.advancedUsagedisabled ? 'active' : 'close'} tooltip function</el-button>
                    </el-tooltip>
                )
            } else if (node.type == 'dropdownListBtn') {
                return (
                    <el-button type="primary">
                        {node.text}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                )
            } else if (node.type == 'basicUsageBtn') {
                return (
                    <span class="el-dropdown-link">
                        {node.text}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                )
            } else if (node.type == 'customTab') {
                return (
                    <span slot="label">
                        <i class="el-icon-date"></i> {node.text}
                    </span>
                )
            } else if (node.type == 'tabList') {
                return (
                    <el-tabs v-model={this.editableTabsValue} type="card" editable v-on:edit={this.handleTabsEdit}>
                        {
                            this.editableTabs.map((item, index) => <el-tab-pane key={item.name} label={item.title} name={item.name} >{item.content}</el-tab-pane>)
                        }
                    </el-tabs>
                )
            } else if (node.type == 'customizedTrigger') {
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
                                this.editableTabs2.map((item, index) => <el-tab-pane key={item.name} label={item.title} name={item.name} >{item.content}</el-tab-pane>)
                            }
                        </el-tabs>
                    </div>
                )
            } else if (node.type == 'submenuLoaction') {
                return (
                    <div>
                        <i class="el-icon-location"></i>
                        <span>{node.text}</span>
                    </div>
                )
            } else if (node.type == 'customMenuTitle') {
                return (
                    <div>
                        <i class={node.class}></i>
                        <span slot="title">{node.text}</span>
                    </div>
                )
            } else if (node.type == 'elMenuItemType') {
                return (
                    <el-menu-item index={node.index} disabled={node.disabled}>
                        <i class={node.icon}></i>
                        <span>{node.text}</span>
                    </el-menu-item>
                )
            } else if (node.type == 'elSkeletonRenderingList') {
                return (
                    // 原文为template 不展示模块，改为div则展示
                    <div>
                        {
                            node.skeletonList.map((item, index) =>
                                <el-card key={item} >
                                    <img src={item.imgUrl} class="image multi-content" />
                                    <div style="padding: 14px;">
                                        <span>Delicious hamberger</span>
                                        <div class="bottom card-header">
                                            <span class="time">{node.currentDate}</span>
                                            <el-button type="text" class="button">Operation button</el-button>
                                        </div>
                                    </div>
                                </el-card>
                            )
                        }
                    </div>
                )
            } else if (node.type == 'usingScopedSlot') {
                const treeNode = this.$parent.node.data;

                return (
                    <template class="custom-tree-node">
                        <span>{treeNode.label}</span>
                        <span>
                            <el-button
                                type="text"
                                size="mini"
                                on-click={() => this.superParams.appendCustomNode(treeNode)}>
                                Append
                            </el-button>
                            <el-button
                                type="text"
                                size="mini"
                                on-click={() => this.superParams.removeCustomNode(treeNode, treeNode)}>
                                Delete
                            </el-button>
                        </span>
                    </template>
                )

            } else if (node.type == 'removableTag') {
                return (
                    // template标签 不展示模块，改为div标签则展示
                    <div>
                        {
                            node.tags.map((tag, index) =>
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
            } else if (node.type == 'dynamicallyTag') {
                return (
                    // 原文为template 不展示模块，改为div则展示
                    // onClose={() => function(){} } 或者 onClose={this.superParams.handleCloseDynamicTags.bind(this, tag)} 阻止事件在render时自动执行一遍
                    <div style="display:flex;">
                        {
                            node.dynamicTags.map((tag, index) =>
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
            } else if (node.type == 'themeTag') {
                return (
                    // 原文为template 不展示模块，改为div则展示
                    // onClose={() => function(){} } 或者 onClose={this.superParams.handleCloseDynamicTags.bind(this, tag)} 阻止事件在render时自动执行一遍
                    <div>
                        <div class="tag-group">
                            <span class="tag-group__title" style="margin-right:10px;">Dark</span>
                            {
                                node.items.map((item, index) =>
                                    <el-tag
                                        key={item.label}
                                        type={item.type}
                                        effect="dark">
                                        {item.label}
                                    </el-tag>
                                )

                            }
                        </div>
                        <div class="tag-group" style="margin-top:20px;">
                            <span class="tag-group__title" style="margin-right:10px;">Plain</span>
                            {
                                node.items.map((item, index) =>
                                    <el-tag
                                        key={item.label}
                                        type={item.type}
                                        effect="plain">
                                        {item.label}
                                    </el-tag>
                                )

                            }
                        </div>
                    </div>
                )
            } else if (node.type == 'fixedColumn') {
                return (
                    <div slot-scope={'scope'}>
                        <el-button v-on:click={() => this.superParams.handleClickTableColumn()} type="text" size="small">{node.eventName1}</el-button>
                        <el-button type="text" size="small">{node.eventName2}</el-button>
                    </div>
                )
            } else if (node.type == 'customHeader') {
                console.log("node.type == 'customHeader'");
                return (
                    <el-table-column align="right" width="200">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                v-model={this.searchHeaderVal}
                                size={node.size}
                                placeholder={node.placeholder} />
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
            } else if (node.type == 'showSummaryTable') {
                console.log("node.type == 'showSummaryTable'");
                return (
                    <el-table
                        data={this.superParams.eltable.tableData12}
                        border
                        height="200"
                        summary-method={this.superParams.getSummaries}
                        show-summary
                        style="width: 100%; margin-top: 20px">
                        <el-table-column
                            prop="id"
                            label="ID"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="amount1"
                            label="数值 1（元）">
                        </el-table-column>
                        <el-table-column
                            prop="amount2"
                            label="数值 2（元）">
                        </el-table-column>
                        <el-table-column
                            prop="amount3"
                            label="数值 3（元）">
                        </el-table-column>
                    </el-table>
                )
            } else if (node.type == 'rowspanTable') {
                console.log("node.type == 'rowspanTable'");
                return (
                    <el-table
                        data={this.superParams.eltable.tableData12}
                        border
                        span-method={this.superParams.arraySpanMethod}
                        style="width: 100%; margin-top: 20px">
                        <el-table-column
                            prop="id"
                            label="ID"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="amount1"
                            label="数值 1（元）">
                        </el-table-column>
                        <el-table-column
                            prop="amount2"
                            label="数值 2（元）">
                        </el-table-column>
                        <el-table-column
                            prop="amount3"
                            label="数值 3（元）">
                        </el-table-column>
                    </el-table>
                )
            } else if (node.type == 'colspanTable') {
                console.log("node.type == 'colspanTable'");
                return (
                    <el-table
                        data={this.superParams.eltable.tableData12}
                        border
                        span-method={this.superParams.objectSpanMethod}
                        style="width: 100%; margin-top: 20px">
                        <el-table-column
                            prop="id"
                            label="ID"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名">
                        </el-table-column>
                        <el-table-column
                            prop="amount1"
                            label="数值 1（元）">
                        </el-table-column>
                        <el-table-column
                            prop="amount2"
                            label="数值 2（元）">
                        </el-table-column>
                        <el-table-column
                            prop="amount3"
                            label="数值 3（元）">
                        </el-table-column>
                    </el-table>
                )
            } else if (node.type == 'alignmentRadio') {
                console.log("node.type == 'alignmentRadio'");
                return (
                    <el-radio-group v-model={this.superParams.alignmentLabelPosition} size="small">
                        <el-radio-button label="left">Left</el-radio-button>
                        <el-radio-button label="right">Right</el-radio-button>
                        <el-radio-button label="top">Top</el-radio-button>
                    </el-radio-group>
                )
            } else if (node.type == 'formDynamically') {
                console.log("node.type == 'formDynamically'");
                console.log(this.superParams.elform.dynamicValidateForm.domains);
                return (
                    <div>
                        {
                            this.superParams.elform.dynamicValidateForm.domains.map((domain, index) =>
                                <el-form-item
                                    label={'Domain' + index}
                                    key={index}
                                    prop={'domains.' + index + '.value'}
                                    rules={node.rules}
                                >
                                    <el-input v-model={domain.value}></el-input><el-button v-on:click={() => this.superParams.removeFormDynamicallyDomain(domain)}>Delete</el-button>
                                </el-form-item>
                            )
                        }
                    </div>
                )
            } else if (node.type == 'basicUsageTransfer') {
                console.log("node.type == 'basicUsageTransfer'");
                return (
                    <el-transfer
                        v-model={this.superParams.eltransfer.value}
                        data={this.superParams.eltransfer.data}>
                    </el-transfer>
                )
            } else if (node.type == 'filterableTransfer') {
                console.log("node.type == 'filterableTransfer'");
                return (
                    <el-transfer
                        filterable
                        filter-method={this.filterableTransferMethod}
                        filter-placeholder="State Abbreviations"
                        v-model={this.superParams.eltransfer.filterableValue}
                        data={this.superParams.eltransfer.filterableData}>
                    </el-transfer>
                )
            } else if (node.type == 'customizableTransfer') {

                console.log("node.type == 'customizableTransfer'");

      
                const format = {
                    'noChecked':'${total}',
                    'hasChecked':'${checked}/${total}'
                }
               
                return (
                    <div>
                        <p style="text-align: center; margin: 0 0 20px">Customize data items using render-content</p>
                        <div style="text-align: center">
                            <el-transfer
                            style="text-align: left; display: inline-block"
                            v-model={this.superParams.eltransfer.customizableValueValue}
                            filterable
                            left-default-checked={[2, 3]}
                            right-default-checked={[1]}
                            render-content={this.superParams.eltransfer.customizableRenderFunc}
                            titles={['Source', 'Target']}
                            button-texts={['To left', 'To right']}
                            format={format}
                            v-on:change={this.superParams.handleChangeCustomizable}
                            data={this.superParams.eltransfer.customizableValueData}>
                            <el-button class="transfer-footer" slot="left-footer" size="small">Operation</el-button>
                            <el-button class="transfer-footer" slot="right-footer" size="small">Operation</el-button>
                            </el-transfer>
                            <p style="text-align: center; margin: 50px 0 20px">Customize data items using scoped slot</p>
                            <div style="text-align: center">
                                <el-transfer
                                    style="text-align: left; display: inline-block"
                                    v-model={this.superParams.eltransfer.customizableValueValue4}
                                    filterable
                                    left-default-checked={[2, 3]}
                                    right-default-checked={[1]}
                                    titles={['Source', 'Target']}
                                    button-texts={['To left', 'To right']}
                                    format={format}
                                    v-on:change={this.superParams.handleChangeCustomizable}
                                    data={this.superParams.eltransfer.customizableValueData}>
                                    <el-button class="transfer-footer" slot="left-footer" size="small">Operation</el-button>
                                    <el-button class="transfer-footer" slot="right-footer" size="small">Operation</el-button>
                                </el-transfer>
                            </div >
                        </div >
                    </div >
                )
            } else if (node.type == 'propAliasesTransfer') {
                console.log("node.type == 'propAliasesTransfer'");
                return (
                    <el-transfer
                        v-model={this.superParams.eltransfer.propAliasesValue}
                        props={this.superParams.eltransfer.propAliasesProps}
                        data={this.superParams.eltransfer.customizableValueData}>
                    </el-transfer>
                )
            } else if (node.type == 'iconAttribute') {
                return (
                    <i class="el-icon-plus"></i>
                )
            } else if (node.type == 'iconUploadAttribute') {
                return (
                    <i class="el-icon-upload"></i>
                )
            } else if (node.type == 'customFileThumbnail') {
                console.log("node.type == 'customFileThumbnail'");
                return (
                    <div slot="file" slot-scope={'file'}>
                        <img
                            class="el-upload-list__item-thumbnail"
                            src={file.url} alt=""
                        />
                        <span class="el-upload-list__item-actions">
                            <span
                                class="el-upload-list__item-preview"
                                v-on:click={() => this.handleCustomFileThumbnailPictureCardPreview(file)}
                            >
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                                v-if={!this.customFileThumbnailDisabled}
                                class="el-upload-list__item-delete"
                                v-on:click={() => this.handleCustomFileThumbnailDownload(file)}
                            >
                                <i class="el-icon-download"></i>
                            </span>
                            <span
                                v-if={!this.customFileThumbnailDisabled}
                                class="el-upload-list__item-delete"
                                v-on:click={() => this.handleCustomFileThumbnailRemove(file)}
                            >
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                )
            } else if (node.type == 'fileListWithThumbnailTip') {
                console.log("node.type == 'fileListWithThumbnailTip'");
                return (
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                )
            } else if (node.type == 'dropFileText') {
                console.log("node.type == 'dropFileText'");
                return (
                    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                )
            } else if (node.type == 'manualUploadTrigger') {
                console.log("node.type == 'manualUploadTrigger'");
                return (
                    <el-button slot="trigger" size="small" type="primary">select file</el-button>
                )
            } else if (node.type == 'manualUploadServer') { 
                console.log("node.type == 'manualUploadServer'");
                return (
                    <el-button style="margin-left: 10px;" size="small" type="success" v-on:click={this.superParams.submitManualUpload}>upload to server</el-button>
                )
            } else if (node.type == 'fixedTimeRangeEndTimeType') { 
                console.log("node.type == 'fixedTimeRangeStartTimeType'");
                return (
                    <el-time-select
                        placeholder="End time"
                        v-model={this.superParams.eltimeselect.fixedTimeRangeEndTime}
                        picker-options={
                            {
                                start: '08:30',
                                step: '00:15',
                                end: '18:30',
                                minTime: this.superParams.eltimeselect.fixedTimeRangeStartTime
                            }
                        }>
                    </el-time-select>
                )
            } else if (node.type == 'extendedValueTypes') { 
                console.log("node.type == 'extendedValueTypes'");
                return (
                    <el-tooltip content={'Switch value: ' + this.superParams.elswitch.value5} placement="top">
                        <el-switch
                            v-model={this.superParams.elswitch.value5}
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="100"
                            inactive-value="0">
                        </el-switch>
                    </el-tooltip>
                )
            } else if (node.type == 'elinputUsingSlot') { 
                console.log("node.type == 'elinputUsingSlot'");
                return (
                    <div class="demo-input-suffix">
                        <span class="demo-input-label">Using slots</span>
                        <el-input
                            placeholder="Pick a date"
                            v-model={this.superParams.elinput.value8}>
                            <i slot="suffix" class="el-input__icon el-icon-date"></i>
                        </el-input>
                        <el-input
                            placeholder="Type something"
                            v-model={this.superParams.elinput.value9}>
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                )
            } else if (node.type == 'elinputTextarea') { 
                console.log("node.type == 'elinputTextarea'");
                return (
                    <el-input
                        type="textarea"
                        rows={2}
                        placeholder="Please input"
                        v-model={this.superParams.elinput.textarea1}>
                    </el-input>
                )
            } else if (node.type == 'elinputTextareaAutosize') { 
                console.log("node.type == 'elinputTextareaAutosize'");
                var autosize = { minRows: 2, maxRows: 4}
                return (
                    <el-input
                        type="textarea"
                        autosize={autosize}
                        placeholder="Please input"
                        v-model={this.superParams.elinput.textarea3}>
                    </el-input>
                )
            } else if (node.type == 'elMixedInput') { 
                console.log("node.type == 'elMixedInput'");
                return (
                    <div>
                        <el-input placeholder="Please input" v-model={this.superParams.elinput.value8}>
                            <template slot="prepend">Http://</template>
                        </el-input>
                        <el-input placeholder="Please input" v-model={this.superParams.elinput.value9}>
                            <template slot="append">.com</template>
                        </el-input>
                        <el-input placeholder="Please input" v-model={this.superParams.elinput.value10} class="input-with-select">
                            <el-select v-model={this.superParams.elinput.value11} slot="prepend" placeholder="Select">
                                <el-option label="Restaurant" value="1"></el-option>
                                <el-option label="Order No." value="2"></el-option>
                                <el-option label="Tel" value="3"></el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                )
            } else if (node.type == 'elInputAutocomplete') {
                console.log("node.type == 'elInputAutocomplete'");
                return (
                    <div>
                        <el-row class="demo-autocomplete">
                            <el-col span="12">
                                <div class="sub-title">list suggestions when activated</div>
                                <el-autocomplete
                                class="inline-input"
                                v-model={this.superParams.elautocomplete.state1}
                                fetch-suggestions={this.superParams.querySearchAutocomplete}
                                placeholder="Please Input"
                                v-on:select={this.superParams.handleSelectAutocomplete}
                                ></el-autocomplete>
                            </el-col>
                            <el-col span="12">
                                <div class="sub-title">list suggestions on input</div>
                                <el-autocomplete
                                class="inline-input"
                                v-model={this.superParams.elautocomplete.state2}
                                fetch-suggestions={this.superParams.querySearchAutocomplete}
                                placeholder="Please Input"
                                trigger-on-focus="false"
                                v-on:select={this.superParams.handleSelectAutocomplete}
                                ></el-autocomplete>
                            </el-col>
                        </el-row>
                    </div>
                )
            } else if (node.type == 'elInputAutocompleteRemoteSearch') {
                console.log("node.type == 'elInputAutocompleteRemoteSearch'");
                return (
                    <el-autocomplete
                    v-model={this.superParams.elautocomplete.state5}
                        fetch-suggestions={this.superParams.queryRemoteSearchAsync}
                        placeholder="Please input"
                        v-on:select={this.superParams.handleSelectAutocomplete}
                        ></el-autocomplete>
                )
            } else if (node.type == 'elInputLimitLength') {
                console.log("node.type == 'elInputLimitLength'");
                return (
                    <div>
                        <el-input
                            type="text"
                            placeholder="Please input"
                            v-model={this.superParams.elinput.value12}
                            maxlength="10"
                            show-word-limit
                        >
                        </el-input>
                        <div style="margin: 20px 0;"></div>
                        <el-input
                            type="textarea"
                            placeholder="Please input"
                            v-model={this.superParams.elinput.value13}
                            maxlength="30"
                            show-word-limit
                        >
                        </el-input>
                    </div>
                )
            } else if (node.type == 'elCheckboxIndeterminate') {
                console.log("node.type == 'elCheckboxIndeterminate'");
                return (
                    <div>
                        <el-checkbox indeterminate={this.superParams.elcheckbox.isIndeterminate1} v-model={this.superParams.elcheckbox.checkAll} v-on:change={this.superParams.handleCheckAllChange}>Check all</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model={this.superParams.elcheckbox.checkedCitie1} v-on:change={this.superParams.handleCheckedCitiesChange}>
                            {
                                this.superParams.elcheckbox.citie1.map((city, index) =>
                                    <el-checkbox
                                        label={city} 
                                        key={city}
                                    >
                                        {city}
                                    </el-checkbox>
                                )

                            }
                        </el-checkbox-group>
                    </div>
                )
            } else if (node.type == 'elCheckboxMinimum') {
                console.log("node.type == 'elCheckboxMinimum'");
                return (
                    <div>
                        <el-checkbox-group min={"1"} max={"2"} v-model={this.superParams.elcheckbox.checkedCitie2} v-on:change={this.superParams.handleCheckedCitiesChange}>
                            {
                                this.superParams.elcheckbox.citie1.map((city, index) =>
                                    <el-checkbox
                                        label={city} 
                                        key={city}
                                    >
                                        {city}
                                    </el-checkbox>
                                )

                            }
                        </el-checkbox-group>
                    </div>
                )
            } else if (node.type == 'elCheckboxButtonStyle') {
                console.log("node.type == 'elCheckboxButtonStyle'");
                return (
                    <div>
                        <div>
                            <el-checkbox-group v-model={this.superParams.elcheckbox.checkboxGroup1}>
                                {
                                    this.superParams.elcheckbox.citie1.map((city, index) =>
                                        <el-checkbox-button label={city} key={city}>{city}</el-checkbox-button>
                                    )
                                }
                            </el-checkbox-group>
                        </div>
                        <div style="margin-top: 20px">
                            <el-checkbox-group v-model={this.superParams.elcheckbox.checkboxGroup2} size="medium">
                                {
                                    this.superParams.elcheckbox.citie1.map((city, index) =>
                                        <el-checkbox-button label={city} key={city}>{city}</el-checkbox-button>
                                    )
                                }
                            </el-checkbox-group>
                        </div>
                        <div style="margin-top: 20px">
                            <el-checkbox-group v-model={this.superParams.elcheckbox.checkboxGroup3} size="small">
                                {
                                    this.superParams.elcheckbox.citie1.map((city, index) =>
                                        <el-checkbox-button label={city} key={city} disabled={city === 'Beijing'}>{city}</el-checkbox-button>
                                    )
                                }
                            </el-checkbox-group>
                        </div>
                        <div style="margin-top: 20px">
                            <el-checkbox-group v-model={this.superParams.elcheckbox.checkboxGroup4} size="mini" disabled>
                                {
                                    this.superParams.elcheckbox.citie1.map((city, index) =>
                                        <el-checkbox-button label={city} key={city}>{city}</el-checkbox-button>
                                    )
                                }
                            </el-checkbox-group>
                        </div>
                    </div>
                )
            } else if (node.type == 'elCheckboxWithBorder') {
                console.log("node.type == 'elCheckboxWithBorder'");
                return (
                    <div>
                        <div>
                            <el-checkbox v-model={this.superParams.elcheckbox.checked1} label="Option1" border></el-checkbox>
                            <el-checkbox v-model={this.superParams.elcheckbox.checked2} label="Option2" border></el-checkbox>
                        </div>
                        <div style="margin-top: 20px">
                            <el-checkbox v-model={this.superParams.elcheckbox.checked3} label="Option1" border size="medium"></el-checkbox>
                            <el-checkbox v-model={this.superParams.elcheckbox.checked4} label="Option2" border size="medium"></el-checkbox>
                        </div>
                        <div style="margin-top: 20px">
                            <el-checkbox-group v-model={this.superParams.elcheckbox.checkboxGroup5} size="small">
                            <el-checkbox label="Option1" border></el-checkbox>
                            <el-checkbox label="Option2" border disabled></el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div style="margin-top: 20px">
                            <el-checkbox-group v-model={this.superParams.elcheckbox.checkboxGroup6} size="mini" disabled>
                            <el-checkbox label="Option1" border></el-checkbox>
                            <el-checkbox label="Option2" border></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                )
            } else if (node.type == 'elRadioButtonGroup') {
                console.log("node.type == 'elRadioButtonGroup'");
                return (
                    <el-radio-group v-model={this.superParams.elradio.value3}>
                        <el-radio label={3}>Option A</el-radio>
                        <el-radio label={6}>Option B</el-radio>
                        <el-radio label={9}>Option C</el-radio>
                    </el-radio-group>
                )
            } else if (node.type == 'elRadioButtonStyle') {
                console.log("node.type == 'elRadioButtonStyle'");
                return (
                    <div>
                        <div>
                            <el-radio-group v-model={this.superParams.elradio.radio1}>
                                <el-radio-button label="New York"></el-radio-button>
                                <el-radio-button label="Washington"></el-radio-button>
                                <el-radio-button label="Los Angeles"></el-radio-button>
                                <el-radio-button label="Chicago"></el-radio-button>
                            </el-radio-group>
                        </div>
                        <div style="margin-top: 20px">
                            <el-radio-group v-model={this.superParams.elradio.radio2} size="medium">
                                <el-radio-button label="New York" ></el-radio-button>
                                <el-radio-button label="Washington"></el-radio-button>
                                <el-radio-button label="Los Angeles"></el-radio-button>
                                <el-radio-button label="Chicago"></el-radio-button>
                            </el-radio-group>
                        </div>
                        <div style="margin-top: 20px">
                            <el-radio-group v-model={this.superParams.elradio.radio3} size="small">
                                <el-radio-button label="New York"></el-radio-button>
                                <el-radio-button label="Washington" disabled ></el-radio-button>
                                <el-radio-button label="Los Angeles"></el-radio-button>
                                <el-radio-button label="Chicago"></el-radio-button>
                            </el-radio-group>
                        </div>
                        <div style="margin-top: 20px">
                            <el-radio-group v-model={this.superParams.elradio.radio4} disabled size="mini">
                                <el-radio-button label="New York"></el-radio-button>
                                <el-radio-button label="Washington"></el-radio-button>
                                <el-radio-button label="Los Angeles"></el-radio-button>
                                <el-radio-button label="Chicago"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                )
            } else if (node.type == 'elRadioWithBorder') {
                console.log("node.type == 'elRadioWithBorder'");
                return (
                    <div>
                        <div>
                            <el-radio v-model={this.superParams.elradio.radio5} label="1" border>Option A</el-radio>
                            <el-radio v-model={this.superParams.elradio.radio5} label="2" border>Option B</el-radio>
                        </div>
                        <div style="margin-top: 20px">
                            <el-radio v-model={this.superParams.elradio.radio6} label="1" border size="medium">Option A</el-radio>
                            <el-radio v-model={this.superParams.elradio.radio6} label="2" border size="medium">Option B</el-radio>
                        </div>
                        <div style="margin-top: 20px">
                            <el-radio-group v-model={this.superParams.elradio.radio7} size="small">
                            <el-radio label="1" border>Option A</el-radio>
                            <el-radio label="2" border disabled>Option B</el-radio>
                            </el-radio-group>
                        </div>
                        <div style="margin-top: 20px">
                            <el-radio-group v-model={this.superParams.elradio.radio8} size="mini" disabled>
                            <el-radio label="1" border>Option A</el-radio>
                            <el-radio label="2" border>Option B</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                )
            } else if (node.type == 'elIconCheck') {
                console.log("node.type == 'elIconCheck'");
                return (
                    <el-link>Check<i class="el-icon-view el-icon--right"></i> </el-link>
                )
            } else if (node.type == 'elButtonBasicUsage') {
                console.log("node.type == 'elButtonBasicUsage'");
                return (
                    <div>
                        <el-row>
                            <el-button>Default</el-button>
                            <el-button type="primary">Primary</el-button>
                            <el-button type="success">Success</el-button>
                            <el-button type="info">Info</el-button>
                            <el-button type="warning">Warning</el-button>
                            <el-button type="danger">Danger</el-button>
                        </el-row>

                        <el-row>
                            <el-button plain>Plain</el-button>
                            <el-button type="primary" plain>Primary</el-button>
                            <el-button type="success" plain>Success</el-button>
                            <el-button type="info" plain>Info</el-button>
                            <el-button type="warning" plain>Warning</el-button>
                            <el-button type="danger" plain>Danger</el-button>
                        </el-row>

                        <el-row>
                            <el-button round>Round</el-button>
                            <el-button type="primary" round>Primary</el-button>
                            <el-button type="success" round>Success</el-button>
                            <el-button type="info" round>Info</el-button>
                            <el-button type="warning" round>Warning</el-button>
                            <el-button type="danger" round>Danger</el-button>
                        </el-row>

                        <el-row>
                            <el-button icon="el-icon-search" circle></el-button>
                            <el-button type="primary" icon="el-icon-edit" circle></el-button>
                            <el-button type="success" icon="el-icon-check" circle></el-button>
                            <el-button type="info" icon="el-icon-message" circle></el-button>
                            <el-button type="warning" icon="el-icon-star-off" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </el-row>
                    </div>
                )
            } else if (node.type == 'elDisabledButton') {
                console.log("node.type == 'elDisabledButton'");
                return (
                    <div>
                        <el-row>
                            <el-button disabled>Default</el-button>
                            <el-button type="primary" disabled>Primary</el-button>
                            <el-button type="success" disabled>Success</el-button>
                            <el-button type="info" disabled>Info</el-button>
                            <el-button type="warning" disabled>Warning</el-button>
                            <el-button type="danger" disabled>Danger</el-button>
                        </el-row>

                        <el-row>
                            <el-button plain disabled>Plain</el-button>
                            <el-button type="primary" plain disabled>Primary</el-button>
                            <el-button type="success" plain disabled>Success</el-button>
                            <el-button type="info" plain disabled>Info</el-button>
                            <el-button type="warning" plain disabled>Warning</el-button>
                            <el-button type="danger" plain disabled>Danger</el-button>
                        </el-row>
                    </div>
                )
            } else if (node.type == 'elUploadButton') {
                console.log("node.type == 'elUploadButton'");
                return (
                    <el-button type="primary">Upload<i class="el-icon-upload el-icon-right"></i></el-button>
                )
            } else if (node.type == 'elButtonGroup') {
                console.log("node.type == 'elButtonGroup'");
                return (
                    <div>
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-arrow-left">Previous Page</el-button>
                            <el-button type="primary">Next Page<i class="el-icon-arrow-right el-icon-right"></i></el-button>
                        </el-button-group>
                        <el-button-group style="margin-left:30px;">
                            <el-button type="primary" icon="el-icon-edit"></el-button>
                            <el-button type="primary" icon="el-icon-share"></el-button>
                            <el-button type="primary" icon="el-icon-delete"></el-button>
                        </el-button-group>
                    </div>
                )
            } else if (node.type == 'elButtonSize') {
                console.log("node.type == 'elButtonSize'");
                return (
                    <div>
                        <el-row>
                            <el-button>Default</el-button>
                            <el-button size="medium">Medium</el-button>
                            <el-button size="small">Small</el-button>
                            <el-button size="mini">Mini</el-button>
                        </el-row>
                        <el-row>
                            <el-button round>Default</el-button>
                            <el-button size="medium" round>Medium</el-button>
                            <el-button size="small" round>Small</el-button>
                            <el-button size="mini" round>Mini</el-button>
                        </el-row>
                    </div>
                )
            } else if (node.type == 'elBasicUsageIcon') {
                console.log("node.type == 'elBasicUsageIcon'");
                return (
                    <div>
                        <i class="el-icon-edit" style="margin-right:15px;"></i>
                        <i class="el-icon-share" style="margin-right:15px;"></i>
                        <i class="el-icon-delete" style="margin-right:15px;"></i>
                        <el-button type="primary" icon="el-icon-search">Search</el-button>
                    </div>
                )
            } else if (node.type == 'elAvatarBasic') {
                console.log("node.type == 'elAvatarBasic'");
                let circleUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                let squareUrl = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                let sizeList = ["large", "medium", "small"]
                return (
                    <el-row class="demo-avatar demo-basic" style="width:800px">
                        <el-col span={12}>
                        <div class="sub-title">circle</div>
                        <div class="demo-basic--circle" style="display:flex;">
                            <div class="block"><el-avatar size="50" src={circleUrl}></el-avatar></div>
                            <div class="block">
                                {
                                    sizeList.map((size, index) =>
                                        <el-avatar size={size} src={circleUrl}></el-avatar>
                                    )
                                }
                            </div>
                        </div>
                        </el-col>  
                        <el-col span={12}>
                        <div class="sub-title">square</div>
                        <div class="demo-basic--circle" style="display:flex;">
                            <div class="block"><el-avatar shape="square" size="50" src={squareUrl}></el-avatar></div>
                            <div class="block">
                                {
                                    sizeList.map((size, index) =>
                                        <el-avatar shape="square" size={size} src={squareUrl}></el-avatar>
                                    )
                                }
                            </div>
                        </div>
                        </el-col> 
                    </el-row>
                )
            } else if (node.type == 'elAvatarSupport') {
                console.log("node.type == 'elAvatarSupport'");
                return (
                    <div class="demo-type" style="display:flex;">
                        <div>
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </div>
                        <div>
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                        <div>
                            <el-avatar> user </el-avatar>
                        </div>
                    </div>
                )
            } else if (node.type == 'elAvatarImageLoad') {
                console.log("node.type == 'elAvatarImageLoad'");
                return (
                    <div class="demo-type">
                        <el-avatar size="60" src="https://empty">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                        </el-avatar>
                    </div>
                )
            }  else {

                return h(
                    node.condition ? (Boolean(this.superParams[node.condition]) == node.conditionVal && node.tag) : node.tag,
                    {
                        class: node.class || '',
                        style: node.style || {},
                        props: node.props ? node.props : {
                            slot: node.props && node.props.slot || '',
                        },
                        attrs: {
                            src: node.props && node.props.src || '',
                        },
                        domProps: node.domProps || '',
                        directives: node.directives || '',
                        slot: node.slot || '',
                        ref: node.refName || '',
                    },
                    node.text
                        ? [h('span', node.text)] : node.childrenNode && node.childrenNode.length > 0 ? this.deepChildrenComponent(node, h) : this.$slots.default
                )
            }
        }
    },
    methods: {
        filterableTransferMethod(query, item) {
            return item.initial.toLowerCase().indexOf(query.toLowerCase()) > -1;
        },
        changeAdvancedUsagedisabled() {

            this.advancedUsagedisabled = !this.advancedUsagedisabled;
            console.log(this.advancedUsagedisabled);
        },
        deepChildrenComponent(nodeList, h) {
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
                    item.condition ? (Boolean(this.superParams[item.condition]) == item.conditionVal && item.tag) : item.tag,
                    {
                        class: item.class || '',
                        style: item.style || {},
                        props: item.props ? item.props : {
                            slot: item.props && item.props.slot || '',
                        },
                        attrs: {
                            src: item.props && item.props.src || '',
                        },
                        domProps: item.domProps || '',
                        directives: item.directives || '',
                        slot: item.slot || '',
                        ref: item.refName || '',

                    },
                    item.text
                        ? [h('span', item.text)] : item.childrenNode && item.childrenNode.length > 0 ? that.deepChildrenComponent(item, h) : that.$slots.default
                )
            })
        },
        changeValMethod(refName) {
            if (refName == 'elRadioGroup') {
                this.superParams.changeElTimelineGroupVal(refName);
            }
        },
        handleTabsEdit(targetName, action) {
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
        },
        handleCustomFileThumbnailRemove(file) {
            console.log(file);
        },
        handleCustomFileThumbnailPictureCardPreview(file) {
            this.customFileThumbnailDialogImageUrl = file.url;
            console.log(this.$refs);
            this.$refs.customFileThumbnailDialogVisible.visible = true
        },
        handleCustomFileThumbnailDownload(file) {
            console.log(file);
        },
        handleCustomFileThumbnailDialogClose(){
            console.log("handleCustomFileThumbnailDialogClose");
            this.$refs.customFileThumbnailDialogVisible.visible = false
        }
    }

}