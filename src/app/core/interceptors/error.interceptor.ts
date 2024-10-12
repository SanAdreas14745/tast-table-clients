import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, EMPTY} from 'rxjs';

export const errorInterceptorFn: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error) => {
            console.error(error)

            return EMPTY;
        })
    );
}
