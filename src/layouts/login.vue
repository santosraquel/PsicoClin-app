<template>
  <v-app>
    <!-- main -->
    <v-main class="bg-body">
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- popup: msg -->
    <float-msg />
  </v-app>
</template>

<script>
export default {
  components: {
    FloatMsg: () => import('@/components/FloatMsg.vue'),
  },
}
</script>

<style lang="scss">
.bg-body::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('~assets/img/bg-logo.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  opacity: .5;
}
</style>
