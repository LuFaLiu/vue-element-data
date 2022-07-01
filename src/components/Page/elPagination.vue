<template>
  <div :class="parentNode.class">
    <el-pagination
      :layout="parentNode.layout"
      :page-sizes="parentNode.pageSize"
      :current-page="superParams[parentNode.params]['current']"
      :page-size="superParams[parentNode.params]['size']"
      :total="superParams[parentNode.params]['total']"
      @size-change="sizeChange"
      @current-change="currentChange"
      :ref="parentNode.refName || ''"
    />
  </div>
</template>
<script>
export default {
  inject: ['superParams'],
  props: {
    parentNode: {
      type: Object,
      require: true,
    },
  },
  methods:{
      sizeChange(val){
          this.superParams[this.parentNode.sizeChangeName](val);
      },
      currentChange(val){
          this.superParams[this.parentNode.currentChangeName](val);
      }
  }
};
</script>
<style lang="scss" scoped>
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
</style>
