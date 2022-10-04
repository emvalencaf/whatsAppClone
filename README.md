# whatsAppClone

## Sobre o projeto
 
Projeto clone do WhatsApp desenvolvido durante o [curso de Javascript da Hcode](https://www.udemy.com/course/javascript-curso-completo/), segue o [repositório original do projeto](https://github.com/hcodebr/curso-javascript-projeto-whatsapp-clone).

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
- [x] Renderização da última mensagem.

### Observações

A renderização da última mensgem somente estará habilitada se o aplicativo for produzido no plano Blaze do firebase. Isto porque o plano stack (que é o plano gratuito) não dispõe do serviço cloud function.

Até certo nível de uso o serviço cloud function está disponível de forma gratuita para o plano Blaze, para saber a tabela de preço e o uso grautito [acesse aqui](https://firebase.google.com/pricing)
 
## Como usar
