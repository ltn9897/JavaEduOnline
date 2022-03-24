export const login = (username, token, role) => {
    return {
        type: 'LOGIN',
        username,
        token,
        role
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}