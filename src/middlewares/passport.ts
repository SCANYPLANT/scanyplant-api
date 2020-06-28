import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { User } from '../entity';
import { getRepository } from 'typeorm';

passport.use(
    'locale',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email: string, password: string, next: Function) => {
            return await getRepository(User, process.env.APP_ENV)
                .findOneOrFail({
                    select: ['uuid', 'firstName', 'email', 'password'],
                    where: { email },
                })
                .then((result: User) => {
                    if (!result.checkPassword(password)) {
                        return next('password is incorrect', undefined);
                    }
                    return next(undefined, result);
                })
                .catch(() => {
                    return next(`email not in bdd`, undefined);
                });
        },
    ),
);

passport.use(
    'JwtStrategy',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.jwtSecret as string}`,
        },
        async (jwtPayload, next: Function) => {
            await getRepository(User, process.env.APP_ENV)
                .findOneOrFail({
                    where: {
                        uuid: jwtPayload.uuid,
                        email: jwtPayload.email,
                    },
                })
                .then(result => {
                    return next(undefined, result);
                })
                .catch(() => {
                    return next('User  doesn\'t exist', undefined);
                });
        },
    ),
);
export default passport;
