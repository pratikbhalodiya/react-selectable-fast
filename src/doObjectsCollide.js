import getBoundsForNode from './getBoundsForNode'

/**
 * Given offsets, widths, and heights of two objects, determine if they collide (overlap).
 * @param  {int} aTop      The top position of the first object
 * @param  {int} aLeft     The left position of the first object
 * @param  {int} bTop      The top position of the second object
 * @param  {int} bLeft     The left position of the second object
 * @param  {int} aWidth    The width of the first object
 * @param  {int} aHeight   The height of the first object
 * @param  {int} bWidth    The width of the second object
 * @param  {int} bHeight   The height of the second object
 * @param  {int} tolerance The tolerance of the first object
 * @return {bool}
 */
const coordsCollide = (
  aTop,
  aLeft,
  bTop,
  bLeft,
  aWidth,
  aHeight,
  bWidth,
  bHeight,
  tolerance = 0,
) => (
  !(
    // 'a' bottom doesn't touch 'b' top
    (((aTop + aHeight) - tolerance) < bTop) ||
    // 'a' top doesn't touch 'b' bottom
    ((aTop + tolerance) > (bTop + bHeight)) ||
    // 'a' right doesn't touch 'b' left
    (((aLeft + aWidth) - tolerance) < bLeft) ||
    // 'a' left doesn't touch 'b' right
    ((aLeft + tolerance) > (bLeft + bWidth))
  )
)

/**
 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
 * properties, determine if they collide.
 * @param  {Object|HTMLElement} a
 * @param  {Object|HTMLElement} b
 * @param  {int} tolerance
 * @param  {int} delta
 * @return {bool}
 */
export default (a, b, tolerance, delta) => {
  if (typeof delta === 'undefined') {
    delta = 1
  }

  const aObj = (a instanceof HTMLElement) ? getBoundsForNode(a) : a
  const bObj = (b instanceof HTMLElement) ? getBoundsForNode(b) : b

  if (delta === 1) {
    return coordsCollide(
      aObj.top,
      aObj.left,
      bObj.top,
      bObj.left,
      aObj.offsetWidth,
      aObj.offsetHeight,
      bObj.offsetWidth,
      bObj.offsetHeight,
      tolerance,

    )
  }

  // We have a delta and we need to compute the new values

  return coordsCollide(
    aObj.top,
    aObj.left,
    bObj.top,
    bObj.left,
    aObj.computedWidth,
    aObj.computedHeight,
    bObj.computedWidth,
    bObj.computedHeight,
    tolerance,
  )
}
