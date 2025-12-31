import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { prisma } from '../../../database/client';
import { logger } from '../utils/logger';

// Serialize user for the session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'your_google_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret',
      callbackURL: '/api/auth/google/callback',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const googleId = profile.id;
        const name = profile.displayName;
        const avatar = profile.photos?.[0]?.value;

        if (!email) {
          return done(new Error('No email found in Google profile'), undefined);
        }

        // Check if user exists
        let user = await prisma.user.findFirst({
          where: {
            OR: [{ googleId }, { email }],
          },
        });

        if (user) {
          // Update googleId if not present (linking account)
          if (!user.googleId) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { googleId, avatar: user.avatar || avatar },
            });
          }
          return done(null, user);
        }

        // Create new user
        user = await prisma.user.create({
          data: {
            email,
            name,
            googleId,
            avatar,
            role: 'USER', // Default role
          },
        });

        return done(null, user);
      } catch (error) {
        logger.error('Google Auth Error:', error);
        return done(error, undefined);
      }
    }
  )
);

// Twitter Strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY || 'your_twitter_consumer_key',
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'your_twitter_consumer_secret',
      callbackURL: '/api/auth/twitter/callback',
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const twitterId = profile.id;
        const name = profile.displayName;
        const avatar = profile.photos?.[0]?.value;

        // Note: Twitter doesn't always return email, handle accordingly
        if (!email) {
             // Logic if email is missing (maybe ask user to provide it later?)
             // For now, we will fail if email is strictly required or generate a placeholder
             // But prisma schema says email is unique and required.
             // We'll skip creation if no email for now or log error.
             logger.warn(`Twitter login for ${name} (ID: ${twitterId}) failed: No email provided.`);
             // You might want to allow non-email login if your schema supports it, but here we assume email is needed.
             // Let's try to find by twitterId first.
             const existingUser = await prisma.user.findUnique({ where: { twitterId } });
             if (existingUser) return done(null, existingUser);
             
             return done(new Error('No email returned from Twitter. Please sign up with email.'), undefined);
        }

        let user = await prisma.user.findFirst({
          where: {
            OR: [{ twitterId }, { email }],
          },
        });

        if (user) {
          if (!user.twitterId) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { twitterId, avatar: user.avatar || avatar },
            });
          }
          return done(null, user);
        }

        user = await prisma.user.create({
          data: {
            email,
            name,
            twitterId,
            avatar,
            role: 'USER',
          },
        });

        return done(null, user);
      } catch (error) {
        logger.error('Twitter Auth Error:', error);
        return done(error, undefined);
      }
    }
  )
);
