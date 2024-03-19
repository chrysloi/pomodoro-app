import { Mode } from '../../ts/types'
import ModeButton from './ModeButton'
// Styles
import styles from './Nav.module.scss'

function Nav() {
    const handleMode = () => {
        // placeholder
        console.log('clicked')
    }

    return (
        <nav className={styles.nav}>
            <ModeButton name='pomodoro' data={Mode.POMODORO} />
            <ModeButton name='short break' data={Mode.SHORTBREAK} />
            <ModeButton name='long break' data={Mode.LONGBREAK} />
        </nav>
    )
}

export default Nav
