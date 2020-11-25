<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categorías</th>
                <th scope="col">Estado</th>
                <th scope="col">Número</th>
                <th scope="col">Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="tarea in tareas" :key="tarea.id">
                <th scope="row">{{ tarea.id }}</th>
                <th>{{ tarea.nombre }}</th>
                <td>{{ tarea.categorias.join(' | ') }}</td>
                <td>{{ tarea.estado }}</td>
                <td>{{ tarea.numero }}</td>
                <td>
                    <router-link class="btn btn-warning btn-sm" :to="{ name: 'Editar', params: { id: tarea.id } }">Editar</router-link>
                    <button class="btn btn-danger btn-sm ml-2" @click="deleteTarea(tarea.id)">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState(['tareas'])
    },
    methods: {
        ...mapActions(['deleteTarea'])
    },
}
</script>