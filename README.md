```markdown
# 🎨 Pintura App

Aplicativo mobile para orçamentos e gestão de serviços de pintura, desenvolvido com React Native, Expo e Firebase.

---

## 📱 Visão Geral

O **Pintura App** foi criado para facilitar o controle de serviços de pintura, focando em funcionalidades como:

- Registro de orçamentos de pintura
- Visualização de dados centralizados
- Integração com Firebase para autenticação e armazenamento
- Interface moderna e responsiva com Tailwind CSS e NativeWind

---

## 🚀 Funcionalidades

- ✅ Tela de login integrada ao Firebase Authentication
- ✅ Cadastro e visualização de orçamentos de pintura
- ✅ Navegação por stack com React Navigation
- ✅ Animações com Lottie
- ✅ Estilização via Tailwind + NativeWind
- ✅ Suporte a múltiplas telas no app

---

## 🧱 Estrutura do Projeto

```bash
pintura-app/
├── components/
│   ├── navigation/
│   │   └── StackNavigation.tsx         # Rotas do app
│   ├── screens/
│   │   ├── HomeScreen.tsx              # Tela inicial
│   │   ├── LoginScreen.tsx             # Tela de login
│   │   └── PaintModule/                # Módulo de pintura
│   │       ├── PaintHome.tsx
│   │       ├── BudgetScreen.tsx
│   │       └── CreateBudget.tsx
│   └── utils/animations.ts             # Utilitários visuais
├── services/
│   ├── firebaseConfig.ts               # Configuração Firebase
│   └── firebaseFunctions.ts            # Funções de integração
├── assets/                             # Ícones, splash, etc.
├── App.tsx                             # Arquivo principal
├── global.css                          # Estilos globais
├── tailwind.config.js                  # Config Tailwind
├── app.json / eas.json                 # Configurações Expo
└── package.json                        # Dependências do projeto
```

---

## 🛠️ Tecnologias Usadas

- React Native
- Expo
- Firebase (Auth e Firestore)
- React Navigation
- Tailwind CSS + NativeWind
- Lottie React Native

---

## ⚙️ Instalação e Execução

### Pré-requisitos

- Node.js v16+
- Expo CLI (`npm install -g expo-cli`)

### Rodando o projeto

```bash
# Clonar o repositório
git clone https://github.com/codariadev/pintura-app.git
cd pintura-app

# Instalar dependências
npm install

# Rodar o app
npx expo start
```

> O app será aberto no navegador e poderá ser executado no Expo Go (Android/iOS).

---

## 🔐 Configuração do Firebase

Edite o arquivo `services/firebaseConfig.ts` com suas credenciais do Firebase:

```ts
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO",
  projectId: "SEU_PROJECT_ID",
  ...
};
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o repositório
2. Crie sua branch (`git checkout -b feature/sua-feature`)
3. Commit suas mudanças (`git commit -m 'feat: nova feature'`)
4. Push (`git push origin feature/sua-feature`)
5. Crie um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a MIT License.

---

## 👨‍💻 Autor


Previews:

![Image](https://github.com/user-attachments/assets/1a7c367d-890a-4b7c-9500-5d0cba142699)
![Image](https://github.com/user-attachments/assets/5da34aff-5982-475b-8e16-ba47f06b5937)
![Image](https://github.com/user-attachments/assets/b9ca7b77-9a29-4fbe-8738-5f1c22fcedb2)
![Image](https://github.com/user-attachments/assets/73f1c6af-b44e-4f36-9af5-2aa5876a0b42)


Desenvolvido por [codariadev](https://github.com/codariadev).
```
