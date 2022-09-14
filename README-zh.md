# vue-element-data

> 这是一个基于Element UI管理后台。不需要定义太多HTML代码，通过自定义数据就可以配置界面。包含预览功能。

[线上地址](https://lufaliu.github.io/vue-element-data)

[国内访问](http://lufaliu.gitee.io/vue-element-data)

## Build Setup

```bash
# 克隆项目
git clone https://github.com/LuFaLiu/vue-element-data.git

# 进入项目目录
cd vue-element-data

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:8089](http://localhost:8089)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/LuFaLiu/vue-element-data/blob/master/LICENSE) license.

Copyright (c) 2022-present LuFaLiu


## Data structure

```bash
componentName //组件名称
class //样式类
resizeMethod //界面浏览器窗口变化方法
childrenNode //子组件
label //标签
prop //结构
paramsName //属性名称
vModel //属性值
placeholder //属性提示语
clearable //是否可以清除
elOptionList //下拉框内容列表
event //事件名称
icon //图标
title //标题

tableDataName //表格数据属性名
tableHeightName //表格高度属性名
ref //模块索引
tooltipEffect //提示语
stripe //是否带斑马纹
style //样式
rowKey //表格唯一标识
selection 是否需要选中
index 顺序
defaultSort 默认排序
defaultExpandAll 是否展开所有
treeProp 表格树属性标识
type 类型
slotScope 插槽
value 属性值
width 宽度
formatDate 是否需要将国际时间转为北京时间
align 对齐方向
operation 是否有操作选项
row 当前行数据
tableParams 表格是否需要带参
btnType 按钮类型
btnCondition 操作按钮判断条件
condition 判断条件

model 表单模块参数
rule 表单规则
labelWidth 标签宽度
upladRef 上传模块标识
slotList 插槽列表
model 表单属性名称
rule 表单规则名称
inputCondition 输入框判断条件
autocomplete 是否自动补全
dialogShowName 弹框显示属性名
closeMethodName 关闭事件名称
elFormItemCondition elform判断条件
componentListName 组件列表名称
componentSlot 组件内是否有插槽
params 弹框是否需要带参
btnFormConditon 按钮根据表单条件是否展示


注意：
为Transfer组件时必须添加filterMethod方法
为ElForm组件时需要把ElForm添加在ELContainer里面
为ElFormItem组件时rules必须为数组类型，默认为[]

```

