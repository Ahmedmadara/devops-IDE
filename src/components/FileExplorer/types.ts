export interface FileSystemItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileSystemItem[];
  size?: number;
  lastModified?: Date;
  isModified?: boolean;
}

export interface FileOperation {
  type: 'rename' | 'delete' | 'move' | 'copy';
  sourcePath: string;
  targetPath?: string;
}