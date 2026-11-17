import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT_TH, pop} from '../theme';

export type CaptionSegment = {
	from: number;
	to: number;
	// Wrap words in *stars* to highlight them in lime
	text: string;
};

// Burned-in subtitles, kept inside the IG Reels safe zone
// (top 220px / bottom 420px are covered by the Instagram UI).
export const Caption: React.FC<{
	segments: CaptionSegment[];
	y: number;
}> = ({segments, y}) => {
	const frame = useCurrentFrame();
	const seg = segments.find((s) => frame >= s.from && frame < s.to);
	if (!seg) {
		return null;
	}
	const s = pop(frame, seg.from, 14);
	const parts = seg.text.split('*');
	return (
		<div
			style={{
				position: 'absolute',
				left: 70,
				right: 150,
				top: y,
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					background: C.black,
					color: C.white,
					fontFamily: FONT_TH,
					fontWeight: 800,
					fontSize: 60,
					lineHeight: 1.3,
					padding: '14px 34px 18px',
					borderRadius: 28,
					border: `5px solid ${C.lime}`,
					boxShadow: `8px 8px 0 ${C.black}`,
					textAlign: 'center',
					transform: `scale(${0.85 + 0.15 * s}) translateY(${(1 - s) * 20}px)`,
					opacity: Math.min(1, s * 1.5),
				}}
			>
				{parts.map((p, i) => (
					<span key={i} style={{color: i % 2 === 1 ? C.lime : C.white}}>
						{p}
					</span>
				))}
			</div>
		</div>
	);
};
