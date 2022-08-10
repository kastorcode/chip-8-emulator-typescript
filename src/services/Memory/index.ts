import { MEMORY } from '~/constants'


export default class Memory {
  public memory : Uint8Array


  constructor () {
    console.log('Create a new Memory')
    this.memory = new Uint8Array(MEMORY.SIZE)
    this.reset()
  }


  private reset () {
    this.memory.fill(0)
  }


  private setMemory (index : number, value : number) {
    this.assertMemory(index)
    this.memory[index] = value
  }


  private getMemory (index : number) {
    this.assertMemory(index)
    return this.memory[index]
  }


  private assertMemory (index : number) {
    console.assert(
      index > -1 && index < MEMORY.SIZE,
      '[Error] Trying to access an out of range memory index\n' + index
    )
  }
}