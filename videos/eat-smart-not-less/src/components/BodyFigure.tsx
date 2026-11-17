import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';

// Cartoon body: "soft" (lost muscle, jiggly) vs "firm" (lean, toned)
export const BodyFigure: React.FC<{
	variant: 'soft' | 'firm';
	height: number;
	wobbleFrom: number;
}> = ({variant, height, wobbleFrom}) => {
	const frame = useCurrentFrame();
	const sw = 9;
	const t = Math.max(0, frame - wobbleFrom);
	// jelly wobble that decays a bit, then keeps idling
	const jiggle =
		variant === 'soft' && frame >= wobbleFrom
			? Math.sin(t * 0.9) * (0.05 * Math.exp(-t / 40) + 0.015)
			: 0;

	return (
		<svg width={height * 0.6} height={height} viewBox="0 0 300 500" style={{overflow: 'visible'}}>
			{/* legs */}
			<path d="M 125 360 L 115 470" stroke={C.black} strokeWidth={34} strokeLinecap="round" />
			<path d="M 175 360 L 185 470" stroke={C.black} strokeWidth={34} strokeLinecap="round" />
			<path d="M 125 360 L 115 470" stroke={C.skin} strokeWidth={20} strokeLinecap="round" />
			<path d="M 175 360 L 185 470" stroke={C.skin} strokeWidth={20} strokeLinecap="round" />

			{variant === 'soft' ? (
				<g transform={`translate(150 260) scale(${1 + jiggle} ${1 - jiggle}) translate(-150 -260)`}>
					{/* droopy arms */}
					<path d="M 85 165 Q 50 240 62 310" fill="none" stroke={C.black} strokeWidth={36} strokeLinecap="round" />
					<path d="M 215 165 Q 250 240 238 310" fill="none" stroke={C.black} strokeWidth={36} strokeLinecap="round" />
					<path d="M 85 165 Q 50 240 62 310" fill="none" stroke={C.skin} strokeWidth={22} strokeLinecap="round" />
					<path d="M 215 165 Q 250 240 238 310" fill="none" stroke={C.skin} strokeWidth={22} strokeLinecap="round" />
					{/* pear-shaped torso */}
					<path
						d="M 100 150 Q 150 135 200 150 Q 245 270 215 355 Q 150 385 85 355 Q 55 270 100 150 Z"
						fill={C.skin}
						stroke={C.black}
						strokeWidth={sw}
					/>
					{/* belly roll */}
					<path d="M 92 300 Q 150 330 208 300" fill="none" stroke={C.black} strokeWidth={6} />
					<path d="M 100 330 L 200 330 L 210 370 Q 150 390 90 370 Z" fill="#8C8C8C" stroke={C.black} strokeWidth={sw} />
				</g>
			) : (
				<g>
					{/* strong arms */}
					<path d="M 70 160 Q 40 220 60 290" fill="none" stroke={C.black} strokeWidth={40} strokeLinecap="round" />
					<path d="M 230 160 Q 260 220 240 290" fill="none" stroke={C.black} strokeWidth={40} strokeLinecap="round" />
					<path d="M 70 160 Q 40 220 60 290" fill="none" stroke={C.skin} strokeWidth={26} strokeLinecap="round" />
					<path d="M 230 160 Q 260 220 240 290" fill="none" stroke={C.skin} strokeWidth={26} strokeLinecap="round" />
					{/* V-shaped torso */}
					<path
						d="M 70 150 Q 150 130 230 150 Q 220 260 190 340 L 110 340 Q 80 260 70 150 Z"
						fill={C.skin}
						stroke={C.black}
						strokeWidth={sw}
					/>
					{/* chest + abs */}
					<g stroke={C.black} strokeWidth={5} fill="none" strokeLinecap="round">
						<path d="M 100 200 Q 125 215 148 200" />
						<path d="M 152 200 Q 175 215 200 200" />
						<path d="M 150 225 L 150 320" />
						<path d="M 125 250 L 175 250 M 128 280 L 172 280 M 132 308 L 168 308" />
					</g>
					<path d="M 110 335 L 190 335 L 196 372 L 104 372 Z" fill={C.black} />
					{/* sparkles */}
					{[
						[40, 120],
						[265, 110],
						[270, 300],
					].map(([x, y], i) => {
						const s = 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.25 + i * 2));
						return (
							<path
								key={i}
								transform={`translate(${x} ${y}) scale(${s})`}
								d="M 0 -26 L 7 -7 L 26 0 L 7 7 L 0 26 L -7 7 L -26 0 L -7 -7 Z"
								fill={C.white}
								stroke={C.black}
								strokeWidth={4}
							/>
						);
					})}
				</g>
			)}
			{/* head */}
			<circle cx={150} cy={80} r={52} fill={C.skin} stroke={C.black} strokeWidth={sw} />
			<path d="M 98 72 Q 105 25 150 26 Q 195 25 202 72 Q 175 50 150 52 Q 125 50 98 72 Z" fill={C.black} />
			<circle cx={132} cy={88} r={6} fill={C.black} />
			<circle cx={168} cy={88} r={6} fill={C.black} />
			{variant === 'soft' ? (
				<path d="M 130 115 Q 150 105 170 115" fill="none" stroke={C.black} strokeWidth={6} strokeLinecap="round" />
			) : (
				<path d="M 128 108 Q 150 128 172 108" fill="none" stroke={C.black} strokeWidth={6} strokeLinecap="round" />
			)}
		</svg>
	);
};
