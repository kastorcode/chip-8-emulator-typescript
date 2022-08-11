import { SOUND_CARD } from '~/constants'


export default class SoundCard {
  private soundEnabled : boolean


  constructor () {
    console.log('Create a new SoundCard')
    this.soundEnabled = false
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
      // @ts-ignore
      const audioContext : AudioContext = new (AudioContext || webkitAudioContext)()
      const masterGain = new GainNode(audioContext)
      masterGain.gain.value = SOUND_CARD.INITIAL_VOLUME
      masterGain.connect(audioContext.destination)
      let soundEnabled = false
      let oscillator : OscillatorNode
      Object.defineProperties(this, {
        soundEnabled: {
          get: () => soundEnabled,
          set: (value : boolean) => {
            if (value == soundEnabled) {
              return
            }
            soundEnabled = value
            if (soundEnabled) {
              oscillator = new OscillatorNode(audioContext, { type: 'square' })
              oscillator.connect(masterGain)
              oscillator.start()
            }
            else {
              oscillator.stop()
            }
          }
        }
      })
    }
  }


  public enableSound () {
    this.soundEnabled = true
  }


  public disableSound () {
    this.soundEnabled = false
  }
}