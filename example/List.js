import React, { Component } from 'react'
import { SelectAll, DeselectAll } from '../src'
import SelectableAlbum from './Album'

class List extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items
  }

  render() {
    return (
      <div>
        <p className="not-selectable">Press ESC to clear selection</p>
        <div>
          <SelectAll className="selectable-button">
            <button>Select all</button>
          </SelectAll>
          <DeselectAll className="selectable-button">
            <button>Clear selection</button>
          </DeselectAll>
        </div>
        <div className="albums">
          {this.props.items.map((title, i) => (
            <SelectableAlbum
              key={`${title}${i}`}
              title={title}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default List
