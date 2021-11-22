import { Component, OnInit,ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from 'app/servicios/services/user/user.service';
import * as alertFunction from '../../../servicios/data/sweet-alerts';
import { RecaptchaComponent } from 'ng-recaptcha';
import { timer } from 'rxjs';
import { FormGroupDirective } from '@angular/forms';

const email = new FormControl('', Validators.compose([Validators.required, CustomValidators.email]));
const telefono = new FormControl(null, Validators.compose([Validators.required,Validators.pattern('[0-9]+')]));
const confirmEmail = new FormControl('', CustomValidators.equalTo(email));
const confirmTelefono = new FormControl('', CustomValidators.equalTo(telefono));

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
      image: "assets/img/Slide_Slide1.png"
    },
    {
      image: "assets/img/Slide_Slide2.png"
    },
  ]

  regiones = ['Metropolitana', 'Arica y Parinacota', 'Tarapacá', 
            'Antofagasta', 'Atacama','Coquimbo','Valparaíso','OHiggins',
          'Maule','Biobío','Ñuble','Araucanía','Los Ríos','Los Lagos','Aysén',
          'Magallanes y Antártica']
  comunas = [['Santiago',
            'Cerrillos',
            'Cerro Navia',
            'Conchalí',
            'El Bosque',
            'Estación Central',
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
            'Maipú',
            'Ñuñoa',
            'Pedro Aguirre Cerda',
            'Peñalolen',
            'Providencia',
            'Pudahuel',
            'Quilicura',
            'Quinta Normal',
            'Recoleta',
            'Renca',
            'San Joaquín',
            'San Miguel',
            'San Ramón',
            'Vitacura',
            'Puente Alto',
            'Pirque',
            'San José De Maipo',
            'Colina',
            'Lampa',
            'Tiltil',
            'San Bernardo',
            'Buin',
            'Calera De Tango',
            'Paine',
            'Melipilla',
            'Alhué',
            'Curacaví',
            'María Pinto',
            'San Pedro',
            'Talagante',
            'El Monte',
            'Isla De Maipo',
            'Padre Hurtado',
            'Peñaflor'],['Arica',
            'Camarones',
            'Putre',
            'General Lagos'],['Iquique',
            'Alto Hospicio',
            'Pozo Almonte',
            'Camiña',
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
            'María Elena'],['Copiapó',
            'Caldera',
            'Tierra Amarilla',
            'Chañaral',
            'Diego De Almagro',
            'Vallenar',
            'Alto Del Carmen',
            'Freirina',
            'Huasco'],['La Serena',
            'Coquimbo',
            'Andacollo',
            'La Higuera',
            'Paiguano',
            'Vicuña',
            'Illapel',
            'Canela',
            'Los Vilos',
            'Salamanca',
            'Ovalle',
            'Combarbalá',
            'Monte Patria',
            'Punitaqui',
            'Río Hurtado'],['Valparaíso',
            'Casablanca',
            'Concón',
            'Juan Fernández',
            'Puchuncaví',
            'Quintero',
            'Viña Del Mar',
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
            'Santa María',
            'Limache',
            'Quilpué',
            'Villa Alemana',
            'Olmué'],['Rancagua',
            'Codegua',
            'Coinco',
            'Coltauco',
            'Doñihue',
            'Graneros',
            'Las Cabras',
            'Machalí',
            'Malloa',
            'Mostazal',
            'Olivar',
            'Peumo',
            'Pichidegua',
            'Quinta De Tilcoco',
            'Rengo',
            'Requínoa',
            'San Vicente',
            'Pichilemu',
            'La Estrella',
            'Litueche',
            'Marchihue',
            'Navidad',
            'Paredones',
            'San Fernando',
            'Chépica',
            'Chimbarongo',
            'Lolol',
            'Nancagua',
            'Palmilla',
            'Peralillo',
            'Placilla',
            'Pumanque',
            'Santa Cruz'],['Talca',
            'Constitución',
            'Curepto',
            'Empedrado',
            'Maule',
            'Pelarco',
            'Pencahue',
            'Río Claro',
            'San Clemente',
            'San Rafael',
            'Cauquenes',
            'Chanco',
            'Pelluhue',
            'Curicó',
            'Hualañé',
            'Licantén',
            'Molina',
            'Rauco',
            'Romeral',
            'Sagrada Familia',
            'Teno',
            'Vichuquén',
            'Linares',
            'Colbún',
            'Longaví',
            'Parral',
            'Retiro',
            'San Javier',
            'Villa Alegre',
            'Yerbas Buenas'],['Concepción',
            'Coronel',
            'Chiguayante',
            'Florida',
            'Hualqui',
            'Lota',
            'Penco',
            'San Pedro de La Paz',
            'Santa Juana',
            'Talcahuano',
            'Tomé',
            'Hualpén',
            'Lebu',
            'Arauco',
            'Cañete',
            'Contulmo',
            'Curanilahue',
            'Los Alamos',
            'Tirúa',
            'Los Angeles',
            'Antuco',
            'Cabrero',
            'Laja',
            'Mulchén',
            'Nacimiento',
            'Negrete',
            'Quilaco',
            'Quilleco',
            'San Rosendo',
            'Santa Bárbara',
            'Tucapel',
            'Yumbel',
            'Alto Biobío'],[
            'Chillán',
            'Bulnes',
            'Cobquecura',
            'Coelemu',
            'Coihueco',
            'Chillán Viejo',
            'El Carmen',
            'Ninhue',
            'Ñiquén',
            'Pemuco',
            'Pinto',
            'Portezuelo',
            'Quillón',
            'Quirihue',
            'Ránquil',
            'San Carlos',
            'San Fabián',
            'San Ignacio',
            'San Nicolás',
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
            'Pitrufquén',
            'Pucón',
            'Saavedra',
            'Teodoro Schmidt',
            'Toltén',
            'Vilcún',
            'Villarrica',
            'Cholchol',
            'Angol',
            'Collipulli',
            'Curacautín',
            'Ercilla',
            'Lonquimay',
            'Los Sauces',
            'Lumaco',
            'Purén',
            'Renaico',
            'Traiguén',
            'Victoria'],['Valdivia',
            'Corral',
            'Lanco',
            'Los Lagos',
            'Máfil',
            'Mariquina',
            'Paillaco',
            'Panguipulli',
            'La Unión',
            'Futrono',
            'Lago Ranco',
            'Río Bueno'],['Puerto Montt',
            'Calbuco',
            'Cochamó',
            'Fresia',
            'Frutillar',
            'Los Muermos',
            'Llanquihue',
            'Maullín',
            'Puerto Varas',
            'Castro',
            'Ancud',
            'Chonchi',
            'Curaco de Vélez',
            'Dalcahue',
            'Puqueldón',
            'Queilén',
            'Quellón',
            'Quemchi',
            'Quinchao',
            'Osorno',
            'Puerto Octay',
            'Purranque',
            'Puyehue',
            'Río Negro',
            'San Juan de la Costa',
            'San Pablo',
            'Chaitén',
            'Futaleufú',
            'Hualaihué',
            'Palena'],['Coyhaique',
            'Lago Verde',
            'Aisén',
            'Cisnes',
            'Guaitecas',
            'Cochrane',
            'OHiggins',
            'Tortel',
            'Chile Chico',
            'Río Ibáñez'],['Punta Arenas',
            'Laguna Blanca',
            'Río Verde',
            'San Gregorio',
            'Cabo de Hornos',
            'Porvenir',
            'Primavera',
            'Timaukel',
            'Natales',
            'Torres del Paine']]

            carrerasdiurnas = ['Bachillerato en Administración','Ingeniería Comercial',
            'Contador Público Auditor','Gestión de Información, Bibliotecología y Archivística']
            carrerascontinuidad = ['Ingeniería Comercial','Contador Público Auditor','Ingeniería en Control de Gestión (mención Ciencia de Datos)']
            postgrado = ['Magíster en Economía','Magíster en Economía Aplicada a Políticas Públicas - MAPPE',
          'Magíster en Gestión de Personas en Organizaciones','Magister en Administración de Empresas - MBA']
          verificar = false;
  contacto = false;
  postula = false;
  constructor(private router: Router,private fb: FormBuilder,private _userService:UserService,
    ) { }

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
      telefonoOpcional:telefono,
      estadoCivil:['',Validators.compose([Validators.required])],
      establecimientoE:['',Validators.compose([Validators.required])],
      tipoEstablecimiento:['',Validators.compose([Validators.required])],
      egreso:['',Validators.compose([Validators.required])],
      trabajando:['',Validators.compose([Validators.required])],
      carrera:['',Validators.compose([Validators.required])],
      comoEntero:['',Validators.compose([Validators.required])],
      comoEnteroOtro:[''],
      decidioEstudiar:['',Validators.compose([Validators.required])],
      decidioEstudiarOtro:['',Validators.compose([Validators.required])],
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

  cambio(){
    var a = 0;
    a = a +(this.form2.value.carrerasdiurnas ? this.form2.value.carrerasdiurnas.length :0)
    // a = a +(this.form2.value.carrerascontinuidad ? this.form2.value.carrerascontinuidad.length :0)
    // a = a +(this.form2.value.postgrado ? this.form2.value.postgrado.length :0)
    if(a <= 0){
      this.verificar = false;
    }else{
      this.verificar = true;
    }
  }

  abrir(data){
    window.open('assets/carreras/'+data,'_blank')
  }

  seleccion(i){
    this.comunass = this.comunas[i];
    this.comunass.sort()
    this.form2.controls['comuna'].reset()
    }


  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;    
    this.form2.controls['captcha'].setValue(this.captcha)
  }

  reset(){
    this.captchaRef.reset();
    this.form2.controls['captcha'].reset()
  }

  onSubmit(formDirective) {
    var body = this.form2.value
    this.form2.disable()
    this.verificar = false;
      this.cargando2 = true;
      this.mostrar = false;
      this._userService.registerSolicitud(body).subscribe(res=>{
        this.form2.reset();
        this.captcha = null;
        this.cargando2 = false;
        // this.form2 = this.fb.group({
        //   nombre: ['', Validators.compose([Validators.required])],
        //   apellido: ['', Validators.compose([Validators.required])],
        //   email:email,
        //   confirmEmail:confirmEmail,
        //   telefono: telefono,
        //   confirmTelefono:confirmTelefono,
        //   region: ['', Validators.compose([Validators.required])],
        //   comuna: ['', Validators.compose([Validators.required])],
        //   carrerasdiurnas: ['', Validators.compose([Validators.required])],
        //   carrerascontinuidad: ['', Validators.compose([Validators.required])],
        //   postgrado: ['', Validators.compose([Validators.required])],
        //   captcha: ['', Validators.compose([Validators.required])],
        // });
        formDirective.resetForm();
        this.form2.enable()
        this.mostrar = true;
        this.verificar = false;
        this.reset()
        this.typeGuardar();
        this.comunass = []
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
    // console.log(this.rut)
    this.verificar = (this.verificador(this.rut))
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
 