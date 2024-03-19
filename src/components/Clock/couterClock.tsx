import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import ClockDisplay from './ClockDisplay'
import { useContext } from 'react'
import { TimerContext } from '../../contexts/TimerContext'
import { StyleContext } from '../../contexts/StyleContext'
import styles from './Clock.module.scss'

interface Props {
    convertedTime: number
    isPlaying: boolean
}
export const CounterClock: React.FC<Props> = ({ convertedTime, isPlaying }) => {
    const { activeColor } = useContext(StyleContext)
    const {
        mode,
        resetKey,
        handleComplete,
        currentMode,
        remainingTime,
        timeDuration,
    } = useContext(TimerContext)
    // const convertedTime: number = timeDuration[mode] * 60

    return (
        <>
            {/* desktop countdown timer */}
            <div className={styles.clockDesktop}>
                {/* <CircularProgressbar
                    value={remainingTime[currentMode]}
                    text={`${remainingTime[currentMode]}`}
                    // background={true}
                    maxValue={timeDuration[currentMode]}
                    styles={buildStyles({
                        trailColor: '#252525',
                        backgroundColor: '#111',
                        pathColor: '#fab430',
                        textColor: '#fff',
                        textSize: '16px',
                    })}
                /> */}
                {/* <ClockDisplay remainingTime={remainingTime[mode]} mode={mode} /> */}
                <CountdownCircleTimer
                    key={resetKey}
                    // isPlaying={currentMode === 'pomodoro'}
                    // duration={convertedTime}
                    isPlaying={isPlaying}
                    duration={convertedTime}
                    initialRemainingTime={remainingTime[currentMode]}
                    colors={`#${activeColor}`}
                    trailColor='#161932'
                    rotation='counterclockwise'
                    size={339}
                    onComplete={() => {
                        handleComplete()
                    }}
                >
                    {({}) => (
                        <ClockDisplay
                            remainingTime={remainingTime[mode]}
                            mode={mode}
                        />
                    )}
                </CountdownCircleTimer>
            </div>
            {/* mobile countdown timer */}
            <div className={styles.clockMobile}>
                <CountdownCircleTimer
                    key={resetKey}
                    // isPlaying={currentMode === mode && isPlaying}
                    // duration={convertedTime}
                    isPlaying={isPlaying}
                    duration={convertedTime}
                    colors={`#${activeColor}`}
                    strokeWidth={8}
                    trailColor='#161932'
                    rotation='counterclockwise'
                    size={248.05}
                    onComplete={() => {
                        handleComplete()
                    }}
                >
                    {({ remainingTime }) => (
                        <ClockDisplay
                            remainingTime={remainingTime}
                            mode={mode}
                        />
                    )}
                </CountdownCircleTimer>
            </div>
        </>
    )
}
