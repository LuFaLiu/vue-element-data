<template>
    <div :class="parentNode.class">
        <component v-for="(item,index) in parentNode.childrenNode" :key="index" :parentNode="item" :is="item.componentName" />
    </div>
</template>
<script>
import elFormItem from '@/components/Page/elFormItem';
import customContent from '@/components/Page/customContent';
export default{
    inject: ['superParams'],
    components:{
      elFormItem,
      customContent
    },
    props:{
        parentNode:{
            type:Object,
            require:true
        }
    },
    mounted(){
      //console.log(this.parentNode);
    }
}
</script>
<style lang="scss" scoped>
    .accountList {
  .el-row {
    margin: 0 !important;
    padding: 20px;
    width: auto;
    background: #ffffff;
    border-radius: 8px;
  }

  .searchUser{
    padding: 20px;
    border-radius: 8px;
    background-color: #FFFFFF;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .searchForm {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .search-left {
      width: 80%;
      display: flex;
      flex-wrap: wrap;

      ::v-deep {
        .el-form-item__content {
          display: flex;
        }
      }
    }

    ::v-deep {
      .el-form-item {
        //margin-bottom: 0px;
        margin-right: 20px;
        .el-form-item__content {
          .el-input {
            width: 145px;
          }
        }
      }
    }

    .el-button {
      color: #ffffff;
      border: none;
      border-radius: 5px;
    }
    .addAccountBtn {
      background: #20d4b1;
    }
    .searchAccount {
      width: 150px;
    }
  }

  .editBtn {
    color: #336ff6 !important;
  }

  .delBtn {
    color: #ff0000 !important;
    margin-left: 20px;
  }

  .account-bottom {
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .export_data {
      width: 115px;
      color: #ffffff;
      border: none;
    }
    .el-pagination {
      margin-left: 40%;
    }
  }

  .accountTable {
    margin-top: 20px;
    border-radius: 8px;
  }
}
</style>
