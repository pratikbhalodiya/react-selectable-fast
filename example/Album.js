import React from 'react'
import { createSelectable } from '../src'

const Album = ({ selectableRef, selected, selecting, title }) => (
  <span
    ref={selectableRef}
    className={`item ${selecting && 'selecting'} ${selected && 'selected'}`}
  >
    {title}
  </span>
)

export default createSelectable(Album)
