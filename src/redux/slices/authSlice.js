import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Check if user is already logged in from localStorage
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
  user: user,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Helper to get all users from localStorage
function getAllUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
// Helper to save all users to localStorage
function saveAllUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const users = getAllUsers();
      if (users.find(u => u.email === userData.email)) {
        return thunkAPI.rejectWithValue('Email is already registered');
      }
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.firstName + ' ' + userData.lastName,
        email: userData.email,
        password: userData.password,
      };
      users.push(user);
      saveAllUsers(users);
      // Save current user (without password)
      localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
      return { id: user.id, name: user.name, email: user.email };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const users = getAllUsers();
      const user = users.find(u => u.email === userData.email);
      if (!user) {
        return thunkAPI.rejectWithValue('No user found with this email');
      }
      if (user.password !== userData.password) {
        return thunkAPI.rejectWithValue('Incorrect password');
      }
      // Save current user (without password)
      localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
      return { id: user.id, name: user.name, email: user.email };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
});

// Update user profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (updatedData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const currentUser = state.auth.user;
      let users = getAllUsers();
      // Prevent email duplication
      if (
        updatedData.email &&
        users.some(u => u.email === updatedData.email && u.id !== currentUser.id)
      ) {
        return thunkAPI.rejectWithValue('Email is already registered');
      }
      users = users.map(u =>
        u.id === currentUser.id
          ? { ...u, ...updatedData }
          : u
      );
      saveAllUsers(users);
      // Update current user in localStorage (without password)
      const updatedUser = users.find(u => u.id === currentUser.id);
      localStorage.setItem(
        'user',
        JSON.stringify({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email })
      );
      return { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Logout case
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;