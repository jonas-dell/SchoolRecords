  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { ConfigService } from 'src/app/core/config/config.services';
  import { RequestResponse } from 'src/app/shared/responses/request-response';

  @Injectable({providedIn: 'root'})
  export class FormPerfilEducation {
    constructor(private http: HttpClient,private configService: ConfigService) {}

    salvarEducation(data: any){
      return this.http.put<RequestResponse>(
        `${this.configService.config.apiUrl}/api/AcademicEducation/UpdateAcademicEducation`,
        data
      );
    }


    getEducation(){
      return this.http.get<RequestResponse>(
        `${this.configService.config.apiUrl}/api/AcademicEducation/GetAcademicEducation`
      )
    }



  }
