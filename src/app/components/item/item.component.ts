import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, FormsModule, MatSelectModule,MatInputModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent implements OnInit{
  items: any[] = [];
  filteredItems: any[] = [];
  searchQuery = '';
  sortKey = 'title';

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
      this.filteredItems = [...this.items];
    });
  }

  filterItems(): void {
    this.filteredItems = this.items.filter(item =>
      item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.onSortChange();
  }

  onSortChange(): void {
    this.filteredItems.sort((a, b) => {
      const valueA = a[this.sortKey]?.toString().toLowerCase();
      const valueB = b[this.sortKey]?.toString().toLowerCase();
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    });
  }
}