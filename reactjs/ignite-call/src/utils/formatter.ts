import dayjs from 'dayjs'

export const Formatter = {
  /**
   * Formats a number representing a day of the week to its corresponding name
   * of the day of the week in the default language of the user's browser.
   *
   * @param {number} day - A number between 0 and 6, where 0 is Sunday and 6 is Saturday.
   * @param {boolean} short - A boolean indicating whether the name should be in short format.
   *
   * @returns {string} A string representing the weekday name.
   */
  weekdayName: function (day: number, short: boolean = false): string {
    const date = dayjs().startOf('week').set('day', day)

    const weekdayName = date.format(short ? 'ddd[.]' : 'dddd')

    return weekdayName.slice(0, 1).toUpperCase().concat(weekdayName.slice(1))
  },

  /**
   * Converts a time string in the format HH:MM to minutes.
   *
   * @param {string} calendarTime - The time string to convert.
   * @returns {number} The time in minutes.
   *
   */
  calendarTimeToMinutes: function (calendarTime: string): number {
    const [hours, minutes] = calendarTime.split(':')
    return Number(hours) * 60 + Number(minutes)
  },
}
