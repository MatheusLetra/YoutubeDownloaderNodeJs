const readline = require('readline');
var path = require("path")

const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

ffmpeg.setFfmpegPath(ffmpegPath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ConvertVideoToAudio() {
  rl.question('Insira o caminho do arquivo de video: ', (videoPath) => {
    const file = videoPath;
    const extension = path.extname(videoPath);
    const outputfileName = path.basename(videoPath,extension) + '.mp3'


    let totalTime = 0;

    ffmpeg(file)
      .toFormat("mp3")
      .on("end", () => {
        process.stdout.write('\n');  // Pula para a próxima linha após o download ser concluído
        console.log(`Finished: ${`${__dirname}/audios/${outputfileName}`}`);
        rl.close();
      })
      .on('codecData', data => {
        // HERE YOU GET THE TOTAL TIME
        totalTime = parseInt(data.duration.replace(/:/g, ''))
      })
      .on('progress', progress => {
        // HERE IS THE CURRENT TIME
        const time = parseInt(progress.timemark.replace(/:/g, ''))

        // AND HERE IS THE CALCULATION
        const percent = (time / totalTime) * 100

        process.stdout.clearLine();  // Limpa a última linha do console
        process.stdout.cursorTo(0);  // Move o cursor para o início da linha
        process.stdout.write(`Converting ${percent.toFixed(2)}%`);  // Escreve o novo log de progresso
      })
      .on("error", (error) => {
        console.log(error);
        rl.close();
      })
      .saveToFile(`${__dirname}/audios/${outputfileName}`);
  });
}


module.exports = ConvertVideoToAudio



