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

type AttackType = 'chemical' | 'biological' | 'nuclear' | 'radiological' | 'explosive';

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
    selectedType: '',
    typeofattacks: '',
    agents: '',
    dateTime: null,
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

  agentsMapping = {
    chemical: [
      { label: 'VX Gas', value: 'VX Gas' },
      { label: 'Sarin', value: 'Sarin' },
    ],
    biological: [
      { label: 'Anthrax', value: 'Anthrax' },
      { label: 'Smallpox', value: 'Smallpox' },
    ],
    nuclear: [
      { label: 'Uranium', value: 'Uranium' },
      { label: 'Plutonium', value: 'Plutonium' },
    ],
    radiological: [
      { label: 'Cesium-137', value: 'Cesium-137' },
      { label: 'Strontium-90', value: 'Strontium-90' },
    ],
    explosive: [
      { label: 'TNT', value: 'TNT' },
      { label: 'RDX', value: 'RDX' },
    ],
  };

  filteredAgentsList: any[] = [];

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

  onTypeChange(): void {
    const selectedType = this.newRecord.selectedType as AttackType;
    if (this.agentsMapping[selectedType]) {
      this.newRecord.typeofattacks = selectedType;
      this.filteredAgentsList = this.agentsMapping[selectedType];
    } else {
      this.filteredAgentsList = [];
    }
    this.newRecord.agents = ''; // Reset agent selection
  }

  addRecord(): void {
    if (!this.newRecord.selectedType || !this.newRecord.dateTime || !this.newRecord.location) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Ensure the attack type is correctly assigned
    this.newRecord.typeofattacks = this.newRecord.selectedType;
  
    // Generate a unique ID if not handled by the backend
    const newEntry = {
      ...this.newRecord,
      id: this.records.length ? Math.max(...this.records.map(r => r.id || 0)) + 1 : 1, 
    };
  
    console.log("New Record: ", newEntry);
  
    // Optimistically update UI
    this.records = [...this.records, newEntry]; // Ensures Angular detects the change
  
    this.attackTableService.addRecord(newEntry).subscribe({
      next: (savedRecord) => {
        // If the backend returns a record, replace the placeholder entry
        this.records = this.records.map(record =>
          record.id === newEntry.id ? savedRecord : record
        );
        this.reset(); // Reset form after adding
      },
      error: (err) => {
        console.error('Error adding record:', err);
      },
    });
  }
  
  editRecord(record: any): void {
    this.newRecord = { ...record };
    this.onTypeChange();
  }

  deleteRecord(id: number): void {
    this.attackTableService.deleteRecord(id).subscribe({
      next: () => {
        this.records = this.records.filter((r) => r.id !== id);
      },
      error: (err) => {
        console.error('Error deleting record:', err);
      },
    });
  }

  reset(): void {
    this.newRecord = {
      selectedType: '',
      typeofattacks: '',
      agents: '',
      dateTime: null,
      payload: '',
      location: '',
      remarks: '',
      delieverBy: '',
    };
    this.filteredAgentsList = [];
  }

  next(): void {
    this.router.navigate(['/next-component']);
  }
}
