import { MEMORY, REGISTERS } from '~/constants'


export default class Registers {
  public V : Uint8Array
  public I : number
  public DT : number
  public ST : number
  public PC : number
  private SP : number
  private stack : Uint16Array


  constructor () {
    console.log('Create a new Registers')
    this.V = new Uint8Array(REGISTERS.TOTAL)
    this.I = 0
    this.DT = 0
    this.ST = 0
    this.PC = MEMORY.START_PROGRAMS
    this.SP = -1
    this.stack = new Uint16Array(REGISTERS.STACK_DEEP)
    this.reset()
  }


  private reset () {
    this.V.fill(0)
    this.I = 0
    this.DT = 0
    this.ST = 0
    this.PC = MEMORY.START_PROGRAMS
    this.SP = -1
    this.stack.fill(0)
  }


  public stackPush (value : number) {
    this.SP++
    this.assertStackOverflow()
    this.stack[this.SP] = value
  }


  public stackPop () {
    const value = this.stack[this.SP]
    this.SP--
    this.assertStackUnderflow()
    return value
  }


  private assertStackOverflow () {
    console.assert(
      this.SP < REGISTERS.STACK_DEEP,
      '[Error] Stack overflow\n' + this.SP
    )
  }


  private assertStackUnderflow () {
    console.assert(
      this.SP > -2,
      '[Error] Stack underflow\n' + this.SP
    )
  }
}