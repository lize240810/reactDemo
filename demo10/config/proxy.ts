export default {
    dev: {
        '/api/': {
            // 要代理的地址
            target: 'https://proapi.azurewebsites.net',
            changeOrigin: true,
        },
        '/test/': {
            // 要代理的地址
            target: 'http://localhost:1337',
            changeOrigin: true,
            pathRewrite: { '^/test': '/api' },
        },
    }
};
