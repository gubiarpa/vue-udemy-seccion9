<template>

  <h1 class="my-5">Formularios con Vue.js</h1>

  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
  </form>
  <hr>
  <ListaTareas />
</template>

<script>
import Input from "../components/Input";
import ListaTareas from "../components/ListaTareas";
import { mapActions } from "vuex";
const shortid = require("shortid");

export default {
  name: 'Home',
  components: {
    Input,
    ListaTareas
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
      if(this.tarea.nombre.trim() === ""){
        alert('Campo vacío');
        return;
      }

      // Generar ID
      this.tarea.id = shortid.generate();
      
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
