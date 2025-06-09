import { ipcMain } from 'electron';
import fs from 'fs/promises';

export default function registerRemovePhotoHandler() {
  ipcMain.handle('remove-photo', async (_event, imageUri: string) => {
    try {
      await fs.unlink(imageUri);
    } catch (error) {
      console.error('Failed to remove photo:', error);
    }
  });
}
