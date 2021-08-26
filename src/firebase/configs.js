
/**
 * Put web app config object for all Firebase projects
 **/
const configs = [
  {
    databaseURL: 'https://psicoclin-app.firebaseio.com',
    apiKey: 'AIzaSyBMdwuaBBw6GwGiLTebEJnFgzYQADtooiw',
    authDomain: 'psicoclin-app.firebaseapp.com',
    projectId: 'psicoclin-app',
    storageBucket: 'psicoclin-app.appspot.com',
    messagingSenderId: '169542483402',
    appId: '1:169542483402:web:9215575a7a5df39950e333',
    measurementId: 'G-56N271MYRD',

  },
  /* {
    apiKey: 'AIzaSyDemx14a-KEm_4_n520RH0y1ZBLsMvTfWg',
    authDomain: 'psicoclin.firebaeio.com',
    databaseURL: 'https://liturgiae.firebaseio.com',
    projectId: 'liturgiae',
    storageBucket: 'liturgiae.appspot.com',
    messagingSenderId: '951924116371',
    appId: '1:951924116371:web:88aae438d42146006f3666',
    measurementId: 'G-00Z2XQSJ90',
  }, */
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
