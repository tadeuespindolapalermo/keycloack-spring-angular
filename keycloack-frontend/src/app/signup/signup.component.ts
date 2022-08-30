import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    const user = new User(this.username, this.email, this.firstName, this.lastName, this.password);
    this.userService.create(user).subscribe({
      next: (data) => {
        console.log(data);
        this.voltar();
      },
      error: (err) => console.log(err),
      complete: () => console.info('completed. OK') 
    });   
  }

  voltar(): void {
    this.router.navigate(['/']);
  }

}
