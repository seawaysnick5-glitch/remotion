import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Caption} from '../components/Caption';
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
	const qIn = pop(frame, 0, 10);
	const qOut = interpolate(frame, [40, 50], [1, 0], clamp);

	// phase B: class card
	const cardIn = pop(frame, 46, 11);
	const dayIn = pop(frame, 92, 10);
	const timeIn = pop(frame, 112, 10);
	const stamp = interpolate(frame, [150, 158], [3.2, 1], clamp);
	const shake = frame >= 158 && frame < 170 ? Math.sin(frame * 3) * 8 : 0;

	// phase C: buttons + tapping finger
	const btn1In = pop(frame, 182, 11);
	const btn2In = pop(frame, 222, 11);
	const press1 = frame >= 204 && frame < 212;
	const press2 = frame >= 248 && frame < 256;
	const fingerY = interpolate(frame, [190, 204, 230, 248], [1150, 1080, 1080, 1225], clamp);
	const fingerX = interpolate(frame, [190, 204], [400, 0], clamp);
	const fingerVisible = frame >= 190 && frame < 266;

	// phase D: see you Wednesday
	const contentOut = interpolate(frame, [266, 276], [1, 0], clamp);
	const endIn = pop(frame, 272, 10);
	const endFade = interpolate(frame, [320, 330], [0, 1], clamp);

	return (
		<AbsoluteFill style={{background: C.lime}}>
			{/* phase A */}
			{frame < 50 ? (
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: qOut}}>
					<div
						style={{
							marginTop: -200,
							textAlign: 'center',
							fontFamily: FONT_TH_ITALIC,
							fontStyle: 'italic',
							fontWeight: 900,
							fontSize: 130,
							lineHeight: 1.2,
							color: C.black,
							transform: `scale(${qIn}) rotate(-4deg)`,
						}}
					>
						อยากปั้นหุ่น
						<br />
						<span style={{background: C.black, color: C.lime, padding: '0 30px', borderRadius: 30}}>แบบยั่งยืน?</span>
					</div>
				</AbsoluteFill>
			) : null}

			{/* phase B + C */}
			{frame >= 46 && frame < 276 ? (
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
								fontSize: 104,
								lineHeight: 1.2,
								color: C.black,
								marginTop: 12,
							}}
						>
							คลาสออนไลน์
							<div style={{fontSize: 52, fontWeight: 800}}>ปั้นหุ่นแบบยั่งยืน</div>
						</div>
						<div style={{display: 'flex', gap: 28, marginTop: 28}}>
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
						{frame >= 150 ? (
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
									opacity: interpolate(frame, [150, 154], [0, 1], clamp),
								}}
							>
								<div style={{fontFamily: FONT_TH, fontWeight: 900, fontSize: 92, lineHeight: 1}}>ฟรี!</div>
								<div style={{fontFamily: FONT_BRAND, fontSize: 40, lineHeight: 1}}>FREE</div>
							</div>
						) : null}
					</div>

					{/* CTA buttons */}
					<div style={{position: 'absolute', top: 1040}}>
						<CtaButton label="คลิกลิงก์ลงทะเบียน" icon="link" s={btn1In} pressed={press1} dark />
					</div>
					<div style={{position: 'absolute', top: 1190}}>
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
			{frame >= 270 ? (
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
							transform: `scale(${pop(frame, 278, 10)}) rotate(-3deg)`,
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
				{frame >= 270 ? <NongKhai mood="wave" size={300} holdingBag={false} /> : null}
			</div>

			<Caption
				y={1440}
				segments={[
					{from: 0, to: 46, text: 'ใครอยาก*ปั้นหุ่น*แบบยั่งยืน'},
					{from: 46, to: 94, text: 'เจอกันใน*คลาสออนไลน์* ผ่าน Zoom'},
					{from: 94, to: 150, text: '*วันพุธนี้* เวลา *1 ทุ่มตรง!*'},
					{from: 150, to: 184, text: 'คลาสนี้*ฟรี!*'},
					{from: 184, to: 226, text: 'รีบ*คลิกลิงก์*ลงทะเบียน'},
					{from: 226, to: 270, text: 'หรือ*ทักแชต*จองสิทธิ์ด่วน'},
					{from: 270, to: 330, text: 'แล้วเจอกัน*วันพุธนี้*ครับ!'},
				]}
			/>

			{/* fade to black so the loop back to the Hook is seamless */}
			<AbsoluteFill style={{background: C.black, opacity: endFade}} />
		</AbsoluteFill>
	);
};
