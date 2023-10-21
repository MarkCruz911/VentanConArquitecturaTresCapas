/**
 * @author marcocruz
 * @mail markcruz9111@gmail.com
 * @github https://github.com/MarkCruz911
 */
export class DatabaseJson<T> {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName
  }
  
  save(data: any): T| undefined {
    return data.id == 0 ? this.insert(data) : this.update(data);
  }

  insert(data: T): T {
    let rows = this._readFileJson();
    const dataTemp = { ...data, id: Date.now() + Math.floor(Math.random() * Date.now()) };
    rows.push(dataTemp);
    this._writeFileJson(rows);
    return dataTemp;
  }

  update(data: any): T | undefined {
    const rows = this._readFileJson();
    let dataIndex = rows.findIndex(item => item.id == data.id);
    if (dataIndex == -1)
      return undefined;

    rows[dataIndex] = { ...data };
    this._writeFileJson(rows);
    return data;
  }

  delete(id: number): boolean {
    const rows = this._readFileJson();
    const newRows = rows.filter(item => item.id != id);

    this._writeFileJson(newRows);
    return newRows.length != rows.length;
  }

  find(id: number): T | undefined {
    const rows = this._readFileJson();
    return rows.find(item => item.id == id);
  }

  list(): T[] {
    return this._readFileJson() as T[];
  }

  _readFileJson(): any[] {
    const fileContent = localStorage.getItem(this.tableName) || '[]';
    return JSON.parse(fileContent) as any[];
  }

  _writeFileJson(data: any): void {
    const rows = JSON.stringify(data)
    localStorage.setItem(this.tableName, rows)
  }
}