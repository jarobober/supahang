export const DEFAULT_TIMERS = {
  maxHangs: {
    repTime: '00:10',
    restTime: '00:10',
    repsNumber: 5,
  },
  repeaters: {
    repTime: '00:05',
    restTime: 5,
    repsNumber: 6,
  },
  custom: {
    repTime: '00:20',
    restTime: 30,
    repsNumber: 10,
  },
}

export const SESSION_TYPES = [
  {
    title: 'Max hangs',
    subtitle: '10 sec hangs, 3 min rest. Build maximum strength.',
    icon: 'i-heroicons-light-bulb',
    timer: DEFAULT_TIMERS.maxHangs,
  },
  {
    title: 'Repeaters',
    subtitle: '7 sec on, 3 sec off. Boost endurance.',
    icon: 'i-heroicons-light-bulb',
    timer: DEFAULT_TIMERS.repeaters,
  },
  {
    title: 'Custom',
    subtitle: 'Set your own times and intervals.',
    icon: 'i-heroicons-light-bulb',
    timer: DEFAULT_TIMERS.custom,
  },
]
