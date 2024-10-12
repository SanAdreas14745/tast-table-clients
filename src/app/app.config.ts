import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from "@angular/router";
import {HttpClient, provideHttpClient, withInterceptors} from "@angular/common/http";
import {appRoutes} from "./app.routes";
import {apiUrlInterceptorFn} from "./core/interceptors/api-url.interceptor";
import {API_URL} from "./core/tokens/api-url.token";
import {mainHeadersInterceptorFn} from "./core/interceptors/main-headers.interceptor";
import {errorInterceptorFn} from "./core/interceptors/error.interceptor";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {provideAnimations} from '@angular/platform-browser/animations';
import {MAT_RIPPLE_GLOBAL_OPTIONS} from "@angular/material/core";
import {environment} from "../environments/environment";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        provideHttpClient(withInterceptors([
            apiUrlInterceptorFn,
            mainHeadersInterceptorFn,
            errorInterceptorFn,
        ])),
        {
            provide: API_URL,
            useValue: environment.API_URL
        },
        importProvidersFrom(TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            defaultLanguage: 'ru',
        })),
        provideAnimations(),
        {
            provide: MAT_RIPPLE_GLOBAL_OPTIONS,
            useValue: {disabled: true}
        }
    ],
};

