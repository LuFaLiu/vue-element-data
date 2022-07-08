<template>
    <custom-content />
</template>
<script type="text/jsx">
export default {
    name:'customContent',
    inject: ['superParams'],
    props:{
        parentNode:{
            type:Object,
            require:true
        }
    },
    components:{
        CustomContent:{
            render(h){
                const parentNode = this.$parent.parentNode;
                return h(
                    parentNode.tag,
                    {
                        'class':parentNode.class,
                    }
                    [
                        this.$scopedSlots.default({
                            text:parentNode.elContainerTitle
                        })
                    ]
                );
            }
        }
    }
    
}
</script>
