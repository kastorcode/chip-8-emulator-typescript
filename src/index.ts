import { Chip8 } from '~/services'


const chip8 = new Chip8()


async function runChip8 () {
  while (true) {
    const hasKeydown = chip8.keyboard.hasKeydown()
    const isKeydown = chip8.keyboard.isKeydown(1)
    //
    console.log('hasKeydown: ', hasKeydown)
    console.log('isKeydown: ', isKeydown)
    //
    await chip8.sleep()
  }
}


runChip8()