import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foo } from 'src/app/models/foo';
import { FooService } from 'src/app/services/foo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  foo!: Foo;
  fooName!: string;

  constructor(
    private fooService: FooService,    
    private router: Router
  ) 
  { 

  }

  ngOnInit(): void {
  }

  onCreate(): void {
    this.foo = new Foo(null, this.fooName);
    this.fooService.create(this.foo).subscribe({
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
