# whatsAppClone

## Sobre o projeto
 
Projeto clone do WhatsApp desenvolvido sua parte Javascript durante o [curso de Javascript da Hcode](https://www.udemy.com/course/javascript-curso-completo/), segue o [repositório original do projeto](https://github.com/hcodebr/curso-javascript-projeto-whatsapp-clone).

O projeto foi desenvolvido para exercitar os conhecimentos de Programação Orientada ao Objeto (POO), requisições assíncronas e consumo de APIs (por exemplo: API nativa do Canvas de MediaDevices), modelo de projeto Model-View-Controller (MVC) e uso dos serviços do Firebase como banco de dados.

O banco de dados utilizado foi o firestore firebase, para armazenar os arquivos de mídia como: áudio, fotos e documentos; foi usado o serviço de núvem do storage firebase.

A conexão entre banco de dados (e núvem) foi feita diretamente no front-end, ao invés do back-end, da aplicação.

## Funcionalidades

- [x] Chat em real-time;
- [x] Mensagens com emojis (aplicado princípios similar aos richtext)
- [x] Autenticação de usuários pelo gmail;
- [x] Lista de contatos(pelo gmail);
- [x] Captura de fotos pela webcam e envio de fotos;
- [x] Captura de áudio pelo microfone e envio de áudio;
- [x] Envio de documentos (se documento pdf, renderizado a primeira página);
- [x] Envio de contato no chat;
- [x] Renderização da última mensagem;
- [x] Notificação de mensagens recebidas quando o whatsapp está em segundo plano.

### Observações

A renderização da última mensgem somente estará habilitada se o aplicativo for produzido no plano Blaze do firebase. Isto porque o plano stack (que é o plano gratuito) não dispõe do serviço cloud function.

Até certo nível de uso o serviço cloud function está disponível de forma gratuita para o plano Blaze, para saber a tabela de preço e o uso grautito [acesse aqui](https://firebase.google.com/pricing).
 
## Como usar

1. Abra o terminal na pasta do projeto e execute o comando: `npm install`;
2. Crie [um app no firebase](https://firebase.google.com/) e habilite seu aplicativo para os serviços [firestore firebase](https://firebase.google.com/docs/firestore/web/start) e [storage](https://firebase.google.com/docs/storage/web/start) seguindo [essas instruções](https://firebase.google.com/docs/storage/web/start);
3. Crie no diretório `public/src` o arquivo `config.js` e declare um objeto com as configurações do firebaseconfig, por exemplo (preencha todos os atributos de acordo com o firebaseConfig gerado para a sua aplicação):
```
    export const firebaseConfig = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    }
```
4. Por fim, execute o comando: `npm start`.

### Para renderizar a última mensagem

1. Modifique o plano da sua conta no firebase para o Blaze;
2. Abra o terminal na pasta do projeto e execute o comando: `firebase deploy --only functions`.