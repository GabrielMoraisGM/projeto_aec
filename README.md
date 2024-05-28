# Teste para desenvolvedor backend AeC

#### Notas do desenvolvedor:

- O projeto não está finalizado e ainda precisa de diversos reviews para entregar o solicitado, porém levando em conta que foram apenas 2 dias de desenvolvimento, considerei realizar a demonstração agora. 

#### Orientações gerais:
- O arquivo que realiza a configuração geral de portas e endereços de IP do backend é o `.env`. Para que o software rode em outra máquina, basta alterar as variáveis de ambiente.
  - Local: `api-ts/.env`


- Após configurar as variáveis, basta executar o comando "npm run typeorm:migrate" para que a migration seja executada e as tabelas sejam criadas no banco de dados.

- execução do backend: 'npm start'

- A pasta "front-end" contém outro projeto isolado onde estava sendo desenvolvida a interface para integrar ao backend. Para executá-lo, não requer nenhuma configuração de variáveis de ambiente.
- execução: 'npm run dev'

- Apesar de não ser necessário nenhuma configuração para executar o front-end, o projeto está longe de ser finalizado então deixarei as rotas para que possa navegar pelo que foi desenvolvido até agora.

ROTA: `http://localhost:8173/`
<br>
Função: Cadastrar e validar o usuário
<br>
Pendencia: Armazenar o token e criar o controle de acesso para as proximas rotas.

ROTA: `http://localhost:8173/App`
<br>
Função: Pagina principal
<br>
Pendencia: Servir de hub para navegação da página

ROTA: `http://localhost:5173/AddressCreate`
<br>
Função: Página para cadastrar endereço
<br>
Pendencia: criar a interação com os demais endpoints

ROTA: `http://localhost:5173/addressSearch`
<br>
Função: Pesquisa por id e listagem de endereços
<br>
Pendencia: criar a interação com os demais endpoints

<h1>Endpoints /users</h1>

### Listagem de usuários cadastrados no banco de dados

- **Endereço**: `https://localhost:3000/users/user`
- **Função**: Listar todos os users cadastrados no DB
- **Método**: GET
- **Parâmetros**: Não requer nenhum parâmetro

<br>
<br>

- **Endereço**: `https://localhost:3000/users/`
- **Função**: Realizar consulta com base no ID
- **Método**: GET
- **Parâmetros**: ID via URL encoded

### Criação e gerenciamento de usuários

- **Endereço**: `https://localhost:3000/users/create`
- **Função**: Cadastrar usuário no DB
- **Método**: POST
- **Parâmetros**: Requer um JSON

```json
{
    "user": string,
    "password": string
}
```

<br>
<br>

- **Endereço**: `https://localhost:3000/users/update`
- **Função**: Atualizar usuário com base no ID
- **Método**: PATCH
- **Parâmetros**: Requer um JSON

```json
{
    "id": number,
    "user": string,
    "password": string
}
```

<br>
<br>

- **Endereço**: `https://localhost:3000/users/delete`
- **Função**: Deleta usuário com base no ID
- **Método**: PATCH
- **Parâmetros**: Requer um JSON

```json
{
    "id": number,
}
```

<br>
<br>

- **Endereço**: `https://localhost:3000/users/user/login`
- **Função**: Valida se os dados do usuário correspondem ao cadastrado no BD.
- **Método**: POST
- **Parâmetros**: Requer um JSON
```json
{
    "user": string,
    "password": string
}
```

<br>
<br>

<h1>Endpoints /address</h1>

### Listagem de endereços cadastrados no banco de dados

- **Endereço**: `https://localhost:3000/address/`
- **Função**: Listar todos os users cadastrados no DB
- **Método**: GET
- **Parâmetros**: Não requer nenhum parâmetro

<br>
<br>

- **Endereço**: `https://localhost:3000/address/`
- **Função**: Realizar consulta com base no ID
- **Método**: GET
- **Parâmetros**: ID via URL encoded

<br>
<br>

- **Endereço**: `https://localhost:3000/address/csv`
- **Função**: Realizar consulta de todos os endereços cadastrados no BD e retorna um arquivo CSV
- **Método**: GET
- **Parâmetros**: Não requer nenhum parâmetro

<br>
<br>

### Criação e gerenciamento de endereços

- **Endereço**: `https://localhost:3000/address/create`
- **Função**: Valida se os dados do usuário correspondem ao cadastrado no BD.
- **Método**: POST
- **Parâmetros**: Requer um JSON
```json
{
    "zipCode": string,
    "street": null,
    "number": number,
    "complement": string,
    "neighborhood": null,
    "city": null,
    "state": null
}
```

<br>
<br>

- **Endereço**: `https://localhost:3000/address/update`
- **Função**: Atualizar o endereço com base no ID
- **Método**: PATCH
- **Parâmetros**: Requer um JSON
```json
{
    "id": number,
    "zipCode": string,
    "street": string,
    "number": number,
    "complement": string,
    "neighborhood": string,
    "city": string,
    "state": string
}
```

<br>
<br>

- **Endereço**: `https://localhost:3000/address/delete`
- **Função**: Deletar o endereço com base no ID
- **Método**: DELETE
- **Parâmetros**: Requer um JSON
```json
{
    "id": number,
}
```

<h1>STACKS</h1>
<h4>Tecnologias utilizadas (backend):</h4>
<li>Postgress (BD)</li>
<li>Typescript</li>
<li>Typeorm (versionamento, mapeamento e querys ao DB)</li>
<li>Express (servidor web)</li>
<li>Bcrypt (criptografia da senha)</li>
<li>Jwt (gerar o token para o frontend)</li>

<h4>Tecnologias utilizadas (frontend):</h4>
<li>Vite (framework front end)</li>
<li>TypeScript</li>
