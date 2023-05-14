import { Component, ViewChild } from '@angular/core';
import { ApexPlotOptions, ChartComponent } from 'ng-apexcharts/public_api';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { AdminService } from 'src/app/services/admin.service';


export type barChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  legend:ApexLegend,
  plotOptions:ApexPlotOptions
  fill:ApexFill
  marker:ApexMarkers;
  tooltip:ApexTooltip;
  yaxis:ApexYAxis;
};
export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions:ApexPlotOptions 
  stroke: ApexStroke;
  marker:ApexMarkers;
  tooltip:ApexTooltip;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  @ViewChild("teacherData") chart: ChartComponent;
  public barChartOptions: Partial<barChartOptions>;

  @ViewChild("studentsTests") pieChart: ChartComponent;
  public PieChartOptions: Partial<PieChartOptions>;
  data: any = null;  
  teacherData: any[]; 
  schoolsList:any[];
  testsData:any[];
  totalStudents:any[];

  constructor(private adminService : AdminService) {
    this.PieChartOptions = {
      series: [44, 55, 50],
      chart: {
        width: 400,
        type: "pie"
      },
      title: {
        text: "Total Number Of Students",
        align: 'left',
        margin: 0,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  "Inter",
          color:  '#000'
        },
    },
      labels: ["Student 1", "Student 2", "Student 3"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            dropShadow: {
              enabled: true,
              left: 2,
              top: 2,
              opacity: 0.5
          },
            legend:{
              show: true,
              showForSingleSeries: false,
              showForNullSeries: true,
              showForZeroSeries: true,
              position: 'bottom',
              horizontalAlign: 'center',
              floating: false,
              fontSize: '14px',
              fontFamily: 'Inter, Arial',
              fontWeight: 400,
              formatter: undefined,
              inverseOrder: false,
              width: undefined,
              height: undefined,
              tooltipHoverFormatter: undefined,
              customLegendItems: [],
              offsetX: 0,
              offsetY: 0,
              itemMargin: {
                  horizontal: 5,
                  vertical: 0
              },
              onItemClick: {
                  toggleDataSeries: true
              },
              onItemHover: {
                  highlightDataSeries: true
              },
            },
            stroke: {
              width: [0, 2, 5],
              curve: 'smooth'
            },
          }
        }
      ]
    };
    
    this.barChartOptions = {
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      chart: {
        height: 310,
        type: 'line',
        stacked: false,
      },
      fill: {
        opacity: [0.85,0.25,1],
				gradient: {
					inverseColors: false,
					shade: 'light',
					type: "vertical",
					opacityFrom: 0.85,
					opacityTo: 0.55,
					stops: [0, 100, 100, 100]
				}
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if(typeof y !== "undefined") {
              return  y.toFixed(0) + " Tests";
            }
            return y;

          }
        }
      },
      legend:{
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '14px',
        fontFamily: 'Inter, Arial',
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 0,
        offsetY: 0,
        itemMargin: {
            horizontal: 5,
            vertical: 0
        },
        onItemClick: {
            toggleDataSeries: true
        },
        onItemHover: {
            highlightDataSeries: true
        },
      },
      series: [{
        name: 'Series Column',
        type: 'column',
        data: [23, 110, 22, 27, 13, 22, 100, 21, 44, 22, 30]
      }, {
        name: 'Series Area',
        type: 'area',
        data: [44, 110, 41, 100, 22, 43, 21, 41, 56, 27, 43]
      }, {
        name: 'Series Line',
        type: 'line',
        data: [30, 110, 36, 30, 45, 100, 64, 52, 59, 36, 39]
      }],

      dataLabels: {
        enabled: false
      },

      title: {
        text: "Total Number Of Tests Taken",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      },
      yaxis: {
        title: {
          text: 'Tests',
        },
        min: 0
      },

    };
    

  }
 
  
  ngOnInit(){
    this.getTeachersList(); 
    this.getSchoolsList();
  }
  getTeachersList(){ 
      this.adminService.get('teachers').subscribe({
        next:(response)=>{ 
          this.teacherData = response;
      }
      }) 
  }
  
  getSchoolsList(){
    this.adminService.get('schools').subscribe({
      next:(response)=>{
        this.schoolsList = response;
      }
    })
  }
}
