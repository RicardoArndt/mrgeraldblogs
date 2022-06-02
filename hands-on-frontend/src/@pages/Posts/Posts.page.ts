import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { ITableBodyElement, ITableHeadElement } from "../../@components/Table/Table";
import { IPostService, POST_SERVICE_TOKEN } from "./services/post.service";

@Component({
  template: `
    <div class="page">
      <div class="actions">
        <hands-on-input></hands-on-input>

        <hands-on-button
          name="Novo"
          (onClick)="goToNewPost()">
        </hands-on-button>
      </div>

      <div class="list">
        <hands-on-table
          [headElements]="tableHead"
          [bodyElement]="(tableBody$ | async) ?? { rows: [] }">
        </hands-on-table>
      </div>
    </div>
  `,
  styleUrls: ["./Posts.scss"]
})
export class PostsPage {
  public tableHead: ITableHeadElement[] = [
    {
      name: "Código"
    },
    {
      name: "Título"
    },
    {
      name: "Data Criação"
    },
    {
      name: "Usuário Criação"
    },
    {
      name: "Prioridade"
    },
    {
      name: "Tags"
    },
    {
      name: "Ações"
    }
  ];

  public get tableBody$(): Observable<ITableBodyElement> {
    return this.postService.getList().pipe(
      map(posts => ({
        rows: posts.map(post => ({
          columns: [
            {
              value: post.code
            },
            {
              value: post.title
            },
            {
              value: post.createdAt.toLocaleDateString("pt-BR")
            },
            {
              value: post.createdBy
            },
            {
              value: post.priority
            },
            {
              value: post.tags.join(", ")
            },
            {
              value: "Action"
            }
          ]
        }))
      })));
  }

  constructor(
    private readonly router: Router,
    @Inject(POST_SERVICE_TOKEN) private readonly postService: IPostService
  ) { }

  public goToNewPost(): void {
    this.router.navigate(["posts", "newpost"]);
  }
}
