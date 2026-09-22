// Web Audio API Sound Synthesizer for AlgoVision Studio

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('algovision_muted') === 'true';
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('algovision_muted', String(this.muted));
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Crisp, subtle step click
  playStep(freq = 520) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Audio autoplay policy catch
    }
  }

  // Lower tick for stepping backward
  playPrev() {
    this.playStep(380);
  }

  // Reset sound
  playReset() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch {
      // ignore
    }
  }

  // Triumphant chord when algorithm animation completes
  playComplete() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.36);
      });
    } catch {
      // ignore
    }
  }

  // Success chime for saves, completions, and navigation
  playSuccess() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [587.33, 880.0]; // D5 -> A5 pleasing chime
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.26);
      });
    } catch {
      // ignore
    }
  }

  // Resonant Zen singing bowl chime (528 Hz Solfeggio frequency with gentle overtones)
  playBell() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const frequencies = [528, 1056, 1584];
      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const initialVol = idx === 0 ? 0.18 : 0.06 / (idx + 1);
        gain.gain.setValueAtTime(initialVol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 2.7);
      });
    } catch {
      // ignore
    }
  }

  // Subtle soft wooden metronome tick
  playTick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.015);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // ignore
    }
  }

  // Procedural ambient noise (Binaural Alpha Wave, Soft Rain, White Noise)
  startAmbient(type = 'binaural', volume = 0.2) {
    this.stopAmbient();
    if (this.muted || type === 'none') return;
    try {
      this.init();
      if (!this.ctx) return;

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(Math.max(0.001, volume), this.ctx.currentTime);
      masterGain.connect(this.ctx.destination);
      this.ambientGain = masterGain;

      if (type === 'binaural') {
        // 432 Hz left / 440 Hz right for 8 Hz relaxing alpha wave focus
        const oscL = this.ctx.createOscillator();
        const oscR = this.ctx.createOscillator();
        const panL = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
        const panR = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

        oscL.type = 'sine';
        oscL.frequency.setValueAtTime(432, this.ctx.currentTime);
        oscR.type = 'sine';
        oscR.frequency.setValueAtTime(440, this.ctx.currentTime);

        const gainL = this.ctx.createGain();
        gainL.gain.setValueAtTime(0.1, this.ctx.currentTime);
        const gainR = this.ctx.createGain();
        gainR.gain.setValueAtTime(0.1, this.ctx.currentTime);

        if (panL && panR) {
          panL.pan.value = -0.8;
          panR.pan.value = 0.8;
          oscL.connect(gainL);
          gainL.connect(panL);
          panL.connect(masterGain);

          oscR.connect(gainR);
          gainR.connect(panR);
          panR.connect(masterGain);
        } else {
          oscL.connect(gainL);
          gainL.connect(masterGain);
          oscR.connect(gainR);
          gainR.connect(masterGain);
        }

        oscL.start();
        oscR.start();
        this.ambientSources = [oscL, oscR];
      } else if (type === 'rain' || type === 'whitenoise') {
        const bufferSize = this.ctx.sampleRate * 3;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          if (type === 'rain') {
            output[i] = (lastOut + 0.02 * white) / 1.02;
            lastOut = output[i];
            output[i] *= 3.0;
          } else {
            output[i] = white * 0.12;
          }
        }

        const source = this.ctx.createBufferSource();
        source.buffer = noiseBuffer;
        source.loop = true;

        if (type === 'rain') {
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, this.ctx.currentTime);
          source.connect(filter);
          filter.connect(masterGain);
        } else {
          source.connect(masterGain);
        }

        source.start();
        this.ambientSources = [source];
      }
    } catch {
      // ignore
    }
  }

  setAmbientVolume(volume) {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.setValueAtTime(Math.max(0.0001, volume), this.ctx.currentTime);
      } catch {
        // ignore
      }
    }
  }

  stopAmbient() {
    if (this.ambientSources) {
      this.ambientSources.forEach((s) => {
        try {
          s.stop();
          s.disconnect();
        } catch {
          // ignore
        }
      });
      this.ambientSources = null;
    }
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch {
        // ignore
      }
      this.ambientGain = null;
    }
  }
}

export const sound = new SoundEffects();
