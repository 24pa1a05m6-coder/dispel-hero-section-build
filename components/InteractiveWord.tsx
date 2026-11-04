type InteractiveWordProps = {
  word?: string
  className?: string
}

export function InteractiveWord({ word = 'dispel', className = '' }: InteractiveWordProps) {
  return (
    <span className={`interactive-word ${className}`} aria-label={word}>
      {Array.from(word).map((character, index) => (
        <span className="interactive-letter" data-letter={character} data-index={index} key={`${character}-${index}`}>
          {character}
        </span>
      ))}
    </span>
  )
}
