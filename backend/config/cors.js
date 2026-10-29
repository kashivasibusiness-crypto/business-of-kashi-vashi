const { validateEnvironment, isOriginAllowed } = require('./env');

function getCorsOptions(customEnv = null) {
    const env = customEnv ? (customEnv.allowedOrigins ? customEnv : validateEnvironment(customEnv)) : validateEnvironment();
    return {
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            const isProdOrStaging = env.isProduction || env.isStaging;
            if (!isProdOrStaging || isOriginAllowed(origin, env)) {
                return callback(null, true);
            }
            return callback(new Error(`CORS policy violation: Origin '${origin}' is not in the allowed production list.`));
        },
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Trace-ID'],
        credentials: true,
        maxAge: 86400
    };
}

const corsOptions = getCorsOptions();

module.exports = {
    corsOptions,
    getCorsOptions
};
