import {FPS} from './theme';

// The voiceover is sped up with ffmpeg (atempo) -> public/voiceover.wav.
// Every time below is in seconds of the ORIGINAL recording
// (public/voiceover-original.mp3), so it can be checked by ear in any audio player.
export const SPEED = 1.12;

const toFrame = (sec: number) => Math.round((sec / SPEED) * FPS);

// Scene boundaries (original-audio seconds), placed in the pauses between scenes
const SCENE_START = {
	hook: 0,
	concept: 6.9,
	keyPoint: 14.74,
	outro: 21.06,
	end: 30.85 + 0.75, // voice ends at 30.85, short tail for the fade-out
};

export const SCENE_FRAMES = {
	hook: toFrame(SCENE_START.concept) - toFrame(SCENE_START.hook),
	concept: toFrame(SCENE_START.keyPoint) - toFrame(SCENE_START.concept),
	keyPoint: toFrame(SCENE_START.outro) - toFrame(SCENE_START.keyPoint),
	outro: toFrame(SCENE_START.end) - toFrame(SCENE_START.outro),
};

export const TOTAL_FRAMES =
	SCENE_FRAMES.hook + SCENE_FRAMES.concept + SCENE_FRAMES.keyPoint + SCENE_FRAMES.outro;

// Frame inside a scene for a moment in the original recording
const local = (scene: keyof typeof SCENE_FRAMES) => (sec: number) =>
	toFrame(sec) - toFrame(SCENE_START[scene]);

export const at = {
	hook: local('hook'),
	concept: local('concept'),
	keyPoint: local('keyPoint'),
	outro: local('outro'),
};

export type CaptionCue = {start: number; text: string};

// Caption lines: each one shows from its start until the next line starts.
// *stars* = lime highlight.
export const CAPTIONS: Record<keyof typeof SCENE_FRAMES, CaptionCue[]> = {
	hook: [
		{start: 0.1, text: 'ใครบอกว่า ลดไขมัน ต้อง*อด*อาหาร?'},
		{start: 3.0, text: 'รู้ไหมครับ... *ยิ่งอด*'},
		{start: 4.38, text: 'ร่างกายยิ่ง *"หวง"* ไขมัน!'},
	],
	concept: [
		{start: 7.3, text: 'ความลับคือ กินให้*ฉลาด*ครับ'},
		{start: 9.32, text: 'คุม*แคลอรี*ให้พอดี'},
		{start: 10.5, text: 'เน้น*โปรตีน* อิ่มนาน'},
		{start: 11.74, text: 'จัดจานให้*ครบหมู่*'},
		{start: 12.5, text: 'อิ่มได้... *ไม่ต้องทนหิว!*'},
	],
	keyPoint: [
		{start: 14.95, text: 'ที่สำคัญ... อย่าดูแค่*ตัวเลข*บนตาชั่งครับ'},
		{start: 16.68, text: 'เพราะ "ลด*น้ำหนัก*" อาจเสียกล้ามเนื้อ'},
		{start: 18.28, text: 'จน*ตัวนิ่ม*'},
		{start: 19.2, text: 'แต่ "ลด*ไขมัน*" คือหุ่นที่*เฟิร์ม*'},
		{start: 20.24, text: 'และ*ลีน*ขึ้นจริง!'},
	],
	outro: [
		{start: 21.18, text: 'ใครอยาก*ปั้นหุ่น*แบบยั่งยืน'},
		{start: 22.94, text: 'เจอกันใน*คลาสออนไลน์* ผ่าน Zoom'},
		{start: 24.3, text: '*วันพุธนี้* เวลา *1 ทุ่มตรง!*'},
		{start: 26.5, text: 'คลาสนี้*ฟรี!*'},
		{start: 27.4, text: 'รีบ*คลิกลิงก์*ลงทะเบียน'},
		{start: 28.42, text: 'หรือ*ทักแชต*จองสิทธิ์ด่วน'},
		{start: 29.4, text: 'แล้วเจอกัน*วันพุธนี้*ครับ!'},
	],
};
