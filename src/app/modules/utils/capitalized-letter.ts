import parse from 'html-react-parser'

export const capitalizeName = (s: string) => {
  if (typeof s !== 'string') return ''
  const v = s.toLowerCase()
  return v.charAt(0).toUpperCase() + v.slice(1)
}

export const capitalizeFirstLetter = (firstItem: string, secondItem: string) => {
  return (capitalizeName(firstItem).charAt(0) + capitalizeName(secondItem).charAt(0)).toUpperCase()
}

/** Fix date */
export const capitalizeOneFirstLetter = (fullItem: string) => {
  return capitalizeName(fullItem).substring(0, 2).toUpperCase()
}

/** Fix truncate */
export const truncateText = (input: string) => {
  return input?.length > 60 ? `${input.substring(0, 47)}...` : parse(input)
}

/** Fix truncate */
export const truncateDescription = (input: string) => {
  return input?.length > 500 ? `${input.substring(0, 450)}...` : input
}
