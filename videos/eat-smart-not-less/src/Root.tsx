import React from 'react';
import {Composition} from 'remotion';
import {EatSmartNotLess, EatSmartNotLessProps} from './Video';
import {FPS} from './theme';
import {TOTAL_FRAMES} from './timing';

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="EatSmartNotLess"
			component={EatSmartNotLess}
			durationInFrames={TOTAL_FRAMES}
			fps={FPS}
			width={1080}
			height={1920}
			defaultProps={
				{
					voiceoverSrc: 'voiceover.wav',
					musicSrc: 'music.wav',
				} satisfies EatSmartNotLessProps
			}
		/>
	);
};
