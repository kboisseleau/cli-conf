import path, { basename } from 'path';
import { existsSync, readFileSync } from 'fs';
export class Files {
    getCurrentDirectoryBase() {
        return basename(process.cwd());
    }
    getGconfJson() {
        const pathGconfJson = path.join(process.cwd(), 'gconf.json');
        const gconf = JSON.parse(readFileSync(pathGconfJson, 'utf8'));
        return gconf;
    }
    directoryExists(filePath) {
        return existsSync(filePath);
    }
}
//# sourceMappingURL=files.js.map