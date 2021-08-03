import React from 'react'
import './loading.style.scss'

export interface LoadingProps {
  loading: boolean
  style?: React.CSSProperties
  testID?: string
}

function Loading({ loading, style, testID }: LoadingProps) {
  return (
    <div
      data-testid={testID}
      className={`loading-container ${!loading ? 'hidden' : 'flex'}`}
      style={style}>
      {loading && (
        <div className="icon-spinner-container">
          <i
            data-testid="components.etc.loading.icon"
            className="xi-spinner-5 spinner"
          />
        </div>
      )}
    </div>
  )
}

Loading.defaultProps = {
  style: {},
  testID: '',
}

export default React.memo(Loading)
