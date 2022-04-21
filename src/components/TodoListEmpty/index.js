import { BaseComponent } from '@symbiotejs/symbiote';

import template from './template.html';
import './styles.css';

class TodoListEmpty extends BaseComponent {}

TodoListEmpty.template = template;
TodoListEmpty.reg('todo-list-empty');

export default TodoListEmpty;
