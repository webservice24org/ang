import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductCategory } from '../../models/product-category';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {


constructor(private service:ProductsService,private router:Router){}
productObj:Product={
  productID:0,name:'',productNumber:'',color:'',standardCost:0,
  listPrice:0,size:0,weight:0,productCategoryID:0 }
productList:Product[]=[];
productCategory:ProductCategory={
  name:'',productCategoryID:0,products:[]
}
addProduct(){
  if(this.productObj.name!='' && this.productObj.name!=null){
    var exp=JSON.stringify(this.productObj);
    var obj=JSON.parse(exp);
    this.productList.unshift(obj);
    this.productObj={
      productID:0,name:'',productNumber:'',color:'',standardCost:0,
      listPrice:0,size:0,weight:0,productCategoryID:0 }
  }
}

deleteProduct(p: Product,arry: any[]) {
  const row=arry.findIndex((obj)=>obj.name==p.name 
  && obj.color==p.color 
  && obj.productNumber==p.productNumber)
    if(row>-1){
      arry.splice(row,1)
    }  
  }
  addProductCategory() {
    const cate:ProductCategory={
      products:this.productList,
      name:this.productCategory.name,
      productCategoryID:this.productCategory.productCategoryID
    }
    this.service.addProductAndCategory(cate).subscribe({
      next:x=>{
        this.router.navigate(['products'])
      }
    })
  }
}
