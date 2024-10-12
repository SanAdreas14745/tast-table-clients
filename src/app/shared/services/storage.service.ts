import {Injectable} from '@angular/core';
import {StorageKey} from "../enums/storage-key.enum";

@Injectable({providedIn: "root"})
export class StorageService {
    get<T>(key: StorageKey): T | null {
        const data = localStorage.getItem(key);

        if (!data) {
            return null;
        }

        try {
            return JSON.parse(data) as T;
        } catch {
            return null;
        }
    }

    set(key: StorageKey, value: unknown): void {
        let result = null;

        try {
            if (value) result = JSON.stringify(value);
        } catch {
        }

        if (result)
            localStorage.setItem(key, result);
    }
}
