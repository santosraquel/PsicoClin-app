import { set } from '@/utils/vuex'

export const state = () => ({
  live: undefined,
  liveImg: {},
  preview: undefined,
  previewText: {},
  liveText: {},
  previewImg: {},
  displayData: {
    w: 800,
    h: 600,
  },
  focusTarget: '_native_',
})

export const mutations = {
  setLive: set('live'),
  setPreview: set('preview'),
  setDisplayData: set('displayData'),

  setRenderedImage (state, payload) {
    state[`${payload.target}Img`] = {
      time: new Date().getTime(),
      src: payload.content,
    }
  },

  setRenderText (state, payload) {
    state[`${payload.target}Text`] = {
      time: new Date().getTime(),
      val: payload.content,
    }
  },

  setFocus: set('focusTarget'),
}

export const actions = {
  /**
     * Called to inform the current focus target
     * @param commit
     * @param target
     */
  changeFocus ({ commit }, target) {
    commit('setFocus', target)
  },

  toNativeFocus ({ commit }) {
    commit('setFocus', ('_native_'))
  },
}
