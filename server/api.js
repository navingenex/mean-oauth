// server/api.js
/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

/*
|--------------------------------------
| Authentication Middleware
|--------------------------------------
*/


module.exports = function (app, config) {
    //Authentication middleware

    const jwtCheck = jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
        }),
        audience: config.AUTHO_API_AUDIENCE,
        issuer: `https://${config.AUTH0_DOMAIN}/`,
        algorithm: 'RS256'
    });
    /*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */

    //GET api root

    app.get('/api', (req, res) => {
        console.log('hello')
        res.send('API works');
    });
}