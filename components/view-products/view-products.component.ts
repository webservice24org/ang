import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../models/product-category';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent implements OnInit{

  constructor(private service:ProductsService){}
ngOnInit(): void {
    this.getList();
}
  list:ProductCategory[]=[];

  getList(){
    this.service.getAllProductWithCategory().subscribe(res=>{
      this.list=res;
    })
  }

  deleteItem(cate: ProductCategory) {
    const isConfirm=confirm("Are you sure to delete this "+cate.name);
    if(isConfirm){
      this.service.deleteProducutWithCategory(cate.productCategoryID).subscribe((res)=>{
        alert("Deleted successfuuly");
        this.getList();
      })
    }
 }
  
}
