import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  constructor() {}

  ngOnInit(): void {
  }
  openModal() {
    this.myModal.nativeElement.style.display = 'block';
  }
  closeModal() {
    this.myModal.nativeElement.style.display = 'none';
  }
}