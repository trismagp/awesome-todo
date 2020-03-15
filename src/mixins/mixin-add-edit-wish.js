export default{
    methods:{
        submitForm(){      
            this.$refs.wishToSubmit.$refs.title.validate()
            if(!this.$refs.wishToSubmit.$refs.title.hasError){
              this.submitWish()
            }
          },
          closePopup(){
            this.$emit('close')
        }
    },
    components:{
      'modal-header': require('components/Wishes/Modals/Shared/ModalHeader.vue').default,
      'modal-wish-category': require('components/Wishes/Modals/Shared/ModalWishCategory.vue').default,
      'modal-wish-title': require('components/Wishes/Modals/Shared/ModalWishTitle.vue').default
    }
}