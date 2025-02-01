import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: any;
  formErrors = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' }
    ],
    password:[
      {type: 'required', message: 'la contraseña es obligatoria'},
      {type: 'password', message:'la contraseña minimo es de 6 digitos'}
    ],
    validpassword:[
      {type: 'required', message: 'la validacion de contraseña es obligatoria'},
      {type: 'mustmatch', message:'las contraseñas no coinciden'}
    ],
    name:[
      {type:'required', message:'Por favor introduzca un Nombre'}
    ],
    lastname:[
      {type:'required', message:'Por favor introduzca un Apellido'}
    ],
    user:[
      {type:'required', message:'Por favor introduzca un su nombre de Usuario'}
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtlr: NavController,
  ) { 
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      user: new FormControl('', Validators.compose([
        Validators.required      
      ])),
      validpassword: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    },
    { Validators: this.passwordMatchValidator })
    
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('validpassword')?.value;
    return password === confirmPassword ? null : { mustMatch: true };
  }

  ngOnInit() {
  }

  registerUser(registerData: any){
    this.authService.register(registerData).then(res =>{
      console.log(res);
      this.errorMessage="";
      this.navCtlr.navigateForward('/login');
    }).catch(err =>{
      console.log(err);
      this.errorMessage = err;
    })
    
  }

}