import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Title } from './title.model';
import { TitleService } from './title.service';

@Component({
  selector: 'simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
})
export class SimpleFormComponent implements OnInit {
  profile: FormGroup;
  titles: Title[] = [];
  title: Title[] = [];
  error: boolean = false;

  constructor(private service: TitleService) {}
  ngOnInit() {
    this.profile = new FormGroup({
      title: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null, [Validators.required]),
      acceptTerms: new FormControl(null, [Validators.required]),
    });
    this.getData();
  }

  getData(): void {
    this.service
      .getTitles()
      .pipe(
        map((data) => {
          data.sort((a, b) => {
            return a['name'] < b['name'] ? -1 : 1;
          });
          data = data.filter((item) => item.name !== '!');
          return data;
        })
      )
      .subscribe((res) => {
        this.titles = res;
        this.title = this.titles.filter((item) => item.isDefault == true);
        this.profile.patchValue({
          title: this.title[0].name ? this.title[0].name : 'Dr',
        });
      });
  }

  get getControl() {
    return this.profile.controls;
  }

  submit() {
    if (!this.profile.valid) {
      this.error = true;
      return;
    } else {
      console.log(this.profile.value);
    }
  }
}
