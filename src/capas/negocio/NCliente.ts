import { Cliente } from "../../interfaces/system";
import { DCliente } from "../datos/DCliente";

export class NCliente {
  private data: DCliente;

  constructor() {
    this.data = new DCliente();
  }

  setData(data: Cliente): void {
    this.data.setData(data);
  }

  save(): Cliente | undefined {
    return this.data.save();
  }

  delete(id: number): boolean {
    return this.data.delete(id);
  }

  find(id: number): Cliente | undefined {
    return this.data.find(id);
  }

  list(): Cliente[] {
    return this.data.list();
  }
}