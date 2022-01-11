const PROXY_CONFIG = [
    {
        "/api/*": {
            target: "http://localhost",
            secure: false,
            pathRewrite: { "^/api": "" },
            changeOrigin: true,
        },
    },
];
module.exports = PROXY_CONFIG;
