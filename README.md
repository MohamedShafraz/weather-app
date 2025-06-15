# Weather App

A simple and responsive weather application built with React that fetches real-time weather data using the WeatherAPI and displays current conditions, including temperature, weather description, and condition icon. The app is containerized using Docker and uses environment variables for secure API access.

---

## Features

- Search weather by city name
- Real-time temperature and condition display
- Weather description with icon
- Responsive UI with FontAwesome icons
- Loading indicator during data fetch
- Environment-based API key management
- Dockerfile for easy deployment
- Comprehensive unit testing with Vitest

---

## Tech Stack

- **React**
- **Vite**
- **FontAwesome**
- **WeatherAPI**
- **Docker**
- **Vitest**

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- Docker (optional)
- WeatherAPI key ([Sign up here](https://www.weatherapi.com/))

### 1. Clone the Repository

```bash
git clone https://github.com/MohamedShafraz/weather-app.git
cd weather-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory based on the provided `.env.sample`:

```env
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_API_URL=https://api.weatherapi.com/v1/current.json?q=
```

### 4. Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

---

## Docker

### 1. Build Docker Image

```bash
docker build -t weather-app .
```

### 2. Run Container

```bash
docker run -p 3000:3000 weather-app
```

---

## Running Tests
### 1.Unit Tests

```bash
npm test
```

### 2.Test Coverage

```bash
npm test -- --coverage
```

### 3.Watch Mode (Development)

```bash
npm test -- --watch
```

---

## Project Structure

```
├── public/
├── src/
│   ├── components/
│   │   └── Weather.jsx
│   └── App.jsx
├── .env.sample
├── .gitignore
├── dockerfile
├── eslint.config.js
├── index.html
├── LICENSE
├── License.md
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.js
└── vitest.setup.js
```

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Testing Details
### The application includes comprehensive unit tests for:

- Component rendering

- API integration and data fetching

- User interactions (search, enter key)

- Loading states

- Error handling

- Environment variable usage

## Acknowledgements

- [WeatherAPI](https://www.weatherapi.com/)
- [FontAwesome](https://fontawesome.com/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)


