export function checkLogin() {
  const user = JSON.parse(localStorage.getItem('persist:user'));
  if (user.userId) {
    return true;
  }
  return false;
}
