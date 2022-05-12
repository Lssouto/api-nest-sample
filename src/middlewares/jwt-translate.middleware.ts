import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class JwtTranslateMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authorization = req.headers.jwt;
    if (authorization == null) next();
    const base64Payload = authorization.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    req.body.jwtPayload = JSON.parse(payloadBuffer.toString());
    next();
  }
}
