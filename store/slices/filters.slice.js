import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  inStock: false,
  discount: false,
  maxPrice: 0,
  minPrice: 0,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const { name, value } = action.payload
      if (name === 'inStock' || name === 'discount') state[name] = value
      else state[name] = value
    },
    resetFilter: (state, action) => {
      const { maxPrice, minPrice } = action.payload
      Object.assign(state, initialState, { maxPrice, minPrice })
    },
    loadFilters: (state, action) => {
      const { discount, inStock, price } = action.payload
      if (discount !== undefined) {
        state.discount = discount === 'true'
      }
      if (inStock !== undefined) {
        state.inStock = inStock === 'true'
      }
      if (price) {
        const [min, max] = price.split('-').map(Number)
        state.minPrice = min
        state.maxPrice = max
      }
    },
  },
})

export const { updateFilter, resetFilter, loadFilters } = filterSlice.actions

export default filterSlice.reducer
