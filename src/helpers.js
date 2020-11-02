import {
  MINUTE_MS,
  MINUTE_S,
  SECOND_MS,
} from './constants'

export function getTimerSeconds(ms) {
  const seconds = Math.floor(ms / SECOND_MS) % MINUTE_S

  return (
    ('0' + seconds).slice(-2)
  );
}

export function getTimerMinutes(ms) {
  const minutes = Math.floor(ms / MINUTE_MS) % MINUTE_S
  
  return (
    ('0' + minutes).slice(-2)
  );
}