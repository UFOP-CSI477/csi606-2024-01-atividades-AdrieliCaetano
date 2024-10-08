# **CSI606-2021-02 - Remoto - Trabalho Final - Resultados**

## *Aluna(o): Adrieli ALexandre Caetano*

--------------

<!-- Este documento tem como objetivo apresentar o projeto desenvolvido, considerando o que foi definido na proposta e o produto final. -->

### Resumo

 Este trabalho visa desenvolver um sistema web para gestão de atividades avaliativas, onde o usuário pode cadastrar, visualizar e gerenciar suas disciplinas e atividades. O sistema permite a criação de usuários sem autenticação, e oferece funcionalidades para organizar atividades acadêmicas com base em disciplinas e prazos.

### 1. Funcionalidades implementadas
<!-- Descrever as funcionalidades que eram previstas e foram implementas. -->
- Criação, visualização, edição e exclusão de usuários
- Criação, edição e exclusão de disciplinas
- Criação, edição e exclusão de atividades
- Visualização de disciplinas de um determinado usuário
- Visualização de atividades de um determinado usuário, com filtro de data e de disciplina e ordenadas com base na data (mais próximas primeiro) e no status de conclusão (atividades pendentes aparecem primeiro).
- Visualização do calendário mensal que marca os dias com atividades de um determinado usuário
- Visualização das atividades do dia selecionado no calendário de um determinado usuário
  

  Obs.: Como não foi considerado nem implementado a autenticação e login, foi adicionado um campo select para escolher o usuário e poder ver suas respectivas as atividades, disciplinas e o calendário.

### 2. Funcionalidades previstas e não implementadas
<!-- Descrever as funcionalidades que eram previstas e não foram implementas, apresentando uma breve justificativa do porquê elas não foram incluídas -->
Ainda falta implementar:
- ~~_Filtro de atividades por disciplina_~~  -  Feito ✔️

### 3. Outras funcionalidades implementadas
<!-- Descrever as funcionalidades implementas além daquelas que foram previstas, caso se aplique.  -->

A ordenação de atividades por status de conclusão não estava prevista. A ideia de inserir essa funcionalidade surgiu depois, ao analisar e entender que quando uma pessoa conclui uma atividade, essa atividade deixa de ser uma prioridade para ela, podendo ser exibida após as atividades ainda pendentes.

### 4. Principais desafios e dificuldades
<!-- Descrever os principais desafios encontrados no desenvolvimento do trabalho, quais foram as dificuldades e como elas foram superadas e resolvidas. -->
- Estilização e Design: Um dos principais obstáculos foi criar um design visualmente atraente. Como não tenho muita habilidade com design e com CSS, garantir que a interface fosse não apenas funcional, mas também esteticamente agradável, foi um grande desafio. Isso incluiu trabalhar com paletas de cores, espaçamentos e outros elementos que influenciam na experiência do usuário. (Talvez o resultado final ainda não tenha ficado bom, mas eu tentei né 😅)

- Responsividade: Tornar o sistema responsivo, ou seja, garantir que ele funcione bem em diferentes dispositivos e tamanhos de tela, foi outra dificuldade. A adaptação de layouts e a configuração de componentes para se ajustarem de acordo com a tela demandou um tempo considerável e um pouco de pesquisa.

- Estruturação e Reutilização de Código: Percebi que a organização e a modularização dos componentes e das páginas poderiam ter sido melhor planejadas. Em algumas partes do código, houve repetição desnecessária, e essas áreas poderiam ter sido refatoradas para promover uma melhor reutilização de componentes e uma estrutura mais limpa e eficiente.

### 5. Instruções para instalação e execução
<!-- Descrever o que deve ser feito para instalar (ou baixar) a aplicação, o que precisa ser configurando (parâmetros, banco de dados e afins) e como executá-la. -->
- Instruções para rodar o backend do projeto estão disponíveis [aqui](aplicacao/server/README.md).
- Instruções para rodar o frontend do projeto estão disponíveis [aqui](aplicacao/web/README.md).

### 6. Referências
<!-- Referências podem ser incluídas, caso necessário. Utilize o padrão ABNT. -->
- REACT. React documentation. Disponível em: https://reactjs.org/docs/getting-started.html. 

- NEXT.JS. Next.js documentation. Disponível em: https://nextjs.org/docs.

- TYPESCRIPT. TypeScript documentation. Disponível em: https://www.typescriptlang.org/docs/.

- TAILWIND CSS. Tailwind CSS documentation. Disponível em: https://tailwindcss.com/docs.

- PEEWEE ORM. Peewee documentation. Disponível em: http://docs.peewee-orm.com/en/latest/.

- FLASK. Flask documentation. Disponível em: https://flask.palletsprojects.com/en/2.0.x/.

- DAY.JS. Day.js documentation. Disponível em: https://day.js.org/docs/en/installation/installation.

- REACT CALENDAR. React Calendar documentation. Disponível em: https://www.npmjs.com/package/react-calendar.
