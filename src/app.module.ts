import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/module';
import { UserModule } from './user/module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RoleModule } from './role/module';
import { UserAssociationModule } from './user-association/module';
import { UserRoleModule } from './user-role/module';
import { RolesGuard } from './role/role.guard';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ProfileModule } from './profile/module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    DatabaseModule,
    UserModule,
    AuthModule,
    JwtModule,
    RoleModule,
    UserAssociationModule,
    UserRoleModule,
    ProfileModule,
    UserAssociationModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
