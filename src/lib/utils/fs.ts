import { readTextFile, exists, createDir, removeDir, readDir, writeTextFile } from '@tauri-apps/api/fs'
import { BaseDirectory } from '@tauri-apps/api/path'

export class JSONFS {
  private path!: string;
  constructor(path: string) {
    this.path = `App/${path}`;
    this.init();
  }

  async init(): Promise<void> {
    const isExists = await exists(this.path, { dir: BaseDirectory.Resource }) as unknown as Boolean
    if (!isExists) {
      await createDir(this.path, { dir: BaseDirectory.Resource, recursive: true })
    }
  }
  
  async read<T>(): Promise<T> {
    let result = null
    try {
      result = await readTextFile(this.path, { dir: BaseDirectory.Resource })
      result = JSON.parse(result)
    } catch(e) {
      console.log('read file failed: ',e);
    }
    console.log('read result: ', result);
    return result
  }

  async write(content: string): Promise<void> {
    await writeTextFile(this.path, content, { dir: BaseDirectory.Resource })
  }
}


// TODO:检测缓存大小
export async function checkCacheSize(): Promise<void> {
  const res = await readDir('App', { dir: BaseDirectory.Resource, recursive: true })
  console.log('res: ', res);
}

/**
 * 清空缓存
 */
export async function clearCache(): Promise<Boolean> {
  try {
    await removeDir('App/cache', { dir: BaseDirectory.Resource, recursive: true })
    return true
  } catch (e) {
    console.warn('remove err:', e);
    return false
  }
}