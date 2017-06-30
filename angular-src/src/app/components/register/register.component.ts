import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router 
    ) { }

  ngOnInit() {
  }
  
  onSubmitRegister() {
    const user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
    }
    
    // Required Fields
    if(!this.validateService.validateRegister(user)) {
        this.flashMessagesService.show('Please enter all the fields', {cssClass: 'alert-danger'});
        return false;
    }
    
    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
        this.flashMessagesService.show('Please enter valid email address', {cssClass: 'alert-danger'});
        return false;
    }
    
    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show('User successfully registered', {cssClass: 'alert-success'});
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('An error has occurred', {cssClass: 'alert-danger'});
        this.router.navigate(['/register']);
      }
    })
  }
}
