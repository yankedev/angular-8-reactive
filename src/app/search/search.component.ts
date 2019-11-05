import { Component, OnInit } from '@angular/core';
import { TalksService } from '../talks.service';
import { interval, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Talk } from '../talk';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  filteredTalks$: Observable<Talk[]>;
  searchQuery$ = new BehaviorSubject<string>("");

  constructor(private talkService: TalksService) { }

  ngOnInit() {
    this.filteredTalks$ = combineLatest([this.talkService.getTalks$(), this.searchQuery$]).pipe(
      map(([talks, searchQuery]) => {
        // here we imperatively implement the filtering logic
        if (searchQuery === '') { return talks; }
        const q = searchQuery.toLowerCase();
        return talks.filter(
          talk => { return (talk.id.toLowerCase().indexOf(q) >= 0 ||
                            talk.title.toLowerCase().indexOf(q) >= 0 ); }
        );
      })
    );

  }
}