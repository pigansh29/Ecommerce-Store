import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  filteredProducts: [],
  product: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  viewType: 'grid', // 'grid' or 'list'
  filters: {
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
    searchQuery: '',
  },
};

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      // In a real app, this would fetch from your backend
      // For now, we'll use a public API
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch products';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch single product
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch product';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category, thunkAPI) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch products';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setViewType: (state, action) => {
      state.viewType = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      
      // Apply filters to products
      state.filteredProducts = state.products.filter(product => {
        // Category filter
        if (state.filters.category !== 'all' && product.category !== state.filters.category) {
          return false;
        }
        
        // Price range filter
        if (product.price < state.filters.priceRange[0] || product.price > state.filters.priceRange[1]) {
          return false;
        }
        
        // Rating filter
        if (state.filters.rating > 0 && product.rating.rate < state.filters.rating) {
          return false;
        }
        
        // Search query filter
        if (state.filters.searchQuery && !product.title.toLowerCase().includes(state.filters.searchQuery.toLowerCase())) {
          return false;
        }
        
        return true;
      });
    },
    resetFilters: (state) => {
      state.filters = {
        category: 'all',
        priceRange: [0, 1000],
        rating: 0,
        searchQuery: '',
      };
      state.filteredProducts = state.products;
    },
    searchProducts: (state, action) => {
      const searchQuery = action.payload.toLowerCase();
      state.filters.searchQuery = searchQuery;
      
      if (searchQuery === '') {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(product => 
          product.title.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setViewType, setFilters, resetFilters, searchProducts } = productSlice.actions;
export default productSlice.reducer;