import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
baseUrl:string="https://localhost:7115/ProductCategories"
  constructor(private http:HttpClient) { }
getAllProductWithCategory():Observable<ProductCategory[]>{
  return this.http.get<ProductCategory[]>(this.baseUrl);
}
deleteProducutWithCategory(id:number){
  return this.http.delete(`${this.baseUrl}/${id}`);
}
getCategoryAndProductById(cateId:number){
  return this.http.get<ProductCategory>(this.baseUrl+`/${cateId}`)
}
addProductAndCategory(category:ProductCategory):Observable<ProductCategory>{
  return this.http.post<ProductCategory>(this.baseUrl,category);
}
updateProductAndCategory(cateId:number,category:ProductCategory):Observable<ProductCategory>{
  return this.http.put<ProductCategory>(this.baseUrl+`/${cateId}`,category)
}
}
