export const state = () => ({
  scriptPreview: null,
})

export const mutations = {
  setScriptPreview (state, content) {
    // TODO check content
    state.scriptPreview = content
  },
}

export const actions = {
  updatePreview (context, content) {
    // TODO check content type, request External APIs/Functions
    context.commit('setScriptPreview', content)
  },
}
