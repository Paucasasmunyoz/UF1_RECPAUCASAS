const express = require('express');
const cors = require("cors")
const fs = require("fs");
const path = require('path');
const paths= require('node:path')
const app = express();
app.use(express.json(),cors());
port = 3080;
app.listen(port, () => {
  console.log(`Port::${port}`);
});

app.post('/ex1', (req, res) => {
  const carpetaImatges = path.join(__dirname, 'src\\UF1_ExamenAaD\\UF1_ExamenAaD\\Imatges');
  const tamanoBloque = 8192;

  fs.readdir(carpetaImatges, (error, archivos) => {
    if (error) {
      console.error('Error al leer la carpeta de imágenes:', error);
      return;
    }

    const imagenes = archivos.filter(archivo => path.extname(archivo) === '.jpg');

    imagenes.forEach(imagen => {
      const rutaImagen = path.join(carpetaImatges, imagen);
      const streamLectura = fs.createReadStream(rutaImagen, { highWaterMark: tamanoBloque });

      console.log('Nombre de la imagen:', imagen);

      streamLectura.on('data', chunk => {
        console.log('Buffer leído:', chunk);
      });

      streamLectura.on('end', () => {
        console.log('Lectura finalizada');
      });

      streamLectura.on('error', error => {
        console.error('Error en el flujo de lectura:', error);
      });
    });
  });
});

app.post('/ex3', (req, res) => {
  const origenFilePath = path.join(__dirname, 'src\\UF1_ExamenAaD\\UF1_ExamenAaD\\Documents\\FitxerOrigen.txt');
  const pauFilePath = path.join(__dirname, 'src\\UF1_ExamenAaD\\UF1_ExamenAaD\\Documents\\FitxerPau.txt');
  const destiFilePath = path.join(__dirname, 'src\\UF1_ExamenAaD\\UF1_ExamenAaD\\Documents\\Docs1\\FitxerDesti.txt');


  const contenidoOrigen = fs.readFileSync(origenFilePath, 'utf8');

  if (fs.existsSync(destiFilePath)) {
    const contenidoDesti = fs.readFileSync(destiFilePath, 'utf8');

    const contenidoConcatenado = contenidoDesti + contenidoOrigen + fs.readFileSync(pauFilePath, 'utf8');

    fs.writeFileSync(destiFilePath, contenidoConcatenado);
  } else {
    fs.writeFileSync(destiFilePath, contenidoOrigen + fs.readFileSync(pauFilePath, 'utf8'));
  }

  console.log('Fet');
});

app.get('/ex4', (req, res) => {
  const folderPath = path.join(__dirname, 'src/UF1_REC_PAU_CASAS');
  const fileName = 'RECUpaucasas.txt';
  const dni = '41676242N';
  const filePath = path.join(folderPath, fileName);

  if (fs.existsSync(filePath)) {
    console.log('Ja existeix pallús!');
    res.sendStatus(200);
  } else {
    fs.writeFile(filePath, dni, (err) => {
      if (err) {
        console.error('S\'ha produït un error en crear el fitxer:', err);
        res.status(500).send('S\'ha produït un error en crear el fitxer.');
        return;
      }
      console.log('Fitxer creat correctament.');
      res.sendStatus(200);
    });
  }
});

app.get('/fitxers', (req, res) => {
  const folderPath = path.join(__dirname, 'src/UF1_REC_PAU_CASAS');

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('S\'ha produït un error en llegir els fitxers:', err);
      res.status(500).send('S\'ha produït un error en llegir els fitxers.');
      return;
    }
    console.log('Fitxers existents:', files);
    res.send(files);
  });
});

