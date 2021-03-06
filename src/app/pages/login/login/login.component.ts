import { Component, OnInit,ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from 'app/servicios/services/user/user.service';
import * as alertFunction from '../../../servicios/data/sweet-alerts';
import { RecaptchaComponent } from 'ng-recaptcha';
import { timer } from 'rxjs';
import { FormGroupDirective } from '@angular/forms';
import { DateTimeAdapter } from 'ng-pick-datetime';

const email = new FormControl('', Validators.compose([Validators.required, CustomValidators.email]));
const telefono = new FormControl(null, Validators.compose([Validators.required,Validators.pattern('[0-9]+')]));
const confirmEmail = new FormControl('', CustomValidators.equalTo(email));
const confirmTelefono = new FormControl('', CustomValidators.equalTo(telefono));
const telefono2 = new FormControl(null, Validators.compose([Validators.pattern('[0-9]+')]));

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  @ViewChild("captchaRef") public captchaRef: RecaptchaComponent;

  form2:FormGroup;
  form3:FormGroup;
  selec;

  response;  
  captcha:any = null;
  cargando = false;
  cargando2 = false;
  rut:String = '';
  socialLogin:any;
  uservalido;
  user:any;
  comunass:any = []
  fecha = []
  hora  = []
  esuno = true;
  mostrar = true
  

  carouselOptions = {
    // margin: 25,
    autoplay:true,
    loop: true,
    nav: true,
    rewind:true,
    center:true,
    navText: ["", "<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 1,
        nav: true,
        loop: false
      },
      1500: {
        items: 1,
        nav: true,
        loop: false
      }
    }
  }
  formDirective: FormGroupDirective
  images = [
    {
      image: "assets/img/matricula.jpeg",
      link:"https://forms.office.com/pages/responsepage.aspx?id=snownTLjw0OTqj5ySP_nfbdumg0xnvBAqrbjQF-x7mRURFpNUEdVQkxUNzNVSldSMTA0R0cyQk1VRi4u"
    },
    {
      image: "assets/img/Slide_Slide1.png",
    },
    {
      image: "assets/img/Slide_Slide2.png",
    },
  ]

  regiones = ['Metropolitana', 'Arica y Parinacota', 'Tarapac??', 
            'Antofagasta', 'Atacama','Coquimbo','Valpara??so','OHiggins',
          'Maule','Biob??o','??uble','Araucan??a','Los R??os','Los Lagos','Ays??n',
          'Magallanes y Ant??rtica']
  comunas = [['Santiago',
            'Cerrillos',
            'Cerro Navia',
            'Conchal??',
            'El Bosque',
            'Estaci??n Central',
            'Huechuraba',
            'Independencia',
            'La Cisterna',
            'La Florida',
            'La Granja',
            'La Pintana',
            'La Reina',
            'Las Condes',
            'Lo Barnechea',
            'Lo Espejo',
            'Lo Prado',
            'Macul',
            'Maip??',
            '??u??oa',
            'Pedro Aguirre Cerda',
            'Pe??alolen',
            'Providencia',
            'Pudahuel',
            'Quilicura',
            'Quinta Normal',
            'Recoleta',
            'Renca',
            'San Joaqu??n',
            'San Miguel',
            'San Ram??n',
            'Vitacura',
            'Puente Alto',
            'Pirque',
            'San Jos?? De Maipo',
            'Colina',
            'Lampa',
            'Tiltil',
            'San Bernardo',
            'Buin',
            'Calera De Tango',
            'Paine',
            'Melipilla',
            'Alhu??',
            'Curacav??',
            'Mar??a Pinto',
            'San Pedro',
            'Talagante',
            'El Monte',
            'Isla De Maipo',
            'Padre Hurtado',
            'Pe??aflor'],['Arica',
            'Camarones',
            'Putre',
            'General Lagos'],['Iquique',
            'Alto Hospicio',
            'Pozo Almonte',
            'Cami??a',
            'Colchane',
            'Huara',
            'Pica'],['Antofagasta',
            'Mejillones',
            'Sierra Gorda',
            'Taltal',
            'Calama',
            'Ollague',
            'San Pedro De Atacama',
            'Tocopilla',
            'Mar??a Elena'],['Copiap??',
            'Caldera',
            'Tierra Amarilla',
            'Cha??aral',
            'Diego De Almagro',
            'Vallenar',
            'Alto Del Carmen',
            'Freirina',
            'Huasco'],['La Serena',
            'Coquimbo',
            'Andacollo',
            'La Higuera',
            'Paiguano',
            'Vicu??a',
            'Illapel',
            'Canela',
            'Los Vilos',
            'Salamanca',
            'Ovalle',
            'Combarbal??',
            'Monte Patria',
            'Punitaqui',
            'R??o Hurtado'],['Valpara??so',
            'Casablanca',
            'Conc??n',
            'Juan Fern??ndez',
            'Puchuncav??',
            'Quintero',
            'Vi??a Del Mar',
            'Isla De Pascua',
            'Los Andes',
            'Calle Larga',
            'Rinconada',
            'San Esteban',
            'La Ligua',
            'Cabildo',
            'Papudo',
            'Petorca',
            'Zapallar',
            'Quillota',
            'Calera',
            'Hijuelas',
            'La Cruz',
            'Nogales',
            'San Antonio',
            'Algarrobo',
            'Cartagena',
            'El Quisco',
            'El Tabo',
            'Santo Domingo',
            'San Felipe',
            'Catemu',
            'Llaillay',
            'Panquehue',
            'Putaendo',
            'Santa Mar??a',
            'Limache',
            'Quilpu??',
            'Villa Alemana',
            'Olmu??'],['Rancagua',
            'Codegua',
            'Coinco',
            'Coltauco',
            'Do??ihue',
            'Graneros',
            'Las Cabras',
            'Machal??',
            'Malloa',
            'Mostazal',
            'Olivar',
            'Peumo',
            'Pichidegua',
            'Quinta De Tilcoco',
            'Rengo',
            'Requ??noa',
            'San Vicente',
            'Pichilemu',
            'La Estrella',
            'Litueche',
            'Marchihue',
            'Navidad',
            'Paredones',
            'San Fernando',
            'Ch??pica',
            'Chimbarongo',
            'Lolol',
            'Nancagua',
            'Palmilla',
            'Peralillo',
            'Placilla',
            'Pumanque',
            'Santa Cruz'],['Talca',
            'Constituci??n',
            'Curepto',
            'Empedrado',
            'Maule',
            'Pelarco',
            'Pencahue',
            'R??o Claro',
            'San Clemente',
            'San Rafael',
            'Cauquenes',
            'Chanco',
            'Pelluhue',
            'Curic??',
            'Huala????',
            'Licant??n',
            'Molina',
            'Rauco',
            'Romeral',
            'Sagrada Familia',
            'Teno',
            'Vichuqu??n',
            'Linares',
            'Colb??n',
            'Longav??',
            'Parral',
            'Retiro',
            'San Javier',
            'Villa Alegre',
            'Yerbas Buenas'],['Concepci??n',
            'Coronel',
            'Chiguayante',
            'Florida',
            'Hualqui',
            'Lota',
            'Penco',
            'San Pedro de La Paz',
            'Santa Juana',
            'Talcahuano',
            'Tom??',
            'Hualp??n',
            'Lebu',
            'Arauco',
            'Ca??ete',
            'Contulmo',
            'Curanilahue',
            'Los Alamos',
            'Tir??a',
            'Los Angeles',
            'Antuco',
            'Cabrero',
            'Laja',
            'Mulch??n',
            'Nacimiento',
            'Negrete',
            'Quilaco',
            'Quilleco',
            'San Rosendo',
            'Santa B??rbara',
            'Tucapel',
            'Yumbel',
            'Alto Biob??o'],[
            'Chill??n',
            'Bulnes',
            'Cobquecura',
            'Coelemu',
            'Coihueco',
            'Chill??n Viejo',
            'El Carmen',
            'Ninhue',
            '??iqu??n',
            'Pemuco',
            'Pinto',
            'Portezuelo',
            'Quill??n',
            'Quirihue',
            'R??nquil',
            'San Carlos',
            'San Fabi??n',
            'San Ignacio',
            'San Nicol??s',
            'Treguaco',
            'Yungay'],['Temuco',
            'Carahue',
            'Cunco',
            'Curarrehue',
            'Freire',
            'Galvarino',
            'Gorbea',
            'Lautaro',
            'Loncoche',
            'Melipeuco',
            'Nueva Imperial',
            'Padre Las Casas',
            'Perquenco',
            'Pitrufqu??n',
            'Puc??n',
            'Saavedra',
            'Teodoro Schmidt',
            'Tolt??n',
            'Vilc??n',
            'Villarrica',
            'Cholchol',
            'Angol',
            'Collipulli',
            'Curacaut??n',
            'Ercilla',
            'Lonquimay',
            'Los Sauces',
            'Lumaco',
            'Pur??n',
            'Renaico',
            'Traigu??n',
            'Victoria'],['Valdivia',
            'Corral',
            'Lanco',
            'Los Lagos',
            'M??fil',
            'Mariquina',
            'Paillaco',
            'Panguipulli',
            'La Uni??n',
            'Futrono',
            'Lago Ranco',
            'R??o Bueno'],['Puerto Montt',
            'Calbuco',
            'Cocham??',
            'Fresia',
            'Frutillar',
            'Los Muermos',
            'Llanquihue',
            'Maull??n',
            'Puerto Varas',
            'Castro',
            'Ancud',
            'Chonchi',
            'Curaco de V??lez',
            'Dalcahue',
            'Puqueld??n',
            'Queil??n',
            'Quell??n',
            'Quemchi',
            'Quinchao',
            'Osorno',
            'Puerto Octay',
            'Purranque',
            'Puyehue',
            'R??o Negro',
            'San Juan de la Costa',
            'San Pablo',
            'Chait??n',
            'Futaleuf??',
            'Hualaihu??',
            'Palena'],['Coyhaique',
            'Lago Verde',
            'Ais??n',
            'Cisnes',
            'Guaitecas',
            'Cochrane',
            'OHiggins',
            'Tortel',
            'Chile Chico',
            'R??o Ib????ez'],['Punta Arenas',
            'Laguna Blanca',
            'R??o Verde',
            'San Gregorio',
            'Cabo de Hornos',
            'Porvenir',
            'Primavera',
            'Timaukel',
            'Natales',
            'Torres del Paine']]

            carrerasdiurnas = ['Bachillerato en Administraci??n','Ingenier??a Comercial',
            'Contador P??blico Auditor','Gesti??n de Informaci??n, Bibliotecolog??a y Archiv??stica']
            carrerascontinuidad = ['Ingenier??a Comercial','Contador P??blico Auditor','Ingenier??a en Control de Gesti??n (menci??n Ciencia de Datos)']
            postgrado = ['Mag??ster en Econom??a','Mag??ster en Econom??a Aplicada a Pol??ticas P??blicas - MAPPE',
          'Mag??ster en Gesti??n de Personas en Organizaciones','Magister en Administraci??n de Empresas - MBA']
          verificar = false;
  contacto = false;
  postula = false;
  rut2 = '';
  constructor(private router: Router,private fb: FormBuilder,private _userService:UserService,dateTimeAdapter: DateTimeAdapter<any>
    ) {
      dateTimeAdapter.setLocale('mx-MX')
     }

  ngOnInit() {
    this.form2 = this.fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      apellido: ['', Validators.compose([Validators.required])],
      email:email,
      confirmEmail:confirmEmail,
      telefono: telefono,
      confirmTelefono:confirmTelefono,
      region: ['', Validators.compose([Validators.required])],
      comuna: ['', Validators.compose([Validators.required])],
      rut: ['', Validators.compose([Validators.required,Validators.pattern("[0-9]{6,8}-[0-9|kK]{1}"),Validators.minLength(9),Validators.maxLength(10)])],
      captcha: ['', Validators.compose([Validators.required])],
    });
    this.form3 = this.fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      apellidoP: ['', Validators.compose([Validators.required])],
      apellidoM: ['', Validators.compose([Validators.required])],
      email:email,
      confirmEmail:confirmEmail,
      telefono: telefono,
      telefonoOpcional:telefono2,
      estadoCivil:['',Validators.compose([Validators.required])],
      establecimientoE:['',Validators.compose([Validators.required])],
      tipoEstablecimiento:['',Validators.compose([Validators.required])],
      egreso:['',Validators.compose([Validators.required])],
      trabajando:['',Validators.compose([Validators.required])],
      carrera:['',Validators.compose([Validators.required])],
      comoEntero:['',Validators.compose([Validators.required])],
      comoEnteroOtro:[''],
      decidioEstudiar:['',Validators.compose([Validators.required])],
      decidioEstudiarOtro:[''],
      region: ['', Validators.compose([Validators.required])],
      comuna: ['', Validators.compose([Validators.required])],
      nacionalidad: ['',Validators.compose([Validators.required])],
      sexo:['',Validators.compose([Validators.required])],
      fechaNacimiento:['',Validators.compose([Validators.required])],
      domicilio:['',Validators.compose([Validators.required])],
      rut: ['', Validators.compose([Validators.required,Validators.pattern("[0-9]{6,8}-[0-9|kK]{1}"),Validators.minLength(9),Validators.maxLength(10)])],
      captcha: ['', Validators.compose([Validators.required])],
    });
    // this._userService.getRegiones().subscribe(res=>{
    //   this.regiones = res.regiones;
    // })
  }

  abrirFormulario(link){
    window.open(link, '_blank')
  }
  abrir(data){
    window.open('assets/carreras/'+data,'_blank')
  }

  seleccion(i){
    this.comunass = this.comunas[i];
    this.comunass.sort()
    this.form2.controls['comuna'].reset()
    this.form3.controls['comuna'].reset()
    }


  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;    
    this.form2.controls['captcha'].setValue(this.captcha)
    this.form3.controls['captcha'].setValue(this.captcha)
  }

  reset(){
    this.captchaRef.reset();
    this.form2.controls['captcha'].reset()
    this.form3.controls['captcha'].reset()
  }

  onSubmit(formDirective) {
    if(this.form2.valid){
      var body = this.form2.value
      this.form2.disable()
      this.verificar = false;
        this.cargando2 = true;
        this.mostrar = false;
        this._userService.registerSolicitud(body).subscribe(res=>{
          this.form2.reset();
          this.captcha = null;
          this.cargando2 = false;
          formDirective.resetForm();
          this.form2.enable()
          this.mostrar = true;
          this.verificar = false;
          this.reset()
          this.typeGuardar();
          this.comunass = []
          this.contacto = false;
          this.postula = false;
        },err=>{
          if(err.error.captcha){
            alertFunction.typeErrorCaptcha()
          }else{
            if(err.error.recargar){
              alertFunction.typeErrorCampos()
            }else{
              if(err.error.correo){
                alertFunction.typeErrorCorreo()
              }else{
                if(err.error.user){
                  alertFunction.typeErrorUsuarioregistrado()
                }else{
                  this.typeError();
                }
              }
            }
          }
          this.mostrar = true;
          this.cargando2 = false;
          this.reset()
          this.form2.enable()
          this.verificar = true;
        });
    }

    
  }

  onSubmit2(formDirective) {
    if(this.form3.valid){
      var body = this.form3.value
      this.form3.disable()
      this.verificar = false;
        this.cargando2 = true;
        this.mostrar = false;
        this._userService.savePostulacion(body).subscribe(res=>{
          this.form3.reset();
          this.captcha = null;
          this.cargando2 = false;
          formDirective.resetForm();
          this.form3.enable()
          this.mostrar = true;
          this.verificar = false;
          this.reset()
          this.typeGuardar();
          this.comunass = []
          this.contacto = false;
          this.postula = false;
        },err=>{
          if(err.error.captcha){
            alertFunction.typeErrorCaptcha()
          }else{
            if(err.error.recargar){
              alertFunction.typeErrorCampos()
            }else{
              if(err.error.correo){
                alertFunction.typeErrorCorreo()
              }else{
                if(err.error.user){
                  alertFunction.typeErrorUsuarioregistrado()
                }else{
                  this.typeError();
                }
              }
            }
          }
          this.mostrar = true;
          this.cargando2 = false;
          this.reset()
          this.form3.enable()
          this.verificar = true;
        });
    }
    
  }

  myFunction(){
    var rut:any = String(this.form2.value.rut).replace(/-/g,'')
    rut = String(rut).replace(/\./g,'')
    rut = String(rut).replace('null','')
    if(rut.length >1){
      this.form2.controls['rut'].setValue((String(rut).substring(0,(rut.length) -1)+'-'+String(rut).substring((rut.length) -1,rut.length)))
      this.rut = this.form2.value.rut  
    }else{
      this.form2.controls['rut'].setValue(rut);
      this.rut = rut;
    }
    this.verificar = (this.verificador(this.rut))
  }

  myFunction2(){
    var rut:any = String(this.form3.value.rut).replace(/-/g,'')
    rut = String(rut).replace(/\./g,'')
    rut = String(rut).replace('null','')
    if(rut.length >1){
      this.form3.controls['rut'].setValue((String(rut).substring(0,(rut.length) -1)+'-'+String(rut).substring((rut.length) -1,rut.length)))
      this.rut2 = this.form3.value.rut  
    }else{
      this.form3.controls['rut'].setValue(rut);
      this.rut2 = rut;
    }
    this.verificar = (this.verificador(this.rut2))
  }

  verificador(rut):boolean{
    rut = String(rut).replace(/\./g,'')
    if(rut == '' || rut == null){
      return false;
    }
    var Rut = [];
    if(rut.length == 9){
      rut="0"+rut;
    }
    rut = rut.toLowerCase();
    for(let i = 0; i < 10;i++){
      Rut[i] = rut.charAt(i);
    }
      var r = new RegExp(/[0-9]/g);
      var prueba,cantidad = 0;
      for(let i = 0; i < 8;i++){
        if((prueba = Rut[i].replace(r,'') )== ''){
          cantidad = cantidad;
        }else{
          cantidad = cantidad +1;
        }
      }
      if(cantidad == 0){
        var suma = 0, mul = 2;
        for (let i= 7 ; i > -1; i--){
          suma = suma + (Number(Rut[i]) * mul);
          if (mul == 7) {
            mul = 2;
          }else{
            mul++;
          }
        }
        var resul = suma%11;
        resul = 11- resul;
        var digito;
        if(resul == 11){
          digito = 0;
        }else{
          if(resul == 10){
            digito = "k"
          }else{
            digito = resul;
          }
        }
        // console.log(digito == Rut[9] && rut.length<11)
        if(digito == Rut[9] && rut.length<11){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
  
  }

  typeError(){
    alertFunction.typeErrorCM();
  }
  typeErrorEmail(){
    alertFunction.typeErrorEmail();
  }
  typeGuardar(){
      alertFunction.typeSuccesspeticion();
  }

}
 