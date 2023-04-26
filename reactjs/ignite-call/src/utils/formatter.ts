export const Formatter = {
  /**
   * Formats a number representing a day of the week to its corresponding name
   * of the day of the week in the default language of the user's browser.
   *
   * @param day - A number between 0 and 6, where 0 is Sunday and 6 is Saturday.
   *
   * @returns A string representing the weekday name.
   */
  weekdayName: function (day: number) {
    const date = new Date()
    date.setDate(day - date.getDate())

    const weekdayName = new Intl.DateTimeFormat(undefined, {
      weekday: 'long',
    }).format(date)

    return weekdayName.slice(0, 1).toUpperCase().concat(weekdayName.slice(1))
  },
}
