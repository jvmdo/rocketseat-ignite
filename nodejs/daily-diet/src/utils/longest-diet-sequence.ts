interface IDiet {
  diet: boolean
  created_at: string
}

export function longestDietSequence(dietArray: IDiet[]) {
  const sequenceIndexes = dietArray.reduce(
    (tracker, { diet }, i) => {
      if (diet) {
        if (tracker.currentStart === -1) {
          tracker.currentStart = tracker.currentEnd = i
        } else {
          tracker.currentEnd = i
        }
      } else {
        if (tracker.currentStart !== -1) {
          if (
            tracker.currentEnd - tracker.currentStart >=
            tracker.end - tracker.start
          ) {
            tracker.start = tracker.currentStart
            tracker.end = tracker.currentEnd
          }

          tracker.currentStart = -1
          tracker.currentEnd = -1
        }
      }

      // Check if the last sequence is the largest one.
      if (
        tracker.currentStart !== -1 &&
        tracker.currentEnd - tracker.currentStart >= tracker.end - tracker.start
      ) {
        tracker.start = tracker.currentStart
        tracker.end = tracker.currentEnd
      }

      return tracker
    },
    {
      currentStart: -1,
      currentEnd: -1,
      start: -1,
      end: -1,
    },
  )

  const sequence = dietArray.slice(
    sequenceIndexes.start,
    sequenceIndexes.end + 1,
  )

  return {
    sequence: sequence.length,
    startDate: sequence.at(0)?.created_at,
    endDate: sequence.at(-1)?.created_at,
  }
}
