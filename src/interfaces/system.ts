export interface Categoria {
  id: number;
  nombre:string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria_id:number;
}

export interface Venta {
  id:number;
  fecha: string;
  montoTotal:number;
  nit?:number;
  detallesVenta?: DetalleVenta[];
}

export interface DetalleVenta {
  id: number;
  venta_id: number;
  producto_id: number;
  cantidad: number;
  precio: number;
  subTotal: number;
}

export interface Cliente{
  id: number;
  nombre: string;
  direccion: string;
  gmail:string;
  telefono: string;
}

export interface Vendedor{
  id: number;
  nombre: string;
  direccion: string;
  gmail:string;
  telefono: string;
  nivel:string;
  porcentaje:number;
  reclutador_id?:number;
}




