import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const addNewData = createAsyncThunk(
  "addProduct",
  async (value, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: value.title,
          brand: value.brand,
          category: value.category,
          price: value.price,
        }),
      });

      let data = await res.json();
      console.log(data);
      if (data.id) {
        toast.success("Product added successfully");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (value, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${value.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: value.title,
          brand: value.brand,
          category: value.category,
          price: value.price,
        }),
      });

      let data = await res.json();
      if (data.id) {
        toast.success("Product updated successfully");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const getAllProduct = createAsyncThunk("getAllProduct", async () => {
  const response = await axios.get("https://dummyjson.com/products");

  return response.data;
});

export const getSingleProduct = createAsyncThunk(
  "getSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "GET",
      });

      let data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });

      let data = await res.json();
      if (data.id) {
        toast.success("Product deleted successfully");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const initialState = {
  error: "",
  productData: [],
  singleProduct: {},
};

export const productSlice = createSlice({
  name: "prodcut",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.pending, (state, action) => {});
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.productData = Array.isArray(action.payload.products)
        ? action.payload.products
        : [];
      state.error = "";
    });
    builder.addCase(getAllProduct.rejected, (state, action) => {
      console.log(action);
      state.error = action.payload;
      state.productData = [];
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const deletedProductId = action.payload.id;

      if (Array.isArray(state.productData)) {
        state.productData = state.productData.filter(
          (product) => product.id !== deletedProductId
        );
      } else {
        state.productData = [];
      }

      state.error = "";
    });

    builder.addCase(addNewData.fulfilled, (state, action) => {
      const newProduct = action.payload;

      state.productData = Array.isArray(state.productData)
        ? [newProduct, ...state.productData]
        : [newProduct];

      state.error = "";
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const updatedProduct = action.payload;

      if (Array.isArray(state.productData)) {
        const updatedIndex = state.productData.findIndex(
          (product) => product.id === updatedProduct.id
        );

        if (updatedIndex !== -1) {
          state.productData[updatedIndex] = updatedProduct;
        }
      }

      state.error = "";
    });

    builder.addCase(getSingleProduct.pending, (state, action) => {});
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      console.log(action);
      state.singleProduct = action.payload;
      state.error = "";
    });
    builder.addCase(getSingleProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.productData = [];
    });
  },
});
export default productSlice.reducer;
