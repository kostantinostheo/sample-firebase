export function logout () {

    if (localStorage.getItem('role') !== null || localStorage.getItem('email') !== null) {
        localStorage.removeItem('role')
        localStorage.getItem('email')
        window.location.href = '/'
    }
}