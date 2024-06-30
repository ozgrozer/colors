import { useRef } from 'react'
import { MdClose } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'
import { PiArrowsHorizontal } from 'react-icons/pi'

import clx from '@functions/clx'
import ntc from '@functions/ntc'
import ColorPicker from './ColorPicker'
import NewColorButtons from './NewColorButtons'
import styles from '@styles/ColorItem.module.scss'
import { useAppContext } from '@contexts/AppContext'
import adjustTextColor from '@functions/adjustTextColor'

export default ({ color, index, handleClick, displayColorPicker, setDisplayColorPicker }) => {
  const { state, setState } = useAppContext()
  const { colors } = state

  const colorName = ntc.name(color)[1]
  const textColor = adjustTextColor(color)
  const backgroundColor = adjustTextColor(textColor)

  const buttonRef = useRef(null)

  const removeItem = ({ index }) => {
    setState(prevState => {
      const newColors = [...prevState.colors]
      newColors.splice(index, 1)
      return {
        ...prevState,
        colors: newColors
      }
    })
  }

  return (
    <Draggable key={index} index={index} draggableId={color}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={styles.colorWrapper}
          style={{
            ...provided.draggableProps.style,
            color: textColor,
            backgroundColor: color
          }}
        >
          <button
            ref={buttonRef}
            onClick={() => handleClick({ index })}
            className={clx(
              styles.colorCode,
              styles[backgroundColor],
              displayColorPicker[index] ? styles.open : ''
            )}
          >
            {color.substr(1).toUpperCase()}
          </button>

          <div>{colorName}</div>

          {
            colors.length > 1
              ? (
                <div className={styles.icons}>
                  <div
                    {...provided.dragHandleProps}
                    className={clx(
                      styles.iconWrapper,
                      styles[backgroundColor],
                      snapshot.isDragging ? styles.dragging : ''
                    )}
                  >
                    <PiArrowsHorizontal />
                  </div>

                  <button
                    onClick={() => removeItem({ index })}
                    className={clx(styles.iconWrapper, styles[backgroundColor])}
                  >
                    <MdClose />
                  </button>
                </div>
                )
              : null
          }

          <NewColorButtons index={index} />

          <ColorPicker
            index={index}
            color={color}
            buttonRef={buttonRef.current}
            displayColorPicker={displayColorPicker}
            setDisplayColorPicker={setDisplayColorPicker}
          />
        </div>
      )}
    </Draggable>
  )
}
