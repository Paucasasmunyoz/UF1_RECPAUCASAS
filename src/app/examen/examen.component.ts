import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit{
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }


  ex1(){
    this.http.post<any>("http://localhost:3080/ex1", {}).subscribe();
  }

  ex3(){
    this.http.post<any>("http://localhost:3080/ex3", {}).subscribe();
  }

  ex4() {
    const url = 'http://localhost:3080/ex4';

    this.http.get(url).subscribe(
      () => {
        console.log('S\'ha enviat la petició EX4 correctament.');
      },
      (error) => {
        console.error('S\'ha produït un error en enviar la petició EX4:', error);
      }
    );
  }
}
