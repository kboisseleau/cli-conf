import { basename } from 'path';
import { existsSync } from 'fs';
export class Files {
    getCurrentDirectoryBase() {
        return basename(process.cwd());
    }
    directoryExists(filePath) {
        return existsSync(filePath);
    }
}
//# sourceMappingURL=files.js.map