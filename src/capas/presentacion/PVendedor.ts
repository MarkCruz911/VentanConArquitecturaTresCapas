import { Vendedor } from '../../interfaces/system';
import { NVendedor } from '../negocio/NVendedor';

export class PVendedor {
  private id:number;
  private negocioVendedor: NVendedor;

  private component: HTMLElement;

  public btnSave: HTMLButtonElement;
  public btnCreate: HTMLButtonElement;

  private inputId: HTMLInputElement;
  private inputNombre: HTMLInputElement;
  private inputDireccion: HTMLInputElement;
  private inputGmail: HTMLInputElement;
  private inputTelefono: HTMLInputElement;
  private inputNivel: HTMLSelectElement;
  private inputPorcentaje: HTMLSelectElement;
  private inputReclutador: HTMLSelectElement;

  public outputTable: HTMLTableElement;
  private outputError: HTMLParagraphElement;

  constructor() {
    
    const $template = document.querySelector<HTMLTemplateElement>('#vendedor');
    const $templateContent = $template?.content.querySelector<HTMLElement>('#container');
    this.component = $templateContent?.cloneNode(true) as HTMLElement;

    this.component.querySelector('h3')!.textContent = 'Capas Vendedor';

    this.btnCreate = this.component.querySelector('#btnCreate') as HTMLButtonElement;
    this.btnSave = this.component.querySelector('#btnSave') as HTMLButtonElement;

    this.inputId = this.component.querySelector('#id') as HTMLInputElement;
    this.inputNombre = this.component.querySelector('#nombre') as HTMLInputElement;
    this.inputDireccion = this.component.querySelector('#direccion') as HTMLInputElement;
    this.inputGmail = this.component.querySelector('#gmail') as HTMLInputElement;
    this.inputTelefono = this.component.querySelector('#telefono') as HTMLInputElement;
    this.inputNivel = this.component.querySelector('#nivel') as HTMLSelectElement;
    this.inputPorcentaje = this.component.querySelector('#porcentaje') as HTMLSelectElement;
    this.inputReclutador = this.component.querySelector('#reclutador_id') as HTMLSelectElement;

    this.outputTable = this.component.querySelector('#table') as HTMLTableElement;
    this.outputError = this.component.querySelector('#errors') as HTMLParagraphElement;

    this.id = 0;
    this.negocioVendedor = new NVendedor();
    this._initListener();
  }
  
  setId(id:number):void {
    this.id = id;
  }

  getData(): Vendedor {
    return {
      id: Number(this.inputId.value),
      nombre: this.inputNombre.value,
      direccion: this.inputDireccion.value,
      gmail:this.inputGmail.value,
      telefono:this.inputTelefono.value,
      nivel:this.inputNivel.value,
      porcentaje:Number(this.inputPorcentaje.value),
      reclutador_id:Number(this.inputReclutador.value),
    }
  }

  setData(data: Vendedor): void {
    this.inputId.value = String(data.id);
    this.inputNombre.value = data.nombre;
    this.inputDireccion.value = data.direccion;
    this.inputGmail.value = data.gmail;
    this.inputTelefono.value = data.telefono;
    this.inputNivel.value=data.nivel;
    this.inputPorcentaje.value=data.nivel;
    this.inputReclutador.value=String(data.reclutador_id);
  }

  clearData(): void {
    this.inputId.value = '0';
    this.inputNombre.value = '';
    this.inputDireccion.value='';
    this.inputGmail.value='';
    this.inputTelefono.value='';
    

    this.outputError.textContent = '';
  }

  setDataError(message: string): void {
    this.outputError.textContent = message;
  }

  setVendedoresList(rows: Vendedor[]): void {
    this.inputReclutador.innerHTML = '';
    rows.forEach(
      item => {
        const option = document.createElement('option');
        option.value = String(item.id);
        option.textContent = item.nombre;

        this.inputReclutador.append(option);
      }
    )
  }





  setTable(rows: Vendedor[]): void {
    let cells = ''

    rows.forEach(row => {
      cells += `<tr>
      <td>${row.nombre}</td>
      <td>${row.direccion}</td>
      <td>${row.gmail}</td>
      <td>${row.telefono}</td>
      <td>${row.nivel}</td>
      <td width="50px">
        <button data-id="${row.id}" data-type="view">✏️</button>
        <button data-id="${row.id}" data-type="delete">🗑️</button>
      </td>
      </tr>`
    });

    const tbody = this.outputTable.querySelector('tbody') as HTMLTableSectionElement;
    tbody.innerHTML = cells;
  }

  getHTML(): HTMLElement {
    return this.component;
  }

  list(): void {
    const table = this.negocioVendedor.list();
    this.setTable(table);
  }

  create(): HTMLElement {
    this.list();
    this.clearData();
    this.setVendedor();
    return this.getHTML();
  }

  setVendedor(): void {
    const vendedores = this.negocioVendedor.list();
    this.setVendedoresList(vendedores);
  }


  save(): HTMLElement {
    const data = this.getData();
    this.negocioVendedor.setData(data);
    const model = this.negocioVendedor.save();

    !model ? this.setDataError('Error') : this.setData(model);
    
    this.list();
    return this.getHTML();
  }

  delete(): void {
    const state = this.negocioVendedor.delete(this.id);
    if (!state)
      this.setDataError('Error');

    this.clearData();
    this.list();
  }

  find(): void {
    const data = this.negocioVendedor.find(this.id);
    if (!data) {
      this.setDataError('error');
      return;
    }

    this.setData(data!);
  }

  _initListener(): void {
    this.btnCreate.addEventListener('click', () => {
      this.create();
    });

    this.btnSave.addEventListener('click', () => {
      this.save();
    });

    this.outputTable.addEventListener('click', (evt) => {
      const element = evt.target as HTMLElement;
      if (element.nodeName != 'BUTTON')
        return;

      const id = element.getAttribute('data-id') || 0;
      if (element.getAttribute('data-type') == 'delete'){
        this.setId(Number(id));
        this.delete();
      }
        

      if (element.getAttribute('data-type') == 'view'){
        this.setId(Number(id));
        this.find();
      }
        
    });
  }
}