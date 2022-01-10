var environments = {};
environments.heroku = {
    'databaseName': process.env.DATABASE_NAME_HEROKU,
    'databaseUser': process.env.DATABASE_USER_HEROKU,
    'databasePassword': process.env.DATABASE_PASSWORD_HEROKU,
    'databaseHost': process.env.DATABASE_HOST_HEROKU,
    'databasePort': process.env.DATABASE_PORT_HEROKU,
    'envName': 'heroku'
};
environments.development = {
    'databaseName': process.env.DATABASE_NAME,
    'databaseUser': process.env.DATABASE_USER,
    'databasePassword': process.env.DATABASE_PASSWORD,
    'databaseHost': process.env.DATABASE_HOST,
    'databasePort': process.env.DATABASE_PORT,
    'envName': 'development'
};
environments.production = {
    'port': 8000,
    'envName': 'production'
}

var currentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : '';
var environmentToExport = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.development;
module.exports = environmentToExport;