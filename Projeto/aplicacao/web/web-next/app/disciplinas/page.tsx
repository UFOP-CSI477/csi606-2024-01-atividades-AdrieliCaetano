import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import DisciplinaInfo from '../components/DisciplinaInfo';


const HomePage: React.FC = () => {
  return (
    <Layout>
        <div className="text-center my-10">
            <h1 className="text-4xl font-bold mb-10">Disciplinas</h1>
            <div>
              <DisciplinaInfo></DisciplinaInfo>
            </div>
            <div className="my-10">
              <Link href="/disciplinas/create" className="bg-secondary text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary">
                Criar nova disciplina
              </Link>
            </div>
        </div>
    </Layout>
  );
};

export default HomePage;