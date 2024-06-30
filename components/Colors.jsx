import niceColors from 'nice-color-palettes'
import { useRef, useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import clx from '@functions/clx'
import ntc from '@functions/ntc'
import ColorPicker from './ColorPicker'
import styles from '@styles/Colors.module.scss'
import NewColorButtons from './NewColorButtons'
import { useAppContext } from '@contexts/AppContext'
import adjustTextColor from '@functions/adjustTextColor'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export default ({ colors: urlColors }) => {
  const { state, setState } = useAppContext()
  const { colors } = state

  useEffect(() => {
    const initialColors = urlColors.length
      ? urlColors.map((color) => `#${color}`)
      : niceColors[Math.floor(Math.random() * niceColors.length)]
    setState({ colors: initialColors })
  }, [urlColors])

  const buttonRefs = useRef({})
  const [displayColorPicker, setDisplayColorPicker] = useState({})

  const handleClick = ({ index }) => {
    setDisplayColorPicker(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }))
  }

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const newColors = reorder(
      colors,
      result.source.index,
      result.destination.index
    )

    setState({ colors: newColors })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='colors' direction='horizontal'>
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.colors}
          >
            {colors.map((color, index) => {
              const colorName = ntc.name(color)[1]
              const textColor = adjustTextColor(color)
              const backgroundColor = adjustTextColor(textColor)

              return (
                <Draggable
                  key={index}
                  index={index}
                  draggableId={color}
                >
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
                        ref={(el) => (buttonRefs.current[index] = el)}
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

                      <div {...provided.dragHandleProps}>
                        drag
                      </div>

                      <NewColorButtons index={index} />

                      <ColorPicker
                        index={index}
                        color={color}
                        buttonRef={buttonRefs.current[index]}
                        displayColorPicker={displayColorPicker}
                        setDisplayColorPicker={setDisplayColorPicker}
                      />
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
