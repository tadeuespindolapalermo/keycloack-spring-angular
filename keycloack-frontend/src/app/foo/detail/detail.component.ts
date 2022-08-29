import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foo } from './../../models/foo';
import { FooService } from './../../services/foo.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  foo = new Foo();

  constructor(
    private fooService: FooService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) 
  { 

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.fooService.detail(id).subscribe({
      next: (data) => this.foo = data,
      error: (err) => console.log(err),
      complete: () => console.info('completed. OK') 
    });   
  }

  voltar(): void {
    this.router.navigate(['/lista']);
  }

}
