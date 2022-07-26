export default {
    functional: true,
    name:'Template',
    render(h,ctx){
        const props = ctx.props;
        const row = ctx.data.props.row;
        const item = ctx.data.item;
        const parent = ctx.parent;
        return (
            item.type == "index"
            ?   h('span',parent.indexMethod(props.$index))
                : item.value 
                    ?  item.formatDate 
                        ? <span>{ parent.formatDate(parent.getObjKey(row,item.value)) }</span>
                            : item.tableColumnType == 'multiple' 
                                ?   <span>{ row.status === 1 ? parent.$t('form.normal') : parent.$t('form.disable') }</span>
                                    :  <span>{ row.i18n ? parent.$t(parent.getObjKey(row,item.value)) : parent.getObjKey(row,item.value) }</span>
                                            :  <span>operation</span>
        )
    },
    data(){
        return {

        }
    }

}