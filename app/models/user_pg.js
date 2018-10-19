var userSchema = {
    local: {
        email: null,
        password: null
    },
    facebook: {
        id: null,
        token: null,
        name: null,
        email: null
    },
    twitter: {
        id: null,
        token: null,
        displayName: null,
        username: null
    },
    google: {
        id: null,
        token: null,
        email: null,
        name: null
    }
}

module.exports = userSchema