let btnListMap = []
const menus = {
  state: {
    menuList: [],
    permList: [],
    btnListMap: [],

    hasRoutes: false,

    editableTabsValue: 'Index',
    editableTabs: [{
      title: 'Home',
      name: 'Index'
    }]
  },
  mutations: {
    setMenuList(state, menus) {
      state.menuList = menus
      convert(menus, null)
      state.btnListMap = btnListMap
    },
    setPermList(state, perms) {
      state.permList = perms
    },
    setBtnListMap(state, menus) {
    },
    changeRouteStatus(state, hasRoutes) {
      state.hasRoutes = hasRoutes
    },

    addTab(state, tab) {
      const index = state.editableTabs.findIndex(e => e.name === tab.name);
      if (index === -1) {
        state.editableTabs.push({
          title: tab.title,
          name: tab.name
        })
      }

      state.editableTabsValue = tab.name
    },

    resetState: (state) => {
      state.menuList = []
      state.permList = []
      state.btnListMap = []
      btnListMap = []
      state.hasRoutes = false
      state.editableTabsValue = 'Index'
      state.editableTabs = [{
        title: 'Home',
        name: 'Index'
      }]
    }
  },

  actions: {
  }

}

function convert(menuList, key) {
  const btnList = {}
  menuList.forEach(menuListKey => {
    if (menuListKey.type === 1) {
      key = menuListKey.id
    }
    if (menuListKey.type === 2) {
      const btnNameList = menuListKey.name.split(':')
      const name = btnNameList[btnNameList.length - 1]
      btnList[name] = menuListKey.name;
      btnList['id'] = menuListKey.id;
      btnList['menuId'] = key;
    }
    if (menuListKey.children.length > 0) {
      convert(menuListKey.children, key)
    }
  })
  if (key) {
    btnListMap.push({ 'btnList': btnList })
  }
}

export default menus
