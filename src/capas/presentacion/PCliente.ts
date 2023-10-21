import { Cliente } from '../../interfaces/system';
import { NCliente } from '../negocio/NCliente';

export class PCliente {
  private id:number;
  private negocio: NCliente;

  private component: HTMLElement;

  public btnSave: HTMLButtonElement;
  public btnCreate: HTMLButtonElement;

  private inputId: HTMLInputElement;
  private inputNombre: HTMLInputElement;
  private inputDireccion: HTMLInputElement;
  private inputGmail: HTMLInputElement;
  private inputTelefono: HTMLInputElement;

  public outputTable: HTMLTableElement;
  private outputError: HTMLParagraphElement;

  constructor() {
    
    const $template = document.querySelector<HTMLTemplateElement>('#cliente');
    const $templateContent = $template?.content.querySelector<HTMLElement>('#container');
    this.component = $templateContent?.cloneNode(true) as HTMLElement;

    this.component.querySelector('h3')!.textContent = 'Capas Cliente';

    this.btnCreate = this.component.querySelector('#btnCreate') as HTMLButtonElement;
    this.btnSave = this.component.querySelector('#btnSave') as HTMLButtonElement;

    this.inputId = this.component.querySelector('#id') as HTMLInputElement;
    this.inputNombre = this.component.querySelector('#nombre') as HTMLInputElement;
    this.inputDireccion = this.component.querySelector('#direccion') as HTMLInputElement;
    this.inputGmail = this.component.querySelector('#gmail') as HTMLInputElement;
    this.inputTelefono = this.component.querySelector('#telefono') as HTMLInputElement;

    this.outputTable = this.component.querySelector('#table') as HTMLTableElement;
    this.outputError = this.component.querySelector('#errors') as HTMLParagraphElement;

    this.id = 0;
    this.negocio = new NCliente();
    this._initListener();
  }
  
  setId(id:number):void {
    this.id = id;
  }

  getData(): Cliente {
    return {
      id: Number(this.inputId.value),
      nombre: this.inputNombre.value,
      direccion: this.inputDireccion.value,
      gmail:this.inputGmail.value,
      telefono:this.inputTelefono.value,
    }
  }

  setData(data: Cliente): void {
    this.inputId.value = String(data.id);
    this.inputNombre.value = data.nombre;
    this.inputDireccion.value = data.direccion;
    this.inputGmail.value = data.gmail;
    this.inputTelefono.value = data.telefono;
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

  setTable(rows: Cliente[]): void {
    let cells = ''

    rows.forEach(row => {
      cells += `<tr>
      <td>${row.nombre}</td>
      <td>${row.direccion}</td>
      <td>${row.gmail}</td>
      <td>${row.telefono}</td>
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
    const table = this.negocio.list();
    this.setTable(table);
  }

  create(): HTMLElement {
    this.list();
    this.clearData();
    return this.getHTML();
  }

  save(): HTMLElement {
    const data = this.getData();
    this.negocio.setData(data);
    const model = this.negocio.save();

    !model ? this.setDataError('Error') : this.setData(model);
    
    this.list();
    return this.getHTML();
  }

  delete(): void {
    const state = this.negocio.delete(this.id);
    if (!state)
      this.setDataError('Error');

    this.clearData();
    this.list();
  }

  find(): void {
    const data = this.negocio.find(this.id);
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