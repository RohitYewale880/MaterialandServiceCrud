import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istudent } from '../model/student';
import { snakbarservice } from '../services/snakbar.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private snakbar : snakbarservice) { }

  ngOnInit(): void {
  }

  @ViewChild('fname') fname!: ElementRef;
  @ViewChild('lname') lname!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('contact') contact!: ElementRef;
  @ViewChild('isconfirm') isconfirm!: ElementRef;

  oneditmode: boolean = true;
  edit_id!: string;

  stdArr: Array<Istudent> = [
    {
      id: '1',
      fname: 'Rohit',
      lname: 'Sharma',
      email: 'rohit@gmail.com',
      contact: '9876543210',
      isConfirmed: true
    },
    {
      id: '2',
      fname: 'Amit',
      lname: 'Patil',
      email: 'amit@gmail.com',
      contact: '9123456780',
      isConfirmed: false
    },
    {
      id: '3',
      fname: 'Sneha',
      lname: 'Joshi',
      email: 'sneha@gmail.com',
      contact: '9988776655',
      isConfirmed: true
    },
    {
      id: '4',
      fname: 'Priya',
      lname: 'Desai',
      email: 'priya@gmail.com',
      contact: '9012345678',
      isConfirmed: false
    },
    {
      id: '5',
      fname: 'Vikas',
      lname: 'Kumar',
      email: 'vikas@gmail.com',
      contact: '9090909090',
      isConfirmed: true
    }
  ];

  trackByFun(index: number, item: any) {
    return item.id;
  }

  onAdd() {
    if (this.fname.nativeElement.value != '' && this.lname.nativeElement.value != '' && this.email.nativeElement.value != '' && this.contact.nativeElement.value != '' && this.isconfirm.nativeElement.value != '') {
      let confirm: boolean;
      if (this.isconfirm.nativeElement.value === 'yes') {
        confirm = true
      }
      else {
        confirm = false
      }

      let newobj: Istudent = {
        id: Date.now().toString(),
        fname: this.fname.nativeElement.value,
        lname: this.lname.nativeElement.value,
        email: this.email.nativeElement.value,
        contact: this.contact.nativeElement.value,
        isConfirmed: confirm
      }

      this.stdArr.push(newobj);
      this.fname.nativeElement.value = '';
      this.lname.nativeElement.value = '';
      this.email.nativeElement.value = '';
      this.contact.nativeElement.value = '';
      this.isconfirm.nativeElement.value = '';

      this.snakbar.OpenSnakbar(`The Student ${newobj.fname} ${newobj.lname} is Added successfully...`)
    }
  }

  onRemove(id: string) {
    let getconfirm = confirm('Are you sure do you want to delete this student!!!')
    if (getconfirm) {
      let getindex = this.stdArr.findIndex((ele) => ele.id === id)
      let val = this.stdArr.splice(getindex, 1)

      this.snakbar.OpenSnakbar(`The Student ${val[0].fname} ${val[0].lname} is Removed successfully...`)
    }
  }

  onEdit(std: Istudent) {
    this.oneditmode = false;
    this.edit_id = std.id;
    this.fname.nativeElement.value = std.fname;
    this.lname.nativeElement.value = std.lname;
    this.email.nativeElement.value = std.email;
    this.contact.nativeElement.value = std.contact;
    this.isconfirm.nativeElement.value = std.isConfirmed;
  }

  onUpdate() {
    if (this.fname.nativeElement.value != '' && this.lname.nativeElement.value != '' && this.email.nativeElement.value != '' && this.contact.nativeElement.value != '' && this.isconfirm.nativeElement.value != '') {
      let confirm: boolean;
      if (this.isconfirm.nativeElement.value === 'yes') {
        confirm = true
      }
      else {
        confirm = false
      }

      let Updated_obj: Istudent = {
        id: Date.now().toString(),
        fname: this.fname.nativeElement.value,
        lname: this.lname.nativeElement.value,
        email: this.email.nativeElement.value,
        contact: this.contact.nativeElement.value,
        isConfirmed: confirm
      }

      let getindex = this.stdArr.findIndex((ele) => ele.id === this.edit_id)
      this.stdArr[getindex] = Updated_obj;

      this.fname.nativeElement.value = '';
      this.lname.nativeElement.value = '';
      this.email.nativeElement.value = '';
      this.contact.nativeElement.value = '';
      this.isconfirm.nativeElement.value = '';

      this.edit_id = '';
      this.oneditmode = true;

      this.snakbar.OpenSnakbar(`The Student ${Updated_obj.fname} ${Updated_obj.lname} is Updated successfully...`)
    }
  }
}
