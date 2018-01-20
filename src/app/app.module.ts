import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductHuntService } from './product-hunt.service';


import { AppComponent } from './app.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoaderComponent } from './loader/loader.component';


import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PostDetailComponent,
    DashboardComponent,
    BarChartComponent,
    LoaderComponent
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
