import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export const ScheduleForm = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  const handleClearSelectedDateTime = () => {
    setSelectedDateTime(null)
  }

  return selectedDateTime ? (
    <ConfirmStep
      schedulingDate={selectedDateTime}
      onCancelConfirmation={handleClearSelectedDateTime}
    />
  ) : (
    <CalendarStep onSelectDateTime={setSelectedDateTime} />
  )
}
