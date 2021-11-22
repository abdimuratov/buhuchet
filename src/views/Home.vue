<template>
  <div>
    <h1>HomePage</h1>
    <TodoList />
  </div>
</template>

<script>
import TodoList from '../components/TodoList.vue'

export default {
  components: {
    TodoList,
  }
}
</script>