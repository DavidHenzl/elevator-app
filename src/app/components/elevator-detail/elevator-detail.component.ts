import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ElevatorDetails } from '../../models/elevatorDetailModel';
import { CardModule } from 'primeng/card';
import { ElevatorService } from '../../services/elevator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { ButtonModule } from 'primeng/button';
import { MapComponent } from '../map/map.component';
import { User } from '../../models/userModel';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-elevator-detail',
  imports: [
    CommonModule,
    CardModule,
    NgClass,
    ProgressSpinnerModule,
    SkeletonModule,
    DateFormatPipe,
    ButtonModule,
    MapComponent,
  ],
  templateUrl: './elevator-detail.component.html',
  styleUrl: './elevator-detail.component.scss',
})
export class ElevatorDetailComponent implements OnInit {
  loggedUser: User | undefined = undefined;
  elevator: ElevatorDetails | null | undefined = undefined;
  printMode: boolean = false;
  id: number | undefined = undefined;
  mapReadyFlag = false;

  private userSubscribtion: Subscription = Subscription.EMPTY;

  constructor(
    private userService: UserService,
    private elevatorService: ElevatorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscribtion = this.userService.loggedUser$.subscribe(
      (user: User | undefined) => {
        this.loggedUser = user;
      }
    );
    this.printMode = this.route.snapshot.data['print'];
    const id: string = this.route.snapshot.params['id'];
    window.onafterprint = () => {
      this.router.navigate([`/elevators/${id}`]);
    };
    if (id) {
      this.id = +id;
      this.elevatorService.getElevatorDetails(+id).then((details) => {
        this.elevator = details;
      });
    }
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  deleteElevator() {
    if (this.id) {
      this.elevatorService
        .deleteElevator(this.id)
        .then(() => this.router.navigate(['../'], { relativeTo: this.route }));
    }
  }

  onExport() {
    if (this.id) {
      this.elevatorService.export(this.id);
    }
  }

  onPrint() {
    this.router.navigate(['print'], { relativeTo: this.route });
  }

  onMapReady() {
    if (this.printMode) {
      window.print();
    }
  }

  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe();
  }
}
