import { Bean, Config } from '@gabliam/core';
import { DriverOptions } from '@gabliam/typeorm';

@Config()
export class DatabaseConfig {

    @Bean('DriverOptions')
    testBean(): DriverOptions {
        return {
            type: 'sqlite',
            storage: 'photo.sqlite'
        };
    }
}
