<template>
  <form @submit.prevent="updateTarea(tarea)">
    <Input :tarea="tarea" />
  </form>
</template>

<script>
import Input from "../components/Input";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    Input
  },
  computed: {
    ...mapState(['tarea'])
  },
  methods: {
    ...mapActions(['setTarea', 'updateTarea'])
  },
  created() {
    this.setTarea(this.$route.params.id);
  },
}
</script>