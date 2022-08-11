import { CHAR_SET, MEMORY, REGISTERS } from '~/constants'

import { Display, Keyboard, Memory, Registers, SoundCard } from '~/services'


export default class Chip8 {
  private memory : Memory
  public registers : Registers
  private keyboard : Keyboard
  public soundCard : SoundCard
  private display : Display


  constructor () {
    console.log('Create a new Chip-8')
    this.memory = new Memory()
    this.loadCharSet()
    this.registers = new Registers()
    this.keyboard = new Keyboard()
    this.soundCard = new SoundCard()
    this.display = new Display(this.memory.memory)
  }


  public sleep (ms = REGISTERS.TIMER_60_HZ) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }


  private loadCharSet () {
    this.memory.memory.set(CHAR_SET.CHARACTERS, MEMORY.CHAR_SET_ADDRESS)
  }
}