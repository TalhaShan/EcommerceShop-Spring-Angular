import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { ShopValidator } from 'src/app/validators/shop-validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries:Country[] = [];

  shippingAddressStates: State[] =[];
  billingAddressStates: State[]=[];

  constructor(private formBuilder: FormBuilder,
    private shopForm: ShopFormService) { }
  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidator.notOnlyWhiteSpaces]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(2),ShopValidator.notOnlyWhiteSpaces]),
        email: new FormControl('',
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      }),
    });

    //Populate credit Card month 
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth" + startMonth);

    this.shopForm.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved data month" + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    this.shopForm.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved data year" + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );
    //populate countries

    this.shopForm.getCountries().subscribe(
      data =>{
        console.log("Retrieved Countries: "+JSON.stringify(data))
        this.countries = data;
      }
    );
  }
  onSubmit() {
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched(); //display triggered error on dsi[play]

    }
    console.log("Form Submission");
    console.log(this.checkoutFormGroup.get('customer')!.value);
  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].
      setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates=[];
    }
  }

  handleMonthsAndYear(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear:number = new Date().getFullYear();
    const selectedYear:number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth:number;
    if(currentYear==selectedYear){
      startMonth = new Date().getMonth()+1;
    }else{
      startMonth = 1;
    }
    this.shopForm.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit Card month: "+JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName:string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup!.value.country.code;
    const countryName = formGroup!.value.country.name;

    console.log(`${formGroup} countryCode: ${countryCode}`);
    console.log(`${formGroup} countryName: ${countryName}`);
  
      this.shopForm.getStates(countryCode).subscribe(
        data =>{
            if(formGroupName === 'shippingAddress'){
              this.shippingAddressStates = data;
            }else{
              this.billingAddressStates = data;
            }

            //setting firstValue by Default
            formGroup!.get('state')!.setValue(data[0]);
        }
      )
  
  }
}
