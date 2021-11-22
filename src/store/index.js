import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [
      {
        id: Math.floor(Math.random() * Date.now()),
        title: "Сделать ТЗ",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur deserunt voluptates labore ipsam perferendis dolorum, cupiditate ipsa fugiat quisquam! Soluta ipsum excepturi modi aspernatur doloremque dolorem asperiores adipisci molestiae rem.",
        deadline: "21.11.2021",
        done: false,
        editing: false,
      },

      {
        id: Math.floor(Math.random() * Date.now()),
        title: "Сделать ТЗ",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur deserunt voluptates labore ipsam perferendis dolorum, cupiditate ipsa fugiat quisquam! Soluta ipsum excepturi modi aspernatur doloremque dolorem asperiores adipisci molestiae rem.",
        deadline: "21.11.2021",
        done: false,
        editing: false,
      },
    ],
  },

  getters: {
    remaining: (state) => {
      return state.items.filter((item) => {
        return !item.done
      })
    },

    done: (state) => {
      return state.items.filter((item) => {
        return item.done
      })
    },
  },

  mutations: {
    ADD_ITEM: (state, payload) => {
      state.items.push({
        ...payload,
        editing: false,
        done: false,
      })
    },

    UPDATE_ITEM: (state, { id, description }) => {
      state.items = state.items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            description: description,
          }
        }

        return item
      })
    },

    TOGGLE_DONE: (state, payload) => {
      state.items = state.items.map((item) => {
        if (item.id === payload) {
          return {
            ...item,
            done: !item.done,
          }
        }

        return item
      })
    },

    EDIT_MODE: (state, { id, flag }) => {
      state.items = state.items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            editing: flag,
          }
        }

        return item
      })
    },

    REMOVE_ITEM: (state, payload) => {
      state.items = state.items.filter((item) => item.id !== payload)
    },
  },

  actions: {
    addItem({ commit }, payload) {
      commit("ADD_ITEM", payload)
    },

    updateItem({ commit }, payload) {
      commit("UPDATE_ITEM", payload)
    },

    editMode({ commit }, payload) {
      commit("EDIT_MODE", payload)
    },

    toggleDone({ commit }, payload) {
      commit("TOGGLE_DONE", payload)
    },

    removeItem({ commit }, payload) {
      commit("REMOVE_ITEM", payload)
    },
  },
})
