import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];

  // set item viewing quantities for display
  totalRecords: number = 0;
  rows: number = 10;

  // display popups
  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  // toggle displays
  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }

    this.deleteProduct(product.id);
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };
  // confirmation logic
  onConfirmEdit(product: Product) {
    // do not invoke method if product cannot be found
    if (!this.selectedProduct.id) {
      return;
    }

    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }
  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (products: Products) => {
          // loop through array
          this.products = products.products;
          this.totalRecords = products.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // CRUD functions
  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe(
        // split handling of successful requests and errors
        {
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          },
        }
      );
  }

  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          // fetch data from server and update state
          this.fetchProducts(0, this.rows);
          // reset paginator
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProduct(product: Product) {
    this.productsService
      .addProduct(`http://localhost:3000/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          // fetch data from server and update state
          this.fetchProducts(0, this.rows);
          // reset paginator
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchProducts(0, this.rows);
  }
}
