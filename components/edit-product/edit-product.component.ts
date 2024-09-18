import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductCategory } from '../../models/product-category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productObj:Product={
    productID:0,name:'',productNumber:'',color:'',standardCost:0,
    listPrice:0,size:0,weight:0,productCategoryID:0 }
  productList:Product[]=[];
  productCategory:ProductCategory={
    name:'',productCategoryID:0,products:[]
  }
  constructor(private service:ProductsService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
   this.route.paramMap.subscribe({
    next:(params)=>{
      const id=params.get('id');
      if(id){
        this.service.getCategoryAndProductById(Number(id)).subscribe({
          next:(res)=>{
            this.productList=res.products;
            this.productCategory={
              productCategoryID:res.productCategoryID,
              name:res.name,
              products:this.productList
            }
          }
        })
      }
    }
   })
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

    updateProductCategory() {
      this.service.updateProductAndCategory(this.productCategory.productCategoryID,this.productCategory).subscribe({
        next:()=>{
          alert("Updated successfully");
          this.router.navigate(['products'])
        }
      })
  }
}
