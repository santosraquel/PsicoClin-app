import { mapActions, mapState } from 'vuex'

/**
 * Focus controller mixer
 */
export default {
  methods: {
    /**
     * Change focus to current component target
     */
    getFocus () {
      this.changeFocus(this.target)
    },

    /**
     * Change focus to native preset
     */
    leaveFocus () {
      this.toNativeFocus()
    },

    // Vuex actions map
    ...mapActions('cantus', [
      'changeFocus',
      'toNativeFocus']),
  },
  computed: {
    /**
     * [flag] Compute data to active status
     * @returns {boolean}
     */
    active () {
      return this.target === this.focusTarget
    },

    /**
     * [helper] Compute class based in active
     * @returns {string}
     */
    focusClass () {
      const classes = ['onFocus']
      this.active && classes.push('isActive')
      return classes
    },

    // Vuex state map
    ...mapState('cantus', [
      'focusTarget',
    ]),
  },
}
