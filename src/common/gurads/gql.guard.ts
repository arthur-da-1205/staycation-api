import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { TokenException } from '../exceptions/token.exception';

function getRequest(context: ExecutionContext) {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleRequest(err, user, info, context, status) {
  if (err || !user) {
    throw err || new TokenException(info.message || 'Invalid token!');
  }

  if (user.isBlocked) {
    throw new TokenException('Invalid user account, please contact support!');
  }

  return user;
}

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest = getRequest;
  handleRequest = handleRequest;
}

@Injectable()
export class GqlAuthSellerGuard extends AuthGuard('jwt-seller') {
  getRequest = getRequest;
  handleRequest = handleRequest;
}

@Injectable()
export class GqlAuthSalesmanGuard extends AuthGuard('jwt-salesman') {
  getRequest = getRequest;
  handleRequest = handleRequest;
}

@Injectable()
export class GqlAuthOwnerGuard extends AuthGuard('jwt-owner') {
  getRequest = getRequest;
  handleRequest = handleRequest;
}
