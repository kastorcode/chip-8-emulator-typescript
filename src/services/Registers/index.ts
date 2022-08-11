import { MEMORY, REGISTERS } from '~/constants'


export default class Registers {
  private V : Uint8Array
  private I : number
  public DT : number
  public ST : number
  private PC : number
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


  private stackPush (value : number) {
    this.SP++
    this.assertStackOverflow()
    this.stack[this.SP] = value
  }


  private stackPop () {
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