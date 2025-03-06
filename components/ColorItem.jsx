import { useRef, useState, useEffect } from 'react'
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

const Icons = ({ index, snapshot, provided, backgroundColor }) => {
  const { setState } = useAppContext()

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
}

export default ({ color, index, handleClick, displayColorPicker, setDisplayColorPicker }) => {
  const { state } = useAppContext()
  const { colors } = state
  
  // Add local state to track real-time color changes during picker dragging
  const [displayColor, setDisplayColor] = useState(color)
  
  // Create a stable draggableId that won't change during color picker dragging
  // Use the index as part of the id to ensure uniqueness across the list
  const draggableId = `color-${index}-${color.replace('#', '')}`
  
  // Update displayColor when the prop color changes (from global state)
  // This ensures we sync back with global state when it changes
  useEffect(() => {
    setDisplayColor(color)
  }, [color])
  
  // Handle local color updates from ColorPicker during dragging
  const handleLocalColorChange = (colorIndex, newColor) => {
    if (colorIndex === index) {
      setDisplayColor(newColor)
    }
  }

  // Use the displayColor for all visual aspects
  const colorName = ntc.name(displayColor)[1]
  const textColor = adjustTextColor(displayColor)
  const backgroundColor = adjustTextColor(textColor)

  const buttonRef = useRef(null)

  return (
    <Draggable key={index} index={index} draggableId={draggableId}>
      {(provided, snapshot) => {
        const transform = provided.draggableProps.style.transform
        if (transform) {
          const t = transform.split(',')[0]
          provided.draggableProps.style.transform = t + ', 0px)'
        }

        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={clx(
              styles.colorWrapper,
              snapshot.isDragging ? styles.dragging : ''
            )}
            style={{
              ...provided.draggableProps.style,
              color: textColor,
              backgroundColor: displayColor
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
              {displayColor.substr(1).toUpperCase()}
            </button>

            <div>{colorName}</div>

            {
              colors.length > 1
                ? (
                  <Icons
                    index={index}
                    snapshot={snapshot}
                    provided={provided}
                    backgroundColor={backgroundColor}
                  />
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
              onLocalColorChange={handleLocalColorChange}
            />
          </div>
        )
      }}
    </Draggable>
  )
}
