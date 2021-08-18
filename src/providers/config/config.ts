import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

let config_key_name = "config"

/*
    Generated class for the MoovieProvider provider.

    See https://angular.io/guide/dependency-injection for more info on providers
    and Angular DI.
*/
@Injectable()
export class ConfigProvider {

    private config = {
        showSlide: false,
        name: "",
        username: ""
    }

    constructor() {
    }

    getConfigData(): any{
        return localStorage.getItem(config_key_name);
    }

    setConfigData(showSlide?: boolean, name?: string, username?: string){
        let config = {
            showSlide: false,
            name: "",
            username: ""
        };

        if(showSlide){
            config.showSlide = showSlide;
        }

        if(name){
            config.name = name;
        }

        if(username){
            config.username = username;
        }
        localStorage.setItem(config_key_name, JSON.stringify(config));
    }
}
