import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BoardsComponent } from './website/pages/boards/boards.component';
import { ListsComponent } from './website/pages/lists/lists.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BoardsComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
