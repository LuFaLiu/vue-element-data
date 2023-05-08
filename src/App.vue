<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import _ from 'lodash'
import pageConfigApi from "@/api/pageConfigApi"
export default {
  name: 'App',
  provide(){
    return {
      appParams:this
    }
  },
  watch: {
    $route(to, from) {
      if (to.path != '/login' && to.path != '/index') {
        const obj = {
          name: to.name,
          title: to.meta.title
        }
        this.$store.commit('addTab', obj);
        this.getPageNodeMethod(to.name);
      }
    }
  },
  data(){
    return {
      pageData:''
    }
  },
  mounted(){
    const type = navigator.appName;
    if (type == "Netscape"){
      var lang = navigator.language; 
    }else{
      var lang = navigator.userLanguage; //IE5+ == navigator.systemLanguage
    };
    var lang = lang.substr(0, 2);
    this.$i18n.locale = lang;
    this.$store.dispatch('setLanguage', lang);
  },
  methods:{
    async getPageNodeMethod(val){
      var that = this;
      await pageConfigApi.getPageNode(val).then(res=>{
        if(res.data.data.length > 0){
          that.pageData = that.conversionPageData(res.data.data[0].node,[])[0].childrenNode[0];
          that.pageData.pageName = res.data.data[0].pageName;
        }
      })
    },
    //tree
    conversionPageData(list,item){
      var that = this;
      list.filter(v=>{
        let obj = {}
        obj['componentName'] = v.label;
        if(v.componentRule){
          _.forEach(v.componentRule,function (val,key) {
            obj[key] = val;
          })
        }
        item.push(obj);
        if(v.children){
          that.$set(obj,'childrenNode',[]);
          return that.conversionPageData(v.children,obj['childrenNode']);
        }
      })
      return item;
    }
     
  }
}

</script>

<style>
	html, body, #app {
		font-family: 'Source Han Sans CN';
		height: 100%;
		padding: 0;
		margin: 0;
		font-size: 15px;
	}

  .el-message-box{
    box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.44313725490196076)!important;
    border-radius: 8px 8px 8px 8px!important;
  }

  .el-message-box__title{
    font-size: 20px!important;
    font-weight: 400!important;
    color: #000000!important;
  }

  .el-message-box__message{
    font-size: 16px!important;
    font-weight: 400!important;
    color:#333333!important;
  }

  .el-message-box__btns{
    padding: 63px 15px 0!important;
  }

  .el-message-box__btns > .el-button{
    padding: 10px 32px;
    margin-left: 20px;
    border-radius: 5px 5px 5px 5px;
    font-size: 16px;
    line-height: 15px;
  }

  .el-message-box__btns > .el-button--default{
    border: 1px solid #336FF6;
    color: #336FF6;
  }

  .el-message-box__btns > .el-button--default:hover{
    border: 1px solid #336FF6;
    background-color: transparent;
    color: #336FF6;
  }

  .el-message-box__btns > .el-button--primary,.el-message-box__btns > .el-button--primary:hover{
    color: #FFFFFF!important;
    background: #336FF6!important;
    border: 1px solid #336FF6!important;
  }

  .dialog-footer > .el-button--default{
    border: 1px solid #336FF6;
    color: #336FF6;
  }

  .dialog-footer > .el-button--default:hover{
    border: 1px solid #336FF6;
    background-color: transparent;
    color: #336FF6;
  }

  .dialog-footer > .el-button--primary,.dialog-footer > .el-button--primary:hover{
    color: #FFFFFF!important;
    background: #336FF6!important;
    border: 1px solid #336FF6!important;
  }

