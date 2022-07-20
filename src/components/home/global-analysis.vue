<template>
  <div>
    <div class="grid-left bg-purple dataCount" align="center">
      <div class="dataCout_title">{{this.$t('homePage.dataStatistics')}}</div>
      <el-row :gutter="18" class="dataCount_type">
        <el-col :span="6">
          <div class="grid-content inner-bg-purple" align="center">
            <span class="dataCount_num">{{ userDetails.dayOfRegister }}</span>
            <span class="dataCount_name">{{ this.$t('homePage.todayRegister') }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content inner-bg-blue" align="center">
            <span class="dataCount_num">{{ userDetails.userCount }}</span>
            <span class="dataCount_name">{{ this.$t('homePage.userCount') }}</span>
          </div></el-col>
        <el-col :span="6">
          <div class="grid-content inner-bg-yellow" align="center">
            <span class="dataCount_num">{{ userDetails.dayOfActive }}</span>
            <span class="dataCount_name">{{ this.$t('homePage.dayOfActive') }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content inner-bg-deepBlue" align="center">
            <span class="dataCount_num">{{ userDetails.monthOfActive }}</span>
            <span class="dataCount_name">{{ this.$t('homePage.monthOfActive') }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <br>
    <div class="grid-left bg-purple globalUserDistribution">
      <div class="dataCout_title">{{this.$t('homePage.globalUserDistribution')}}</div>
      <div id="myQueueEchart" style="min-height: 360px;" />
    </div>
    <br>
    <div class="grid-left bg-purple newUsers">
      <div class="dataCout_title">{{this.$t('homePage.newUsers')}}</div>
      <div id="myEchart" style="min-height: 350px;" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
import {countryList} from '@/utils/allCountry.js';
import {countryNameList} from '@/utils/countryName.js';
export default {
  name: 'GlobalAnalysis',
  props: {
    userDetails: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        columns: [],
        rows: []
      },
      option:{},
      myChart:'',
      register7DayDateArr: [],
      register7DayValueArr: [],
      register30DayDateArr: [],
      register30DayValueArr: [],
      colorLists: [
        'rgb(229, 0, 19)',

        'rgb(206,194,28)',

        'rgb(0,161,233)',

        'rgb(109,185,45)',

        'rgb(166,0,130)',

        'rgb(237,108,0)',

        'rgb(240, 28, 131)',

        'rgb(84, 21, 226)',

        'rgb( 0,128,0)',

        'rgb( 255,69,0)',

        'rgb( 255,165,0)',

        'rgb( 178,34,34)',

        'rgb( 255,0,255)',

        'rgb(65,105,225)'
      ]
    }
  },
  watch:{
    option: {  
      handler(newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal);
          } else {
            this.myChart.setOption(oldVal);
          }
        } else {
          this.init();
        }
      },
      deep: true 
    },
    'userDetails.globalUserPercent':{
      handler(newVal) {
        this.drawLineChart();
        this.myqueEcharts(newVal.globalUserPercent);
      },
      deep: true 
    }

  },

  mounted() {
    this.drawLineChart();
    this.myqueEcharts();
  },
  beforeDestroy() {
    if (!this.chart) { return }
    this.chart.dispose()
    this.chart = null
  },
  methods: {

    init(){
      var myChart = this.$echarts.init(document.getElementById('myQueueEchart'))
      myChart.setOption(this.option,true)
    },

    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#67c23a'
      } else if (percentage < 50) {
        return '#e6a23c'
      } else {
        return '#f56c6c'
      }
    },

    drawLineChart() {
      var that = this;
      var chartDom = document.getElementById('myEchart');
      var myChart = this.$echarts.init(chartDom);
      const register7Day = this.userDetails.register7Day;
      this.register7DayDateArr = _.keys(register7Day);
      this.register7DayValueArr = _.values(register7Day);
      const register30Day = this.userDetails.register30Day;
      this.register30DayDateArr = _.keys(register30Day);
      this.register30DayValueArr = _.values(register30Day);
      

      var mainOption = {
        title: {
          //text: this.$t('homePage.increaseUserMap')
        },
        grid:{
          left:'6%', 
          width:'92%' 
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          animation:false,
          icon:'none',
          data: [ 
            {
                name:this.$t('homePage.increaseOf7Day'),textStyle:{ 
                color: '#FFFFFF',
                padding:[5,5,1,5],
                backgroundColor:'#336FF6'
            }} ,
            {name:this.$t('homePage.increaseOf30Day')} 
          ], 
          selectedMode: 'single'
        },
        xAxis: {
          axisTick:{ 
            show:false
          },
          axisLine:{
            show: true,
            lineStyle:{
              width:1,
              color:'rgba(51, 51, 51, 0.1)'
            }
          },
          data: this.register7DayDateArr,
          axisLabel:{
            interval:1,
            fontSize:10,
            color: '#50697A',
            formatter:function (val) {
              return val.substr(5).replace(/\-/,'/');
            } 
          },
          boundaryGap:false 
        },
        yAxis: {
          axisLabel:{
            fontSize:14,
            margin:23,
            color: '#50697A',
            formatter:function(value){ 
              return value+"";
            }
          }
        },
        series: [{
          selectedMode:'true',
          lineStyle:{
            color:'#88CCFF'
          },
          symbol:'circle',
          symbolSize:10,
          itemStyle:{ 
            normal: { 
              color: "#88CCFF", 
            },
            emphasis:{
              color:'#336FF6',
              borderColor:'#FFFFFF',
              borderWidth:1,
              shadowColor:'#336FF6',
              shadowBlur:5,
              lineStyle:{
                color:'#336FF6'
              }
            },
          },
          areaStyle:{
            color:{
                
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgba(0, 145, 255, 0.4)', 
                }, {
                    offset: 1, color: 'rgba(255, 255, 255, 0)', 
                }],
                global: false, 
            },
          },
          name: this.$t('homePage.increaseOf7Day'),
          type: 'line',
          smooth: true,
          data: this.register7DayValueArr
        },
        {
          lineStyle:{
            color:'#88CCFF'
          },
          symbol:'circle',
          symbolSize:10,
          itemStyle:{ 
            normal: { 
              color: "#88CCFF", 
            },
            emphasis:{ 
              color:'#336FF6',
              borderColor:'#FFFFFF',
              borderWidth:1,
              shadowColor:'#336FF6',
              shadowBlur:5,
              lineStyle:{
                color:'#336FF6'
              }
            },
          },
          areaStyle:{
            color:{
               
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgba(0, 145, 255, 0.4)', 
                }, {
                    offset: 1, color: 'rgba(255, 255, 255, 0)', 
                }],
                global: false, 
            },
          },
          name: this.$t('homePage.increaseOf30Day'),
          type: 'line',
          smooth: true,
          data: this.register30DayValueArr
        }]
      }


      mainOption && myChart.setOption(mainOption);
      window.addEventListener('resize',function(){
        myChart.resize();
      }) 


      //图例监听事件
      const self = this;
      myChart.on('legendselectchanged', function(obj) {
        const name = obj.name;
        const option = myChart.getOption();
        for(var i in option.legend[0].data){ 
          if(option.legend[0].data[i].name === name){ 
            option.legend[0].data[i] = {
              name:option.legend[0].data[i].name, 
              textStyle:{ 
                color: '#FFFFFF',
                padding:[5,5,2,5],
                backgroundColor:'#336FF6'
              }
            }
          }else {
            option.legend[0].data[i] = {
              name:option.legend[0].data[i].name,
              textStyle:{
                color: '#999999',
                padding:[5,5,2,5]
              }
            }
          }
        }
        if (name === that.$t('homePage.increaseOf7Day')) {
          option.xAxis[0].data = self.register7DayDateArr
        } else if (name === that.$t('homePage.increaseOf30Day')) {
          option.xAxis[0].data = self.register30DayDateArr
        }

        option && myChart.setOption(option);
        window.addEventListener('resize',function(){
          myChart.resize();
        })
      })


      



    },

    myqueEcharts(newData) {
      var that = this;
      var chartDom = document.getElementById('myQueueEchart');
      
      var myChart = that.$echarts.init(chartDom);
      
      var countryColors = {};

      if(that.$i18n.locale == 'zh'){
        countryColors = {
            '中国': '#C04B28',
            '美国': '#044A7E',
            '日本': '#F9F9F9',
            '印度': '#F1AB49',
            '巴西': '#009958',
            '俄罗斯': '#232B8C',
            '意大利': '#43C96A',
            '土耳其': '#CA2E27',
            '德国': '#FCDA03'
        }
      }else{
        countryColors = {
          'China': '#C04B28',
          'America': '#044A7E',
          'Japan': '#F9F9F9',
          'India': '#F1AB49',
          'Brazil': '#009958',
          'Russia': '#232B8C',
          'Italy': '#43C96A',
          'Turkey': '#CA2E27',
          'Germany': '#FCDA03'
        };
      }
        
      var yAxis = [];
      var seriesData = [];
      if(newData){

        newData.filter(v=>{ //遍历接口数据
          let enName = getEnName(v.country) ? getEnName(v.country) : ''; //将中文转为英文类型
          if(enName){
            yAxis.push({name:v.country,value:enName});
          }else {
            yAxis.push({name:that.$i18n.locale == 'zh' ? '其他' : 'Order',value:'order'});
          }
          seriesData.push({name:v.country,value:parseInt(v.count)});
        })

      }else {
         that.userDetails.globalUserPercent.filter(v=>{ //遍历接口数据
          let enName = getEnName(v.country) ? getEnName(v.country) : ''; //将中文转为英文类型
          if(enName){
            yAxis.push({name:v.country,value:enName});
          }else {
            yAxis.push({name:that.$i18n.locale == 'zh' ? '其他' : 'Order',value:'order'});
          }
          seriesData.push({name:v.country,value:parseInt(v.count)});
        })
      } 

        that.option = {
          dataZoom:{
            show:false,
            type:'inside',
            disabled:true,
          },
          grid:{
            top:29,
            bottom:0
          },
          backgroundColor:'transparent',
          xAxis: {
            show:false, 
            max: 'dataMax',
            axisLine:{ 
              show:false
            }
          },
          yAxis: {
            type: 'category',
            boundaryGap: ['0%', '0%'],
            data: yAxis,
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 9, // only the largest 3 bars will be displayed
            axisLine:{ 
              show:false
            },


            axisLabel: {
              color: '#666666',
              show: true,
              fontSize: 12,
              formatter: function (value) {
                let yAxisName;
                yAxis.forEach(v=>{
                  if(v.value == value){
                    yAxisName = v.name;
                  }
                })
                return '{value|' + yAxisName + '}    {' + value + '| }';
              },
              margin: 14,
              rich: ''
            },
            axisTick:{ 
              show:false
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            {
              showBackground: false, //echarts4.7 supper background color support
              backgroundStyle: {
                color: '#F5F5F5'
              },
              realtimeSort: true,
              name: 'X',
              type: 'bar',
              data: seriesData,
              label: {
                show: true,
                position: 'right',
                valueAnimation: true
              },
              itemStyle: {
                shadowOffsetX:0,
                shadowOffsetY:2,
                shadowBlur:6,
                shadowColor:'rgba(0, 0, 0, 0.16)',
                color: function (param) {
                  return countryColors[param.data.name] || '#CCCCCC';
                }
              },
            }
          ],
          legend: {
            show: false
          },
          animationDuration: 0,
          animationDurationUpdate: 3000,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear'
        };

        var obj = {};
        yAxis.filter(v=>{
            var currentVal = v.value.toLowerCase();
            obj[v.value] = {
              width:33,
              height:20,
              shadowColor:'#DEDEDE',
              shadowBlur:2,
              backgroundColor:{
                image:require('../../icons/flagIcon/'+currentVal+'.svg')
              }
          }  
        })

        that.option.yAxis.axisLabel.rich = obj;
      


      //transcoding
      function getEnName(name){
        let countryTypeName;
        var lang = ''; 
        if(that.$i18n.locale == 'zh'){
          lang = /[^\u4e00-\u9fa5]/gi;
        }else{
          lang = /[^a-zA-Z]/g;
        }
        countryNameList.forEach(v=>{ 
          if(v.replace(lang,'') == name){
            const countryType = v.split('-')[1];
            countryTypeName = relaceName(countryType);
          }else {
            return '';
          }
        })
        return countryTypeName;
      }

      //tag
      function relaceName(type){
        return (
          countryList.find(function (item) {
            return parseInt(item.dialCode) === parseInt(type);
          }) || {}
        ).code;
      }
      
      that.option && myChart.setOption(that.option,true);

      window.addEventListener('resize',function(){
        myChart.resize();
      })

    }


  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/index-common";
  .dataCount{
    width: auto;
    padding: 17px 20px 28px 20px;
    .dataCount_type{
      margin-top: 24px;
      .grid-content{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
      .dataCount_num{
        font-size: 36px;
        font-weight: 400;
        line-height: 36px;
        color: #FFFFFF;
      }
      .dataCount_name{
        margin-top: 18px;
        font-size: 16px;
        font-weight: 400;
        color: #FFFFFF;
        opacity: 0.8;
      }
    }
  }

  .globalUserDistribution,.newUsers{
    width: auto;
    padding: 17px 20px 28px 20px;
  }

  .globalUserDistribution{
    pointer-events: none;
  }


  
</style>
