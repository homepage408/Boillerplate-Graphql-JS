import { GraphQLScalarType } from 'graphql'
import * as FileService from '../../services/file-service'

export const ImageFile = new GraphQLScalarType({
    name: "ImageFile",
    description: "An Image File, format includes .jpg, .jpeg & .png. maximum filesize is 5MB",
    async parseValue(value) {
        try {
            const { mimetype, createReadStream } = await value
            if (!['image/jpeg', 'image/png'].includes(mimetype)) throw ('File is not an Image file')
            const maxFileSize = 5000 * 1000
            const buffer = await FileService.bufferFromStream(createReadStream(), maxFileSize);

            return { buffer }
        } catch (err) {
            return { err }
        }
    }
})

export default {
    ImageFile: ImageFile
}