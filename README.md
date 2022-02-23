### Desenvolvido por: Marcos Maverick


---

## Tecnologias usadas
[ReactJS](https://pt-br.reactjs.org/) / 
[NextJS](https://nextjs.org/)<br>
[Typescript](https://www.typescriptlang.org/)<br>
[Next Router](https://nextjs.org/docs/api-reference/next/router#userouter)<br>
[ChakraUI](https://chakra-ui.com/)<br>


---

## 📁 Estrutura das páginas de Componentes


 AlertDialog : Componente responsável por aparecer um alert na tela no caso de um sucesso, erro na hora de cadastrar o Fornecedor <br><br>
 Input: Mascaras do formulário <br><br>
 ModalForm: Toda parte de criação do Fornecedor fica nesse componente<br><br>
 Sidebar: Nessa pasta fica toda estrutura da SideBar<br><br>
 Toast: Nesse componente fica o toast de confirmação para deleção do Fornecedor<br><br>


## Como instalar e rodar o projeto

Para instalar o projeto basta digitar:
```bash
npm install
# ou
yarn
```
Para rodar o projeto: 

Precisa ter certeza de que tem um banco de dados configurado na sua maquina.

### Editar o arquivo .env e colocar as credenciais do seu DB
- Dababase usado: PostgreSQL
- ORM usado: Prisma
```
DATABASE_URL="postgresql://db:dbpassword@localhost:5432/dbname?schema=public"
```

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador após iniciar o projeto.


## Bibliotecas

- [React-icon](https://react-icons.github.io/react-icons/) 
- [React-hook-form](https://react-hook-form.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [react-modal](https://www.npmjs.com/package/react-modal)



### Next Router
 - Como nossa aplicação tem algumas funcionalidade de navegação, decidir usar o next/router por conta de sua flexbilidade e usabilidade simples.
### ChrakraUI
- Com propósito de facilitar criação de Divs, e organizar o CSS de maneira mais simples.
### Axios
- Para consumir API foi escolhido o axios por puro costume com a ferramenta. Porém.
### React-hook-form
- Por se tratar de uma biblioteca robusta e com nivel de praticidade elevada, ela nos deixa preocupar somente com o form deixando toda parte de validação e estrutura toda pronta. Além de ser uma ótima alida por conta dos Hooks.