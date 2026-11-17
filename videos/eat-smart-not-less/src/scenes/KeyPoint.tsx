import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {BodyFigure} from '../components/BodyFigure';
import {Caption} from '../components/Caption';
import {Sfx} from '../components/Sfx';
import {at, CAPTIONS} from '../timing';
import {Scale} from '../components/Scale';
import {C, FONT_BRAND, FONT_TH, FONT_TH_ITALIC, pop} from '../theme';

// 0:13–0:23  weight loss vs fat loss (split screen)
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const Bar: React.FC<{label: string; value: number; color: string}> = ({label, value, color}) => (
	<div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 14}}>
		<div style={{width: 120, fontFamily: FONT_TH, fontWeight: 800, fontSize: 34, color: C.white, textAlign: 'right'}}>
			{label}
		</div>
		<div style={{flex: 1, height: 38, background: '#333', borderRadius: 19, border: `4px solid ${C.white}`, overflow: 'hidden'}}>
			<div style={{width: `${value}%`, height: '100%', background: color}} />
		</div>
	</div>
);

export const KeyPoint: React.FC = () => {
	const frame = useCurrentFrame();

	// part A: one big scale drops 72 -> 68
	const t = at.keyPoint;
	const T = {
		headline: t(14.95), // "ที่สำคัญ"
		drop: t(15.3), // "อย่าดูแค่ตัวเลข"
		goodNews: t(16.05),
		split: t(16.6), // "เพราะลดน้ำหนัก"
		muscleLoss: t(17.4), // "อาจเสียกล้ามเนื้อ"
		soft: t(18.3), // "จนตัวนิ่ม"
		fatLoss: t(19.3), // "แต่ลดไขมัน"
		firm: t(19.85), // "เฟิร์ม"
		win: t(20.24), // "และลีนขึ้นจริง"
	};
	const weight = interpolate(frame, [T.drop, T.goodNews], [72, 68], clamp);
	const bigScaleIn = pop(frame, 0, 11);
	const splitT = interpolate(frame, [T.split - 2, T.split + 10], [0, 1], clamp);

	// part B: split comparison
	const leftIn = pop(frame, T.split, 12);
	const rightIn = pop(frame, T.split + 4, 12);
	const leftMuscle = interpolate(frame, [T.muscleLoss, T.soft], [100, 55], clamp);
	const leftFat = interpolate(frame, [T.muscleLoss, T.soft], [100, 85], clamp);
	const rightFat = interpolate(frame, [T.fatLoss, T.firm + 6], [100, 45], clamp);
	const softTag = pop(frame, T.soft, 9);
	const firmTag = pop(frame, T.firm, 9);

	// part C: right side wins
	const win = interpolate(frame, [T.win, T.win + 10], [0, 1], clamp);

	const panel = (side: 'left' | 'right') => {
		const isLeft = side === 'left';
		const enter = isLeft ? leftIn : rightIn;
		const dim = isLeft ? win : 0;
		return (
			<div
				style={{
					position: 'absolute',
					top: 310,
					bottom: 520,
					left: isLeft ? 0 : 540,
					width: 540,
					background: isLeft ? '#3A1512' : '#1E2408',
					borderLeft: isLeft ? 'none' : `8px solid ${C.black}`,
					transform: `translateX(${(1 - enter) * (isLeft ? -540 : 540)}px) ${!isLeft ? `scale(${1 + win * 0.04})` : ''}`,
					filter: `grayscale(${dim})`,
					opacity: 1 - dim * 0.55,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: '30px 34px 0',
					boxSizing: 'border-box',
				}}
			>
				<div
					style={{
						fontFamily: FONT_TH,
						fontWeight: 900,
						fontSize: 66,
						color: isLeft ? C.red : C.lime,
					}}
				>
					{isLeft ? 'ลดน้ำหนัก' : 'ลดไขมัน'}
				</div>
				<div
					style={{
						fontFamily: FONT_BRAND,
						fontSize: 52,
						color: C.white,
						background: C.black,
						padding: '2px 22px',
						borderRadius: 14,
						marginTop: 4,
					}}
				>
					-4 KG
				</div>
				<div style={{marginTop: 18, position: 'relative'}}>
					<BodyFigure variant={isLeft ? 'soft' : 'firm'} height={480} wobbleFrom={T.soft} />
					<div
						style={{
							position: 'absolute',
							bottom: 30,
							left: '50%',
							transform: `translateX(-50%) scale(${isLeft ? softTag : firmTag}) rotate(${isLeft ? -6 : 5}deg)`,
							whiteSpace: 'nowrap',
							fontFamily: FONT_TH,
							fontWeight: 900,
							fontSize: 54,
							background: isLeft ? C.red : C.lime,
							color: isLeft ? C.white : C.black,
							border: `5px solid ${C.black}`,
							padding: '4px 26px',
							borderRadius: 20,
						}}
					>
						{isLeft ? 'ตัวนิ่ม' : 'เฟิร์ม & ลีน'}
					</div>
				</div>
				<div style={{width: '100%', marginTop: 8}}>
					<Bar label="กล้าม" value={isLeft ? leftMuscle : 100} color={isLeft ? C.red : C.lime} />
					<Bar label="ไขมัน" value={isLeft ? leftFat : rightFat} color={C.gold} />
				</div>
			</div>
		);
	};

	return (
		<AbsoluteFill style={{background: C.black}}>
			{/* part A */}
			{splitT < 1 ? (
				<AbsoluteFill style={{opacity: 1 - splitT, alignItems: 'center'}}>
					<div
						style={{
							marginTop: 330,
							fontFamily: FONT_TH_ITALIC,
							fontStyle: 'italic',
							fontWeight: 900,
							fontSize: 96,
							color: C.lime,
							transform: `scale(${pop(frame, T.headline, 10)})`,
						}}
					>
						อย่าดูแค่ตาชั่ง!
					</div>
					<div style={{marginTop: 60, transform: `scale(${bigScaleIn})`}}>
						<Scale value={weight.toFixed(1)} width={760} />
					</div>
					{frame >= T.goodNews ? (
						<div
							style={{
								marginTop: 30,
								fontFamily: FONT_TH,
								fontWeight: 900,
								fontSize: 64,
								color: C.white,
								transform: `scale(${pop(frame, T.goodNews, 9)})`,
							}}
						>
							-4 kg ข่าวดี...?
						</div>
					) : null}
				</AbsoluteFill>
			) : null}

			{/* part B */}
			{frame >= T.split - 2 ? (
				<>
					{panel('left')}
					{panel('right')}
					<div
						style={{
							position: 'absolute',
							top: 680,
							left: 540 - 60,
							width: 120,
							height: 120,
							borderRadius: 60,
							background: C.white,
							border: `8px solid ${C.black}`,
							fontFamily: FONT_BRAND,
							fontSize: 60,
							lineHeight: '104px',
							textAlign: 'center',
							color: C.black,
							transform: `scale(${pop(frame, T.split + 8, 10) * (1 - win)})`,
						}}
					>
						VS
					</div>
				</>
			) : null}

			<Caption cues={CAPTIONS.keyPoint} toFrame={t} y={1430} />

			<Sfx at={0} name="pop" volume={0.5} />
			<Sfx at={T.drop} name="click" volume={0.4} />
			<Sfx at={T.drop + 6} name="click" volume={0.4} />
			<Sfx at={T.drop + 12} name="click" volume={0.4} />
			<Sfx at={T.goodNews} name="ding" volume={0.4} />
			<Sfx at={T.split} name="whoosh" volume={0.55} />
			<Sfx at={T.split + 8} name="thud" volume={0.4} />
			<Sfx at={T.soft} name="boing" volume={0.65} />
			<Sfx at={T.firm} name="pop" volume={0.55} />
			<Sfx at={T.firm + 2} name="sparkle" volume={0.45} />
			<Sfx at={T.win} name="ding" volume={0.45} />
		</AbsoluteFill>
	);
};
