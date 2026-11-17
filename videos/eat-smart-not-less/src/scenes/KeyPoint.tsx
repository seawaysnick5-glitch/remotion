import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {BodyFigure} from '../components/BodyFigure';
import {Caption} from '../components/Caption';
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
	const weight = interpolate(frame, [18, 60], [72, 68], clamp);
	const bigScaleIn = pop(frame, 0, 11);
	const splitT = interpolate(frame, [72, 86], [0, 1], clamp);

	// part B: split comparison
	const leftIn = pop(frame, 78, 12);
	const rightIn = pop(frame, 84, 12);
	const leftMuscle = interpolate(frame, [110, 140], [100, 55], clamp);
	const leftFat = interpolate(frame, [110, 140], [100, 85], clamp);
	const rightFat = interpolate(frame, [165, 195], [100, 45], clamp);
	const softTag = pop(frame, 140, 9);
	const firmTag = pop(frame, 192, 9);

	// part C: right side wins
	const win = interpolate(frame, [238, 256], [0, 1], clamp);
	const punchIn = pop(frame, 244, 10);

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
					<BodyFigure variant={isLeft ? 'soft' : 'firm'} height={480} wobbleFrom={140} />
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
							transform: `scale(${pop(frame, 4, 10)})`,
						}}
					>
						อย่าดูแค่ตาชั่ง!
					</div>
					<div style={{marginTop: 60, transform: `scale(${bigScaleIn})`}}>
						<Scale value={weight.toFixed(1)} width={760} />
					</div>
					{frame > 60 ? (
						<div
							style={{
								marginTop: 30,
								fontFamily: FONT_TH,
								fontWeight: 900,
								fontSize: 64,
								color: C.white,
								transform: `scale(${pop(frame, 60, 9)})`,
							}}
						>
							-4 kg ข่าวดี...?
						</div>
					) : null}
				</AbsoluteFill>
			) : null}

			{/* part B */}
			{frame >= 74 ? (
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
							transform: `scale(${pop(frame, 92, 10) * (1 - win)})`,
						}}
					>
						VS
					</div>
				</>
			) : null}

			{/* part C punchline */}
			{frame >= 240 ? (
				<div
					style={{
						position: 'absolute',
						top: 560,
						left: 60,
						right: 60,
						background: C.lime,
						border: `8px solid ${C.black}`,
						boxShadow: `14px 14px 0 ${C.white}`,
						borderRadius: 36,
						padding: '26px 20px',
						textAlign: 'center',
						fontFamily: FONT_TH,
						fontWeight: 900,
						fontSize: 70,
						lineHeight: 1.25,
						color: C.black,
						transform: `scale(${punchIn}) rotate(-3deg)`,
					}}
				>
					ไม่ใช่แค่ "เบาลง"
					<br />
					แต่ต้อง "ดีขึ้น"
				</div>
			) : null}

			<Caption
				y={1430}
				segments={[
					{from: 0, to: 80, text: 'ที่สำคัญ... อย่าดูแค่*ตัวเลข*บนตาชั่งครับ'},
					{from: 80, to: 142, text: 'เพราะ "ลด*น้ำหนัก*" อาจเสียกล้ามเนื้อ'},
					{from: 142, to: 172, text: 'จน*ตัวนิ่ม*'},
					{from: 172, to: 236, text: 'แต่ "ลด*ไขมัน*" คือหุ่นที่*เฟิร์ม*'},
					{from: 236, to: 300, text: 'และ*ลีน*ขึ้นจริง!'},
				]}
			/>
		</AbsoluteFill>
	);
};
