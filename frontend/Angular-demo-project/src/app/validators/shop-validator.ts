import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidator {

    static notOnlyWhiteSpaces(control: FormControl): ValidationErrors | null {

        if ((control.value != null) && (control.value.trim().length === 0)) {
            return { 'notOnlyWhiteSpace': true };
        } else {
            //valid , return null
            return null;
        }
    }
}
