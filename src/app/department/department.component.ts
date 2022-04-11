import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private http:HttpClient) { 
  }
  url = environment.api_url + 'deparment';
  departments:any=[];
  modalTitle = "";
  departmentId = 0;
  departmentName = "";

  idFilter="";
  nameFilter="";
  departmentsWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(this.url)
    .subscribe(data=>{
      this.departments=data;
      this.departmentsWithoutFilter=data;
    })
  }

  addClick(){
    this.modalTitle = "Add";
    this.departmentId = 0;
    this.departmentName = "";
  }

  editClick(dep:any){
    this.modalTitle = "Edit";
    this.departmentId = dep.DepartmentId;
    this.departmentName = dep.Name;
  }

  createClick(){
    var val={ Name:this.departmentName };
    this.http.post(this.url, val).subscribe(resp=>{
      alert(resp.toString());
      this.refreshList();
    })
  }

  updateClick()
  {
    var val = { DepartmentId : this.departmentId, Name:this.departmentName };
    this.http.put(this.url, val).subscribe(resp=>{
      alert(resp.toString());
      this.refreshList();
    })
  }

  deleteClick(id:any)
  {
    if(confirm('Are you sure?'))
    {
      this.http.delete(this.url+ "/" + id).subscribe(resp=>{
        alert(resp.toString());
        this.refreshList();
      })
    }
  }

  FilterFn()
  {
    var IdFilter =this.idFilter;
    var NameFilter = this.nameFilter;

    this.departments = this.departmentsWithoutFilter.filter(
      function(el:any){
        return el.DepartmentId.toString().toLowerCase().includes(
          IdFilter.toString().toLowerCase()
        )
        &&
        el.Name.toString().toLowerCase().includes(
          NameFilter.toString().trim().toLowerCase()
        )
      }
    )
  }

  sortResult(prop:any, asc:any)
  {
    this.departments=this.departmentsWithoutFilter.sort(
      function(a:any,b:any){
        if(asc){
          return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
        }
        else{
          return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
        }
      }
    )
  }
}
