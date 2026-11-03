# IssueQuest

IssueQuest is a beginner-friendly open-source issue discovery app. It presents a polished landing experience, an interactive issue-exploration demo, and a live issues page backed by a small Express API.

The backend fetches issue-like records from a configurable external API, converts different response shapes into a consistent format, ranks records by score, and returns the top results to the browser.

## Features

- Frosted Evergreen themed landing page for IssueQuest
- Dedicated frontend discovery page at `/frontend`
- Issues page that loads ranked results from `/api/results`
- Search and quick-filter UI demonstrations
- Issue cards with score, date, and GitHub search links
- Configurable upstream API, result count, port, and environment
- Optional GitHub token support for higher API rate limits
- Request timeout and retry handling for transient upstream failures
- Health-check endpoint for local or deployment monitoring
- Unit tests for parsing and ranking utilities

## Application Flow

1. Visit the home page at `/`.
2. Select **Get Started** or open `/frontend`.
3. Select **Discover Issues** or open `/issues`.
4. The issues page requests `/api/results`.
5. The backend fetches data from `API_URL`, parses it into `{ id, title, score, date }`, ranks it by descending score, and returns the first `TOP_N` records.
6. Selecting an issue opens a GitHub issue search in a new tab.

## Project Structure

```text
.
├── index.html              # Home/authentication gateway page
├── frontend.html           # IssueQuest landing and discovery experience
├── issues.html             # Dynamic ranked issues page
├── index.js                # Express application and page routes
├── routes/
│   └── api.js              # /api/results endpoint
├── services/
│   └── dataService.js      # Fetch, parse, and rank orchestration
├── utils/
│   ├── fetchData.js        # Upstream HTTP requests, timeout, and retries
│   ├── parseItems.js       # External response normalization
│   └── rankItems.js        # Score sorting and top-N selection
├── config/
│   └── index.js            # Environment validation and configuration
├── middleware/
│   └── errorHandler.js     # API error responses
├── __tests__/               # Jest unit tests
├── .env.example             # Environment variable template
├── start.bat                # Windows startup helper
└── package.json             # Scripts and dependencies
```

## Requirements

- Node.js 18 or newer
- npm
- Network access to the configured upstream API

Node.js 18+ is recommended because the backend uses the built-in `fetch` API and `AbortController`.

## Installation

```bash
git clone <repository-url>
cd Technical-Training-project
npm install
```

Create a local environment file from the template:

```bash
copy .env.example .env
```

On macOS or Linux, use:

```bash
cp .env.example .env
```

Update `.env` as needed:

```env
PORT=3000
API_URL=https://api.github.com/repos/nodejs/node/issues
TOP_N=10
NODE_ENV=development
GITHUB_TOKEN=
```

`API_URL` is required. `PORT` defaults to `3000`, and `TOP_N` defaults to `10` when omitted. `GITHUB_TOKEN` is optional and must remain server-side; never place it in HTML, browser JavaScript, or a committed `.env` file.

## Running the Application

Start the server:

```bash
npm start
```

Start with automatic restart during development:

```bash
npm run dev
```

On Windows, you can also double-click `start.bat`.

Once running, open <http://localhost:3000/>.

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/frontend` | IssueQuest landing and discovery page |
| `/issues` | Ranked issue list loaded from the backend |
| `/api/results` | JSON response containing ranked results |
| `/health` | JSON health check |

Example API response:

```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 123,
      "title": "Improve error messaging",
      "score": 98.5,
      "date": "2026-01-15T12:00:00.000Z"
    }
  ]
}
```

## Supported Upstream Data Shapes

The parser accepts either an array or an object containing `items` or `data`. It maps common field names as follows:

| Normalized field | Accepted source fields |
| --- | --- |
| `id` | `id`, `_id` |
| `title` | `title`, `name` |
| `score` | `score`, `rating`, `points` |
| `date` | `date`, `created_at`, `createdAt` |

The backend sorts normalized records by `score` in descending order and returns up to `TOP_N` records.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Express server |
| `npm run dev` | Start the server with Nodemon |
| `npm test` | Run the Jest test suite |
| `npm run test:watch` | Run Jest in watch mode |

Run tests with:

```bash
npm test
```

## Troubleshooting

### The server exits with a missing configuration error

Make sure `.env` exists and contains a valid `API_URL`:

```env
API_URL=https://api.github.com/repos/nodejs/node/issues
```

`PORT` must be between `1` and `65535`, and `TOP_N` must be a positive integer.

### The issues page shows an API error

Check the following:

1. The server is running.
2. `API_URL` is reachable from the machine running Node.js.
3. The upstream API is returning JSON and has not rate-limited the request.
4. `GITHUB_TOKEN` is set in `.env` if authenticated GitHub API access is required.

The endpoint can be checked directly at <http://localhost:3000/api/results>.

### Checking server availability

Open <http://localhost:3000/health>. A healthy server returns a JSON object with `status: "ok"`.

## Security Notes

- Keep `.env` local and do not commit secrets.
- Store `GITHUB_TOKEN` only on the server.
- Do not expose upstream credentials through frontend code.
- The backend disables Express's `X-Powered-By` header.
- The issues page escapes issue titles before inserting them into the DOM.

## Current Scope

IssueQuest currently combines a static frontend experience with a configurable API pipeline. The filters and search controls on the landing page are interactive UI demonstrations; the live issue list is populated by the `/api/results` endpoint. Repository-specific GitHub issue discovery, authentication, persistence, and user accounts are not implemented as separate backend features yet.

## License

This project currently uses the ISC license declared in `package.json`.
