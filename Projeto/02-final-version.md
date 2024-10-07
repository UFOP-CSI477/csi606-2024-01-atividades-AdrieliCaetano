# **CSI606-2021-02 - Remoto - Trabalho Final - Resultados**

## *Aluna(o): Adrieli ALexandre Caetano*

--------------

<!-- Este documento tem como objetivo apresentar o projeto desenvolvido, considerando o que foi definido na proposta e o produto final. -->

### Resumo

 Este trabalho visa desenvolver um sistema web para gestão de atividades avaliativas, onde o usuário pode cadastrar, visualizar e gerenciar suas disciplinas e atividades. O sistema permite a criação de usuários sem autenticação, e oferece funcionalidades para organizar atividades acadêmicas com base em disciplinas e prazos.

### 1. Funcionalidades implementadas
<!-- Descrever as funcionalidades que eram previstas e foram implementas. -->
- Criação, visualização, edição e exclusão de usuários
- Criação, edição e exclusão de discplinas
- Criação, edição e exclusão de atividades
- Visualização de disciplinas de um determinado usuário
- Visualização de atividades de um determinado usuário, com filtro de data e ordenadas com base na data (mais próximas primeiro) e no status de conclusão (atividades pendentes aparecem primeiro).
- Visualização do calendário mensal que marca os dias com atividades de um determinado usuário
- Visualização das atividades do dia selecionado no calendário de um determinado usuário

  Obs.: Como não foi considerado nem implementado a autenticação e login, foi adicionado um campo select para escolher o usuário e poder ver suas respectivas as atividades, disciplinas e o calendário.

### 2. Funcionalidades previstas e não implementadas
<!-- Descrever as funcionalidades que eram previstas e não foram implementas, apresentando uma breve justificativa do porquê elas não foram incluídas -->
Ainda falta implementar:
- Filtro de atividades por disciplina

### 3. Outras funcionalidades implementadas
<!-- Descrever as funcionalidades implementas além daquelas que foram previstas, caso se aplique.  -->

A ordenação de atividades por status de conclusão não estava prevista. A ideia de inserir essa funcionalidade surgiu depois, ao analisar e entender que quando uma pessoa conclui uma atividade, essa atividade deixa de ser uma prioridade para ela, podendo ser exibida após as atividades ainda pendentes.

### 4. Principais desafios e dificuldades
<!-- Descrever os principais desafios encontrados no desenvolvimento do trabalho, quais foram as dificuldades e como elas foram superadas e resolvidas. -->
### 5. Instruções para instalação e execução
<!-- Descrever o que deve ser feito para instalar (ou baixar) a aplicação, o que precisa ser configurando (parâmetros, banco de dados e afins) e como executá-la. -->
- Instruções para rodar o backend do projeto estão disponíveis [aqui](aplicacao/server/README.md).

### 6. Referências
<!-- Referências podem ser incluídas, caso necessário. Utilize o padrão ABNT. -->
