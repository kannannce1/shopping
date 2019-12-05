import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/service/message-service';
import { Service } from 'src/app/service/service';
import { Product } from 'src/app/model/model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData = [];
  shippingCharge = 300;
  tax = 10;
  taxAmount = 0;
  totalCart = 0;
  coupanCode: string;
  coupanAmount = 0;
  coupanMessage: string;
  coupanDisable = false;
  selectedCart: Product;
  shippmentCompleteFlag = false;
  total = 0;
  constructor(
    private router: Router,
    private messageService: MessageService,
    public api: Service,
  ) {
    this.getCartData();
  }

  /* Get Cart data */
  private getCartData(): void {
    const cartItems = JSON.parse(sessionStorage.getItem('cart'));
    const userDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    if (cartItems) {
      this.cartData = cartItems;
      let message = {};
      if (userDetails) {
        message = { cart: this.cartData, user: { name: userDetails.name, id: userDetails.id, gender: userDetails.gender } };
      } else {
        message = { cart: this.cartData };
      }
      this.cartTotalValue();
      this.messageService.sendMessage(message);
    }
  }

  /* Change the cart value +/- */
  adjustCart(arg: string, product: Product) {
    if (arg === 'add') {
      product.quantity += 1;
      this.cartTotalValue();
    } else {
      if (product.quantity === 1) {
        this.api.alertConfig = this.api.modalConfig('Warning', 'Quantity minimum should be 1', true, ['Ok']);
      } else {
        product.quantity -= 1;
        this.cartTotalValue();
      }
    }
  }

  /* Cart vlue calculation */
  cartTotalValue() {
    this.totalCart = 0;
    this.total = 0;
    this.taxAmount = 0;
    this.cartData.forEach(cart => {
      this.total += cart.quantity * cart.price;
    });
    this.taxAmount = (this.total / 100) * this.tax;
    this.totalCart = this.total + this.taxAmount + this.shippingCharge;
  }

  /* Remove cart */
  removeCart(cart: Product) {
    this.api.alertConfig = this.api.modalConfig('Warning', 'Are you sure want to remove this ' + cart.name, true, ['Yes', 'No']);
    this.selectedCart = cart;
  }

  /* Apply coupan */
  applyCoupan() {
    this.coupanMessage = '';
    if (this.coupanCode === 'FIRST') {
      this.coupanAmount = (this.total / 100) * 5;
      this.totalCart = this.total - this.coupanAmount;
      this.coupanDisable = true;
      // tslint:disable-next-line: max-line-length
      this.api.alertConfig = this.api.modalConfig('Success', 'Your coupan has been applied. Youre coupan amount is' + this.coupanAmount, true, ['Ok']);
    } else {
      this.coupanMessage = 'Not valid Coupan';
    }
  }

  /* Modal Action */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.api.alertConfigDefaultValue();
    } else if (action === 'Yes') {
      const index = this.cartData.findIndex(cart => cart.id === this.selectedCart.id);
      if (index !== -1) {
        this.cartData.splice(index, 1);
        this.messageService.sendMessage({ cart: this.cartData });
        this.cartTotalValue();
        sessionStorage.setItem('cart', JSON.stringify(this.cartData));
        this.api.alertConfig = this.api.modalConfig('Success', this.selectedCart.name + 'has been successfully removed ', true, ['Ok']);
      }
    } else {
      this.api.alertConfigDefaultValue();
    }
  }

  /* Proceed to checkout*/
  proceedToCheckout() {
    /* Check whether login/not */
    if (!this.api.validUser()) {
      this.router.navigate(['/member']);
    } else {
      this.shippmentCompleteFlag = true;
      this.cartData = [];
      sessionStorage.setItem('cart', JSON.stringify(this.cartData));
      this.messageService.sendMessage({ cart: this.cartData });
      // tslint:disable-next-line: max-line-length
      this.api.alertConfig = this.api.modalConfig('Success', 'Thanks for Shopping with us. The shipping details has been sent in your mail', true, ['Ok']);
    }
  }

  ngOnInit() { }
}
