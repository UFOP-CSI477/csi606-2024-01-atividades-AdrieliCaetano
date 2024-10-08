"use client"
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import '../styles/Calendar.css';
import IUsuario from '../types/IUsuario';
import IAtividade from '../types/IAtividade';
import { getAllUsuarios } from '../repository/usuarios/UsuarioRepository';
import { getAllAtividades } from '../repository/atividades/AtividadeRepository';
import Select, { SelectOption } from './Select';
import dayjs from 'dayjs';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendario: React.FC = () => {

  const [usuario_id, setUsuarioId] = useState('');
  const [atividades, SetAtividades] = useState<IAtividade[]>([]);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [atividadesFiltradas, SetAtividadesFiltradas] = useState<IAtividade[]>([]);
  const [value, onChange] = useState<Value>(new Date());
  const [atividadesDoDia, setAtividadesDoDia] = useState<IAtividade[]>([]); // Atividades para o dia selecionado

  useEffect(() => {
    getAllUsuarios().then(data => {
      const sortedUsuarios = data.sort((a: { nome: { toLowerCase: () => number; }; }, b: { nome: { toLowerCase: () => number; }; }) => {
        if (a.nome.toLowerCase() < b.nome.toLowerCase()) return -1;
        if (a.nome.toLowerCase() > b.nome.toLowerCase()) return 1;
        return 0;
      });
      setUsuarios(sortedUsuarios);
    });

    getAllAtividades().then(data => SetAtividades(data));
  }, []);

  useEffect(() => {
    if (usuario_id) {
      const atividadesDoUsuario = atividades.filter(atividade => atividade.usuario.id.toString() === usuario_id);
      SetAtividadesFiltradas(atividadesDoUsuario);
    } else {
      SetAtividadesFiltradas([]);
    }
  }, [usuario_id, atividades]);

  useEffect(() => {
    if (value && usuario_id) {
      const selectedDate = Array.isArray(value) ? value[0] : value;
      
      if (selectedDate) {
        const atividadesNoDia = atividadesFiltradas.filter(atividade =>
          dayjs(atividade.data).isSame(dayjs(selectedDate), 'day')
        );
        setAtividadesDoDia(atividadesNoDia);
      }
    }
  }, [value, atividadesFiltradas, usuario_id]);

  const marcarDiasComAtividades = ({ date }: { date: Date }) => {
    return atividadesFiltradas.some(atividade =>
      dayjs(atividade.data).isSame(dayjs(date), 'day')
    )
      ? 'highlight-day' 
      : '';
  };

  const userOptions: SelectOption[] = usuarios.map(usuario => ({
    value: usuario.id.toString(),
    label: `${usuario.nome} ${usuario.sobrenome}`
  }));

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-8">
      <div className="bg-terciary rounded-lg shadow-md p-6 w-full max-w-4xl">
        <div className="mb-6">
          <Select
            label="Selecione o usuário:"
            options={userOptions}
            value={usuario_id}
            onChange={(e) => setUsuarioId(e.target.value)}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 bg-accent rounded-lg p-4 shadow-inner">
            <Calendar
              locale="pt-br"
              onChange={onChange}
              value={value}
              className="react-calendar"
              tileClassName={marcarDiasComAtividades} 
            />
          </div>
  
          <div className="lg:w-1/2 p-4">
            <p className="text-xl font-bold text-foreground mb-4">
              Atividades do dia {Array.isArray(value) ? dayjs(value[0]).format('DD/MM/YYYY') : dayjs(value).format('DD/MM/YYYY')}:
            </p>
            
            {atividadesDoDia.length > 0 ? (
              <ul className="space-y-4">
                {atividadesDoDia.map(atividade => (
                  <li key={atividade.id} className="bg-gray-200 border border-gray-500 rounded-lg p-4 shadow-sm">
                    <div>
                      <h3 className="font-semibold text-lg text-primary">{atividade.titulo} - {atividade.disciplina.sigla_abreviacao}</h3>
                      <p className="text-sm text-gray-700">Disciplina: {atividade.disciplina.nome}</p>
                      <p className="text-sm text-gray-700">Descrição: {atividade.descricao}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nenhuma atividade neste dia.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
export default Calendario;
