import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { ElevatorService } from '../../services/elevator.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  @Input() address!: string;

  private map!: L.Map;

  constructor(private elevatorService: ElevatorService) {
    // Fix leaflet icons to be loaded locally
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.getCoordinates(this.address);
  }

  initMap(): void {
    // Initial view to the center of Prague
    this.map = L.map('map', {
      center: [50.0793, 14.4308],
      zoom: 15,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);
  }

  async getCoordinates(address: string) {
    const coordinates = await this.elevatorService.geocodeAndMark(address);
    if (!coordinates) return;
    const { lat, lon } = coordinates;
    this.map.setView([lat, lon], 15);
    L.marker([lat, lon]).addTo(this.map);
  }
}
