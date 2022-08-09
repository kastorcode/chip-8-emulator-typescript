import { Display, Keyboard, Memory, Registers } from '~/services'


export default class Chip8 {
  private display : Display
  private memory : Memory
  private registers : Registers
  public keyboard : Keyboard


  constructor () {
    console.log('Create a new Chip-8')
    this.display = new Display()
    this.memory = new Memory()
    this.registers = new Registers()
    this.keyboard = new Keyboard()
  }


  public sleep (ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}