import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient } from '@angular/common/http';
import { ItemService } from "./item.service";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [],
    imports: [BrowserModule,
              ReactiveFormsModule,
              FormsModule
    ],
    providers: [provideHttpClient(), ItemService],
    bootstrap: []
})
export class AppModule { }