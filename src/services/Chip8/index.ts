import { Display, Memory, Registers } from '~/services'


export default class Chip8 {
  display : Display
  memory : Memory
  registers : Registers


  constructor () {
    console.log('Create a new Chip-8')
    this.display = new Display()
    this.memory = new Memory()
    this.registers = new Registers()
  }
}