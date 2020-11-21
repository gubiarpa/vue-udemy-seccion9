<template>

  <h1 class="my-5">Formularios con Vue.js</h1>

  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
  </form>
  <hr>
  <p>
    {{tarea}}
  </p>
</template>

<script>
import Input from "../components/Input";
import { mapActions } from "vuex";
const shortid = require("shortid");

export default {
  name: 'Home',
  components: {
    Input
  },
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  },
  methods: {
    ...mapActions(['setTareas']),
    procesarFormulario(){
      console.log(this.tarea)
      if(this.tarea.nombre.trim() === ""){
        console.log('Campo vacío');
        return
      }

      // Generar ID
      this.tarea.id = shortid.generate();
      console.log(this.tarea.id);
      
      // envian los datos
      this.setTareas(this.tarea);

      this.tarea = {
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  },
}
</script>
