interface activeFont {
    [key: string]: string
}

export interface StyleContextTypes {
    color: string
    setColor: (color: string) => void
    activeColor: string
    font: string
    setFont: (font: string) => void
    activeFont: activeFont
}

export interface TimerDuration {
    pomodoro: number
    shortBreak: number
    longBreak: number
    [key: string]: number
}

export interface RemainingTime {
    pomodoro: number
    shortBreak: number
    longBreak: number
    [key: string]: number
}

export interface Playing {
    pomodoro: boolean
    shortBreak: boolean
    longBreak: boolean
    [key: string]: boolean
}

export interface TimerContextTypes {
    resetKey: number
    setResetKey: (resetKey: number) => void
    mode: Mode
    setMode: (mode: Mode) => void
    currentMode: Mode
    setCurrentMode: (mode: Mode) => void
    remainingTime: RemainingTime
    updateRemainingTime: (remain: number) => void
    timeDuration: TimerDuration
    setTimeDuration: (duration: any) => void
    isPlaying: Playing
    handleStartStop: (mode: Mode) => void
    handleComplete: () => void
    showSettings: boolean
    setShowSettings: (showSettings: any) => void
    handleReset: () => void
}

export interface ModeButtonProps {
    name: string
    data: Mode
}

export enum Mode {
    POMODORO = 'pomodoro',
    SHORTBREAK = 'shortBreak',
    LONGBREAK = 'longBreak',
}
