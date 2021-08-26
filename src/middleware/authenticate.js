export default function ({ store, route, redirect, error }) {
  // Se o user tá logado e tentou acessar o login
  if (store.getters['account/isAuthenticated'] && route.name === 'login') {
    // Obtem a rota ?next
    const url = decodeURI(route.query.next)
    // Se next não existe
    if (!url || url === '/login') {
      // Vai para home
      return redirect('/')
    }
    // redireciona para url do ?next
    return redirect(url)
  } else
  // Se o user não tá logado e não está na página de login
  if (!store.getters['account/isAuthenticated'] && route.name !== 'login') {
    // Redireciona para o login com a url atual em ?next
    return redirect(`/login/?next=${encodeURI(route.fullPath)}`)
  }

  // Somente Admins podem gerenciar usuários
  if (route.name === 'users' &&
  store.getters['account/userRole'] !== 'Admin') {
    return error({ statusCode: 404 })
  }

  return false
}
