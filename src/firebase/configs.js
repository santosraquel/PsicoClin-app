
/**
 * Put web app config object for all Firebase projects
 **/
const configs = [
  {
    databaseURL: 'https://psicoclin.firebaseio.com',
    apiKey: 'AIzaSyBMdwuaBBw6GwGiLTebEJnFgzYQADtooiw',
    authDomain: 'psicoclin-app.firebaseapp.com',
    projectId: 'psicoclin-app',
    storageBucket: 'psicoclin-app.appspot.com',
    messagingSenderId: '169542483402',
    appId: '1:169542483402:web:9215575a7a5df39950e333',
    measurementId: 'G-56N271MYRD',
  },
  {
    databaseURL: 'https://psicoclin.firebaseio.com',
    apiKey: 'AIzaSyBMdwuaBBw6GwGiLTebEJnFgzYQADtooiw',
    authDomain: 'psicoclin-app.firebaseapp.com',
    projectId: 'psicoclin-app',
    storageBucket: 'psicoclin-app.appspot.com',
    messagingSenderId: '169542483402',
    appId: '1:169542483402:web:9215575a7a5df39950e333',
    measurementId: 'G-56N271MYRD',
  },
]

/**
 * Mount envs object map
 * envs.<projectId>
 */
const envs = {}
configs.forEach((config) => {
  envs[config.projectId] = config
})

export function getFirebaseConfig () {
  // GET ProjectId from build env
  try {
    const projectId = process.env.projectId.trim()
    return envs[projectId]
  } catch (err) {
    console.error(err)
    console.warn('>>> Erro to identify firebase config, first was loaded.')
    return configs[0]
  }
}

export function getProjectId () {
  return getFirebaseConfig().projectId
}
