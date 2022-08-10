import { CHAR_SET, MEMORY } from '~/constants'

import { Display, Keyboard, Memory, Registers } from '~/services'


export default class Chip8 {
  public display : Display
  private memory : Memory
  private registers : Registers
  private keyboard : Keyboard


  constructor () {
    console.log('Create a new Chip-8')
    this.memory = new Memory()
    this.loadCharSet()
    this.registers = new Registers()
    this.keyboard = new Keyboard()
    this.display = new Display(this.memory.memory)
  }


  public sleep (ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }


  private loadCharSet () {
    this.memory.memory.set(CHAR_SET.CHARACTERS, MEMORY.CHAR_SET_ADDRESS)
  }
}