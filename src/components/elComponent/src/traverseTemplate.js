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
        console.log(node);
        
        const elTraverseTemplate = node.componentName == 'elRadioGroup' ? (

            <el-radio-group v-model={this.resetvModel}>
                {
                   parent.superParams[node.radioListName].map((v,index) => <el-radio label={v.lable} key={index} >{parent.$t(v.name)}</el-radio>)
                }
           </el-radio-group>         

        ) :  (<span>operation</span>)

        return elTraverseTemplate;

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