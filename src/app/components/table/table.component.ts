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
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  records: any[] = [];
  newRecord: any = {
    typeofattacks: '',
    agents: '',
    dateTime: '',
    payload: '',
    location: '',
    remarks: '',
    delieverBy: '',
  };

  checkboxList = [
    'chemical',
    'biological',
    'nuclear',
    'radiological',
    'explosive',
  ];
  agentsMapping: { [key: string]: { label: string; value: string }[] } = {
    chemical: [
      { label: 'VX Gas', value: 'VX Gas' },
      { label: 'Sarin', value: 'Sarin' },
      { label: 'Ricin', value: 'Ricin' },
    ],
    biological: [
      { label: 'Anthrax', value: 'Anthrax' },
      { label: 'Smallpox', value: 'Smallpox' },
      { label: 'Ebola', value: 'Ebola' },
    ],
    nuclear: [
      { label: 'Uranium', value: 'Uranium' },
      { label: 'Plutonium', value: 'Plutonium' },
    ],
    radiological: [
      { label: 'Cesium-137', value: 'Cesium-137' },
      { label: 'Cobalt-60', value: 'Cobalt-60' },
    ],
    explosive: [
      { label: 'TNT', value: 'TNT' },
      { label: 'C4', value: 'C4' },
    ],
  };

  filteredAgentsList: { label: string; value: string; }[] = [];

  payloadList = [
    { label: '5kg', value: '5kg' },
    { label: '10kg', value: '10kg' },
    { label: '15kg', value: '15kg' },
  ];

  delieverByList = [
    { label: 'Air', value: 'Air' },
    { label: 'Land', value: 'Land' },
    { label: 'Sea', value: 'Sea' },
  ];
  constructor(
    private attackTableService: AttackTableService,
    private router: Router
  ) {}

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
      },
    });
  }

  addRecord(): void {
    console.log("this.newRecord -------->>>", this.newRecord);
    this.attackTableService.addRecord(this.newRecord).subscribe(() => {
      this.loadRecords();
      this.reset();
    });
  }

  editRecord(record: any): void {
    this.newRecord = { ...record };
    this.updateAgentsList(); 
  }

  deleteRecord(id: number): void {
    this.attackTableService.deleteRecord(id).subscribe(() => {
      this.loadRecords();
    });
  }

  reset(): void {
    this.newRecord = {
      typeofattacks: '',
      agents: '',
      dateTime: '',
      payload: '',
      location: '',
      remarks: '',
      delieverBy: '',
    };
    this.filteredAgentsList = []; // Reset agent list
  }

  updateAgentsList(): void {
    this.filteredAgentsList =
      this.agentsMapping[this.newRecord.typeofattacks] || [];
    this.newRecord.agents = ''; 
  }
}
