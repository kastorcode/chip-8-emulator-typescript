import { Display } from '~/services/Display'

import { Memory } from '~/services/Memory'


export class Chip8 {
  display : Display
  memory : Memory


  constructor () {
    console.log('Create a new Chip-8')
    this.display = new Display()
    this.memory = new Memory()
  }
}