import { Chip8 } from '~/services'


const chip8 = new Chip8()


async function runChip8 () {
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
}


document['chip8'] = chip8
runChip8()