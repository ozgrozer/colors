import niceColors from 'nice-color-palettes'
import { useRef, useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

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
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.colors}
          >
            {colors.map((color, index) => (
              <ColorItem
                key={index}
                color={color}
                index={index}
                buttonRefs={buttonRefs}
                handleClick={handleClick}
                displayColorPicker={displayColorPicker}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
