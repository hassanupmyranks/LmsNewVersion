import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface MenuState {
  isMenuOpen: boolean
  hasSubMenu: boolean
}

// Define the initial state using that type
const initialState: MenuState = {
  isMenuOpen: true,
  hasSubMenu: false
}

export const menuSlice = createSlice({
  name: 'menu',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen =
        state.isMenuOpen && state.hasSubMenu ? true : action.payload
    },
    updateHasSubMenu: (state, action: PayloadAction<boolean>) => {
      state.hasSubMenu = action.payload
    }
  }
})

export default menuSlice.reducer
