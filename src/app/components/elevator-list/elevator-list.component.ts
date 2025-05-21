import { Component } from '@angular/core';
import { elevatorList } from '../../constants/elevatorList';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-elevator-list',
  imports: [TableModule, RouterLink, DateFormatPipe, InputTextModule],
  templateUrl: './elevator-list.component.html',
  styleUrl: './elevator-list.component.scss',
})
export class ElevatorListComponent {
  elevatorList = [...elevatorList];

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

  export() {
    console.log('export clicked');
  }
}
