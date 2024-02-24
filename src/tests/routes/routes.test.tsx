import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../../App';

describe('Route Navigation', () => {
  it('should navigate to login page', async () => {
    // Act
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Assert
    expect(await screen.findByText(/Welcome Back/i)).toBeInTheDocument();
  });

  it('should navigate to register page', async () => {
    // Act
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );

    // Assert
    expect(await screen.findByText(/Register an account/i)).toBeInTheDocument();
  });

  it('should render error component for unknown routes', async () => {
    // Act
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );

    // Assert
    expect(await screen.findByText(/Oops! The page you're looking for doesn't exist./i)).toBeInTheDocument();
  });
});
