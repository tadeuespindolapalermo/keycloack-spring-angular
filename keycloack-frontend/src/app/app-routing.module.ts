import { ListaComponent } from './foo/lista/lista.component';
import { DetailComponent } from './foo/detail/detail.component';
import { UpdateComponent } from './foo/update/update.component';
import { CreateComponent } from './foo/create/create.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooGuard } from './guards/foo.guard';
import { SignupGuard } from './guards/signup.guard';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: 'lista', 
    component: ListaComponent, 
    canActivate: [FooGuard], data: {requiredRoles: ['admin', 'user']}
  },
  {
    path: 'detail/:id', 
    component: DetailComponent,
    canActivate: [FooGuard], data: {requiredRoles: ['admin', 'user']}
  },
  {
    path: 'update/:id', 
    component: UpdateComponent,
    canActivate: [FooGuard], data: {requiredRoles: ['admin']}
  },
  {
    path: 'create', 
    component: CreateComponent,
    canActivate: [FooGuard], data: {requiredRoles: ['admin']}
  },
  {
    path: 'signup', 
    component: SignupComponent,
    canActivate: [SignupGuard]
  },
  {
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],    
  exports: [RouterModule]
})
export class AppRoutingModule { }
