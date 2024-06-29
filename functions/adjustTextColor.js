import Color from 'color'

export default backgroundColor => {
  const bgColor = Color(backgroundColor)
  const luminance = bgColor.luminosity()
  return luminance > 0.5 ? 'black' : 'white'
}
