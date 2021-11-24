import { fireEvent, render, screen } from '@testing-library/react'
import Radio from './radio.component'

describe('radio input test', () => {
  it('display parts', () => {
    const onSelect = jest.fn()

    render(
      <Radio
        options={[
          { value: true, label: 'Y' },
          { value: false, label: 'N' },
        ]}
        onSelect={onSelect}
      />,
    )

    const all = screen.getByText('전체')
    const y = screen.getByText('Y')
    const n = screen.getByText('N')

    expect(all).toBeInTheDocument()
    expect(y).toBeInTheDocument()
    expect(n).toBeInTheDocument()

    const radios = screen.getAllByTestId('components.inputs.radio.icon')

    expect(radios.length).toBe(3)
    expect(radios[0].classList.contains('xi-radiobox-checked')).toBeTruthy()
    expect(radios[1].classList.contains('xi-radiobox-blank')).toBeTruthy()
    expect(radios[2].classList.contains('xi-radiobox-blank')).toBeTruthy()

    fireEvent.click(radios[1])

    setTimeout(() => {
      expect(onSelect).toHaveBeenCalled()
    }, 100)
  })
})
