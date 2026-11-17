# Original background track (synthesized, no samples): upbeat EDM, 124 BPM, A minor.
# Build drops right when the CTA (coach TAI) starts.
import numpy as np, wave, os

SR = 48000
BPM = 124
BEAT = 60 / BPM
BAR = BEAT * 4
DUR = 28.3
DROP = 19.0 / 1.12  # CTA start in the sped-up video (seconds)
N = int(SR * DUR)
rng = np.random.default_rng(3)
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'music.wav')

L = np.zeros(N); R = np.zeros(N)

def t(d): return np.arange(int(SR * d)) / SR

def add(sig, start, pan=0.0, gain=1.0):
    s = int(start * SR)
    if s >= N: return
    e = min(N, s + len(sig)); sig = sig[: e - s] * gain
    L[s:e] += sig * (1 - max(0, pan)); R[s:e] += sig * (1 + min(0, pan))

def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR); y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)):
        acc = (1 - a) * x[i] + a * acc; y[i] = acc
    return y

def saw(f, d):
    tt = t(d); return 2 * ((tt * f) % 1) - 1

# --- sounds ---
tt = t(0.35)
kick = np.sin(2 * np.pi * np.cumsum(50 + 110 * np.exp(-tt * 30)) / SR) * np.exp(-tt * 9)
kick += 0.3 * rng.standard_normal(len(tt)) * np.exp(-tt * 200)
tt = t(0.25)
clap = rng.standard_normal(len(tt)); clap = clap - lowpass(clap, 900)
clap *= (np.exp(-tt * 25) + 0.6 * np.exp(-((tt - 0.012) % 0.012) * 300) * (tt < 0.036))
tt = t(0.06); hat = rng.standard_normal(len(tt)); hat = hat - lowpass(hat, 7000); hat *= np.exp(-tt * 70)
tt = t(0.2); ohat = rng.standard_normal(len(tt)); ohat = ohat - lowpass(ohat, 6000); ohat *= np.exp(-tt * 18)

def bass_note(f, d):
    tt = t(d)
    x = 0.6 * saw(f, d) + 0.6 * np.sin(2 * np.pi * f * tt)
    return lowpass(x, 600) * np.minimum(1, tt * 200) * np.minimum(1, (d - tt) * 80)

def stab(freqs, d):
    tt = t(d); x = np.zeros(len(tt))
    for f in freqs:
        for det in (-0.12, 0, 0.12):  # light supersaw
            x += saw(f * 2 ** (det / 12), d)
    return lowpass(x / (3 * len(freqs)), 2600) * np.exp(-tt * 5)

# A minor progression: Am - F - C - G
CHORDS = [
    (110.0, [220.0, 261.63, 329.63]),
    (87.31, [174.61, 220.0, 261.63]),
    (130.81, [261.63, 329.63, 392.0]),
    (98.0, [196.0, 246.94, 293.66]),
]
LEAD = [659.25, 587.33, 523.25, 587.33, 659.25, 783.99, 659.25, 587.33]

# --- arrangement ---
n_beats = int(DUR / BEAT) + 1
for b in range(n_beats):
    time = b * BEAT
    bar = int(time // BAR)
    root, chord = CHORDS[bar % 4]
    pre_drop = DROP - 2 * BAR <= time < DROP
    after_drop = time >= DROP
    # kick: four on the floor, drops out during the last half bar of the build
    if not (DROP - BEAT * 2 <= time < DROP):
        add(kick, time, gain=1.0)
    if b % 4 in (1, 3):
        add(clap, time, gain=0.55)
    add(hat, time + BEAT / 2, pan=0.3, gain=0.35)
    if after_drop:
        add(hat, time + BEAT / 4, pan=-0.3, gain=0.2)
        add(hat, time + 3 * BEAT / 4, pan=-0.3, gain=0.2)
        if b % 2 == 1:
            add(ohat, time + BEAT / 2, pan=0.2, gain=0.25)
    # offbeat pumping bass (octave jump on the last eighth of each beat)
    add(bass_note(root, BEAT / 2 * 0.9), time + BEAT / 2, gain=0.55)
    # chord stabs on the offbeats
    if b % 2 == 0 or after_drop:
        add(stab(chord, 0.3), time + BEAT / 2, pan=(-0.25 if b % 2 else 0.25), gain=0.5 if after_drop else 0.35)
    # lead hook after the drop
    if after_drop:
        f = LEAD[b % 8]
        tt = t(BEAT * 0.45)
        note = (np.sign(np.sin(2 * np.pi * f * tt)) * 0.5 + np.sin(2 * np.pi * f * 2 * tt) * 0.3) * np.exp(-tt * 6)
        add(lowpass(note, 3500), time, pan=0.1, gain=0.22)

# build-up: snare roll + noise riser into the drop
roll_start = DROP - 2 * BAR
for i in range(32):
    pos = roll_start + i * (2 * BAR / 32)
    add(clap, pos, gain=0.15 + 0.35 * i / 31)
tt = t(2 * BAR); riser = rng.standard_normal(len(tt))
riser = riser - lowpass(riser, 500 + 6000 * (tt[-1] and 1))
riser *= (tt / tt[-1]) ** 2
add(riser, roll_start, gain=0.25)
# impact on the drop
tt = t(1.2)
impact = np.sin(2 * np.pi * np.cumsum(40 + 60 * np.exp(-tt * 6)) / SR) * np.exp(-tt * 3)
impact += 0.4 * lowpass(rng.standard_normal(len(tt)), 3000) * np.exp(-tt * 4)
add(impact, DROP, gain=0.8)

# sidechain pump (duck everything except the kick a little on each beat)
pos = (np.arange(N) / SR) % BEAT
pump = 0.55 + 0.45 * np.minimum(1, pos / (BEAT * 0.45))
mix = np.stack([L, R], 1) * pump[:, None]
# fade out at the end
fade = np.minimum(1, (DUR - np.arange(N) / SR) / 0.6)
mix *= np.clip(fade, 0, 1)[:, None]
mix = np.tanh(mix / np.max(np.abs(mix)) * 1.6) * 0.9
with wave.open(OUT, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
print('wrote', OUT)
