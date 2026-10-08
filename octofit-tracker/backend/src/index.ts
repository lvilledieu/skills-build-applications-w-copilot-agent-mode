import express from 'express';

const app = express();

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

const persistencePending = (resource: string) => (_request: express.Request, response: express.Response) => {
  response.status(501).json({ error: `${resource} persistence is not configured yet` });
};

app.get('/api/users/', persistencePending('Users'));
app.get('/api/teams/', persistencePending('Teams'));
app.get('/api/activities/', persistencePending('Activities'));
app.get('/api/leaderboard/', persistencePending('Leaderboard'));
app.get('/api/workouts/', persistencePending('Workouts'));

export default app;
