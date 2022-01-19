const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');
const {NotAuthorizedError} = require('./custom-errors');
const Usuario = require('./models/Usuario');

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false,
    },
    async (email, senha, done) => {
      try {
        const user = await Usuario.findOne({
          where: {email: email},
        });

        if (!user) {
          throw new NotAuthorizedError('E-mail e/ou senha incorretos!');
        }

        const matchingPassword = await bcrypt.compare(senha, user.senha);
        if (!matchingPassword) {
          throw new NotAuthorizedError('E-mail e/ou senha incorretos!');
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
};

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: cookieExtractor,
    },
    async (jwtPayload, done) => {
      try {
        const user = await Usuario.findByPk(jwtPayload.user.id);

        if (user) {
          done(null, jwtPayload.user);
        } else {
          throw new NotAuthorizedError('Usuário inválido');
        }
      } catch (error) {
        done(error, false);
      }
    },
  ),
);
