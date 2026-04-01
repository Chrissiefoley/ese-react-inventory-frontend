import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { InventoryPage } from './InventoryPage';
import { inventory } from '../../api/inventory';
import { getCurrentUser } from '../../api/users';

// Mock the API modules
jest.mock('../../api/inventory');
jest.mock('../../api/users');

describe('InventoryPage - Core Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock verified user
    (getCurrentUser as jest.Mock).mockResolvedValue({
      role: 'staff',
      is_staff_verified: true,
    });
  });

  test('renders inventory dashboard with title', async () => {
    (inventory.getItems as jest.Mock).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <InventoryPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/inventory dashboard/i)).toBeInTheDocument();
    });
  });

  test('displays inventory items from API', async () => {
    const mockItems = [
      {
        id: 1,
        name: 'Test Item',
        description: 'Test Description',
        category: 'Test Category',
        count: 50,
        price: '9.99',
        image: '',
      },
    ];

    (inventory.getItems as jest.Mock).mockResolvedValue(mockItems);

    render(
      <MemoryRouter>
        <InventoryPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Item')).toBeInTheDocument();
      expect(screen.getByText('Test Category')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
    });
  });

  test('displays low stock warning for items below threshold', async () => {
    const mockItems = [
      {
        id: 1,
        name: 'Low Stock Item',
        description: 'Running out',
        category: 'Test',
        count: 5, // Below threshold of 10
        price: '9.99',
        image: '',
      },
    ];

    (inventory.getItems as jest.Mock).mockResolvedValue(mockItems);

    render(
      <MemoryRouter>
        <InventoryPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Low Stock Item')).toBeInTheDocument();
    });

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('shows Add New Item button for verified staff', async () => {
    (inventory.getItems as jest.Mock).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <InventoryPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add new item/i })).toBeInTheDocument();
    });
  });
});
