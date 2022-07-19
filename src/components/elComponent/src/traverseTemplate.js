import { dynamicvModel } from '@/utils/index'
export default {
    name:'TraverseTemplate',
    props:{
        node:{},
        parent:{}
    },
    render(h){
        const node = this.node;
        const parent = this.parent;
        const elRadioGroup = (
            <el-radio-group v-model={this.resetvModel}>
                {
                   parent.superParams[node.radioListName].map((v,index) => <el-radio label={v.lable} key={index} >{parent.$t(v.name)}</el-radio>)
                }
           </el-radio-group>         
        )

        return node.componentName == 'elRadioGroup' ? elRadioGroup : (<span>operation</span>);

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