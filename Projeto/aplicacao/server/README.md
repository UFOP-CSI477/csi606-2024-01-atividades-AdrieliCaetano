# Backend - Server

## Ferramentas e tecnologias utilizadas
- Python
- Flask 
- Peewee (ORM)
- PostgreSQL 

## Instruções para rodar o backend 
### Pré-requisitos 
1. **Python**: Certifique-se de que o Python (3.6 ou superior) esteja instalado. Você pode verificar a instalação com:

   ```bash
    python --version
    ```
3. **PostgreSQL**: Você deve ter o PostgreSQL instalado e em execução.

### Criar Banco de Dados no PostgreSQL 
1. Acesse o PostgreSQL
2. Crie um novo banco de dados: 
    ```bash
    CREATE DATABASE sa-web
    ```
3. Crie um usuário (opcional): 
    ```bash 
    CREATE USER seu_usuario WITH PASSWORD sua_senha;
    ``` 
    Substitua `seu_usuario` e `sua_senha` conforme desejado. 

4. Dê permissão ao usuário para acessar o banco de dados: 
    ```bash 
    GRANT ALL PRIVILEGES ON DATABASE nome_do_banco TO seu_usuario;
    ```
 ### Configurar o Backend 
1. Altere o arquivo `config.py`:
    ```bash 
    POSTGRES = { 
    'database': 'nome_do_banco',
    'user': 'seu_usuario',
    'password': 'sua_senha',
    'host': 'localhost',
    'port': 5432 
    }
    ```
    Substitua os valores conforme suas configurações do PostgreSQL. 

### Instalar Dependências
1. Crie um ambiente virtual (opcional):
    ```bash 
    python -m venv venv 
    source venv/bin/activate # Linux/Mac
    venv\Scripts\activate # Windows`
    ```
2. Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```
### Rodar o Backend 
1.  No diretório do projeto onde está localizado o arquivo `app.py`, execute o seguinte comando no terminal ou prompt de comando:

     ```bash
     python app.py
     ```
    Isso iniciará o servidor Flask.
    
2. O servidor deve estar rodando em [http://127.0.0.1:5000/](http://127.0.0.1:5000/). Você pode testar as rotas usando ferramentas como Postman ou cURL.



