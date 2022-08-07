import DISPLAY from '~/constants/Display'


export class Display {
  private screen : HTMLCanvasElement | null
  private context : CanvasRenderingContext2D
  private frameBuffer : number[][]


  constructor () {
    console.log('Create a new Display')
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
}