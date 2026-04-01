import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { AgentsModule } from './modules/agents/agents.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { ModelsModule } from './modules/models/models.module';
import { ResearchModule } from './modules/research/research.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (configuration: ConfigType<typeof databaseConfig>) => ({
        uri: configuration.uri,
      }),
    }),
    AuthModule,
    ModelsModule,
    ChatModule,
    AgentsModule,
    ResearchModule,
  ],
})
export class AppModule {}
