import fetch from 'node-fetch';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type'

/**
 * Upload image to telegra.ph
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`s
 * @param {Buffer} buffer Image Buffer
 * @return {Promise<string>}
 */
export default async buffer => {
const { ext } = await fileTypeFromBuffer(buffer)
  let form = new FormData
  form.append('file', buffer, 'tmp.' + ext)
  let res = await fetch('https://telegra.ph/upload', {
    method: 'POST',
    body: form
  })
  let img = await res.json()
  if (img.error) throw img.error
  return 'https://telegra.ph' + img[0].src
}


/*

function UploadFile(media) {
  return new Promise(async (resolve, reject) => {
    let mime = await fileTypeFromBuffer(media);
    let form = new FormData();

    form.append('files[]', media, file-${Date.now()}.${mime.ext});

    let { data } = await axios
      .post('https://pomf.lain.la/upload.php', form, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
          ...form.getHeaders(),
        },
      })
      .catch(reject);

    resolve(data.files[0].url);
  });
}

*/