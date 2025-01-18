import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'imgUrl'
})
export class ImageUrlPipe implements PipeTransform{

    transform(value: any, ...args: any[]) {
        return (value === '' || value == null) ? 'assets/images/default.jpg' : value; 
    }
}