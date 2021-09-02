import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(value: any, arg: any): any {

        if (arg == '' || arg.length < 2) return value;

        const resultPosts = [];

        for (const post of value) {
            if (post.phone.indexOf(arg) > -1 || post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
                resultPosts.push(post);
            };
        };

        return resultPosts;
    }
}
