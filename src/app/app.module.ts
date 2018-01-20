import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductHuntService } from './product-hunt.service';


import { AppComponent } from './app.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PostDetailComponent,
    DashboardComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ProductHuntService],
  bootstrap: [AppComponent]
})
export class AppModule { }
