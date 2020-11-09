const logoutButton = document.getElementById('logout-button');

if (logoutButton != null) {
  logoutButton.addEventListener('click', () => {
    logOut();
  })
}

function logOut() {
  const dt = new Date('1999-12-31T23:59:59Z');
  // クッキーの有効期限を過去の日付に変更
  document.cookie = "name=; expires=" + dt.toUTCString();
  document.cookie = "token=; expires=" + dt.toUTCString();

  // ログインページへリダイレクト
  location.href='/login';
}