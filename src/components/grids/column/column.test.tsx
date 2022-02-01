import { fireEvent, render, screen } from '@testing-library/react'
import moment from 'moment'
import Swal from 'sweetalert2'
import GridColumn from './column.component'

const fire = jest.spyOn(Swal, 'fire')

describe('Components GridColumn 테스트', () => {
  it('일반 타입의 구성요소를 검사한다', () => {
    render(<GridColumn>일반</GridColumn>)

    setTimeout(() => {
      const label = screen.getByText('일반')

      expect(label).toBeInTheDocument()
      expect(label.classList.contains('bg-mono-white')).toBeTruthy()
      expect(label.classList.contains('text-mono-black')).toBeTruthy()
      expect(label.classList.contains('text-textMedium')).toBeTruthy()
      expect(label.classList.contains('font-textMedium')).toBeTruthy()
      expect(label.classList.contains('border')).toBeTruthy()
      expect(label.classList.contains('border-solid')).toBeTruthy()
      expect(label.classList.contains('border-mono-black')).toBeTruthy()
    }, 100)
  })

  describe('text 입력 타입', () => {
    let text = '일반'
    const onChange = jest.fn((newText: string) => {
      text = newText
    })

    render(
      <GridColumn type="text" onChange={onChange} nullable={false}>
        {text}
      </GridColumn>,
    )

    setTimeout(() => {
      const label = screen.getByText('일반')

      it('onChange 이벤트와 삭제 아이콘 및 이벤트를 검사한다', () => {
        fireEvent.click(label)

        setTimeout(() => {
          const input = screen.getByTestId('components.grids.column.input')
          const clear = screen.getByTestId('components.grids.column.clear')
          expect(input).toBeInTheDocument()
          expect(clear).toBeInTheDocument()
          expect(input).toHaveFocus()

          fireEvent.change(input, { target: { value: '변경' } })

          setTimeout(() => {
            const newLabel = screen.getByText('변경')
            expect(newLabel).toBeInTheDocument()

            fireEvent.blur(input)

            setTimeout(() => {
              expect(onChange).toHaveBeenCalled()
              expect(text).toBe(newLabel.nodeValue)
              expect(input).not.toHaveFocus()

              fireEvent.focus(input)

              setTimeout(() => {
                expect(input).toHaveFocus()

                fireEvent.click(clear)

                setTimeout(() => {
                  expect(input).toBe('')

                  fireEvent.blur(input)

                  setTimeout(() => {
                    expect(fire).toHaveBeenCalled()
                    expect(input).toHaveFocus()
                    expect(onChange).not.toHaveBeenCalledTimes(2)
                    expect(text).toBe(newLabel.nodeValue)
                  }, 100)
                }, 100)
              }, 100)
            }, 100)
          }, 100)
        }, 100)
      })
    }, 100)
  })

  describe('체크 타입', () => {
    let checked = false
    const onChange = jest.fn(() => {
      checked = !checked
    })

    const { getByTestId } = render(<GridColumn onChange={onChange} />)

    setTimeout(() => {
      const container = getByTestId('components.grids.columns.container')
      const checkbox = getByTestId('components.grids.columns.checkbox')

      it('구성요소를 검사한다', () => {
        expect(container).toBeInTheDocument()
        expect(container.classList.contains('bg-mono-white')).toBeTruthy()
        expect(container.classList.contains('border')).toBeTruthy()
        expect(container.classList.contains('border-solid')).toBeTruthy()
        expect(container.classList.contains('border-mono-black')).toBeTruthy()
        expect(checkbox).toBeInTheDocument()
        expect(checkbox.classList.contains('xi-checkbox-blank')).toBeTruthy()
        expect(checkbox.classList.contains('bg-mono-white')).toBeTruthy()
        expect(checkbox.classList.contains('text-mono-black')).toBeTruthy()
      })

      it('클릭이벤트를 검사한다', () => {
        fireEvent.click(container)

        setTimeout(() => {
          expect(onChange).toHaveBeenCalled()

          expect(checked).toBeTruthy()

          const newCheckbox = getByTestId('components.grids.column.checkbox')

          expect(
            newCheckbox.classList.contains('xi-check-square-o'),
          ).toBeTruthy()
        }, 100)
      })
    }, 100)
  })

  describe('number 입력 타입', () => {
    let text = 1
    const onChange = jest.fn((newText: number) => {
      text = newText
    })

    render(
      <GridColumn type="number" onChange={onChange}>
        {text}
      </GridColumn>,
    )

    setTimeout(() => {
      const label = screen.getByText('1')

      it('input element의 속성을 검사한다', () => {
        expect(label).toHaveAttribute('type', 'number')
      })
    }, 100)
  })

  describe('number 입력 타입', () => {
    let text = 1
    const onChange = jest.fn((newText: number) => {
      text = newText
    })

    render(
      <GridColumn type="number" onChange={onChange}>
        {text}
      </GridColumn>,
    )

    setTimeout(() => {
      const label = screen.getByText('1')

      it('input element의 속성을 검사한다', () => {
        expect(label).toHaveAttribute('type', 'number')
      })
    }, 100)
  })

  describe('single select 입력 타입', () => {
    let text = '1'
    const onChange = jest.fn((newText: string) => {
      text = newText
    })

    render(
      <GridColumn
        type="single-select"
        options={[
          { value: '1', label: '옵션1' },
          { value: '2', label: '옵션2' },
          { value: '3', label: '옵션3' },
        ]}
        onChange={onChange}>
        {text}
      </GridColumn>,
    )

    setTimeout(() => {
      const label = screen.getByText('옵션1')

      it('구성요소를 검사한다', () => {
        expect(label).toBeInTheDocument()

        fireEvent.click(label)

        setTimeout(() => {
          const option1 = screen.getAllByText('옵션1')[1]
          const option2 = screen.getByText('옵션2')
          const option3 = screen.getByText('옵션3')

          expect(option1).toBeInTheDocument()
          expect(option2).toBeInTheDocument()
          expect(option3).toBeInTheDocument()

          fireEvent.click(option2)

          setTimeout(() => {
            const newLabel = screen.getByText('옵션2')
            expect(newLabel).toBeInTheDocument()
            expect(onChange).toHaveBeenCalled()
            expect(text).toBe(newLabel.nodeValue)
          }, 100)
        }, 100)
      })
    }, 100)
  })

  describe('multi select 입력 타입', () => {
    let text: string[] = ['1']
    const onChange = jest.fn((newText: string[]) => {
      text = newText
    })

    render(
      <GridColumn
        type="multi-select"
        options={[
          { value: '1', label: '옵션1' },
          { value: '2', label: '옵션2' },
          { value: '3', label: '옵션3' },
        ]}
        onChange={onChange}>
        {text}
      </GridColumn>,
    )

    setTimeout(() => {
      const label = screen.getByText('옵션1')

      it('구성요소를 검사한다', () => {
        expect(label).toBeInTheDocument()

        fireEvent.click(label)

        setTimeout(() => {
          const option1 = screen.getAllByText('옵션1')[1]
          const option2 = screen.getByText('옵션2')
          const option3 = screen.getByText('옵션3')

          expect(option1).toBeInTheDocument()
          expect(option2).toBeInTheDocument()
          expect(option3).toBeInTheDocument()

          fireEvent.click(option2)

          setTimeout(() => {
            const newLabel = screen.getByText('옵션1,옵션2')
            expect(newLabel).toBeInTheDocument()
            expect(onChange).toHaveBeenCalled()
            expect(text.join(',')).toBe(newLabel.nodeValue)
          }, 100)
        }, 100)
      })
    }, 100)
  })

  describe('date 입력 타입', () => {
    let text = new Date()
    const onChange = jest.fn((newText: Date) => {
      text = newText
    })

    render(
      <GridColumn type="date" format="YYYY-MM-DD" onChange={onChange}>
        {text}
      </GridColumn>,
    )

    setTimeout(() => {
      const label = screen.getByText(moment(text).format('YYYY-MM-DD'))

      it('구성요소를 검사한다', () => {
        expect(label).toBeInTheDocument()

        fireEvent.click(label)

        setTimeout(() => {
          const modal = screen.getByTestId('calendarPeriod.exterior')
          expect(modal).toBeInTheDocument()
        }, 100)
      })
    }, 100)
  })
})
