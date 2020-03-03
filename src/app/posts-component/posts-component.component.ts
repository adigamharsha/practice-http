import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-component',
  templateUrl: './posts-component.component.html',
  styleUrls: ['./posts-component.component.css']
})
export class PostsComponentComponent implements OnInit {

  posts: any[];
  response: Response;
  // apiEndPoint = 'https://jsonplaceholder.typicode.com/posts';


  constructor(private service: PostsService) { }

  postData(post: HTMLInputElement) {
    const data: any = { title: post.value };
    this.posts.splice(0, 0, data);
    post.value = '';
    this.service.post(data)
      .subscribe((response: any) => {
        data.id = response.id;

      },
        error => {

          this.posts.splice(0, 1);
          alert('Unexpected Error.');
          console.log('Unexpected Error.');
        });
  }

  Update(post: HTMLInputElement) {
    this.service.Update(post).subscribe((response: any) => {
      console.log(response);
    }, error => {
      alert('Unexpected Error.');
      console.log('Unexpected Error.');
    });
  }

  Delete(post: HTMLInputElement) {
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.Delete(post)
      .subscribe(
        (response: any) => {
        },
        (error: Response) => {
          this.posts.splice(index, 0, post);
          if (error.status === 404) {
            alert('post has already been deleted');
          } else {
            alert('Unexpected Error.');
            console.log('Unexpected Error.');
          }
        });
  }

  ngOnInit() {
    this.service.getAll().subscribe((response: any) => {
      this.posts = response;
    }, error => {
      alert('Unexpected Error');
      console.log('Unexpected Error');
    });
  }


}
