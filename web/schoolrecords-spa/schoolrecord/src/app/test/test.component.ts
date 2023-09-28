import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  logar() {
    console.log('here');
    alert('logar');
  }
}
