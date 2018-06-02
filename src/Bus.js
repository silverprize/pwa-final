import Vue from 'vue'

export default new Vue({
  data () {
    return {
      // user: null,
      // isLogin: false,
      user: {},
      isLogin: true,
      mapContentLoaded: false
    }
  },
  watch: {
    user () {
      this.isLogin = Boolean(this.user)
    }
  }
})
