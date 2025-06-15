import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Weather from './Weather';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables
vi.stubEnv('VITE_WEATHER_API_KEY', 'test_api_key');
vi.stubEnv('VITE_WEATHER_API_URL', 'https://api.test/');

// Mock FontAwesome icons
vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: { icon: any }) => <span>{icon.iconName}</span>
}));

// Mock API responses
const mockSuccessResponse = {
  location: { name: 'London', country: 'UK' },
  current: {
    temp_c: '15',
    humidity: '75',
    uv: '3',
    pressure_mb: '1012',
    wind_kph: '12',
    condition: {
      text: 'Partly cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
    }
  }
};

const mockErrorResponse = {
  ok: false,
  status: 404,
  json: async () => ({ error: "Not found" }),
} as Response;

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Weather Component', () => {
  test('renders initial state correctly', () => {
    render(<Weather />);
    expect(screen.getByPlaceholderText('Search for a city (e.g. London, Tokyo)')).toBeInTheDocument();
    expect(screen.getByText('Weather Reporter')).toBeInTheDocument();
  });

  test('fetches weather data on mount', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuccessResponse
    });

    render(<Weather />);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://api.test/Colombo&key=test_api_key',
        {
          headers: {
            'X-RapidAPI-Key': 'test_api_key',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
          }
        }
      );
    });
  });

  test('handles search functionality', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuccessResponse
    });

    const user = userEvent.setup();
    render(<Weather />);
    
    const input = screen.getByPlaceholderText('Search for a city (e.g. London, Tokyo)');
    const button = screen.getByTitle('search');

    await act(async () => {
      await user.clear(input);
      await user.type(input, 'Paris');
      await user.click(button);
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://api.test/Paris&key=test_api_key',
      expect.any(Object)
    );
  });

  test('handles Enter key press', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuccessResponse
    });

    const user = userEvent.setup();
    render(<Weather />);
    
    const input = screen.getByPlaceholderText('Search for a city (e.g. London, Tokyo)');
    
    await act(async () => {
      await user.clear(input);
      await user.type(input, 'Tokyo{enter}');
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://api.test/Tokyo&key=test_api_key',
      expect.any(Object)
    );
  });

  test('displays loading state', async () => {
    (fetch as vi.Mock).mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve({ ok: true, json: () => ({}) }), 100))
    );

    render(<Weather />);
    expect(await screen.findByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('displays error message', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce(mockErrorResponse);

    render(<Weather />);
    
    await waitFor(() => {
      expect(screen.getByText(/We couldn't find that city/i)).toBeInTheDocument();
    });
  });

  test('displays weather data successfully', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuccessResponse
    });

    render(<Weather />);
    
    await waitFor(() => {
      expect(screen.getByText('London,UK')).toBeInTheDocument();
      expect(screen.getByText('15°C')).toBeInTheDocument();
      expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
      expect(screen.getByText('75%')).toBeInTheDocument();
      expect(screen.getByText('12km/h')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('1012 mb')).toBeInTheDocument();
    });
  });
});