import React from 'react';
import Layout from '../components/Layout';
import Calendario from '../components/Calendario';


const HomePage: React.FC = () => {
  return (
    <Layout>
        <div className="text-center my-10">
            <h1 className="text-4xl font-bold mb-4">Calendário</h1>
            <p className="text-lg text-gray-600">
              Selecione o usuário para ver os dias com atividades marcados no calendário. Se desejar, você pode clicar em um dia para visualizar as atividades.
            </p>
            <Calendario></Calendario>
        </div>
    </Layout>
  );
};

export default HomePage;