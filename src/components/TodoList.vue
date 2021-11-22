<template>
  <!-- Задача №2 для frontend-разработчика (VueJS, NuxtJS):
  Реализация приложения планировщика задач (To-Do), на основе ранее сверстанного макета.
  Фнкционал приложения:
  1 В приложении должно присутствовать как минимум 2 раздела:
  +◦ Текущие задачи
  +◦ Выполненные
  +2 Задача имеет следующие поля:
  +◦ Заголовок
  +◦ Текст задачи
  +◦ Срок выполнения
  +3 Добавление новых задач
  +4 Редактирование уже имеющихся
  +5 Удаление задач
  +6 Отметка выполнения задачи, с переносом отмеченной задачи в раздел «Выполненные»
  -7 Авторизация пользователей -?-
  -8 Регистрация пользователей -?-
  +9 Использование vue-store обязательно
  +10 Готовые компоненты типа vue-bootstrap не использовать
  +11 Виджет задачи в списке должен быть оформлен в виде компоненты
  +12 В списке задач необходимо отображать заголовок задачи, ниже заголовка первые 70 символов из текста задачи -->
  <div>
    <!-- Форма создания новый задач -->
    <form @submit.prevent="addTodo" class="todo-form">
      <div class="todo-data">
        <div class="todo-input">
          <input
            type="text"
            class="todo-input-item"
            placeholder="Заголовок"
            v-model="form.title"
            required
          />

          <input
            type="text"
            class="todo-input-item"
            placeholder="Срок выполнения"
            v-model="form.deadline"
            required
          />
        </div>

        <textarea
          type="text"
          class="todo-textarea"
          placeholder="Описание"
          v-model="form.description"
          rows="2"
          required
        />
      </div>

      <button type="submit" class="addTodoButton">Добавить задачу</button>
    </form>

    <!-- Переход между выполненными и невыполненными задачами -->
    <div class="todo-nav">
      <div
        class="todo-nav-item"
        :class="{ 'todo-nav-item-active': filter == 'remaining' }"
        @click="filter = 'remaining'"
      >
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
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>

        {{ remaining.length }}
      </div>
      <div
        class="todo-nav-item"
        :class="{ 'todo-nav-item-active': filter == 'done' }"
        @click="filter = 'done'"
      >
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
            d="M5 13l4 4L19 7"
          ></path>
        </svg>

        {{ done.length }}
      </div>
    </div>

    <!-- Вызов задач в зависимости от фильтра -->
    <div class="todo-list">
      <template v-if="filter === 'remaining'">
        <TodoItem v-for="todo in remaining" :key="todo.id" :todo="todo" />
      </template>

      <template v-if="filter === 'done'">
        <TodoItem v-for="todo in done" :key="todo.id" :todo="todo" />
      </template>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  components: {
    TodoItem,
  },

  data() {
    return {
      filter: "remaining",

      form: {
        id: Math.floor(Math.random() * Date.now()),
        title: "",
        description: "",
        deadline: "",
      },
    }
  },

  computed: {
    ...mapGetters(["remaining", "done"]),
  },

  methods: {
    ...mapActions([
      "addItem",
      "updateItem",
      "editItem",
      "markAsDone",
      "removeItem",
    ]),

    addTodo() {
      this.addItem(this.form).then(() => {
        this.resetForm()
      })
    },

    resetForm() {
      this.form = {
        id: Math.floor(Math.random() * Date.now()),
        title: "",
        description: "",
        deadline: "",
      }
    },
  },
}
</script>
