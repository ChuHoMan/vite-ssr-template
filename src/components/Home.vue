<template>
  <div>
    <div>home</div>
    <h3>{{ state }}</h3>
    <button @click="handleClick">点击</button>
    <h3>VUEX test</h3>
    <h4>HOME STATE: {{ homeState }}</h4>
    <button @click="handleChangeHomeState">测试vuex</button>
    <router-link :to="{ name: 'item', params: {id: 1}}">
      <button>测试路由</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore()

    const state = ref<number>(0)
    const handleClick = () => {
      state.value++
    }

    const homeState = computed(() => {
      return store.state.home.count
    })
    const handleChangeHomeState = () => {
      store.dispatch('home/inc')
    }
    return {
      state,
      handleClick,
      homeState,
      handleChangeHomeState
    }
  }
})
</script>

<style scoped>

</style>
