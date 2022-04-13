import { BaseComponent } from '@symbiotejs/symbiote';

import commonStyles from './common/styles/html.css'; // eslint-disable-line no-unused-vars

import TodoList from './components/TodoList'; // eslint-disable-line no-unused-vars

class App extends BaseComponent {
}

App.template = /* html */ `
  <todo-list></todo-list>
`;
App.reg('main-app');
