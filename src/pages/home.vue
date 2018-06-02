<template>
  <div>
    <h1>home</h1>
    <button v-if="$bus.isLogin" @click="logout" type="button">logout</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    logout () {
      localStorage.removeItem('user')
      this.$bus.isLogin = false
      this.$bus.user = null
    }
  }
}
</script>
