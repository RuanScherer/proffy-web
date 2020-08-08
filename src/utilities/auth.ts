export function getTokenData() {
    let token = localStorage.getItem("accessToken") as string
    token = token?.split('.')[1]
    return JSON.parse(atob(token))
}

export function logout() {
    localStorage.removeItem("accessToken")
    window.location.replace("/")
}