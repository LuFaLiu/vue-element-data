<template>
    <el-upload
        :action="parentNode.action"
        :limit="parentNode.limit"
        :on-change="uploadChange"
        :on-exceed="uploadExceed"
        :auto-upload="parentNode.autoUpload"
        :show-file-list="parentNode.showFileList"
        :class="parentNode.class"
        :ref="parentNode.ref"
    >
        <slot name="uploadFormSlot"></slot>
    </el-upload>
</template>
<script>
    export default{
        inject: ['superParams'],
        props:{
            parentNode:{
                type:Object
            }
        },
        methods:{
            uploadChange(file,fileList){ 
                var eventName = this.uploadNode.changeEventName;
                this.superParams[eventName]({file:file,fileList:fileList});
            },
            uploadExceed(file,fileList){
                var eventName = this.uploadNode.exceedEventName;
                this.superParams[eventName]({file:file,fileList:fileList});
            }
            
        }
    }
</script>
<style lang="scss" scoped>
    .uploadImage {
        margin-top: 20px;
        ::v-deep{
            .el-upload {
                display: flex!important;
                flex-direction: column;
                align-items: flex-start;
            }
            .el-upload-list__item {
                background-color: transparent !important;
            }
            .el-upload__tip {
                padding-top: 15px;
                color: #000000;
                font-size: 14px;
            }
        }
    }
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
        width: 80px;
        .el-input {
          width: 100%;
        }
      }
    }
</style>
