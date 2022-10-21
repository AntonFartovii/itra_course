
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


export const getFilePath = (url, filename) => {
    const __filename = fileURLToPath(url)
    const __dirname = dirname(__filename)
    const filePath = join(__dirname, filename)
    // console.log( 'filePath: ', filePath )
    return filePath
}


export const getDirname = ( url ) => {
    const __filename = fileURLToPath(url)
    const __dirname = dirname(__filename)
    // console.log( '__dirname: ', __dirname )
    return __dirname
}
