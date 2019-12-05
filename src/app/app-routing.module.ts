import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import(`./module/home/home.module`).then(m => m.HomeModule),
  },
  {
    path: 'member',
    loadChildren: () => import(`./module/member/member.module`).then(m => m.MemberModule)
  },
  {
    path: 'home',
    loadChildren: () => import(`./module/home/home.module`).then(m => m.HomeModule),
  },
  {
    path: 'list/:cat',
    loadChildren: () => import(`./module/list/list.module`).then(m => m.ListModule),
  },
  {
    path: 'cart',
    loadChildren: () => import(`./module/cart/cart.module`).then(m => m.CartModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
