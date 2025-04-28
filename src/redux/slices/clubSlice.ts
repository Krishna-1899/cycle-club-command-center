
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { mockClubs } from '../../data/clubData'; // Using mock data for now
import { Club } from '../../data/clubData';

// Define the base URL for API calls
const API_URL = 'https://api.example.com/';

interface ClubState {
  clubs: Club[];
  selectedClub: Club | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ClubState = {
  clubs: [],
  selectedClub: null,
  isLoading: false,
  error: null
};

export const fetchClubs = createAsyncThunk(
  'clubs/fetchClubs',
  async (_, { rejectWithValue }) => {
    try {
      // For demo purposes - use mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return mockClubs;
      
      // Real API call would look like this:
      // const response = await axios.get(`${API_URL}clubs`);
      // return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch clubs');
      }
      return rejectWithValue('Network error, please try again later');
    }
  }
);

export const fetchClubById = createAsyncThunk(
  'clubs/fetchClubById',
  async (clubId: string, { rejectWithValue }) => {
    try {
      // For demo purposes - use mock data
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
      const club = mockClubs.find(club => club.id === clubId);
      if (!club) {
        return rejectWithValue('Club not found');
      }
      return club;
      
      // Real API call would look like this:
      // const response = await axios.get(`${API_URL}clubs/${clubId}`);
      // return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch club');
      }
      return rejectWithValue('Network error, please try again later');
    }
  }
);

const clubSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    setSelectedClub: (state, action) => {
      state.selectedClub = state.clubs.find(club => club.id === action.payload) || null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clubs = action.payload;
        state.error = null;
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchClubById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClubById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedClub = action.payload;
        state.error = null;
      })
      .addCase(fetchClubById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedClub } = clubSlice.actions;
export default clubSlice.reducer;
