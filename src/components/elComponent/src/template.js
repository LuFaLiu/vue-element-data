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
                            :   <span>{ parent.getObjKey(row,item.value) }</span>
                                         :  <span>operation</span>
        )
    },
    data(){
        return {

        }
    }

}