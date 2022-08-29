import { Component, OnInit } from '@angular/core';
import { Foo } from 'src/app/models/foo';
import { FooService } from './../../services/foo.service';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  foos: Foo[] = [];
  isAdmin: boolean | undefined;

  constructor(private fooService: FooService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loadFoos();
    this.isAdmin = this.loginService.getIsAdmin();
  }

  loadFoos(): void {
    /*this.fooService.list().subscribe(
      data => { this.foos = data; },
      err => console.log(err)
    );*/

    this.fooService.list().subscribe({
      next: (data) => this.foos = data,
      error: (err) => console.log(err),
      complete: () => console.info('completed. OK') 
    });    
  }

  onDelete(id: number | undefined): void {
    this.fooService.delete(id).subscribe({
      next: (data) => {
        console.log(data);
        this.loadFoos();
      },
      error: (err) => console.log(err),
      complete: () => console.info('completed. OK') 
    });   
  }

}
