/**
 * useClickSound — Xbox 360-style E-major chord via Web Audio API.
 * Notes: E4 (329.63 Hz) · G#4 (415.30 Hz) · B4 (493.88 Hz)
 *
 * playChord is defined at module scope so its reference is stable across
 * renders — safe to use as addEventListener / removeEventListener target.
 */
function playChord() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (!AudioCtx) return

    const ctx = new AudioCtx()
    const notes = [329.63, 415.30, 493.88] // E4, G#4, B4

    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type            = 'sine'
      osc.frequency.value = freq

      // Slight arpeggio stagger: 0 ms · 28 ms · 56 ms
      const t0 = ctx.currentTime + i * 0.028

      gain.gain.setValueAtTime(0, t0)
      gain.gain.linearRampToValueAtTime(0.3, t0 + 0.018)
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.42)

      osc.start(t0)
      osc.stop(t0 + 0.45)
    })

    setTimeout(() => ctx.close().catch(() => {}), 700)
  } catch {
    // Silently ignore if Web Audio API is unavailable
  }
}

export function useClickSound() {
  return { playChord }
}
