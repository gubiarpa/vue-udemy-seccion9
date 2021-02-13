import { createStore } from 'vuex'
import router from "../router";

export default createStore({
  state: {
    tareas:[],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    },
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    cargar(state, payload) {
      state.tareas = payload;
    },
    set(state, payload) {
      state.tareas.push(payload);
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    tarea(state, payload) {
      if (!state.tareas.find(item => item.id === payload)) {
        router.push('/');
        return;
      }
      state.tarea = state.tareas.find(item => item.id === payload);
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item);
      router.push('/');
    },
  },
  actions: {
    async registrarUsuario({ commit }, usuario) {
      try {
        const apiKey = 'AIzaSyDLoykkfhLqHMrR1_UbROCYxBwxJY8SJJc'; // Firebase
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ apiKey }`, {
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecurityToken: true
          })
        });
        const userDB = await res.json();
        console.log(userDB);
      } catch (error) {
        console.error(error);
      }
      commit('setUser', usuario);
    },
    async cargarLocalStorage({ commit }) {
      try {
        const res = await fetch(`https://celudar-v0-default-rtdb.firebaseio.com/tareas.json`);
        const dataDB = await res.json();
        const tareasLista = [];
        for (const id in dataDB) {
          tareasLista.push(dataDB[id]);
        }
        commit('cargar', tareasLista);
      } catch (error) {
        console.error(error);
      }
    },
    async setTareas({ commit }, tarea) {
      try {
        const res = await fetch(`https://celudar-v0-default-rtdb.firebaseio.com/tareas/${ tarea.id }.json`, {
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(tarea)
        });
      } catch (error) {
        console.error(error);
      }
      commit('set', tarea);
    },
    async deleteTarea({ commit }, id) {
      try {
        await fetch(`https://celudar-v0-default-rtdb.firebaseio.com/tareas/${ id }.json`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.error(error);
      }
      commit('eliminar', id);
    },
    setTarea({ commit }, id) {
      commit('tarea', id);
    },
    async updateTarea({ commit }, tarea) {
      try {
        const res = await fetch(`https://celudar-v0-default-rtdb.firebaseio.com/tareas/${ tarea.id }.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(tarea)
        });
      } catch (error) {
        console.error(error);
      }
      commit('update', tarea);
    },
  },
  modules: {
  }
})
