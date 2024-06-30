import { useState, useEffect } from 'react'
import niceColors from 'nice-color-palettes'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import clx from '@functions/clx'
import ColorItem from './ColorItem'
import styles from '@styles/Colors.module.scss'
import { useAppContext } from '@contexts/AppContext'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export default ({ colors: urlColors }) => {
  const { state, setState } = useAppContext()
  const { colors, cookiesLoaded } = state

  useEffect(() => {
    if (!cookiesLoaded) return
    if (colors.length) return
    const initialColors = urlColors.length
      ? urlColors.map((color) => `#${color}`)
      : niceColors[Math.floor(Math.random() * niceColors.length)]
    setState({ colors: initialColors })
  }, [colors, urlColors, cookiesLoaded])

  const [displayColorPicker, setDisplayColorPicker] = useState({})

  const handleClick = ({ index }) => {
    setDisplayColorPicker((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }))
  }

  const onDragEnd = (result) => {
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
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={clx(
              styles.colors,
              snapshot.isDraggingOver ? 'isDragging' : ''
            )}
          >
            {colors.map((color, index) => (
              <ColorItem
                key={color}
                color={color}
                index={index}
                handleClick={handleClick}
                displayColorPicker={displayColorPicker}
                setDisplayColorPicker={setDisplayColorPicker}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
