import {loadFont} from '@remotion/fonts';
import {spring, staticFile} from 'remotion';

// Fonts are bundled in public/fonts so renders work offline
export const FONT_TH = 'Kanit';
export const FONT_TH_ITALIC = 'Kanit';
export const FONT_BRAND = 'Anton';

const fonts: [string, string, string, 'normal' | 'italic'][] = [
	[FONT_TH, 'Kanit-Medium.ttf', '500', 'normal'],
	[FONT_TH, 'Kanit-Bold.ttf', '700', 'normal'],
	[FONT_TH, 'Kanit-ExtraBold.ttf', '800', 'normal'],
	[FONT_TH, 'Kanit-Black.ttf', '900', 'normal'],
	[FONT_TH, 'Kanit-BlackItalic.ttf', '900', 'italic'],
	[FONT_BRAND, 'Anton-Regular.ttf', '400', 'normal'],
];
fonts.forEach(([family, file, weight, style]) => {
	loadFont({family, url: staticFile(`fonts/${file}`), weight, style, format: 'truetype'});
});

// #THEBODYNEXT brand palette (lime sampled from the logo)
export const C = {
	lime: '#E2EA5A',
	limeDark: '#C7D03A',
	black: '#0E0E0E',
	white: '#FFFFFF',
	cream: '#FFF8E6',
	red: '#FF4D3D',
	butter: '#FFE58F',
	gold: '#FFB830',
	green: '#3DBE6A',
	skin: '#F4C9A1',
	grey: '#9A9A9A',
};

export const FPS = 30;

export const pop = (frame: number, delay: number, damping = 11) =>
	spring({
		frame: frame - delay,
		fps: FPS,
		config: {damping, stiffness: 170, mass: 0.8},
	});
