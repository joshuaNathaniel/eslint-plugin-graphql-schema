const requireIndex = require('requireindex');
const rules = requireIndex(__dirname + '/../rules');

module.exports = {
    preprocess: function (text) {
        return [text];
    },
    postprocess: function (messages) {
        return messages.filter(message =>
            Object.keys(rules).map(key => `graphql-schema/${key}`).includes(message.ruleId)
        );
    }
};
