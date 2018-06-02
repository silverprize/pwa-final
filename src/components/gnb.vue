<template>
  <div>
    <router-link to="/">home</router-link>
    <router-link to="/login" v-if="!$bus.isLogin">login</router-link>
    <router-link to="/air_quality">air-quality</router-link>
    <router-link to="/chart">chart</router-link>
  </div>
</template>

<script>
export default {
  name: 'gnb'
}
</script>
