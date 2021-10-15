import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SimpleFormComponent } from './simple-form.component';
import { TitleService } from './title.service';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, SimpleFormComponent],
  bootstrap: [AppComponent],
  providers: [TitleService],
})
export class AppModule {}
