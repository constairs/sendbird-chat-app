export function checkLogin() {
  const user = JSON.parse(localStorage.getItem('persist:user'));
  console.log(user.userName);
  if (user.userId) {
    return user;
  }
  return false;
}
