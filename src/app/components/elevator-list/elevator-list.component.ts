import { Component, OnInit } from '@angular/core';
import { elevatorList } from '../../constants/elevatorList';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import * as Papa from 'papaparse';
import { ElevatorService } from '../../services/elevator.service';
import { ElevatorListItem } from '../../models/elevatorListItem';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ElevatorDetails } from '../../models/elevatorDetailModel';

@Component({
  selector: 'app-elevator-list',
  imports: [
    TableModule,
    RouterLink,
    DateFormatPipe,
    InputTextModule,
    ProgressSpinnerModule,
    TooltipModule,
  ],
  templateUrl: './elevator-list.component.html',
  styleUrl: './elevator-list.component.scss',
})
export class ElevatorListComponent implements OnInit {
  elevatorList: ElevatorListItem[] | undefined = undefined;

  constructor(private elevatorService: ElevatorService) {}

  ngOnInit(): void {
    this.refreshList();
  }

  myFilter(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.elevatorList = elevatorList.filter(
      (elevator) =>
        elevator.address.toLowerCase().includes(query.toLowerCase()) ||
        elevator.model.toLowerCase().includes(query.toLowerCase()) ||
        elevator.type.toLowerCase().includes(query.toLowerCase()) ||
        elevator.status.toLowerCase().includes(query.toLowerCase()) ||
        elevator.maintenance.toLowerCase().includes(query.toLowerCase())
    );
  }

  onImport(event: Event, fileInput: HTMLInputElement) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const jsonData = result.data as ElevatorDetails[];
        this.elevatorService.importElevator(jsonData);
        this.refreshList();
      },
      error: (error) => {
        console.error('CSV parse error:', error);
      },
    });

    fileInput.value = '';
  }

  refreshList() {
    this.elevatorService.getElevators().then((elevators) => {
      this.elevatorList = elevators;
    });
  }
}
