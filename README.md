# Health-information-system


A Node.js/Express.js backend for managing clients and health programs.

## Features
- Create health programs (TB, Malaria, HIV, etc.)
- Register and manage clients
- Enroll clients in programs
- Search clients
- View client profiles
- Secure API with JWT authentication

## Setup
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Create `.env` file (see `.env` section above)
4. Run: `npm run dev`

## API Endpoints
- `POST /api/programs` - Create a program
- `GET /api/programs` - List all programs
- `POST /api/clients/register` - Register a client
- `POST /api/clients/enroll` - Enroll client in a program
- `GET /api/clients/search?name=query` - Search clients
- `GET /api/clients/:id` - Get client profile (public)

## Security Considerations
- JWT authentication for protected routes
- Input validation using Joi
- MongoDB sanitization
- Error handling middleware