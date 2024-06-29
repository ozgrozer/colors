import clx from '@functions/clx'
import styles from '@styles/Colors.module.scss'

const NewColorButton = ({ index }) => {
  const buttonOnClick = () => {
    console.log({ index })
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

export default ({ index, colors }) => {
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
