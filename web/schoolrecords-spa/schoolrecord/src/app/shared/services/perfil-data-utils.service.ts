import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PerfilDataService } from './perfil-data.service';

@Injectable({ 
  providedIn: 'root'
 })
export class ConvertBase64 {
  dados: any;
  user: User | null;
  
  constructor(
    private sanitizer: DomSanitizer,
    private perfilService: PerfilDataService,
    ) {}

  
    converterBase64ParaBlob(base64: string):Blob{
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: 'image/jpeg' }); 
    }
    
    converterBase64ParaImagem(base64String: string): SafeResourceUrl {
      const imageBlob = this.converterBase64ParaBlob(base64String);
      const imageUrl = URL.createObjectURL(imageBlob);
      return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
    }

}
