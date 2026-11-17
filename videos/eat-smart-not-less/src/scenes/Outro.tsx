import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Caption} from '../components/Caption';
import {Logo} from '../components/Logo';
import {NongKhai} from '../components/NongKhai';
import {Sfx} from '../components/Sfx';
import {C, FONT_BRAND, FONT_TH, FONT_TH_ITALIC, pop} from '../theme';
import {at, CAPTIONS, SCENE_FRAMES} from '../timing';

// CTA: coach TAI as the hero (slow zoom) + free online class info in a left column
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Layout grid
const COL_X = 50; // left info column
const COL_W = 500;
const GAP = 24;

const slideIn = (s: number) => ({
	transform: `translateX(${(1 - s) * -560}px)`,
	opacity: Math.min(1, s * 1.4),
});

const Tile: React.FC<{top: string; main: string; s: number}> = ({top, main, s}) => (
	<div
		style={{
			flex: 1,
			background: C.white,
			border: `6px solid ${C.black}`,
			borderRadius: 26,
			overflow: 'hidden',
			textAlign: 'center',
			transform: `scale(${s})`,
			boxShadow: `8px 8px 0 ${C.black}`,
		}}
	>
		<div style={{background: C.black, color: C.lime, fontFamily: FONT_BRAND, fontSize: 38, padding: '4px 0'}}>{top}</div>
		<div style={{fontFamily: FONT_TH, fontWeight: 900, fontSize: 54, lineHeight: 1.25, color: C.black, padding: '8px 0 12px'}}>
			{main}
		</div>
	</div>
);

const CtaButton: React.FC<{label: string; icon: 'link' | 'chat'; s: number; pressed: boolean; dark: boolean}> = ({
	label,
	icon,
	s,
	pressed,
	dark,
}) => (
	<div
		style={{
			width: 820,
			background: dark ? C.black : C.white,
			color: dark ? C.lime : C.black,
			border: `6px solid ${C.black}`,
			boxShadow: pressed ? `2px 2px 0 ${C.black}` : `10px 10px 0 ${C.black}`,
			borderRadius: 70,
			padding: '16px 0',
			fontFamily: FONT_TH,
			fontWeight: 900,
			fontSize: 54,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 20,
			transform: `scale(${s * (pressed ? 0.95 : 1)}) translate(${pressed ? 8 : 0}px, ${pressed ? 8 : 0}px)`,
		}}
	>
		<svg width={52} height={52} viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
			{icon === 'link' ? (
				<>
					<path d="M 24 32 L 32 24" />
					<path d="M 20 26 L 14 32 Q 8 40 16 44 Q 22 48 28 42 L 32 38" />
					<path d="M 36 30 L 42 24 Q 48 16 40 12 Q 34 8 28 14 L 24 18" />
				</>
			) : (
				<path d="M 8 12 L 48 12 L 48 38 L 22 38 L 12 46 L 12 38 L 8 38 Z" />
			)}
		</svg>
		{label}
	</div>
);

