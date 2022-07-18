export default {
    functional: true,
    name:'Template',
    render(h,ctx){
        console.log(ctx);
        const props = ctx.props;
        const row = ctx.data.props.row;
        const item = ctx.data.item;
        const parent = ctx.parent;
        if(item.type == 'index') {
            console.log("index=====>");
            console.log(item);
        }
        return (
            item.type == "index"
            ?   h('span',parent.indexMethod(props.$index))
                : item.value 
                    ?  item.formatDate 
                        ? <span>{ parent.getObjKey(row,item.value) }</span>
                            :   <span>{ parent.getObjKey(row,item.value) }</span>
                                         :  ''
        )
    },
    data(){
        return {

        }
    }

}