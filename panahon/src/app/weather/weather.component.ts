import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  MORNING = 6;
  EVENING = 19;
  AFTERNOON = 15;
  location: string | undefined;

  query: string | undefined;
  weather: any;
  fcSearch = new FormControl();
  numOfDays = 6;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  dateWithPipe: string | null | undefined;
  timeWithPipe: string | null | undefined;
  numbers;
  flag = true;

  constructor(
    _activatedRoute: ActivatedRoute,
    private api: HttpClient,
    private router: Router
  ) {
    this.numbers = Array(6)
      .fill(0)
      .map((x, i) => i);
    _activatedRoute.params.subscribe((params) => {
      this.location = params['location'];
      this.weatherLocation();
    });
  }
  titleClick() {
    this.router.navigate(['']);
  }
  setFlag(flag: boolean, query: string) {
    this.flag = flag;
    this.query = query;

    var timeNow = new Date().getHours();
    var flagQuery = document.getElementById('flagQuery');

    if (!flagQuery) return;

    if (timeNow >= this.AFTERNOON || (timeNow >= 0 && timeNow < this.MORNING)) {
      flagQuery.style.color = 'white';
    } else flagQuery.style.color = 'black';
  }
  fahrenheitToCelcius(fahrenheit: number): string {
    var fTemp = fahrenheit;
    var fToCel = ((fTemp - 32) * 5) / 9;
    return fToCel.toFixed(0) + ' \xB0C';
  }

  ngOnInit(): void {
    this.updateBkg();
  }

  onSubmit() {
    this.router.navigate([this.fcSearch.value]);
    this.fcSearch.setValue('');
    this.setFlag(true, 'Searching...');
  }

  httpOptions = {
    headers: new HttpHeaders({
      'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com',
      'x-rapidapi-key': 'a40d7aa2f4msh6a00fe6828f23d5p171ae9jsna21e56f053e1',
    }),
  };
  async timeLocation(timezone: string) {
    const TOKEN = 'aifEgzXMszUlKpvuHmUe';

    await this.api

      .get(`https://timezoneapi.io/api/timezone/?${timezone}&token=${TOKEN}`)
      .subscribe((res: any) => {
        console.log(res);

        let datetimeString = res['data']['datetime']['date_time_txt'];
        let dateTime = new Date(datetimeString);

        this.dateWithPipe = this.pipe.transform(dateTime, 'EEEE, MMMM d, y');
        this.timeWithPipe = this.pipe.transform(dateTime, 'h:mm a ');
      });
  }
  async weatherLocation() {
    var API_URL = `https://yahoo-weather5.p.rapidapi.com/weather?location=${this.location}`;
    try {
      var result = await this.api
        .get(API_URL, this.httpOptions)
        .subscribe((res: any) => {
          this.weather = res;
          let timeZone = this.weather['location']['timezone_id'];

          this.timeLocation(timeZone);
          this.flag = false;
          return;
        });
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      if (this.flag) this.setFlag(true, 'No result found');
    }, 6000);
  }

  updateIcon(weatherText: string): string {
    weatherText = weatherText.toLowerCase();
    if (weatherText.includes('partly cloudy')) return 'clear';
    if (weatherText.includes('sun')) return 'sun';
    if (weatherText.includes('snow')) return 'snowy';
    if (weatherText.includes('wind')) return 'windy';
    if (weatherText.includes('storm')) return 'storm';
    if (weatherText.includes('rain')) return 'rainy';
    if (weatherText.includes('cloudy')) return 'cloudy';
    if (weatherText.includes('showers')) return 'showers';
    if (weatherText.includes('breez')) return 'windy';
    else return 'clear';
  }

  updateBkg() {
    var timeNow = new Date().getHours();
    var title = document.getElementById('title');

    if (!title) return;

    console.log(timeNow >= 0);
    if (timeNow >= this.EVENING || (timeNow >= 0 && timeNow < this.MORNING))
      title.style.color = 'white';
    else title.style.color = 'black';
  }

  expandDay(day: string): string {
    switch (day) {
      case 'Sun':
        return 'Sunday';
      case 'Sat':
        return 'Staturday';
      case 'Mon':
        return 'Monday';
      case 'Tue':
        return 'Tuesday';
      case 'Wed':
        return 'Wednesday';
      case 'Thu':
        return 'Thursday';
      case 'Fri':
        return 'Friday';
      default:
        return 'null';
    }
  }
}
