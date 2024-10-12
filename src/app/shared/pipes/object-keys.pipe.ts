import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'objectKeys',
    standalone: true
})
export class ObjectKeysPipe implements PipeTransform {
    transform<T extends Record<string, any>>(object?: T): string[] {
        if (!object) return [];

        return Object.keys(object) as string[];
    }
}
