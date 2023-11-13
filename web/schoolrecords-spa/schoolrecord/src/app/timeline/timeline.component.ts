import * as am4charts from '@amcharts/amcharts4/charts';
import { TimelineService } from './timeline.service';
import { MatDialog } from '@angular/material/dialog';
import { PublishArticleComponent } from './publish-article/publish-article.component';
import { PublishPostComponent } from '../publish-post/publish-post.component';
import { skipWhile, tap } from 'rxjs/operators';
import { timer } from 'rxjs';
import { PerfilDataService } from 'src/app/shared/services/perfil-data.service';
import { ConvertBase64 } from 'src/app/shared/services/perfil-data-utils.service';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  NgZone,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ParseSourceFile } from '@angular/compiler';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {
  pubOriginalPos: number = 0;
  publications: Array<any> = new Array<any>();
  posts: Array<any> = new Array<any>();
  loading: boolean = false;
  postsLoaded: boolean = false;
  private chart!: am4charts.XYChart;
  dados: any;

  @ViewChild('pub', { static: true }) pub!: ElementRef;
  pubElement!: HTMLElement;

  constructor(
    private zone: NgZone,
    public dialog: MatDialog,
    private perfilService: PerfilDataService,
    public convertBase64: ConvertBase64,
    @Inject(PLATFORM_ID) private platformId: any,
    private timelineService: TimelineService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.getPerfilData();
    this.getChart();
    this.pubOriginalPos = this.pub.nativeElement.getBoundingClientRect().top;
    this.pubElement = this.pub.nativeElement;
    this.getPubs();
    this.timelineService
      .getPubs()
      .subscribe((resp) => (this.publications = resp));

    let fileButton = document.getElementById('button-file');
    let file = document.getElementById('file-input');

    fileButton?.addEventListener('click', () => {
      file?.click();
    });
  }

  getPerfilData() {
    const token = localStorage.getItem('token');
    this.perfilService.getPerfil().subscribe(
      (dados) => {
        this.dados = dados;
        this.dados.foto = this.convertBase64.converterBase64ParaImagem(
          this.dados.foto
        );
      },
      (error) => {
        console.error('Erro ao buscar dados da API:', error);
      }
    );
  }

  private loadPosts() {
    this.timelineService
      .getListPost({ })
      .pipe(
        tap(() => (this.loading = false)),
        skipWhile((resp) => {
          if (resp.length !== 0) return false;
          this.showPostsLoadedMessage('postsLoaded');
          return true;
        })
      )
      .subscribe((resp: any) => {
        this.posts = [...this.posts, ...resp];
      });
  }

  private showPostsLoadedMessage(controller: string) {
    this[controller] = true;
    timer(5000).subscribe(() => {
      this[controller] = false;
    });
  }

  @HostListener('window:scroll', ['$event'])
  scroll(e) {
    let scrollPos = window.scrollY;

    if (scrollPos >= this.pubOriginalPos)
      this.pubElement.classList.add('pub-container-fixed');

    if (scrollPos <= this.pubOriginalPos)
      this.pubElement.classList.remove('pub-container-fixed');
  }

  private getPubs() {
    this.publications = [
      {
        id: 1,
        img: '../../assets/img/coca-1.jpg',
        title: 'Coca-Cola 2022',
        desc: 'Novo delicioso sabor',
      },
      {
        id: 1,
        img: '../../assets/img/quintoandar.jpg',
        title: 'Quinto Andar',
        desc: 'Novo jeito de comprar',
      },
      {
        id: 1,
        img: '../../assets/img/clear.png',
        title: 'Clear',
        desc: 'Sabe porque eu nunca caio?',
      },
    ];
  }

  private getChart() {
    let chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.data = [
      {
        country: 'Janeiro',
        value: 40,
      },
      {
        country: 'Feveiro',
        value: 30,
      },
      {
        country: 'Março',
        value: 40,
      },
      {
        country: 'Abril',
        value: 20,
      },
    ];

    chart.colors.list = [
      am4core.color('#fc4b6c'),
      am4core.color('#97bbcd'),
      am4core.color('#20df71'),
      am4core.color('#fa7500'),
      am4core.color('#be0032'),
      am4core.color('#1e88e5'),
      am4core.color('#21c1d6'),
      am4core.color('#7460ee'),
      am4core.color('#2f3d4a'),
      am4core.color('#f5ed16'),
      am4core.color('#ffb22b'),
      am4core.color('#dc67ab'),
      am4core.color('#b700fa'),
    ];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'country';
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.labels.template.horizontalCenter = 'middle';
    categoryAxis.renderer.labels.template.verticalCenter = 'middle';

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.calculateTotals = false;
    valueAxis.min = 0;

    let series = chart.series.push(new am4charts.CurvedColumnSeries());
    series.dataFields.categoryX = 'country';
    series.dataFields.valueY = 'value';
    series.tooltipText = '{valueY.value}';
    series.columns.template.strokeOpacity = 0;

    series.columns.template.fillOpacity = 0.75;

    let hoverState = series.columns.template.states.create('hover');
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.tension = 0.4;

    chart.cursor = new am4charts.XYCursor();

    // Add distinctive colors for each column using adapter
    series.columns.template.adapter.add('fill', function (fill, target: any) {
      return chart.colors.getIndex(target?.dataItem?.index);
    });

    chart.scrollbarX = new am4core.Scrollbar();
    this.chart = chart;
  }

  publishArticle() {
    let dialogRef = this.dialog.open(PublishArticleComponent, {
      height: '630px',
      width: '750px',
      data: {
    
      },
    });
  }

  publishPost() {
    let dialogRef = this.dialog.open(PublishPostComponent, {
      height: '550px',
      width: '750px',
      data: {
    
      },
    });
  }

}
