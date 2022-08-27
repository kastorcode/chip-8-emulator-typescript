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


  public setMemory (index : number, value : number) {
    this.assertMemory(index)
    this.memory[index] = value
  }


  public getMemory (index : number) {
    this.assertMemory(index)
    return this.memory[index]
  }


  public getOpcode (index : number) {
    const highByte = this.getMemory(index)
    const lowByte = this.getMemory(index + 1)
    return (highByte << 8) | lowByte
  }


  private assertMemory (index : number) {
    console.assert(
      index > -1 && index < MEMORY.SIZE,
      '[Error] Trying to access an out of range memory index\n' + index
    )
  }
}