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

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(this.url)
    .subscribe(data=>{
      this.departments=data;
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

  deleteClick(id:any){
    if(confirm('Are you sure?'))
    {
      this.http.delete(this.url+ "/" + id).subscribe(resp=>{
        alert(resp.toString());
        this.refreshList();
      })
    }
  }
}
