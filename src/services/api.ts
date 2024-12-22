import { invoke } from '@tauri-apps/api/tauri';

export const api = {
  async getContainers() {
    return await invoke('get_containers');
  }
};