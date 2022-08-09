import { KEYBOARD } from '~/constants'


export default class Keyboard {
  private keys : boolean[]


  constructor () {
    this.keys = new Array(KEYBOARD.KEYS_TOTAL).fill(false)
    document.addEventListener('keydown', event => this.keydown(event))
    document.addEventListener('keyup', event => this.keyup(event))
  }


  private keydown ({ key } : KeyboardEvent) {
    const keyIndex = KEYBOARD.KEY_MAP.findIndex(mapKey => mapKey == key.toLowerCase())
    if (keyIndex == -1) {
      return
    }
    this.keys[keyIndex] = true
  }


  private keyup ({ key } : KeyboardEvent) {
    const keyIndex = KEYBOARD.KEY_MAP.findIndex(mapKey => mapKey == key.toLowerCase())
    if (keyIndex == -1) {
      return
    }
    this.keys[keyIndex] = false
  }


  public isKeydown (keyIndex) {
    return this.keys[keyIndex]
  }


  public hasKeydown () {
    return this.keys.findIndex(key => key) != -1
  }
}