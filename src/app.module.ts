import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [FilesService],
})
export class AppModule {}
