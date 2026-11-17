# EAT SMART, NOT LESS — #THEBODYNEXT IG Reel

1080×1920, 30fps, 30 วินาที (900 เฟรม) มาสคอต "น้องไข"

## คำสั่ง
```bash
npm install
npm run dev      # เปิด Remotion Studio
npm run render   # เรนเดอร์ไป out/eat-smart-not-less.mp4
```

## ใส่เสียงพากย์ / เพลง
1. วางไฟล์ไว้ที่ `public/` เช่น `public/voiceover.wav`, `public/music.mp3`
2. แก้ `defaultProps` ใน `src/Root.tsx` → `voiceoverSrc: 'voiceover.wav'`, `musicSrc: 'music.mp3'`
3. ถ้าความยาวเสียงแต่ละช่วงไม่ตรง ปรับ `SCENES` ใน `src/theme.ts` และเวลาซับใน `<Caption segments>` ของแต่ละฉาก

## โครงสร้าง
- `src/scenes/` — Hook, Concept, KeyPoint (split screen), Outro (CTA)
- `src/components/` — NongKhai (มาสคอต), Logo, Caption, Scale, BodyFigure
