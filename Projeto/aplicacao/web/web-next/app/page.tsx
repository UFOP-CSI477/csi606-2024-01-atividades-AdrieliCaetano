import React from 'react';
import Layout from './components/Layout';
import Link from 'next/link';


const HomePage: React.FC = () => {
  return (
    <Layout>
      <img src="/SA_logo.png" alt="Logo do Sistema de Atividades" className="mx-auto" width="20%"/>
      <div className=" text-center my-10">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo(a) ao Sistema de Atividades Avaliativas!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Aqui você pode gerenciar suas atividades avaliativas, visualizar suas disciplinas e manter
          suas atividades organizadas!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/usuarios" className="bg-secondary text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary">
            Gerenciar Usuários
          </Link>
          <Link href="/disciplinas" className="bg-secondary  text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary">
            Ver Disciplinas
          </Link>
          <Link href="/atividades" className="bg-secondary text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary">
            Ver Atividades Avaliativas
          </Link>
          <Link href="/calendario" className="bg-secondary text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary">
            Ver Calendário
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;