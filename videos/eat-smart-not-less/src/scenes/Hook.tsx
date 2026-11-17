import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Caption} from '../components/Caption';
import {NongKhai} from '../components/NongKhai';
import {C, FONT_TH, FONT_TH_ITALIC, pop} from '../theme';

// 0:00–0:05  "ใครบอกว่าลดไขมันต้องอดอาหาร? ... ยิ่งอด ร่างกายยิ่งหวงไขมัน!"
const FOODS = [
	{x: -110, y: -60, r: 70, color: '#F2F2F2', ring: '#FFD34D'}, // egg
	{x: 95, y: -85, r: 62, color: '#E9A86B', ring: null}, // chicken
	{x: 105, y: 80, r: 72, color: '#FFFFFF', ring: null}, // rice
	{x: -95, y: 95, r: 60, color: '#4CAF50', ring: null}, // broccoli
	{x: 0, y: 0, r: 46, color: '#FF7043', ring: null}, // tomato
];

export const Hook: React.FC = () => {
	const frame = useCurrentFrame();

	const plateIn = pop(frame, 0, 10);
	const crossDraw = interpolate(frame, [14, 26], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const plateOut = interpolate(frame, [76, 88], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const khaiIn = pop(frame, 82, 9);
	const isPhase2 = frame >= 82;
	const headline = isPhase2 ? 'ยิ่งอด ยิ่ง"หวง"!' : 'อด = ผอม?';
	const headlinePop = pop(frame, isPhase2 ? 82 : 0, 9);
	const warnBlink = Math.floor(frame / 6) % 2 === 0;

	return (
		<AbsoluteFill style={{background: C.black}}>
			{/* headline */}
			<div
				style={{
					position: 'absolute',
					top: 320,
					width: '100%',
					textAlign: 'center',
					fontFamily: FONT_TH_ITALIC,
					fontWeight: 900,
					fontStyle: 'italic',
					fontSize: isPhase2 ? 130 : 170,
					color: C.lime,
					transform: `scale(${headlinePop}) rotate(-4deg)`,
					textShadow: `8px 8px 0 ${C.red}`,
				}}
			>
				{headline}
			</div>

			{/* the plate that empties */}
			<div
				style={{
					position: 'absolute',
					left: 540 - 300,
					top: 900 - 300,
					width: 600,
					height: 600,
					transform: `scale(${plateIn * (1 - plateOut)}) translateY(${plateOut * 200}px)`,
					opacity: 1 - plateOut,
				}}
			>
				<svg width={600} height={600} viewBox="-300 -300 600 600">
					<circle r={280} fill={C.white} stroke={C.lime} strokeWidth={16} />
					<circle r={215} fill="none" stroke="#E3E3E3" strokeWidth={8} />
					{FOODS.map((f, i) => {
						const gone = pop(frame, 32 + i * 9, 14);
						const s = Math.max(0, 1 - gone);
						return (
							<g key={i} transform={`translate(${f.x} ${f.y}) scale(${s})`}>
								<circle r={f.r} fill={f.color} stroke={C.black} strokeWidth={7} />
								{f.ring ? <circle r={f.r * 0.42} fill={f.ring} /> : null}
							</g>
						);
					})}
					{/* red X */}
					<g stroke={C.red} strokeWidth={42} strokeLinecap="round">
						<line x1={-200} y1={-200} x2={-200 + 400 * Math.min(1, crossDraw * 2)} y2={-200 + 400 * Math.min(1, crossDraw * 2)} />
						{crossDraw > 0.5 ? (
							<line x1={200} y1={-200} x2={200 - 400 * (crossDraw - 0.5) * 2} y2={-200 + 400 * (crossDraw - 0.5) * 2} />
						) : null}
					</g>
				</svg>
			</div>

			{/* warning banner */}
			{isPhase2 ? (
				<div
					style={{
						position: 'absolute',
						top: 530,
						left: 90,
						right: 90,
						padding: '16px 0',
						background: warnBlink ? C.red : '#B3261E',
						border: `6px solid ${C.white}`,
						borderRadius: 24,
						color: C.white,
						fontFamily: FONT_TH,
						fontWeight: 900,
						fontSize: 56,
						textAlign: 'center',
						transform: `scale(${pop(frame, 90, 12)})`,
					}}
				>
					⚠ โหมดประหยัดพลังงาน!
				</div>
			) : null}

			{/* Nong Khai hugging its fat */}
			<div
				style={{
					position: 'absolute',
					left: 540 - 300,
					top: 680,
					transform: `scale(${khaiIn}) translateY(${(1 - khaiIn) * 300}px)`,
				}}
			>
				{frame >= 80 ? <NongKhai mood="greedy" size={600} holdingBag /> : null}
			</div>

			<Caption
				y={1340}
				segments={[
					{from: 0, to: 58, text: 'ใครบอกว่า ลดไขมัน ต้อง*อด*อาหาร?'},
					{from: 58, to: 98, text: 'รู้ไหมครับ... *ยิ่งอด*'},
					{from: 98, to: 150, text: 'ร่างกายยิ่ง *"หวง"* ไขมัน!'},
				]}
			/>
		</AbsoluteFill>
	);
};
