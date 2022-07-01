const getters = {
  language: state => state.language,
  token: state => state.token,
  menuList: state => state.menus.menuList,
  editableTabsValue: state => state.menus.editableTabsValue,
  permList: state => state.menus.permList,
  hasRoutes: state => state.menus.hasRoutes,
  environment: state => state.environment,
  btnListMap: state => state.menus.btnListMap
}
export default getters
