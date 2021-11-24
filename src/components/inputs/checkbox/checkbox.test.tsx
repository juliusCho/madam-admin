import { fireEvent, render, screen } from '@testing-library/react'
import Checkbox from './checkbox.component'

describe('checkbox input test', () => {
  it('display parts', () => {
    const onSelect = jest.fn()

    render(
      <Checkbox
        options={[
          { value: 'Y', label: 'Y' },
          { value: 'N', label: 'N' },
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

    const checks = screen.getAllByTestId('components.inputs.checkbox.icon')

    expect(checks.length).toBe(3)
    checks.forEach((radio) => {
      expect(radio.classList.contains('xi-checkbox-blank')).toBeTruthy()
    })

    fireEvent.click(checks[1])

    setTimeout(() => {
      expect(onSelect).toHaveBeenCalled()
    }, 100)
  })

  it('display parts when all checked', () => {
    render(
      <Checkbox
        options={[
          { value: 'Y', label: 'Y' },
          { value: 'N', label: 'N' },
        ]}
        onSelect={jest.fn()}
        value={['Y', 'N']}
      />,
    )

    const checks = screen.getAllByTestId('components.inputs.checkbox.icon')

    expect(checks[0].classList.contains('xi-check-square-o')).toBeTruthy()
  })
})
