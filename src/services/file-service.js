import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'


export const bufferFromStream = (stream, maxSize) => {
    const buff = []
    let maxLength = 0

    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => {
            buff.push(chunk)
            maxLength += chunk.length
            if (maxLength > maxSize) {
                stream.destroy()
                reject(`File is too big, maximum filesize in ${maxSize / 1000} kb`)
            }
        })
        stream.on('end', () => resolve(Buffer.concat(buff)))
        stream.on('err', (err) => reject(err))
    })
}

export const createFile = async (folderPath, buffer, extension) => {
    const filename = uuidv4() + "." + extension
    const filepath = folderPath + "/" + filename
    if (fs.existsSync(filepath)) return { __typename: "Error", message: "Filename collision! please try one more time" }

    await fs.writeFileSync(filename, buffer)

    return { __typename: "Success", filepath, filename }
}