import { Routes } from '@angular/router';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

export const routes: Routes = [
    {path:"",component:ViewProductsComponent},
    {path:"products",component:ViewProductsComponent},
    {path:"addproduct",component:AddProductComponent},
    {path:"addproduct/edit/:id",component:EditProductComponent}
];
