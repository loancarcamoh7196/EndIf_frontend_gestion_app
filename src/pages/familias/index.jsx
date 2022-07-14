/**
 ** Archivo de pagina: /familias
 */
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { family, universal } from '@utils/textModGestion';
import { Link } from 'react-router-dom';

//redux
import { getFamiliasAction } from '@redux/familiasDuck';

// Componentes
import Layout from '@layouts/Main';
import Table from '@components/familia/Table';
import Card from '@common/Card';

const link = [
  { nombre: 'Home', url: '/dashboard' },
  { nombre:'Familias', url: '/familias' }
];

const Index = () => {
  const dispatch = useDispatch();
  
  useEffect(() => { dispatch(getFamiliasAction()) }, []);
  let familias = useSelector((store) => store.familias.list);

  return (
    <Layout title={family.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
        <div className='row'>
          <div className='col-4 mb-3 float-sm-right'>
            <Link to='/admin/familias/new' className='btn btn-sm btn-block btn-outline-success float-sm-right'> <i className='fa-solid fa-plus' />{universal.lbl.nueva}</Link>
          </div>

          <div className='col-12 col-md-12 col-xl-12'>
            <Table data={familias} />
          </div>
        </div>  
      </Card>
    </Layout>
  )
}

export default Index;