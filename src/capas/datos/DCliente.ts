import { Cliente } from "../../interfaces/system";
import { DatabaseJson } from "../../utils/database_json";

export class DCliente {
  private id: number;
  private nombre: string;
  private direccion: string;
  private gmail:string;
  private telefono: string;

  private database: DatabaseJson<Cliente>;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.direccion='';
    this.gmail='';
    this.telefono='';

    this.database = new DatabaseJson('cliente');
  }

  setData(data: Cliente): void {
    this.id = data.id;
    this.nombre = data.nombre;
    this.direccion = data.direccion;
    this.gmail = data.gmail;
    this.telefono = data.telefono;
  }

  save(): Cliente | undefined {
    const data: Cliente = {
      id: this.id,
      nombre: this.nombre,
      direccion:this.direccion,
      gmail:this.gmail,
      telefono:this.telefono,
    };

    return this.id == 0 ?
      this.database.insert(data) :
      this.database.update(data);
  }

  delete(id: number): boolean {
    return this.database.delete(id);
  }

  find(id: number): Cliente | undefined {
    return this.database.find(id);
  }

  list(): Cliente[] {
    return this.database.list();
  }
}