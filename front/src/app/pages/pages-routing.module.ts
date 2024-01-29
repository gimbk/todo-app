import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { TaskComponent } from './task/task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AddTaskComponent } from './add-task/add-task.component';

const routes: Routes = [{
  path:'',
  component: PagesComponent,
  children: [
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'task',
      component: TaskComponent,
    },
    {
      path: 'edit-task/:id',
      component: EditTaskComponent,
    },
    {
      path: 'view-task/:id',
      component: ViewTaskComponent,
    },
    {
      path: 'add-task',
      component: AddTaskComponent,
    },
    {
      path: '',
      component: UsersComponent,
    }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
