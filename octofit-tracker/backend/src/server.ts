import app from './index.js';

const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.listen(port, '0.0.0.0', () => {
  console.log(`Octofit Tracker API listening at ${apiBaseUrl}`);
});
