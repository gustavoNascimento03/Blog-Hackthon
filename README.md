# 🏫 Escola App - Front-End

Este é o front-end do projeto **Escola App**, uma plataforma de comunicação e engajamento escolar desenvolvida com React e Vite. O sistema conta com feed de notícias, perfis personalizados, sistema de convites para professores e uma experiência gamificada para os alunos.

## 🚀 Tecnologias Utilizadas

- **React + Vite**: Ambiente de desenvolvimento rápido e moderno.
- **Tailwind CSS**: Estilização baseada em utilitários para uma interface limpa e responsiva.
- **Lucide React**: Biblioteca de ícones elegantes.
- **Axios**: Cliente HTTP para comunicação com a API.
- **React Router Dom**: Gerenciamento de rotas dinâmicas.

---

## 🎮 Funcionalidades Principais

### Para Alunos 🎓

- **Feed de Notícias**: Acompanhe avisos, materiais de aula e eventos.
- **Gamificação (XP)**: Ganhe **10 XP** ao ler uma publicação pela primeira vez.
- **Ranking**: Dispute o topo do pódio com outros alunos baseado no seu engajamento.
- **Perfil**: Personalize seus dados e altere sua senha de acesso.

### Para Professores 👨‍🏫

- **Gestão de Conteúdo**: Criar, editar e excluir publicações no feed.
- **Convites**: Cadastrar novos alunos ou professores diretamente pela plataforma.
- **Acesso Administrativo**: Visualizar o ranking e monitorar o engajamento.

---

## 🛠️ Configuração e Instalação

### Pré-requisitos

- Node.js instalado ou Docker Desktop.

### Instalação Manual

1.  Clone o repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure o arquivo `src/services/api.js` para apontar para a URL do seu backend (ex: `http://localhost:3000`).
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

### Via Docker

Se estiver usando o ambiente completo com Docker Compose:

```bash
docker compose up --build
```
