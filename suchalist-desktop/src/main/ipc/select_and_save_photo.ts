import { app, dialog, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export function registerSelectAndSavePhotoHandler() {
  ipcMain.handle('select-and-save-photo', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }]
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    const selectedPath = result.filePaths[0];
    const ext = path.extname(selectedPath);
    const id = uuidv4();
    const appDataDir = path.join(app.getPath('userData'), 'images');

    // Create app image directory if it doesn't exist
    if (!fs.existsSync(appDataDir)) {
      fs.mkdirSync(appDataDir, { recursive: true });
    }

    const destPath = path.join(appDataDir, `${id}${ext}`);

    // Copy the file to app storage
    fs.copyFileSync(selectedPath, destPath);

    return destPath;
  });
}
