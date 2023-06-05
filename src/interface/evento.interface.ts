export default interface EventoInterface {
  idEvento?: string;
  usuarioId?: string;
  fotoEvento?: string;
  tituloEvento: string;
  descripcionEvento: string;
  lugarEvento: string;
  diaEvento: string;
  horaEvento: string;
  regalos?: any[];
}
