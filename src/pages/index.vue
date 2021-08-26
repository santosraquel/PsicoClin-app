<template>
  <v-container fluid>
    <home-facts id="sobre" :rows="facts1" />
  </v-container>
</template>

<script>
import HomeFacts from '~/components/home/HomeFacts.vue'

export default {
  components: { HomeFacts },

  data: () => ({
    facts1: [
      {
        title: 'O&nbsp;Verdadeiro é nossa referência',
        text: 'Nossa missão é aproximar os leigos, especialmente os jovens, cada vez mais de Deus. Usando para tal, do belo e do verdadeiro, da cultura e do conhecimento; Aproximando a Verdade do cotidiano.',
        img: '/draw_01.png',
      },
      {
        title: 'A tecnologia é nossa aliada',
        text: 'Temos como objetivo geral, utilizar dos recursos tecnológicos para promover e zelar a liturgia e o trabalho pastoral. Criando, mantendo e promovendo aplicações e recursos úteis para os leigos, voluntários, missionários e religiosos. <br><br>',
        img: '/draw_02.png',
        odd: true,
      },
      {
        title: 'Promovemos a juventude',
        text: 'Uma plataforma criada e mantida por jovens, com vontade de aprender e compartilhar cada vez mais as maravilhas da Igreja. Aos quais estão de prontidão para ensinar, ajudar, colaborar com os seus dons na missão que Ele deu a cada um de nós. <br><br> Beato Carlos Acutis - rogai por nós!',
        img: '/draw_03.png',
      },
    ],
  }),

  head () {
    return {
      title: 'Católicos Integrados',
    }
  },
}
</script>
