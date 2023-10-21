import { Vendedor } from "../../interfaces/system";
import { DVendedor } from "../datos/DVendedor";

export class NVendedor {
  private data: DVendedor;

  constructor() {
    this.data = new DVendedor();
  }

  setData(data: Vendedor): void {
    this.data.setData(data);
  }

  save(): Vendedor | undefined {
    return this.data.save();
  }

  delete(id: number): boolean {
    return this.data.delete(id);
  }

  find(id: number): Vendedor | undefined {
    return this.data.find(id);
  }

  list(): Vendedor[] {
    return this.data.list();
  }
}