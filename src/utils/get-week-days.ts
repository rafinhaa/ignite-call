/* eslint-disable prettier/prettier */

type GetWeekDays = ( { short }?: { short?: boolean}) => string[]

export const getWeekDays: GetWeekDays = ({ short = false } = {}) => {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
  })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      return short
        ? weekDay.slice(0, 3).toLocaleUpperCase()
        : weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    })
}
