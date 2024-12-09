export const decrementBySecond = (timeStr: string) => {
  const dayjs = useDayjs()
  console.log('???', timeStr)
  let time = dayjs.duration(timeStr) // Format assumed is "MM:SS"

  // Add one second to the duration
  time = time.substract(1, 'second')

  // Format it back to "MM:SS" (pad minutes and seconds for consistency)
  let minutes = String(time.minutes()).padStart(2, '0')
  let seconds = String(time.seconds()).padStart(2, '0')

  return `${minutes}:${seconds}`
}
