import React from 'react';
import {AbsoluteFill, Audio, Series, staticFile} from 'remotion';
import {Logo} from './components/Logo';
import {Concept} from './scenes/Concept';
import {Hook} from './scenes/Hook';
import {KeyPoint} from './scenes/KeyPoint';
import {Outro} from './scenes/Outro';
import {SCENE_FRAMES as SCENES} from './timing';

export type EatSmartNotLessProps = {
	// File names inside public/, e.g. "voiceover.wav"
	voiceoverSrc: string | null;
	musicSrc: string | null;
};

export const EatSmartNotLess: React.FC<EatSmartNotLessProps> = ({voiceoverSrc, musicSrc}) => {
	return (
		<AbsoluteFill>
			<Series>
				<Series.Sequence durationInFrames={SCENES.hook}>
					<Hook />
				</Series.Sequence>
				<Series.Sequence durationInFrames={SCENES.concept}>
					<Concept />
				</Series.Sequence>
				<Series.Sequence durationInFrames={SCENES.keyPoint}>
					<KeyPoint />
				</Series.Sequence>
				<Series.Sequence durationInFrames={SCENES.outro}>
					<Outro />
				</Series.Sequence>
			</Series>

			{/* small brand watermark for scenes 1–3 */}
			<Series>
				<Series.Sequence durationInFrames={SCENES.hook + SCENES.concept + SCENES.keyPoint}>
					<div style={{position: 'absolute', top: 232, left: 64, transform: 'scale(0.3)', transformOrigin: 'top left'}}>
						<Logo scale={1} showTagline={false} />
					</div>
				</Series.Sequence>
			</Series>

			{voiceoverSrc ? <Audio src={staticFile(voiceoverSrc)} /> : null}
			{musicSrc ? <Audio src={staticFile(musicSrc)} volume={0.3} /> : null}
		</AbsoluteFill>
	);
};
