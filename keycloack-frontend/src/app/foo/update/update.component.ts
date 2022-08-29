import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foo } from 'src/app/models/foo';
import { FooService } from 'src/app/services/foo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  
  foo!: Foo;

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

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.fooService.update(id, this.foo).subscribe({
      next: (data) => {
        console.log(data);
        this.voltar();
      },
      error: (err) => console.log(err),
      complete: () => console.info('completed. OK') 
    });   
  }

  voltar(): void {
    this.router.navigate(['/lista']);
  }

}
