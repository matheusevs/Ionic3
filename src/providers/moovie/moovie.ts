import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
    Generated class for the MoovieProvider provider.

    See https://angular.io/guide/dependency-injection for more info on providers
    and Angular DI.
*/
@Injectable()
export class MoovieProvider {
    private baseApiPath = "https://api.themoviedb.org/3";
    constructor(public http: HttpClient) {
        console.log('Hello MoovieProvider Provider');
    }

    getLatestMovies(page = 1){
        return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=39e4efa23f29edb27acefc9dbc18c575`);
    }

    getMovieDetails(filmeid){
        return this.http.get(this.baseApiPath + `/movie/${filmeid}?api_key=39e4efa23f29edb27acefc9dbc18c575`);
    }

}
