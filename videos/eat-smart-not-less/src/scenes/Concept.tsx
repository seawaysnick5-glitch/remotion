import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Caption} from '../components/Caption';
import {Sfx} from '../components/Sfx';
import {at, CAPTIONS} from '../timing';
import {NongKhai} from '../components/NongKhai';
import {C, FONT_TH, FONT_TH_ITALIC, pop} from '../theme';

// 0:05–0:13  smart eating: calories / protein / balanced plate
const wedge = (r: number, a0: number, a1: number) => {
	const rad = (a: number) => ((a - 90) * Math.PI) / 180;
	const x0 = Math.cos(rad(a0)) * r;
	const y0 = Math.sin(rad(a0)) * r;
	const x1 = Math.cos(rad(a1)) * r;
	const y1 = Math.sin(rad(a1)) * r;
	const large = a1 - a0 > 180 ? 1 : 0;
	return `M 0 0 L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
};

export const Concept: React.FC = () => {
	const frame = useCurrentFrame();

	const t = at.concept;
	const T = {
		title: t(7.3), // "ความลับคือ"
		gauge: t(9.32), // "คุมแคลอรี"
		plate: t(10.35),
		protein: t(10.55), // "เน้นโปรตีน"
		clock: t(11.2), // "อิ่มนาน"
		veg: t(11.78), // "จัดจานให้ครบหมู่"
		carb: t(12.12),
		khai: t(12.55), // "อิ่มได้"
	};
	const titleIn = pop(frame, T.title, 10);
	const gaugeIn = pop(frame, T.gauge, 12);
	// needle swings past, then settles in the green "just right" zone
	const needle = interpolate(frame, [T.gauge + 4, T.gauge + 13, T.gauge + 19, T.gauge + 25], [-85, 60, -14, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});
	const plateIn = pop(frame, T.plate, 12);
	const protein = pop(frame, T.protein, 10);
	const veg = pop(frame, T.veg, 10);
	const carb = pop(frame, T.carb, 10);
	const clockIn = pop(frame, T.clock, 10);
	const khaiIn = pop(frame, T.khai, 10);

	const R = 270;
	return (
		<AbsoluteFill style={{background: C.lime}}>
			<div
				style={{
					position: 'absolute',
					top: 310,
					width: '100%',
					textAlign: 'center',
					fontFamily: FONT_TH_ITALIC,
					fontStyle: 'italic',
					fontWeight: 900,
					fontSize: 120,
					color: C.black,
					transform: `scale(${titleIn}) rotate(-3deg)`,
				}}
			>
				กินให้<span style={{background: C.black, color: C.lime, padding: '0 24px', borderRadius: 24}}>ฉลาด</span>
			</div>

			{/* calorie gauge */}
			<div
				style={{
					position: 'absolute',
					top: 500,
					left: 540 - 220,
					transform: `scale(${gaugeIn})`,
				}}
			>
				<svg width={440} height={250} viewBox="-220 -220 440 250">
					<path d="M -190 0 A 190 190 0 0 1 -95 -164.5" fill="none" stroke={C.red} strokeWidth={46} />
					<path d="M -95 -164.5 A 190 190 0 0 1 95 -164.5" fill="none" stroke={C.green} strokeWidth={46} />
					<path d="M 95 -164.5 A 190 190 0 0 1 190 0" fill="none" stroke={C.red} strokeWidth={46} />
					<path d="M -213 0 A 213 213 0 0 1 213 0" fill="none" stroke={C.black} strokeWidth={6} />
					<g transform={`rotate(${needle})`}>
						<path d="M -14 0 L 0 -175 L 14 0 Z" fill={C.black} />
					</g>
					<circle r={26} fill={C.black} />
					<text y={-105} textAnchor="middle" fontFamily={FONT_TH} fontWeight={900} fontSize={40} fill={C.black}>
						พอดี
					</text>
				</svg>
				<div
					style={{
						textAlign: 'center',
						fontFamily: FONT_TH,
						fontWeight: 800,
						fontSize: 44,
						color: C.black,
						marginTop: -4,
					}}
				>
					แคลอรี
				</div>
			</div>

			{/* balanced plate */}
			<div
				style={{
					position: 'absolute',
					left: 540 - 300,
					top: 800,
					transform: `scale(${plateIn})`,
				}}
			>
				<svg width={600} height={600} viewBox="-300 -300 600 600" style={{overflow: 'visible'}}>
					<circle r={292} fill={C.white} stroke={C.black} strokeWidth={14} />
					{/* veg half */}
					<g transform={`scale(${veg})`}>
						<path d={wedge(R, 180, 360)} fill="#7CCB5B" stroke={C.black} strokeWidth={8} />
						{[
							[-150, -70],
							[-110, 40],
							[-180, 60],
							[-70, -140],
							[-60, 130],
						].map(([x, y], i) => (
							<g key={i} transform={`translate(${x} ${y})`}>
								<circle r={34} fill="#2E8B3E" stroke={C.black} strokeWidth={5} />
								<circle cx={-14} cy={-10} r={14} fill="#3FA44F" />
							</g>
						))}
						<text x={-135} y={10} textAnchor="middle" fontFamily={FONT_TH} fontWeight={900} fontSize={54} fill={C.black} stroke={C.white} strokeWidth={10} paintOrder="stroke">
							ผัก ½
						</text>
					</g>
					{/* protein quarter */}
					<g transform={`scale(${protein})`}>
						<path d={wedge(R, 0, 90)} fill={C.gold} stroke={C.black} strokeWidth={8} />
						<ellipse cx={95} cy={-170} rx={52} ry={40} fill={C.white} stroke={C.black} strokeWidth={5} />
						<circle cx={95} cy={-170} r={20} fill="#FFC21A" />
						<path d="M 160 -110 Q 215 -150 210 -60 Q 180 -30 140 -60 Z" fill="#E7A065" stroke={C.black} strokeWidth={5} />
						<text x={130} y={-40} textAnchor="middle" fontFamily={FONT_TH} fontWeight={900} fontSize={46} fill={C.black} stroke={C.white} strokeWidth={10} paintOrder="stroke">
							โปรตีน ¼
						</text>
					</g>
					{/* carb quarter */}
					<g transform={`scale(${carb})`}>
						<path d={wedge(R, 90, 180)} fill="#F3E3C3" stroke={C.black} strokeWidth={8} />
						{[
							[90, 90],
							[140, 140],
							[80, 170],
							[160, 70],
						].map(([x, y], i) => (
							<ellipse key={i} cx={x} cy={y} rx={30} ry={22} fill={C.white} stroke={C.black} strokeWidth={4} />
						))}
						<text x={125} y={235} textAnchor="middle" fontFamily={FONT_TH} fontWeight={900} fontSize={46} fill={C.black} stroke={C.white} strokeWidth={10} paintOrder="stroke">
							คาร์บ ¼
						</text>
					</g>
				</svg>
			</div>

			{/* "full longer" clock badge */}
			<div
				style={{
					position: 'absolute',
					right: 40,
					top: 720,
					background: C.black,
					color: C.lime,
					fontFamily: FONT_TH,
					fontWeight: 900,
					fontSize: 46,
					padding: '12px 28px',
					borderRadius: 60,
					transform: `scale(${clockIn}) rotate(6deg)`,
					display: 'flex',
					alignItems: 'center',
					gap: 14,
				}}
			>
				<svg width={50} height={50} viewBox="-25 -25 50 50">
					<circle r={21} fill="none" stroke={C.lime} strokeWidth={5} />
					<path d={`M 0 0 L 0 -13 M 0 0 L ${Math.cos(frame * 0.3) * 11} ${Math.sin(frame * 0.3) * 11}`} stroke={C.lime} strokeWidth={5} strokeLinecap="round" />
				</svg>
				อิ่มนาน
			</div>

			{/* Nong Khai lets go of the fat */}
			<div
				style={{
					position: 'absolute',
					left: 10,
					top: 1080,
					transform: `scale(${khaiIn}) rotate(${(1 - khaiIn) * -30}deg)`,
				}}
			>
				{frame >= T.khai - 2 ? <NongKhai mood="happy" size={260} holdingBag={false} /> : null}
			</div>

			<Caption cues={CAPTIONS.concept} toFrame={t} y={1400} />

			<Sfx at={T.title} name="pop" volume={0.55} />
			<Sfx at={T.gauge} name="pop" volume={0.5} />
			<Sfx at={T.gauge + 4} name="whoosh" volume={0.35} />
			<Sfx at={T.gauge + 25} name="ding" volume={0.45} />
			<Sfx at={T.plate} name="pop" volume={0.45} />
			<Sfx at={T.protein} name="pop" volume={0.55} />
			<Sfx at={T.clock} name="click" volume={0.5} />
			<Sfx at={T.veg} name="pop" volume={0.55} />
			<Sfx at={T.carb} name="pop" volume={0.55} />
			<Sfx at={T.khai} name="boing" volume={0.5} />
			<Sfx at={T.khai + 4} name="sparkle" volume={0.35} />
		</AbsoluteFill>
	);
};
