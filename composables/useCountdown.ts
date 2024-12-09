export const useCountdown = () => {
  const decrementTime = (timeString: string, onComplete = () => {}) => {
    // Split the time string into minutes and seconds
    const [minutes, seconds] = timeString.split(':').map(Number)

    // Calculate total seconds
    let totalSeconds = minutes * 60 + seconds

    // Decrement
    if (totalSeconds > 0) {
      totalSeconds -= 1
    }

    // Check if time has reached zero
    if (totalSeconds === 0) {
      onComplete()
    }

    // Convert back to mm:ss format
    const newMinutes = Math.floor(totalSeconds / 60)
    const newSeconds = totalSeconds % 60

    // Pad with leading zeros
    return `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`
  }

  return { decrementTime }
}
