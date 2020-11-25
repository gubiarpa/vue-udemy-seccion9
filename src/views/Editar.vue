<template>
  Editar {{ $route.params.id }} - {{ tarea }}
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(['tarea'])
  },
  methods: {
    ...mapActions(['setTarea'])
  },
  created() {
    this.setTarea(this.$route.params.id);
  },
}
</script>