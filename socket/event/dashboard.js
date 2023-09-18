module.exports = {
    name:"dashboard/refreshUsers",
    execute: (ws, data) => {
        return JSON.stringify({name:"refresh/usersTable"})
    }
}