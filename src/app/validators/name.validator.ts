import { AbstractControl, ValidationErrors } from '@angular/forms';
export class UsernameValidator {
    static cannotStartOrEndWithSpace(control: AbstractControl) : ValidationErrors | null {
        if (control.value.startsWith(' ')) { 
            return {cannotStartOrEndWithSpace: true}; 
        }
        if (control.value.endsWith(' ')) { 
            return {cannotStartOrEndWithSpace: true}; 
        }
        return null;
    }

    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0){
            return {cannotContainSpace: true}
        }
        return null;
    }
}