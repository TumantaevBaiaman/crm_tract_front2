export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem("access_token"))

  if (obj && obj.accessToken) {
    return { Authorization: obj.accessToken }
  } else {
    return {}
  }
}
