import { MessageService } from 'primeng/api';
import { elevatorList } from '../constants/elevatorList';
import { elevatorsDetails } from '../constants/elevatorsDetails';
import { ElevatorDetails } from '../models/elevatorDetailModel';
import { ElevatorListItem } from './../models/elevatorListItem';
import { Injectable } from '@angular/core';
import { unparse } from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class ElevatorService {
  private elevatorList: ElevatorListItem[] = elevatorList;
  private elevatorDetailList: ElevatorDetails[] = elevatorsDetails;

  constructor(private messageService: MessageService) {}

  getElevators(): Promise<ElevatorListItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.elevatorList);
      }, 1000);
    });
  }

  getElevatorDetails(id: number): Promise<ElevatorDetails | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const elevator = this.elevatorDetailList.find((e) => e.id === id);
        resolve(elevator ?? null);
      }, 1000);
    });
  }

  importElevator(newElevators: ElevatorDetails[]): void {
    const existingIds: number[] = this.elevatorList.map((e) => e.id);
    // here should be logic to check imported data for new elevator. For now, assume its format is correct
    if (newElevators[0]?.id && !existingIds.includes(+newElevators[0].id)) {
      // CSV imports everything as string, so we need to convert some props to numbers
      const newDetailItem: ElevatorDetails = {
        ...newElevators[0],
        id: +newElevators[0].id,
        capacityKg: +newElevators[0].capacityKg,
        maxPersons: +newElevators[0].maxPersons,
        numberOfStops: +newElevators[0].numberOfStops,
      };
      const newListItem: ElevatorListItem = {
        id: newDetailItem.id,
        address: newDetailItem.address,
        type: newDetailItem.type,
        model: newDetailItem.model,
        lastService: newDetailItem.lastService,
        maintenance: newDetailItem.maintenanceContactName,
        status: newDetailItem.status,
      };
      this.elevatorList = [...this.elevatorList, newListItem];
      this.elevatorDetailList = [...this.elevatorDetailList, newDetailItem];
      this.messageService.add({
        severity: 'success',
        summary: 'Importováno',
        detail: `Výtah s číslem ${newListItem.id} byl úspešně importován`,
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Import se nezdařil',
        detail: 'Výtah nebyl importován z důvodu duplicity id',
        life: 3000,
      });
    }
  }

  deleteElevator(id: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.elevatorList = this.elevatorList.filter((e) => e.id !== id);
        this.elevatorDetailList = this.elevatorDetailList.filter(
          (e) => e.id !== id
        );
        resolve();
      }, 1000);
    });
  }

  export(id: number): void {
    const elevator: ElevatorDetails | undefined = this.elevatorDetailList.find(
      (e) => e.id === id
    );
    if (elevator) {
      const csv = unparse([elevator]);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'elevators.csv';
      link.click();
    }
  }

  async geocodeAndMark(
    address: string
  ): Promise<{ lat: number; lon: number } | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;

    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const lat = +data[0].lat;
          const lon = +data[0].lon;
          console.log('ss');

          return { lat, lon };
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Adresa nenalezena',
            detail: 'Adresa výtahu nebyla nalezena. Zkontrolujte adresu.',
            life: 3000,
          });
          return null; // Address not found
        }
      })
      .catch((err) => {
        return null;
      });
  }
}
