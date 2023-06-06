export default interface EventoInterface {
  idEvento?: string;
  usuarioId?: string;
  fotoEvento?: any[];
  tituloEvento: string;
  descripcionEvento: string;
  lugarEvento: string;
  diaEvento: string;
  horaEvento: string;
  regalos?: any[];
}
