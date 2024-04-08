import { ClientService } from './../service/client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  totalLength: any;
  page: number = 1;

  searchtext: any;

  clients: Client[];

  constructor(private ClientService: ClientService,
    private router: Router) {}

    ngOnInit() {
      this.loadAll();
    }


    loadAll() {
      this.ClientService.getClientsList()
      .subscribe(clients => {
        this.clients = clients;
      });
    }

    deleteClient(id: string) {
      if(confirm('Deseja realmente excluir esse cliente?')){
      this.ClientService.deleteClient(id)
        .subscribe(
          data => {
            console.log(data);
            this.loadAll();
            alert("Cliente excluído com sucesso!");
          },
          error => console.log(error));
     } else {
       alert("Operação cancelada!");
     }
    }

    clientDetails(id: string){
      this.router.navigate(['details', id]);
    }

    updateClient(id: string){
      this.router.navigate(['update', id]);
    }

  }
