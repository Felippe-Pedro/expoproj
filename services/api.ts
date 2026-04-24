import axios from "axios"; // npm install axios
// import * as SecureStore from 'expo-secure-store';
// import { router } from 'expo-router';

// 1. Criar a instância base
const api = axios.create({
  baseURL: "https://prtctec.com.br/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 segundos
});

// 2. Interceptor de REQUISIÇÃO (Request)
// Injeta o token do Sanctum antes de cada chamada
// api.interceptors.request.use(
//   async (config) => {
//     const token = await SecureStore.getItemAsync('user_token');

//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 3. Interceptor de RESPOSTA (Response)
// Trata erros globais, como expiração de token
// api.interceptors.response.use(
//   (response) => response, // Se a resposta for 200-299, apenas retorna
//   async (error) => {
//     // Se o backend retornar 401 (Unauthorized)
//     if (error.response && error.response.status === 401) {
//       console.log('Token expirado ou inválido. Redirecionando...');

//       // Limpa o token e os dados locais
//       await SecureStore.deleteItemAsync('user_token');

//       // Redireciona para a tela de login (usando Expo Router)
//       // O replace evita que o usuário consiga voltar para a tela restrita
//       router.replace('/(auth)/login');
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
