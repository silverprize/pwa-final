import Vue from 'vue'

export default new Vue({
  data () {
    return {
      user: null,
      isLogin: false
    }
  },
  watch: {
    user () {
      this.isLogin = Boolean(this.user)
    }
  }
})
