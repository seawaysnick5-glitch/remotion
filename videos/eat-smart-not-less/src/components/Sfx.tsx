import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';

export type SfxName =
	| 'pop'
	| 'pop-soft'
	| 'whoosh'
	| 'ding'
	| 'boing'
	| 'alarm'
	| 'thud'
	| 'click'
	| 'sparkle'
	| 'scratch';

// One sound effect starting at a frame (relative to the enclosing scene)
export const Sfx: React.FC<{at: number; name: SfxName; volume: number}> = ({at, name, volume}) => (
	<Sequence from={Math.max(0, at)} durationInFrames={30} layout="none">
		<Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
	</Sequence>
);
