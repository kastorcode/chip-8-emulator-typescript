import { Chip8 } from '~/services'


const chip8 = new Chip8()


async function runChip8 () {
  while (true) {
    await chip8.sleep(1000)
    if (chip8.registers.DT > 0) {
      await chip8.sleep()
      chip8.registers.DT--
    }
  }
}


runChip8()