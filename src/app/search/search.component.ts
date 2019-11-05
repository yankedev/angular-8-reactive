
import { Component, ViewChild, ElementRef, AfterViewInit, Input } from "@angular/core";
import { FormControl } from '@angular/forms';
import { TalksService } from "../talks.service";
import {
  interval,
  Observable,
  BehaviorSubject,
  combineLatest,
  fromEvent
} from "rxjs";
import { map, combineAll, startWith } from "rxjs/operators";
import { Talk } from "../talk";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements AfterViewInit {
  queryInput = new FormControl('');

  filteredTalks$: Observable<Talk[]>;

  constructor(private talkService: TalksService) {}

  ngAfterViewInit() {
    var query$ = this.queryInput.valueChanges.pipe(
      // combineLatest requires both streams emit to execute
      startWith("")
    );
    
    this.filteredTalks$ = combineLatest([
      this.talkService.getTalks$(),
      query$
    ]).pipe(
      map(([talks, q]) => {
        // here we imperatively implement the filtering logic
        if (q === "") {
          return talks;
        }
        return talks.filter(talk => {
          return (
            talk.id.toLowerCase().indexOf(q) >= 0 ||
            talk.title.toLowerCase().indexOf(q) >= 0
          );
        });
      })
    );
  }

}
