<template>
    <form @submit.prevent="submitForm">
        <div class="row">
            <q-banner class="bg-grey-3 col q-mb-md">
                <template v-slot:avatar>
                    <q-icon name="account_circle" color="primary" />
                </template>
                {{tab | formatTab}} to access your wishes anywhere
            </q-banner>
        </div>
        <div class="row">   
            <q-input
                :rules="[ val => validateEmail(val) || 'Please enter a valid email address']" 
                lazy-rules 
                outlined 
                v-model="register.email" 
                ref="email"
                label="email" 
                class="col q-mb-md"/>
        </div>
        <div class="row">   
            <q-input
                :rules="[ val => val.length >= 6 || 'Please use at least 6 characters']" 
                lazy-rules
                outlined 
                v-model="register.password" 
                ref="password"
                type="password" 
                label="password" 
                class="col q-mb-md" />
        </div>
        <div class="row">
            <q-space />   
            <q-btn color="primary" :label=tab type="submit" />
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex'

 export default {
    props:['tab'],
    data () {
        return {
            register: {
                email:"",
                password:""
            }
        }
    },
    methods:{
        ...mapActions('auth', ['registerUser','loginUser']),
        submitForm(){
            this.$refs.email.validate()
            this.$refs.password.validate()
            if(!this.$refs.email.hasError && !this.$refs.password.hasError){
                if(this.tab=='login'){
                    this.loginUser(this.register)
                }else{
                    this.registerUser(this.register)
                }


            }
        },
        validateEmail(email){
             const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return expression.test(String(email).toLowerCase())
        }
    },filters:{
        formatTab(val){
            return val.charAt(0).toUpperCase()+val.slice(1)
        }
    }

}
</script>