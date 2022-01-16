import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import UserModel, { User } from "../model/user.model";
import config from "config";
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    (username, password, done) => {
      UserModel.findOne(
        { username: username.toLowerCase() },
        (err: any, user: any) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(undefined, false, {
              message: `username ${username} not found.`,
            });
          }
          user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(undefined, user);
            }
            return done(undefined, false, {
              message: "Invalid username or password.",
            });
          });
        }
      );
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("jwtSecret"),
    },
    function (jwtToken, done) {
      UserModel.findOne(
        { email: jwtToken.email },
        function (err: any, user: Partial<User>) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(undefined, user, jwtToken);
          } else {
            return done(undefined, false);
          }
        }
      );
    }
  )
);

export const authenticateJWT = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate("jwt", function (err, user, info) {
    if (err) {
      console.log(err);
      return res.status(401).json({ status: "error", code: "unauthorized" });
    }
    if (!user) {
      return res.status(401).json({ status: "error", code: "unauthorized" });
    } else {
      res.locals.user = user;
      return next();
    }
  })(req, res, next);
};
