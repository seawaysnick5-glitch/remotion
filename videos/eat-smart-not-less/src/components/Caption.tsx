import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CaptionCue} from '../timing';
import {Sfx} from './Sfx';
import {C, FONT_TH, pop} from '../theme';


// Burned-in subtitles, kept inside the IG Reels safe zone
// (top 220px / bottom 420px are covered by the Instagram UI).
export const Caption: React.FC<{
	cues: CaptionCue[];
	toFrame: (sec: number) => number;
	y: number;
}> = ({cues, toFrame, y}) => {
	const frame = useCurrentFrame();
	const segments = cues.map((c, i) => ({
		from: toFrame(c.start),
		to: i + 1 < cues.length ? toFrame(cues[i + 1].start) : Infinity,
		text: c.text,
	}));
	const seg = segments.find((s) => frame >= s.from && frame < s.to);
	const sounds = segments.map((s) => <Sfx key={s.from} at={s.from} name="pop-soft" volume={0.35} />);
	if (!seg) {
		return <>{sounds}</>;
	}
	const s = pop(frame, seg.from, 14);
	const parts = seg.text.split('*');
	return (
		<>
		{sounds}
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
		</>
	);
};
