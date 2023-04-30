import path, { basename } from 'path'
import { existsSync, readFileSync } from 'fs'

export class Files {

    static getCurrentDirectoryBase () {
        return basename(process.cwd())
      }

      static getGconfJson () {
        const pathGconfJson = path.join(process.cwd(), 'gconf.json')
        const gconf = JSON.parse(readFileSync(pathGconfJson, 'utf8')) as { token: string }
  
        return gconf
    }
    
    static directoryExists (filePath) {
        return existsSync(filePath)
    }
}