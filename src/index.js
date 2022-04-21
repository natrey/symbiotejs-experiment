import { BaseComponent } from '@symbiotejs/symbiote';

import './common/styles/html.css';
import './components/TodoList';

class App extends BaseComponent {
}

App.template = /* html */ `
  <todo-list></todo-list>
`;
App.reg('main-app');
