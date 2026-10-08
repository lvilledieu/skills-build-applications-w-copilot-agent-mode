import express from 'express';
import Activity from './models/activity.js';
import Leaderboard from './models/leaderboard.js';
import Team from './models/team.js';
import User from './models/user.js';
import Workout from './models/workout.js';

const app = express();

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().populate('team').lean());
});
app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').lean());
});
app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user').sort({ completedAt: -1 }).lean());
});
app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user').sort({ points: -1 }).lean());
});
app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ difficulty: 1, title: 1 }).lean());
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
});

export default app;
