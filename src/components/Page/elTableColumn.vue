<template>
    <div>

      <el-table-column
        v-if="parentNode.type == 'index'"
        :type="parentNode.type"
        :label="$t(parentNode.label)"
        :width="parentNode.width"
        align="center"
        :index="indexMethod"
        key="2"
      />

      <el-table-column 
        :width="parentNode.width" 
        :align="parentNode.align ? parentNode.align : ''"
        :label="$t(parentNode.label)"
        :key="(columnIndex+3)"
        v-else
        >

        <template slot-scope="scope">
            <div v-if="parentNode.value">
                <span v-if="parentNode.formatDate">{{ getObjKey(scope.row,parentNode.value) | formatDate }}</span>
                <span v-else>{{ getObjKey(scope.row,parentNode.value) }}</span>
            </div>
            <div v-if="parentNode.operation">
               
                <component v-for="(item,index) in parentNode.childrenNode" :rowData="scope.row" :key="index" :parentNode="item" :is="item.componentName" />
               
            </div>
        </template>

      </el-table-column>

      <!--It has to be at the bottom, otherwise it will be in the last column-->
      <el-table-column v-if="parentNode.type == 'selection'" key="1" :type="parentNode.type" :width="parentNode.width" align="center" />  
      
      
    </div>
</template>
<script>
    import elButton from './elButton'
    export default{
        inject: ['superParams'],
        components:{
            elButton
        },
        props:{
            parentNode:{
                type:Object
            },
            columnIndex:{
                type:Number
            }
        },
        methods:{
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
            btnClick(eventName){
                this.superParams[eventName]();
            },
            paramBtnClick(eventName,val){
                this.superParams[eventName](val);
            }
        }
    }
</script>