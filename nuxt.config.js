const description = 'Aproximar os leigos, em especial os jovens, cada vez mais de Deus. Prover a liturgia, o trabalho pastoral, o belo e o verdadeiro. Usando para tal, a tecnologia, a cultura e o conhecimento.'

let shortTitle = 'Psicoclin'

const PROJECT_ID = process.env.PROJECT_ID

if (!PROJECT_ID) {
  console.warn('>>> PROJECT_ID are\'t defined, project will be loaded as development.')
}

let algoliaPrefix = 'dev_'
if (!PROJECT_ID || (PROJECT_ID && PROJECT_ID.includes('dev'))) {
  shortTitle += ' (dev)'
} else {
  algoliaPrefix = 'prod_'
}

export default {
  ssr: false,

  srcDir: 'src/',

  env: {
    projectId: PROJECT_ID,
    shortTitle,
    LOCAL_API: process.env.LOCAL_API,
    algoliaAppId: 'XORFL6XX69',
    algoliaSearchKey: '7f854b05966560c5c772778bb4b5958a',
    algoliaPrefix,
  },

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: `${shortTitle} - %s`,
    htmlAttrs: {
      lang: 'pt-BR',
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito|Material+Icons&display=swap' },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: shortTitle,
      },
      {
        hid: 'og:title',
        name: 'og:title',
        template: `${shortTitle} - %s`,
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: shortTitle,
      },
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: description,
      },
    ],
  },

  css: ['@/assets/global.scss'],

  plugins: ['@/plugins/fireauth.js'],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/pwa',
    ['v-currency-field/nuxt-treeshaking', {
      locale: 'pt-BR',
      decimalLength: 2,
      autoDecimalMode: true,
      defaultValue: 0,
    }],
  ],

  manifest: {
    name: shortTitle,
    short_name: shortTitle,
    lang: 'pt-BR',
    display: 'standalone',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192 512x512',
      },
    ],
  },

  vuetify: {
    optionsPath: '@@/vuetify.options.js',
  },

  build: {
  },
}
