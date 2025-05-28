# 🏋️‍♂️ gymAPP – Aplicativo Pessoal para Anotar Treinos

## 📌 Descrição

**gymAPP** é um aplicativo pessoal desenvolvido com **React Native + Expo** para registrar e acompanhar seus treinos de forma simples e prática. Com ele, você pode organizar seus tipos de treino (como Peito, Costas, Pernas), adicionar exercícios, configurar séries e repetições, marcar como concluído e manter o histórico do seu progresso.

O backend utiliza **Node.js + Express + Prisma** com banco de dados **SQLite**, ideal para uso local e leve.

---

## 🧱 Tecnologias Utilizadas

### ✅ Frontend (Mobile)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Gluestack UI](https://gluestack.io/) (Design System)
- [react-native-draggable-flatlist](https://github.com/computerjazz/react-native-draggable-flatlist)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-circular-progress](https://github.com/bartgryszko/react-native-circular-progress)

### ✅ Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [TypeScript](https://www.typescriptlang.org/)


## 💾 Estrutura do Banco (Prisma)

prisma
model TypeTrainning {
  id     Int        @id @default(autoincrement())
  type   String     @unique
  trainning Trainning[]
}

model Trainning {
  id               Int     @id @default(autoincrement())
  order            Int
  exercise         String
  series           Int
  quantity         Int
  typeTrainningId  Int
  typeTrainning    TypeTrainning @relation(fields: [typeTrainningId], references: [id])
  subType          String
  state            Boolean @default(false)
}

model Exercises {
  id   Int    @id @default(autoincrement())
  name String
}

## 📲 Funcionalidades

### Criar e listar tipos de treino

### Adicionar exercícios com ordem, série e repetições

### Atualizar dados de exercícios individualmente ou em lote

### Marcar exercícios como concluídos

### Resetar o progresso de treino


## ⚙️ Como Rodar o Projeto
### 🔧 Pré-requisitos

#### Node.js instalado

#### Expo CLI instalado (npm install -g expo-cli)

#### Git instalado

### 🚀 Backend (Express + Prisma)

#### Clone o repositório e acesse a pasta:

#### git clone https://github.com/seu-usuario/gymAPP.git
####  cd gymAPP

#### Instale as dependências:

#### npm install

#### Configure o banco de dados:

#### npx prisma generate
#### npx prisma migrate dev --name init

#### Inicie o servidor:

#### npx ts-node src/index.ts
#### ou com nodemon
#### npx nodemon src/index.ts

#### O backend estará disponível em http://localhost:3000.
### 📱 Frontend (React Native + Expo)

#### Instale as dependências:

#### npm install

#### Inicie o app:

#### npm run android   # Para Android
#### npm run ios       # Para iOS (macOS)
#### npm run web       # Versão web (opcional)

#### (Opcional) Configure o IP do backend:

Caso esteja testando em um celular físico, altere o baseURL das requisições no frontend para apontar para o IP da sua máquina, por exemplo:

'http://192.168.0.10:3000'; // IP da máquina



# 👨‍💻 Autor: 

## Desenvolvido por Douglas de Carvalho Gemir como projeto pessoal para controle de treinos.
