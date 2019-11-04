import { Injectable, OnInit } from '@angular/core';
import { interval, from, of, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Talk } from './talk';

@Injectable({
  providedIn: 'root',
})
export class TalksService {

   someTalks: Talk[] = [ 
     {id: "AAA-123", title: "Angular superpower", speakers: ['Federico', 'Laurent']},
     {id: "BBB-456", title: "Reactive secrets", speakers: [ 'Laurent']},
     {id: "CCC-999", title: "PWA FTW", speakers: [ 'Federico']},
     {id: "BBA-999", title: "Spring superpower", speakers: ['Federico', 'Laurent']},
     {id: "CCB-123", title: "Java secrets", speakers: [ 'Laurent']},
     {id: "AAC-456", title: "jBPM FTW", speakers: [ 'Federico']}
   ]

  talks$ : Observable<Talk[]>;

  constructor() {
    this.init(); 
  }

  init() {
    this.talks$ = interval(2000).pipe(
                    startWith(0),
                    map(i => this.someTalks.slice(0, 1+(i%6)))
    );
  }

  getTalks$() : Observable<Talk[]> {
    return this.talks$;
  }



}