import { Vendedor } from "../../interfaces/system";
import { DatabaseJson } from "../../utils/database_json";

export class DVendedor {
  private id: number;
  private nombre: string;
  private direccion: string;
  private gmail:string;
  private telefono: string;
  private nivel:string;
  private porcentaje:number;
  private reclutador_id:number | undefined;

  private database: DatabaseJson<Vendedor>;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.direccion='';
    this.gmail='';
    this.telefono='';
    this.nivel='';
    this.porcentaje=0;
    this.reclutador_id=0;

    this.database = new DatabaseJson('vendedor');
  }

  setData(data: Vendedor): void {
    this.id = data.id;
    this.nombre = data.nombre;
    this.direccion = data.direccion;
    this.gmail = data.gmail;
    this.telefono = data.telefono;
    this.nivel = data.nivel;
    this.porcentaje = data.porcentaje;
    this.reclutador_id = data.reclutador_id;
  }

  save(): Vendedor | undefined {
    const data: Vendedor = {
      id: this.id,
      nombre: this.nombre,
      direccion:this.direccion,
      gmail:this.gmail,
      telefono:this.telefono,
      nivel:this.nivel,
      porcentaje:this.porcentaje,
      reclutador_id:this.reclutador_id,
    };

    return this.id == 0 ?
      this.database.insert(data) :
      this.database.update(data);
  }

  delete(id: number): boolean {
    return this.database.delete(id);
  }

  find(id: number): Vendedor | undefined {
    return this.database.find(id);
  }

  list(): Vendedor[] {
    return this.database.list();
  }
}