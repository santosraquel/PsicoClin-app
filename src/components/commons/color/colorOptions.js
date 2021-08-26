import { arraySearch } from '~/utils'

export const colorOptions = {
  RED: 'red',
  GREEN: 'green',
  WHITE: 'white',
  VIOLET: 'violet',
  ROSE: 'rose',
  BLACK: 'black',
  GOLD: 'gold',
  SILVER: 'silver',

  getItems () {
    return [
      { value: this.RED, text: 'Vermelha' },
      { value: this.GREEN, text: 'Verde' },
      { value: this.WHITE, text: 'Branca' },
      { value: this.VIOLET, text: 'Roxo' },
      { value: this.ROSE, text: 'Rosa' },
      { value: this.BLACK, text: 'Preta' },
      { value: this.GOLD, text: 'Ouro' },
      { value: this.SILVER, text: 'Prata' },
    ]
  },

  getText (v) {
    return arraySearch('value', v, this.getItems()).text
  },
}
