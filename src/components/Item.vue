<template>
  <div>item</div>
  <div>{{ store.state.home.count }}</div>
  <div>
    <div v-expend-click="'1,2,3'">222</div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Item',
  setup() {
    const store = useStore()

    return {
      store
    }
  }
})
</script>

<style scoped>

</style>
