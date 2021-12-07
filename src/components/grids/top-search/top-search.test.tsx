import { fireEvent, render, screen } from '@testing-library/react'
import moment from 'moment'
import GridTopSearch from './top-search.component'

describe('Components GridTopSearch test', () => {
  const onSelectSingleSelect = jest.fn()
  const onSelectMultiSelect = jest.fn()
  const onSelectCheckbox = jest.fn()
  const onSelectRadio = jest.fn()
  const onSearch = jest.fn()

  render(
    <GridTopSearch
      searchInputs={[
        {
          type: 'single-select',
          label: '싱글셀렉트',
          onSelect: onSelectSingleSelect,
          options: [
            { label: 'l1', value: 1 },
            { label: 'la', value: 'a' },
          ],
          value: 1,
          placeholder: '전체',
          width: '10rem',
        },
        {
          type: 'multi-select',
          label: '멀티셀렉트',
          onSelect: onSelectMultiSelect,
          options: [{ label: 'l2', value: 2 }],
          value: [2],
          placeholder: '전체',
          width: '10rem',
        },
        {
          type: 'checkbox',
          label: '체크박스',
          onSelect: onSelectCheckbox,
          options: [{ label: 'l3', value: 3 }],
          placeholder: '전체',
          width: '10rem',
        },
        {
          type: 'radio',
          label: '라디오',
          onSelect: onSelectRadio,
          options: [{ label: 'l4', value: 4 }],
          value: 4,
          placeholder: '전체',
          width: '10rem',
        },
        {
          type: 'date',
          label: '날짜',
          onSelect: jest.fn(),
          options: [moment().add(-30, 'days').toDate(), moment().toDate()],
          width: '10rem',
        },
      ]}
      onSearch={onSearch}
    />,
  )

  const container = screen.getByTestId('components.grids.top-search.container')
  const singleSelectLabel = screen.getByText('싱글셀렉트')
  const singleSelectValue = screen.getByText('l1')
  const multiSelectLabel = screen.getByText('멀티셀렉트')
  const multiSelectValue = screen.getByText('l2')
  const checkboxLabel = screen.getByText('체크박스')
  const checkboxValue = screen.getAllByText('전체')[0]
  const radioLabel = screen.getByText('라디오')
  const radioValue = screen.getByText('l3')
  const dateLabel = screen.getByText('클릭하여 일자를 선택하세요')
  const search = screen.getByText('검색')

  it('tests components display', () => {
    expect(container).toBeInTheDocument()
    expect(singleSelectLabel).toBeInTheDocument()
    expect(singleSelectValue).toBeInTheDocument()
    expect(multiSelectLabel).toBeInTheDocument()
    expect(multiSelectValue).toBeInTheDocument()
    expect(checkboxLabel).toBeInTheDocument()
    expect(checkboxValue).toBeInTheDocument()
    expect(radioLabel).toBeInTheDocument()
    expect(radioValue).toBeInTheDocument()
    expect(dateLabel).toBeInTheDocument()
    expect(search).toBeInTheDocument()
  })

  it('tests actions', () => {
    fireEvent.click(singleSelectValue)

    setTimeout(() => {
      const option = screen.getByText('la')

      expect(option).toBeInTheDocument()

      fireEvent.click(option)

      setTimeout(() => {
        expect(onSelectSingleSelect).toHaveBeenCalled()

        fireEvent.click(search)

        setTimeout(() => {
          expect(onSearch).toHaveBeenCalled()
        }, 100)
      }, 100)
    }, 100)
  })
})
