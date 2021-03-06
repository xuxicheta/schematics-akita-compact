import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createQuery, createStore } from '@datorama/akita';
import { tap } from 'rxjs/operators';

export interface <%= classify(name) %> {

}

const initialState = (): <%= classify(name) %> => ({
});

@Injectable({ providedIn: 'root' })
export class <%= classify(name) %>State {
  private store = createStore <<%= classify(name) %>> (initialState(), {
    name: '<%= dasherize(name) %>',
  });
  private query = createQuery<<%= classify(name) %>>(this.store);

  public select = <R>(project?: (store: <%= classify(name) %>) => R) => this.query.select(project);
  public getValue = () => this.query.getValue();
  public update = (state: Partial<<%= classify(name) %>>) => this.store.update(state);

  constructor(
    private http: HttpClient,
  ) { }

  fetch() {
    const params = new HttpParams();
    return this.http.get <<%= classify(name) %>> ('api/<%= dasherize(name) %>', { params }).pipe(
      tap(data => this.store.update(data)),
    );
  }
}

