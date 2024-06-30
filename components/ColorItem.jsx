import { useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import clx from '@functions/clx'
import ntc from '@functions/ntc'
import ColorPicker from './ColorPicker'
import NewColorButtons from './NewColorButtons'
import styles from '@styles/ColorItem.module.scss'
import adjustTextColor from '@functions/adjustTextColor'

export default ({ color, index, handleClick, displayColorPicker, setDisplayColorPicker }) => {
  const colorName = ntc.name(color)[1]
  const textColor = adjustTextColor(color)
  const backgroundColor = adjustTextColor(textColor)

  const buttonRef = useRef(null)

  return (
    <Draggable key={index} index={index} draggableId={color}>
      {(provided) => (
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

          <div {...provided.dragHandleProps}>drag</div>

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