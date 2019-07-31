var configvalue = require("../config/config.json");
module.exports = {
    getConnectionString: function() {
        return `mongodb+srv://${configvalue.username}:${configvalue.password}@cluster0-9aidu.mongodb.net/test?retryWrites=true&w=majority`;
    }
}