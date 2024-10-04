import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    // this is a standalone component - import modules manually
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  // will be assigned before it is used
  productForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  // display popup or not
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  // header will ALWAYS have a value
  @Input() header!: string;
  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  // confirm edits
  @Output() confirm = new EventEmitter<Product>();

  /*
  // create separate form validation component when project expands
  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      // check for special characters in the input but allow for '&?:+-!#=<>@$%*()' to leave room for artistic expression
      const hasSpecialCharacter = /[^_\\[\]{};'"\\|,.\/]+/.test(control.value);

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }
  call: this.specialCharacterValidator()
  */

  // product form to add new or edit existing products to be initialised in ngOnInit to ensure formBuilder is available
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      // validate input
      name: ['', [Validators.required]],
      image: [''],
      price: ['', [Validators.required]],
      rating: [0],
    });
  }

  // avoid changing the way Input works
  ngOnChanges() {
    // pass the value directly - fields of the form and object are identical
    if (this.productForm) {
      this.productForm.patchValue(this.product);
    }

    /*
    this.productForm.patchValue({
      name: this.product.name,
      image: this.product.image,
      price: this.product.price,
      rating: this.product.rating,
    });
    */
  }

  // use output to emit product
  onConfirm() {
    // emit product form values
    const { name, image, price, rating } = this.productForm.value;

    this.confirm.emit({
      name: name || '',
      image: image || '',
      price: price || '',
      rating: rating || 0,
    });

    // double binding
    this.display = false;
    this.displayChange.emit(this.display);

    // reload the page after confirmation
    window.location.reload();
    // success alert
    alert(`Product "${name}" - success!`);
  }

  // cancel edits
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
