import { useState } from 'react'
import '../styles/EditableText.css'

interface EditableTextProps {
  text: string
  onSave: (newText: string) => void
  className?: string
}

const EditableText = ({ text, onSave, className = '' }: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(text)

  const handleSave = () => {
    setIsEditing(false)
    if (value !== text) onSave(value)
  }

  return (
    <div className={`editable-text ${className}`}>
      {isEditing ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <div onClick={() => setIsEditing(true)} className="editable-display">
          {text.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default EditableText