const DownloadYoutubeVideo = require('./src/downloadyoutubevideo')
const ConvertVideoToAudio = require('./src/convertvideotoaudio')
const TrimAudio = require('./src/trimaudio')

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('Insira a opção desejada: \n 1 - Baixar video do Youtube \n 2 - Extrair áudio de um vídeo baixado  ', (option) => {
  
  if (option === "1") {
    DownloadYoutubeVideo()
  } else if (option === "2") {
    ConvertVideoToAudio()
  } 
 
});
