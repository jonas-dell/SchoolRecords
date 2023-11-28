import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: [
    './view-pdf.component.css',
    '../shared/base-form/base-form.component.css',
  ]
})
export class ViewPdfComponent extends BaseFormComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ViewPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pdfFile: string }
  ) {
    super(dialogRef);
  }

  ngOnInit(): void {
    console.log(this.data.pdfFile)
    this.loadPdf();
  }

  base64String: string = this.data.pdfFile;
  pdfUrl: SafeResourceUrl;
  
  loadPdf(): void {
    const pdfSrc = this.base64String;
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfSrc);
  }

}
