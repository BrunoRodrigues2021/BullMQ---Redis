class RedisConfig {

    constructor() {
        this.connection = {
            host: '127.0.0.1',
            port: 6379
        };
    }
}

module.exports = new RedisConfig();
