import { useContext, useEffect } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import ClockDisplay from './ClockDisplay'
import { StyleContext } from '../../contexts/StyleContext'
import { TimerContext } from '../../contexts/TimerContext'
import styles from './Clock.module.scss'

function Clock() {
    const { activeColor } = useContext(StyleContext)
    const {
        mode,
        timeDuration,
        isPlaying,
        resetKey,
        handleComplete,
        currentMode,
    } = useContext(TimerContext)

    const convertedTime: number = timeDuration[mode] * 60
    return (
        <main className={styles.clockContainer}>
            {/* desktop countdown timer */}
            <div className={styles.clockDesktop}>
                <CountdownCircleTimer
                    key={resetKey[mode]}
                    isPlaying={isPlaying}
                    duration={convertedTime}
                    colors={`#${activeColor}`}
                    trailColor='#161932'
                    rotation='counterclockwise'
                    size={339}
                    onComplete={() => {
                        handleComplete(mode)
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
            {/* mobile countdown timer */}
            <div className={styles.clockMobile}>
                <CountdownCircleTimer
                    key={resetKey[mode]}
                    isPlaying={isPlaying}
                    duration={convertedTime}
                    colors={`#${activeColor}`}
                    strokeWidth={8}
                    trailColor='#161932'
                    rotation='counterclockwise'
                    size={248.05}
                    onComplete={() => {
                        handleComplete(mode)
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
        </main>
    )
}

export default Clock
