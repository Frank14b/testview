import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { SocketService } from './socket.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'textview';
  showip: boolean = false;
  ip: any = '161.185.160.93';
  geolocale: any;
  chart: any;
  showg: boolean = true;
  labels: any = []
  datas: any = []
  ctx: any

  @ViewChild('myCanvas', {static: false}) canvasRef!: ElementRef <HTMLCanvasElement>;

  constructor(public http: HttpClient, private srv: SocketService) {
    this.srv.listen('dataUpdate').subscribe((res: any) => {
      let dat = res[0].rates
      for (const [key, val] of Object.entries(dat)) {
        let value:any = val
        this.labels.push(key)
        this.datas.push(parseInt(value.value))
      }
      // this.chart.data.datasets[0].data = this.datas
      // this.chart.update();
      console.log(this.datas)
      this.showGraph()
    });
  }

  geolocationForm(): void {
    // show / hide ip adress input form
    // this.showg = false;
    if (this.showip) {
      this.showip = false;
    } else {
      this.showip = true;
    }
  }

  getGeolocation() {
    // get geolocation data using ip adress
    let ip = document.getElementById('ipinput') as HTMLInputElement;
    this.ip = ip.value;
    // alert(this.ip)
    this.http
      .get(
        'https://api.ipgeolocation.io/ipgeo?apiKey=8be86d6899d24a2ab4a1b8da0277dd6a&ip=' +
          this.ip
      )
      .subscribe((data) => {
        this.geolocale = data;
        console.log(data);
      });
  }

  showGraph(): void {
    // get graph data
    this.showip = false;
    
    if (this.showg) {
      this.showg = false;
    } else {
      this.showg = true;
    }

    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'bar',
      options: {
        responsive: true,
        scales: {
          y: {
              beginAtZero: true,
          },
        },
      },
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "test data by frank",
            data: this.datas,
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }
}
