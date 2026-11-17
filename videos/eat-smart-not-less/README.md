# EAT SMART, NOT LESS — #THEBODYNEXT IG Reel

1080×1920, 30fps, ~28 วินาที พร้อมเสียงพากย์ (เร่ง 1.12x) + SFX มาสคอต "น้องไข"

## คำสั่ง
```bash
npm install
npm run dev      # เปิด Remotion Studio
npm run render   # เรนเดอร์ไป out/eat-smart-not-less.mp4
```

## เสียง
- `public/voiceover-original.mp3` ไฟล์พากย์ต้นฉบับ (ElevenLabs)
- `public/voiceover.wav` เร่ง 1.12 เท่า: `ffmpeg -i public/voiceover-original.mp3 -af atempo=1.12 -ar 48000 public/voiceover.wav`
- `public/sfx/` เสียงเอฟเฟกต์ที่สังเคราะห์เอง สร้างใหม่ด้วย `python3 scripts/make-sfx.py`

## ปรับจังหวะ
เวลาทั้งหมดอยู่ใน `src/timing.ts` เป็นวินาทีของไฟล์ต้นฉบับ (ฟังใน player ทั่วไปแล้วแก้ตัวเลขได้เลย)
- `SPEED` ความเร็วเสียง (ถ้าเปลี่ยน ต้องรัน ffmpeg ใหม่ด้วยค่าเดียวกัน)
- `CAPTIONS` เวลาเริ่มของซับแต่ละบรรทัด
- จังหวะภาพแต่ละฉากอยู่ในตัวแปร `T` ของไฟล์ใน `src/scenes/`

## โครงสร้าง
- `src/scenes/` — Hook, Concept, KeyPoint (split screen), Outro (ชวนเข้าคลาส Zoom)
- `src/components/` — NongKhai (มาสคอต), Logo, Caption, Scale, BodyFigure, Sfx
