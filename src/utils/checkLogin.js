export function checkLogin() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.userId) {
    return user;
  }
  return false;
}
