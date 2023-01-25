import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Calendar } from '../../../../../components/Calendar'
import { api } from '../../../../../lib/axios'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

interface Availability {
  possibleTimes: number[];
  availableTimes: number[];
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void;
}

export const CalendarStep = ({ onSelectDateTime }: CalendarStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekDay = selectedDate && dayjs(selectedDate).format('dddd')
  const describedDate =
    selectedDate && dayjs(selectedDate).format('DD[ de ]MMMM')

  const selectedDateWithoutTime =
    selectedDate && dayjs(selectedDate).format('YYYY-MM-DD')

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const { data } = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return data
    },
    {
      enabled: !!isDateSelected,
    }
  )

  const handleSelectTime = (hour: number) => {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              const formattedHour = String(hour).padStart(2, '0')
              const disabled = !availability?.availableTimes.includes(hour)
              return (
                <TimePickerItem
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  disabled={disabled}
                >{`${formattedHour}:00h`}</TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
