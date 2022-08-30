export interface iREGISTERS {
  TOTAL : number
  STACK_DEEP : number
  HZ15 : number
  HZ30 : number
  HZ60 : number
  HZ120 : number
  HZ240 : number
}


const REGISTERS : iREGISTERS = {
  TOTAL: 16,
  STACK_DEEP: 16,
  HZ15: 1000 / 15,
  HZ30: 1000 / 30,
  HZ60: 1000 / 60,
  HZ120: 1000 / 120,
  HZ240: 1000 / 240
}


export default REGISTERS