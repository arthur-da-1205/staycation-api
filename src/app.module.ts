import { OwnerModule } from '@app/owner/owner.module';
import { UsersModule } from '@app/users/users.module';
import { CommonModule } from '@common/common.module';
import { GraphQL } from '@config/graphql.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from '@prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot(GraphQL),
    PrismaModule,
    OwnerModule,
    UsersModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
