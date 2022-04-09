import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private http:HttpClient) { 
  }

  url = environment.api_url + 'employee';
  employees:any=[];
  modalTitle = "";
  employeeId = 0;
  employeeName = "";
  employeeLastName = "";
  dateOfJoining="";
  photoFileName="anonymus.png";
  photoPath=environment.photo_url;

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(this.url)
    .subscribe(data=>{
      this.employees=data;
    })
  }

  addClick(){
    this.modalTitle = "Add";
    this.employeeId = 0;
    this.employeeName = "";
    this.employeeLastName="";
    this.dateOfJoining="";
    this.photoFileName="anonymus.png";
  }

  editClick(emp:any){
    console.log(emp)
    this.modalTitle = "Edit";
    this.employeeId = emp.EmployeeId;
    this.employeeName = emp.Name;
    this.employeeLastName=emp.LastName;
    this.dateOfJoining=emp.DateOfJoining;
    this.photoFileName=emp.PhotoFileName;
  }

  createClick(){
    var val=
    { 
      Name:this.employeeName, 
      LastName:this.employeeLastName,
      DateOfJoining:this.dateOfJoining,
      PhotoFileName:this.photoFileName
    };
    this.http.post(this.url, val).subscribe(resp=>{
      alert(resp.toString());
      this.refreshList();
    })
  }

  updateClick()
  {
    var val=
    { 
      EmployeeId: this.employeeId,
      Name:this.employeeName, 
      LastName:this.employeeLastName,
      DateOfJoining:this.dateOfJoining,
      PhotoFileName:this.photoFileName
    };
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

  imageUpload(event:any)
  {
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('file',file,file.name);

    this.http.post(this.url+'/savefile', formData)
    .subscribe((data:any)=>{
      this.photoFileName=data.toString();
    })
  }
}

