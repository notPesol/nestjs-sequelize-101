import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class FileService {
  async saveFile(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    console.log(__dirname);
    
    const filePath = path.join(__dirname, '..','..' , 'files', folderName, fileName);

    await fs.writeFile(filePath, file.buffer);

    return fileName;
  }
}
