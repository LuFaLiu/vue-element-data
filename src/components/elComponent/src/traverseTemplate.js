import { dynamicvModel } from '@/utils/index'
export default {
    name: 'TraverseTemplate',
    props: {
        node: {},
        parent: {},
        props: {}
    },
    render(h) {
        const node = this.node;
        const parent = this.parent;
        const props = this.props
        console.log(node);


        if (node.componentName == 'elRadioGroup') {

            return (
                <el-radio-group v-model={this.resetvModel}>
                    {
                        parent.superParams[node.radioListName].map((v, index) => <el-radio label={v.lable} key={index} >{parent.$t(v.name)}</el-radio>)
                    }
                </el-radio-group>
            )
        } else if (node.uniqueIdentifier == 'fixedHeaderAndColumn') {
            return (
                <div slot-scope="scope">
                    <el-button v-on:click={() => parent.superParams.deleteFixedHeaderAndColumn(props.$index)} type="text" size="small">Remove</el-button>
                </div>
            )
        } else if (node.uniqueIdentifier == 'elMultipleSelectType') {
            console.log("node.uniqueIdentifier == 'elMultipleSelectType'");
            console.log(node);
            console.log(parent);
            console.log(props);
            return (
                <div slot-scope="scope">
                    {props.row.date}
                </div>
            )
        } else if (node.uniqueIdentifier == 'tagScope') {
            console.log("node.uniqueIdentifier == 'tagScope'");
            console.log(node);
            console.log(parent);
            console.log(props);
            return (
                <el-tag
                    type={props.row.tag === 'Home' ? 'primary' : 'success'}
                    disable-transitions
                >
                    {props.row.tag}
                </el-tag>
            )
        } else if (node.uniqueIdentifier == 'customIconDate') {
            console.log("node.uniqueIdentifier == 'customIconDate'");
            console.log(node);
            console.log(parent);
            console.log(props);
            return (
                <div>
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{props.row.date}</span>
                </div>
            )
        } else if (node.uniqueIdentifier == 'customHoverName') {
            console.log("node.uniqueIdentifier == 'customHoverName'");
            console.log(node);
            console.log(parent);
            console.log(props);
            return (
                <el-popover trigger="hover" placement="top">
                    <p>Name: {props.row.name}</p>
                    <p>Addr: {props.row.address}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{props.row.name}</el-tag>
                    </div>
                </el-popover>
            )
        } else if (node.uniqueIdentifier == 'customOperations') {
            console.log("node.uniqueIdentifier == 'customOperations'");
            console.log(node);
            console.log(parent);
            console.log(props);
            return (
                <div>
                    <el-button
                        size="mini"
                        v-on:click={parent.superParams.handleCustomColumnEdit(props.$index, props.row)}>Edit</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        v-on:click={parent.superParams.handleCustomColumnDelete(props.$index, props.row)}>Delete</el-button>
                </div>
            )
        } else if (node.uniqueIdentifier == 'expandableRow') {
            console.log("node.uniqueIdentifier == 'expandableRow'");
            console.log(node);
            console.log(parent);
            console.log(props);
            return (
                <div>
                    <p>State: {props.row.state}</p>
                    <p>City: {props.row.city}</p>
                    <p>Address: {props.row.address}</p>
                    <p>Zip: {props.row.zip}</p>
                </div>
            )
        } else if (node.uniqueIdentifier == 'customFileThumbnail') {
            console.log("node.uniqueIdentifier == 'customFileThumbnail'");
            console.log(node);
            console.log(parent);
            console.log(props);
            return (
                <div slot="file" slot-scope="{file}">
                    <img
                        class="el-upload-list__item-thumbnail"
                        src={props.file.url} alt=""
                    />
                    <span class="el-upload-list__item-actions">
                        <span
                            class="el-upload-list__item-preview"
                            v-on:click={() => parent.superParams.handleCustomFileThumbnailPictureCardPreview(props.file)}
                        >
                            <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                            v-if={!parent.superParams.elupload.customFileThumbnailDisabled}
                            class="el-upload-list__item-delete"
                            v-on:click={() => parent.superParams.handleCustomFileThumbnailDownload(props.file)}
                        >
                            <i class="el-icon-download"></i>
                        </span>
                        <span
                            v-if={!parent.superParams.elupload.customFileThumbnailDisabled}
                            class="el-upload-list__item-delete"
                            v-on:click={() => parent.superParams.handleCustomFileThumbnailRemove(props.file)}
                        >
                            <i class="el-icon-delete"></i>
                        </span>
                    </span>
                </div>
            )
        } else {
            return (<span>operation</span>)
        }

    },
    computed: {
        resetvModel: {
            get() {
                return dynamicvModel(this.parent.superParams, this.node.vModel, '', 'get');
            },
            set(val) {
                dynamicvModel(this.parent.superParams, this.node.vModel, val, 'set');
            }
        }
    }

}