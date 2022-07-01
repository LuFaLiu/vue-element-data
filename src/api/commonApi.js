import sysMenuApi from '@/api/sysMenuApi'
import store from '../store'
import router from '../router'
import { Message } from 'element-ui';
import _ from "lodash";


var menuInfo = []; //Flattening the route list
var menuListIndex = []; //List of unique identifiers of routes
export function getSysMenu(hasRoute){ //Get menus and permissions
    sysMenuApi.getMockMenuList().then(res => {
        store.commit('setMenuList', res.data.data)
        // Dynamically bound routing
        const newRoutes = router.options.routes;
        newRoutes[0].children = []; //Delete existing routes to avoid duplicate data
        menuInfo = []; //The flat route array was cleared
        menuListIndex = []; //The route unique identifier array was cleared

        var routeList = deepRoute(res.data.data); //The tree structure transforms into a flat structure

        routeList.filter(v=>{
            const route = menuToRoute(v); // Navigation turns to routing
            if (route && menuListIndex.indexOf(route.meta.id) == -1) { //The route list does not exist (cannot replace existing data after updating)
                menuListIndex.push(route.meta.id); //Add the unique IDENTIFIER of a route
                newRoutes[0].children.push(route); //Flat structure
            }
        })

        newRoutes[0].children.filter(v => { //Add nested routines to add interface modules
            if(v.name == 'page:manage:add'){ 
              v.children = [];
              newRoutes[0].children.filter(item => { //You cannot add "/" to path; otherwise, the interface is blank
                var resetPath = item.path.split('/');
                if(item.name !== 'page:manage:add'){ //Remove current interface
                    v.children.push({'name':item.name,'path': resetPath[resetPath.length - 1],'meta':item.meta,'component':item.component});
                }
              })
            }
        })

        menuListIndex = Array.from(new Set(menuListIndex)); //A route uniquely identifies deduplication
        router.addRoutes(newRoutes);
        hasRoute = true;
        store.commit('changeRouteStatus', hasRoute);
    })
}

//All routes including child routes were traversed
const deepRoute = (menu) => {
  menu.forEach(e => {
    menuInfo.push(e);
    if(e.children.length > 0){
      return deepRoute(e.children);
    }
  })
  return menuInfo;
}

// Navigation turns to routing
const menuToRoute = (menu) => {
  if (menu.path && menu.component) { //Check whether the routing path name and routing component are empty
    const route = {
      name: menu.name,
      path: menu.path,
      meta: {
        icon: menu.icon,
        title: menu.title,
        id:menu.id //Example Set the current route ID
      }
    }
    route.component = (resolve) => require([`@/views/${menu.component}.vue`], resolve)
    return route
  }
}

export function deleteApiRequest(_this,id,method,apiName,callback){
    var list = [];
    if (id) {
        list.push(id);
    } else {
        _this.multipleSelection.forEach((row) => {
            list.push(row.id);
        });
    }
    _this.$confirm(_this.$t('tip.confirmDelete') + _this.$t('tip.pieceData'), _this.$t('tip.confirmDelete'), {
        confirmButtonText: _this.$t('form.sure'),
        cancelButtonText: _this.$t('form.cancel'),
    }).then(() => {
        apiRequest(_this,method,apiName,list,callback);
    });
}

export function apiRequest(_this,method,apiName,params,callback){ //Single data source
    method[apiName](params).then(res=>{
        if(res.data.code == 200){
            Message({
                showClose: true,
                message: _this.$t('tip.success'),
                type: "success",
                duration: 500,
                onClose: () => {
                    callback('success');
                },
            });
        }else {
            callback('error');
        }
    }).catch(function (err) {
        callback('error');
    })
}

export function apiRequestParams(_this,method,apiName,params,callback){ 
    method[apiName](params).then(res=>{
        if(res.data.code == 200){
            callback(res.data.data)
        }else {
            callback('error');
        }
    }).catch(function (err) {
        callback('error');
    })
}

export function apiRequestAll(_this,method,apiName,paramsName,callback){ //Multiple data sources
    method[apiName]().then(res=>{
        if(res.data.code == 200){
            res.data.data.items.filter(v=>{
                _this[paramsName].push(v);
            })
        }else {
            callback('error');
        }
    }).catch(function (err) {
        callback('error');
    })
}

export function apiRequestOpration(method,apiName,callback){ //Returns a parameter with an operation
    method[apiName]().then(res=>{
        if(res.data.code == 200){
            callback(res.data.data);
        }else {
            callback('error');
        }
    }).catch(function (err) {
        callback('error');
    })
}

export function apiRequestTable(_this,method,apiName,pageData,callback,params,current,size){
    method[apiName](params,current,size).then(res=>{
        if(res.data.code == 200){
            callback(res.data.data.records);
            pageData ? _.mergeWith(_this[pageData],res.data.data) :  _.mergeWith(_this,_.pickBy(res.data.data,_.isNumber)); 
        }
    })
}

export function apiRequestList(_this,method,apiName,type,typeName,label,value,params,paramsList,isAll,list = []){
    method[apiName](params).then(res=>{
        if(res.status == 200 && res.data.data.records && res.data.data.records.length > 0){
            if(isAll){
                _this[paramsList[0]].push({label:_this.$t('form.all'),value: ''});
            }
            type ? list = _.filter(res.data.data.records,[typeName, type]) : list = res.data.data.records;
            list.filter(v=>{
                for(var i of paramsList){
                    _this[i].push({label: v[label],value: v[value]});
                }
            });
        }
    })
}