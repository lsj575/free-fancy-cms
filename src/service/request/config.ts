let BASE_URL = 'http://114.132.199.181:8081'
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://114.132.199.181:8081'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = ''
} else {
  BASE_URL = ''
}

export { BASE_URL, TIME_OUT }
