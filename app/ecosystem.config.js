'use strict';
/**
 * # Start all applications
 * pm2 start ecosystem.config.js --env { local | developer | production }
 * 
 * # Stop all
 * pm2 stop ecosystem.config.js
 * 
 * # Restart all
 * pm2 restart ecosystem.config.js
 * 
 * # Reload all
 * pm2 reload ecosystem.config.js
 * 
 * # Delete all
 * pm2 delete ecosystem.config.js
 */
module.exports = {
    apps: [
        {
            name: "Node Redis Client Server",
            script: "./dist/index.js",
            wathch: true,
            env_local: {
               "NODE_MODE" : "local" 
            },
            env_developer: {
               "NODE_MODE" : "developer" 
            },
            env_production: {
               "NODE_MODE" : "production" 
            }
        }
    ]
}