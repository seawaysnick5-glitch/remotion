import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Caption} from '../components/Caption';
import {Sfx} from '../components/Sfx';
import {at, CAPTIONS, SCENE_FRAMES} from '../timing';
import {Logo} from '../components/Logo';
import {NongKhai} from '../components/NongKhai';
import {C, FONT_BRAND, FONT_TH, FONT_TH_ITALIC, pop} from '../theme';

// 0:23–0:34  CTA: free online class on Zoom, Wednesday 19:00
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Tile: React.FC<{top: string; main: string; sub: string; s: number; icon: React.ReactNode}> = ({
	top,
	main,
	sub,
	s,
	icon,
}) => (
	<div
		style={{
			flex: 1,
			background: C.lime,
			border: `6px solid ${C.black}`,
			borderRadius: 30,
			overflow: 'hidden',
			transform: `scale(${s})`,
			textAlign: 'center',
		}}
	>
		<div
			style={{
				background: C.black,
				color: C.lime,
				fontFamily: FONT_BRAND,
				fontSize: 40,
				padding: '6px 0',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 12,
			}}
		>
			{icon}
			{top}
		</div>
		<div style={{fontFamily: FONT_TH, fontWeight: 900, fontSize: 84, lineHeight: 1.15, color: C.black, marginTop: 10}}>
			{main}
		</div>
		<div style={{fontFamily: FONT_TH, fontWeight: 800, fontSize: 40, color: C.black, marginBottom: 16}}>{sub}</div>
	</div>
);

