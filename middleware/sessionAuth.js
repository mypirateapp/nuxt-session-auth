export default ({ req, $auth }) => {
  if (!req || !$auth) {
    return
  }

  $auth.$state.loggedIn = req.isAuthenticated()
}
