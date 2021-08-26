export const API_URL = (() => {
  // Production
  if (process.env.NODE_ENV === 'production') {
    return 'https://run-api.liturgiae.com/'
  }

  // Localhost
  if (process.env.LOCAL_API) {
    console.warn('>>>> Unsing local API <<<<')
    return 'http://localhost:8080/'
  }

  // Remote dev
  console.warn('>>>> Unsing remote dev API<<<<')
  return 'http://localhost:8080/'
})()
