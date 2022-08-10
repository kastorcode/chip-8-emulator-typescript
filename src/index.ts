import { Chip8 } from '~/services'


const chip8 = new Chip8()


async function runChip8 () {
  chip8.display.drawSprite(1, 1, 0, 5)
  chip8.display.drawSprite(1, 6, 5, 5)
  chip8.display.drawSprite(1, 11, 10, 5)
  chip8.display.drawSprite(1, 16, 15, 5)
  chip8.display.drawSprite(1, 21, 20, 5)
  chip8.display.drawSprite(1, 26, 25, 5)
  chip8.display.drawSprite(1, 31, 30, 5)
  chip8.display.drawSprite(1, 36, 35, 5)
  chip8.display.drawSprite(1, 41, 40, 5)
  chip8.display.drawSprite(1, 46, 45, 5)
}


runChip8()