const CtaButton: React.FC<{
	label: string;
	icon: 'link' | 'chat';
	s: number;
	pressed: boolean;
	dark: boolean;
}> = ({label, icon, s, pressed, dark}) => (
	<div
		style={{
			width: 820,
			background: dark ? C.black : C.white,
			color: dark ? C.lime : C.black,
			border: `6px solid ${C.black}`,
			boxShadow: pressed ? `2px 2px 0 ${C.black}` : `10px 10px 0 ${C.black}`,
			borderRadius: 70,
			padding: '18px 0',
			fontFamily: FONT_TH,
			fontWeight: 900,
			fontSize: 56,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 20,
			transform: `scale(${s * (pressed ? 0.95 : 1)}) translate(${pressed ? 8 : 0}px, ${pressed ? 8 : 0}px)`,
		}}
	>
		<svg width={56} height={56} viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
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

	// phase A: the question
	const t = at.outro;
	const T = {
		question: t(19.23), // "ใครอยากปั้นหุ่น"
		card: t(21.21), // "เจอกันในคลาสออนไลน์"
		day: t(23.41), // "วันพุธนี้"
		time: t(24.0), // "เวลา 1 ทุ่มตรง"
		free: t(25.26), // "คลาสนี้ฟรี"
		btn1: t(26.56), // "รีบคลิกลิงก์"
		press1: t(27.1),
		btn2: t(27.84), // "หรือทักแชต"
		press2: t(28.25),
		end: t(29.4), // "แล้วเจอกันวันพุธนี้"
	};
	const len = SCENE_FRAMES.outro;
	const qIn = pop(frame, T.question, 10);
	const qOut = interpolate(frame, [T.card - 8, T.card + 2], [1, 0], clamp);
	const coachIn = pop(frame, T.question + 4, 13);
	const tagIn = pop(frame, T.question + 16, 10);
	const hostIn = pop(frame, T.card + 10, 11);

	// phase B: class card
	const cardIn = pop(frame, T.card, 11);
	const dayIn = pop(frame, T.day, 10);
	const timeIn = pop(frame, T.time, 10);
	const stamp = interpolate(frame, [T.free, T.free + 6], [3.2, 1], clamp);
	const shake = frame >= T.free + 6 && frame < T.free + 16 ? Math.sin(frame * 3) * 8 : 0;

	// phase C: buttons + tapping finger
	const btn1In = pop(frame, T.btn1, 11);
	const btn2In = pop(frame, T.btn2, 11);
	const press1 = frame >= T.press1 && frame < T.press1 + 7;
	const press2 = frame >= T.press2 && frame < T.press2 + 7;
	const fingerY = interpolate(frame, [T.btn1 + 4, T.press1, T.press1 + 7, T.press2], [1260, 1190, 1190, 1325], clamp);
	const fingerX = interpolate(frame, [T.btn1 + 4, T.press1], [400, 0], clamp);
	const fingerVisible = frame >= T.btn1 + 4 && frame < T.end;

	// phase D: see you Wednesday
	const contentOut = interpolate(frame, [T.end - 4, T.end + 6], [1, 0], clamp);
	const endIn = pop(frame, T.end, 10);
	const endFade = interpolate(frame, [len - 10, len], [0, 1], clamp);

	return (
		<AbsoluteFill style={{background: C.lime}}>
			{/* phase A: meet coach TAI */}
			{frame < T.card + 2 ? (
				<AbsoluteFill style={{opacity: qOut, alignItems: 'center'}}>
					{/* giant name behind the coach */}
					<div
						style={{
							position: 'absolute',
							top: 520,
							fontFamily: FONT_BRAND,
							fontSize: 640,
							lineHeight: 1,
							color: C.black,
							transform: `skewX(-10deg) scale(${pop(frame, T.question, 12)})`,
							letterSpacing: 10,
						}}
					>
						TAI
					</div>
					<div
						style={{
							marginTop: 260,
							textAlign: 'center',
							fontFamily: FONT_TH_ITALIC,
							fontStyle: 'italic',
							fontWeight: 900,
							fontSize: 92,
							lineHeight: 1.2,
							color: C.black,
							transform: `scale(${qIn}) rotate(-4deg)`,
							zIndex: 2,
						}}
					>
						อยากปั้นหุ่น
						<br />
						<span style={{background: C.black, color: C.lime, padding: '0 24px', borderRadius: 24}}>แบบยั่งยืน?</span>
					</div>
					<Img
						src={staticFile('trainer/tai.png')}
						style={{
							position: 'absolute',
							top: 500,
							height: 1300,
							transform: `translateY(${(1 - coachIn) * 900}px)`,
							filter: `drop-shadow(5px 0 0 ${C.white}) drop-shadow(-5px 0 0 ${C.white}) drop-shadow(0 5px 0 ${C.white}) drop-shadow(0 -5px 0 ${C.white}) drop-shadow(16px 16px 0 ${C.black})`,
						}}
					/>
					{/* name tag */}
					<div
						style={{
							position: 'absolute',
							top: 1130,
							left: 40,
							background: C.black,
							border: `6px solid ${C.white}`,
							borderRadius: 28,
							padding: '10px 30px 14px',
							transform: `scale(${tagIn}) rotate(-6deg)`,
							transformOrigin: 'left center',
						}}
					>
						<div style={{fontFamily: FONT_TH, fontWeight: 800, fontSize: 40, color: C.white, lineHeight: 1.2}}>พบกับเทรนเนอร์</div>
						<div style={{fontFamily: FONT_BRAND, fontSize: 110, color: C.lime, lineHeight: 1, transform: 'skewX(-8deg)'}}>TAI</div>
					</div>
				</AbsoluteFill>
			) : null}

			{/* phase B + C */}
			{frame >= T.card && frame < T.end + 6 ? (
				<AbsoluteFill style={{alignItems: 'center', opacity: contentOut}}>
					{/* class card */}
					<div
						style={{
							position: 'relative',
							marginTop: 300,
							width: 900,
							background: C.white,
							border: `8px solid ${C.black}`,
							boxShadow: `16px 16px 0 ${C.black}`,
							borderRadius: 44,
							padding: '34px 40px 40px',
							boxSizing: 'border-box',
							transform: `scale(${cardIn}) rotate(${shake * 0.15}deg)`,
						}}
					>
						<div style={{display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center'}}>
							<div
								style={{
									background: C.red,
									color: C.white,
									fontFamily: FONT_BRAND,
									fontSize: 40,
									padding: '2px 18px',
									borderRadius: 12,
									opacity: Math.floor(frame / 10) % 2 === 0 ? 1 : 0.6,
								}}
							>
								● LIVE
							</div>
							<div style={{fontFamily: FONT_BRAND, fontSize: 52, color: C.black, display: 'flex', alignItems: 'center', gap: 12}}>
								<svg width={64} height={44} viewBox="0 0 64 44">
									<rect x={2} y={4} width={42} height={36} rx={9} fill={C.black} />
									<path d="M 46 16 L 62 6 L 62 38 L 46 28 Z" fill={C.black} />
								</svg>
								ONLINE ผ่าน ZOOM
							</div>
						</div>
						<div
							style={{
								textAlign: 'center',
								fontFamily: FONT_TH,
								fontWeight: 900,
								fontSize: 92,
								lineHeight: 1.2,
								color: C.black,
								marginTop: 12,
							}}
						>
							คลาสออนไลน์
							<div style={{fontSize: 52, fontWeight: 800}}>ปั้นหุ่นแบบยั่งยืน</div>
						</div>
						{/* host */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 20,
								marginTop: 16,
								transform: `scale(${hostIn})`,
							}}
						>
							<div
								style={{
									width: 112,
									height: 112,
									borderRadius: 56,
									border: `6px solid ${C.black}`,
									background: `${C.lime} url(${staticFile('trainer/tai.png')}) no-repeat`,
									backgroundSize: '240%',
									backgroundPosition: '50% 1%',
								}}
							/>
							<div style={{textAlign: 'left'}}>
								<div style={{fontFamily: FONT_TH, fontWeight: 700, fontSize: 36, color: C.black, lineHeight: 1.1}}>สอนโดย</div>
								<div style={{fontFamily: FONT_TH, fontWeight: 900, fontSize: 56, color: C.black, lineHeight: 1.1}}>
									เทรนเนอร์ <span style={{fontFamily: FONT_BRAND, fontWeight: 400, background: C.black, color: C.lime, padding: '0 14px', borderRadius: 10}}>TAI</span>
								</div>
							</div>
						</div>
						<div style={{display: 'flex', gap: 28, marginTop: 22}}>
							<Tile
								s={dayIn}
								top="WED"
								main="วันพุธนี้"
								sub="อย่าลืมนะ!"
								icon={
									<svg width={36} height={36} viewBox="0 0 36 36">
										<rect x={3} y={6} width={30} height={27} rx={5} fill="none" stroke={C.lime} strokeWidth={5} />
										<path d="M 3 15 L 33 15 M 11 2 L 11 9 M 25 2 L 25 9" stroke={C.lime} strokeWidth={5} />
									</svg>
								}
							/>
							<Tile
								s={timeIn}
								top="19:00"
								main="1 ทุ่มตรง"
								sub="19:00 น."
								icon={
									<svg width={36} height={36} viewBox="-18 -18 36 36">
										<circle r={14} fill="none" stroke={C.lime} strokeWidth={5} />
										<path d={`M 0 0 L 0 -8 M 0 0 L ${Math.cos(frame * 0.3) * 7} ${Math.sin(frame * 0.3) * 7}`} stroke={C.lime} strokeWidth={4} strokeLinecap="round" />
									</svg>
								}
							/>
						</div>

						{/* FREE stamp */}
						{frame >= T.free ? (
							<div
								style={{
									position: 'absolute',
									top: -150,
									right: -50,
									width: 230,
									height: 230,
									borderRadius: 115,
									background: C.red,
									border: `8px solid ${C.black}`,
									color: C.white,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									transform: `scale(${stamp}) rotate(${14 + shake}deg)`,
									opacity: interpolate(frame, [T.free, T.free + 3], [0, 1], clamp),
								}}
							>
								<div style={{fontFamily: FONT_TH, fontWeight: 900, fontSize: 92, lineHeight: 1}}>ฟรี!</div>
								<div style={{fontFamily: FONT_BRAND, fontSize: 40, lineHeight: 1}}>FREE</div>
							</div>
						) : null}
					</div>

					{/* CTA buttons */}
					<div style={{position: 'absolute', top: 1150}}>
						<CtaButton label="คลิกลิงก์ลงทะเบียน" icon="link" s={btn1In} pressed={press1} dark />
					</div>
					<div style={{position: 'absolute', top: 1290}}>
						<CtaButton label="ทักแชต จองสิทธิ์ด่วน!" icon="chat" s={btn2In} pressed={press2} dark={false} />
					</div>
					{fingerVisible ? (
						<svg
							width={120}
							height={140}
							viewBox="0 0 110 130"
							style={{position: 'absolute', left: 700 + fingerX, top: fingerY}}
						>
							<path
								d="M 35 10 Q 35 0 45 0 Q 55 0 55 10 L 55 55 L 80 58 Q 100 62 98 85 L 92 120 L 35 120 L 12 80 Q 8 68 20 66 L 35 75 Z"
								fill={C.white}
								stroke={C.black}
								strokeWidth={6}
								strokeLinejoin="round"
							/>
						</svg>
					) : null}
				</AbsoluteFill>
			) : null}

			{/* phase D */}
			{frame >= T.end - 4 ? (
				<AbsoluteFill style={{alignItems: 'center'}}>
					<div style={{marginTop: 340, transform: `scale(${endIn})`}}>
						<Logo scale={0.95} showTagline />
					</div>
					<div
						style={{
							marginTop: 80,
							textAlign: 'center',
							fontFamily: FONT_TH_ITALIC,
							fontStyle: 'italic',
							fontWeight: 900,
							fontSize: 116,
							lineHeight: 1.2,
							color: C.black,
							transform: `scale(${pop(frame, T.end + 6, 10)}) rotate(-3deg)`,
						}}
					>
						เจอกัน
						<br />
						<span style={{background: C.black, color: C.lime, padding: '0 28px', borderRadius: 28}}>วันพุธนี้!</span>
						<div style={{fontFamily: FONT_BRAND, fontStyle: 'normal', fontSize: 70, marginTop: 10}}>19:00 · ZOOM · FREE</div>
					</div>
				</AbsoluteFill>
			) : null}

			{/* Nong Khai cheering */}
			<div
				style={{
					position: 'absolute',
					left: 20,
					top: 1130,
					transform: `scale(${endIn})`,
				}}
			>
				{frame >= T.end ? <NongKhai mood="wave" size={300} holdingBag={false} /> : null}
			</div>

			<Caption cues={CAPTIONS.outro} toFrame={t} y={1440} />

			<Sfx at={T.question} name="pop" volume={0.55} />
			<Sfx at={T.card} name="whoosh" volume={0.5} />
			<Sfx at={T.card + 3} name="pop" volume={0.5} />
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
			<Sfx at={T.end + 6} name="boing" volume={0.5} />
			<Sfx at={T.end + 10} name="ding" volume={0.4} />

			{/* fade to black so the loop back to the Hook is seamless */}
			<AbsoluteFill style={{background: C.black, opacity: endFade}} />
		</AbsoluteFill>
	);
};
