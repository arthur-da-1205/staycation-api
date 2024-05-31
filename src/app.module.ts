import { AdminModule } from '@app/admin/admin.module';
import { UsersModule } from '@app/users/users.module';
import { GraphQL } from '@config/graphql.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from '@prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot(GraphQL),
    PrismaModule,
    UsersModule,
    AdminModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
