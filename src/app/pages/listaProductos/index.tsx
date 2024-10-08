import { GeneralContainer } from 'app/components/containers';
import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { useSlice } from 'app/features/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  productosSelector,
  productosSelectorLoading,
} from 'app/features/slice/selectors';
import { ProductEntity } from 'app/api/products/types';
import { ResponseState } from 'app/features/slice/types';
import { LOAD_PRODUCTOS_LIST } from 'app/features/slice/sagaActions';
import { Spin } from 'antd';

export function ListaProductos() {
  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: 'Nombre',
      dataIndex: 'nombre',
    },
    {
      key: '3',
      title: 'Descripción',
      dataIndex: 'descripcion',
    },
    {
      key: '4',
      title: 'Precio',
      dataIndex: 'precio',
    },
    {
      key: '5',
      title: 'Categoría',
      dataIndex: 'categoriaNombre',
    },
    {
      key: '6',
      title: 'Actions',
      render: record => {
        return (
          <>
            <EditOutlined />
            <DeleteOutlined style={{ color: 'red', marginLeft: 12 }} />
          </>
        );
      },
    },
  ];

  const { actions } = useSlice();
  const dispatch = useDispatch();

  //Productos Selectors
  const productos = useSelector(productosSelector);
  const loadingProductos = useSelector(productosSelectorLoading);

  const [loadingSpinProductos, setLoadingSpinProductos] =
    useState<boolean>(false);

  const [firstCharge, setFirstCharge] = useState<boolean>(true);

  const [productosListState, setProductosListState] = useState<ProductEntity[]>(
    [],
  );

  useEffect(() => {
    if (firstCharge) {
      if (loadingProductos?.state === ResponseState.Waiting) {
        dispatch(actions.loadProducts(ResponseState.Started));
      } else if (loadingProductos?.state === ResponseState.Started) {
        setFirstCharge(false);
        dispatch(actions.loadProducts(ResponseState.InProgress));
        dispatch({
          type: LOAD_PRODUCTOS_LIST,
        });
      }
    }
    if (loadingProductos?.state === ResponseState.InProgress) {
      setLoadingSpinProductos(true);
    } else if (loadingProductos?.state === ResponseState.Finished) {
      if (loadingProductos?.status) {
        if (productos && productos.length > 0) {
          let dataList: Array<ProductEntity> = [];

          productos?.forEach(r => {
            dataList.push({
              id: r.id,
              nombre: r.nombre,
              descripcion: r.descripcion,
              precio: r.precio,
              categoriaNombre: r.categoriaNombre,
            });
          });
          setProductosListState(dataList);
          if (loadingSpinProductos) setLoadingSpinProductos(false);
        }
      } else {
        alert(loadingProductos?.message);
      }
      dispatch(actions.loadProducts(ResponseState.Waiting));
    }
  }, [productos, loadingProductos]);

  return (
    <>
      <GeneralContainer>
        <h1>ListaProductos de la tienda</h1>

        <div style={{ display: 'flex', border: 'solid red 3px' }}>
          <Spin spinning={loadingSpinProductos}>
            <Table columns={columns} dataSource={productosListState}></Table>
          </Spin>
        </div>
      </GeneralContainer>
    </>
  );
}
