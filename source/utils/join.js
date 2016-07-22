export default function joinPath(one, two, ...other) {
  if (!two) {
    return one
  }

  let oneEnds = one[one.length - 1] === '/'
  let twoStarts = two[0] === '/'

  let result

  if (oneEnds && twoStarts) {
    result = [one, two.substring(1)].join('')
  } else if (oneEnds || twoStarts) {
    result = [one, two].join('')
  } else {
    result = [one, two].join('/')
  }

  return joinPath(result, ...other)
}
