import { ProductEntity } from 'app/api/products/types';

export interface GeneralStatesReduxSaga {
  roles: Entity[];
  categorias: Entity[];
  productos: ProductEntity[];
  loadingStates: LoadingStates;
}

// Define una interfaz para centralizar los estados de carga
export interface LoadingStates {
  rolesLoading: LoadingState; // Estado de carga para roles
  categoriasLoading: LoadingState; // Estado de carga para categorías
  productosLoading: LoadingState; // Estado de carga para productos
}

export interface Entity {
  id: number;
  nombre: string;
}

export interface LoadingState {
  state: ResponseState;
  status?: boolean;
  message?: string;
}

export enum ResponseState {
  Started,
  InProgress,
  Finished,
  Waiting,
}
