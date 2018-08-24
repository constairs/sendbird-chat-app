export function checkLogin() {
  const user = JSON.parse(localStorage.getItem('persist:user'));
  if (user && user.logged === 'true') {
    return true;
  }
  return false;
}
