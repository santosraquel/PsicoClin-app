import { set, toggle } from '@/utils/vuex'

export const strict = false

export const state = () => ({
  popup: {
    status: false,
    msg: '',
    type: '',
  },

  dialog: {
    status: false,
    msg: '',
  },

  sidebarMenu: true,
})

export const mutations = {
  setPopup: set('popup'),
  setDialog: set('dialog'),
  setBoolPopup: set('popup.status'),
  setBoolDialog: set('dialog.status'),
  setSidebarMenu: set('sidebarMenu'),
  toggleSidebarMenu: toggle('sidebarMenu'),
}
