import { CHAR_SET, DISPLAY, MEMORY, REGISTERS } from '~/constants'

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


  private async execute (opcode : number) {
    const { instruction, args } = this.disassembler.disassemble(opcode)
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
      case 'JP_V0_ADDR': {
        this.registers.PC = args[0] + this.registers.V[0]
        break
      }
      case 'RND_VX_KK': {
        this.registers.V[args[0]] = ((Math.floor(Math.random() * 255)) & args[1])
        break
      }
      case 'DRW_VX_VY_N': {
        this.registers.V[0x0f] = this.display.drawSprite(
          this.registers.V[args[1]], this.registers.V[args[0]], this.registers.I, args[2]
        )
        break
      }
      case 'SKP_VX': {
        if (this.keyboard.isKeydown(this.registers.V[args[0]])) {
          this.registers.PC += 2
        }
        break
      }
      case 'SKNP_VX': {
        if (!this.keyboard.isKeydown(this.registers.V[args[0]])) {
          this.registers.PC += 2
        }
        break
      }
      case 'LD_VX_DT': {
        this.registers.V[args[0]] = this.registers.DT
        break
      }
      case 'LD_VX_K': {
        let keyPressed = -1
        while (keyPressed == -1) {
          keyPressed = this.keyboard.hasKeydown()
          await this.sleep()
        }
        this.registers.V[args[0]] = keyPressed
        break
      }
      case 'LD_DT_VX': {
        this.registers.DT = this.registers.V[args[0]]
        break
      }
      case 'LD_ST_VX': {
        this.registers.ST = this.registers.V[args[0]]
        break
      }
      case 'ADD_I_VX': {
        this.registers.I += this.registers.V[args[0]]
        break
      }
      case 'LD_F_VX': {
        this.registers.I = this.registers.V[args[0]] * DISPLAY.SPRITE_HEIGHT
        break
      }
      case 'LD_B_VX': {
        let x = this.registers.V[args[0]]
        const hundreds = Math.floor(x / 100)
        x = x - hundreds * 100
        const tens = Math.floor(x / 10)
        const ones = Math.floor(x - tens * 10)
        this.memory.setMemory(this.registers.I, hundreds)
        this.memory.setMemory(this.registers.I + 1, tens)
        this.memory.setMemory(this.registers.I + 2, ones)
        break
      }
      case 'LD_I_VX': {
        for (let i = 0; i <= args[0]; i++) {
          this.memory.setMemory(this.registers.I + i, this.registers.V[i])
        }
        break
      }
      case 'LD_VX_I': {
        for (let i = 0; i <= args[0]; i++) {
          this.registers.V[i] = this.memory.getMemory(this.registers.I + i)
        }
        break
      }
      default: {
        console.error('[Error] CPU instruction "' + instruction.id + '" does not exist.')
        break
      }
    }
  }
}