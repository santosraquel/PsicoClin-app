<template>
  <v-footer
    app
    color="white"
  >
    <v-spacer />
    <div class="legalInfo">
      Tudo por Cristo, nada sem Maria. &copy;{{ new Date().getFullYear() }} Liturgiæ&reg;
    </div>
    <!-- <v-btn icon small text target="_blank" href="https://facebook.com/liturgiae.oficial">
      <v-icon small>
        mdi-facebook
      </v-icon>
    </v-btn>
    <v-btn icon small text target="_blank" href="https://instagram.com/liturgiae.oficial">
      <v-icon small>
        mdi-instagram
      </v-icon>
    </v-btn> -->
  </v-footer>
</template>

<style lang="scss" scoped>
.v-footer {
  height: 30px;
  font-size: 12px;
  padding: 0;
  .legalInfo {
    margin-right: 5px;
  }
}
</style>
