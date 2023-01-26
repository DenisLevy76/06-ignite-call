// import { Container } from './styles'

import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '../../utils/getWeekOfDays'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

const weekDays = getWeekDays(true)

export const Calendar: React.FC = () => {
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          Setembro <span>2022</span>
        </CalendarTitle>
        <CalendarActions>
          <button>
            <CaretLeft size={24} />
          </button>
          <button>
            <CaretRight size={24} />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {weekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay.toUpperCase()}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay disabled>4</CalendarDay>
            </td>
            <td>
              <CalendarDay>5</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>6</CalendarDay>
            </td>
            <td>
              <CalendarDay>7</CalendarDay>
            </td>
            <td>
              <CalendarDay>8</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>9</CalendarDay>
            </td>
            <td>
              <CalendarDay>10</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay disabled>14</CalendarDay>
            </td>
            <td>
              <CalendarDay>15</CalendarDay>
            </td>
            <td>
              <CalendarDay>16</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>17</CalendarDay>
            </td>
            <td>
              <CalendarDay>18</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>19</CalendarDay>
            </td>
            <td>
              <CalendarDay>10</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay disabled>24</CalendarDay>
            </td>
            <td>
              <CalendarDay>25</CalendarDay>
            </td>
            <td>
              <CalendarDay>26</CalendarDay>
            </td>
            <td>
              <CalendarDay>27</CalendarDay>
            </td>
            <td>
              <CalendarDay>28</CalendarDay>
            </td>
            <td>
              <CalendarDay>29</CalendarDay>
            </td>
            <td></td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
