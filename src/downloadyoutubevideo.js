const ytdl = require('ytdl-core');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function DownloadYoutubeVideo() {
  rl.question('Insira o ID do vídeo do YouTube: ', (videoId) => {
    // Get video info from YouTube
    ytdl.getInfo(videoId).then((info) => {
      // Select the video format and quality
      const format = ytdl.chooseFormat(info.formats, { quality: "highest" });

      // Create a write stream to save the video file
      const outputFilePath = `${__dirname}/videos/${info.videoDetails.title}.${format.container}`;

      console.log(outputFilePath)
      const outputStream = fs.createWriteStream(outputFilePath);

      let downloaded = 0;
      let totalSize = 0;

      // Get total size of the video
      for (let i = 0; i < info.formats.length; i++) {
        if (info.formats[i].url === format.url) {
          totalSize = info.formats[i].contentLength;
          break;
        }
      }

      // Download the video file
      const videoStream = ytdl.downloadFromInfo(info, { format: format });

      videoStream.on('progress', (chunkLength, downloadedBytes, totalBytes) => {
        downloaded += chunkLength;
        const percent = downloaded / totalSize * 100;
        process.stdout.clearLine();  // Limpa a última linha do console
        process.stdout.cursorTo(0);  // Move o cursor para o início da linha
        process.stdout.write(`Downloaded ${percent.toFixed(2)}%`);  // Escreve o novo log de progresso
      });

      videoStream.pipe(outputStream);

      // When the download is complete, show a message
      outputStream.on('finish', () => {
        process.stdout.write('\n');  // Pula para a próxima linha após o download ser concluído
        console.log(`Finished downloading: ${outputFilePath}`);
        rl.close();
      });

    }).catch((err) => {
      console.error(err);
      rl.close();
    });
  });
}


module.exports = DownloadYoutubeVideo



