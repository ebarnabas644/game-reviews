import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform{
    transform(languageCode: string) {
        switch (languageCode) {
            case "de-DE":
                return "german"
            case "en-GB":
                return "english"
            default:
                return "english"
        }
    }

}
