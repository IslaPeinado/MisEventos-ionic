export default interface RegaloInterface {
  idRegalo?: string;
  fotoRegalo?: string;
  nombreRegalo: string;
  descripcionRegalo: string;
  tallaRegalo: string;
  precioRegalo: string;
  idEvento: string;
}

export type Tregalo = {
  fotoRegalo?: string;
  nombreRegalo: string;
  descripcionRegalo: string;
  precioRegalo: string;
};
