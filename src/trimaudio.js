const readline = require('readline');
var path = require("path")

const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

ffmpeg.setFfmpegPath(ffmpegPath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function TrimAudio() {
  rl.question('Insira o caminho do arquivo de audio: ', (audioPath) => {
    const file = audioPath;
    const extension = path.extname(audioPath);
    const outputfileName = 'trimmed-' + path.basename(audioPath,extension) + '.mp3'


    ffmpeg(file)
    .setStartTime(2) //Can be in "HH:MM:SS" format also
    .duration(10) 
      .output(`${__dirname}/audios/${outputfileName}`)
      .on("end", () => {
        process.stdout.write('\n');  // Pula para a próxima linha após o download ser concluído
        console.log(`Finished: ${`${__dirname}/audios/${outputfileName}`}`);
        rl.close();
      })
      .on('progress', progress => {
        process.stdout.clearLine();  // Limpa a última linha do console
        process.stdout.cursorTo(0);  // Move o cursor para o início da linha
        process.stdout.write(`Cutting....`);  // Escreve o novo log de progresso
      })
      .on("error", (error) => {
        console.log(error);
        rl.close();
      })
      .saveToFile(`${__dirname}/audios/${outputfileName}`)
      
  });
}


module.exports = TrimAudio



