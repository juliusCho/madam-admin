import { render } from '@testing-library/react'
import { LayoutTab } from '.'
import { LabelMadam } from '../../labels/madam'

describe('Components LayoutTab', () => {
  it('display', () => {
    const { getByTestId } = render(
      <LayoutTab
        loading={false}
        depth={1}
        tabs={[
          {
            title: '1',
            route: '1',
          },
          {
            title: '2',
            route: '2',
          },
          {
            title: '3',
            route: '3',
          },
        ]}>
        <LabelMadam />
      </LayoutTab>,
    )

    const tabList = getByTestId('layouts.tab.list')

    expect(tabList).toBeInTheDocument()

    expect(tabList.childElementCount).toEqual(3)
  })
})
