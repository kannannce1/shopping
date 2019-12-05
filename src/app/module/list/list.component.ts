import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, Brand } from 'src/app/model/model';
import { MessageService } from 'src/app/service/message-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  productList: Product[];
  brandList: Brand[];
  ramType = [];
  memoryType = [];
  spinner = false;
  brands = [];
  ram = [];
  harDisk = [];
  queryParams: string;
  constructor(
    public api: Service,
    private url: UrlConfig,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private messageService: MessageService
  ) { }

  /* get products list */
  private geProductList(param): void {
    this.spinner = true;
    const urlString = '?type=' + param.cat;
    this.api.getList(this.url.urlConfig().products.concat(urlString)).subscribe(products => {
      if (products) {
        this.spinner = false;
        this.productList = products;
      }
    }, error => {
      this.spinner = false;
    });
  }

  /* get brand list */
  private geFilterList(param): void {
    this.spinner = true;
    this.api.getList(this.url.urlConfig().brand).subscribe(brand => {
      if (brand) {
        this.spinner = false;
        this.brandList = brand[0][param.cat];
      }
    }, error => {
      this.spinner = false;
    });
  }

  /* Navigate products list */
  navigateToDetails(product: Product) {
    this.router.navigate(['/list/' + this.queryParams + '/details/' + product.id]);
  }

  /* get filter Items */
  getCheckedValue(data: Brand[], label: string) {
    const value = [];
    data.forEach(elementChecked => {
      if (elementChecked.checked) {
        value.push(elementChecked[label]);
      }
    });
    return value;
  }

  /*Applying the filter */
  filterApply(type: string) {
    if (type === 'brand') {
      this.filterIncludes(type, this.getCheckedValue(this.brandList, 'id'));
    } else if (type === 'ram') {
      this.filterIncludes('ram', this.getCheckedValue(this.ramType, 'name'));
    } else {
      this.filterIncludes('memory', this.getCheckedValue(this.memoryType, 'name'));
    }
  }

  /*Applying the filter dynmaic value and label*/
  filterIncludes(type: string, value: Brand[]) {
    if (value.length) {
      this.productList = this.productList.filter((group) => {
        return value.find((user) => {
          return user === group[type];
        });
      });
    }
  }

  ngOnInit() {
    this.activateRouter.params.subscribe(params => {
      if (params) {
        this.geProductList(params);
        this.geFilterList(params);
        this.queryParams = params.cat;
        this.ramType = [
          { id: 1, name: 1, checked: false },
          { id: 2, name: 2, checked: false },
          { id: 3, name: 3, checked: false },
          { id: 4, name: 8, checked: false },
          { id: 5, name: 16, checked: false }];
        if (params.cat === 'mobile') {
          this.memoryType = [
            { id: 1, name: 16, checked: false },
            { id: 2, name: 32, checked: false },
            { id: 3, name: 120, checked: false },
            { id: 4, name: 256, checked: false }];
        } else {
          this.memoryType = [
            { id: 1, name: 500, checked: false },
            { id: 2, name: 1000, checked: false },];
        }
      }
    });
    const cartItems = JSON.parse(sessionStorage.getItem('cart'));
    if (cartItems) {
      this.messageService.sendMessage({ cart: cartItems });
    }
  }

}
