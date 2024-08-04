import DataUriParser from "datauri/parser.js";
import path from 'path';

export const getDataUri = (file) => {
    const parser = new DataUriParser();
    const dataUri = parser.format(path.extname(file?.originalname).toString(), file.buffer);
    return dataUri;
}