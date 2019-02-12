import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHola(): string {
    return 'Hola Mundo...! - Ejecutando un apirest en nest.js';
  }
}
