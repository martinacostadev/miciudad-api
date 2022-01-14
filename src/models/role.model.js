const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'The role is required']
    }
});

module.exports = mongoose.model('Role', RoleSchema);