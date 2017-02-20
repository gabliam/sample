import { Bean, Config } from '@gabliam/core';
import { ConnectionOptionsBean, ConnectionOptions } from '@gabliam/typeorm';

@Config()
export class DatabaseConfig {

    @Bean(ConnectionOptionsBean)
    connectionConfig(): ConnectionOptions {
        return {
            driver: {
                type: 'sqlite',
                storage: 'photo.sqlite'
            },
            autoSchemaSync: true
        };
    }
}
