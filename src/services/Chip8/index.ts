import { Display } from '~/services/Display'


export class Chip8 {
  display : Display


  constructor () {
    console.log('Create a new Chip-8')
    this.display = new Display()
  }
}