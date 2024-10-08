# **CSI606-2021-02 - Remoto - Proposta de Trabalho Final**

## *Aluna(o): Adrieli Alexandre Caetano*

--------------

<!-- Descrever um resumo sobre o trabalho. -->

### Resumo

  Este trabalho visa desenvolver um sistema web para gestão de atividades avaliativas, onde o usuário pode cadastrar, visualizar e gerenciar suas disciplinas e atividades. O sistema permite a criação de usuários sem autenticação, e oferece funcionalidades para organizar atividades acadêmicas com base em disciplinas e prazos.

<!-- Apresentar o tema. -->
### 1. Tema

  O trabalho final tem como tema o desenvolvimento de um sistema web para gestão de atividades avaliativas, com foco em simplificar a organização acadêmica de estudantes, permitindo o acompanhamento de suas atividades e disciplinas de maneira intuitiva.

<!-- Descrever e limitar o escopo da aplicação. -->
### 2. Escopo

  Este projeto terá as seguintes funcionalidades:

- Criação de Usuários: Os usuários serão criados informando nome e e-mail, sem necessidade de autenticação.
- Gestão de Disciplinas: O usuário poderá cadastrar, alterar e excluir as disciplinas que cursa.
- Gestão de Atividades: O usuário poderá cadastrar, alterar e excluir suas atividades avaliativas, especificando data, disciplina e status de conclusão.
- Visualização de Atividades: O usuário poderá ver suas atividades em uma lista ordenada por data (mais próximas primeiro) e filtrar as atividades por disciplina ou por períodos semanais e mensais.
- Calendário Mensal: O usuário poderá visualizar um calendário que marca os dias com atividades avaliativas.

- O banco de dados utilizado será relacional conforme os modelos abaixo:
  - [Modelo ER](./ModeloER.png)
  - [Modelo relacional](./modeloRelacional.png)

<!-- Apresentar restrições de funcionalidades e de escopo. -->
### 3. Restrições

  Neste trabalho não serão considerados:

- Autenticação de usuários.
- Gestão de notas ou relatórios de desempenho acadêmico.

<!-- Construir alguns protótipos para a aplicação, disponibilizá-los no Github e descrever o que foi considerado. //-->
### 4. Protótipo

  Protótipos para as páginas de início, de visualização usuários, criação de usuários e visualização do calendário foram elaborados, e podem ser encontrados em: [Protótipo Figma](https://www.figma.com/proto/Ed6uI8KZdZ2zbUwjCABIN8/Projeto_web?node-id=1-2&node-type=canvas&t=1tGqpSgRji9MOuUJ-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2).

### 5. Referências

- REACT. React documentation. Disponível em: https://reactjs.org/docs/getting-started.html. 

- NEXT.JS. Next.js documentation. Disponível em: https://nextjs.org/docs.

- TYPESCRIPT. TypeScript documentation. Disponível em: https://www.typescriptlang.org/docs/.

- TAILWIND CSS. Tailwind CSS documentation. Disponível em: https://tailwindcss.com/docs.

- PEEWEE ORM. Peewee documentation. Disponível em: http://docs.peewee-orm.com/en/latest/.

- FLASK. Flask documentation. Disponível em: https://flask.palletsprojects.com/en/2.0.x/.

- DAY.JS. Day.js documentation. Disponível em: https://day.js.org/docs/en/installation/installation.

- REACT CALENDAR. React Calendar documentation. Disponível em: https://www.npmjs.com/package/react-calendar.
