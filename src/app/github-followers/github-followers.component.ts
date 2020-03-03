import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {

  followers: any[];

  constructor(private service: GithubService) { }

  ngOnInit() {
    this.service.getAll().subscribe( (response: any) => {
      this.followers = response;
      console.log(this.followers);
    });
  }

}
