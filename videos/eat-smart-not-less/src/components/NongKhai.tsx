import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT_TH} from '../theme';

export type Mood = 'greedy' | 'happy' | 'wave';

// Smooth wobbly blob path around (cx, cy)
const blobPath = (cx: number, cy: number, r: number, t: number, amp: number) => {
	const n = 18;
	const pts = Array.from({length: n}, (_, i) => {
		const a = (i / n) * Math.PI * 2;
		const rr =
			r +
			amp * Math.sin(a * 3 + t * 0.25) +
			amp * 0.6 * Math.cos(a * 2 - t * 0.18) +
			// flatter bottom, like a dumpling
			(Math.sin(a) > 0 ? -Math.sin(a) * r * 0.12 : 0);
		return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.92];
	});
	const mid = (p: number[], q: number[]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
	let d = '';
	pts.forEach((p, i) => {
		const next = pts[(i + 1) % n];
		const m = mid(p, next);
		if (i === 0) {
			const start = mid(pts[n - 1], p);
			d += `M ${start[0]} ${start[1]} `;
		}
		d += `Q ${p[0]} ${p[1]} ${m[0]} ${m[1]} `;
	});
	return d + 'Z';
};

// "น้องไข" — the fat-cell mascot
export const NongKhai: React.FC<{
	mood: Mood;
	size: number;
	holdingBag: boolean;
}> = ({mood, size, holdingBag}) => {
	const frame = useCurrentFrame();
	const stroke = C.black;
	const sw = 11;
	const bounce = Math.sin(frame * 0.35) * 4;
	const waveAngle = mood === 'wave' ? Math.sin(frame * 0.5) * 22 : 0;

	return (
		<svg width={size} height={size} viewBox="0 0 400 400" style={{overflow: 'visible'}}>
			<g transform={`translate(0 ${bounce})`}>
				{/* feet */}
				<ellipse cx={160} cy={352} rx={34} ry={18} fill={C.butter} stroke={stroke} strokeWidth={sw} />
				<ellipse cx={240} cy={352} rx={34} ry={18} fill={C.butter} stroke={stroke} strokeWidth={sw} />
				{/* body */}
				<path d={blobPath(200, 220, 150, frame, 5)} fill={C.butter} stroke={stroke} strokeWidth={sw} />
				<ellipse cx={140} cy={140} rx={34} ry={20} fill="#fff" opacity={0.7} transform="rotate(-30 140 140)" />
				{/* cheeks */}
				<ellipse cx={120} cy={225} rx={22} ry={13} fill="#FF9AA2" opacity={0.85} />
				<ellipse cx={280} cy={225} rx={22} ry={13} fill="#FF9AA2" opacity={0.85} />

				{mood === 'greedy' ? (
					<g stroke={stroke} strokeWidth={10} strokeLinecap="round" fill="none">
						{/* sly brows */}
						<path d="M 120 145 L 175 165" />
						<path d="M 280 145 L 225 165" />
						{/* narrowed eyes */}
						<path d="M 128 192 Q 150 178 172 192" />
						<path d="M 228 192 Q 250 178 272 192" />
						{/* greedy grin */}
						<path d="M 160 238 Q 200 272 240 238" fill="#fff" />
						<path d="M 180 246 L 180 256 M 200 250 L 200 262 M 220 246 L 220 256" strokeWidth={5} />
					</g>
				) : (
					<g>
						<ellipse cx={152} cy={185} rx={20} ry={26} fill={stroke} />
						<ellipse cx={248} cy={185} rx={20} ry={26} fill={stroke} />
						<circle cx={159} cy={175} r={7} fill="#fff" />
						<circle cx={255} cy={175} r={7} fill="#fff" />
						<path
							d="M 165 232 Q 200 285 235 232 Z"
							fill="#7A1F1F"
							stroke={stroke}
							strokeWidth={9}
							strokeLinejoin="round"
						/>
						<ellipse cx={200} cy={258} rx={15} ry={8} fill="#FF7A85" />
					</g>
				)}

				{holdingBag ? (
					<g>
						{/* sack of fat */}
						<path
							d="M 140 290 Q 120 375 200 380 Q 280 375 260 290 Q 230 270 200 278 Q 170 270 140 290 Z"
							fill={C.gold}
							stroke={stroke}
							strokeWidth={sw}
							strokeLinejoin="round"
						/>
						<path d="M 172 282 Q 200 262 228 282" fill="none" stroke={stroke} strokeWidth={9} />
						<text
							x={200}
							y={345}
							textAnchor="middle"
							fontFamily={FONT_TH}
							fontWeight={900}
							fontSize={34}
							fill={C.black}
						>
							ไขมัน
						</text>
						{/* arms hugging the bag */}
						<path d="M 70 240 Q 95 330 155 320" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
						<path d="M 330 240 Q 305 330 245 320" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
						{/* sparkles */}
						{[
							[110, 300],
							[300, 285],
							[285, 375],
						].map(([x, y], i) => {
							const s = 0.6 + 0.4 * Math.abs(Math.sin(frame * 0.3 + i * 1.7));
							return (
								<path
									key={i}
									transform={`translate(${x} ${y}) scale(${s})`}
									d="M 0 -18 L 5 -5 L 18 0 L 5 5 L 0 18 L -5 5 L -18 0 L -5 -5 Z"
									fill={C.white}
									stroke={stroke}
									strokeWidth={4}
								/>
							);
						})}
					</g>
				) : (
					<g stroke={stroke} strokeWidth={sw} strokeLinecap="round" fill="none">
						<path d="M 62 240 Q 30 260 38 300" />
						<g transform={`rotate(${waveAngle} 338 230)`}>
							{mood === 'wave' ? (
								<path d="M 338 230 Q 375 190 372 140" />
							) : (
								<path d="M 338 240 Q 370 260 362 300" />
							)}
						</g>
					</g>
				)}
			</g>
		</svg>
	);
};
