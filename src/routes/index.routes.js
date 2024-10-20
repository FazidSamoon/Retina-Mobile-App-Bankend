import Express from "express";
import authRouter from "./auth.routes";
import testResultsRouter from "./test_results.routes";
import challengesRouter from "./challenges.routes";
import levelRouter from "./level.routes";
import rewardRouter from "./rewards.routes";
import doctorRouter from "./doctor.routes";
import channelingRoute from "./channeling.routes";
import crypto from "crypto";

const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  "981410127347-e3tl7gghi7i1hfj8l5l75gcod3ion961.apps.googleusercontent.com",
  "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",
  "http://localhost:3005"
);

const router = Express.Router();

router.use("/auth", authRouter);
router.use("/test-results", testResultsRouter);
router.use("/challanges", challengesRouter);
router.use("/level", levelRouter);
router.use("/reward", rewardRouter);
router.use("/doctor", doctorRouter);
router.use("/channeling", channelingRoute);

router.get('/calendar/auth', (req, res) => {

  console.log("hey")
  const scopes = [
    'https://www.googleapis.com/auth/calendar', // Scopes for calendar/meet access
    'https://www.googleapis.com/auth/calendar.events',
  ];

  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // Important for getting a refresh token
    scope: scopes,
  });

  console.log(url)

  res.send(url);
});

router.get('/oauth2callback', async (req, res) => {
  console.log("fagafa")
  const code = "4/0AVG7fiQ4qufNduxvZ369-EsYPbmNNDEQd1TVodWwx4LiZ9yvakaCg9bI8G2MbzHmzTp4Bg";

  try {

    const { tokens } = await oAuth2Client.getToken(code);
    
    console.log('Tokens received:', tokens);

    res.send('Authentication successful! You can close this window.');
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).send('Error retrieving tokens');
  }
});


export default router;
