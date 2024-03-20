import { createContext, useState, useMemo, useRef, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Mode, RemainingTime, TimerContextTypes } from '../ts/types'
import useSound from 'use-sound'
import mySound from '../assets/mixkit-achievement-bell-600.wav'

export const TimerContext = createContext<TimerContextTypes>({
    resetKey: {
        reset: 0,
        pomodoro: 1,
        longBreak: 2,
        shortBreak: 3,
    },
    setResetKey: () => null,
    mode: Mode.POMODORO,
    setMode: () => null,
    currentMode: Mode.POMODORO,
    setCurrentMode: () => null,
    timeDuration: {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
    },
    remainingTime: {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
    },
    updateRemainingTime: () => null,
    setTimeDuration: () => null,
    isPlaying: false,
    handleStartStop: () => null,
    handleComplete: () => null,
    showSettings: false,
    setShowSettings: () => null,
    handleReset: () => null,
})

export function TimerProvider({ children }: { children: JSX.Element }) {
    const [resetKey, setResetKey] = useState<{
        reset: number
        pomodoro: number
        longBreak: number
        shortBreak: number
    }>({
        reset: 0,
        pomodoro: 1,
        longBreak: 2,
        shortBreak: 3,
    })
    const [mode, setMode] = useState<Mode>(Mode.POMODORO)
    const [count, setCount] = useState<number>(0)
    const [currentMode, setCurrentMode] = useState<Mode>(Mode.POMODORO)
    const [timeDuration, setTimeDuration] = useLocalStorage('timeDuration', {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
    })
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [play] = useSound(mySound)
    const [showSettings, setShowSettings] = useState(false)
    const remainingTime = useRef<RemainingTime>({
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
    })

    const updateRemainingTime = useCallback((remain: number) => {
        remainingTime.current[currentMode] = remain
    }, [])

    const handleStartStop = () => setIsPlaying((prevState) => !prevState)

    const handleReset = (mode: Mode) =>
        setResetKey((key) => ({ ...key, [mode]: key[mode] + 1 }))

    const toNextStep = useCallback(() => {
        switch (mode) {
            case Mode.POMODORO:
                if (count <= 1) {
                    setMode(Mode.SHORTBREAK)
                    setIsPlaying((prevState) => !prevState)
                    setCount(count + 1)
                } else if (count >= 2) {
                    setMode(Mode.LONGBREAK)
                    setIsPlaying((prevState) => !prevState)
                    setCount(0)
                }
                break
            case Mode.SHORTBREAK:
                setMode(Mode.POMODORO)
                setIsPlaying((prevState) => !prevState)
                break
            case Mode.LONGBREAK:
                setMode(Mode.POMODORO)
                setIsPlaying((prevState) => !prevState)
                break
        }
    }, [mode])

    const handleComplete = (mode: Mode) => {
        play()
        setIsPlaying((prevState) => !prevState)
        toNextStep()
    }

    const value: TimerContextTypes = useMemo(
        () => ({
            resetKey,
            setResetKey,
            mode,
            setMode,
            currentMode,
            setCurrentMode,
            timeDuration,
            setTimeDuration,
            remainingTime: remainingTime.current,
            updateRemainingTime,
            isPlaying,
            handleStartStop,
            handleComplete,
            showSettings,
            setShowSettings,
            handleReset,
        }),
        [mode, timeDuration, resetKey, isPlaying, showSettings]
    )

    return (
        <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
    )
}
