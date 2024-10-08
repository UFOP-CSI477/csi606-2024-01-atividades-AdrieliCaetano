import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-terciary via-secondary to-primary p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className='flex items-center'>
          <Link href='/'><img src="/SA_logo.png" alt="Logo do Sistema de Atividades" width="10%" className='min-w-[30px]'/></Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/usuarios" className="text-white font-bold hover:text-gray-200">
              Usuários
            </Link>
          </li>
          <li>
            <Link href="/disciplinas" className="text-white font-bold hover:text-gray-200">
              Disciplinas
            </Link>
          </li>
          <li>
            <Link href="/atividades" className="text-white font-bold hover:text-gray-200">
              Atividades
            </Link>
          </li>
          <li>
            <Link href="/calendario" className="text-white font-bold hover:text-gray-200">
              Calendário
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;