import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MatSliderModule } from '@angular/material/slider';
import 'hammerjs';

import { ProductHuntService } from './product-hunt.service';

import { AppComponent } from './app.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoaderComponent } from './loader/loader.component';
import { PostComponent } from './post/post.component';


@NgModule({
  declarations: [
    AppComponent,
    PostDetailComponent,
    DashboardComponent,
    BarChartComponent,
    LoaderComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    MatSliderModule
  ],
  providers: [ProductHuntService],
  bootstrap: [AppComponent]
})
export class AppModule { }
