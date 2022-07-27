export default {
    functional: true,
    name:'Template',
    render(h,ctx){
        const props = ctx.props;
        const row = ctx.data.props.row;
        const item = ctx.data.item;
        const parent = ctx.parent;
        return (<span>123456</span>)
    },
    data(){
        return {

        }
    }

}