/**
 * Mixer Controle de Focus pelas setas do teclado
 */
export default {
  mounted () {
    if (isNaN(this.selected)) {
      console.error('Please use "selected" data for item select control in components that use OnArrow mixer.')
    }
    if (isNaN(this.selected)) {
      console.error('Please use "itemsCount" data for info a total count of items in components that use OnArrow mixer.')
    }
    window.addEventListener('keydown', (e) => {
      if (this.active) {
        switch (e.key) {
          case 'ArrowDown':
          case 'Enter':
            if (e.key === 'Enter' && this.target !== 'live') { return }
            e.preventDefault()
            this.nextItem()
            break
          case 'ArrowUp':
            e.preventDefault()
            this.prevItem()
            break
        }
      }
    })
  },

  methods: {
    nextItem () {
      if (this.selected >= this.itemsCount - 1) {
        this.selected = 0
        return
      }
      this.selected += 1
    },
    prevItem () {
      if (this.selected <= 0) {
        this.selected = this.itemsCount - 1
        return
      }
      this.selected -= 1
    },
  },
}
