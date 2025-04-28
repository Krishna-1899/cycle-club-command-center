
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { mockRiders } from '../../data/mockData'; // Using mock data for now
import { Rider } from '../../data/mockData';

// Define the base URL for API calls
const API_URL = 'https://api.example.com/';

interface RiderState {
  riders: Rider[];
  currentRider: Rider | null;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    total: number;
  };
  filters: {
    searchQuery: string;
    statusFilter: string;
    birthdayMonthFilter: string;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: RiderState = {
  riders: [],
  currentRider: null,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    total: 0
  },
  filters: {
    searchQuery: '',
    statusFilter: 'all',
    birthdayMonthFilter: 'all'
  },
  isLoading: false,
  error: null
};

export const fetchRiders = createAsyncThunk(
  'riders/fetchRiders',
  async ({
    page = 1,
    limit = 10,
    searchQuery = '',
    statusFilter = 'all',
    birthdayMonthFilter = 'all'
  }: {
    page?: number;
    limit?: number;
    searchQuery?: string;
    statusFilter?: string;
    birthdayMonthFilter?: string;
  }, { rejectWithValue }) => {
    try {
      // For demo purposes - use mock data with pagination and filtering
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      let filteredRiders = [...mockRiders];
      
      // Apply filters
      if (searchQuery) {
        filteredRiders = filteredRiders.filter(rider => 
          rider.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rider.phoneNumber.includes(searchQuery)
        );
      }
      
      if (statusFilter !== 'all') {
        filteredRiders = filteredRiders.filter(rider => rider.status === statusFilter);
      }
      
      if (birthdayMonthFilter !== 'all') {
        filteredRiders = filteredRiders.filter(rider => {
          const month = new Date(rider.dateOfBirth).getMonth() + 1;
          return month.toString() === birthdayMonthFilter;
        });
      }
      
      // Calculate pagination
      const total = filteredRiders.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedRiders = filteredRiders.slice(startIndex, endIndex);
      
      return {
        riders: paginatedRiders,
        pagination: {
          page,
          limit,
          totalPages,
          total
        },
        filters: {
          searchQuery,
          statusFilter,
          birthdayMonthFilter
        }
      };
      
      // Real API call would look like this:
      // const response = await axios.get(`${API_URL}riders`, {
      //   params: { page, limit, search: searchQuery, status: statusFilter, month: birthdayMonthFilter }
      // });
      // return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch riders');
      }
      return rejectWithValue('Network error, please try again later');
    }
  }
);

export const fetchRiderById = createAsyncThunk(
  'riders/fetchRiderById',
  async (riderId: string, { rejectWithValue }) => {
    try {
      // For demo purposes - use mock data
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
      const rider = mockRiders.find(rider => rider.id === riderId);
      if (!rider) {
        return rejectWithValue('Rider not found');
      }
      return rider;
      
      // Real API call would look like this:
      // const response = await axios.get(`${API_URL}riders/${riderId}`);
      // return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch rider');
      }
      return rejectWithValue('Network error, please try again later');
    }
  }
);

const riderSlice = createSlice({
  name: 'riders',
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRiders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.riders = action.payload.riders;
        state.pagination = action.payload.pagination;
        state.filters = action.payload.filters;
        state.error = null;
      })
      .addCase(fetchRiders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRiderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRiderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRider = action.payload;
        state.error = null;
      })
      .addCase(fetchRiderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateFilters, setPage } = riderSlice.actions;
export default riderSlice.reducer;
