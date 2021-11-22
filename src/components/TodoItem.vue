<template>
  <div class="todo-list-item">
    <div class="todo-list-header">
      <div class="todo-list-title">{{ cutTitle }}</div>

      <div class="todo-list-header-rightSection">
        <div class="todo-list-deadline">{{ cutDeadline }}</div>

        <!-- Отметить как выполненную задачу -->
        <div class="doneButton" @click="toggleDone(todo.id)" @change="doneEdit">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              stroke="#90ee90"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        <!-- Удалить задачу из списка -->
        <div @click="removeItem(todo.id)" class="removeTodoButton">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="#ffb6c1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <div
      v-if="!todo.editing"
      @dblclick="editMode({ id: todo.id, flag: true })"
      class="todo-list-description"
      :class="{ 'todo-list-description-done': todo.done }"
    >
      {{ cutDescription }}
    </div>

    <input
      v-else
      @blur="doneEdit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      v-focus
      class="todo-list-edit"
      type="text"
      v-model="form.description"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: {
        description: this.todo.description,
      },
    }
  },

  computed: {
    cutTitle() {
      return this.todo.title.slice(0, 40) + "..."
    },

    cutDescription() {
      return this.todo.description.slice(0, 70) + "..."
    },

    cutDeadline() {
      return this.todo.deadline.slice(0, 40) + "..."
    },
  },

  methods: {
    ...mapActions(["updateItem", "editMode", "toggleDone", "removeItem"]),

    doneEdit() {
      this.updateItem({
        id: this.todo.id,
        description: this.form.description,
      }).then(() => {
        this.editMode({ id: this.todo.id, flag: false })
      })
    },

    cancelEdit() {
      this.resetForm()
      this.editMode({ id: this.todo.id, flag: false })
    },

    resetForm() {
      this.form = {
        description: this.todo.description,
      }
    },
  },

  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      },
    },
  },
}
</script>