export const Outro: React.FC = () => {
	const frame = useCurrentFrame();
	const t = at.outro;
	const T = {
		question: t(19.23), // "ใครอยากปั้นหุ่นแบบยั่งยืน"
		card: t(21.21), // "เจอกันในคลาสออนไลน์ผ่าน Zoom"
		day: t(23.41), // "วันพุธนี้"
		time: t(24.0), // "เวลา 1 ทุ่มตรง"
		free: t(25.26), // "คลาสนี้ฟรี"
		btn1: t(26.56), // "รีบคลิกลิงก์ลงทะเบียน"
		press1: t(27.1),
		btn2: t(27.84), // "หรือทักแชตจองสิทธิ์ด่วน"
		press2: t(28.25),
		end: t(29.4), // "แล้วเจอกันวันพุธนี้ครับ"
	};
	const len = SCENE_FRAMES.outro;

	// coach: enters from below, then slowly grows for the whole scene
	const coachIn = pop(frame, T.question, 14);
	const coachZoom = interpolate(frame, [T.question, len], [1, 1.18], clamp);
	const bigNameIn = pop(frame, T.question + 2, 12);

	// left column
	const headIn = pop(frame, T.question, 11);
	const tagIn = pop(frame, T.question + 12, 11);
	const classIn = pop(frame, T.card, 11);
	const dayIn = pop(frame, T.day, 10);
	const timeIn = pop(frame, T.time, 10);
	const stamp = interpolate(frame, [T.free, T.free + 6], [3.2, 1], clamp);
	const shake = frame >= T.free + 6 && frame < T.free + 16 ? Math.sin(frame * 3) * 8 : 0;

	// buttons + finger
	const btn1In = pop(frame, T.btn1, 11);
	const btn2In = pop(frame, T.btn2, 11);
	const press1 = frame >= T.press1 && frame < T.press1 + 7;
	const press2 = frame >= T.press2 && frame < T.press2 + 7;
	const fingerY = interpolate(frame, [T.btn1 + 4, T.press1, T.press1 + 7, T.press2], [1250, 1185, 1185, 1320], clamp);
	const fingerX = interpolate(frame, [T.btn1 + 4, T.press1], [400, 0], clamp);
	const fingerVisible = frame >= T.btn1 + 4 && frame < T.end;

	// ending: info out, brand + "see you Wednesday" in, coach stays
	const infoOut = interpolate(frame, [T.end - 4, T.end + 6], [1, 0], clamp);
	const endIn = pop(frame, T.end, 10);
	const endTextIn = pop(frame, T.end + 6, 10);
	const endFade = interpolate(frame, [len - 10, len], [0, 1], clamp);

	return (
		<AbsoluteFill style={{background: C.lime, overflow: 'hidden'}}>
			{/* giant name behind the coach */}
			<div
				style={{
					position: 'absolute',
					top: 430,
					right: -30,
					fontFamily: FONT_BRAND,
					fontSize: 560,
					lineHeight: 1,
					color: C.black,
					letterSpacing: 6,
					transform: `skewX(-10deg) scale(${bigNameIn * (0.95 + (coachZoom - 1) * 0.5)})`,
					transformOrigin: '70% 50%',
				}}
			>
				TAI
			</div>

			{/* hero: coach TAI */}
			<div
				style={{
					position: 'absolute',
					left: 570,
					top: 400,
					width: 520,
					height: 1400,
					display: 'flex',
					justifyContent: 'center',
					transform: `translateY(${(1 - coachIn) * 1000}px) scale(${coachZoom})`,
					transformOrigin: '65% 100%',
				}}
			>
				<Img
					src={staticFile('trainer/tai.png')}
					style={{
						height: 1400,
						filter: `drop-shadow(5px 0 0 ${C.white}) drop-shadow(-5px 0 0 ${C.white}) drop-shadow(0 5px 0 ${C.white}) drop-shadow(0 -5px 0 ${C.white}) drop-shadow(16px 16px 0 ${C.black})`,
					}}
				/>
			</div>

			{/* left info column */}
			<div
				style={{
					position: 'absolute',
					left: COL_X,
					top: 250,
					width: COL_W,
					display: 'flex',
					flexDirection: 'column',
					gap: GAP,
					opacity: infoOut,
				}}
			>
				{/* headline */}
				<div
					style={{
						fontFamily: FONT_TH_ITALIC,
						fontStyle: 'italic',
						fontWeight: 900,
						fontSize: 88,
						lineHeight: 1.2,
						color: C.black,
						...slideIn(headIn),
					}}
				>
					อยากปั้นหุ่น
					<br />
					<span style={{background: C.black, color: C.lime, padding: '0 22px', borderRadius: 22}}>แบบยั่งยืน?</span>
				</div>

				{/* meet coach TAI */}
				<div
					style={{
						alignSelf: 'flex-start',
						background: C.black,
						border: `6px solid ${C.white}`,
						borderRadius: 26,
						padding: '8px 28px 12px',
						...slideIn(tagIn),
					}}
				>
					<div style={{fontFamily: FONT_TH, fontWeight: 800, fontSize: 38, color: C.white, lineHeight: 1.2}}>พบกับเทรนเนอร์</div>
					<div style={{fontFamily: FONT_BRAND, fontSize: 100, color: C.lime, lineHeight: 1, transform: 'skewX(-8deg)'}}>TAI</div>
				</div>

				{/* class */}
				<div
					style={{
						background: C.white,
						border: `6px solid ${C.black}`,
						borderRadius: 26,
						boxShadow: `8px 8px 0 ${C.black}`,
						padding: '14px 24px 16px',
						...slideIn(classIn),
					}}
				>
					<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
						<div
							style={{
								background: C.red,
								color: C.white,
								fontFamily: FONT_BRAND,
								fontSize: 34,
								padding: '0 14px',
								borderRadius: 10,
								opacity: Math.floor(frame / 10) % 2 === 0 ? 1 : 0.6,
							}}
						>
							● LIVE
						</div>
						<svg width={52} height={36} viewBox="0 0 64 44">
							<rect x={2} y={4} width={42} height={36} rx={9} fill={C.black} />
							<path d="M 46 16 L 62 6 L 62 38 L 46 28 Z" fill={C.black} />
						</svg>
						<div style={{fontFamily: FONT_BRAND, fontSize: 42, color: C.black}}>ZOOM</div>
					</div>
					<div style={{fontFamily: FONT_TH, fontWeight: 900, fontSize: 70, lineHeight: 1.15, color: C.black, marginTop: 4}}>
						คลาสออนไลน์
					</div>
				</div>

				{/* day + time */}
				<div style={{display: 'flex', gap: 20}}>
					<Tile s={dayIn} top="WED" main="วันพุธนี้" />
					<Tile s={timeIn} top="19:00 น." main="1 ทุ่มตรง" />
				</div>
			</div>

			{/* FREE stamp, slammed onto the class card */}
			{frame >= T.free ? (
				<div
					style={{
						position: 'absolute',
						left: 790,
						top: 690,
						width: 200,
						height: 200,
						borderRadius: 100,
						background: C.red,
						border: `8px solid ${C.black}`,
						color: C.white,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `scale(${stamp}) rotate(${14 + shake}deg)`,
						opacity: interpolate(frame, [T.free, T.free + 3], [0, 1], clamp) * infoOut,
					}}
				>
					<div style={{fontFamily: FONT_TH, fontWeight: 900, fontSize: 80, lineHeight: 1}}>ฟรี!</div>
					<div style={{fontFamily: FONT_BRAND, fontSize: 36, lineHeight: 1}}>FREE</div>
				</div>
			) : null}

			{/* CTA buttons */}
			<AbsoluteFill style={{alignItems: 'center', opacity: infoOut}}>
				<div style={{position: 'absolute', top: 1150}}>
					<CtaButton label="คลิกลิงก์ลงทะเบียน" icon="link" s={btn1In} pressed={press1} dark />
				</div>
				<div style={{position: 'absolute', top: 1285}}>
					<CtaButton label="ทักแชต จองสิทธิ์ด่วน!" icon="chat" s={btn2In} pressed={press2} dark={false} />
				</div>
			</AbsoluteFill>
			{fingerVisible ? (
				<svg width={120} height={140} viewBox="0 0 110 130" style={{position: 'absolute', left: 760 + fingerX, top: fingerY}}>
					<path
						d="M 35 10 Q 35 0 45 0 Q 55 0 55 10 L 55 55 L 80 58 Q 100 62 98 85 L 92 120 L 35 120 L 12 80 Q 8 68 20 66 L 35 75 Z"
						fill={C.white}
						stroke={C.black}
						strokeWidth={6}
						strokeLinejoin="round"
					/>
				</svg>
			) : null}

			{/* ending */}
			{frame >= T.end - 4 ? (
				<>
					<div style={{position: 'absolute', left: -150, top: 230, transform: `scale(${endIn * 0.62})`, transformOrigin: 'left top'}}>
						<div style={{paddingLeft: 330}}>
							<Logo scale={1} showTagline />
						</div>
					</div>
					<div
						style={{
							position: 'absolute',
							left: COL_X,
							top: 560,
							width: COL_W,
							fontFamily: FONT_TH_ITALIC,
							fontStyle: 'italic',
							fontWeight: 900,
							fontSize: 104,
							lineHeight: 1.2,
							color: C.black,
							...slideIn(endTextIn),
						}}
					>
						เจอกัน
						<br />
						<span style={{background: C.black, color: C.lime, padding: '0 22px', borderRadius: 22}}>วันพุธนี้!</span>
						<div style={{fontFamily: FONT_BRAND, fontStyle: 'normal', fontSize: 58, marginTop: 14}}>19:00 · ZOOM · FREE</div>
					</div>
					<div style={{position: 'absolute', left: 30, top: 1060, transform: `scale(${pop(frame, T.end + 10, 10)})`}}>
						<NongKhai mood="wave" size={300} holdingBag={false} />
					</div>
				</>
			) : null}

			<Caption cues={CAPTIONS.outro} toFrame={t} y={1440} />

			<Sfx at={T.question} name="whoosh" volume={0.5} />
			<Sfx at={T.question + 8} name="thud" volume={0.45} />
			<Sfx at={T.question + 12} name="pop" volume={0.5} />
			<Sfx at={T.card} name="pop" volume={0.55} />
			<Sfx at={T.day} name="pop" volume={0.55} />
			<Sfx at={T.time} name="pop" volume={0.55} />
			<Sfx at={T.time + 4} name="ding" volume={0.35} />
			<Sfx at={T.free + 5} name="thud" volume={0.7} />
			<Sfx at={T.free + 6} name="sparkle" volume={0.4} />
			<Sfx at={T.btn1} name="pop" volume={0.5} />
			<Sfx at={T.press1} name="click" volume={0.7} />
			<Sfx at={T.btn2} name="pop" volume={0.5} />
			<Sfx at={T.press2} name="click" volume={0.7} />
			<Sfx at={T.end} name="whoosh" volume={0.45} />
			<Sfx at={T.end + 10} name="boing" volume={0.5} />
			<Sfx at={T.end + 14} name="ding" volume={0.4} />

			{/* fade to black so the loop back to the Hook is seamless */}
			<AbsoluteFill style={{background: C.black, opacity: endFade}} />
		</AbsoluteFill>
	);
};
