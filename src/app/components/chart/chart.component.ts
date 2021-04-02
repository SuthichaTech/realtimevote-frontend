import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../service/signal-r.service';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  countChart1: number = 0;
  countChart2: number = 0;

  public barChartLabels: Label[] = ['Real Time Graph'];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartDataSets[] = [
    { data: [5], label: 'Graph 1' },
    { data: [5], label: 'Graph 2' },
  ];

  constructor(public signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();

    this.signalRService.hubConnection.on('chartStation1', (result: any) => {
      this.countChart1 += result;
      this.barChartData[0].data = [this.countChart1];
      console.log('ChartStation1 Server : ' + result);
    })

    this.signalRService.hubConnection.on('chartStation2', (result: any) => {
      this.countChart2 += result;
      this.barChartData[1].data = [this.countChart2];
      console.log('ChartStation2 Server : ' + result);
    })

  }

}
