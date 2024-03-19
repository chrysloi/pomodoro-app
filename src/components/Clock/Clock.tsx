import { useContext, useEffect } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import ClockDisplay from './ClockDisplay'
import { StyleContext } from '../../contexts/StyleContext'
import { TimerContext } from '../../contexts/TimerContext'
import styles from './Clock.module.scss'
import { CounterClock } from './couterClock'
import { Mode } from '../../ts/types'

function Clock() {
    const { activeColor } = useContext(StyleContext)
    const {
        mode,
        timeDuration,
        isPlaying,
        resetKey,
        handleComplete,
        currentMode,
        remainingTime,
        updateRemainingTime,
    } = useContext(TimerContext)

    useEffect(() => {
        const timerId = setInterval(() => {
            if (isPlaying[currentMode])
                updateRemainingTime(remainingTime[currentMode] - 1)
        }, 1000)
        return () => {
            clearInterval(timerId)
        }
    }, [isPlaying])
    const convertedTime: number = timeDuration[mode] * 60
    return (
        <main className={styles.clockContainer}>
            {mode === Mode.POMODORO && (
                <CounterClock
                    convertedTime={timeDuration[Mode.POMODORO] * 60}
                    isPlaying={
                        currentMode === Mode.POMODORO &&
                        isPlaying[Mode.POMODORO]
                    }
                />
            )}
            {mode === Mode.SHORTBREAK && (
                <CounterClock
                    convertedTime={timeDuration[Mode.SHORTBREAK] * 60}
                    isPlaying={currentMode === Mode.SHORTBREAK}
                />
            )}
            {mode === Mode.LONGBREAK && (
                <CounterClock
                    convertedTime={timeDuration[Mode.LONGBREAK] * 60}
                    isPlaying={currentMode === Mode.LONGBREAK}
                />
            )}
        </main>
    )
}

export default Clock
