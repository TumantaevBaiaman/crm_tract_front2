let accessToken = ''
try{
    accessToken = localStorage.getItem("access_token");
} catch (e) {
    accessToken = null;
}
export default accessToken
