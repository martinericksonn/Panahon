import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'panahon';

  ngOnInit(): void {
    const EVENING = 19;
    const AFTERNOON = 15;
    const MORNING = 6;

    var timeNow = new Date().getHours();
    var image = document.getElementById('bkg');

    if (!image) return;

    if (timeNow >= EVENING || (timeNow >= 0 && timeNow < MORNING))
      image.style.backgroundImage = "url('../assets/images/nightsky.jpeg')";
    else if (timeNow >= AFTERNOON)
      image.style.backgroundImage = "url('../assets/images/afternoonsky.jpg')";
    else if (timeNow >= MORNING)
      image.style.backgroundImage = "url('../assets/images/morningsky.jpg')";
  }
}
