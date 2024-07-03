import { Component, OnInit } from '@angular/core';
import { NameDataService } from '../../services/name-data.service';

interface NameCount {
  name: string;
  count: number;
}

@Component({
  selector: 'app-name-table',
  templateUrl: './name-table.component.html',
  styleUrls: ['./name-table.component.css']
})
export class NameTableComponent implements OnInit {
  nameCounts: NameCount[] = [];

  constructor(private nameDataService: NameDataService) { }

  ngOnInit(): void {
    this.nameDataService.getNames().subscribe(names => {
      const nameCountMap = new Map<string, number>();

      names.forEach(name => {
        if (nameCountMap.has(name)) {
          nameCountMap.set(name, nameCountMap.get(name)! + 1);
        } else {
          nameCountMap.set(name, 1);
        }
      });

      this.nameCounts = Array.from(nameCountMap.entries()).map(entry => ({
        name: entry[0],
        count: entry[1]
      }));
    });
  }

  getRowClass(count: number): string {
    //3-checks
    if (count > 0 && count < 3) {
      return 'red';
    } else if (count >= 3 && count < 10) {
      return 'yellow';
    } else if (count >= 10) {
      return 'green';
    } else {
      return '';
    }
  }
}
