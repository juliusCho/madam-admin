interface StyleProps {
  isDragging: boolean
  isOver: boolean
  canDrop: boolean
}

const GridRowStyle = {
  row({ isDragging, isOver, canDrop }: StyleProps) {
    return {
      className: `
        w-full
        flex
        justify-start
        items-start
        ${isDragging ? 'opacity-50' : ''}
        ${isOver ? 'border-2 border-sub-green' : ''}
        ${canDrop ? 'shadow-glow' : ''}
      `,
    }
  },
}

export default GridRowStyle