</style>
<style lang="scss" scoped>

  ::v-deep{
     /* common */

    .dataCout_title{
      text-align: left;
      font-size: 18px;
      font-weight: 400;
      color: #181818;
      text-indent: 14px;
      position: relative;
      &::before{
        content: "";
        position: absolute;
        top: 18%;
        left: 0;
        width: 4px;
        height: 18px;
        background: #336FF6;
        opacity: 1;
        border-radius: 0px;
      }
    }

    .el-dialog,.el-message-box__wrapper{
      box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.44313725490196076)!important;
      border-radius: 8px 8px 8px 8px!important;
      .el-dialog__title{
        font-size: 20px;
        font-weight: 400;
        color: #000000;
      }
      .el-form-item__label{
        font-size: 15px;
        font-weight: 400;
        color: #333333;
      }
      .el-input__inner{
        border-radius: 5px 5px 5px 5px;
        border: 1px solid #CCCCCC;
        color: #333333;
      }
      .el-dialog__header{
        padding: 20px 30px;
      }
      .el-dialog__body{
        padding: 16px 30px 0 30px;
      }

      .el-dialog__footer{
        padding: 10px 30px 20px 30px;
        text-align: center;
        .dialog-footer{
          padding-left: 50px;
        }
        .el-button{
          padding: 10px 32px;
          margin-left: 20px;
          border-radius: 5px 5px 5px 5px;
          font-size: 16px;
          line-height: 15px;
        }

        .el-button--default{
          border: 1px solid #336FF6;
          color: #336FF6;
        }

        .el-button--default:hover{
          background-color: transparent;
        }

        .el-button--primary{
          background: #336FF6;
          border: 1px solid #336FF6;
        }

      }
    }

    .el-table {
      .el-table__fixed,.el-table__fixed-header-wrapper,.el-table__header,.el-table__body {
        width: 100% !important;
      }

      .defaultWidth .cell {
        width: 100% !important;
      }
    }


    .el-table th.el-table__cell>.cell{
      font-size: 15px;
      font-weight: 550;
      color: #333333;
    }

    .el-table__body-wrapper::-webkit-scrollbar{
      width: 10px;
      height: 10px;
    }

    .el-table__body-wrapper::-webkit-scrollbar-thumb{
      border-radius: 6px;
      background-color: #DDDDDD;
    }

    .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{
      background: #F9F9F9;
    }

    /*el-pagination style */
    .el-pagination {
      .el-pager li,.el-pagination button:disabled,.btn-next, .btn-prev {
        background: transparent !important;
      }
    }
    
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      color: #409EFF !important;
    }
    /*
    .el-pagination {
      .btn-prev{
        margin-right: 14px;
        padding: 0!important;
      }

      .btn-next{
        margin-left: 14px;
        padding: 0!important;
      }

      

      .el-pagination__editor.el-input .el-input__inner{
        width: 38px;
        height: 38px;
        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
        border-radius: 5px;
      }

      .el-pager{
        li{
          margin: 0 6px;
          min-width: 38px;
          height: 38px;
          line-height: 38px;
          box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
          border-radius: 5px;
          &:hover{
            color: #FFFFFF;
            background: #336FF6;
          }
        }
        .active{
          color: #FFFFFF;
          background: #336FF6;
        }

      }
    }

    .el-pagination button, .el-pagination span:not([class*=suffix]){
      height: 38px;
      line-height: 38px;
    }

    .el-pager li.btn-quicknext, i.btn-quickprev{
      line-height: 38px;
    }

    .el-pagination {
      display: flex;
      align-items: center;
    }

    .el-pagination--small .el-pager li:last-child {
      margin: 0 6px;
      min-width: 38px;
      height: 38px;
      line-height: 38px;
      -webkit-box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
      border-radius: 5px;
    }

    .el-pager, .el-pager li {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .el-pagination__total{
      color: #999999;
      font-size: 16px;
      margin-left: 30px;
    }

    .el-pagination__jump{
      font-size: 16px;
      font-weight: 400;
      color: #333333;
      margin-left: 14px;
    }

  
    .el-pagination button{
      min-width: 38px;
      height: 38px;
      line-height: 38px;
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16);
      border-radius: 5px;

      
      .el-icon{
        font-size: 18px;
      }
      .btn-next {
        padding-left: 10px;
      }
    }
    */

    .el-pagination__jump{
      cursor: pointer;
    }


    .mic-btn-primary{
      background: #336FF6!important;
      border-radius: 5px!important;
      color: #FFFFFF!important;
    }

    .mic-btn-primary:hover,.mic-btn-primary:focus{
      background: #336FF6!important;
      border-radius: 5px!important;
    }

    
    
    .el-date-editor{
      width: 230px!important;
      .el-icon-date:before {
          content: "";
          position: absolute;
          width: 17px;
          height: 17px;
          top: 9px;
          left: 8px;
          background-size: 100%;
          background-image: url(./static/icon/recordPicker.svg);
      }
  }


  }

  
</style>
