import ntc from './ntc'
import toKebabCase from './toKebabCase'
import toCamelCase from './toCamelCase'

const generateVariableName = (colorName, index, colorNames) => {
  const occurrences = colorNames
    .slice(0, index + 1)
    .filter((name) => name === colorName).length
  return occurrences > 1 ? `${colorName}-${occurrences}` : colorName
}

export default colors => {
  const colorNames = colors.map((color) => ntc.name(color)[1])
  const variables = colors.map((color, index) => {
    const colorName = ntc.name(color)[1]
    const variableName = generateVariableName(colorName, index, colorNames)
    const kebabCase = toKebabCase(variableName)
    const camelCase = toCamelCase(variableName)

    return {
      css: `--${kebabCase}: ${color};`,
      scss: `$${kebabCase}: ${color};`,
      js: `const ${camelCase} = '${color}'`
    }
  })

  return {
    css: variables.map((v) => v.css).join('\n'),
    scss: variables.map((v) => v.scss).join('\n'),
    js: variables.map((v) => v.js).join('\n')
  }
}
