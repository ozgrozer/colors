export default ({ object, search }) => {
  let result

  for (const i in object) {
    const objectItem = object[i] || {}
    const searchL1Key = Object.keys(search)[0]
    const objectItemL1Value = objectItem[searchL1Key]
    const searchL1Value = search[searchL1Key]

    if (typeof searchL1Value === 'object' && searchL1Value !== null) {
      const searchL2Key = Object.keys(searchL1Value)[0]
      const searchL2Value = searchL1Value[searchL2Key]

      for (const objectItemL2Key in objectItemL1Value) {
        const objectItemL2Value = objectItemL1Value[objectItemL2Key]

        if (objectItemL2Value === searchL2Value) {
          result = parseInt(i)
        }
      }
    } else {
      if (objectItemL1Value === searchL1Value) {
        result = parseInt(i)
      }
    }
  }

  return result
}
