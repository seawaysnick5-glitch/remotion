import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Caption} from '../components/Caption';
import {Logo} from '../components/Logo';
import {NongKhai} from '../components/NongKhai';
import {C, FONT_BRAND, FONT_TH, FONT_TH_ITALIC, pop} from '../theme';

// 0:23–0:30  "เลิกอด → กินให้เป็น" + follow CTA + brand
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const Outro: React.FC = () => {
	const frame = useCurrentFrame();

	// phase A: word swap
	const topIn = pop(frame, 0, 11);
	const stopIn = pop(frame, 36, 9);
	const strike = interpolate(frame, [58, 70], [0, 1], clamp);
	const flip = interpolate(frame, [74, 84], [0, 180], clamp);
	const phaseAOut = interpolate(frame, [110, 120], [1, 0], clamp);

	// phase B: brand + CTA
	const logoIn = pop(frame, 114, 10);
	const titleIn = pop(frame, 124, 11);
	const btnIn = pop(frame, 132, 11);
	const tapped = frame >= 152;
	const tapPress = frame >= 148 && frame < 156 ? 0.9 : 1;
	const fingerIn = interpolate(frame, [136, 148], [1, 0], clamp);
	const teaserIn = pop(frame, 168, 11);
	const khaiIn = pop(frame, 140, 10);
	const endFade = interpolate(frame, [200, 210], [0, 1], clamp);

	return (
		<AbsoluteFill style={{background: C.lime}}>
			{/* phase A */}
			{frame < 120 ? (
				<AbsoluteFill style={{opacity: phaseAOut, alignItems: 'center'}}>
					<div
						style={{
							marginTop: 360,
							fontFamily: FONT_TH,
							fontWeight: 800,
							fontSize: 74,
							color: C.black,
							transform: `scale(${topIn})`,
						}}
					>
						อยากหุ่นดีแบบยั่งยืน?
					</div>
					<div style={{marginTop: 120, perspective: 1200}}>
						<div
							style={{
								position: 'relative',
								width: 860,
								height: 300,
								transformStyle: 'preserve-3d',
								transform: `rotateX(${flip}deg) scale(${stopIn})`,
							}}
						>
							{/* front: เลิกอด */}
							<div
								style={{
									position: 'absolute',
									inset: 0,
									backfaceVisibility: 'hidden',
									background: C.black,
									borderRadius: 40,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontFamily: FONT_TH_ITALIC,
									fontStyle: 'italic',
									fontWeight: 900,
									fontSize: 190,
									color: C.white,
								}}
							>
								เลิกอด
								<div
									style={{
										position: 'absolute',
										left: 110,
										top: 145,
										height: 30,
										width: 640 * strike,
										background: C.red,
										borderRadius: 15,
										transform: 'rotate(-6deg)',
										transformOrigin: 'left center',
									}}
								/>
							</div>
							{/* back: กินให้เป็น */}
							<div
								style={{
									position: 'absolute',
									inset: 0,
									backfaceVisibility: 'hidden',
									transform: 'rotateX(180deg)',
									background: C.white,
									border: `10px solid ${C.black}`,
									boxShadow: `16px 16px 0 ${C.black}`,
									borderRadius: 40,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontFamily: FONT_TH_ITALIC,
									fontStyle: 'italic',
									fontWeight: 900,
									fontSize: 150,
									color: C.black,
								}}
							>
								กินให้เป็น!
							</div>
						</div>
					</div>
				</AbsoluteFill>
			) : null}

			{/* phase B */}
			{frame >= 112 ? (
				<AbsoluteFill style={{alignItems: 'center'}}>
					<div style={{marginTop: 330, transform: `scale(${logoIn})`}}>
						<Logo scale={0.95} showTagline />
					</div>
					<div
						style={{
							marginTop: 70,
							fontFamily: FONT_BRAND,
							fontSize: 108,
							lineHeight: 1,
							color: C.black,
							textAlign: 'center',
							transform: `scale(${titleIn}) skewX(-8deg)`,
						}}
					>
						EAT SMART,
						<br />
						<span style={{background: C.black, color: C.lime, padding: '0 20px'}}>NOT LESS</span>
					</div>

					{/* follow button */}
					<div style={{marginTop: 60, position: 'relative', transform: `scale(${btnIn * tapPress})`}}>
						<div
							style={{
								background: tapped ? C.white : C.black,
								color: tapped ? C.black : C.white,
								border: `6px solid ${C.black}`,
								fontFamily: FONT_TH,
								fontWeight: 900,
								fontSize: 62,
								padding: '14px 70px',
								borderRadius: 60,
							}}
						>
							{tapped ? '✓ ติดตามแล้ว' : '+ ติดตาม'}
						</div>
						{/* tapping finger */}
						<svg
							width={110}
							height={130}
							viewBox="0 0 110 130"
							style={{
								position: 'absolute',
								right: -60,
								bottom: -90,
								transform: `translate(${fingerIn * 200}px, ${fingerIn * 200}px)`,
								opacity: frame > 175 ? 0 : 1,
							}}
						>
							<path
								d="M 35 10 Q 35 0 45 0 Q 55 0 55 10 L 55 55 L 80 58 Q 100 62 98 85 L 92 120 L 35 120 L 12 80 Q 8 68 20 66 L 35 75 Z"
								fill={C.white}
								stroke={C.black}
								strokeWidth={6}
								strokeLinejoin="round"
							/>
						</svg>
					</div>

					{/* teaser */}
					<div
						style={{
							position: 'absolute',
							top: 1300,
							right: 60,
							background: C.black,
							color: C.lime,
							fontFamily: FONT_TH,
							fontWeight: 800,
							fontSize: 46,
							padding: '14px 30px',
							borderRadius: 24,
							transform: `scale(${teaserIn}) rotate(3deg)`,
						}}
					>
						EP ถัดไป: จัดมื้อง่ายๆ →
					</div>
				</AbsoluteFill>
			) : null}

			<div
				style={{
					position: 'absolute',
					left: 20,
					top: 1150,
					transform: `scale(${khaiIn})`,
				}}
			>
				{frame >= 136 ? <NongKhai mood="wave" size={280} holdingBag={false} /> : null}
			</div>

			<Caption
				y={1480}
				segments={[
					{from: 0, to: 40, text: 'อยากหุ่นดี แบบ*ยั่งยืน*'},
					{from: 40, to: 112, text: '*เลิกอด*... แล้วมา *"กินให้เป็น"*!'},
					{from: 112, to: 160, text: 'กด*ติดตาม*ไว้เลย'},
					{from: 160, to: 210, text: 'คลิปหน้า พาจัดมื้อ*ง่ายๆ* ครับ!'},
				]}
			/>

			{/* fade to black so the loop back to the Hook is seamless */}
			<AbsoluteFill style={{background: C.black, opacity: endFade}} />
		</AbsoluteFill>
	);
};
