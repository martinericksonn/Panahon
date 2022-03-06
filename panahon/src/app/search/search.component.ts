import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private router: Router, private api: HttpClient) {}

  fcSearch = new FormControl();
  URL = 'https://yahoo-weather5.p.rapidapi.com/weather';

  ngOnInit(): void {
    const AFTERNOON = 15;
    const MORNING = 6;

    var timeNow = new Date().getHours();
    var title = document.getElementById('title');
    var subTitle = document.getElementById('sub-title');

    console.log(title);
    if (!(title && subTitle)) return;

    console.log(timeNow);
    if (timeNow >= AFTERNOON || (timeNow >= 0 && timeNow < MORNING)) {
      title.style.color = 'white';
      subTitle.style.color = 'white';
    } else if (timeNow >= MORNING) {
      title.style.color = 'black';
      subTitle.style.color = 'black';
    }
  }

  onSubmit() {
    console.log(this.fcSearch.value);
    this.router.navigate([this.fcSearch.value]);
    this.fcSearch.setValue('');
  }
}
