import { JwtTranslateMiddleware } from './jwt-translate.middleware';

describe('JwtTranslateMiddleware', () => {
  it('should be defined', () => {
    expect(new JwtTranslateMiddleware()).toBeDefined();
  });
});
