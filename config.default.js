
var okanjo = require('okanjo');

module.exports = exports = {
    marketplace: {
        api: {
            key: 'YOUR_API_KEY',
            passPhrase: 'YOUR_API_PASSPHRASE',
            endpoint: 'sandbox-api.okanjo.com'
        },
        user: {
            action: okanjo.constants.marketplace.loginAction.loginEmailPassword,
            email: 'STORE_USER_EMAIL',
            password: 'STORE_USER_PASSWORD'
        }
    },

    ads: {
        api: {
            key: 'YOUR_API_KEY',
            secret: 'YOUR_API_PASSPHRASE',
            marketplace_id: 'YOUR_MARKETPLACE_ID'
        }
    }

};