import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-engages',
  templateUrl: './engages.component.html',
  styleUrls: ['./engages.component.scss']
})
export class EngagesComponent implements OnInit {

  constructor() { }
  loadDemoTheme = environment.loadDemoTheme;
  ngOnInit(): void {
  }

}
