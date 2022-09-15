/**
 ** Archivo Cajas Index
 *? url: /cajas
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
//* Texto
import { useDispatch, useSelector } from 'react-redux';
import { cashRegister } from '@utils/texts/modGestion';
import { universal } from '@utils/texts/general';
//* Redux
import { getCajasAction } from '@redux/cajasDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/caja/Table';
import Card from '@common/Card';
//* Texto de BreadCrum
const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre:'Cajas', url: '/cajas' }
];

const Index = () => {
  const dispatch = useDispatch();
  const loading = useSelector(store => store.cajas.loading);
  let cajas = useSelector((store) => store.cajas.list);

  useEffect(() => { dispatch(getCajasAction()) }, []);
  
  return (
    <Layout title={cashRegister.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
        <div className='row'>
          <div className='col-4 mb-3 float-sm-right'>
            <Link
              to='/cajas/new'
              className='btn btn-sm btn-block btn-outline-success float-sm-right'>
                <i className='fa-solid fa-plus' />
                {universal.btn.new}
            </Link>
          </div>

          <div className='col-12 col-md-12 col-xl-12'>
            {
              loading ?
              <div className='d-flex justify-content-center'>
                <div className='spinner-border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              </div>
              : <Table data={cajas} />
            }
          </div>
        </div>  
      </Card>
    </Layout>
  )
}

export default Index;