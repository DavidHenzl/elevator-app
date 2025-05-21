import { elevatorList } from '../constants/elevatorList';
import { elevatorsDetails } from '../constants/elevatorsDetails';
import { ElevatorDetails } from '../models/elevatorDetailModel';
import { ElevatorListItem } from './../models/elevatorListItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElevatorService {
  private elevatorList: ElevatorListItem[] = elevatorList;
  private elevatorDetailList: ElevatorDetails[] = elevatorsDetails;

  constructor() {}

  getElevators(): ElevatorListItem[] {
    return this.elevatorList;
  }

  getElevatorDetails(id: number): Promise<ElevatorDetails | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const elevator = this.elevatorDetailList.find((e) => e.id === id);
        resolve(elevator ?? null);
      }, 1000);
    });
  }

  addElevator(elevator: ElevatorListItem): void {
    this.elevatorList.push(elevator);
  }
}
