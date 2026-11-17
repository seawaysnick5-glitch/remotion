import React from 'react';
import {C, FONT_BRAND} from '../theme';

// Recreation of the #THEBODYNEXT sticker logo: black pill, white italic
// condensed type, stacked outline shadow and the tagline underneath.
export const Logo: React.FC<{
	scale: number;
	showTagline: boolean;
}> = ({scale, showTagline}) => {
	const text = '#THEBODYNEXT';
	return (
		<div
			style={{
				display: 'inline-flex',
				flexDirection: 'column',
				alignItems: 'flex-end',
				transform: `scale(${scale}) rotate(-8deg)`,
			}}
		>
			<div style={{position: 'relative'}}>
				{/* stacked shadow layers */}
				{[3, 2, 1].map((i) => (
					<div
						key={i}
						style={{
							position: 'absolute',
							inset: 0,
							transform: `translate(${i * 9}px, ${i * 9}px)`,
							background: i % 2 === 1 ? C.black : C.lime,
							border: `5px solid ${C.black}`,
							borderRadius: 90,
						}}
					/>
				))}
				<div
					style={{
						position: 'relative',
						background: C.black,
						borderRadius: 90,
						border: `5px solid ${C.black}`,
						padding: '18px 56px 22px',
						fontFamily: FONT_BRAND,
						fontSize: 120,
						lineHeight: 1,
						color: C.white,
						transform: 'skewX(-10deg)',
						letterSpacing: 2,
						whiteSpace: 'nowrap',
					}}
				>
					{text}
				</div>
			</div>
			{showTagline ? (
				<div
					style={{
						marginTop: 34,
						marginRight: 20,
						fontFamily: FONT_BRAND,
						fontSize: 34,
						color: C.black,
						transform: 'skewX(-10deg)',
						letterSpacing: 1,
					}}
				>
					#HAPPYHEALTHYFOREVERYBODY
				</div>
			) : null}
		</div>
	);
};
