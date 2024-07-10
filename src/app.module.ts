import { OwnerModule } from '@app/owner/owner.module';
import { CommonModule } from '@common/common.module';
import { GraphQL } from '@config/graphql.config';
import { CloudinaryService } from '@libraries/cloudinary/cloudinary.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from '@prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { CloudinaryModule } from './libraries/cloudinary/cloudinary.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot(GraphQL),
    PrismaModule,
    OwnerModule,
    CommonModule,
    UserModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CloudinaryService],
})
export class AppModule {}
