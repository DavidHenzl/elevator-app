import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ElevatorDetails } from '../../models/elevatorDetailModel';
import { CardModule } from 'primeng/card';
import { ElevatorService } from '../../services/elevator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-elevator-detail',
  imports: [CardModule, NgClass, ProgressSpinnerModule, SkeletonModule, DateFormatPipe],
  templateUrl: './elevator-detail.component.html',
  styleUrl: './elevator-detail.component.scss',
})
export class ElevatorDetailComponent implements OnInit {
  elevator: ElevatorDetails | null | undefined = undefined;

  constructor(
    private elevatorService: ElevatorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    if (id) {
      this.elevatorService.getElevatorDetails(+id).then((details) => {
        this.elevator = details;
      });
    }
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
