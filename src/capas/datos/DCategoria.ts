import { Categoria } from "../../interfaces/system";
import { DatabaseJson } from "../../utils/database_json";

export class DCategoria {
  private id: number;
  private nombre: string;

  private database: DatabaseJson<Categoria>;

  constructor() {
    this.id = 0;
    this.nombre = '';

    this.database = new DatabaseJson('categoria');
  }

  setData(data: Categoria): void {
    this.id = data.id;
    this.nombre = data.nombre;
  }

  save(): Categoria | undefined {
    const data: Categoria = {
      id: this.id,
      nombre: this.nombre,
    };

    return this.id == 0 ?
      this.database.insert(data) :
      this.database.update(data);
  }

  delete(id: number): boolean {
    return this.database.delete(id);
  }

  find(id: number): Categoria | undefined {
    return this.database.find(id);
  }

  list(): Categoria[] {
    return this.database.list();
  }
}