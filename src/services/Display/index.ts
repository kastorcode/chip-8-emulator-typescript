import { CHAR_SET, DISPLAY } from '~/constants'


export default class Display {
  private memory : Uint8Array
  private screen : HTMLCanvasElement | null
  private context : CanvasRenderingContext2D
  private frameBuffer : number[][]


  constructor (memory : Uint8Array) {
    console.log('Create a new Display')
    this.memory = memory
    this.screen = document.querySelector('canvas')
    this.screen.width = DISPLAY.WIDTH * DISPLAY.SCALE
    this.screen.height = DISPLAY.HEIGHT * DISPLAY.SCALE
    this.context = this.screen.getContext('2d')
    this.frameBuffer = []
    this.reset()
  }


  private reset () {
    for (let h = 0; h < DISPLAY.HEIGHT; h++) {
      this.frameBuffer.push([])
      for (let w = 0; w < DISPLAY.WIDTH; w++) {
        this.frameBuffer[h].push(0)
      }
    }
    this.context.fillStyle = DISPLAY.BG_COLOR
    this.context.fillRect(0, 0, this.screen.width, this.screen.height)
  }


  private drawBuffer () {
    for (let h = 0; h < DISPLAY.HEIGHT; h++) {
      for (let w = 0; w < DISPLAY.WIDTH; w++) {
        this.drawPixel(h, w, this.frameBuffer[h][w])
      }
    }
  }


  private drawPixel (h : number, w : number, value : number) {
    this.context.fillStyle = value
      ? DISPLAY.COLOR : DISPLAY.BG_COLOR
    this.context.fillRect(
      w * DISPLAY.SCALE, h * DISPLAY.SCALE, DISPLAY.SCALE, DISPLAY.SCALE
    )
  }


  private drawSprite (h : number, w : number, sprite : number, rows : number) {
    for (let y = 0; y < rows; y++) {
      const line = this.memory[sprite + y]
      for (let x = 0; x < CHAR_SET.WIDTH; x++) {
        const bitToCheck = 0b10000000 >> x
        const value = line & bitToCheck
        this.drawPixel(h + y, w + x, value)
      }
    }
  }
}