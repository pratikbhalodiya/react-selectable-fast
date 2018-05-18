import React, { Component } from 'react'
import { object, bool } from 'prop-types'
import getBoundsForNode from './getBoundsForNode'

const createSelectable = WrappedComponent => (
  class SelectableItem extends Component {
    static propTypes = {
      selected: bool,
    }

    static defaultProps = {
      selected: false,
    }

    static contextTypes = {
      selectable: object,
    }

    state = {
      selected: this.props.selected,
      selecting: false,
    }

    startCursor = null
    endCursor = null

    componentDidMount() {
      this.registerSelectable()
    }

    componentWillUnmount() {
      this.context.selectable.unregister(this)
    }

    registerSelectable = containerScroll => {
      const bounds = getBoundsForNode(this.node, containerScroll)
      const startCursorBounds = getBoundsForNode(this.startCursor, containerScroll)
      const endCursorBounds = getBoundsForNode(this.endCursor, containerScroll)

      if (startCursorBounds.top === endCursorBounds.top) {
        this.bounds = [bounds]
      } else {
        if (bounds.top !== startCursorBounds.top) {
          const topOffset = startCursorBounds.top - bounds.top

          startCursorBounds.top -= topOffset
          startCursorBounds.offsetHeight += topOffset
          startCursorBounds.computedHeight += topOffset
          endCursorBounds.top -= topOffset
          endCursorBounds.offsetHeight += topOffset
          endCursorBounds.computedHeight += topOffset
        }

        if (bounds.top + bounds.offsetHeight !== endCursorBounds.top + endCursorBounds.offsetHeight) {
          const bottomOffset = (bounds.top + bounds.offsetHeight) - (endCursorBounds.top + endCursorBounds.offsetHeight)

          startCursorBounds.offsetHeight += bottomOffset
          startCursorBounds.computedHeight += bottomOffset
          endCursorBounds.offsetHeight += bottomOffset
          endCursorBounds.computedHeight += bottomOffset
        }

        this.bounds = [{
          ...startCursorBounds,
          offsetWidth: (bounds.left + bounds.offsetWidth) - startCursorBounds.left,
          computedWidth: (bounds.left + bounds.computedWidth) - startCursorBounds.left,
        }, {
          ...endCursorBounds,
          left: bounds.left,
          offsetWidth: endCursorBounds.left - bounds.left,
          computedWidth: endCursorBounds.left - bounds.left,
        }]

        if (startCursorBounds.top + startCursorBounds.offsetHeight < endCursorBounds.top) {
          const nodeHeight =
            endCursorBounds.top - (startCursorBounds.top + startCursorBounds.offsetHeight)

          this.bounds.push({
            ...bounds,
            top: startCursorBounds.top + startCursorBounds.offsetHeight,
            offsetHeight: nodeHeight,
            computedHeight: nodeHeight,
          })
        }
      }

      this.context.selectable.register(this)
    }

    selectableRef = ref => this.node = ref

    render() {
      return (
        <span>
          <span
            ref={ref => {
              this.startCursor = ref
            }}
            style={{
              display: 'inline-block'
            }}
          />
          <WrappedComponent
            {...this.props}
            selected={this.state.selected}
            selecting={this.state.selecting}
            selectableRef={this.selectableRef}
          />
          <span
            ref={ref => {
              this.endCursor = ref
            }}
            style={{
              display: 'inline-block'
            }}
          />
        </span>
      )
    }
  }
)

export default createSelectable
