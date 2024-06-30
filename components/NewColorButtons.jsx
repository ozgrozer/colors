import clx from '@functions/clx'
import styles from '@styles/ColorItem.module.scss'
import { useAppContext } from '@contexts/AppContext'
import calculateNewColor from '@functions/calculateNewColor'

const NewColorButton = ({ index }) => {
  const { setState } = useAppContext()

  const buttonOnClick = () => {
    setState((prevState) => {
      const newColors = [...prevState.colors]
      const newColor = calculateNewColor(prevState.colors, index)
      newColors.splice(index, 0, newColor)
      return {
        ...prevState,
        colors: newColors
      }
    })
  }

  return (
    <button
      onClick={buttonOnClick}
      className={styles.newColorButton}
    >
      +
    </button>
  )
}

export default ({ index }) => {
  const { state } = useAppContext()
  const { colors } = state

  return (
    <>
      {
        index === 0 && (
          <div className={clx(styles.newColorButtonWrapper, styles.firstButton)}>
            <NewColorButton index={index} />
          </div>
        )
      }

      {
        index !== colors.length - 1 && (
          <div className={styles.newColorButtonWrapper}>
            <NewColorButton index={index + 1} />
          </div>
        )
      }

      {
        index === colors.length - 1 && (
          <div className={clx(styles.newColorButtonWrapper, styles.lastButton)}>
            <NewColorButton index={index + 1} />
          </div>
        )
      }
    </>
  )
}
