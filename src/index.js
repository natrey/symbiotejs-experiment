import { BaseComponent } from '@symbiotejs/symbiote';

import commonStyles from './common/styles/html.css';
import TodoList from './components/TodoList';

class App extends BaseComponent {
}

App.template = /* html */ `
  <todo-list></todo-list>
`;
App.reg('main-app');
