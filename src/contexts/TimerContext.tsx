import {
    createContext,
    useState,
    useMemo,
    useRef,
    useEffect,
    useCallback,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

// Types
import { Mode, Playing, RemainingTime, TimerContextTypes } from '../ts/types'

export const TimerContext = createContext<TimerContextTypes>({
    resetKey: 0,
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
    isPlaying: {
        longBreak: false,
        pomodoro: false,
        shortBreak: false,
    },
    handleStartStop: () => null,
    handleComplete: () => null,
    showSettings: false,
    setShowSettings: () => null,
    handleReset: () => null,
})

export function TimerProvider({ children }: { children: JSX.Element }) {
    const [resetKey, setResetKey] = useState(0)
    const [mode, setMode] = useState<Mode>(Mode.POMODORO)
    const [currentMode, setCurrentMode] = useState<Mode>(Mode.POMODORO)
    const [timeDuration, setTimeDuration] = useLocalStorage('timeDuration', {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
    })
    // const [remainingTime, updateRemainingTime] = useState<RemainingTime>()
    const [isPlaying, setIsPlaying] = useState<Playing>({
        longBreak: false,
        pomodoro: false,
        shortBreak: false,
    })
    const [showSettings, setShowSettings] = useState(false)
    const remainingTime = useRef<RemainingTime>({
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
    })

    const updateRemainingTime = useCallback((remain: number) => {
        remainingTime.current[currentMode] = remain
    }, [])

    // useEffect(() => {
    //     const timerId = setInterval(() => {
    //         remainingTime.current[currentMode] -= 1
    //         if (remainingTime.current[currentMode] < 0) {
    //             clearInterval(timerId)
    //         }
    //     }, 1000)
    //     return () => {
    //         clearInterval(timerId)
    //     }
    // }, [])

    const handleStartStop = (mode: Mode) =>
        setIsPlaying((prevState) => ({
            ...prevState,
            [mode]: !prevState[mode],
        }))
    // const handleReset = () => setResetKey((resetKey: number) => resetKey + 1)
    const handleReset = useCallback(() => {
        remainingTime.current = {
            pomodoro: 25 * 60,
            shortBreak: 5 * 60,
            longBreak: 15 * 60,
        }
    }, [])
    const handleComplete = () => {
        handleReset(),
            setIsPlaying({
                longBreak: false,
                pomodoro: false,
                shortBreak: false,
            })
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
