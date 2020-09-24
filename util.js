module.exports = {
    async isUndefinedOrNull(content) {
        if(content == undefined || content == null) {
            return new Error('The content is undefined or null!')
        }
    }
}