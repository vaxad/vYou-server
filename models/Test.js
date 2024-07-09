import { Schema } from 'mongoose'
import user from './User.js'

const Admin = user.discriminator("Admin", new Schema({
    powers: [
        "DELETE",
        "UPDATE",
        "CREATE"
    ]
}))

export default Admin