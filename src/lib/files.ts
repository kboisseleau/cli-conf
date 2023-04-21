import path, { basename } from 'path'
import { existsSync, readFileSync } from 'fs'

export class Files {

    public getCurrentDirectoryBase () {
        return basename(process.cwd())
      }

    public getGconfJson () {
        const pathGconfJson = path.join(process.cwd(), 'gconf.json')
        const gconf = JSON.parse(readFileSync(pathGconfJson, 'utf8')) as { token: string }
  
        return gconf
    }
    
    public directoryExists (filePath) {
        return existsSync(filePath)
    }
}