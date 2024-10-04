import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.roles || initialState;

//Roles

export const rolesSelector = createSelector(
  [selectSlice],
  state => state.roles,
);

export const rolesSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.rolesLoading,
);

// Categorías

export const categoriasSelector = createSelector(
  [selectSlice],
  state => state.categorias,
);

export const categoriasSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.categoriasLoading,
);

// Productos

export const productosSelector = createSelector(
  [selectSlice],
  state => state.productos,
);

export const productosSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.productosLoading,
);
