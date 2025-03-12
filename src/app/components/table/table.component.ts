import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
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
    CalendarModule,
    InputNumberModule, 
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    SelectModule,TextareaModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  records: any[] = [];
  newRecord: any = { typeofattacks: '', agents: '', dateTime: '', payload: '', location: '', remarks: '', delieverBy: '' };
  agentsList = [
    { label: 'VX Gas', value: 'VX Gas' },
    { label: 'Sarin', value: 'Sarin' },
    { label: 'Ricin', value: 'Ricin' }
  ];
  payloadList = [
    { label: '5kg', value: '5kg' },
    { label: '10kg', value: '10kg' },
    { label: '15kg', value: '15kg' }
  ];

  delieverByList = [
    { label: 'Air', value: 'Air' },
    { label: 'Land', value: 'Land' },
    { label: 'Sea', value: 'Sea' }
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
      this.newRecord = { typeofattacks: '', agents: '', dateTime: '', payload: '', location: '', remarks: '', delieverBy: '' };
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

  reset(): void {
    this.newRecord = { typeofattacks: '', agents: '', dateTime: '', payload: '', location: '', remarks: '', delieverBy: '' };
  }
}
