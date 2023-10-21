import { createRouter } from 'routerjs';

import './style.css';

import { PCategoria } from './capas/presentacion/PCategoria';
import { PProducto } from './capas/presentacion/PProducto';
import { PVenta } from './capas/presentacion/PVenta';
import { PCliente } from './capas/presentacion/PCliente';
import { PVendedor } from './capas/presentacion/PVendedor';

const root = document.querySelector('#app') as HTMLDivElement;



const capaCategoria = new PCategoria();
const capaProducto = new PProducto();
const capaVenta = new PVenta();
const capaCliente = new PCliente();
const capaVendedor = new PVendedor();

let response!: HTMLElement;

createRouter()
  .get('/capacategoria', () => {
    response = capaCategoria.create();
    root.innerHTML = '';
    root.append(response);
  })
  .get('/capaproducto', () => {
    response = capaProducto.create();
    root.innerHTML = '';
    root.append(response);
  })
  .get('/capaventa', () => {
    response = capaVenta.create();
    root.innerHTML = '';
    root.append(response);
  }).get('/capacliente', () => {
    response = capaCliente.create();
    root.innerHTML = '';
    root.append(response);
  }).get('/capavendedor', () => {
    response = capaVendedor.create();
    root.innerHTML = '';
    root.append(response);
  }).run();
