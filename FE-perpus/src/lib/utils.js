import { DateFormatter } from '@internationalized/date'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatDateTime = (date, hours = 0, minutes = 0, seconds = 0) => {
  const pad = (num) => String(num).padStart(2, '0')
  const year = date.year
  const month = pad(date.month)
  const day = pad(date.day)
  const hour = pad(hours)
  const minute = pad(minutes)
  const second = pad(seconds)
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export const df = new DateFormatter('en-US', {
  dateStyle: 'long'
})
