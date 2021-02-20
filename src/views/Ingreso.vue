<template>
    <h1 class="my-5">Ingreso de Usuarios</h1>    
    <form @submit.prevent="procesarFormulario">
        <input
            type="email"
            placeholder="Email"
            class="form-control my-2"
            v-model.trim="email"
        >
        <input
            type="password"
            placeholder="Contraseña" 
            class="form-control my-2"
            v-model.trim="pass1"
        >
        <button
            type="submit"
            class="btn btn-primary my-2"
            :disabled="bloquear"
        >
            Ingresar
        </button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            email: '',
            pass1: '',
        }
    },
    computed: {
        bloquear() {
            if (!this.email.includes('@')) return true;
            if (this.pass1 == '' || this.pass1.length < 5) return true;
            return false;
        }
    },
    methods: {
        ...mapActions(['ingresarUsuario']),
        procesarFormulario() {
            this.ingresarUsuario({email: this.email, password: this.pass1});
            this.email = this.pass1;
        }
    },
}
</script>