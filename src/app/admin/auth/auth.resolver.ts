import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminCreateDto, AdminLoginDto } from './dto/admin.dto';
import { AdminAccessToken } from './entities/admin-auth.entity';
import { AdminAuthService } from './service/auth.service';

@Resolver()
export class AdminAuthResolver {
  constructor(private readonly adminService: AdminAuthService) {}

  @Mutation(() => AdminAccessToken)
  async createAdmin(@Args('args') dto: AdminCreateDto) {
    const { user } = await this.adminService.createAdmin(dto);

    const { access_token } = await this.adminService.createToken(user);

    delete user.password;

    return { access_token, user };
  }

  @Mutation(() => AdminAccessToken)
  async adminLogin(@Args('args') dto: AdminLoginDto) {
    const user = await this.adminService.validate(dto.email, dto.password);
    const { access_token } = await this.adminService.createToken(user);

    return { access_token, user };
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
