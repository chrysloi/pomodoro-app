import { useContext } from 'react'
import { useActive } from '../../hooks/useActive'
import { TimerContext } from '../../contexts/TimerContext'
import { ModeButtonProps } from '../../ts/types'
import styles from './ModeButton.module.scss'

function ModeButton({ name, data }: ModeButtonProps) {
    const { mode, setMode, isPlaying } = useContext(TimerContext)
    const isActive = useActive(data, mode)

    return (
        <>
            <button
                className={`${styles.button} ${isActive && styles.active}`}
                onClick={() => setMode(data)}
                // disabled={isPlaying}
            >
                {name}
            </button>
        </>
    )
}

export default ModeButton
