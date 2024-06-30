export default (colors, index) => {
  const hexToRgb = hex => {
    const bigint = parseInt(hex.slice(1), 16)
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
  }

  const rgbToHex = rgb =>
    '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('')

  const averageColor = (color1, color2) => {
    const rgb1 = hexToRgb(color1)
    const rgb2 = hexToRgb(color2)
    return rgb1.map((value, i) => Math.round((value + rgb2[i]) / 2))
  }

  const shiftColor = color => {
    const rgb = hexToRgb(color)
    return rgb.map(value =>
      Math.min(255, Math.max(0, value + Math.floor(Math.random() * 61) - 30))
    )
  }

  if (index === 0) {
    return rgbToHex(shiftColor(colors[0]))
  } else if (index === colors.length) {
    return rgbToHex(shiftColor(colors[colors.length - 1]))
  } else {
    return rgbToHex(averageColor(colors[index - 1], colors[index]))
  }
}
