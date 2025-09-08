import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoaderComponent {
  @Input() loading: boolean = false;
  @Input() message: string = '';
}