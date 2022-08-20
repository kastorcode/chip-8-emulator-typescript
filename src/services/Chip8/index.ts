import { CHAR_SET, MEMORY, REGISTERS } from '~/constants'

import { Disassembler, Display, Keyboard, Memory, Registers, SoundCard } from '~/services'


export default class Chip8 {
  private memory : Memory
  public registers : Registers
  private keyboard : Keyboard
  public soundCard : SoundCard
  private disassembler : Disassembler
  private display : Display


  constructor (romBuffer : Uint8Array) {
    console.log('Create a new Chip-8')
    this.memory = new Memory()
    this.registers = new Registers()
    this.loadCharSet()
    this.loadRom(romBuffer)
    this.keyboard = new Keyboard()
    this.soundCard = new SoundCard()
    this.disassembler = new Disassembler()
    this.display = new Display(this.memory.memory)
  }


  public sleep (ms = REGISTERS.TIMER_60_HZ) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }


  private loadCharSet () {
    this.memory.memory.set(CHAR_SET.CHARACTERS, MEMORY.CHAR_SET_ADDRESS)
  }


  private loadRom (romBuffer : Uint8Array) {
    console.assert(
      romBuffer.length + MEMORY.START_PROGRAMS <= MEMORY.SIZE,
      '[Error] This rom is bigger than ' + MEMORY.SIZE + ' bytes'
    )
    this.memory.memory.set(romBuffer, MEMORY.START_PROGRAMS)
    this.registers.PC = MEMORY.START_PROGRAMS
  }


  private execute (opcode : number) {
    const { instruction, args } = this.disassembler.disassemble(opcode)
    //
    console.log('instruction: ', instruction)
    console.log('args: ', args)
    //
    switch (instruction.id) {
      case 'CLS': {
        this.display.reset()
        break
      }
      case 'RET': {
        this.registers.PC = this.registers.stackPop()
        break
      }
      case 'JP_ADDR': {
        this.registers.PC = args[0]
        break
      }
      case 'CALL_ADDR': {
        this.registers.stackPush(this.registers.PC)
        this.registers.PC = args[0]
        break
      }
      case 'SE_VX_KK': {
        if (this.registers.V[args[0]] === args[1]) {
          this.registers.PC += 2
        }
        break
      }
      case 'SNE_VX_KK': {
        if (this.registers.V[args[0]] !== args[1]) {
          this.registers.PC += 2
        }
        break
      }
      case 'SE_VX_VY': {
        if (this.registers.V[args[0]] === this.registers.V[args[1]]) {
          this.registers.PC += 2
        }
        break
      }
      case 'LD_VX_KK': {
        this.registers.V[args[0]] = args[1]
        break
      }
      case 'ADD_VX_KK': {
        this.registers.V[args[0]] += args[1]
        break
      }
      case 'LD_VX_VY': {
        this.registers.V[args[0]] = this.registers.V[args[1]]
        break
      }
      case 'OR_VX_VY': {
        this.registers.V[args[0]] |= this.registers.V[args[1]]
        break
      }
      case 'AND_VX_VY': {
        this.registers.V[args[0]] &= this.registers.V[args[1]]
        break
      }
      case 'XOR_VX_VY': {
        this.registers.V[args[0]] ^= this.registers.V[args[1]]
        break
      }
      case 'ADD_VX_VY': {
        this.registers.V[0x0f] = Number(this.registers.V[args[0]] + this.registers.V[args[1]] > 0xff)
        this.registers.V[args[0]] += this.registers.V[args[1]]
        break
      }
      case 'SUB_VX_VY': {
        this.registers.V[0x0f] = Number(this.registers.V[args[0]] > this.registers.V[args[1]])
        this.registers.V[args[0]] -= this.registers.V[args[1]]
        break
      }
      case 'SHR_VX_VY': {
        this.registers.V[0x0f] = this.registers.V[args[0]] & 1
        this.registers.V[args[0]] >>= 1
        break
      }
      case 'SUBN_VX_VY': {
        this.registers.V[0x0f] = Number(this.registers.V[args[1]] > this.registers.V[args[0]])
        this.registers.V[args[0]] = this.registers.V[args[1]] - this.registers.V[args[0]]
        break
      }
      case 'SHL_VX_VY': {
        this.registers.V[0x0f] = Number(Boolean(this.registers.V[args[0]] & 0x80))
        this.registers.V[args[0]] <<= 1
        break
      }
      case 'SNE_VX_VY': {
        if (this.registers.V[args[0]] !== this.registers.V[args[1]]) {
          this.registers.PC += 2
        }
        break
      }
      case 'LD_I_ADDR': {
        this.registers.I = args[0]
        break
      }
      default: {
        console.error('[Error] CPU instruction "' + instruction.id + '" does not exist.')
        break
      }
    }
  }
}