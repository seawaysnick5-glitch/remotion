import React from 'react';
import {C, FONT_BRAND} from '../theme';

// Bathroom scale with a digital display
export const Scale: React.FC<{value: string; width: number}> = ({value, width}) => {
	return (
		<svg width={width} height={width * 0.62} viewBox="0 0 500 310">
			<rect x={15} y={15} width={470} height={280} rx={70} fill={C.white} stroke={C.black} strokeWidth={14} />
			<rect x={95} y={60} width={310} height={130} rx={26} fill={C.black} />
			<text
				x={250}
				y={162}
				textAnchor="middle"
				fontFamily={FONT_BRAND}
				fontSize={110}
				fill={C.lime}
			>
				{value}
			</text>
			<text x={250} y={250} textAnchor="middle" fontFamily={FONT_BRAND} fontSize={38} fill={C.black}>
				KG
			</text>
			<rect x={60} y={225} width={110} height={30} rx={15} fill={C.lime} stroke={C.black} strokeWidth={6} />
			<rect x={330} y={225} width={110} height={30} rx={15} fill={C.lime} stroke={C.black} strokeWidth={6} />
		</svg>
	);
};
