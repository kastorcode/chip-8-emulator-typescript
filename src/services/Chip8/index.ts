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
    switch (instruction.id) {
      case 'CLS': {
        this.display.reset()
        break
      }
      default: {
        console.error('[Error] CPU instruction "' + instruction.id + '" does not exist.')
        break
      }
    }
  }
}