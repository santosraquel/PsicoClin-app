import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('cantus', ['preview', 'live',
      'previewImg', 'liveImg', 'liveText', 'previewText', 'displayData']),
  },

  methods: {
    ...mapMutations('cantus', ['setPreview']),
    ...mapMutations('cantus', ['setLive']),
    ...mapMutations('cantus', ['setRenderedImage']),
    ...mapMutations('cantus', ['setRenderText']),
    ...mapMutations('cantus', ['setDisplayData']),
  },
})
