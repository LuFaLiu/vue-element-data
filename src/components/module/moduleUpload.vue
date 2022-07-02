<template>
  <el-form-item :label="lang + data.id + '：'" class="is-required">
    <el-input
      v-model="paramsData.title"
      clearable
      :placeholder="$t('placeholder.pleaseEnter') + $t('moduleUplad.describe')"
      autocomplete="off"
    />
    <el-upload
      action=""
      :on-change="handleAppTitleChange"
      :auto-upload="false"
      :show-file-list="false"
      class="uploadImage"
      ref="uploadImage"
    >
      <img
        v-if="paramsData.url"
        :src="paramsData.url"
        class="uploadImage-avatar"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div
      class="el-form-item__error"
      v-if="!(paramsData.url && paramsData.title)"
    >
      {{$t('moduleUplad.descriptionAndPicture')}}
    </div>
    <el-popconfirm
      class="deleteReference"
      v-if="data.id > 1"
      :title="$t('moduleUplad.whetherDeleteModule')"
      @confirm="confirmDelete(data.id)"
    >
      <el-button slot="reference">{{$t('moduleUplad.deleteModule')}}</el-button>
    </el-popconfirm>
  </el-form-item>
</template>
<script>
export default {
  props: ["data", "lang"],
  data() {
    return {
      paramsData: {
        title: "",
        url: "",
        file: "",
      },
    };
  },
  watch: {
    data: function (val) {
      this.$refs.uploadImage.clearFiles();
      this.paramsData = val.paramsData;
    },
  },
  created() {
    if (!!(this.data.paramsData.title && this.data.paramsData.url)) {
      this.paramsData = this.data.paramsData;
    } else {
      this.paramsData.title = "";
      this.paramsData.url = "";
      this.paramsData.file = "";
    }
  },
  methods: {
    //single file
    handleAppTitleChange(file) {
      var extension = this.uploadFileCondition(file);
      if (!extension) {
        this.$message({
          showClose: true,
          message: this.$t('moduleUplad.incorrectFile'),
          type: "warning",
        });
        return false;
      } else {
        this.paramsData.url = URL.createObjectURL(file.raw);
        this.paramsData.file = file;
      }
    },
    //check file format
    uploadFileCondition(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        testmsg === "jpg" ||
        testmsg === "png" ||
        testmsg === "jpeg" ||
        testmsg === "bmp" ||
        testmsg === "gif";
      return extension;
    },
    //delete current model
    confirmDelete(e) {
      this.$emit("deleteCurrentMoule", e);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-form-item {
  position: relative;
  margin-bottom: 45px;
}
.el-form-item__error {
  margin-top: 10px;
}

.deleteReference {
  position: absolute;
  top: 2%;
  right: 8%;
  button {
    padding: 10px;
    color: #ffffff;
    background-color: rgb(230, 162, 60) !important;
    border: 1px solid rgb(230, 162, 60) !important;
  }
}

.uploadImage {
  margin-top: 20px;
  overflow-y: scroll;
  width: 123px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #c1c1c1;
  }

  .uploadImage-avatar {
    width: 105px;
    height: 105px;
    background-size: cover;
  }

  ::v-deep {
    .el-upload-list__item {
      width: 105px;
      height: 157px;
      background: #3c3c3c;
      border-radius: 0px;
      margin: 0 30px 20px 0;
    }
    .el-upload {
      width: 105px;
      height: 105px;
      border: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      border-radius: 0px 0px 0px 0px;
      .el-icon-plus {
        font-size: 48px;
      }
      div {
        line-height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    }
  }
}
</style>
