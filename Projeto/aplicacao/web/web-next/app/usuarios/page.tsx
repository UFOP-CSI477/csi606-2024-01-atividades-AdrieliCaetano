import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import UsuarioInfo from '../components/UsuarioInfo';


const HomePage: React.FC = () => {
  return (
    <Layout>
        <div className="text-center my-10">
            <h1 className="text-4xl font-bold mb-10">Usuários</h1>
            <div>
              <UsuarioInfo></UsuarioInfo>
            </div>
            <div className='my-10'>
              <Link href="/usuarios/create" className="bg-secondary text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary">
                Criar novo usuário
              </Link>
            </div>
        </div>
    </Layout>
  );
};

export default HomePage;