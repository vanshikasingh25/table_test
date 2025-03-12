import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AttackTableService } from '../../services/attack-table.service';

@Component({
  selector: 'app-attack-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CardModule,
    RadioButtonModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule, 
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  records: any[] = [];
  newRecord: any = { typeofattacks: '', agents: '', dateTime: '', payload: '', location: '', remarks: '' };
  agentsList = [
    { label: 'VX Gas', value: 'VX Gas' },
    { label: 'Sarin', value: 'Sarin' },
    { label: 'Ricin', value: 'Ricin' }
  ];

  constructor(private attackTableService: AttackTableService, private router: Router) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.attackTableService.getRecords().subscribe({
      next: (data) => {
        this.records = data;
      },
      error: (err) => {
        console.error('Error loading records:', err);
      }
    });
  }

  addRecord(): void {
    this.attackTableService.addRecord(this.newRecord).subscribe(() => {
      this.loadRecords();
      this.newRecord = { typeofattacks: '', agents: '', dateTime: '', payload: '', location: '', remarks: '' };
    });
  }

  editRecord(record: any): void {
    this.newRecord = { ...record };
  }

  deleteRecord(id: number): void {
    this.attackTableService.deleteRecord(id).subscribe(() => {
      this.loadRecords();
    });
  }

  // ✅ Adding a sample function to avoid `fn is not a function` errors
  fn(): void {
    console.log('fn function is now defined!');
  }
}
