<template>
  <div>
    <h1>login</h1>
    <form @submit.prevent="login">
      <label>
      ID <input type="email" autofocus v-model="id">
      </label>
      <label>
      PASSWORD <input type="password" v-model="password">
      </label>
      <button type="submit" :disabled="inProgress">Login</button>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'login',
  data () {
    return {
      id: '',
      password: '',
      inProgress: false
    }
  },
  methods: {
    login () {
      this.inProgress = true;
      firebase.auth().signInWithEmailAndPassword(this.id, this.password)
        .then((data) => {
          alert('로그인 완료')
          this.$bus.user = data.email;
          this.$nextTick(() => {
            this.$router.replace({
              path: this.$route.query.redir || '/'
            });
          });
        })
        .catch(function (error) {
          alert(error.message)
          this.inProgress = false;
        })
    }
  }
}
</script>

<style scoped>

</style>
