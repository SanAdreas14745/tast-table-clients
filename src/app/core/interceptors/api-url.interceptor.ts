import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {API_URL} from "../tokens/api-url.token";

export const apiUrlInterceptorFn: HttpInterceptorFn = (req, next) => {
    const apiUrl = inject(API_URL);

    if (req.url.startsWith('assets'))
        return next(req);

    req = req.clone({url: `${apiUrl}${req.url}`})

    return next(req);
}
