import { dynamicvModel } from '@/utils/index'
export default {
    name:'TraverseTemplate',
    props:{
        node:{},
        parent:{},
        props:{},
    },
    render(h){
        const node = this.node;
        const parent = this.parent;
        const props = this.props
        console.log(node);

         
        if(node.componentName == 'elRadioGroup') {

            return (
                <el-radio-group v-model={this.resetvModel}>
                    {
                    parent.superParams[node.radioListName].map((v,index) => <el-radio label={v.lable} key={index} >{parent.$t(v.name)}</el-radio>)
                    }
            </el-radio-group>    
           )     
        }else if (node.uniqueIdentifier == 'fixedHeaderAndColumn') {
            return (
                <div slot-scope="scope">
                    <el-button v-on:click={ () => parent.superParams.deleteFixedHeaderAndColumn(props.$index) } type="text" size="small">Remove</el-button>
                </div>
            )
        }else {
            return (<span>operation</span>)
        }          

    },
    computed:{
        resetvModel:{
            get(){
                return dynamicvModel(this.parent.superParams,this.node.vModel,'','get');
            },
            set(val){
                dynamicvModel(this.parent.superParams,this.node.vModel,val,'set');
            }
        }
    }

}