import { fireEvent, render, screen } from '@testing-library/react'
import moment from 'moment'
import GridSearchItem from './grid-search-item.component'

describe('Component GridSearchItem', () => {
  it('dropdown single select item component parts', () => {
    const onSelect = jest.fn()

    render(
      <GridSearchItem
        type="single-select"
        label="유형"
        width="5rem"
        options={[
          {
            value: '1',
            label: '옵션1',
          },
          {
            value: '2',
            label: '옵션2',
          },
        ]}
        onSelect={onSelect}
      />,
    )

    const label = screen.getByText('유형')
    const select = screen.getByText('전체')

    expect(label).toBeInTheDocument()
    expect(select).toBeInTheDocument()

    fireEvent.click(select)

    setTimeout(() => {
      const all = screen.getAllByText('전체')[1]
      const option1 = screen.getByText('옵션1')
      const option2 = screen.getByText('옵션2')

      expect(all).toBeInTheDocument()
      expect(option1).toBeInTheDocument()
      expect(option2).toBeInTheDocument()
      expect(all.style.backgroundColor).not.toBe('#FFF')
      expect(option1.style.backgroundColor).toBe('#FFF')
      expect(option2.style.backgroundColor).toBe('#FFF')

      fireEvent.click(option1)

      setTimeout(() => {
        expect(onSelect).toHaveBeenCalled()
      }, 100)
    }, 100)
  })

  it('dropdown multi select item component parts', () => {
    const onSelect = jest.fn()

    render(
      <GridSearchItem
        type="multi-select"
        label="유형"
        width="5rem"
        options={[
          {
            value: '1',
            label: '옵션1',
          },
          {
            value: '2',
            label: '옵션2',
          },
        ]}
        value={['1']}
        onSelect={onSelect}
      />,
    )

    const select = screen.getByText('옵션1')
    const axe = screen.getByTestId('components.inputs.grid-search-item.axe')

    expect(select).toBeInTheDocument()
    expect(axe).toBeInTheDocument()

    fireEvent.click(select)

    setTimeout(() => {
      const all = screen.getByText('전체')
      const option1 = screen.getAllByText('옵션1')[1]
      const option2 = screen.getByText('옵션2')

      expect(all).toBeInTheDocument()
      expect(option1).toBeInTheDocument()
      expect(option2).toBeInTheDocument()
      expect(all.style.backgroundColor).toBe('#FFF')
      expect(option1.style.backgroundColor).toBe('#FFF')
      expect(option2.style.backgroundColor).not.toBe('#FFF')

      fireEvent.click(option1)

      setTimeout(() => {
        expect(onSelect).toHaveBeenCalled()

        fireEvent.click(axe)

        setTimeout(() => {
          expect(onSelect).toHaveBeenCalledTimes(2)
        }, 100)
      }, 100)
    }, 100)
  })

  it('radio select item component parts', () => {
    const onSelect = jest.fn()

    render(
      <GridSearchItem
        type="radio"
        label="유형"
        width="5rem"
        options={[
          {
            value: '1',
            label: '옵션1',
          },
          {
            value: '2',
            label: '옵션2',
          },
        ]}
        value="1"
        onSelect={onSelect}
      />,
    )

    const all = screen.getByText('전체')
    const option1 = screen.getByText('옵션1')
    const option2 = screen.getByText('옵션2')
    const radios = screen.getAllByTestId('components.inputs.radio.icon')

    expect(all).toBeInTheDocument()
    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
    expect(radios.length).toBe(3)
    expect(radios[0].classList.contains('xi-radiobox-blank')).toBeTruthy()
    expect(radios[1].classList.contains('xi-radiobox-checked')).toBeTruthy()
    expect(radios[2].classList.contains('xi-radiobox-blank')).toBeTruthy()

    fireEvent.click(radios[0])

    setTimeout(() => {
      expect(onSelect).toHaveBeenCalled()
    }, 100)
  })

  it('checkbox select item component parts', () => {
    const onSelect = jest.fn()

    render(
      <GridSearchItem
        type="checkbox"
        label="유형"
        width="5rem"
        options={[
          {
            value: '1',
            label: '옵션1',
          },
          {
            value: '2',
            label: '옵션2',
          },
        ]}
        value={['1']}
        onSelect={onSelect}
      />,
    )

    const all = screen.getByText('전체')
    const option1 = screen.getByText('옵션1')
    const option2 = screen.getByText('옵션2')
    const checks = screen.getAllByTestId('components.inputs.checkbox.icon')

    expect(all).toBeInTheDocument()
    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
    expect(checks.length).toBe(3)
    expect(checks[0].classList.contains('xi-checkbox-blank')).toBeTruthy()
    expect(checks[1].classList.contains('xi-check-square-o')).toBeTruthy()
    expect(checks[2].classList.contains('xi-checkbox-blank')).toBeTruthy()

    fireEvent.click(checks[0])

    setTimeout(() => {
      expect(onSelect).toHaveBeenCalled()
    }, 100)
  })

  it('date item component parts', () => {
    const start = moment().add(-7, 'days')
    const end = moment()

    render(
      <GridSearchItem
        type="date"
        label="유형"
        width="5rem"
        value={[start.toDate(), end.toDate()]}
        onSelect={jest.fn()}
      />,
    )

    const inputStart = screen.getByText(start.format('YYYY-MM-DD'))
    const inputEnd = screen.getByText(end.format('YYYY-MM-DD'))
    const wave = screen.getByText('~')

    expect(inputStart).toBeInTheDocument()
    expect(inputEnd).toBeInTheDocument()
    expect(wave).toBeInTheDocument()

    fireEvent.click(inputStart)

    setTimeout(() => {
      const calContainer = screen.getByTestId('calendarPeriod.container')
      const calExterior = screen.getByTestId('calendarPeriod.exterior')

      expect(calContainer).toBeInTheDocument()
      expect(calExterior).toBeInTheDocument()

      fireEvent.click(calExterior)

      setTimeout(() => {
        fireEvent.click(inputEnd)

        setTimeout(() => {
          const newCalContainer = screen.getByTestId('calendarPeriod.container')
          const newCalExterior = screen.getByTestId('calendarPeriod.exterior')

          expect(newCalContainer).toBeInTheDocument()
          expect(newCalExterior).toBeInTheDocument()
        }, 400)
      }, 400)
    }, 400)
  })
})
