import { INSTRUCTION_SET } from '~/constants'


export default class Disassembler {
  constructor () {
    console.log('Create a new Disassembler')
  }


  public disassemble (opcode : number) {
    const instruction = INSTRUCTION_SET.INSTRUCTIONS.find(
      ({ mask, pattern }) => (opcode & mask) === pattern
    )
    const args = instruction.arguments.map(
      ({ mask, shift }) => (opcode & mask) >> shift
    )
    return {
      instruction,
      args
    }
  }
}