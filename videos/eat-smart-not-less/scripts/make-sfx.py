# Generates the original sound effects used in the video (no third-party samples).
import numpy as np, wave, os
SR = 48000
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'sfx')
rng = np.random.default_rng(7)

def save(name, y):
    y = y / (np.max(np.abs(y)) + 1e-9) * 0.9
    fade = min(len(y), int(SR * 0.005))
    y[-fade:] *= np.linspace(1, 0, fade)
    with wave.open(os.path.join(OUT, name + '.wav'), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((y * 32767).astype(np.int16).tobytes())

def t(d): return np.arange(int(SR * d)) / SR
def sweep(f0, f1, d, curve=3):
    tt = t(d); f = f1 + (f0 - f1) * np.exp(-curve * tt / d)
    return np.sin(2 * np.pi * np.cumsum(f) / SR)

# pop: bubbly pitch drop
tt = t(0.12); save('pop', sweep(1100, 380, 0.12, 5) * np.exp(-tt * 30))
# soft pop for captions
tt = t(0.09); save('pop-soft', sweep(700, 300, 0.09, 5) * np.exp(-tt * 40) * 0.6)
# whoosh: band-limited noise swell
tt = t(0.35); n = rng.standard_normal(len(tt)); n = np.convolve(n, np.ones(24) / 24, 'same')
save('whoosh', n * np.sin(np.pi * tt / 0.35) ** 2)
# ding: bell
tt = t(0.8); save('ding', sum(a * np.sin(2 * np.pi * f * tt) for f, a in [(1568, 1), (3136, .4), (4700, .2)]) * np.exp(-tt * 6))
# boing: jelly wobble
tt = t(0.5); f = 220 + 120 * np.exp(-tt * 6) * np.sin(2 * np.pi * 14 * tt) + 80 * np.exp(-tt * 4)
save('boing', np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 5))
# alarm: two-tone beep
tt = t(0.5); f = np.where((tt * 8).astype(int) % 2 == 0, 880, 660)
save('alarm', np.tanh(3 * np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.5 * np.minimum(1, (0.5 - tt) * 20))
# thud: stamp slam
tt = t(0.35); save('thud', (sweep(160, 50, 0.35, 4) + 0.5 * rng.standard_normal(len(tt)) * np.exp(-tt * 60)) * np.exp(-tt * 9))
# click: UI tap
tt = t(0.05); save('click', (rng.standard_normal(len(tt)) * 0.4 + np.sin(2 * np.pi * 2400 * tt)) * np.exp(-tt * 120))
# sparkle: twinkles
y = np.zeros(int(SR * 0.6))
for i, f in enumerate([2093, 2637, 3136, 4186]):
    s = int(SR * 0.08 * i); tt = t(0.3)
    y[s:s + len(tt)] += np.sin(2 * np.pi * f * tt) * np.exp(-tt * 14)
save('sparkle', y)
# swipe-cross: quick scratch for the red X / strike
tt = t(0.18); n = rng.standard_normal(len(tt)); save('scratch', n * np.exp(-tt * 18) * np.sin(2 * np.pi * 40 * tt) ** 2)
print('ok')
