<template>
    <el-dialog
      :ref="parentNode.refName || ''"
      :title="filteri18n(parentNode.title) "
      :visible.sync="superParams[parentNode.dialogShowName]"
      :width="parentNode.width"
      :before-close="beforeClose"
      :center="parentNode.center"
    >
        <component v-for="(item,index) in parentNode.childrenNode" :key="index" :parentNode="item" :is="item.componentName" />
    </el-dialog>
</template>
<script>
import { filteri18n } from '@/utils/index'
export default{
    inject:['superParams'],
    components:{
        elForm: () => import('./elForm.vue')
    },
    props:{
        parentNode:{
            type:Object,
            require:true,
        }
    },
    methods: {
        filteri18n,
        beforeClose(){
          this.superParams[this.parentNode.closeMethodName]();
        }
    }
}
</script>
<style lang="scss" scoped>
  .dialog-footer {
    text-align: center;
    padding: 28px 0 32px 0;
    ::v-deep {
      .el-form-item__content {
        margin: 0 !important;
      }
      .el-button {
        padding: 10px 32px;
        border-radius: 5px;
      }
    }
  }
  ::v-deep{
    .v-modal {
      display: none !important;
    }

    .el-form-item__content {
      .el-dialog__wrapper {
        z-index: 2050 !important;
        position: fixed !important;
        .el-dialog {
          width: 19% !important;
        }
      }
    }
    .el-progress {
      left: 75% !important;
      top: 50% !important;
      .el-progress-circle {
        width: 80px !important;
        height: 80px !important;
      }
      .el-progress__text {
        left: -18% !important;
      }
      .el-progress-circle::before,
      .el-progress-circle::after {
        display: none;
      }
    }
    .el-upload-list__item {
      background-color: transparent !important;
    }

    .el-form-item__content {
      line-height: 0 !important;
    }

    .el-dialog__body {
      height: 65vh;
      padding-bottom: 20px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: #c1c1c1;
      }
      .el-input {
        width: 70%;
      }
      .el-select {
        width: 160px;
        .el-input {
          width: 100%;
        }
      }
    }
  }
</style>
