import { BaseComponent } from '@symbiotejs/symbiote';
import TodoList from './components/TodoList'; // eslint-disable-line no-unused-vars

class App extends BaseComponent {
  init$ = {
    heading: 'To-Do List App',
  };
}

App.template = /* html */ `
  <h1>{{heading}}</h1>
  <todo-list></todo-list>
`;
App.reg('main-app');
