import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';

export const mainHeadersInterceptorFn: HttpInterceptorFn = (req, next) => {
    const headers = new HttpHeaders({
        Accept: 'application/json'
    })

    req = req.clone({headers})

    return next(req)
}
