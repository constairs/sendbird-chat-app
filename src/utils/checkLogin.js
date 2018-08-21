export function checkLogin() {
  const user = JSON.parse(localStorage.getItem('persist:user'));
  if (user && user.userId) {
    return true;
  }
  return false;
}
