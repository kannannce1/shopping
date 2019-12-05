import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/service/message-service';
import { Product, CardItems } from 'src/app/model/model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  productList: Product[];
  spinner = false;
  cartList = [];
  queryString: string;
  constructor(
    public api: Service,
    private url: UrlConfig,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private messageService: MessageService
  ) { }

  /* get products list */
  private geProductDetail(param): void {
    this.spinner = true;
    const urlString = '?type=' + param.cat + '&id=' + param.id;
    this.api.getList(this.url.urlConfig().products.concat(urlString)).subscribe(products => {
      if (products) {
        this.spinner = false;
        this.productList = products[0];
      }
    }, error => {
      this.spinner = false;
    });
  }

  /* Back to product list */
  backToList() {
    this.router.navigate(['/list/' + this.queryString]);
  }

  /*Add to cart  */
  addToCart(product: Product) {
    product.quantity = 1;
    if (this.cartList && this.cartList.length > 0) {
      const index = this.cartList.findIndex(card => card.id === product.id);
      if (index !== -1) {
        this.cartList[index].quantity += 1;
      } else {
        this.cartList.push(product);
      }
    } else {
      this.cartList.push(product);
    }
    sessionStorage.setItem('cart', JSON.stringify(this.cartList));
    this.messageService.sendMessage({ cart: this.cartList });
  }

  ngOnInit() {
    this.activateRouter.params.subscribe(params => {
      if (params) {
        this.geProductDetail(params);
        this.queryString = params.cat;
      }
    });
    const cartItems = JSON.parse(sessionStorage.getItem('cart'));
    if (cartItems) {
      this.cartList = cartItems;
      this.messageService.sendMessage({ cart: this.cartList });
    }
  }

}
