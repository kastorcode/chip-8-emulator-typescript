import { Chip8 } from '~/services'


async function runChip8 () {
  const rom = await fetch('./roms/test_opcode.ch8')
  const arrayBuffer = await rom.arrayBuffer()
  const romBuffer = new Uint8Array(arrayBuffer)
  const chip8 = new Chip8(romBuffer)
  document['chip8'] = chip8

  //
  document.chip8.registers.PC = 0x006
  document.chip8.registers.V[5] = 0x04
  document.chip8.registers.V[8] = 0x02
  console.log('V[5]: ', document.chip8.registers.V[5].toString(2))
  console.log('V[5]: ', document.chip8.registers.V[5])
  document.chip8.execute(0xafff)
  console.log('V[8]: ', document.chip8.registers.V[8].toString(2))
  console.log('V[8]: ', document.chip8.registers.V[8])
  console.log('V[5]: ', document.chip8.registers.V[5].toString(2))
  console.log('V[5]: ', document.chip8.registers.V[5])
  console.log('V[F]: ', document.chip8.registers.V[0x0f].toString(16))
  console.log('I: ', document.chip8.registers.I)
  //

  /*
  chip8.registers.ST = 10
  while (true) {
    await chip8.sleep(200)
    if (chip8.registers.DT > 0) {
      await chip8.sleep()
      chip8.registers.DT--
    }
    if (chip8.registers.ST > 0) {
      chip8.soundCard.enableSound()
      await chip8.sleep()
      chip8.registers.ST--
    }
    if (chip8.registers.ST == 0) {
      chip8.soundCard.disableSound()
    }
  }
  */
}


runChip8()